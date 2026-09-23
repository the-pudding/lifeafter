<script>
	// the minimap: a canvas drawn from each person's position and colour
	import { onMount } from "svelte";
	// the labels below are painted on canvas, so --text-scale can't reach them
	import {
		SCREEN_RECORD_TEXT_SCALE,
		screenRecordMode
	} from "./room/roomConfig.js";

	// hidden is css-only: unmounting would drop the config init() sets once
	let {
		mode = $bindable(),
		container,
		hidden = false,
		panelClear = 0,
		bottomClear = 0,
		bounce = false,
		onAcknowledge,
		onClickSound,
		onPersonClick,
		onEnterTopdown,
		// topdown: the walker's line dragged to a new spot on the map
		onWalkerDrag
	} = $props();

	let minimapCanvas;

	// a fixed logical space, whatever the canvas's real size
	const MINIMAP_WIDTH_PX = 120;
	const MINIMAP_HEIGHT_PX = 240;
	// circles, with a hit radius bigger than the dot itself
	const PERSON_DOT_RADIUS = 0.85; // ~same area as the old 1.5x1.5 square
	const PERSON_DOT_HIT_RADIUS = 3;
	// gap between the plot and the canvas border
	// canvas text can't inherit css, so the font stack is read once from it
	let minimapFontStack = null;
	function sansFont(size, weight = "") {
		if (minimapFontStack === null) {
			minimapFontStack =
				(typeof window !== "undefined" &&
					getComputedStyle(document.documentElement)
						.getPropertyValue("--font-sans")
						.trim()) ||
				"-apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif";
		}
		return `${weight}${weight ? " " : ""}${size}px ${minimapFontStack}`;
	}

	// tiny dots wash out, so the map boosts saturation — but keeps hue and
	// lightness as-is, so every shade matches the crowd, legend and highlights
	function accentuate(cssColor) {
		if (cssColor[0] !== "#" || cssColor.length !== 7) return cssColor;
		const r = parseInt(cssColor.slice(1, 3), 16) / 255;
		const g = parseInt(cssColor.slice(3, 5), 16) / 255;
		const b = parseInt(cssColor.slice(5, 7), 16) / 255;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const l = (max + min) / 2;
		const d = max - min;
		if (d === 0) return cssColor;
		let s = d / (1 - Math.abs(2 * l - 1));
		let h;
		if (max === r) h = 60 * (((g - b) / d) % 6);
		else if (max === g) h = 60 * ((b - r) / d + 2);
		else h = 60 * ((r - g) / d + 4);
		if (h < 0) h += 360;
		s = Math.min(1, s * 1.3);
		return `hsl(${h.toFixed(0)}, ${(s * 100).toFixed(0)}%, ${(l * 100).toFixed(0)}%)`;
	}

	// pre-rendered dot sprites keyed by color, quantized to 4 bits per channel
	// (invisible at this dot size); drawImage beats per-dot arc+fill by a lot
	const DOT_SPRITE_PX = 16;
	const dotSpriteCache = new Map();
	function dotSprite(cssColor) {
		// "#rrggbb" -> "rgb" high nibbles; anything else keys as itself
		const key =
			cssColor[0] === "#" && cssColor.length === 7
				? cssColor[1] + cssColor[3] + cssColor[5]
				: cssColor;
		let sprite = dotSpriteCache.get(key);
		if (!sprite) {
			sprite = document.createElement("canvas");
			sprite.width = DOT_SPRITE_PX;
			sprite.height = DOT_SPRITE_PX;
			const sctx = sprite.getContext("2d");
			sctx.fillStyle = accentuate(cssColor);
			sctx.beginPath();
			sctx.arc(DOT_SPRITE_PX / 2, DOT_SPRITE_PX / 2, DOT_SPRITE_PX / 2, 0, Math.PI * 2);
			sctx.fill();
			dotSpriteCache.set(key, sprite);
		}
		return sprite;
	}

	// the answer columns, left to right
	const GROUP_LABELS = [
		{ text: "No", zone: -1 },
		{ text: "Unsure", zone: 0 },
		{ text: "Yes", zone: 1 }
	];

	const MINIMAP_OUTER_PADDING = 3;
	// room below the map for the button
	const TOPDOWN_BOTTOM_CLEAR = 44;
	// room under the control panel, so the legend clears the plot
	const TOPDOWN_PANEL_GAP = 12;
	// room for the age label under the walker's dot
	const MINIMAP_BOTTOM_PADDING = 16;
	// the walker's tracking line: opaque white, so it reads as the moving one
	const MINIMAP_LINE_COLOR = "#ffffff";
	// the static grid, subtler than the tracking line
	const MINIMAP_AXIS_LINE_COLOR = "rgba(255, 255, 255, 0.3)";
	// matches the css breakpoint that grows the corner box
	const WIDE_SCREEN_MIN_WIDTH = 1001;
	// label margins; the corner box only reserves the top strip, except on
	// roomier screens, where a left strip holds the age numbers
	function axisMargins(mode) {
		if (mode === "topdown") return { left: 22, top: 16 };
		const wide =
			typeof window !== "undefined" && window.innerWidth >= WIDE_SCREEN_MIN_WIDTH;
		return { left: wide ? 10 : 0, top: 14 };
	}

	// set once by init(), so plain closure state
	let roomConfig = null;
	let minimapZBackWall = 0;
	let minimapScaleX = 1;
	let minimapScaleZ = 1;
	// the last draw's transform, used by the hit test
	let lastDrawState = null;
	// the dot under the pointer, read by draw()
	let hoveredPersonIndex = null;

	// world to canvas: x across the room, z from young at the bottom to old at the top
	export function init(config) {
		roomConfig = config;
		const minimapZEntrance = config.halfDepth + config.exteriorDepth;
		minimapZBackWall = -config.halfDepth;
		const minimapZRange = minimapZEntrance - minimapZBackWall;
		minimapScaleX = MINIMAP_WIDTH_PX / config.roomWidth;
		minimapScaleZ = MINIMAP_HEIGHT_PX / minimapZRange;
	}

	function worldXToMinimapPx(x) {
		return (x + roomConfig.halfWidth) * minimapScaleX;
	}
	function worldZToMinimapPx(z) {
		return (z - minimapZBackWall) * minimapScaleZ;
	}

	export function draw({
		walkerX,
		walkerZ,
		walkerYaw,
		currentAge,
		minimapX,
		minimapZ,
		personColorCSS,
		respondentCount,
		selectedPersonIndex = null
	}) {
		if (!roomConfig || !minimapCanvas) return;
		const { zoneWidth, ageMin, ageMax, ageToZ } = roomConfig;
		const ctx = minimapCanvas.getContext("2d");
		const isTopdown = mode === "topdown";
		// the strip the age numbers and column labels sit in
		const { left: axisLeftMargin, top: axisTopMargin } = axisMargins(mode);
		// topdown mirrors the margin on the right, or the plot sits off-centre;
		// the corner box keeps its left strip flush instead
		const logicalWidth =
			MINIMAP_WIDTH_PX +
			axisLeftMargin * (isTopdown ? 2 : 1) +
			MINIMAP_OUTER_PADDING;
		const logicalHeight =
			MINIMAP_HEIGHT_PX + axisTopMargin + MINIMAP_OUTER_PADDING + MINIMAP_BOTTOM_PADDING;
		// one uniform scale, so circles stay round and the rest letterboxes
		const scale = Math.min(
			minimapCanvas.width / logicalWidth,
			minimapCanvas.height / logicalHeight
		);
		const offsetX = (minimapCanvas.width - logicalWidth * scale) / 2;
		const offsetY = (minimapCanvas.height - logicalHeight * scale) / 2;
		// clear to transparent so the css background shows through
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
		ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
		// inside the padding; the fill above still covers the whole box
		ctx.save();
		ctx.translate(MINIMAP_OUTER_PADDING, MINIMAP_OUTER_PADDING);

		// pinned to screen pixels, so topdown's scale can't blow the text up
		const axisFontCSSPx =
			Math.max(13, Math.min(13, window.innerWidth / 100)) *
			(screenRecordMode ? SCREEN_RECORD_TEXT_SCALE : 1);
		const cssPxToLogical = (cssPx) =>
			(cssPx * (minimapCanvas.width / minimapCanvas.clientWidth || 1)) / scale;
		const axisFontLogicalPx = cssPxToLogical(axisFontCSSPx);

		// pinned to screen pixels too, or the lines draw far too thick
		const lineWidthLogical = cssPxToLogical(1);
		// pinned like the grid, so the bigger corner box can't fatten it;
		// under the pointer it thickens a touch, ready to be grabbed
		const walkerLit = walkerLineHovered || walkerDragging;
		const trackingLineWidthLogical = cssPxToLogical(
			(isTopdown ? 1.5 : 1) * (walkerLit ? 1.7 : 1)
		);

		// age axis: a tick every ten years, numbered in topdown and, when the
		// corner box has its wide-screen left strip, above each extended line
		const cornerAgeNumbersOn = !isTopdown && axisLeftMargin > 0;
		ctx.strokeStyle = MINIMAP_AXIS_LINE_COLOR;
		ctx.lineWidth = lineWidthLogical;
		const ageAxisStart = Math.ceil(ageMin / 10) * 10;
		const ageAxisEnd = Math.floor(ageMax / 10) * 10;
		if (isTopdown) {
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
			ctx.font = sansFont(axisFontLogicalPx);
		} else if (cornerAgeNumbersOn) {
			// matches the column labels at the top
			ctx.textAlign = "left";
			ctx.textBaseline = "alphabetic";
			ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
			ctx.font = sansFont(axisFontLogicalPx);
		}
		for (let age = ageAxisStart; age <= ageAxisEnd; age += 10) {
			const y = axisTopMargin + worldZToMinimapPx(ageToZ(age));
			ctx.beginPath();
			// the wide-screen corner box extends the line into the left strip
			ctx.moveTo(cornerAgeNumbersOn ? 0 : axisLeftMargin, y);
			ctx.lineTo(axisLeftMargin + MINIMAP_WIDTH_PX, y);
			ctx.stroke();
			if (isTopdown) {
				ctx.fillText(String(age), axisLeftMargin - 5, y);
			} else if (cornerAgeNumbersOn) {
				ctx.fillText(String(age), 0, y - 3);
			}
		}

		// the three answers over their columns, in both modes
		ctx.textAlign = "center";
		ctx.textBaseline = "alphabetic";
		ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
		let groupFontPx = axisFontLogicalPx * (isTopdown ? 1.3 : 1);
		ctx.font = sansFont(groupFontPx);
		// shrunk to fit its column; the corner box is tight, so it gets more of it
		const zoneColumnWidth = minimapScaleX * zoneWidth;
		const groupLabelFitWidth = zoneColumnWidth * (isTopdown ? 0.85 : 0.95);
		const widestGroupLabelWidth = Math.max(
			...GROUP_LABELS.map(({ text }) => ctx.measureText(text).width)
		);
		if (widestGroupLabelWidth > groupLabelFitWidth) {
			groupFontPx *= groupLabelFitWidth / widestGroupLabelWidth;
			ctx.font = sansFont(groupFontPx);
		}
		const groupLabelY = axisTopMargin - 3;
		for (const { text, zone } of GROUP_LABELS) {
			ctx.fillText(
				text,
				axisLeftMargin + worldXToMinimapPx(zone * zoneWidth),
				groupLabelY
			);
		}

		// the plot itself, offset past the margins
		ctx.save();
		ctx.translate(axisLeftMargin, axisTopMargin);

		// column dividers, echoing the room's zone lines
		ctx.fillStyle = MINIMAP_AXIS_LINE_COLOR;
		for (const x of [-zoneWidth / 2, zoneWidth / 2]) {
			const px = worldXToMinimapPx(x);
			ctx.fillRect(
				px - lineWidthLogical / 2,
				0,
				lineWidthLogical,
				MINIMAP_HEIGHT_PX
			);
		}

		// stamped sprites: ~2000 arc+fill calls a frame was the map's whole cost
		const dotSize = PERSON_DOT_RADIUS * 2;
		for (let i = 0; i < respondentCount; i++) {
			ctx.drawImage(
				dotSprite(personColorCSS[i]),
				worldXToMinimapPx(minimapX[i]) - PERSON_DOT_RADIUS,
				worldZToMinimapPx(minimapZ[i]) - PERSON_DOT_RADIUS,
				dotSize,
				dotSize
			);
		}

		// the hovered dot: bigger, with a white halo
		if (hoveredPersonIndex !== null && hoveredPersonIndex < respondentCount) {
			const px = worldXToMinimapPx(minimapX[hoveredPersonIndex]);
			const py = worldZToMinimapPx(minimapZ[hoveredPersonIndex]);
			ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS * 2.2, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = accentuate(personColorCSS[hoveredPersonIndex]);
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS * 1.5, 0, Math.PI * 2);
			ctx.fill();
		}

		// whoever's modal is open, ringed rather than filled
		if (selectedPersonIndex !== null && selectedPersonIndex < respondentCount) {
			const px = worldXToMinimapPx(minimapX[selectedPersonIndex]);
			const py = worldZToMinimapPx(minimapZ[selectedPersonIndex]);
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = cssPxToLogical(2);
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS * 2.8, 0, Math.PI * 2);
			ctx.stroke();
		}

		// a marker at the walker's depth, inset from the plot's edges
		const trackingLineSpan = MINIMAP_WIDTH_PX * 0.8;
		const lineY = worldZToMinimapPx(walkerZ);
		ctx.fillStyle = MINIMAP_LINE_COLOR;
		ctx.fillRect(
			(MINIMAP_WIDTH_PX - trackingLineSpan) / 2,
			lineY - trackingLineWidthLogical / 2,
			trackingLineSpan,
			trackingLineWidthLogical
		);

		// the walker, with a heading cone fading out like a flashlight
		const walkerCanvasX = worldXToMinimapPx(walkerX);
		if (walkerYaw !== undefined) {
			// raw yaw, so small turns aren't warped by the squashed scales
			const dx = Math.sin(walkerYaw);
			const dy = -Math.cos(walkerYaw);
			const coneLength = 38;
			const coneHalfWidth = 16;
			const farX = walkerCanvasX + dx * coneLength;
			const farY = lineY + dy * coneLength;
			const perpX = -dy * coneHalfWidth;
			const perpY = dx * coneHalfWidth;
			const coneGradient = ctx.createLinearGradient(walkerCanvasX, lineY, farX, farY);
			coneGradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
			coneGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
			ctx.save();
			// clipped to the plot, so it can't run out over the labels
			// (already in plot-local space, so the rect starts at the origin)
			ctx.beginPath();
			ctx.rect(0, 0, MINIMAP_WIDTH_PX, MINIMAP_HEIGHT_PX);
			ctx.clip();
			ctx.fillStyle = coneGradient;
			ctx.beginPath();
			ctx.moveTo(walkerCanvasX, lineY);
			ctx.lineTo(farX + perpX, farY + perpY);
			ctx.lineTo(farX - perpX, farY - perpY);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
		ctx.fillStyle = "rgba(254, 253, 254, 1)";
		ctx.beginPath();
		ctx.arc(walkerCanvasX, lineY, walkerLit ? 5.2 : 4.5, 0, Math.PI * 2);
		ctx.fill();

		// the age under the dot, stroked to stay legible over the scatter
		if (currentAge !== null && currentAge !== undefined) {
			const ageLabelFontPx = axisFontLogicalPx * 1.15;
			ctx.font = sansFont(ageLabelFontPx, "bold");
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.lineJoin = "round";
			ctx.strokeStyle = "rgba(0, 0, 0, 0.9)";
			ctx.lineWidth = 2;
			ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
			const ageLabelX = MINIMAP_WIDTH_PX / 2;
			const ageLabelY = lineY + 6;
			const ageLabelText = `Age ${currentAge}`;
			ctx.strokeText(ageLabelText, ageLabelX, ageLabelY);
			ctx.fillText(ageLabelText, ageLabelX, ageLabelY);
		}

		ctx.restore();
		ctx.restore();

		// cached for the hit test, which needs this frame's transform; the
		// walker's line position feeds the drag grab test
		lastDrawState = {
			scale,
			offsetX,
			offsetY,
			axisLeftMargin,
			axisTopMargin,
			minimapX,
			minimapZ,
			respondentCount,
			walkerLineY: lineY,
			walkerCanvasX
		};
	}

	// keeps the raster buffer a dpr multiple of the css box
	function resizeMinimapCanvas() {
		const dpr = Math.min(window.devicePixelRatio, 2);
		const w = Math.round(minimapCanvas.clientWidth * dpr);
		const h = Math.round(minimapCanvas.clientHeight * dpr);
		if (w === 0 || h === 0) return;
		minimapCanvas.width = w;
		minimapCanvas.height = h;
	}

	// sizes the topdown box to the content's own aspect, clearing the panel
	function layoutMinimapBox() {
		if (mode !== "topdown") {
			minimapCanvas.style.width = "";
			minimapCanvas.style.top = "";
			minimapCanvas.style.height = "";
			// drop the inline cursor and hover, or they stick
			minimapCanvas.style.cursor = "";
			hoveredPersonIndex = null;
			walkerLineHovered = false;
			return;
		}
		const { left: axisLeftMargin, top: axisTopMargin } = axisMargins("topdown");
		const logicalWidth =
			MINIMAP_WIDTH_PX + axisLeftMargin * 2 + MINIMAP_OUTER_PADDING;
		const logicalHeight =
			MINIMAP_HEIGHT_PX + axisTopMargin + MINIMAP_OUTER_PADDING + MINIMAP_BOTTOM_PADDING;
		const contentAspect = logicalWidth / logicalHeight;

		const topClear = panelClear + TOPDOWN_PANEL_GAP;
		const availW = container.clientWidth;
		const availH = Math.max(
			0,
			container.clientHeight - topClear - TOPDOWN_BOTTOM_CLEAR - bottomClear
		);
		let width = availH * contentAspect;
		let height = availH;
		if (width > availW) {
			width = availW;
			height = availW / contentAspect;
		}
		minimapCanvas.style.top = `${topClear}px`;
		minimapCanvas.style.height = `${height}px`;
		minimapCanvas.style.width = `${width}px`;
	}

	// where the topdown plot lands in css px, for the camera flight
	export function getTopdownPlotRect() {
		if (!container) return null;
		const { left: axisLeftMargin, top: axisTopMargin } = axisMargins("topdown");
		const logicalWidth =
			MINIMAP_WIDTH_PX + axisLeftMargin * 2 + MINIMAP_OUTER_PADDING;
		const logicalHeight =
			MINIMAP_HEIGHT_PX + axisTopMargin + MINIMAP_OUTER_PADDING + MINIMAP_BOTTOM_PADDING;
		const contentAspect = logicalWidth / logicalHeight;
		const topClear = panelClear + TOPDOWN_PANEL_GAP;
		const availW = container.clientWidth;
		const availH = Math.max(
			0,
			container.clientHeight - topClear - TOPDOWN_BOTTOM_CLEAR - bottomClear
		);
		let width = availH * contentAspect;
		let height = availH;
		if (width > availW) {
			width = availW;
			height = availW / contentAspect;
		}
		if (width <= 0 || height <= 0) return null;
		// the box keeps the content's aspect, so the logical space fills it
		const cssScale = width / logicalWidth;
		return {
			left:
				(availW - width) / 2 +
				(MINIMAP_OUTER_PADDING + axisLeftMargin) * cssScale,
			top: topClear + (MINIMAP_OUTER_PADDING + axisTopMargin) * cssScale,
			width: MINIMAP_WIDTH_PX * cssScale,
			height: MINIMAP_HEIGHT_PX * cssScale
		};
	}

	$effect(() => {
		mode;
		panelClear;
		bottomClear;
		if (minimapCanvas && container) layoutMinimapBox();
	});

	// the respondent under the pointer, or null
	function hitTestPerson(clientX, clientY) {
		if (!lastDrawState || !roomConfig) return null;
		const { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin, minimapX, minimapZ, respondentCount } =
			lastDrawState;
		const rect = minimapCanvas.getBoundingClientRect();
		// css pixels to raster space, which differ by dpr
		const rasterX = ((clientX - rect.left) / rect.width) * minimapCanvas.width;
		const rasterY = ((clientY - rect.top) / rect.height) * minimapCanvas.height;
		const logicalX = (rasterX - offsetX) / scale - MINIMAP_OUTER_PADDING - axisLeftMargin;
		const logicalY = (rasterY - offsetY) / scale - MINIMAP_OUTER_PADDING - axisTopMargin;

		let bestIndex = null;
		let bestDistSq = PERSON_DOT_HIT_RADIUS * PERSON_DOT_HIT_RADIUS;
		for (let i = 0; i < respondentCount; i++) {
			const dx = worldXToMinimapPx(minimapX[i]) - logicalX;
			const dy = worldZToMinimapPx(minimapZ[i]) - logicalY;
			const distSq = dx * dx + dy * dy;
			if (distSq < bestDistSq) {
				bestDistSq = distSq;
				bestIndex = i;
			}
		}
		return bestIndex;
	}

	// client position to the plot's own logical space
	function pointerToLogical(clientX, clientY) {
		const { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin } = lastDrawState;
		const rect = minimapCanvas.getBoundingClientRect();
		const rasterX = ((clientX - rect.left) / rect.width) * minimapCanvas.width;
		const rasterY = ((clientY - rect.top) / rect.height) * minimapCanvas.height;
		return {
			x: (rasterX - offsetX) / scale - MINIMAP_OUTER_PADDING - axisLeftMargin,
			y: (rasterY - offsetY) / scale - MINIMAP_OUTER_PADDING - axisTopMargin
		};
	}

	// how many logical units one css pixel covers, for grab tolerances
	function logicalPerCssPx() {
		return (
			(minimapCanvas.width / (minimapCanvas.clientWidth || 1)) / lastDrawState.scale
		);
	}

	// dragging the walker's line: sideways moves them across the room,
	// up and down changes their depth
	let walkerDragging = false;
	let walkerDragMoved = false;
	// true while the pointer sits on the line or dot; draw() lights them up
	let walkerLineHovered = false;
	function pointerOnWalkerLine(clientX, clientY) {
		if (!lastDrawState || lastDrawState.walkerLineY === undefined) return false;
		const p = pointerToLogical(clientX, clientY);
		const onLine =
			Math.abs(p.y - lastDrawState.walkerLineY) <= 10 * logicalPerCssPx() &&
			p.x >= 0 &&
			p.x <= MINIMAP_WIDTH_PX;
		// the dot bulges past the line's tolerance, and grabs too
		const dx = p.x - lastDrawState.walkerCanvasX;
		const dy = p.y - lastDrawState.walkerLineY;
		const dotReach = 4.5 + 6 * logicalPerCssPx();
		return onLine || dx * dx + dy * dy <= dotReach * dotReach;
	}
	function handleMinimapPointerDown(event) {
		if (mode !== "topdown" || !onWalkerDrag || !lastDrawState) return;
		if (!pointerOnWalkerLine(event.clientX, event.clientY)) return;
		walkerDragging = true;
		walkerDragMoved = false;
		minimapCanvas.setPointerCapture?.(event.pointerId);
		minimapCanvas.style.cursor = "grabbing";
		event.preventDefault();
	}
	function handleMinimapPointerMove(event) {
		if (!walkerDragging) return;
		walkerDragMoved = true;
		const p = pointerToLogical(event.clientX, event.clientY);
		onWalkerDrag({
			x: p.x / minimapScaleX - roomConfig.halfWidth,
			z: p.y / minimapScaleZ + minimapZBackWall
		});
	}
	function handleMinimapPointerUp(event) {
		if (!walkerDragging) return;
		walkerDragging = false;
		minimapCanvas.releasePointerCapture?.(event.pointerId);
		minimapCanvas.style.cursor = "default";
	}

	// topdown only: the walker's grab hand first, then a pointer over a dot
	function handleMinimapMouseMove(event) {
		if (mode !== "topdown" || walkerDragging) return;
		walkerLineHovered =
			!!onWalkerDrag && pointerOnWalkerLine(event.clientX, event.clientY);
		hoveredPersonIndex = walkerLineHovered
			? null
			: hitTestPerson(event.clientX, event.clientY);
		minimapCanvas.style.cursor = walkerLineHovered
			? "grab"
			: hoveredPersonIndex !== null
				? "pointer"
				: "default";
	}
	function handleMinimapMouseLeave() {
		if (mode !== "topdown" || walkerDragging) return;
		walkerLineHovered = false;
		hoveredPersonIndex = null;
		minimapCanvas.style.cursor = "default";
	}

	// whether a pointer is over this box; main uses it to stop clicks through
	export function containsPoint(clientX, clientY) {
		// a faded-out map still has a box, but shouldn't swallow clicks
		if (hidden) return false;
		const rect = minimapCanvas.getBoundingClientRect();
		return (
			clientX >= rect.left &&
			clientX <= rect.right &&
			clientY >= rect.top &&
			clientY <= rect.bottom
		);
	}

	onMount(() => {
		// this component's own canvas, so it's mounted by now
		const minimapResizeObserver = new ResizeObserver(resizeMinimapCanvas);
		minimapResizeObserver.observe(minimapCanvas);
		return () => minimapResizeObserver.disconnect();
	});

	// main's container may not have resolved yet, so this re-runs when it does
	$effect(() => {
		if (!container) return;
		const containerResizeObserver = new ResizeObserver(layoutMinimapBox);
		containerResizeObserver.observe(container);
		return () => containerResizeObserver.disconnect();
	});
