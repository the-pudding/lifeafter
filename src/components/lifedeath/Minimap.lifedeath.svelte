<script>
	// 2D minimap overlay. a plain <canvas> drawn from each person's (x, z)
	// and color. Main calls draw() imperatively each frame, so the ~2,500
	// position/color entries never go through Svelte reactivity
	import { onMount } from "svelte";

	// hidden: CSS-only, not {#if} — unmounting would drop the roomConfig
	// state init() sets once, silently breaking draw() on reappear.
	// panelClear / bottomClear: space to leave at the top and bottom in
	// topdown, so the map clears the control panel and the story text.
	// mode: bindable, so clicking the corner box switches to topdown.
	// onPersonClick(index): a dot was clicked; Main owns the modal state.
	// bounce / onAcknowledge: tap-here ring for an hl_minimap beat, off on first
	// hover or click.
	let {
		mode = $bindable(),
		container,
		hidden = false,
		panelClear = 0,
		bottomClear = 0,
		bounce = false,
		onAcknowledge,
		onPersonClick
	} = $props();

	let minimapCanvas;

	// fixed logical space, whatever the canvas's real size. 2:1, echoing
	// the room's shape
	const MINIMAP_WIDTH_PX = 120;
	const MINIMAP_HEIGHT_PX = 240;
	// circles, so uniform scaling never stretches a person into a blob.
	// HIT_RADIUS is bigger than the dot — it's a fiddly target otherwise
	const PERSON_DOT_RADIUS = 0.85; // ~same area as the old 1.5x1.5 square
	const PERSON_DOT_HIT_RADIUS = 3;
	// gap between plot and canvas border. small — the corner box is tight
	const MINIMAP_OUTER_PADDING = 3;
	// topdown: room below for the "Back to walk view" button
	const TOPDOWN_BOTTOM_CLEAR = 44;
	// breathing room under the control panel, so the legend never sits on
	// the plot's top edge
	const TOPDOWN_PANEL_GAP = 12;
	// room for the age label, which sits below the walker's dot
	const MINIMAP_BOTTOM_PADDING = 16;
	// the walker's own tracking line — full white, opaque, so it still
	// reads as the one thing that's moving, not just another grid line.
	const MINIMAP_LINE_COLOR = "#ffffff";
	// static grid, subtler than the tracking line
	const MINIMAP_AXIS_LINE_COLOR = "rgba(255, 255, 255, 0.3)";
	// fallback tracking-line width in walk mode (see trackingLineWidthLogical
	// in draw()) — that's the size it was originally tuned for.
	const MINIMAP_TRACKING_LINE_WIDTH = 2;
	// margin for the axis labels. zero in the corner box, where the tick
	// lines alone convey the scale
	function axisMargins(mode) {
		return mode === "topdown"
			? { left: 22, top: 16 }
			: { left: 0, top: 0 };
	}

	// set once via init(); never changes, so plain closure state
	let roomConfig = null;
	let minimapZBackWall = 0;
	let minimapScaleX = 1;
	let minimapScaleZ = 1;
	// the last draw() call's own transform params — see hitTestPerson.
	let lastDrawState = null;
	// dot under the pointer, read by draw(). plain variable — draw() runs
	// every frame anyway, so no re-render needed
	let hoveredPersonIndex = null;

	// world -> canvas. X = room width (No left, Yes right). Z = entrance
	// at the bottom (young) to back wall at the top (old)
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
		const { zoneWidth, ageMin, ageMax, ageToZ, bgColorCss } = roomConfig;
		const ctx = minimapCanvas.getContext("2d");
		const isTopdown = mode === "topdown";
		// label margins in topdown only; the corner box stays edge-to-edge
		const { left: axisLeftMargin, top: axisTopMargin } = axisMargins(mode);
		// mirror the left margin on the right, or the contain-scale centers
		// the lopsided block and pulls the plot off-center
		const logicalWidth =
			MINIMAP_WIDTH_PX + axisLeftMargin + axisLeftMargin + MINIMAP_OUTER_PADDING;
		const logicalHeight =
			MINIMAP_HEIGHT_PX + axisTopMargin + MINIMAP_OUTER_PADDING + MINIMAP_BOTTOM_PADDING;
		// everything below draws in the fixed logical space. one uniform
		// scale, never separate X/Y, so circles stay round. leftover space
		// letterboxes rather than stretching
		const scale = Math.min(
			minimapCanvas.width / logicalWidth,
			minimapCanvas.height / logicalHeight
		);
		const offsetX = (minimapCanvas.width - logicalWidth * scale) / 2;
		const offsetY = (minimapCanvas.height - logicalHeight * scale) / 2;
		ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
		ctx.fillStyle = bgColorCss;
		ctx.fillRect(0, 0, logicalWidth, logicalHeight);
		// inside the padding inset. the bg fill above still covers the full box
		ctx.save();
		ctx.translate(MINIMAP_OUTER_PADDING, MINIMAP_OUTER_PADDING);

		// not scaled like the plot — in topdown the box can fill a screen and
		// text would blow up. pinned to on-screen px off the viewport width,
		// then converted back to logical units
		const axisFontCSSPx = Math.max(13, Math.min(13, window.innerWidth / 100));
		const cssPxToLogical = (cssPx) =>
			(cssPx * (minimapCanvas.width / minimapCanvas.clientWidth || 1)) / scale;
		const axisFontLogicalPx = cssPxToLogical(axisFontCSSPx);

		// same CSS-px pinning as the font: fixed logical widths draw far too
		// thick at topdown's scale. axis stays 1 CSS px; the tracking line
		// keeps its walk-mode value and is only pinned in topdown
		const lineWidthLogical = cssPxToLogical(1);
		const trackingLineWidthLogical = isTopdown
			? cssPxToLogical(1.5)
			: MINIMAP_TRACKING_LINE_WIDTH;

		// age axis: a tick every 10 years, full plot width. lines in both
		// modes, numbers only in topdown where there's room
		ctx.strokeStyle = MINIMAP_AXIS_LINE_COLOR;
		ctx.lineWidth = lineWidthLogical;
		const ageAxisStart = Math.ceil(ageMin / 10) * 10;
		const ageAxisEnd = Math.floor(ageMax / 10) * 10;
		if (isTopdown) {
			ctx.textAlign = "right";
			ctx.textBaseline = "middle";
			ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
			ctx.font = `${axisFontLogicalPx}px monospace`;
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

		// group axis: No/Unsure/Yes over their columns. topdown only
		if (isTopdown) {
			ctx.textAlign = "center";
			ctx.textBaseline = "alphabetic";
			ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
			let groupFontPx = axisFontLogicalPx * 1.3;
			ctx.font = `${groupFontPx}px monospace`;
			const zoneColumnWidth = minimapScaleX * zoneWidth;
			const widestGroupLabelWidth = Math.max(
				ctx.measureText("No").width,
				ctx.measureText("Unsure").width,
				ctx.measureText("Yes").width
			);
			if (widestGroupLabelWidth > zoneColumnWidth * 0.85) {
				groupFontPx *= (zoneColumnWidth * 0.85) / widestGroupLabelWidth;
				ctx.font = `${groupFontPx}px monospace`;
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

		// the plot, offset past the margins so the 0-based math stays put
		ctx.save();
		ctx.translate(axisLeftMargin, axisTopMargin);

		// column dividers, echoing the room's zone lines. under the dots
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

		// hovered dot, drawn over the normal pass: bigger, white halo
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

		// whoever's modal is open: an outlined ring, so "selected" reads
		// differently from the filled hover halo above
		if (selectedPersonIndex !== null && selectedPersonIndex < respondentCount) {
			const px = worldXToMinimapPx(minimapX[selectedPersonIndex]);
			const py = worldZToMinimapPx(minimapZ[selectedPersonIndex]);
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = cssPxToLogical(2);
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS * 2.8, 0, Math.PI * 2);
			ctx.stroke();
		}

		// full-width marker at the walker's Z. thicker than the grid — it moves
		const lineY = worldZToMinimapPx(walkerZ);
		ctx.fillStyle = MINIMAP_LINE_COLOR;
		ctx.fillRect(
			0,
			lineY - trackingLineWidthLogical / 2,
			MINIMAP_WIDTH_PX,
			trackingLineWidthLogical
		);

		// walker position plus a heading cone, fading out like a flashlight
		const walkerCanvasX = worldXToMinimapPx(walkerX);
		if (walkerYaw !== undefined) {
			// world forward, same sin/-cos as Main. the map's X/Z scales differ,
			// so convert to map space and re-normalize or the angle won't match
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
			ctx.fillStyle = coneGradient;
			ctx.beginPath();
			ctx.moveTo(walkerCanvasX, lineY);
			ctx.lineTo(farX + perpX, farY + perpY);
			ctx.lineTo(farX - perpX, farY - perpY);
			ctx.closePath();
			ctx.fill();
		}
		ctx.fillStyle = "rgba(254, 253, 254,1)";
		ctx.beginPath();
		ctx.arc(walkerCanvasX, lineY, 4.5, 0, Math.PI * 2);
		ctx.fill();

		// age, below the dot. black-stroked to stay legible over the scatter
		if (currentAge !== null && currentAge !== undefined) {
			const ageLabelFontPx = axisFontLogicalPx * 1.15;
			ctx.font = `bold ${ageLabelFontPx}px monospace`;
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

		// cached for hitTestPerson, which runs on events, not per frame —
		// it needs this frame's transform to map a pointer back to logical space
		lastDrawState = { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin, minimapX, minimapZ, respondentCount };
	}

	// keeps the raster buffer a dpr multiple of the CSS box. re-run by the
	// observer below on any box change
	function resizeMinimapCanvas() {
		const dpr = Math.min(window.devicePixelRatio, 2);
		const w = Math.round(minimapCanvas.clientWidth * dpr);
		const h = Math.round(minimapCanvas.clientHeight * dpr);
		if (w === 0 || h === 0) return;
		minimapCanvas.width = w;
		minimapCanvas.height = h;
	}

	// sizes the topdown box to the content's own ~0.6 aspect, so nothing
	// letterboxes and the map fills it edge to edge. offset by panelClear.
	// reads container, not the canvas being sized. cleared in walk mode
	function layoutMinimapBox() {
		if (mode !== "topdown") {
			minimapCanvas.style.width = "";
			minimapCanvas.style.top = "";
			minimapCanvas.style.height = "";
			// leaving topdown: drop the inline cursor and hover, or they stick
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

	// -> respondent index under the pointer, or null. undoes draw()'s
	// transform via lastDrawState, so hits match what's on screen
	function hitTestPerson(clientX, clientY) {
		if (!lastDrawState || !roomConfig) return null;
		const { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin, minimapX, minimapZ, respondentCount } =
			lastDrawState;
		const rect = minimapCanvas.getBoundingClientRect();
		// CSS px -> raster space; they differ by dpr
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

	// topdown only: pointer cursor only over a real dot, and light it up
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

	// pointer over this canvas's box. Main uses it to stop clicks reaching
	// through; pointer-events:none is only there for drag and scroll
	export function containsPoint(clientX, clientY) {
		// A faded-out map still has a box, but shouldn't swallow clicks.
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
		// minimapCanvas is this component's own bind:this target, so it's
		// already mounted by the time onMount fires here.
		const minimapResizeObserver = new ResizeObserver(resizeMinimapCanvas);
		minimapResizeObserver.observe(minimapCanvas);
		return () => minimapResizeObserver.disconnect();
	});

	// container is Main's bind:this, which may not have resolved when this
	// child's onMount runs. an $effect re-runs once it's a real element
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
	bind:this={minimapCanvas}
	onclick={(event) => {
		onAcknowledge?.();
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

<!-- hl_minimap beat: a glowing ring over the corner map, saying "tap here".
     pointer-events off, so the tap lands on the canvas underneath -->
{#if bounce && mode !== "topdown" && !hidden}
	<div class="minimap-tap" aria-hidden="true"></div>
{/if}

<style>
	/* A small corner box by default; the large main view in topdown mode.
	   draw()'s uniform "contain" scale letterboxes rather than stretches
	   whenever this box's own aspect ratio doesn't match the script's
	   logical size (MINIMAP_WIDTH_PX/HEIGHT_PX plus MINIMAP_OUTER_PADDING —
	   walk mode reserves no axis-label margin, see axisMargins) — so this
	   box's width/height should track that logical aspect closely, or the
	   border ends up visibly gapped from the drawn map. ControlPanel.svelte's
	   toggle button sits at the same small-box coordinates in both modes. */
	.minimap-canvas {
		position: absolute;
		right: 10px;
		bottom: 50px;
		width: 124px;
		height: 244px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0rem;
		/* the small walk-mode corner box is click-to-switch (see the
		   canvas's own onclick); the full-bleed topdown map (below) is
		   click-a-dot-to-open-their-modal (see hitTestPerson) — both need
		   real pointer events, unlike drag-to-steer/scroll-to-walk (which
		   only ever apply in walk mode anyway, so there's nothing for this
		   to block by capturing the pointer here in topdown). */
		pointer-events: auto;
		z-index: 5;
		touch-action: none;
		cursor: pointer;
		background: #10000E;
	}
	/* story beats show and hide this, so it fades rather than cuts. opacity
	   rather than display:none, which can't transition; pointer-events are
	   dropped so a faded-out map can't still be clicked. */
	.minimap-canvas {
		transition: opacity 320ms ease-out;
	}
	.minimap-canvas.is-hidden {
		opacity: 0;
		pointer-events: none;
	}
	/* the hl_minimap cue: a soft white ring that breathes, centred on the
	   corner map. sits over the canvas rather than moving it, so the map
	   itself stays still and legible. transform/opacity only, so it runs on
	   the compositor — the three.js loop next door keeps the main thread
	   busy enough that anything else stutters. */
	.minimap-tap {
		position: absolute;
		right: 10px;
		bottom: 50px;
		width: 124px;
		height: 244px;
		pointer-events: none;
		z-index: 6;
		display: grid;
		place-items: center;
	}
	.minimap-tap::after {
		content: "";
		width: 46px;
		height: 46px;
		border-radius: 50%;
		border: 2px solid rgba(255, 255, 255, 0.9);
		background: rgba(255, 255, 255, 0.12);
		box-shadow:
			0 0 18px 6px rgba(255, 255, 255, 0.45),
			inset 0 0 12px rgba(255, 255, 255, 0.35);
		animation: minimap-tap-pulse 1.8s ease-out infinite;
	}
	@keyframes minimap-tap-pulse {
		0% {
			transform: scale(0.72);
			opacity: 0.35;
		}
		45% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.35);
			opacity: 0;
		}
	}
	@media (max-width: 640px) {
		.minimap-tap {
			width: min(100px, 25vw);
			height: min(197px, 49.2vw);
		}
		.minimap-tap::after {
			width: 34px;
			height: 34px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.minimap-tap::after {
			animation: none;
			opacity: 0.9;
		}
	}

	.minimap-canvas.topdown-active {
		left: 50%;
		right: auto;
		transform: translateX(-50%);
		/* above app.css's .story-overlay (z-index: 10) — in topdown mode
		   this map IS the main view, so it shouldn't ever end up tucked
		   behind that bottom text box. */
		z-index: 11;
		/* top/width/height are all set inline by layoutMinimapBox above,
		   sized to both clear ControlPanel's real measured height
		   (panelClear) and match the map's own content aspect ratio — no
		   fixed width here (a `width: 100%` used to override that inline
		   width via !important, forcing a box shape that didn't match the
		   content and left it letterboxed). */
		border: none;
		background: #10000E;
	}

	/* phones: a smaller corner box, it was eating the screen. the two
	   bounds are kept in the drawn map's own 124:244 proportion (49.2vw is
	   25vw x 244/124) — draw() fits by "contain", so a box of another shape
	   just letterboxes inside its border */
	@media (max-width: 640px) {
		.minimap-canvas:not(.topdown-active) {
			width: min(100px, 25vw);
			height: min(197px, 49.2vw);
		}
	}
</style>
