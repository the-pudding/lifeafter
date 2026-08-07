<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import * as THREE from "three";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	// Used once, up front, to weld the walker GLB's low-poly hard-edged
	// geometry into smooth-shaded geometry — see smoothGeometry() below.
	import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
	// A fork of three's own OutlineEffect that wobbles the outline's
	// extruded hull per-vertex, so the line reads as hand-drawn instead of
	// a perfectly smooth silhouette — see the file itself for why it's a
	// full fork rather than a wrapper.
	import { PencilOutlineEffect } from "./PencilOutlineEffect.js";
	import { buildRoomShell } from "./roomShell.js";
	import { buildFacade, FACADE_LINK_DIM_BRIGHTNESS } from "./facade.js";
	import { buildDoors, DOOR_LABEL_DIM_BRIGHTNESS } from "./doors.js";
	import { createInputController } from "./inputController.js";
	import { spawnCrowd } from "./crowd.js";
	import {
		computeLayout,
		initializeCrowdState,
		createCrowdAnimator
	} from "./crowdSimulation.js";
	// The exterior facade/door labels are now these hand-drawn SVGs
	// instead of canvas-drawn text (see facade.js's buildingSign/byline
	// and doors.js's own per-door label).
	import noSvg from "$svg/no.svg?raw";
	import unsureSvg from "$svg/unsure.svg?raw";
	import yesSvg from "$svg/yes.svg?raw";

	// Drives the "Color by" dropdown: label/parent/grouping for every
	// variable, plus per-category/per-range colors so the recolor and its
	// legend both come from one edited-by-hand source of truth.
	import {
		variableConfig,
		groupedVariableOptions,
		getColumns,
		getCategoryFor,
		getRangeFor
	} from "$data/variable_config.js";
	// Age/zone-triggered story text (see updateStoryText) — "all" entries
	// show regardless of which third of the room the camera is in, the
	// other three only show while in their own matching zone.
	import copy from "$data/copy.json";

	import ControlPanel from "./ControlPanel.svelte";
	import Modal from "./Modal.lifedeath.svelte";
	import Minimap from "./Minimap.lifedeath.svelte";
	import {
		wrapAngle,
		shortestAngleDelta,
		createAgeZMapping,
		createOuterDoorCollisionResolver,
		createInnerWallCollisionResolver,
		computeFovForHorizontalHalfAngle,
		smoothDamp
	} from "./roomMath.js";

	// Fetched at runtime (~17MB) rather than imported as a module
	const PEOPLE_DATA_URL = "data/people.json";
	// Low-poly rigged humanoids with a baked-in "Walk" clip, one body per
	// GENDER x body-type combo; each crowd member clones whichever matches
	// their own GENDER. CC-BY-4.0 (Sketchfab, "Base Mesh 246 Tri").
	const BASE_URL = "assets/app/bodies_clothes/";
	const MALE_BODY_URLS = [
		BASE_URL + "base_mesh_246_tri_walking_m_athletic_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_athletic_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_average_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_average_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_broad_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_broad_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_heavyset_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_heavyset_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_short_stocky_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_short_stocky_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_slim_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_slim_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_tall_lanky_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_tall_lanky_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_wiry_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_m_wiry_v2.glb"
	];

	const FEMALE_BODY_URLS = [
		BASE_URL + "base_mesh_246_tri_walking_f_athletic_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_athletic_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_curvy_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_curvy_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_heavyset_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_heavyset_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_pear_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_pear_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_petite_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_petite_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_slim_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_slim_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_stocky_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_stocky_v2.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_tall_lanky_v1.glb",
		BASE_URL + "base_mesh_246_tri_walking_f_tall_lanky_v2.glb"
	];

	// The scene/minimap's shared background color — hoisted to module scope
	// (rather than staying a buildScene()-local const) so the topdown-mode
	// page background below can match it without waiting for the scene to load.
	const BG_COLOR = 0x0f000d;
	const BG_COLOR_CSS = `#${BG_COLOR.toString(16).padStart(6, "0")}`;

	// Used for missing/null values, or a "before you pick a category" gray.
	const MUTED_COLOR = "#cccccc";
	// The building's only "lit" color, outside — the sign, each door's
	// outline frame, and its lamp fixture/glow are all this one pink neon
	// shade rather than being tinted per zone, so the dark, mostly-unlit
	// exterior reads as one consistent neon-signage look.
	const NEON_PINK = "#ff8dce";
	// The door PANEL itself still hints at what's behind it (the frame
	// around it doesn't anymore, see NEON_PINK) — solid colors, toon-lit
	// and shadowed like the brick facade (see doors.js), not textured, so
	// they stay clearly legible against the dark facade.
	const DOOR_ZONE_COLORS = {
		No: "rgb(69, 50, 7)",
		Unsure: "#3e1f42",
		Yes: "#53043d"
	};
	const DOOR_ZONE_COLORS_LIGHT = {
		No: "rgb(255, 179, 1)",
		Unsure: "#8c19c6",
		Yes: "#fd08a8"
	};

	// Room dimensions, in arbitrary "world units" (~1.3 units per figure).
	// Sized for the ~1,460 people with a valid No/Unsure/Yes + age in both waves.
	const ROOM_WIDTH = 30; // left/right: No, Unsure, Yes, one third each
	const ROOM_DEPTH = 250; // front/back (younger <-> older)
	const ROOM_HEIGHT = 50;

	// Half-extents are used constantly below, so compute them once.
	const HALF_WIDTH = ROOM_WIDTH / 2;
	const HALF_DEPTH = ROOM_DEPTH / 2;
	// Room splits into three equal zones (No/Unsure/Yes), open boundaries — no physical bar between them.
	const ZONE_WIDTH = ROOM_WIDTH / 3;

	// The exterior: a dark plaza where the walker starts, and an enclosed
	// vestibule whose corridors route from the entrance to the correct zone.
	// Deeper than before so the walker's default starting position (see
	// DEFAULT_START_Z below, which is derived from this) sits further
	// back from the doors, with more plaza visible behind it.
	const EXTERIOR_DEPTH = 16;
	const VESTIBULE_DEPTH = 0;
	const DOOR_Z = HALF_DEPTH + VESTIBULE_DEPTH;
	const DOOR_WIDTH = 2.4; // just wide enough for one figure
	const DOOR_HEIGHT = 4; // just clears a figure's head (FIGURE_HEIGHT is 2)
	const FACADE_THICKNESS = 0.6;
	const FACADE_CLEARANCE = FACADE_THICKNESS / 2 + 0.4;
	// The back/side walls' own thickness — same idea as FACADE_THICKNESS,
	// just for the plain room shell rather than the door wall; extrudes
	// outward (away from the walkable room), so it never eats into
	// WALK_MARGIN or any of the collision bounds below.
	const WALL_THICKNESS = 0.5;
	// How close the walker must be to trigger a door, and how open (0..1) it must get before it stops blocking.
	const DOOR_TRIGGER_RADIUS = 1.2;
	const DOOR_OPEN_TIME = 0.35; // seconds to close ~63% of the remaining open/close
	const DOOR_OPEN_ANGLE = Math.PI * 0.8; // swings inward, almost flat against the inside wall
	const DOOR_PASSABLE_OPEN_AMOUNT = 0.5;
	// Each door sits directly in front of its own zone (see ZONE_XS below) —
	// the room's narrow enough now that doors can just line up with their
	// zone's opening directly, no shifted interior needed to bridge them.
	// openAmount (0 closed .. 1 open) is plain per-door render state, not a
	// Svelte rune — updateDoors() in onMount advances it every frame. Which
	// door is which is conveyed by its text label now, not a per-zone
	// outline color — see NEON_PINK above.
	const DOORS = [
		{ x: -ZONE_WIDTH + ZONE_WIDTH / 3, label: "No", openAmount: 0 },
		{ x: 0, label: "Unsure", openAmount: 0 },
		{ x: ZONE_WIDTH - ZONE_WIDTH / 3, label: "Yes", openAmount: 0 }
	];
	// Each door label is its own SVG (no.svg/unsure.svg/yes.svg), each with
	// a different native aspect ratio ("Unsure" is a much wider word than
	// "No") — sizing every one to the SAME width/height like the old
	// canvas-drawn text did would stretch the narrower ones and crop or
	// shrink the wider one. Instead each keeps its own aspect ratio, fit
	// inside a shared max-width/max-height box (whichever dimension binds
	// first) so no label — however wide its word — can ever exceed the
	// door's own width, even after Main's own MAX_DOOR_LABEL_SCALE grows it
	// further for mobile legibility. An earlier area-preserving version
	// (matching width*height across labels instead of capping each
	// dimension) let "Unsure", the widest word, come out nearly as wide as
	// the door itself with almost no side margin — fine in principle, but
	// visibly cramped/overflowing in practice once scaled up.
	const DOOR_LABEL_MAX_WIDTH = 1.6;
	const DOOR_LABEL_MAX_HEIGHT = 1.0;
	function sizeDoorLabelSvg(svg, viewBoxWidth, viewBoxHeight) {
		const aspect = viewBoxWidth / viewBoxHeight;
		const widthAtMaxHeight = DOOR_LABEL_MAX_HEIGHT * aspect;
		const height =
			widthAtMaxHeight <= DOOR_LABEL_MAX_WIDTH
				? DOOR_LABEL_MAX_HEIGHT
				: DOOR_LABEL_MAX_WIDTH / aspect;
		return { svg, width: height * aspect, height };
	}
	const DOOR_LABEL_ASSETS = {
		No: sizeDoorLabelSvg(noSvg, 58, 48),
		Unsure: sizeDoorLabelSvg(unsureSvg, 129, 48),
		Yes: sizeDoorLabelSvg(yesSvg, 71, 48)
	};

	// The building shell (floor, facade, side walls) just matches the
	// room's actual width — no shifted interior to leave clearance for anymore.
	const OUTER_WALL_HALF_WIDTH = HALF_WIDTH;

	// The vestibule's corridors: solid, not just a suggested path (see
	// resolveVestibuleCollision) — sized for about three people abreast.
	const CORRIDOR_WIDTH = 2.7;
	const TURN_CLEARANCE = 0.15;
	const VESTIBULE_CEILING_HEIGHT = DOOR_HEIGHT + 0.6;
	const CORRIDOR_WALL_HEIGHT = VESTIBULE_CEILING_HEIGHT;

	// Total figure height, floor to top of head (the body GLBs are already
	// roughly this scale) — used to pick a camera eye height that feels "among" people, not towering over them.
	const FIGURE_HEIGHT = 2;
	// A soft, cheap "blob shadow" disc under each person — far cheaper
	// than real shadow-mapping, and reads fine for small ground-level figures.
	const SHADOW_RADIUS = 0.4;

	// Crowd LOD: rendering every person as a fully rigged, animating body is
	// what actually makes a big crowd laggy — but swapping in a different
	// mesh for distant people reads as their identity/shape changing, not
	// just "less detail," so we deliberately never do that; it's always
	// their own real body. Distance instead steps through a few discrete
	// bands (see LOD_COLOR_BANDS) that darken the body's color and thin out
	// its OutlineEffect outline the further away it is — nearest band at
	// full brightness/thickness, like old-game distance fog, cheaper than a
	// continuous gradient. Past LOD_FREEZE_DISTANCE the walk-cycle mixer
	// also stops updating (frozen in whatever pose it's in — still their
	// correct shape, just not animating), which is the actual perf win for a big crowd.
	const OUTLINE_DEFAULT_THICKNESS = 0.005;
	const LOD_FREEZE_DISTANCE = 5;
	const LOD_COLOR_BANDS = [
		{
			maxDistance: LOD_FREEZE_DISTANCE,
			brightness: 1,
			outlineThickness: OUTLINE_DEFAULT_THICKNESS
		},
		{
			maxDistance: 12,
			brightness: 0.7,
			outlineThickness: OUTLINE_DEFAULT_THICKNESS * 0.8
		},
		{
			maxDistance: 26,
			brightness: 0.5,
			outlineThickness: OUTLINE_DEFAULT_THICKNESS * 0.6
		},
		{
			maxDistance: Infinity,
			brightness: 0.3,
			outlineThickness: OUTLINE_DEFAULT_THICKNESS * 0.5
		}
	];
	// How much brighter than its normal (always <= 1) LOD brightness the
	// currently-clicked person (see clickedPersonIndex/handlePersonClick)
	// renders — pushed past the usual 0-1 range toward a blown-out glow so
	// they read as "lit up" and stay easy to spot regardless of distance.
	const SELECTED_PERSON_BRIGHTNESS = 4;
	// Same idea, for whoever the pointer's currently hovering (see
	// hoveredPersonIndex/handlePointerHover) — subtler than the clicked
	// callout above, just enough to read as a hover affordance.
	const HOVERED_PERSON_BRIGHTNESS = 1.8;

	// Walk-cycle animation: since the "Walk" clip has no standing-still
	// pose, each person cross-fades it against a frozen bind-pose clip by __walkAmount when they stop.
	// How fast a person's facing turns to match travel direction, and how
	// fast walk-amount fades — same frame-rate-independent pattern as FOLLOW_TIME.
	const FACING_TURN_TIME = 0.8; // seconds to close ~63% of the remaining turn
	const WALK_AMOUNT_SMOOTH_TIME = 0.4; // seconds to close ~63% of the fade in/out
	// The walk clip's baked-in stride only looks right at its animated
	// speed, so playback rate tracks each person's own smoothed ground
	// speed instead of a flat 1x (MIN/MAX bound the extremes).
	const WALK_SPEED_SMOOTH_TIME = 0.05;
	// How fast each person actually walks between their Y1/Y2 layout spots
	// (world units/second) when positionMode toggles — paced by distance
	// per-person (see crowdSimulation.js's own __blendPathDistance), not a
	// single fixed duration for the whole crowd regardless of how far any
	// one person has to go. Under DOOR_WALK_SPEED (the walker's own brisk
	// auto-walk-through-door pace, 9) — was 3.5 (too slow/casual), then 7
	// (too fast outright), then 5.5, then 4.5; settled here at 3 once the
	// ease curve itself stopped overshooting this as its actual top speed
	// (see crowdSimulation.js's own distance-covered ramp) — 4.5 used to
	// read as noticeably faster than its own number because the old ease
	// curve's peak ran ~20% past it; now that peak IS this number exactly,
	// the same visual pace needed a lower nominal value.
	// WALK_ANIM_SPEED below is a fixed fraction of this value, so easing
	// this back down carries the animation pace back down with it too.
	const POSITION_TRANSITION_SPEED = 3;
	// WALK_ANIM_SPEED — the ground speed that plays the walk clip at a
	// natural 1x stride — is deliberately defined AS A FRACTION of
	// POSITION_TRANSITION_SPEED, not as its own independent number: the
	// two need to move together (a faster crowd should always look like
	// it's animating faster too, not just covering ground faster with the
	// same leg-cycle rate), and tuning them separately is exactly what
	// drifted them out of proportion earlier (POSITION_TRANSITION_SPEED
	// climbing to 7 while WALK_ANIM_SPEED sat fixed at 2, then adjusting
	// each again independently). WALK_ANIM_SPEED_FACTOR is the one knob
	// for "how much faster than realistic ground speed should the
	// animation itself read" — well under 1 so actual transition speed
	// plays back at a properly hurried clip, not just a brisk one.
	const WALK_ANIM_SPEED_FACTOR = 0.18;
	const WALK_ANIM_SPEED = POSITION_TRANSITION_SPEED * WALK_ANIM_SPEED_FACTOR;
	// A wander shuffle's actual ground speed is usually well under
	// WALK_ANIM_SPEED (small offsets over ~1s), so too high a floor forces
	// the clip to play fast even for a barely-there shuffle — legs cycling
	// fast while covering almost no ground. Still high enough (0.8) that
	// the tail end of a long Y1<->Y2 walk, where ground speed decays as
	// they arrive, still reads as a brisk walk rather than a near-freeze
	// shuffle. MAX raised along with WALK_ANIM_SPEED dropping — peak
	// speed/WALK_ANIM_SPEED now reaches well past the old cap of 6.
	const MIN_WALK_TIMESCALE = 0.8;
	const MAX_WALK_TIMESCALE = 8;
	// Below this squared per-frame displacement, a person is considered at
	// rest rather than reacting to floating point noise.
	const MOVE_FACING_EPSILON_SQ = 1e-6;
	// A wander shuffle can pick a spot behind where someone is still facing,
	// and facingYaw only turns to match it smoothly (see facingFactor) — for
	// that brief catch-up window their own voluntary movement points
	// opposite their facing, which would otherwise play the Walk clip
	// forward while they visibly move backward (a moonwalk artifact).
	// Instead, the walk clip holds at a fixed "one foot stepped back" point
	// (a fraction of the clip's duration) until facing catches up. Being
	// pushed by the walker or another person is deliberately NOT included —
	// that's not their own motion, so they just slide aside with no special
	// animation handling (cheaper, and correct: it's a shove, not a step).
	const STEP_BACK_HOLD_FRACTION = 0.15;
	// Within this distance of the walker, a person turns to face the
	// camera directly instead of whichever way they're actually moving.
	const FACE_CAMERA_RADIUS = 3.5;
	// A "breathing" wobble — scales the figure's Y axis since bone names
	// vary between GLB rigs. Idle timing (BREATHING_SPEED) only governs
	// the standing-still case now; while moving, it instead tracks the
	// walk clip's own cycle position (see crowdSimulation.js's own
	// cyclePhase), so the torso bob lands on the stride.
	const BREATHING_AMPLITUDE = 0.022; // fraction of height, peak scale change
	const BREATHING_SPEED = (2 * Math.PI) / 5; // radians/sec (~3.6s per breath), idle only
	// How many breath/bob cycles per full walk-clip loop — 2 lands one bob
	// on each footfall (left step, right step) rather than one per full
	// stride cycle, matching how an actual torso bob doubles up with gait.
	const BREATH_CYCLES_PER_STRIDE = 2;
	// Scales just the walking portion of the breath wobble, on top of
	// BREATHING_AMPLITUDE — 0.6 reads as about 40% shallower while walking
	// than the same amplitude would look standing still, without touching
	// idle breathing at all.
	const WALK_BREATH_AMPLITUDE_SCALE = 0.6;

	// First-person "walk" camera tuning, roughly at head height.
	const EYE_HEIGHT = FIGURE_HEIGHT * 0.9;
	// Steering is click-and-hold-drag (or touch-drag), proportional to drag
	// distance. Scrolling (or a vertical touch-drag) only ever walks forward/back.
	const DRAG_LOOK_RADIANS_PER_SWIPE = Math.PI / 2;
	// A mouse-drag also tilts the view up/down (touch-drag doesn't — that
	// axis is the walk gesture there), clamped short of straight up/down.
	const MAX_DRAG_PITCH = (60 * Math.PI) / 180;
	// Positive pitch looks up (see computeWalkPose's lookDir.y = sin(pitch))
	// — the walk camera starts tilted up slightly rather than dead level,
	// pairing with the lowered EYE_HEIGHT above so the doors/sign still
	// read well from down closer to ground level. On narrow/mobile
	// viewports the wider fov this same aspect needs (see
	// computeDoorVisibleFovDegrees) already pulls more of the tall sign
	// into frame, so tilting up as much doesn't help there and instead
	// pushes the ground/crowd out of frame more than on desktop — tilted
	// down a little instead. Read once at module init (matches debugMode's
	// own pattern below) rather than reactively — a one-time "is this a
	// phone-shaped viewport" check, not something that needs to track a
	// live resize/rotation.
	const isMobileViewport = typeof window !== "undefined" && window.innerWidth <= 640;
	const DEFAULT_CAMERA_PITCH = isMobileViewport
		? (-4 * Math.PI) / 180
		: (2 * Math.PI) / 180;
	// Extra look-down added on top of DEFAULT_CAMERA_PITCH/the drag-set
	// pitch once the walker is actually inside the room (see animate()'s
	// own roomEntryPitchOffset) — negative pitch tilts the camera down
	// (see DEFAULT_CAMERA_PITCH's own mobile case above), so the crowd/
	// floor reads a bit more than the doorway-framing pitch outside does.
	const ROOM_ENTRY_PITCH_TILT = (-6 * Math.PI) / 180;
	const ROOM_ENTRY_PITCH_TIME = 0.6; // seconds to close ~63% of that tilt
	const WALK_SPEED = 0.02; // world units of *target* movement per unit of (clamped) wheel delta
	const MAX_WHEEL_STEP = 45; // clamp a single wheel event so trackpad flings don't teleport you
	// Arrow-key movement calls walk()/strafe() every frame while held (see
	// animate()'s own heldArrowKeys check), scaled by dt for a steady
	// units/second pace instead of wheel's one-shot-per-event deltas —
	// this, times WALK_SPEED, is that pace (~5 world units/second).
	const KEY_MOVE_DELTA_PER_SECOND = 250;
	// The camera glides toward each new wheel-driven position rather than
	// jumping. Smaller = snappier, larger = more sluggish.
	const FOLLOW_TIME = 0.1; // seconds to close ~63% of the remaining distance
	// The door-click auto-walk (see handleDoorClick) eases via smoothDamp
	// instead of FOLLOW_TIME's plain exponential — accelerates up to
	// DOOR_WALK_SPEED and decelerates back to a stop right as it arrives,
	// and (the reason smoothDamp specifically, over some other ease)
	// carries real velocity across the mid-flight handoff from lining up
	// with the door to walking through it, so that target change doesn't
	// read as a burst/stutter.
	const DOOR_WALK_SPEED = 9; // world units/second, smoothDamp's speed cap
	const DOOR_WALK_SMOOTH_TIME = 0.35; // seconds to close most of the remaining distance at full speed
	const DOOR_WALK_YAW_SPEED = Math.PI * 0.7; // radians/second, turning to face forward once aligned
	// Keeps the walker inside the walls/edges so the camera's near-clip
	// plane never pokes through geometry; z spans plaza + building.
	const WALK_MARGIN = 3;
	// The side walls specifically get a much tighter margin than
	// WALK_MARGIN — just enough to clear the near-clip plane (0.1, see the
	// PerspectiveCamera below), so the walker can actually walk right up
	// to a side wall and have it stop them there, instead of stopping
	// several units short of it.
	const SIDE_WALL_MARGIN = 0.4;
	const MIN_WALK_X = -HALF_WIDTH + SIDE_WALL_MARGIN;
	const MAX_WALK_X = HALF_WIDTH - SIDE_WALL_MARGIN;
	const MIN_WALK_Z = -HALF_DEPTH + WALK_MARGIN;
	const MAX_WALK_Z = HALF_DEPTH + EXTERIOR_DEPTH - WALK_MARGIN;
	// Where the walker starts: out in the plaza facing the building's
	// doors/sign — unless debugMode is on, starting just inside instead.
	// Held a few units short of the plaza's true far edge (rather than
	// starting right at it, flush against the black backdrop wall there —
	// see roomShell.js) so there's some open space behind the camera too,
	// not just ahead of it.
	const DEFAULT_START_Z = HALF_DEPTH + EXTERIOR_DEPTH - 4;
	const DEBUG_START_Z = HALF_DEPTH - WALK_MARGIN;
	// Toggled with a `?debug` query param — a dev convenience, not a
	// feature that needs a UI button.
	const debugSearchParams =
		typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
	const debugMode = debugSearchParams?.has("debug") ?? false;
	// ?variable=/&age= — read back on load (see selectedVariable's own
	// initializer and DEBUG_START_Z's use just below) so a URL copied from
	// the address bar while in debug mode (see the $effect further down
	// that keeps these two params live-updated) reopens at the exact same
	// variable + walk position, not just debug mode itself.
	const debugVariableParam = debugMode ? debugSearchParams.get("variable") : null;
	const debugAgeParam = debugMode ? debugSearchParams.get("age") : null;

	// Collision "nudging": a person near the walker is pushed sideways out
	// of the way via a small (offsetX, offsetZ) displacement that grows
	// while you're nearby and decays back to zero once you've moved on.
	const COLLISION_RADIUS = 1.1; // how close (world units) before a person gets nudged
	const PUSH_STRENGTH = 12; // how hard they're pushed, per second, at maximum overlap
	const MAX_OFFSET = 1.6; // a person can never be nudged further than this from their spot
	const OFFSET_RETURN_TIME = 0.6; // seconds for a nudge to mostly relax back
	// People also nudge each other aside, checked via a spatial hash grid
	// (see createCrowdAnimator in crowdSimulation.js) rather than an O(n²) all-pairs scan.
	const PERSON_COLLISION_RADIUS = 0.8; // just under the ~0.85 spawn spacing, so resting people don't jitter
	const PERSON_PUSH_STRENGTH = 3;
	const PERSON_CELL_SIZE = PERSON_COLLISION_RADIUS;

	// A Y1<->Y2 move turns to face its new travel direction at THIS pace
	// (seconds to close ~63% of the remaining turn) instead of
	// FACING_TURN_TIME's much more leisurely one — a wave toggle should
	// read as everyone briskly pivoting to face where they're headed, not
	// slowly swiveling while already sliding sideways.
	const BLEND_TURN_TIME = 0.06;
	// How close (radians) that turn has to land before a person is
	// allowed to actually start walking — small enough that they're
	// convincingly "facing that way" already, not a hard 0.
	const BLEND_TURN_GATE_ANGLE = Math.PI / 9; // 20°
	// The Y1<->Y2 walk's own ease-in window, in seconds — fixed regardless
	// of how long the walk itself takes, so someone crossing the whole
	// room doesn't spend the entire multi-second walk visibly ramping up
	// (the old exponential-smoothing approach's ease lasted the whole
	// remaining distance, which read as floaty/extreme on a long walk).
	const BLEND_MOVE_EASE_SECONDS = 0.2;

	// `mode` swaps which view is large vs. tucked into the corner (see the
	// .topdown-active CSS below) — the walk camera itself never changes.
	// `selectedVariable` drives the recolor dropdown
	// `positionMode` picks which wave's layout the crowd walks toward
	let mode = $state("walk"); // "walk" | "topdown"
	let selectedVariable = $state(debugVariableParam ?? "AFTER_DEATH");
	let positionMode = $state("Y2"); // "Y1" | "Y2"

	// Debug convenience only: keeps the "Color by" dropdown and current age
	// mirrored into ?variable=/&age= as they change, so the address bar
	// always holds a link back to exactly this view — see
	// debugVariableParam/debugAgeParam above for the read-back half (walk
	// position is restored via DEBUG_START_Z's own use of debugAgeParam
	// further down; selectedVariable's initializer just above handles the
	// variable half).
	$effect(() => {
		const variable = selectedVariable;
		const age = currentAge;
		if (!debugMode) return;
		const url = new URL(window.location.href);
		url.searchParams.set("variable", variable);
		if (age !== null) url.searchParams.set("age", age.toFixed(1));
		window.history.replaceState({}, "", url);
	});
	// A small summary of the current color mapping, rendered as a legend.
	// Either { kind: "categorical", items: [{label, color, count}, ...] } or { kind: "continuous", min, max }.
	let legendData = $state(null);
	// The age the walker's current depth corresponds to — inverse of ageToZ, updated every frame; null until the room has loaded.
	let currentAge = $state(null);
	// Story text currently active for the walker's age + room third (see
	// updateStoryText) — every copy.json entry whose [age, age_end] range
	// contains currentAge, from "all" plus whichever zone they're
	// physically in. Can be more than one at once (an "all" entry and a zone entry both matching).
	let storyTexts = $state([]);
	// Whether any currently-active copy.json entry (see updateStoryText)
	// carries its own hide_panel/hide_map flag — lets specific story beats
	// (e.g. the very first one at each age range) clear the screen of the
	// control panel/minimap so nothing competes with that text.
	let hidePanel = $state(false);
	let hideMap = $state(false);
	// Live spatial "am I currently inside the room" check (renderWalkZ <=
	// HALF_DEPTH, the same boundary updateEnteredRoom uses) — updated
	// every frame alongside currentAge. Deliberately NOT the same thing as
	// hasEnteredRoom (a one-way latch that, per its own comment, never
	// flips back once you've entered once, so stepping back out near a
	// door keeps scroll/drag navigation unlocked) — the panel/minimap, and
	// the door/crowd click+hover interactions below, should all actually
	// flip back if you walk back outside, so they read live position instead.
	let insideRoom = $state(false);
	// Camera pose snapshot for the debugMode HUD (see the debug-panel
	// markup below) — updated every frame alongside currentAge/insideRoom,
	// only while debugMode is on so this stays a no-op otherwise.
	let debugStats = $state({
		x: 0,
		z: 0,
		yawDeg: 0,
		pitchDeg: 0,
		fov: 0,
		age: null,
		mode: "",
		insideRoom: false,
		autoWalking: false,
		selectedVariable: ""
	});
	let debugCopyFeedback = $state(false);
	function formatDebugStats(stats) {
		return (
			`x=${stats.x.toFixed(2)} z=${stats.z.toFixed(2)} ` +
			`yaw=${stats.yawDeg.toFixed(1)} pitch=${stats.pitchDeg.toFixed(1)} ` +
			`fov=${stats.fov.toFixed(1)} age=${stats.age?.toFixed(1) ?? "—"} ` +
			`mode=${stats.mode} insideRoom=${stats.insideRoom} autoWalking=${stats.autoWalking} ` +
			`selectedVariable=${stats.selectedVariable}`
		);
	}
	async function copyDebugStats() {
		await navigator.clipboard.writeText(formatDebugStats(debugStats));
		debugCopyFeedback = true;
		setTimeout(() => (debugCopyFeedback = false), 1200);
	}
	// Panel/minimap are hidden either because a copy.json story beat asked
	// for it (hidePanel/hideMap) or because the walker's currently outside
	// the room entirely — either reason hides them the same way.
	const shouldHidePanel = $derived(hidePanel || !insideRoom);
	const shouldHideMap = $derived(hideMap || !insideRoom);
	// ControlPanel's own measured height (see its panelHeight bindable) —
	// used to keep the top-down minimap clear of it (see panelClearPx
	// below and Minimap's panelClear prop). Stays at its last value once
	// shouldHidePanel unmounts ControlPanel, so panelClearPx below folds
	// shouldHidePanel back in rather than trusting this alone.
	let controlPanelHeight = $state(0);
	const panelClearPx = $derived(shouldHidePanel ? 0 : controlPanelHeight);
	// Non-empty until people.json and the walker GLB have both resolved; the control panel shows this instead of its normal controls until then.
	let loadingMessage = $state("Loading people…");
	// The full respondent object for whichever crowd member was last
	// clicked (see handlePersonClick) — drives Modal.lifedeath.svelte;
	// null closes it.
	let clickedPerson = $state(null);
	// respondents/personRoots index of that same person — kept alongside
	// clickedPerson (rather than derived from it) since respondents
	// doesn't carry a stable id to look the index back up by. Read every
	// frame in updatePeoplePositions to light them up; reset together
	// with clickedPerson when the modal closes.
	let clickedPersonIndex = $state(null);
	// The real selectPerson (see onMount below) isn't ready until
	// respondents has loaded — plain `let`, not $state, since this is a
	// stable function reference read at call time (a user's actual click,
	// long after onMount assigns it), not a value the template needs to
	// re-render on. Lets <Minimap>'s onPersonClick prop below stay a
	// single, always-valid closure instead of needing to reach into
	// onMount's own scope, which the top-level template can't do directly.
	let selectPersonImpl = null;
	// Entering top-down view closes whatever respondent modal was open —
	// it's the map/overview, a modal sitting on top of it (usually still
	// anchored to where that person was in the walk view) doesn't make
	// sense there. Doesn't fire the other way (leaving topdown never had a
	// modal open to begin with, since this already closed it on the way in).
	$effect(() => {
		if (mode === "topdown") {
			clickedPerson = null;
			clickedPersonIndex = null;
		}
	});

	// The <div> that three.js's <canvas> gets appended into. $state so
	// passing it down as Minimap's `container` prop (for its own
	// ResizeObserver) actually updates once bind:this resolves.
	let container = $state();
	// The minimap component instance (see Minimap.lifedeath.svelte) — bound
	// so onMount below can call its init()/draw() directly, same as any
	// other imperative three.js object here.
	let minimapComponent;

	// Dropdown options grouped by parent (PARENT_ORDER's order) — see
	// variable_config.js, the single source of truth for the dropdown's
	// layout/labels/groupings and (in applyColorVariable below) its colors.
	const variableOptions = groupedVariableOptions();

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};

		function loadGLB(url) {
			return new Promise((resolve, reject) => {
				new GLTFLoader().load(url, resolve, undefined, reject);
			});
		}

		(async () => {
			const [response, maleGltfs, femaleGltfs] = await Promise.all([
				fetch(PEOPLE_DATA_URL),
				Promise.all(MALE_BODY_URLS.map(loadGLB)),
				Promise.all(FEMALE_BODY_URLS.map(loadGLB))
			]);
			// people.json is columnar on the wire (see the export notebook) —
			// {columns: [...], rows: [[v1, v2, ...], ...]} instead of one
			// object per person. A plain array of ~2,500 objects repeats
			// every one of its ~164 keys in every single record's own JSON
			// text; storing the key names once and each person as a plain
			// value array cuts a meaningful chunk of that size for free,
			// mattering most on the mobile connections this was slow on.
			// Rebuilt into the same {column: value} shape every other line
			// of this app already expects immediately after parsing, so
			// nothing downstream needs to know the wire format changed.
			const peopleTable = await response.json();
			const rawPeople = peopleTable.rows.map((row) => {
				const person = {};
				for (let i = 0; i < peopleTable.columns.length; i++) {
					person[peopleTable.columns[i]] = row[i];
				}
				return person;
			});
			if (disposed) return;
			let sceneCleanup = () => {};
			const disposeRoot = $effect.root(() => {
				sceneCleanup = buildScene(rawPeople, maleGltfs, femaleGltfs);
			});
			cleanup = () => {
				sceneCleanup();
				disposeRoot();
			};
			loadingMessage = "";
		})();

		function buildScene(rawPeople, maleGltfs, femaleGltfs) {
			// A synthetic single-frame clip capturing each bone's current
			// (bind-pose) transform — used only as a last-resort standing
			// pose if a body GLB doesn't provide its own "Idle" clip.
			function buildBindPoseClip(root, referenceClip) {
				const tracks = referenceClip.tracks.map((track) => {
					const dot = track.name.lastIndexOf(".");
					const node = root.getObjectByName(track.name.slice(0, dot));
					const value = node[track.name.slice(dot + 1)];
					const values =
						typeof value.toArray === "function" ? value.toArray() : [value];
					return new track.constructor(track.name, [0], values);
				});
				return new THREE.AnimationClip("BindPose", 1, tracks);
			}

			// Each loaded body GLB needs the same low-poly smoothing, and
			// its own walk/rest clip — a "model" bundles a smoothed scene
			// with the clips built from it. clipAction() caches by (clip,
			// root), so each model needs its own distinct rest clip object.
			// Baked once per unique body mesh (not per person): a permanent
			// vertical brightness ramp from near-black at the feet up to
			// full brightness by LEG_SHADOW_TOP_FRACTION of the way up —
			// these low-poly legs/feet don't hold up well fully lit, so
			// instead they always read as "in shadow." Written as vertex
			// colors so it works with any material via vertexColors, no custom shader needed.
			const LEG_SHADOW_MIN_BRIGHTNESS = 0;
			const LEG_SHADOW_TOP_FRACTION = 2;
			function bakeLegShadow(geometry) {
				geometry.computeBoundingBox();
				const minY = geometry.boundingBox.min.y;
				const maxY = geometry.boundingBox.max.y;
				const span = maxY - minY || 1;
				const position = geometry.attributes.position;
				const colors = new Float32Array(position.count * 3);
				for (let v = 0; v < position.count; v++) {
					const t = Math.min(
						1,
						Math.max(
							0,
							(position.getY(v) - minY) / span / LEG_SHADOW_TOP_FRACTION
						)
					);
					const eased = t * t * (3 - 2 * t); // smoothstep
					const brightness =
						LEG_SHADOW_MIN_BRIGHTNESS + (1 - LEG_SHADOW_MIN_BRIGHTNESS) * eased;
					colors[v * 3] = brightness;
					colors[v * 3 + 1] = brightness;
					colors[v * 3 + 2] = brightness;
				}
				geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
			}

			function prepareModel(gltf) {
				gltf.scene.traverse((node) => {
					if (node.isMesh) {
						node.geometry.deleteAttribute("normal");
						node.geometry.deleteAttribute("uv");
						node.geometry = mergeVertices(node.geometry);
						node.geometry.computeVertexNormals();
						bakeLegShadow(node.geometry);
					}
				});
				const walkClip =
					gltf.animations.find((a) => a.name === "Walk") ?? gltf.animations[0];
				// These bodies now ship their own proper "Idle" and
				// "ArmsCrossed" clips — a real relaxed-standing loop and a
				// real crossed-arms stance, rather than anything
				// reconstructed from the Walk clip or bind pose. Only falls
				// back to the synthetic bind-pose clip if a body is missing one of these.
				const idleClip =
					gltf.animations.find((a) => a.name === "Idle") ??
					(walkClip && buildBindPoseClip(gltf.scene, walkClip));
				const armsCrossedClip = idleClip;
				return { scene: gltf.scene, walkClip, idleClip, armsCrossedClip };
			}
			const maleModels = maleGltfs.map(prepareModel);
			const femaleModels = femaleGltfs.map(prepareModel);
			const allModels = [...maleModels, ...femaleModels];

			// Picks a body for this respondent's own GENDER (falling back to
			// the full pool for anything else), so the crowd isn't a field
			// of identical clones the way a single shared model would be.
			function pickModelForPerson(person) {
				if (person.GENDER === "Male")
					return maleModels[Math.floor(Math.random() * maleModels.length)];
				if (person.GENDER === "Female")
					return femaleModels[Math.floor(Math.random() * femaleModels.length)];
				return allModels[Math.floor(Math.random() * allModels.length)];
			}

			// GLB exports vary wildly in native scale, so measure one
			// reference model and derive a correction to FIGURE_HEIGHT,
			// applied to every body so their relative height differences carry through unchanged.
			const referenceHeight = new THREE.Box3()
				.setFromObject(allModels[0].scene)
				.getSize(new THREE.Vector3()).y;
			const WALKER_SCALE_CORRECTION =
				referenceHeight > 0 ? FIGURE_HEIGHT / referenceHeight : 1;

			// Only respondents with a clean No/Unsure/Yes answer and a real
			// numeric age in *both* waves get a figure — Y1 drives their starting layout, Y2 their walk-to spot.
			const isAfterDeathAnswer = (value) =>
				value === "No" || value === "Unsure" || value === "Yes";
			const respondents = rawPeople.filter(
				(d) =>
					isAfterDeathAnswer(d.AFTER_DEATH_Y1) &&
					typeof d.AGE_Y1 === "number" &&
					isAfterDeathAnswer(d.AFTER_DEATH_Y2) &&
					typeof d.AGE_Y2 === "number"
			);

			// One shared age -> depth scale for both waves, so a given age
			// lands at the same depth in Y1 or Y2 — the layouts stay visually comparable.
			const allAges = respondents.flatMap((d) => [d.AGE_Y1, d.AGE_Y2]);
			const ageMin = Math.min(...allAges) - 1;
			const ageMax = Math.max(...allAges);

			// Younger respondents are placed toward the front (near where the
			// camera starts, larger Z); older respondents toward the back
			// wall (more negative Z). zToAge is ageToZ's inverse, for the
			// ControlPanel's "Age" readout — clamped to [ageMin, ageMax]
			// since WALK_MARGIN lets the walker get slightly closer to the
			// walls than the extreme respondents.
			const { ageToZ, zToAge } = createAgeZMapping({
				ageMin,
				ageMax,
				halfDepth: HALF_DEPTH,
				roomDepth: ROOM_DEPTH
			});

			// Which third of the room the walker is physically in.
			function currentZoneKey() {
				if (renderWalkX < -ZONE_WIDTH / 2) return "no";
				if (renderWalkX > ZONE_WIDTH / 2) return "yes";
				return "unsure";
			}

			// The copy.json entry (if any) that last set selectedVariable/
			// positionMode via its own var_color/wave fields (see
			// updateStoryText below) — tracked by object identity so that
			// entry only ever fires the override once, right as the walker
			// crosses into its age range, rather than re-forcing it back
			// every single frame the whole time they're still standing in
			// that range (which would make the "Color by" dropdown/Wave
			// buttons unusable there).
			let lastAppliedStoryVariableEntry = null;

			// Refreshes storyTexts (bound to the top-of-screen overlay in the
			// template) from copy.json: every "all" entry whose [age,
			// age_end] contains currentAge, plus every entry in whichever
			// zone (no/unsure/yes) array the walker is currently in — both
			// can be active at once, so this is a list, not a single string.
			// Also applies the first such entry's own var_color/wave, if it
			// has them — copy.json's way of spotlighting a specific
			// variable/wave at a specific narrative beat, overriding
			// whatever selectedVariable/positionMode (default: AFTER_DEATH,
			// Y2) happened to already be showing.
			function updateStoryText() {
				if (currentAge === null) {
					storyTexts = [];
					hidePanel = false;
					hideMap = false;
					lastAppliedStoryVariableEntry = null;
					return;
				}
				const zoneKey = currentZoneKey();
				const matches = [];
				let matchedHidePanel = false;
				let matchedHideMap = false;
				let matchedVariableEntry = null;
				const collect = (entries) => {
					for (const entry of entries ?? []) {
						if (
							currentAge >= Number(entry.age) &&
							currentAge < Number(entry.age_end)
						) {
							matches.push(entry.text);
							if (entry.hide_panel === "true" || entry.hide_panel === true) {
								matchedHidePanel = true;
							}
							if (entry.hide_map === "true" || entry.hide_map === true) {
								matchedHideMap = true;
							}
							if (!matchedVariableEntry && (entry.var_color || entry.wave)) {
								matchedVariableEntry = entry;
							}
						}
					}
				};
				collect(copy.all);
				collect(copy[zoneKey]);
				storyTexts = matches;
				hidePanel = matchedHidePanel;
				hideMap = matchedHideMap;

				if (!matchedVariableEntry) {
					// Reverts back to the defaults exactly once, right as the
					// walker's age crosses back out of whatever range was
					// last overriding it — not every frame they're outside
					// one (same one-shot reasoning as the apply branch below:
					// forcing it back every frame would make the "Color by"
					// dropdown/Wave buttons unusable out here too). Guarded
					// on lastAppliedStoryVariableEntry so this is a no-op
					// when there was never an active override to revert
					// (e.g. on first load, before the walker's entered any
					// copy.json range at all).
					if (lastAppliedStoryVariableEntry) {
						selectedVariable = "AFTER_DEATH";
						positionMode = "Y2";
					}
					lastAppliedStoryVariableEntry = null;
				} else if (matchedVariableEntry !== lastAppliedStoryVariableEntry) {
					// Each field defaults independently — an entry naming only
					// `wave` (no `var_color`) still resets the variable back to
					// AFTER_DEATH rather than leaving whatever was previously
					// selected in place, and vice versa. Without this, a wave-
					// only override right after a var_color-only override left
					// the earlier override's variable/wave stuck rather than
					// really reflecting just this entry's own beat.
					selectedVariable = matchedVariableEntry.var_color || "AFTER_DEATH";
					positionMode = matchedVariableEntry.wave === "1" ? "Y1" : "Y2";
					lastAppliedStoryVariableEntry = matchedVariableEntry;
				}
			}

			// Layout/blend-path math and per-person simulation state now
			// live in crowdSimulation.js (see computeLayout/
			// initializeCrowdState there) — this just calls them with this
			// room's own geometry and each wave's own zone/age accessors.
			const zoneFor = (value) =>
				value === "No" ? -1 : value === "Yes" ? 1 : 0;
			const layoutConfig = {
				ageToZ,
				zoneWidth: ZONE_WIDTH,
				halfWidth: HALF_WIDTH,
				halfDepth: HALF_DEPTH,
				roomDepth: ROOM_DEPTH
			};
			const y1Layout = computeLayout(
				respondents,
				(p) => zoneFor(p.AFTER_DEATH_Y1),
				(p) => p.AGE_Y1,
				layoutConfig
			);
			const y2Layout = computeLayout(
				respondents,
				(p) => zoneFor(p.AFTER_DEATH_Y2),
				(p) => p.AGE_Y2,
				layoutConfig
			);
			// Starts everyone already standing wherever positionMode's
			// default (see its own $state above) puts them, rather than
			// always seeding Y1 and immediately walking to Y2 on first load.
			initializeCrowdState(respondents, y1Layout, y2Layout, positionMode === "Y2" ? 1 : 0);

			const width = container.clientWidth;
			const height = container.clientHeight;

			// --- Core three.js setup: scene, camera, renderer ---

			const scene = new THREE.Scene();
			scene.background = new THREE.Color(BG_COLOR);
			// Fog fades distant geometry to the background color, hiding the
			// hard edge where the back wall would otherwise pop into view.
			//
			// Deliberately tight (fixed distances, not a fraction of
			// ROOM_DEPTH — ROOM_DEPTH is 500 now, and nobody needs to
			// actually see that far) — tied to the LOD bands below so
			// visual fade-out and the "stop paying for detail" distances
			// roughly line up: FOG_NEAR matches where animation already
			// stops (LOD_FREEZE_DISTANCE), FOG_FAR sits just past the last
			// finite LOD band, and RENDER_CULL_DISTANCE (used in
			// updatePeoplePositions) skips even building a draw call for
			// anyone fully faded out beyond it — real GPU/CPU savings, not just a visual effect.
			const FOG_NEAR = LOD_FREEZE_DISTANCE;
			const FOG_FAR = 50;
			const RENDER_CULL_DISTANCE = FOG_FAR;
			const walkFog = new THREE.Fog(BG_COLOR, FOG_NEAR, FOG_FAR);
			scene.fog = walkFog;

			// Purely organizational: everything specific to "which zone this
			// is" (the inner wall and its openings, the whole crowd) is
			// parented here rather than directly on the scene.
			const innerRoomGroup = new THREE.Group();
			scene.add(innerRoomGroup);

			// Picked so all three doors are fully visible from the walker's
			// default starting spot (see DEFAULT_START_Z), on any screen
			// size/aspect — rather than a few fixed width breakpoints (which
			// can't account for aspect ratio at all), this solves directly
			// for the horizontal angle the outermost doors actually span
			// from there, then converts that into whatever vertical fov
			// (three.js's own fov parameter) a given aspect ratio needs to
			// reproduce it — a wide/short window needs less vertical fov
			// for the same horizontal spread than a narrow/tall one does.
			const outermostDoorX =
				Math.max(...DOORS.map((d) => Math.abs(d.x))) + DOOR_WIDTH / 2;
			const distanceToDoors = DEFAULT_START_Z - DOOR_Z;
			const DOOR_VIEW_MARGIN = 1.15; // a little breathing room past the doors' exact edges
			const requiredHalfHorizontalFovRad =
				Math.atan(outermostDoorX / distanceToDoors) * DOOR_VIEW_MARGIN;
			const computeDoorVisibleFovDegrees = (aspect) =>
				computeFovForHorizontalHalfAngle(requiredHalfHorizontalFovRad, aspect);
			// Facade sign/door-label text is built at a fixed world-space
			// size, so at a wider fov (narrower/taller screens need more
			// vertical fov to keep the same horizontal door-visibility
			// spread, see above) that same text occupies fewer screen
			// pixels — legible on a wide desktop window, cramped on a
			// narrow phone. This scale factor compensates, applied to
			// facade.js's signGroup and each door's own label — both right
			// after they're built below, and again in resizeWebglCanvas
			// whenever fov itself gets recalculated. REFERENCE_ASPECT (a
			// plain desktop-ish 16:9) is arbitrary, but "no scaling needed"
			// has to be defined against *some* fixed reference.
			const REFERENCE_ASPECT = 16 / 9;
			const REFERENCE_FOV = computeDoorVisibleFovDegrees(REFERENCE_ASPECT);
			// Each capped short of the raw ratio (which reaches ~1.7-1.8x on
			// a narrow phone aspect), but by different amounts depending on
			// how much room each surface actually has to grow into:
			// - Door labels sit on a single doorWidth-wide door (see
			//   doors.js) — not much lateral room before real, visible
			//   glyphs start running past the door's own edges, so this
			//   stays conservative.
			// - The facade sign/wordmark/byline sit on the lintel spanning
			//   the full building width (30 units, see OUTER_WALL_HALF_WIDTH)
			//   against a 14-unit-wide sign — comfortably more room to grow
			//   before hitting an edge, so this can afford to scale further
			//   for mobile legibility. (Depth/position relative to the wall
			//   no longer moves with either of these — see updateTextFovScale's
			//   own X/Y-only scale.set calls below.)
			const MAX_DOOR_LABEL_SCALE = 1.2;
			const MAX_SIGN_SCALE = 1.5;
			function computeTextFovScale(fovDegrees, maxScale) {
				const rawScale =
					Math.tan(THREE.MathUtils.degToRad(fovDegrees / 2)) /
					Math.tan(THREE.MathUtils.degToRad(REFERENCE_FOV / 2));
				return Math.min(rawScale, maxScale);
			}
			// Best-effort initial value — container.clientWidth/clientHeight
			// (driven by CSS like 100dvh) isn't guaranteed to have resolved
			// to its final size yet at this exact synchronous point, so this
			// gets a second, authoritative pass in resizeWebglCanvas below,
			// the moment its ResizeObserver reports the real dimensions
			// (seen in practice without that second pass: aspect
			// self-corrected there but fov never did, leaving the two
			// mismatched and a door cropped out of frame).
			const initialAspect = width / height;
			const fov = computeDoorVisibleFovDegrees(initialAspect);

			const camera = new THREE.PerspectiveCamera(fov, initialAspect, 0.1, 800);
			// The facade's brick and its point lights (see buildDoor/
			// buildingSign below) live on this layer, separate from
			// everything else's flat toon shading — keyLight/fillLight
			// stay on the default layer only, so they never touch the
			// facade, and these point lights stay on this layer only, so
			// they never touch anything else. The camera needs it
			// enabled just to see the facade at all.
			const FACADE_LIGHT_LAYER = 1;
			camera.layers.enable(FACADE_LIGHT_LAYER);
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			// updateStyle=false: its on-screen box is driven entirely by the
			// .webgl-canvas / .topdown-active CSS below (full-bleed in walk
			// mode, tucked into the corner in topdown mode) — letting
			// three.js also write inline width/height would fight that.
			renderer.setSize(width, height, false);
			renderer.domElement.classList.add("webgl-canvas");
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			container.appendChild(renderer.domElement);
			// Draws each person's black silhouette outline as a second
			// (inflated, back-face) pass — the standard cheap per-object
			// outline technique, done here instead of by hand per body
			// part. PencilOutlineEffect additionally wobbles that hull per
			// vertex for a hand-drawn look (see the file itself); the
			// defaults there are tuned for the crowd's body scale.
			const effect = new PencilOutlineEffect(renderer, {
				defaultThickness: OUTLINE_DEFAULT_THICKNESS,
				defaultColor: [0, 0, 0],
				defaultKeepAlive: true
			});

			// Minimap: see Minimap.lifedeath.svelte — it owns the canvas,
			// drawing, and sizing; this just keeps feeding it each person's
			// flat (x, z) position and current color, both of which
			// updatePeoplePositions/applyColorVariable already track every
			// frame, plus the one-time room-layout config init() needs.

			// Per-person minimap position, written every frame in
			// updatePeoplePositions (typed arrays — no per-person object
			// allocation). Color is written only in applyColorVariable,
			// since it only changes when the dropdown selection does.
			const minimapX = new Float32Array(respondents.length);
			const minimapZ = new Float32Array(respondents.length);
			const personColorCSS = new Array(respondents.length).fill(BG_COLOR_CSS);

			minimapComponent.init({
				bgColorCss: BG_COLOR_CSS,
				roomWidth: ROOM_WIDTH,
				halfWidth: HALF_WIDTH,
				zoneWidth: ZONE_WIDTH,
				halfDepth: HALF_DEPTH,
				exteriorDepth: EXTERIOR_DEPTH,
				ageMin,
				ageMax,
				ageToZ
			});

			// Lighting: directional only, deliberately no PointLight anywhere
			// in the scene. A point light's intensity falls off with
			// distance, so even flat/toon-shaded materials still show a
			// smooth brightness pool near the fixture — a gradient across a
			// single face, not a hard edge. A directional light has no
			// position, only an angle, so every point on a given flat face
			// gets the *exact* same intensity: one uniform tone per face,
			// full stop. Combined with flatShading (below) and the 2-step
			// toon ramp, this is what actually produces "sharp facets, no
			// gradient" on the low-poly crowd and a single flat tone per wall/floor plane.
			//
			// AMBIENT_LIGHT_INTENSITY layers a uniform floor on top of all
			// that — like a directional light it has no position/falloff, so
			// it still lands as one flat tone per face rather than a
			// gradient, just applied equally from every direction at once.
			// 0 by default (no ambient at all, the room's original look);
			// raise it to lift the toon ramp's dark/shadow band without
			// touching keyLight/fillLight's own angle or color.
			const AMBIENT_LIGHT_INTENSITY = 0;
			const ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY);
			scene.add(ambientLight);

			const keyLight = new THREE.DirectionalLight(0xf5cfb0, 4.8);
			keyLight.position.set(0, 1, -1); // from the doorway end, angled down
			scene.add(keyLight);
			scene.add(keyLight.target);

			// keyLight is the only light that casts shadows onto walls/doors
			// (fillLight stays shadow-less — it's just there to keep the far
			// side of every facet from going pure black). The room is 250
			// units deep but only RENDER_CULL_DISTANCE units around the
			// walker are ever actually drawn (see root.visible above), so
			// the shadow camera's frustum is sized to that same radius —
			// far cheaper and sharper than sizing it to the whole room —
			// and recentered on the walker every frame instead (see
			// updateCamera), sliding along with them rather than staying fixed in world space.
			keyLight.castShadow = true;
			// The shadow frustum below covers a 40x120-unit area (room width
			// x twice the render-cull distance) — at 2048x2048 that's only
			// ~17 texels per world unit along the depth axis, coarse enough
			// that door/facade shadow edges look visibly blocky, especially
			// at an oblique viewing angle where a single texel's footprint
			// projects across more of the screen. 4096 roughly doubles
			// texel density in both axes; shadow.radius softens what
			// aliasing remains via extra PCF sampling.
			keyLight.shadow.mapSize.set(4096, 4096);
			keyLight.shadow.radius = 3;
			keyLight.shadow.bias = -0.0015;
			// On top of the depth bias above — reduces acne on the brick
			// facade's own fine relief (each brick is only 0.1 units deep,
			// fine enough that depth bias alone still let some through).
			keyLight.shadow.normalBias = 0.02;
			const KEY_LIGHT_SHADOW_DISTANCE = 60; // how far back along its fixed direction the light itself sits from its target — shadow-camera-only; doesn't change the lighting angle
			const keyLightDir = new THREE.Vector3(0, 1, -1).normalize();
			const shadowCam = keyLight.shadow.camera;
			shadowCam.left = -(HALF_WIDTH + 5);
			shadowCam.right = HALF_WIDTH + 5;
			shadowCam.top = RENDER_CULL_DISTANCE + 10;
			shadowCam.bottom = -(RENDER_CULL_DISTANCE + 10);
			shadowCam.near = 1;
			shadowCam.far = KEY_LIGHT_SHADOW_DISTANCE + RENDER_CULL_DISTANCE + 10;
			shadowCam.updateProjectionMatrix();

			const fillLight = new THREE.DirectionalLight(0x6a5a8a, 1.8);
			fillLight.position.set(0.6, 0.4, 1); // opposite side, dim — keeps the far side of every facet from going pure black
			scene.add(fillLight);


			// A soft, unattached fill that always surrounds the walker
			// (see updateCamera, which keeps it centered on the camera
			// every frame) — no visible bulb/mesh of its own, just
			// illumination, so whatever's immediately nearby never goes
			// pure black even deep in the room where keyLight/fillLight's
			// fixed angle can leave a facet in full shadow. Ranged short
			// enough to read as "right around you" rather than lighting
			// the whole room evenly.
			const cameraLight = new THREE.PointLight("#cbb8ff", 1.2, 10, 2);
			scene.add(cameraLight);

			// A shared toon shading ramp: just two hard-edged steps
			// (NearestFilter, no interpolation) — shadow tone or highlight
			// tone, nothing in between. Pushed toward the extremes (was
			// [40, 150]) for a harder, more graphic-novel cel-shaded split
			// between lit/shadow faces — still capped short of pure
			// white/black so neither step ever fully blows out or crushes.
			const toonRampCanvas = document.createElement("canvas");
			toonRampCanvas.width = 2;
			toonRampCanvas.height = 1;
			const toonRampCtx = toonRampCanvas.getContext("2d");
			[15, 215].forEach((v, i) => {
				toonRampCtx.fillStyle = `rgb(${v}, ${v}, ${v})`;
				toonRampCtx.fillRect(i, 0, 1, 1);
			});
			const toonGradientMap = new THREE.CanvasTexture(toonRampCanvas);
			toonGradientMap.minFilter = THREE.NearestFilter;
			toonGradientMap.magFilter = THREE.NearestFilter;
			toonGradientMap.generateMipmaps = false;

			// A soft vertical gradient (lighter near the ceiling, darker
			// toward the floor) for wall/door surfaces — BoxGeometry's
			// default per-face UVs already run 0 (bottom) to 1 (top), so
			// this single 1px-wide texture gives every flat panel a subtle
			// sense of depth/ambient occlusion instead of one uniform flat
			// tone, without touching the toon light/shadow ramp above (map
			// and gradientMap multiply independently in the same material).
			function createVerticalGradientTexture(topRGB, bottomRGB) {
				const canvas = document.createElement("canvas");
				canvas.width = 1;
				canvas.height = 128;
				const ctx = canvas.getContext("2d");
				const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
				gradient.addColorStop(0, topRGB);
				gradient.addColorStop(1, bottomRGB);
				ctx.fillStyle = gradient;
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				const texture = new THREE.CanvasTexture(canvas);
				texture.wrapS = THREE.ClampToEdgeWrapping;
				texture.wrapT = THREE.ClampToEdgeWrapping;
				texture.colorSpace = THREE.SRGBColorSpace;
				// Mipmapping a texture that's already only 1px wide is
				// degenerate (each mip level still can't shrink below that
				// 1px width while its height keeps halving) — left at the
				// default LinearMipmapLinearFilter/generateMipmaps=true,
				// this rendered as a blocky, mip-level-dependent checkerboard
				// instead of a smooth gradient. A single un-mipmapped linear
				// level is both correct and cheap for something this small.
				texture.generateMipmaps = false;
				texture.minFilter = THREE.LinearFilter;
				texture.magFilter = THREE.LinearFilter;
				return texture;
			}
			const wallGradientMap = createVerticalGradientTexture(
				"rgb(255, 255, 255)",
				"rgb(110, 110, 110)"
			);
			const doorGradientMap = createVerticalGradientTexture(
				"rgb(255, 255, 255)",
				"rgb(150, 150, 150)"
			);

			// Each door's zone x — needed by both the room shell (the inner
			// wall's corridor openings line up with these) and the facade/
			// doors builders below.
			const ZONE_XS = DOORS.map((door) => door.x);

			// Everything outside the building (the brick facade, the plaza
			// floor/debris/backdrop/side walls — see facade.js/roomShell.js's
			// own exteriorGroup destructuring) lives in this one shared
			// group so it can all be hidden in a single toggle once the
			// walker's inside with every door shut (see updateExteriorVisibility
			// below) — the interior has its own separate wall surfaces, so
			// none of this is ever visible from in there anyway. Each
			// door's own lamp/hinges/knob/label are handled separately (see
			// door.exteriorFixtures in doors.js) since those need to hide
			// per-door, based on that specific door's own open state.
			const exteriorGroup = new THREE.Group();
			exteriorGroup.name = "exterior";
			scene.add(exteriorGroup);

			// The room shell, the brick facade, and the doors themselves
			// each live in their own module now (see roomShell.js/
			// facade.js/doors.js) — Main just owns the shared resources
			// (lights, gradient maps/materials, room-layout constants) and
			// wires them through. buildFacade must run before buildDoors:
			// its brickFrontLocalZ tells each door's lamp/bracket how far
			// to clear the brick relief.
			const { backWall, leftWall, rightWall, innerWallMeshes } = buildRoomShell(
				scene,
				innerRoomGroup,
				{
					toonGradientMap,
					wallGradientMap,
					roomWidth: ROOM_WIDTH,
					roomHeight: ROOM_HEIGHT,
					roomDepth: ROOM_DEPTH,
					halfWidth: HALF_WIDTH,
					halfDepth: HALF_DEPTH,
					outerWallHalfWidth: OUTER_WALL_HALF_WIDTH,
					exteriorDepth: EXTERIOR_DEPTH,
					zoneWidth: ZONE_WIDTH,
					wallThickness: WALL_THICKNESS,
					facadeThickness: FACADE_THICKNESS,
					corridorWidth: CORRIDOR_WIDTH,
					zoneXs: ZONE_XS,
					ageMin,
					ageMax,
					ageToZ,
					exteriorGroup
				}
			);
			const { brickFrontLocalZ, wordmarkLogo, byline, signGroup } = buildFacade(scene, {
				toonGradientMap,
				doors: DOORS,
				doorWidth: DOOR_WIDTH,
				doorHeight: DOOR_HEIGHT,
				doorZ: DOOR_Z,
				facadeThickness: FACADE_THICKNESS,
				outerWallHalfWidth: OUTER_WALL_HALF_WIDTH,
				roomHeight: ROOM_HEIGHT,
				facadeLightLayer: FACADE_LIGHT_LAYER,
				exteriorGroup
			});
			buildDoors(scene, DOORS, {
				doorWidth: DOOR_WIDTH,
				doorHeight: DOOR_HEIGHT,
				doorZ: DOOR_Z,
				facadeThickness: FACADE_THICKNESS,
				doorZoneColors: DOOR_ZONE_COLORS,
				doorZoneColorsLight: DOOR_ZONE_COLORS_LIGHT,
				neonPink: NEON_PINK,
				doorGradientMap,
				toonGradientMap,
				brickFrontLocalZ,
				facadeLightLayer: FACADE_LIGHT_LAYER,
				doorLabelAssets: DOOR_LABEL_ASSETS
			});

			// Applies computeTextFovScale's current result to every piece of
			// legibility-sensitive text — called once synchronously below
			// (matching camera fov's own best-effort initial value) and
			// again in resizeWebglCanvas once fov gets its authoritative
			// recalculation there.
			function updateTextFovScale() {
				const signScale = computeTextFovScale(camera.fov, MAX_SIGN_SCALE);
				const doorLabelScale = computeTextFovScale(camera.fov, MAX_DOOR_LABEL_SCALE);
				// X/Y only, Z pinned at 1 — these are thin boxes (see
				// wrapCanvasInPanel in textPanel.js), not flat planes, so a
				// uniform scale.setScalar also grew their depth, which
				// pushed the front face further out from the wall/door
				// it's mounted flush against as textScale grew on mobile —
				// legible, but visibly floating off the surface instead of
				// looking printed on it. Scaling only the two axes that
				// actually make the text bigger leaves depth (and so
				// position relative to the wall) untouched.
				signGroup.scale.set(signScale, signScale, 1);
				// Scaled on its own, not as part of signGroup — see its own
				// comment in facade.js for why: its position (not just its
				// size) matters for staying visually clear of the sign
				// above it, and group-scaling moved it along with
				// everything else.
				byline.scale.set(signScale, signScale, 1);
				for (const door of DOORS) {
					door.label.scale.set(doorLabelScale, doorLabelScale, 1);
				}
			}
			updateTextFovScale();

			// Swings each door open as the walker approaches and shut as
			// they leave — DOOR_TRIGGER_RADIUS must exceed FACADE_CLEARANCE
			// or a closed door would block the walker before triggering it.
			function updateDoors(dt) {
				const openFactor = 1 - Math.exp(-dt / DOOR_OPEN_TIME);
				for (const door of DOORS) {
					const dx = renderWalkX - door.x;
					const dz = renderWalkZ - DOOR_Z;
					const isNear =
						dx * dx + dz * dz < DOOR_TRIGGER_RADIUS * DOOR_TRIGGER_RADIUS;
					door.openAmount += ((isNear ? 1 : 0) - door.openAmount) * openFactor;
					door.hinge.rotation.y = door.openAmount * DOOR_OPEN_ANGLE;
				}
			}

			// Performance: skips drawing the entire outside scene (brick
			// facade, plaza floor/debris/backdrop/side walls, and each
			// door's own lamp/hinges/knob/label) once none of it could
			// possibly be visible — the walker's inside, and every door's
			// shut. Per-door fixtures use that door's own openAmount rather
			// than the shared allDoorsClosed check, so standing inside near
			// one open door still hides the OTHER two doors' fixtures (and
			// the exterior group itself only reappears once no door offers
			// a view out at all). "Closed enough" rather than exactly 0
			// since openAmount eases asymptotically and would otherwise
			// never quite reach it.
			const DOOR_CLOSED_OPEN_AMOUNT = 0.02;
			function updateExteriorVisibility() {
				const allDoorsClosed = DOORS.every(
					(door) => door.openAmount < DOOR_CLOSED_OPEN_AMOUNT
				);
				exteriorGroup.visible = !(insideRoom && allDoorsClosed);
				for (const door of DOORS) {
					const hideThisDoor =
						insideRoom && door.openAmount < DOOR_CLOSED_OPEN_AMOUNT;
					door.exteriorFixtures.visible = !hideThisDoor;
					door.threshold.visible = !hideThisDoor;
				}
			}

			// Flips once the walker first crosses into the room — after
			// that, normal scroll navigation works in both directions, so
			// stepping back out through a door and back in again just works
			// (the doors themselves stay visible/functional the whole time; see updateDoors).
			function updateEnteredRoom() {
				if (!hasEnteredRoom && renderWalkZ <= HALF_DEPTH) {
					hasEnteredRoom = true;
					autoWalking = false;
				}
			}

			// Pushes the walker back to whichever side of DOOR_Z they're
			// already on — a no-op at an open-enough door. The crowd never
			// needs this, since ageToZ never places anyone past HALF_DEPTH.
			const resolveOuterDoorCollision = createOuterDoorCollisionResolver({
				doors: DOORS,
				doorZ: DOOR_Z,
				doorWidth: DOOR_WIDTH,
				facadeClearance: FACADE_CLEARANCE,
				doorPassableOpenAmount: DOOR_PASSABLE_OPEN_AMOUNT
			});

			// Always open — the outer doors are the only real gate. The
			// crowd never needs this either (same as resolveOuterDoorCollision).
			const resolveInnerWallCollision = createInnerWallCollisionResolver({
				zoneXs: ZONE_XS,
				halfDepth: HALF_DEPTH,
				facadeClearance: FACADE_CLEARANCE,
				corridorWidth: CORRIDOR_WIDTH
			});

			// Each person is its own clone of a body GLB matching their own
			// GENDER (see pickModelForPerson above), with an independent
			// skeleton and material (so applyColorVariable can tint each
			// separately) — spawned by crowd.js, which also builds the
			// shared blob-shadow InstancedMesh everyone uses. Parallel
			// arrays below are indexed like `respondents`, same as before.
			const {
				personRoots,
				personBodyMaterials,
				personSkinMaterials,
				personBaseColors,
				personMixers,
				personWalkActions,
				personRestActions,
				shadows,
				placementHelper,
				flatRotation: FLAT_ROTATION
			} = spawnCrowd(innerRoomGroup, respondents, {
				toonGradientMap,
				outlineDefaultThickness: OUTLINE_DEFAULT_THICKNESS,
				shadowRadius: SHADOW_RADIUS,
				pickModelForPerson
			});

			// Far crowd LOD: a person's own body/shape never changes with
			// distance (a different mesh swapping in reads as their identity
			// changing, not just "less detail") — only its color (darker
			// with distance, see LOD_COLOR_BANDS) and its OutlineEffect
			// outline thickness (thinner with distance) step through a few
			// bands, and its animation freezes in whatever pose it's in once
			// far enough away. All of the per-frame wander/collision/LOD/
			// walk-cycle logic (previously here as updateWander/
			// updatePeoplePositions) now lives in crowdSimulation.js's
			// createCrowdAnimator — Main just feeds it the walker/UI state
			// it needs to read live, via getters rather than a stale
			// snapshot from creation time.
			const crowdAnimator = createCrowdAnimator({
				respondents,
				personRoots,
				personBodyMaterials,
				personSkinMaterials,
				personBaseColors,
				personMixers,
				personWalkActions,
				personRestActions,
				shadows,
				placementHelper,
				flatRotation: FLAT_ROTATION,
				minimapX,
				minimapZ,
				getRenderWalkX: () => renderWalkX,
				getRenderWalkZ: () => renderWalkZ,
				getTargetPositionBlend: () => targetPositionBlend,
				positionTransitionSpeed: POSITION_TRANSITION_SPEED,
				blendTurnTime: BLEND_TURN_TIME,
				blendTurnGateAngle: BLEND_TURN_GATE_ANGLE,
				blendMoveEaseSeconds: BLEND_MOVE_EASE_SECONDS,
				getClickedPersonIndex: () => clickedPersonIndex,
				getHoveredPersonIndex: () => hoveredPersonIndex,
				lodColorBands: LOD_COLOR_BANDS,
				offsetReturnTime: OFFSET_RETURN_TIME,
				facingTurnTime: FACING_TURN_TIME,
				walkAmountSmoothTime: WALK_AMOUNT_SMOOTH_TIME,
				walkSpeedSmoothTime: WALK_SPEED_SMOOTH_TIME,
				personCellSize: PERSON_CELL_SIZE,
				collisionRadius: COLLISION_RADIUS,
				pushStrength: PUSH_STRENGTH,
				personCollisionRadius: PERSON_COLLISION_RADIUS,
				personPushStrength: PERSON_PUSH_STRENGTH,
				maxOffset: MAX_OFFSET,
				faceCameraRadius: FACE_CAMERA_RADIUS,
				moveFacingEpsilonSq: MOVE_FACING_EPSILON_SQ,
				renderCullDistance: RENDER_CULL_DISTANCE,
				walkerScaleCorrection: WALKER_SCALE_CORRECTION,
				breathingSpeed: BREATHING_SPEED,
				breathingAmplitude: BREATHING_AMPLITUDE,
				breathCyclesPerStride: BREATH_CYCLES_PER_STRIDE,
				walkBreathAmplitudeScale: WALK_BREATH_AMPLITUDE_SCALE,
				stepBackHoldFraction: STEP_BACK_HOLD_FRACTION,
				minWalkTimescale: MIN_WALK_TIMESCALE,
				maxWalkTimescale: MAX_WALK_TIMESCALE,
				walkAnimSpeed: WALK_ANIM_SPEED,
				selectedPersonBrightness: SELECTED_PERSON_BRIGHTNESS,
				hoveredPersonBrightness: HOVERED_PERSON_BRIGHTNESS,
				lodFreezeDistance: LOD_FREEZE_DISTANCE
			});

			// Recoloring: variable_config.js is the single source of truth for
			// both the dropdown and its colors — every category/range and its
			// color come straight from there (see getCategoryFor/getRangeFor).

			// A base variable's columns are ["X_Y1","X_Y2"], ["X_Y1"], or
			// ["X"] (see variable_config.js) — pick whichever matches the
			// crowd's current wave, falling back to the only column there is.
			function resolveColumn(baseVar) {
				const columns = getColumns(baseVar);
				return (
					columns.find((column) => column.endsWith(`_${positionMode}`)) ??
					columns[0]
				);
			}

			function applyColorVariable(baseVar) {
				const config = variableConfig[baseVar];
				const column = resolveColumn(baseVar);
				const muted = new THREE.Color(MUTED_COLOR);
				const mutedCSS = `#${muted.getHexString()}`;

				const bucketFor =
					config.type === "numeric"
						? (person) => getRangeFor(baseVar, person[column])
						: (person) => getCategoryFor(baseVar, person[column]);
				legendData = {
					kind: "categorical",
					items: (config.type === "numeric"
						? config.ranges
						: config.categories
					).map((bucket) => ({ label: bucket.label, color: bucket.color }))
				};

				// Each person has their own body material, so tinting one
				// doesn't affect anyone else. The body material itself is
				// written every frame in updatePeoplePositions from
				// personBaseColors (darkened by LOD distance band), not here
				// directly; personColorCSS feeds the 2D minimap (see Minimap.lifedeath.svelte's draw()).
				for (let i = 0; i < respondents.length; i++) {
					const bucket = bucketFor(respondents[i]);
					if (bucket) {
						personBaseColors[i].set(bucket.color);
						personColorCSS[i] = bucket.color;
					} else {
						personBaseColors[i].copy(muted);
						personColorCSS[i] = mutedCSS;
					}
				}
			}

			// Re-runs on any change to selectedVariable — and, since
			// resolveColumn (called from inside applyColorVariable) reads
			// positionMode too, on Y1/Y2 toggling as well.
			$effect(() => {
				applyColorVariable(selectedVariable);
			});

			// First-person "walk" controls. Camera height is locked to
			// EYE_HEIGHT; drag steers (see DRAG_LOOK_RADIANS_PER_SWIPE), scroll/vertical-drag only ever walks forward/back.

			// ?age= (debug mode only) — reopens already standing at that
			// exact walk depth instead of at the door, see debugAgeParam above.
			const debugAgeZ =
				debugAgeParam !== null && debugAgeParam !== "" ? ageToZ(Number(debugAgeParam)) : null;
			// Where the walker is trying to go (updated instantly by input).
			let targetWalkX = 0;
			let targetWalkZ = debugAgeZ ?? (debugMode ? DEBUG_START_Z : DEFAULT_START_Z);
			// Where the camera (and collision checks) actually are — glides
			// toward the target above every frame.
			let renderWalkX = targetWalkX;
			let renderWalkZ = targetWalkZ;

			// Already past the door when reopening at a saved ?age= — same as
			// having actually walked in, not still standing outside it.
			let hasEnteredRoom = debugAgeZ !== null;

			// Set by handleDoorClick: the Z to walk to once renderWalkX has
			// lined up with the clicked door's X (see the animate() check
			// near updateEnteredRoom) — walking both axes toward the door at
			// once let the straight-line path clip through the facade next
			// to the actual door gap instead of passing through it.
			let pendingDoorWalkZ = null;
			const DOOR_ALIGN_EPSILON = 0.4;
			// True from the moment a door is clicked until hasEnteredRoom
			// flips — while true, cameraYaw eases toward targetCameraYaw
			// (see animate()) instead of snapping, so turning to walk
			// straight through the door (see handleDoorClick) reads as
			// turning to face where you're headed, not a jump-cut.
			let autoWalking = false;
			// smoothDamp's own carried velocity for the door auto-walk (world
			// units/second) — reset to 0 in handleDoorClick each time a fresh
			// walk-through starts, then fed back in frame over frame in
			// animate() so acceleration/deceleration is continuous even
			// across the X-then-Z handoff.
			let doorWalkVelX = 0;
			let doorWalkVelZ = 0;

			// Where the camera is steering/tilting toward — updated instantly by input.
			let targetCameraYaw = 0;
			let targetCameraPitch = DEFAULT_CAMERA_PITCH;
			// The camera's actual current heading/tilt, gliding toward the
			// target above rather than snapping — same idea as renderWalkX/Z.
			let cameraYaw = 0;
			let cameraPitch = DEFAULT_CAMERA_PITCH;
			// Eases toward ROOM_ENTRY_PITCH_TILT while inside the room, and
			// back to 0 outside — added on top of cameraPitch each frame
			// (see animate()) rather than baked into targetCameraPitch
			// itself, so the user's own drag-set pitch keeps its usual
			// instant 1:1 feel; this rides along on top of it.
			let roomEntryPitchOffset = 0;

			// Shared by walk() (forward/back) and strafe() (left/right) below —
			// moves targetWalkX/Z by rawDelta*WALK_SPEED along a given
			// ground-plane direction (dirX, dirZ), with the same clamping/
			// door/wall collision handling either way.
			function moveDirection(dirX, dirZ, rawDelta) {
				// Ignore input while the walk view is tucked into the corner
				// (the minimap is the large view) — the small box is a preview, not a control surface.
				if (mode !== "walk") return;
				// Outside, scrolling/swiping forward is disabled entirely —
				// the only way in is clicking a door (see handleDoorClick),
				// which sets the walk target directly rather than going
				// through here. Once hasEnteredRoom flips true, this no
				// longer applies and normal navigation just works again.
				if (!hasEnteredRoom) return;
				const delta = Math.max(
					-MAX_WHEEL_STEP,
					Math.min(MAX_WHEEL_STEP, rawDelta)
				);
				const distance = delta * WALK_SPEED;
				targetWalkX = Math.min(
					MAX_WALK_X,
					Math.max(MIN_WALK_X, targetWalkX + dirX * distance)
				);
				targetWalkZ = Math.min(
					MAX_WALK_Z,
					Math.max(MIN_WALK_Z, targetWalkZ + dirZ * distance)
				);
				targetWalkZ = resolveOuterDoorCollision(targetWalkX, targetWalkZ);
				targetWalkZ = resolveInnerWallCollision(targetWalkX, targetWalkZ);
			}

			// Positive rawDelta ("scroll down") moves forward, like scrolling
			// down a page carries you further in.
			function walk(rawDelta) {
				// Forward direction on the ground plane for the current heading (pitch is never a factor).
				moveDirection(Math.sin(targetCameraYaw), -Math.cos(targetCameraYaw), rawDelta);
			}

			// Positive rawDelta strafes right (camera's own right, not world +X).
			function strafe(rawDelta) {
				moveDirection(Math.cos(targetCameraYaw), Math.sin(targetCameraYaw), rawDelta);
			}

			const doorRaycaster = new THREE.Raycaster();
			const doorClickPointer = new THREE.Vector2();
			// Walking to just past the inner wall, not just past the outer
			// door — otherwise hasEnteredRoom (which checks the inner
			// boundary, coincident with DOOR_Z here) wouldn't flip until a
			// later manual step, leaving navigation still disabled right after the auto-walk finishes.
			const AUTO_WALK_INSIDE_Z = HALF_DEPTH - 4;

			// Solid line-of-sight blockers for handlePersonClick below — a
			// click on a person standing behind one of these (from the
			// camera's own viewpoint) shouldn't register. Doors included
			// (via their hinge group, so a closed or mid-swing door still
			// blocks correctly) since the facade doors sit directly between
			// the camera and the crowd until you've walked through one.
			const occluderMeshes = [
				backWall,
				leftWall,
				rightWall,
				...innerWallMeshes,
				...DOORS.map((d) => d.hinge)
			];

			// True while the pointer sits over the minimap's own on-screen
			// box — its canvas is pointer-events:none purely so drag-to-
			// steer/scroll-to-walk still reach the 3D canvas underneath it
			// (see Minimap.lifedeath.svelte), not so clicks on it should
			// reach through to whatever door/person happens to be behind it.
			function isPointerOverMinimap(event) {
				return minimapComponent.containsPoint(event.clientX, event.clientY);
			}

			// Clicking a door while still outside walks straight through it
			// and a little past the inner wall — the only way in, now that
			// scrolling/swiping forward is disabled outside (see walk()).
			// This just sets the walk target directly; the existing
			// renderWalkX/Z follow-easing animates the approach and
			// updateDoors swings the door open as usual — both already
			// happen every frame regardless of what set the target.
			// Line up with the door's X first (still out in the plaza — see
			// the animate() check that releases pendingDoorWalkZ once
			// aligned); only then walk forward through it. Shared by
			// handleDoorClick's raycast hit below and the keyboard
			// equivalent (Enter on a Tab/arrow-focused door — see
			// activateExteriorFocus further down).
			function walkThroughDoor(door) {
				targetWalkX = door.x;
				pendingDoorWalkZ = AUTO_WALK_INSIDE_Z;
				autoWalking = true;
				doorWalkVelX = 0;
				doorWalkVelZ = 0;
			}

			function handleDoorClick(event) {
				// Live position (insideRoom), not hasEnteredRoom's one-way
				// latch — that only ever flips once and stays true forever
				// after the first entry (see its own comment), which used to
				// mean clicking a door to auto-walk back in only ever worked
				// the very first time. Stepping back outside near a door
				// should offer the same click-to-enter every time.
				if (insideRoom || mode !== "walk") return;
				if (inputController.hasDragged || isPointerOverMinimap(event)) return;
				const rect = container.getBoundingClientRect();
				doorClickPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				doorClickPointer.y =
					-((event.clientY - rect.top) / rect.height) * 2 + 1;
				doorRaycaster.setFromCamera(doorClickPointer, camera);
				const hits = doorRaycaster.intersectObjects(
					DOORS.map((d) => d.hinge),
					true
				);
				if (hits.length === 0) return;
				let obj = hits[0].object;
				while (obj && !obj.userData.door) obj = obj.parent;
				const door = obj && obj.userData.door;
				if (!door) return;
				walkThroughDoor(door);
			}

			// Opens the respondent detail modal for a given respondents
			// index (see Modal.lifedeath.svelte), and lights them up (see
			// clickedPersonIndex/updatePeoplePositions) so it's clear who's
			// selected. Shared by handlePersonClick's walk-mode raycast hit
			// below and the top-down minimap's own dot click.
			function selectPerson(index) {
				clickedPerson = respondents[index];
				clickedPersonIndex = index;
			}
			selectPersonImpl = selectPerson;

			// Opens the respondent detail modal for whichever crowd member was
			// clicked (see Modal.lifedeath.svelte), and lights them up (see
			// clickedPersonIndex/updatePeoplePositions) so it's clear who's
			// selected. Only raycasts against currently-visible people
			// (root.visible, see the LOD pass in updatePeoplePositions) —
			// with ~2,500 people in the crowd, most of them culled/
			// off-screen at any moment, this keeps a click cheap instead of
			// testing the whole roster every time.
			function handlePersonClick(event) {
				if (mode !== "walk") return;
				// The crowd is only clickable while actually inside the room
				// (live position, see insideRoom — not hasEnteredRoom, whose
				// one-way latch would otherwise leave people clickable
				// through a closed door after you'd stepped back outside) —
				// while outside, the only interaction is walking through a
				// door (see handleDoorClick).
				if (!insideRoom) return;
				if (inputController.hasDragged || isPointerOverMinimap(event)) return;
				const rect = container.getBoundingClientRect();
				doorClickPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				doorClickPointer.y =
					-((event.clientY - rect.top) / rect.height) * 2 + 1;
				doorRaycaster.setFromCamera(doorClickPointer, camera);
				// Walls/doors included so a person standing behind one
				// doesn't count as clicked just because the ray reaches
				// them — the nearest hit overall has to actually be a person.
				const hits = doorRaycaster.intersectObjects(
					[
						...personRoots.filter((root) => root.visible),
						...occluderMeshes
					],
					true
				);
				if (hits.length === 0) return;
				let obj = hits[0].object;
				while (obj && obj.userData.personIndex === undefined) obj = obj.parent;
				const index = obj?.userData.personIndex;
				if (index === undefined) return;
				selectPerson(index);
			}

			// Opens pudding.cool (the wordmark) or the author page (the
			// byline) in a new tab — both are exterior signage meshes
			// returned from buildFacade, so this only ever hits while
			// looking at the outside facade (same doorRaycaster/pointer
			// the other click handlers on this same container already use).
			// Shared by the click handler below and the hover handler further
			// down — raycasts against just these two signs and walks back up
			// to whichever one (if either) was actually hit, from the
			// pointer's current event coordinates.
			function raycastFacadeLink(event) {
				const rect = container.getBoundingClientRect();
				doorClickPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				doorClickPointer.y =
					-((event.clientY - rect.top) / rect.height) * 2 + 1;
				doorRaycaster.setFromCamera(doorClickPointer, camera);
				const hits = doorRaycaster.intersectObjects([wordmarkLogo, byline], true);
				if (hits.length === 0) return null;
				let obj = hits[0].object;
				while (obj && obj !== wordmarkLogo && obj !== byline) obj = obj.parent;
				return obj === wordmarkLogo || obj === byline ? obj : null;
			}

			function handleFacadeLinkClick(event) {
				if (mode !== "walk") return;
				if (inputController.hasDragged || isPointerOverMinimap(event)) return;
				const target = raycastFacadeLink(event);
				if (target === wordmarkLogo) {
					window.open("https://pudding.cool/", "_blank", "noopener,noreferrer");
				} else if (target === byline) {
					window.open(
						"https://pudding.cool/author/alvin-chang/",
						"_blank",
						"noopener,noreferrer"
					);
				}
			}

			// In topdown mode the walk view shrinks to a small preview box
			// in the corner (see .lifedeath-room.topdown-active's own
			// canvas.webgl-canvas CSS) — clicking it goes back to walk mode,
			// the same way clicking the minimap's own small corner box (see
			// Minimap.lifedeath.svelte's canvas onclick) switches to topdown.
			// Every other click handler on this container already no-ops
			// outside walk mode, so this doesn't fight any of them.
			function handleWebglPreviewClick(event) {
				if (mode !== "topdown") return;
				const rect = renderer.domElement.getBoundingClientRect();
				if (
					event.clientX >= rect.left &&
					event.clientX <= rect.right &&
					event.clientY >= rect.top &&
					event.clientY <= rect.bottom
				) {
					mode = "walk";
				}
			}

			// Lights the hovered link up to full brightness (see
			// FACADE_LINK_DIM_BRIGHTNESS in facade.js for their default
			// dimmed state) and swaps in a pointer cursor, same affordance a
			// real link would give.
			let hoveredFacadeSign = null;
			function setFacadeSignHover(target) {
				if (hoveredFacadeSign === target) return;
				if (hoveredFacadeSign) {
					hoveredFacadeSign.material[4].color.setScalar(FACADE_LINK_DIM_BRIGHTNESS);
				}
				hoveredFacadeSign = target;
				if (hoveredFacadeSign) {
					hoveredFacadeSign.material[4].color.setScalar(1);
				}
			}

			// Same idea for a hovered door — only the label itself lights up
			// (see DOOR_LABEL_DIM_BRIGHTNESS in doors.js for its default dim
			// state), not the door panel's own color — panelMaterial/
			// baseColor are still exposed by buildDoors (see doors.js) but
			// are no longer touched here. Unlike the crowd (see
			// hoveredPersonIndex below, read fresh by the per-frame LOD pass
			// in crowdSimulation.js), nothing else touches the label's
			// material color per-frame, so it needs an explicit revert on
			// unhover rather than just falling out of a getter.
			// Much brighter than DOOR_LABEL_DIM_BRIGHTNESS's default dim (see
			// doors.js) — well past a full, un-boosted 1 too (what the
			// wordmark/byline links settle for on their own hover, see
			// setFacadeSignHover above), since the label starts noticeably
			// dimmer than those links do, so the hover jump needs more
			// headroom to still read as "much brighter" rather than just
			// "back to normal."
			const DOOR_LABEL_HOVER_BRIGHTNESS = 2.4;
			let hoveredDoor = null;
			function setHoveredDoor(door) {
				if (hoveredDoor === door) return;
				if (hoveredDoor) {
					hoveredDoor.label.material[4].color.setScalar(DOOR_LABEL_DIM_BRIGHTNESS);
				}
				hoveredDoor = door;
				if (hoveredDoor) {
					hoveredDoor.label.material[4].color.setScalar(DOOR_LABEL_HOVER_BRIGHTNESS);
				}
			}

			// The crowd's own hover brightness (see HOVERED_PERSON_BRIGHTNESS)
			// is applied by crowdSimulation.js's per-frame LOD pass, the same
			// place clickedPersonIndex's brighter callout already happens —
			// this is read through a getter (getHoveredPersonIndex, passed to
			// createCrowdAnimator below) so it just needs updating here, not
			// applied/reverted by hand like the door/sign materials above.
			let hoveredPersonIndex = null;

			// One combined hover pass across every clickable thing in the
			// scene (facade signs, doors, the crowd) — checked in that order
			// each move and mutually exclusive, so only one ever lights up at
			// a time; whichever one is live also drives the pointer cursor.
			// `event.buttons !== 0` skips all of this while a mouse button's
			// held so it doesn't fight inputController's own "grab"/
			// "all-scroll" drag cursor.
			function handlePointerHover(event) {
				// Real pointer movement means the mouse owns hover now — any
				// keyboard focus from Tab/arrow-cycling (see
				// exteriorFocusIndex below) yields to it, same as clicking
				// elsewhere blurs a focused DOM element.
				exteriorFocusIndex = -1;
				if (mode !== "walk" || event.buttons !== 0 || isPointerOverMinimap(event)) {
					setFacadeSignHover(null);
					setHoveredDoor(null);
					hoveredPersonIndex = null;
					container.style.cursor = "all-scroll";
					return;
				}

				const facadeTarget = raycastFacadeLink(event);
				setFacadeSignHover(facadeTarget);
				if (facadeTarget) {
					setHoveredDoor(null);
					hoveredPersonIndex = null;
					container.style.cursor = "pointer";
					return;
				}

				const rect = container.getBoundingClientRect();
				doorClickPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				doorClickPointer.y =
					-((event.clientY - rect.top) / rect.height) * 2 + 1;
				doorRaycaster.setFromCamera(doorClickPointer, camera);

				// Doors are only the ones that matter while still outside —
				// same reasoning as handleDoorClick/handlePersonClick's own
				// insideRoom checks, just for hover instead of click.
				if (!insideRoom) {
					hoveredPersonIndex = null;
					const hits = doorRaycaster.intersectObjects(
						DOORS.map((d) => d.hinge),
						true
					);
					let obj = hits[0]?.object ?? null;
					while (obj && !obj.userData.door) obj = obj.parent;
					setHoveredDoor(obj?.userData.door ?? null);
					container.style.cursor = obj?.userData.door ? "pointer" : "all-scroll";
					return;
				}

				setHoveredDoor(null);
				const hits = doorRaycaster.intersectObjects(
					[...personRoots.filter((root) => root.visible), ...occluderMeshes],
					true
				);
				let obj = hits[0]?.object ?? null;
				while (obj && obj.userData.personIndex === undefined) obj = obj.parent;
				const index = obj?.userData.personIndex;
				hoveredPersonIndex = index !== undefined ? index : null;
				container.style.cursor = index !== undefined ? "pointer" : "all-scroll";
			}

			// Keyboard equivalent of hovering/clicking a door or the
			// wordmark/byline while still outside — Tab/Shift+Tab or
			// Left/Right arrows cycle through them (arrows are otherwise
			// inert outside anyway, see moveDirection's own !hasEnteredRoom
			// guard, so repurposing them here doesn't fight their inside
			// walk/strafe role), Enter activates whichever's focused. -1
			// means nothing's focused. Reuses the exact same
			// setHoveredDoor/setFacadeSignHover highlight mouse hover uses
			// (see handlePointerHover above), so a Tab-focused door/sign
			// looks identical to a moused-over one.
			const exteriorTargets = [...DOORS, wordmarkLogo, byline];
			let exteriorFocusIndex = -1;
			function highlightExteriorFocus() {
				const target = exteriorTargets[exteriorFocusIndex];
				if (target === wordmarkLogo || target === byline) {
					setHoveredDoor(null);
					setFacadeSignHover(target ?? null);
				} else {
					setFacadeSignHover(null);
					setHoveredDoor(target ?? null);
				}
			}
			function activateExteriorFocus() {
				const target = exteriorTargets[exteriorFocusIndex];
				if (!target) return;
				if (target === wordmarkLogo) {
					window.open("https://pudding.cool/", "_blank", "noopener,noreferrer");
				} else if (target === byline) {
					window.open(
						"https://pudding.cool/author/alvin-chang/",
						"_blank",
						"noopener,noreferrer"
					);
				} else {
					walkThroughDoor(target);
				}
			}

			// Arrow keys walk/strafe (held, not one-shot — see animate()'s own
			// per-frame check of this set) instead of toggling top-down view,
			// which is now the space bar's job alone.
			const heldArrowKeys = new Set();
			function handleKeyDown(event) {
				if (event.key === "Tab" && !insideRoom && mode === "walk") {
					event.preventDefault();
					const delta = event.shiftKey ? -1 : 1;
					exteriorFocusIndex =
						(exteriorFocusIndex + delta + exteriorTargets.length) %
						exteriorTargets.length;
					highlightExteriorFocus();
					return;
				}
				if (event.key === "Enter" && exteriorFocusIndex !== -1) {
					event.preventDefault();
					activateExteriorFocus();
					return;
				}
				if (event.key.startsWith("Arrow")) {
					event.preventDefault();
					// Outside, arrows cycle door/sign focus (see above) instead
					// of walking/strafing — the same key names, just a
					// different meaning depending on whether there's anywhere
					// to walk yet.
					if (!insideRoom && mode === "walk" && !event.repeat) {
						if (event.key === "ArrowRight" || event.key === "ArrowDown") {
							exteriorFocusIndex =
								(exteriorFocusIndex + 1 + exteriorTargets.length) %
								exteriorTargets.length;
							highlightExteriorFocus();
						} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
							exteriorFocusIndex =
								(exteriorFocusIndex - 1 + exteriorTargets.length) %
								exteriorTargets.length;
							highlightExteriorFocus();
						}
					}
					heldArrowKeys.add(event.key);
				} else if (event.key === " ") {
					event.preventDefault();
					// event.repeat: holding space shouldn't rapid-fire the
					// toggle on every OS auto-repeat tick, just the initial press.
					if (event.repeat) return;
					mode = mode === "walk" ? "topdown" : "walk";
				}
			}
			function handleKeyUp(event) {
				if (event.key.startsWith("Arrow")) heldArrowKeys.delete(event.key);
			}
			function handleWindowBlur() {
				heldArrowKeys.clear();
			}

			// Mouse-drag/touch-drag steering and scroll/swipe-to-walk (see
			// inputController.js) — owns its own gesture-recognition state
			// (drag deltas, touch axis-locking, click-vs-drag detection),
			// reading/writing this component's own walk-target state
			// through the getters/setters below rather than owning it
			// itself, since that same state also drives the crowd/camera/
			// minimap update every frame.
			const inputController = createInputController({
				container,
				getMode: () => mode,
				getTargetCameraYaw: () => targetCameraYaw,
				setTargetCameraYaw: (v) => {
					targetCameraYaw = v;
				},
				getTargetCameraPitch: () => targetCameraPitch,
				setTargetCameraPitch: (v) => {
					targetCameraPitch = v;
				},
				walk,
				getCameraFov: () => camera.fov,
				dragLookRadiansPerSwipe: DRAG_LOOK_RADIANS_PER_SWIPE,
				maxDragPitch: MAX_DRAG_PITCH
			});
			inputController.attach();
			container.addEventListener("click", handleDoorClick);
			container.addEventListener("click", handlePersonClick);
			container.addEventListener("click", handleFacadeLinkClick);
			container.addEventListener("click", handleWebglPreviewClick);
			container.addEventListener("mousemove", handlePointerHover);
			window.addEventListener("keydown", handleKeyDown);
			window.addEventListener("keyup", handleKeyUp);
			// If focus leaves the window/tab mid-press (alt-tab, devtools,
			// etc.), no keyup ever fires for whatever's still held — without
			// this a key could get stuck "held" forever.
			window.addEventListener("blur", handleWindowBlur);

			// Camera pose. The "top-down view" toggle no longer moves this
			// camera at all — it swaps which canvas is large vs. tucked into
			// the corner (see the .topdown-active CSS and the minimap/webgl
			// canvas resize observers below) — so there's just the one, walk, pose.

			// A throwaway camera (not a plain Object3D) purely to compute a
			// look-at quaternion — Object3D.lookAt() faces *toward* the
			// target instead of orienting *at* it like a camera does.
			const poseHelper = new THREE.PerspectiveCamera();

			function computeWalkPose() {
				const yaw = cameraYaw;
				const pitch = cameraPitch;
				// Standard spherical-to-cartesian look direction.
				const lookDir = new THREE.Vector3(
					Math.sin(yaw) * Math.cos(pitch),
					Math.sin(pitch),
					-Math.cos(yaw) * Math.cos(pitch)
				);
				poseHelper.position.set(renderWalkX, EYE_HEIGHT, renderWalkZ);
				poseHelper.up.set(0, 1, 0);
				poseHelper.lookAt(
					renderWalkX + lookDir.x,
					EYE_HEIGHT + lookDir.y,
					renderWalkZ + lookDir.z
				);
				return {
					position: poseHelper.position.clone(),
					quaternion: poseHelper.quaternion.clone()
				};
			}

			function updateCamera() {
				// Slides the shadow-casting keyLight's frustum along with
				// the walker (see its setup above) rather than leaving it
				// fixed over the room's origin, so its fixed-size shadow
				// camera frustum always covers the currently-visible area
				// instead of a fixed, arbitrary point along this 250-unit-deep room.
				keyLight.target.position.set(renderWalkX, 0, renderWalkZ);
				keyLight.position
					.copy(keyLightDir)
					.multiplyScalar(-KEY_LIGHT_SHADOW_DISTANCE)
					.add(keyLight.target.position);

				const pose = computeWalkPose();
				camera.position.copy(pose.position);
				camera.quaternion.copy(pose.quaternion);

				// Keeps cameraLight centered on the walker, wherever they go.
				cameraLight.position.copy(camera.position);
			}

			// Just the raw target (0 = Y1, 1 = Y2) — each person now eases
			// their own way toward it at their own pace (see
			// crowdSimulation.js's own __positionBlend/__blendPathDistance),
			// so this doesn't need to track a transition-in-progress itself
			// the way a single shared eased value used to.
			const targetPositionBlend = $derived(positionMode === "Y2" ? 1 : 0);

			// Reads the canvas's own on-screen box, not the container's —
			// they only match in walk mode. In topdown mode (see
			// .topdown-active CSS) this canvas is the small corner box, so
			// resizing off of it rather than the always-full-bleed container
			// keeps the walk view's aspect correct there too.
			// updateStyle=false on both calls below: its on-screen box stays
			// entirely CSS-driven (see .webgl-canvas) — letting either one
			// also write inline width/height would fight that CSS, and since
			// this fires from a ResizeObserver on the canvas's own box, that
			// fight was a real bug (a subpixel-rounding ping-pong between
			// this observer and the inline style it just set — visible as
			// the whole view slowly shrinking in topdown mode).
			function resizeWebglCanvas() {
				const w = renderer.domElement.clientWidth;
				const h = renderer.domElement.clientHeight;
				if (w === 0 || h === 0) return;
				camera.aspect = w / h;
				// Corrects fov to match, too — but only before the walker's
				// entered the room and only in walk mode (this same handler
				// also fires for the tiny topdown-mode preview box, whose
				// aspect has nothing to do with seeing the doors). This is
				// what actually makes the door-visibility guarantee reliable
				// (see computeDoorVisibleFovDegrees above): the very first
				// time this fires, w/h are the real, settled dimensions,
				// correcting for cases where the initial synchronous read
				// above wasn't. Once inside, resizing no longer touches fov,
				// same as before this existed.
				if (mode === "walk" && !hasEnteredRoom) {
					camera.fov = computeDoorVisibleFovDegrees(w / h);
					updateTextFovScale();
				}
				camera.updateProjectionMatrix();
				renderer.setSize(w, h, false);
				effect.setSize(w, h, false);
			}
			// A ResizeObserver (rather than a window "resize" listener) also
			// catches the canvas's own box changing size independent of the
			// window — exactly what happens when the walk/topdown toggle
			// swaps which canvas is large vs. tucked into the corner.
			const webglResizeObserver = new ResizeObserver(resizeWebglCanvas);
			webglResizeObserver.observe(renderer.domElement);

			// Initial layout pass (dt = 0 means no decay/push happens yet,
			// just base positions written into the instance matrices).
			crowdAnimator.update(0, 0);

			let frameId;
			let lastFrameTime = performance.now();
			// Accumulated from each frame's already-capped dt, rather than
			// read directly off the wall clock — while a tab is backgrounded,
			// rAF simply stops firing, so this barely advances and just
			// resumes on the next real frame with no jump. Using raw
			// (now - animationStart) instead would still track real elapsed
			// time across that gap, and things scheduled against it (like
			// each person's __nextMoveTime in updateWander) would all read
			// as overdue at once on return — a burst of the whole crowd
			// suddenly shuffling to "catch up," which is exactly what this avoids.
			let simulatedElapsed = 0;
			function animate() {
				frameId = requestAnimationFrame(animate);

				const now = performance.now();
				// Clamp dt so e.g. switching browser tabs for a while doesn't
				// cause a giant catch-up jump on the next frame.
				const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
				lastFrameTime = now;
				simulatedElapsed += dt;

				// Arrow keys: held-state (see handleKeyDown/handleKeyUp) applied
				// every frame, scaled by dt, so movement is smooth and
				// frame-rate independent rather than tied to OS key-repeat.
				const keyMoveDelta = KEY_MOVE_DELTA_PER_SECOND * dt;
				if (heldArrowKeys.has("ArrowUp")) walk(keyMoveDelta);
				if (heldArrowKeys.has("ArrowDown")) walk(-keyMoveDelta);
				if (heldArrowKeys.has("ArrowRight")) strafe(keyMoveDelta);
				if (heldArrowKeys.has("ArrowLeft")) strafe(-keyMoveDelta);

				// Once the door-click auto-walk has lined up on X, release
				// the queued Z so this same frame's follow-easing (below)
				// starts carrying it forward through the doorway, and turn
				// to face straight ahead (every door leads straight in along
				// -Z once aligned) so the final approach reads as walking
				// forward through the door, not sliding sideways into it.
				if (
					pendingDoorWalkZ !== null &&
					Math.abs(renderWalkX - targetWalkX) < DOOR_ALIGN_EPSILON
				) {
					targetWalkZ = pendingDoorWalkZ;
					pendingDoorWalkZ = null;
					targetCameraYaw = 0;
				}

				if (autoWalking) {
					// smoothDamp (see its own doc comment in roomMath.js)
					// carries real velocity frame to frame, so it accelerates
					// up to DOOR_WALK_SPEED and decelerates into a stop, and
					// doesn't jolt when pendingDoorWalkZ resolves above (a
					// fresh, larger target) — it just curves smoothly toward
					// the new target instead of restarting from rest.
					const stepXResult = smoothDamp(
						renderWalkX,
						targetWalkX,
						doorWalkVelX,
						DOOR_WALK_SMOOTH_TIME,
						DOOR_WALK_SPEED,
						dt
					);
					const stepZResult = smoothDamp(
						renderWalkZ,
						targetWalkZ,
						doorWalkVelZ,
						DOOR_WALK_SMOOTH_TIME,
						DOOR_WALK_SPEED,
						dt
					);
					renderWalkX = stepXResult.value;
					renderWalkZ = stepZResult.value;
					doorWalkVelX = stepXResult.velocity;
					doorWalkVelZ = stepZResult.velocity;

					const yawStep =
						Math.sign(shortestAngleDelta(cameraYaw, targetCameraYaw)) *
						Math.min(
							Math.abs(shortestAngleDelta(cameraYaw, targetCameraYaw)),
							DOOR_WALK_YAW_SPEED * dt
						);
					cameraYaw = wrapAngle(cameraYaw + yawStep);
				} else {
					// Glide the rendered walk position toward the
					// input-driven target. This exponential ("critically
					// damped") follow is frame-rate independent: after
					// FOLLOW_TIME seconds, ~63% of the remaining distance has
					// been closed, regardless of fps.
					const followFactor = 1 - Math.exp(-dt / FOLLOW_TIME);
					renderWalkX += (targetWalkX - renderWalkX) * followFactor;
					renderWalkZ += (targetWalkZ - renderWalkZ) * followFactor;

					// Steering (yaw/pitch) snaps straight to the drag input —
					// no follow-time smoothing — so looking around tracks the mouse/touch instantly.
					cameraYaw = targetCameraYaw;
				}
				const entryPitchFactor = 1 - Math.exp(-dt / ROOM_ENTRY_PITCH_TIME);
				const targetEntryPitchOffset =
					renderWalkZ <= HALF_DEPTH ? ROOM_ENTRY_PITCH_TILT : 0;
				roomEntryPitchOffset +=
					(targetEntryPitchOffset - roomEntryPitchOffset) * entryPitchFactor;
				cameraPitch = targetCameraPitch + roomEntryPitchOffset;

				updateEnteredRoom();
				crowdAnimator.update(dt, simulatedElapsed);
				updateCamera();
				updateDoors(dt);
				currentAge = zToAge(renderWalkZ);
				// Stepping inside drops whatever exterior Tab/arrow focus
				// (see exteriorFocusIndex) was live — the doors/wordmark/
				// byline it highlights aren't the point of interest anymore
				// once you're through, and the door panel's own brightened
				// hover color shouldn't stay stuck lit from in here.
				if (!insideRoom && renderWalkZ <= HALF_DEPTH && exteriorFocusIndex !== -1) {
					exteriorFocusIndex = -1;
					highlightExteriorFocus();
				}
				insideRoom = renderWalkZ <= HALF_DEPTH;
				if (debugMode) {
					debugStats = {
						x: renderWalkX,
						z: renderWalkZ,
						yawDeg: THREE.MathUtils.radToDeg(cameraYaw),
						pitchDeg: THREE.MathUtils.radToDeg(cameraPitch),
						fov: camera.fov,
						age: currentAge,
						mode,
						insideRoom,
						autoWalking,
						selectedVariable
					};
				}
				updateExteriorVisibility();
				updateStoryText();

				// Skipped only during the door auto-walk itself (autoWalking):
				// it draws every person twice (an inflated backface pass plus
				// the normal one), and nobody's actually visible yet while
				// still outside walking toward the door, so there's nothing
				// to lose by skipping it there. It switches back on the
				// instant hasEnteredRoom flips (see updateEnteredRoom above,
				// called earlier this same frame) — deliberately not a beat
				// later, so the outline is already on by the time the crowd
				// first comes into view rather than fading in outline-less.
				if (autoWalking) {
					renderer.render(scene, camera);
				} else {
					effect.render(scene, camera);
				}
				minimapComponent.draw({
					walkerX: renderWalkX,
					walkerZ: renderWalkZ,
					walkerYaw: cameraYaw,
					currentAge,
					minimapX,
					minimapZ,
					personColorCSS,
					respondentCount: respondents.length,
					selectedPersonIndex: clickedPersonIndex
				});
			}

			// One-time startup check: computeDoorVisibleFovDegrees above
			// solves for the doors' own horizontal visibility, not the
			// wordmark's vertical position — on some aspect ratios (a wide,
			// short window especially, which needs relatively little
			// vertical fov to still show the doors) the wordmark, the
			// tallest thing on the facade, can end up cropped off the top
			// of frame at the default pitch. Only corrects for that actual
			// problem: if the logo's already fully in view, wherever
			// exactly that is, this leaves the camera untouched.
			function ensureWordmarkInView() {
				const box = new THREE.Box3().setFromObject(wordmarkLogo);
				const topPoint = new THREE.Vector3(
					(box.min.x + box.max.x) / 2,
					box.max.y,
					(box.min.z + box.max.z) / 2
				);
				// Re-poses the real camera from a candidate pitch (same
				// lookDir math as computeWalkPose) and reports where the
				// logo's own top edge lands on screen, in CSS px from the
				// top — negative means cropped off above the visible area.
				function topEdgeScreenYForPitch(pitch) {
					const lookDir = new THREE.Vector3(
						Math.sin(cameraYaw) * Math.cos(pitch),
						Math.sin(pitch),
						-Math.cos(cameraYaw) * Math.cos(pitch)
					);
					camera.position.set(renderWalkX, EYE_HEIGHT, renderWalkZ);
					camera.up.set(0, 1, 0);
					camera.lookAt(
						renderWalkX + lookDir.x,
						EYE_HEIGHT + lookDir.y,
						renderWalkZ + lookDir.z
					);
					camera.updateMatrixWorld(true);
					const ndc = topPoint.clone().project(camera);
					return ((1 - ndc.y) / 2) * height;
				}

				if (topEdgeScreenYForPitch(cameraPitch) >= 0) return; // already fully in view

				// Pitching up (looking further above the horizon) carries
				// high elements like this one further down into frame —
				// search upward for a pitch that's overshot the target,
				// then bisect down to the exact pitch that lands the top
				// edge at TARGET_SCREEN_Y.
				const TARGET_SCREEN_Y = 20;
				let lo = cameraPitch;
				let hi = cameraPitch + Math.PI / 3;
				for (let i = 0; i < 20 && topEdgeScreenYForPitch(hi) < TARGET_SCREEN_Y; i++) {
					hi += Math.PI / 12;
				}
				for (let i = 0; i < 30; i++) {
					const mid = (lo + hi) / 2;
					if (topEdgeScreenYForPitch(mid) < TARGET_SCREEN_Y) lo = mid;
					else hi = mid;
				}
				// animate()'s own per-frame `cameraPitch = targetCameraPitch
				// + roomEntryPitchOffset` overwrites cameraPitch from
				// targetCameraPitch on the very next frame regardless, so
				// that's the one that actually needs to carry this forward.
				targetCameraPitch = hi;
				cameraPitch = hi;
			}
			ensureWordmarkInView();

			animate();

			// Returned to onMount's outer scope and called on teardown.
			return () => {
				cancelAnimationFrame(frameId);
				webglResizeObserver.disconnect();
				inputController.detach();
				container.removeEventListener("click", handleDoorClick);
				container.removeEventListener("click", handlePersonClick);
				container.removeEventListener("click", handleFacadeLinkClick);
				container.removeEventListener("click", handleWebglPreviewClick);
				container.removeEventListener("mousemove", handlePointerHover);
				window.removeEventListener("keydown", handleKeyDown);
				window.removeEventListener("keyup", handleKeyUp);
				window.removeEventListener("blur", handleWindowBlur);
				renderer.dispose();
				scene.traverse((obj) => {
					// The door labels/building sign use a material *array*
					// (see makeTextPanel) — a plain obj.material.dispose?.()
					// would silently no-op on those (arrays have no
					// .dispose), leaking their canvas textures.
					if (Array.isArray(obj.material)) {
						obj.material.forEach((material) => material.dispose?.());
					} else if (obj.material) {
						obj.material.dispose?.();
					}
					if (obj.geometry) obj.geometry.dispose?.();
				});
				container.removeChild(renderer.domElement);
			};
		}

		// Svelte calls this when the component is destroyed.
		return () => {
			disposed = true;
			cleanup();
		};
	});