</script>

<canvas
	class="minimap-canvas"
	tabindex={hidden ? -1 : 0}
	role="button"
	aria-label="Open the overhead map"
	aria-hidden={hidden}
	class:topdown-active={mode === "topdown"}
	class:is-hidden={hidden}
	class:is-pulsing={bounce && mode !== "topdown" && !hidden}
	bind:this={minimapCanvas}
	onclick={(event) => {
		// a drag isn't a click; don't select whoever it ended over
		if (walkerDragMoved) {
			walkerDragMoved = false;
			return;
		}
		onAcknowledge?.();
		onClickSound?.();
		if (mode !== "topdown") {
			// main flies the camera up before flipping the mode, when it can
			if (onEnterTopdown) onEnterTopdown();
			else mode = "topdown";
			return;
		}
		const index = hitTestPerson(event.clientX, event.clientY);
		if (index !== null) onPersonClick?.(index);
	}}
	onkeydown={(event) => {
		if (event.key !== "Enter" && event.key !== " ") return;
		event.preventDefault();
		onAcknowledge?.();
		onClickSound?.();
		if (mode !== "topdown") {
			if (onEnterTopdown) onEnterTopdown();
			else mode = "topdown";
		}
	}}
	onpointerenter={() => onAcknowledge?.()}
	onpointerdown={handleMinimapPointerDown}
	onpointermove={handleMinimapPointerMove}
	onpointerup={handleMinimapPointerUp}
	onpointercancel={handleMinimapPointerUp}
	onmousemove={handleMinimapMouseMove}
	onmouseleave={handleMinimapMouseLeave}
