<script>
	// The plain 2D minimap overlay — not a second three.js render pass, just
	// a <canvas> drawn from each person's flat (x, z) position and current
	// color, both of which Main.lifedeath.svelte's updatePeoplePositions/
	// applyColorVariable already track every frame. Pulled out of
	// Main.lifedeath.svelte as its own component since drawing/sizing this
	// canvas is a self-contained concern; Main still owns the crowd
	// simulation data itself and just calls draw() every frame (see
	// animate() there) — that's an imperative per-frame call, not a Svelte
	// prop, so the ~2,500-person position/color arrays never have to go
	// through Svelte's reactivity on every frame.
	import { onMount } from "svelte";

	// hidden hides the canvas visually only (CSS, not {#if}) — some
	// copy.json story beats (see Main's hideMap) want the map off-screen
	// temporarily. Unmounting instead would drop the roomConfig/scale
	// state init() below only ever sets once, breaking draw() silently
	// the next time this map should reappear.
	// panelClear: pixels of vertical space to leave clear at the top in
	// topdown mode, so the enlarged map doesn't sit under ControlPanel
	// (see Main's controlPanelHeight, measured from the real panel
	// element since its height varies with content/viewport).
	// mode is bindable so the small walk-mode corner box can switch
	// straight to topdown on click (see the canvas's own onclick below),
	// the same toggle ControlPanel.svelte's button already does — clicking
	// anywhere on that box, not just a dedicated button, now does it.
	// onPersonClick(index): fired when a person's dot is clicked in
	// top-down mode (see hitTestPerson/the canvas's own onclick) — Main
	// owns the actual clickedPerson/clickedPersonIndex state the modal
	// reads, so this just reports which respondent index was hit.
	let {
		mode = $bindable(),
		container,
		hidden = false,
		panelClear = 0,
		onPersonClick
	} = $props();

	let minimapCanvas;

	// A fixed logical coordinate space regardless of this canvas's actual
	// on-screen size/aspect (see draw()'s uniform "contain" scale) — taller
	// than wide (2:1) to echo the room's own very elongated shape.
	const MINIMAP_WIDTH_PX = 120;
	const MINIMAP_HEIGHT_PX = 240;
	// The whole room's layout is shown at once now, not just the extent the
	// walker has reached — it's a map, not a fog-of-war reveal. Circles
	// (not squares) so uniform scaling in draw() never turns a person into
	// a stretched blob. HIT_RADIUS is deliberately bigger than the drawn
	// dot (see hitTestPerson) — a dot this small is a fiddly click target
	// at its own exact radius.
	const PERSON_DOT_RADIUS = 0.85; // ~same area as the old 1.5x1.5 square
	const PERSON_DOT_HIT_RADIUS = 3;
	// Breathing room between the plot/axes and the canvas's own outer
	// border — kept small on purpose, the small corner box has little
	// room to spare and the walker's own dot already sits close to it.
	const MINIMAP_OUTER_PADDING = 3;
	// Topdown mode only: clears space below the enlarged map box for
	// ControlPanel's "Back to walk view" button, which sits fixed to the
	// container's own bottom edge (see ControlPanel's .minimap-toggle) —
	// without this the map's bottom edge ran flush to the container
	// bottom too, right under/behind that button.
	const TOPDOWN_BOTTOM_CLEAR = 44;
	// Extra room below the room plot specifically — the age label now sits
	// below the walker's dot (see draw()) rather than above it, so it
	// needs somewhere to land without getting clipped by the canvas's own
	// bottom edge when the walker's near the entrance (bottom of the plot).
	const MINIMAP_BOTTOM_PADDING = 16;
	// The walker's own tracking line — full white, opaque, so it still
	// reads as the one thing that's moving, not just another grid line.
	const MINIMAP_LINE_COLOR = "#ffffff";
	// The static axis grid (age ticks, zone dividers) stays subtler than
	// the tracking line above — a faint structural hint, not competing
	// with the dot scatter or the tracking line for attention.
	const MINIMAP_AXIS_LINE_COLOR = "rgba(255, 255, 255, 0.3)";
	// Fallback tracking-line width in walk mode (see trackingLineWidthLogical
	// in draw()) — that's the size it was originally tuned for.
	const MINIMAP_TRACKING_LINE_WIDTH = 2;
	// Reserved margin for the age (left) and No/Unsure/Yes group (top)
	// axis labels, outside the room-plot area itself. Zero in the small
	// walk-mode corner box — no room to spare there, and the tick lines
	// (drawn regardless of mode, see draw()) already convey the age scale
	// well enough at that size. The full-screen top-down view has room to
	// spare, so both axes get their labels back there.
	function axisMargins(mode) {
		return mode === "topdown"
			? { left: 22, top: 16 }
			: { left: 0, top: 0 };
	}

	// Room-layout config, handed over once via init() (see Main's onMount) —
	// none of this changes afterward, so it's plain closure state rather
	// than reactive props.
	let roomConfig = null;
	let minimapZBackWall = 0;
	let minimapScaleX = 1;
	let minimapScaleZ = 1;
	// The last draw() call's own transform params — see hitTestPerson.
	let lastDrawState = null;
	// The respondent index currently under the pointer in top-down mode
	// (see handleMinimapMouseMove) — read by draw() each frame to light
	// that dot up. Plain variable, not $state: draw() is called
	// imperatively every frame regardless (see Main's animate()), so
	// there's no need to trigger a Svelte re-render on every hover change.
	let hoveredPersonIndex = null;

	// World bounds mapped onto the canvas: X across the full room width
	// (No=left, Yes=right); Z from the entrance (bottom of the canvas — the
	// young end, where you walk in) to the back wall (top — the old end).
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
		// Axis label margins only reserved in top-down mode (see
		// axisMargins) — the small walk-mode corner box stays edge-to-edge
		// with the room plot, just the outer padding below.
		const { left: axisLeftMargin, top: axisTopMargin } = axisMargins(mode);
		// axisLeftMargin only ever adds space on the LEFT (room for the age
		// numbers, see axisMargins) — left unmatched, that pulls the actual
		// room plot off-center within the square topdown box, since the
		// "contain" scale/letterboxing below centers the whole logical
		// block (plot + its lopsided margin) rather than the plot itself.
		// Mirroring the same amount of blank space on the right keeps the
		// plot itself visually centered; the age numbers stay left-only,
		// which is fine, that's their intended position.
		const logicalWidth =
			MINIMAP_WIDTH_PX + axisLeftMargin + axisLeftMargin + MINIMAP_OUTER_PADDING;
		const logicalHeight =
			MINIMAP_HEIGHT_PX + axisTopMargin + MINIMAP_OUTER_PADDING + MINIMAP_BOTTOM_PADDING;
		// The drawing below is all in the fixed logicalWidth x logicalHeight
		// coordinate space regardless of the canvas's actual raster
		// size/aspect (small corner box in walk mode, capped-at-square
		// full-bleed in topdown mode — see .topdown-active CSS and
		// layoutMinimapBox). A single uniform scale (never separate X/Y
		// factors) keeps circles circular and text unwarped; any leftover
		// space is centered as letterboxing instead of stretching.
		const scale = Math.min(
			minimapCanvas.width / logicalWidth,
			minimapCanvas.height / logicalHeight
		);
		const offsetX = (minimapCanvas.width - logicalWidth * scale) / 2;
		const offsetY = (minimapCanvas.height - logicalHeight * scale) / 2;
		ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
		ctx.fillStyle = bgColorCss;
		ctx.fillRect(0, 0, logicalWidth, logicalHeight);
		// Everything from here down draws inside the outer-padding inset
		// (see MINIMAP_OUTER_PADDING) — the background fill above still
		// covers the full box, so this just leaves a blank margin between
		// the axis/plot content and the canvas's own border.
		ctx.save();
		ctx.translate(MINIMAP_OUTER_PADDING, MINIMAP_OUTER_PADDING);

		// Axis label text size: deliberately NOT just "scale" logical px
		// like everything else above — in topdown mode the box (and so
		// `scale`) can grow to fill an entire desktop screen, and text
		// scaled the same uniform amount as the room plot would blow up to
		// a huge, illegible size. Instead it's pinned to a small range of
		// actual on-screen pixels tied to the viewport's own width (not
		// this box's, which can be much bigger), then converted back into
		// logical units by dividing out `scale` (dpr cancels out: raster
		// pixels-per-logical-unit / raster-pixels-per-CSS-pixel =
		// CSS-pixels-per-logical-unit).
		const axisFontCSSPx = Math.max(13, Math.min(13, window.innerWidth / 100));
		const cssPxToLogical = (cssPx) =>
			(cssPx * (minimapCanvas.width / minimapCanvas.clientWidth || 1)) / scale;
		const axisFontLogicalPx = cssPxToLogical(axisFontCSSPx);

		// Grid/tracking line widths, converted the same CSS-px-pinned way as
		// axisFontLogicalPx just above — MINIMAP_LINE_WIDTH/
		// MINIMAP_TRACKING_LINE_WIDTH's own fixed logical-unit values only
		// ever looked right at the small walk-mode corner box's own scale;
		// at topdown's much larger scale (the box can fill a whole desktop
		// screen), the same logical width draws several times thicker on
		// screen. The axis stays a flat 1 CSS px regardless of mode; the
		// tracking line keeps walk mode's original fixed value (that's the
		// size it was tuned for) and only gets the same CSS-px pinning in topdown.
		const lineWidthLogical = cssPxToLogical(1);
		const trackingLineWidthLogical = isTopdown
			? cssPxToLogical(1.5)
			: MINIMAP_TRACKING_LINE_WIDTH;

		// Age axis (left): a tick line every 10 years — spanning the plot's
		// actual width, in the same Z->pixel space worldZToMinimapPx
		// already uses for that line. Drawn in both modes (cheap, and
		// still reads fine with no label at the small corner size); the
		// number next to each line only appears in top-down mode, where
		// axisLeftMargin actually reserves room for it.
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

		// Group axis (top): No/Unsure/Yes labels over their column, same
		// X->pixel space worldXToMinimapPx already uses for the column
		// dividers below. Top-down only — axisTopMargin is 0 otherwise, no
		// room reserved for this band at the small corner-box size.
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

		// The room plot itself, offset past the axis margins so
		// worldXToMinimapPx/worldZToMinimapPx's own 0-based math (and every
		// hand-tuned constant below) stays unchanged.
		ctx.save();
		ctx.translate(axisLeftMargin, axisTopMargin);

		// Light dividers between the No/Unsure/Yes columns, echoing the
		// zone lines on the actual room floor — drawn under the people
		// dots (like the age line's floor markings) rather than over them.
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

		// The hovered dot (see hitTestPerson/handleMinimapMouseMove), lit up
		// on top of the normal pass above — bigger and haloed in white so
		// it's obvious which one a click would open, same idea as the
		// walk-view crowd's own hoveredPersonBrightness.
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

		// Whoever's respondent modal is currently open (see Main's
		// clickedPersonIndex) — a persistent white ring, distinct from the
		// hover halo above (filled circle vs an outlined ring) so
		// "selected" and "currently hovered" read as two different things,
		// including when they're the same dot at once.
		if (selectedPersonIndex !== null && selectedPersonIndex < respondentCount) {
			const px = worldXToMinimapPx(minimapX[selectedPersonIndex]);
			const py = worldZToMinimapPx(minimapZ[selectedPersonIndex]);
			ctx.strokeStyle = "#ffffff";
			ctx.lineWidth = cssPxToLogical(2);
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS * 2.8, 0, Math.PI * 2);
			ctx.stroke();
		}

		// The age line: a full-width marker at the walker's current Z,
		// thicker than the static grid lines (see MINIMAP_TRACKING_LINE_WIDTH)
		// since this is the one that actually moves as they walk.
		const lineY = worldZToMinimapPx(walkerZ);
		ctx.fillStyle = MINIMAP_LINE_COLOR;
		ctx.fillRect(
			0,
			lineY - trackingLineWidthLogical / 2,
			MINIMAP_WIDTH_PX,
			trackingLineWidthLogical
		);

		// The walker's own exact position, plus a heading cone showing
		// which way the camera's currently facing — sharp point at the
		// walker (where else), fanning out and fading to fully transparent
		// at the far end, like a flashlight beam rather than an arrow.
		const walkerCanvasX = worldXToMinimapPx(walkerX);
		if (walkerYaw !== undefined) {
			// Forward in world space (same sin/-cos convention Main's own
			// forwardX/forwardZ use for movement). The map's X/Z scale
			// isn't uniform (minimapScaleX vs minimapScaleZ, see init()),
			// so this direction is converted into map-pixel space and
			// re-normalized before use — otherwise the cone's apparent
			// angle wouldn't visually match the camera's real facing.
			const forwardX = Math.sin(walkerYaw);
			const forwardZ = -Math.cos(walkerYaw);
			let dx = forwardX * minimapScaleX;
			let dy = forwardZ * minimapScaleZ;
			const len = Math.hypot(dx, dy) || 1;
			dx /= len;
			dy /= len;
			const coneLength = 26;
			const coneHalfWidth = 10;
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
		ctx.arc(walkerCanvasX, lineY, 3, 0, Math.PI * 2);
		ctx.fill();

		// The current age, centered below the dot and moving with it —
		// black-stroked so it stays legible over the busy dot scatter
		// behind it, same outline-then-fill approach as the neon text
		// elsewhere in this app.
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

		// Cached for hitTestPerson below — click/hover hit-testing runs on
		// its own (mousemove/click), not every frame, so it needs this
		// frame's transform params to map a raw pointer position back into
		// the same logical space worldXToMinimapPx/worldZToMinimapPx draw
		// in, rather than redoing (and risking drifting out of sync with)
		// draw()'s own math.
		lastDrawState = { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin, minimapX, minimapZ, respondentCount };
	}

	// Keeps the canvas's raster buffer a crisp devicePixelRatio multiple of
	// its current CSS box (see draw()'s ctx.setTransform) — re-run via
	// ResizeObserver below whenever that box changes, including the
	// walk/topdown layout swap.
	function resizeMinimapCanvas() {
		const dpr = Math.min(window.devicePixelRatio, 2);
		const w = Math.round(minimapCanvas.clientWidth * dpr);
		const h = Math.round(minimapCanvas.clientHeight * dpr);
		if (w === 0 || h === 0) return;
		minimapCanvas.width = w;
		minimapCanvas.height = h;
	}

	// Sizes the enlarged topdown minimap box to draw()'s own logical
	// content aspect ratio (MINIMAP_WIDTH_PX/HEIGHT_PX plus the topdown
	// axis margins/padding — see draw()'s logicalWidth/logicalHeight),
	// instead of capping it at a 1x1 square. A square box is much wider
	// than that content's own ~0.6 aspect, so draw()'s internal "contain"
	// scale was letterboxing it down to a much smaller map inside a mostly
	// empty square — this way the box IS already the right shape, so
	// there's nothing left to letterbox and the map fills its box edge to
	// edge. Also pushes the box down by panelClear so it starts clear of
	// ControlPanel instead of running under it. Reads container's size
	// directly (not minimapCanvas's own — that's the box being computed
	// here). Cleared back to the CSS-driven small corner box in walk mode,
	// so no stale inline sizing lingers once topdown mode is left.
	function layoutMinimapBox() {
		if (mode !== "topdown") {
			minimapCanvas.style.width = "";
			minimapCanvas.style.top = "";
			minimapCanvas.style.height = "";
			// Leaving topdown mode: drop any inline cursor hitTestPerson's
			// hover handling left behind, so the small corner box's usual
			// CSS-driven `cursor: pointer` (see .minimap-canvas) takes back
			// over instead of getting stuck at whatever it last was, and
			// clear the hover highlight too so it doesn't linger onto a
			// small corner box that was never actually hovered.
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

		const availW = container.clientWidth;
		const availH = Math.max(
			0,
			container.clientHeight - panelClear - TOPDOWN_BOTTOM_CLEAR
		);
		let width = availH * contentAspect;
		let height = availH;
		if (width > availW) {
			width = availW;
			height = availW / contentAspect;
		}
		minimapCanvas.style.top = `${panelClear}px`;
		minimapCanvas.style.height = `${height}px`;
		minimapCanvas.style.width = `${width}px`;
	}

	$effect(() => {
		mode;
		panelClear;
		if (minimapCanvas && container) layoutMinimapBox();
	});

	// The respondent index whose dot sits under (clientX, clientY), within
	// PERSON_DOT_HIT_RADIUS — null if none. Undoes draw()'s own transform
	// pipeline (ctx.setTransform's scale/offset, then the outer-padding and
	// axis-margin translates) using lastDrawState, the same call's params,
	// so a hit here always matches what's actually visible on screen.
	function hitTestPerson(clientX, clientY) {
		if (!lastDrawState || !roomConfig) return null;
		const { scale, offsetX, offsetY, axisLeftMargin, axisTopMargin, minimapX, minimapZ, respondentCount } =
			lastDrawState;
		const rect = minimapCanvas.getBoundingClientRect();
		// CSS-pixel pointer position -> this canvas's own raster space
		// (its width/height attributes can differ from its CSS box by
		// devicePixelRatio, see resizeMinimapCanvas).
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

	// Top-down mode only (see the canvas's own onclick/onmousemove/
	// onmouseleave below): a normal cursor by default, switching to
	// pointer only while actually hovering a clickable dot — rather than
	// always showing pointer over the whole map regardless of whether
	// anything's under it. Also lights that same dot up (see draw()'s own
	// hoveredPersonIndex check) so it's obvious which one a click would open.
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

	// True while the given pointer position sits over this canvas's own
	// on-screen box — used by Main.lifedeath.svelte to stop a door/person
	// click from reaching through the minimap (it's pointer-events:none
	// purely so drag-to-steer/scroll-to-walk still reach the 3D canvas
	// underneath it, not so clicks should reach through to whatever's behind it).
	export function containsPoint(clientX, clientY) {
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

	// container, by contrast, is Main.lifedeath.svelte's own bind:this
	// target passed down as a prop — its bind:this effect there isn't
	// guaranteed to have resolved yet by the time this component's onMount
	// runs (a child's onMount can fire before an ancestor element's own
	// bind:this settles), so observing it eagerly in onMount above threw
	// "parameter 1 is not of type 'Element'" here. A reactive $effect
	// instead re-runs once the prop actually turns into a real element.
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
	bind:this={minimapCanvas}
	{hidden}
	onclick={(event) => {
		if (mode !== "topdown") {
			mode = "topdown";
			return;
		}
		const index = hitTestPerson(event.clientX, event.clientY);
		if (index !== null) onPersonClick?.(index);
	}}
	onmousemove={handleMinimapMouseMove}
	onmouseleave={handleMinimapMouseLeave}
></canvas>

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
		/* The small walk-mode corner box is click-to-switch (see the
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
	/* Main.lifedeath.svelte's own global `.lifedeath-room :global(canvas) {
	   display: block; }` rule is an author-stylesheet rule, so it beats the
	   browser's built-in `[hidden] { display: none }` UA rule outright
	   (author always wins over UA, regardless of specificity) — without
	   this, the hidden attribute set from Main's hideMap prop above had no
	   visible effect. This selector's two classes/attribute outrank that
	   rule's one class + one type selector, so it wins the (now
	   author-vs-author) specificity fight instead. */
	.minimap-canvas[hidden] {
		display: none;
	}
	.minimap-canvas.topdown-active {
		left: 50%;
		right: auto;
		transform: translateX(-50%);
		/* Above app.css's .story-overlay (z-index: 10) — in topdown mode
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

	@media (max-width: 640px) {
		.minimap-canvas:not(.topdown-active) {
			width: min(124px, 30vw);
			height: min(244px, 30vh);
		}
	}
</style>