</script>

<div
	class="lifedeath-room"
	class:topdown-active={mode === "topdown"}
	style="--bg-color: {BG_COLOR_CSS};"
	bind:this={container}
>
	{#if !shouldHidePanel}
		<ControlPanel
			{variableOptions}
			bind:selectedVariable
			{legendData}
			bind:mode
			bind:positionMode
			{currentAge}
			{loadingMessage}
			hideMap={shouldHideMap}
			bind:panelHeight={controlPanelHeight}
		/>
	{/if}
	{#if storyTexts.length > 0}
		<div class="story-overlay" class:no_map={shouldHideMap} transition:fade>
			{#each storyTexts as text}
				<p>{@html text}</p>
			{/each}
		</div>
	{/if}
	<Minimap
		bind:this={minimapComponent}
		bind:mode
		{container}
		hidden={shouldHideMap}
		panelClear={panelClearPx}
		onPersonClick={(index) => selectPersonImpl?.(index)}
	/>
	{#if debugMode}
		<div class="debug-panel">
			<div>x: {debugStats.x.toFixed(2)}  z: {debugStats.z.toFixed(2)}</div>
			<div>yaw: {debugStats.yawDeg.toFixed(1)}°  pitch: {debugStats.pitchDeg.toFixed(1)}°</div>
			<div>fov: {debugStats.fov.toFixed(1)}  age: {debugStats.age?.toFixed(1) ?? "—"}</div>
			<div>mode: {debugStats.mode}  inside: {debugStats.insideRoom}  autoWalk: {debugStats.autoWalking}</div>
			<div>variable: {debugStats.selectedVariable}</div>
			<button type="button" onclick={copyDebugStats}>
				{debugCopyFeedback ? "Copied!" : "Copy"}
			</button>
		</div>
	{/if}
</div>

<Modal
	person={clickedPerson}
	bind:wave={positionMode}
	onclose={() => {
		clickedPerson = null;
		clickedPersonIndex = null;
	}}
/>

<style>
	.lifedeath-room {
		position: relative;
		width: 100%;
		/* 100vh includes the space mobile browsers' address bar occupies
		   before it hides on scroll — every bottom-anchored overlay here
		   (.minimap-canvas, ControlPanel's .minimap) is positioned
		   relative to this box, so on mobile 100vh made them sit below the
		   actually-visible viewport. 100dvh tracks the real visible height
		   as the address bar shows/hides; the plain 100vh above is just the
		   fallback for browsers that don't support dvh yet, and is
		   overridden by the line below wherever it's supported. */
		height: 100vh;
		height: 100dvh;
		background: #0d0815;
		/* Touch-dragging inside the room drives the camera, not the page —
		   without this, mobile browsers try to scroll/pull-to-refresh the
		   page underneath our own touchmove handling. */
		touch-action: none;
		overscroll-behavior: none;
	}

	/* Top-down mode fills the whole page with the same dark shade the
	   minimap itself is drawn on (see --bg-color, set from the same
	   BG_COLOR the 3D scene's own background/fog use), instead of the
	   walk-mode room's own background — the 3D canvas is tucked into a
	   small corner box in this mode (see .webgl-canvas below), so
	   whatever's behind the minimap should read as one continuous surface
	   with it, not a mismatched border. */
	.lifedeath-room.topdown-active {
		background: var(--bg-color);
	}

	.lifedeath-room :global(canvas) {
		display: block;
		touch-action: none;
	}

	/* The walk view (three.js's own canvas): fills the room by default. In
	   topdown mode (the "Top-down view" button, see ControlPanel) it's
	   tucked into the corner box the minimap otherwise occupies below,
	   instead of moving the actual 3D camera — resizeWebglCanvas in the
	   script keeps the render resolution/aspect in sync with whichever
	   box CSS gives it. z-index 0 (rather than the default static
	   stacking non-positioned canvases otherwise get) so it stays below
	   every other overlay here even now that it's position: absolute. */
	.lifedeath-room :global(canvas.webgl-canvas) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
	}
	.lifedeath-room.topdown-active :global(canvas.webgl-canvas) {
		top: auto;
		left: auto;
		right: 24px;
		bottom: 50px;
		width: 200px;
		height: 150px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		z-index: 6;
		/* Click-to-switch-back-to-walk affordance — see
		   handleWebglPreviewClick. */
		cursor: pointer;
	}

	/* On narrow screens there isn't room for both the small walk-view
	   preview AND the "Back to walk view" button below it without
	   crowding — hiding the preview here just leaves blank space at the
	   bottom (this box's own position doesn't affect anything else,
	   they're all independently absolutely-positioned) for that button,
	   which still works the same way via ControlPanel's own toggle. */
	@media (max-width: 640px) {
		.lifedeath-room.topdown-active :global(canvas.webgl-canvas) {
			/* !important: this canvas carries its own inline
			   style="display: block" (three.js/WebGL context setup sets it
			   directly on the element, not something this app's own code
			   does) — inline styles otherwise beat any stylesheet rule
			   regardless of selector specificity; an author-stylesheet
			   !important is the one thing that outranks that. */
			display: none !important;
		}
	}

	/* The minimap itself (its box sizing/topdown-active variant, including
	   its own in-canvas age label) is styled in Minimap.lifedeath.svelte
	   now — it owns that <canvas>. */

	/* ?debug-only camera HUD. Top-right: ControlPanel owns top-left
	   (top: 0, left: 0) and Minimap owns bottom-right, leaving this corner
	   free. */
	.debug-panel {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 20;
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: 8px 10px;
		background: rgba(0, 0, 0, 0.6);
		color: #0f0;
		font-family: var(--font-mono);
		font-size: 12px;
		line-height: 1.4;
		pointer-events: auto;
		white-space: pre;
	}

	.debug-panel button {
		align-self: flex-start;
		margin-top: 4px;
		padding: 2px 8px;
		background: rgba(255, 255, 255, 0.1);
		color: #0f0;
		border: 1px solid rgba(0, 255, 0, 0.4);
		font-family: var(--font-mono);
		font-size: 11px;
		cursor: pointer;
	}

	.debug-panel button:hover {
		background: rgba(255, 255, 255, 0.2);
	}
</style>