></canvas>


<style>
	/* a corner box in walk mode, the main view in topdown; the pink
	   outline and hard shadow mark it as a button, pressed flat on click */
	.minimap-canvas {
		position: absolute;
		right: 10px;
		bottom: 50px;
		width: 124px;
		height: 244px;
		border: 1px solid rgba(207, 164, 255, 0.55);
		box-shadow: 2px 2px 0 #cfa4ff;
		border-radius: 0rem;
		/* both modes need real pointer events: one switches view, one opens a modal */
		pointer-events: auto;
		z-index: 5;
		touch-action: none;
		cursor: pointer;
		/* the buttons' shared plum, so the corner box reads as one of them */
		background: #1a0c2b;
	}
	/* fades rather than cuts, and can't be clicked once faded */
	.minimap-canvas {
		transition: opacity 320ms ease-out;
	}
	.minimap-canvas.is-hidden {
		opacity: 0;
		pointer-events: none;
	}
	.minimap-canvas:not(.topdown-active):active {
		box-shadow: none;
		transform: translate(2px, 2px);
	}
	/* an hl_minimap beat breathes the plot's own background, since the canvas
	   draws on transparency and this shows through behind the dots */
	.minimap-canvas.is-pulsing {
		animation: minimap-bg-pulse 1.8s ease-in-out infinite;
	}
	@keyframes minimap-bg-pulse {
		0%,
		100% {
			background-color: #1a0c2b;
		}
		50% {
			/* a dark cast of the border's lavender */
			background-color: #372558;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.minimap-canvas.is-pulsing {
			animation: none;
			background-color: #2b1e47;
		}
	}

	.minimap-canvas.topdown-active {
		left: 50%;
		right: auto;
		transform: translateX(-50%);
		/* above the story overlay: here the map is the main view */
		z-index: 11;
		/* size and position come from layoutMinimapBox, so nothing is set here */
		border: none;
		/* the main view here, not a button */
		box-shadow: none;
		/* no background of its own: the scene renders full-bleed behind this
		   box and already clears to BG_COLOR, so the plot sits straight on it.
		   painting the same hex here would still seam, since a css fill and
		   the canvas's own output don't resolve identically on wide-gamut
		   displays — letting it through is the only exact match */
		background: transparent;
	}

	/* roomier screens get a bigger corner box; at these sizes the strip for
	   the age numbers fits without shrinking the plot */
	@media (min-width: 1001px) {
		.minimap-canvas:not(.topdown-active) {
			width: 200px;
			height: 393px;
		}
	}
	@media (min-width: 1400px) {
		.minimap-canvas:not(.topdown-active) {
			width: 240px;
			height: 472px;
		}
	}
	@media (min-width: 1800px) {
		.minimap-canvas:not(.topdown-active) {
			width: 272px;
			height: 535px;
		}
	}

	/* phones: a smaller box, kept in the drawn map's own proportion; wide
	   enough that the column labels stay readable */
	@media (max-width: 640px) {
		.minimap-canvas:not(.topdown-active) {
			width: min(116px, 29vw);
			height: min(229px, 57.1vw);
		}
	}
</style>
