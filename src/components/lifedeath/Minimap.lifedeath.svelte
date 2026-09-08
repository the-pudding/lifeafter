<script>
	// the minimap: a canvas drawn from each person's position and colour
	import { onMount } from "svelte";

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
		onPersonClick
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
	function serifFont(size, weight = "") {
		if (minimapFontStack === null) {
			minimapFontStack =
				(typeof window !== "undefined" &&
					getComputedStyle(document.documentElement)
						.getPropertyValue("--font-serif")
						.trim()) ||
				'"Iowan Old Style", "Tiempos Text", "Times New Roman", Times, serif';
		}
		return `${weight}${weight ? " " : ""}${size}px ${minimapFontStack}`;
	}

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
	// fallback tracking-line width in walk mode
	const MINIMAP_TRACKING_LINE_WIDTH = 2;
	// margin for the axis labels; zero in the corner box
	function axisMargins(mode) {
		return mode === "topdown"
			? { left: 22, top: 16 }
			: { left: 0, top: 0 };
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
		// label margins in topdown only
		const { left: axisLeftMargin, top: axisTopMargin } = axisMargins(mode);
		// mirrored on the right, or the plot sits off-centre
		const logicalWidth =
			MINIMAP_WIDTH_PX + axisLeftMargin + axisLeftMargin + MINIMAP_OUTER_PADDING;
		const logicalHeight =
			MINIMAP_HEIGHT_PX + axisTopMargin + MINIMAP_OUTER_PADDING + MINIMAP_BOTTOM_PADDING;
		// one uniform scale, so circles stay round and the rest letterboxes
		const scale = Math.min(
			minimapCanvas.width / logicalWidth,
			minimapCanvas.height / logicalHeight
		);
		const offsetX = (minimapCanvas.width - logicalWidth * scale) / 2;
		const offsetY = (minimapCanvas.height - logicalHeight * scale) / 2;
		// clears to transparent, letterbox bands included, so the element's css
		// background shows through and the map can't paint a near-match of it
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, minimapCanvas.width, minimapCanvas.height);
		ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
		// inside the padding; the fill above still covers the whole box
		ctx.save();
		ctx.translate(MINIMAP_OUTER_PADDING, MINIMAP_OUTER_PADDING);

		// pinned to screen pixels, so topdown's scale can't blow the text up
		const axisFontCSSPx = Math.max(13, Math.min(13, window.innerWidth / 100));
		const cssPxToLogical = (cssPx) =>
			(cssPx * (minimapCanvas.width / minimapCanvas.clientWidth || 1)) / scale;
		const axisFontLogicalPx = cssPxToLogical(axisFontCSSPx);

		// pinned to screen pixels too, or the lines draw far too thick
		const lineWidthLogical = cssPxToLogical(1);
		const trackingLineWidthLogical = isTopdown
			? cssPxToLogical(1.5)
			: MINIMAP_TRACKING_LINE_WIDTH;

		// age axis: a tick every ten years, numbered only in topdown
		ctx.strokeStyle = MINIMAP_AXIS_LINE_COLOR;
		ctx.lineWidth = lineWidthLogical;
		const ageAxisStart = Math.ceil(ageMin / 10) * 10;
		const ageAxisEnd = Math.floor(ageMax / 10) * 10;
		if (isTopdown) {
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
			ctx.font = serifFont(axisFontLogicalPx);
		}
		for (let age = ageAxisStart; age <= ageAxisEnd; age += 10) {
			const y = axisTopMargin + worldZToMinimapPx(ageToZ(age));
			ctx.beginPath();
			ctx.moveTo(axisLeftMargin, y);
			ctx.lineTo(axisLeftMargin + MINIMAP_WIDTH_PX, y);
			ctx.stroke();
			if (isTopdown) {
				ctx.fillText(String(age), axisLeftMargin - 5, y);
			}
		}

		// the three answers over their columns, in topdown only
		if (isTopdown) {
			ctx.textAlign = "center";
			ctx.textBaseline = "alphabetic";
			ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
			let groupFontPx = axisFontLogicalPx * 1.3;
			ctx.font = serifFont(groupFontPx);
			const zoneColumnWidth = minimapScaleX * zoneWidth;
			const widestGroupLabelWidth = Math.max(
				ctx.measureText("No").width,
				ctx.measureText("Unsure").width,
				ctx.measureText("Yes").width
			);
			if (widestGroupLabelWidth > zoneColumnWidth * 0.85) {
				groupFontPx *= (zoneColumnWidth * 0.85) / widestGroupLabelWidth;
				ctx.font = serifFont(groupFontPx);
			}
			const groupLabelY = axisTopMargin - 3;
			ctx.fillText(
				"No",
				axisLeftMargin + worldXToMinimapPx(-zoneWidth),
				groupLabelY
			);
			ctx.fillText(
				"Unsure",
				axisLeftMargin + worldXToMinimapPx(0),
				groupLabelY
			);
			ctx.fillText(
				"Yes",
				axisLeftMargin + worldXToMinimapPx(zoneWidth),
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

		for (let i = 0; i < respondentCount; i++) {
			const px = worldXToMinimapPx(minimapX[i]);
			const py = worldZToMinimapPx(minimapZ[i]);
			ctx.fillStyle = personColorCSS[i];
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS, 0, Math.PI * 2);
			ctx.fill();
		}

		// the hovered dot: bigger, with a white halo
		if (hoveredPersonIndex !== null && hoveredPersonIndex < respondentCount) {
			const px = worldXToMinimapPx(minimapX[hoveredPersonIndex]);
			const py = worldZToMinimapPx(minimapZ[hoveredPersonIndex]);
			ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS * 2.2, 0, Math.PI * 2);
			ctx.fill();
			ctx.fillStyle = personColorCSS[hoveredPersonIndex];
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

		// a full-width marker at the walker's depth
		const lineY = worldZToMinimapPx(walkerZ);
		ctx.fillStyle = MINIMAP_LINE_COLOR;
		ctx.fillRect(
			0,
			lineY - trackingLineWidthLogical / 2,
			MINIMAP_WIDTH_PX,
			trackingLineWidthLogical
		);

		// the walker, with a heading cone fading out like a flashlight
		const walkerCanvasX = worldXToMinimapPx(walkerX);
		if (walkerYaw !== undefined) {
			// converted into map space and re-normalised, or the angle is wrong
			const forwardX = Math.sin(walkerYaw);
			const forwardZ = -Math.cos(walkerYaw);
			let dx = forwardX * minimapScaleX;
			let dy = forwardZ * minimapScaleZ;
			const len = Math.hypot(dx, dy) || 1;
			dx /= len;
			dy /= len;
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
			ctx.beginPath();
			ctx.rect(axisLeftMargin, axisTopMargin, MINIMAP_WIDTH_PX, MINIMAP_HEIGHT_PX);
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
		ctx.fillStyle = "rgba(254, 253, 254,1)";
		ctx.beginPath();
		ctx.arc(walkerCanvasX, lineY, 4.5, 0, Math.PI * 2);
		ctx.fill();

		// the age under the dot, stroked to stay legible over the scatter
		if (currentAge !== null && currentAge !== undefined) {
			const ageLabelFontPx = axisFontLogicalPx * 1.15;
			ctx.font = serifFont(ageLabelFontPx, "bold");
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

		// cached for the hit test, which needs this frame's transform
		lastDrawState = { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin, minimapX, minimapZ, respondentCount };
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

	// topdown only: a pointer cursor and a highlight over a real dot
	function handleMinimapMouseMove(event) {
		if (mode !== "topdown") return;
		hoveredPersonIndex = hitTestPerson(event.clientX, event.clientY);
		minimapCanvas.style.cursor = hoveredPersonIndex !== null ? "pointer" : "default";
	}
	function handleMinimapMouseLeave() {
		if (mode !== "topdown") return;
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
	class:topdown-active={mode === "topdown"}
	class:is-hidden={hidden}
	class:is-pulsing={bounce && mode !== "topdown" && !hidden}
	bind:this={minimapCanvas}
	onclick={(event) => {
		onAcknowledge?.();
		onClickSound?.();
		if (mode !== "topdown") {
			mode = "topdown";
			return;
		}
		const index = hitTestPerson(event.clientX, event.clientY);
		if (index !== null) onPersonClick?.(index);
	}}
	onpointerenter={() => onAcknowledge?.()}
	onmousemove={handleMinimapMouseMove}
	onmouseleave={handleMinimapMouseLeave}
></canvas>


<style>
	/* a corner box in walk mode, the main view in topdown */
	.minimap-canvas {
		position: absolute;
		right: 10px;
		bottom: 50px;
		width: 124px;
		height: 244px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0rem;
		/* both modes need real pointer events: one switches view, one opens a modal */
		pointer-events: auto;
		z-index: 5;
		touch-action: none;
		cursor: pointer;
		/* matches what draw() fills, so the box and the plot are one colour */
		background: var(--bg-color, #0d0815);
	}
	/* fades rather than cuts, and can't be clicked once faded */
	.minimap-canvas {
		transition: opacity 320ms ease-out;
	}
	.minimap-canvas.is-hidden {
		opacity: 0;
		pointer-events: none;
	}
	/* an hl_minimap beat breathes the plot's own background, since the canvas
	   draws on transparency and this shows through behind the dots */
	.minimap-canvas.is-pulsing {
		animation: minimap-bg-pulse 1.8s ease-in-out infinite;
	}
	@keyframes minimap-bg-pulse {
		0%,
		100% {
			background-color: var(--bg-color, #0d0815);
		}
		50% {
			background-color: #3d1240;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.minimap-canvas.is-pulsing {
			animation: none;
			background-color: #250a29;
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
		background: var(--bg-color, #0d0815);
	}

	/* roomier screens get a bigger corner box, in the same proportion */
	@media (min-width: 1400px) {
		.minimap-canvas:not(.topdown-active) {
			width: 178px;
			height: 350px;
		}
	}
	@media (min-width: 1800px) {
		.minimap-canvas:not(.topdown-active) {
			width: 208px;
			height: 409px;
		}
	}

	/* phones: a smaller box, kept in the drawn map's own proportion */
	@media (max-width: 640px) {
		.minimap-canvas:not(.topdown-active) {
			width: min(100px, 25vw);
			height: min(197px, 49.2vw);
		}
	}
</style>
