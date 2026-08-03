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

	let { mode, container } = $props();

	let minimapCanvas;

	// A fixed logical coordinate space regardless of this canvas's actual
	// on-screen size/aspect (see draw()'s uniform "contain" scale) — taller
	// than wide (2:1) to echo the room's own very elongated shape.
	const MINIMAP_WIDTH_PX = 120;
	const MINIMAP_HEIGHT_PX = 240;
	// Reserved margin for the age (left) and No/Unsure/Yes group (top)
	// axis labels+lines, outside the room-plot area itself.
	const MINIMAP_AXIS_LEFT_MARGIN = 16;
	const MINIMAP_AXIS_TOP_MARGIN = 12;
	const MINIMAP_LOGICAL_WIDTH = MINIMAP_WIDTH_PX + MINIMAP_AXIS_LEFT_MARGIN;
	const MINIMAP_LOGICAL_HEIGHT = MINIMAP_HEIGHT_PX + MINIMAP_AXIS_TOP_MARGIN;

	// Room-layout config, handed over once via init() (see Main's onMount) —
	// none of this changes afterward, so it's plain closure state rather
	// than reactive props.
	let roomConfig = null;
	let minimapZBackWall = 0;
	let minimapScaleX = 1;
	let minimapScaleZ = 1;

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
		minimapX,
		minimapZ,
		personColorCSS,
		respondentCount
	}) {
		if (!roomConfig || !minimapCanvas) return;
		const { zoneWidth, ageMin, ageMax, ageToZ, bgColorCss } = roomConfig;
		const ctx = minimapCanvas.getContext("2d");
		// The drawing below is all in the fixed MINIMAP_LOGICAL_WIDTH x
		// MINIMAP_LOGICAL_HEIGHT coordinate space regardless of the canvas's
		// actual raster size/aspect (small corner box in walk mode,
		// capped-at-square full-bleed in topdown mode — see .topdown-active
		// CSS and layoutMinimapBox). A single uniform scale (never separate
		// X/Y factors) keeps circles circular and text unwarped; any
		// leftover space is centered as letterboxing instead of stretching.
		const scale = Math.min(
			minimapCanvas.width / MINIMAP_LOGICAL_WIDTH,
			minimapCanvas.height / MINIMAP_LOGICAL_HEIGHT
		);
		const offsetX = (minimapCanvas.width - MINIMAP_LOGICAL_WIDTH * scale) / 2;
		const offsetY =
			(minimapCanvas.height - MINIMAP_LOGICAL_HEIGHT * scale) / 2;
		ctx.setTransform(scale, 0, 0, scale, offsetX, offsetY);
		ctx.fillStyle = bgColorCss;
		ctx.fillRect(0, 0, MINIMAP_LOGICAL_WIDTH, MINIMAP_LOGICAL_HEIGHT);

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
		const axisFontCSSPx = Math.max(9, Math.min(13, window.innerWidth / 100));
		const axisFontLogicalPx =
			(axisFontCSSPx * (minimapCanvas.width / minimapCanvas.clientWidth || 1)) /
			scale;

		// Age axis (left): a tick line + label every 10 years, spanning the
		// full plot width, in the same Z->pixel space worldZToMinimapPx
		// already uses for the age line below.
		ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
		ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
		ctx.font = `${axisFontLogicalPx}px sans-serif`;
		ctx.textAlign = "right";
		ctx.textBaseline = "middle";
		ctx.lineWidth = 1;
		const ageAxisStart = Math.ceil(ageMin / 10) * 10;
		const ageAxisEnd = Math.floor(ageMax / 10) * 10;
		for (let age = ageAxisStart; age <= ageAxisEnd; age += 10) {
			const y = MINIMAP_AXIS_TOP_MARGIN + worldZToMinimapPx(ageToZ(age));
			ctx.beginPath();
			ctx.moveTo(MINIMAP_AXIS_LEFT_MARGIN, y);
			ctx.lineTo(MINIMAP_LOGICAL_WIDTH, y);
			ctx.stroke();
			ctx.fillText(String(age), MINIMAP_AXIS_LEFT_MARGIN - 3, y);
		}

		// Group axis (top): No/Unsure/Yes labels over their column, same
		// X->pixel space worldXToMinimapPx already uses for the column
		// dividers below. Shrunk to fit the ~40-logical-unit column width
		// (measured, not guessed) on top of the screen-relative cap above —
		// the small default corner box doesn't have much width to work
		// with, and "Unsure" is long enough to run into "Yes" there otherwise.
		ctx.textAlign = "center";
		ctx.textBaseline = "alphabetic";
		ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
		let groupFontPx = axisFontLogicalPx * 1.1;
		ctx.font = `${groupFontPx}px sans-serif`;
		const zoneColumnWidth = minimapScaleX * zoneWidth;
		const widestGroupLabelWidth = Math.max(
			ctx.measureText("No").width,
			ctx.measureText("Unsure").width,
			ctx.measureText("Yes").width
		);
		if (widestGroupLabelWidth > zoneColumnWidth * 0.85) {
			groupFontPx *= (zoneColumnWidth * 0.85) / widestGroupLabelWidth;
			ctx.font = `${groupFontPx}px sans-serif`;
		}
		const groupLabelY = MINIMAP_AXIS_TOP_MARGIN - 3;
		ctx.fillText(
			"No",
			MINIMAP_AXIS_LEFT_MARGIN + worldXToMinimapPx(-zoneWidth),
			groupLabelY
		);
		ctx.fillText(
			"Unsure",
			MINIMAP_AXIS_LEFT_MARGIN + worldXToMinimapPx(0),
			groupLabelY
		);
		ctx.fillText(
			"Yes",
			MINIMAP_AXIS_LEFT_MARGIN + worldXToMinimapPx(zoneWidth),
			groupLabelY
		);

		// The room plot itself, offset past the axis margins so
		// worldXToMinimapPx/worldZToMinimapPx's own 0-based math (and every
		// hand-tuned constant below) stays unchanged.
		ctx.save();
		ctx.translate(MINIMAP_AXIS_LEFT_MARGIN, MINIMAP_AXIS_TOP_MARGIN);

		// Light dividers between the No/Unsure/Yes columns, echoing the
		// zone lines on the actual room floor — drawn under the people
		// dots (like the age line's floor markings) rather than over them.
		ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
		for (const x of [-zoneWidth / 2, zoneWidth / 2]) {
			const px = worldXToMinimapPx(x);
			ctx.fillRect(px - 0.5, 0, 1, MINIMAP_HEIGHT_PX);
		}

		// The whole room's layout is shown at once now, not just the
		// extent the walker has reached — it's a map, not a fog-of-war
		// reveal. Circles (not squares) so uniform scaling above never
		// turns a person into a stretched blob.
		const PERSON_DOT_RADIUS = 0.85; // ~same area as the old 1.5x1.5 square
		for (let i = 0; i < respondentCount; i++) {
			const px = worldXToMinimapPx(minimapX[i]);
			const py = worldZToMinimapPx(minimapZ[i]);
			ctx.fillStyle = personColorCSS[i];
			ctx.beginPath();
			ctx.arc(px, py, PERSON_DOT_RADIUS, 0, Math.PI * 2);
			ctx.fill();
		}

		// The age line: a full-width marker at the walker's current Z.
		const lineY = worldZToMinimapPx(walkerZ);
		ctx.fillStyle = "rgba(255,255,255,0.4)";
		ctx.fillRect(0, lineY - 1, MINIMAP_WIDTH_PX, 1);

		// The walker's facing direction: a cone fading from the walker's
		// own color at the center out to fully transparent, like a
		// flashlight beam. World forward (sin(yaw), -cos(yaw)) is mapped
		// into canvas space with the same per-axis scale
		// worldXToMinimapPx/worldZToMinimapPx use — no extra sign flip
		// needed since both axes already increase in the same direction on
		// the canvas as they do in world space.
		const walkerCanvasX = worldXToMinimapPx(walkerX);
		const forwardCanvasX = Math.sin(walkerYaw) * minimapScaleX;
		const forwardCanvasY = -Math.cos(walkerYaw) * minimapScaleZ;
		const headingAngle = Math.atan2(forwardCanvasY, forwardCanvasX);
		const FOV_HALF_ANGLE = Math.PI / 5;
		const FOV_RADIUS = 26;
		const fovGradient = ctx.createRadialGradient(
			walkerCanvasX,
			lineY,
			0,
			walkerCanvasX,
			lineY,
			FOV_RADIUS
		);
		fovGradient.addColorStop(0, "rgba(254, 253, 254, 0.65)");
		fovGradient.addColorStop(1, "rgba(254, 253, 254, 0)");
		ctx.fillStyle = fovGradient;
		ctx.beginPath();
		ctx.moveTo(walkerCanvasX, lineY);
		ctx.arc(
			walkerCanvasX,
			lineY,
			FOV_RADIUS,
			headingAngle - FOV_HALF_ANGLE,
			headingAngle + FOV_HALF_ANGLE
		);
		ctx.closePath();
		ctx.fill();

		// The walker's own exact position, drawn on top of the cone.
		ctx.fillStyle = "rgba(254, 253, 254,1)";
		ctx.beginPath();
		ctx.arc(walkerCanvasX, lineY, 3, 0, Math.PI * 2);
		ctx.fill();

		ctx.restore();
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

	// Caps the enlarged topdown minimap's width at its own height — "the
	// most horizontal it should be allowed to get is a 1x1 square" —
	// rather than stretching it to fill however wide the main area happens
	// to be. Reads container's size directly (not minimapCanvas's own —
	// that's the box being computed here, and its CSS no longer sets a
	// width at all in topdown mode, see .topdown-active). Cleared back to
	// the CSS-driven small corner box in walk mode, so no stale inline
	// width lingers once topdown mode is left.
	function layoutMinimapBox() {
		if (mode !== "topdown") {
			minimapCanvas.style.width = "";
			return;
		}
		const availW = container.clientWidth;
		const availH = container.clientHeight;
		minimapCanvas.style.width = `${Math.min(availW, availH)}px`;
	}

	$effect(() => {
		mode;
		if (minimapCanvas && container) layoutMinimapBox();
	});

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
></canvas>

<style>
	/* A small corner box by default; the large main view in topdown mode.
	   draw()'s uniform "contain" scale letterboxes rather than stretches
	   whenever this box's own aspect ratio doesn't match
	   MINIMAP_LOGICAL_WIDTH/HEIGHT in the script (MINIMAP_WIDTH_PX/HEIGHT_PX
	   plus the axis-label margins) — so this box's width/height must match
	   that logical aspect exactly, or the border ends up visibly gapped
	   from the drawn map on whichever axis doesn't match. ControlPanel.svelte's
	   toggle button sits at the same small-box coordinates in both modes. */
	.minimap-canvas {
		position: absolute;
		right: 24px;
		bottom: 50px;
		width: 136px;
		height: 252px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0rem;
		pointer-events: none;
		z-index: 5;
		touch-action: none;
	}
	.minimap-canvas.topdown-active {
		top: 0;
		bottom: 0;
		left: 50%;
		right: auto;
		transform: translateX(-50%);
		height: 100%;
		/* width is set inline by layoutMinimapBox above — capped at the
		   box's own height so it can never get wider than a 1:1 square,
		   however wide the available area is. */
		border: none;
	}
</style>
