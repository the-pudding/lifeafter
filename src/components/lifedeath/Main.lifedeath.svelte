<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import * as THREE from "three";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	// Deep-clones a rigged GLTF graph with its own skeleton — plain
	// Object3D.clone() would share bones/animation state across instances.
	import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
	// Used once, up front, to weld the walker GLB's low-poly hard-edged
	// geometry into smooth-shaded geometry — see smoothGeometry() below.
	import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
	// A fork of three's own OutlineEffect that wobbles the outline's
	// extruded hull per-vertex, so the line reads as hand-drawn instead of
	// a perfectly smooth silhouette — see the file itself for why it's a
	// full fork rather than a wrapper.
	import { PencilOutlineEffect } from "./PencilOutlineEffect.js";

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

	// Fetched at runtime (~17MB) rather than imported as a module
	const PEOPLE_DATA_URL = "/data/people.json";
	// Low-poly rigged humanoids with a baked-in "Walk" clip, one body per
	// GENDER x body-type combo; each crowd member clones whichever matches
	// their own GENDER. CC-BY-4.0 (Sketchfab, "Base Mesh 246 Tri").
	const BASE_URL = "/assets/app/bodies_clothes/";
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

	// Used for missing/null values, or a "before you pick a category" gray.
	const MUTED_COLOR = 0xcccccc;
	// The building's only "lit" color, outside — the sign, each door's
	// outline frame, and its lamp fixture/glow are all this one pink neon
	// shade rather than being tinted per zone, so the dark, mostly-unlit
	// exterior reads as one consistent neon-signage look.
	const NEON_PINK = 0xff8dce;
	// The door PANEL itself still hints at what's behind it (the frame
	// around it doesn't anymore, see NEON_PINK) — solid, unlit colors,
	// not textured, so they stay clearly legible against the dark facade.
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
	const EXTERIOR_DEPTH = 12;
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
	const BUILDING_LABEL = ["Life after death?"];

	// The building shell (floor, facade, side walls) just matches the
	// room's actual width — no shifted interior to leave clearance for anymore.
	const OUTER_WALL_HALF_WIDTH = HALF_WIDTH;

	// The vestibule's corridors: solid, not just a suggested path (see
	// resolveVestibuleCollision) — sized for about three people abreast.
	const CORRIDOR_WIDTH = 2.7;
	const TURN_CLEARANCE = 0.15;
	const VESTIBULE_CEILING_HEIGHT = DOOR_HEIGHT + 0.6;
	const CORRIDOR_WALL_HEIGHT = VESTIBULE_CEILING_HEIGHT;
	// Neon wayfinding arrows inside the vestibule — cyan, so they read as
	// functional signage distinct from the pink brand/door-outline neon.
	const ARROW_COLOR = "#00fff2";

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
	const LOD_FREEZE_DISTANCE = 14;
	const LOD_COLOR_BANDS = [
		{
			maxDistance: LOD_FREEZE_DISTANCE,
			brightness: 1,
			outlineThickness: OUTLINE_DEFAULT_THICKNESS
		},
		{
			maxDistance: 18,
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
	const SELECTED_PERSON_BRIGHTNESS = 2.5;

	// Walk-cycle animation: since the "Walk" clip has no standing-still
	// pose, each person cross-fades it against a frozen bind-pose clip by __walkAmount when they stop.
	// How fast a person's facing turns to match travel direction, and how
	// fast walk-amount fades — same frame-rate-independent pattern as FOLLOW_TIME.
	const FACING_TURN_TIME = 0.8; // seconds to close ~63% of the remaining turn
	const WALK_AMOUNT_SMOOTH_TIME = 0.4; // seconds to close ~63% of the fade in/out
	// The walk clip's baked-in stride only looks right at its animated
	// speed, so playback rate tracks each person's own smoothed ground
	// speed instead of a flat 1x (MIN/MAX bound the extremes).
	const WALK_SPEED_SMOOTH_TIME = 0.1;
	const WALK_ANIM_SPEED = 6;
	// A wander shuffle's actual ground speed is usually well under
	// WALK_ANIM_SPEED (small offsets over ~1s), so a floor of 2 was forcing
	// the clip to play at least 2x speed even for a barely-there shuffle —
	// legs cycling fast while covering almost no ground. Lowered so slow
	// movement gets a proportionally slow, subtle animation instead.
	const MIN_WALK_TIMESCALE = 0.4;
	const MAX_WALK_TIMESCALE = 4;
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
	// A subtle "breathing" wobble while standing still, fading out as
	// __walkAmount rises — scales the figure's Y axis since bone names vary between GLB rigs.
	const BREATHING_AMPLITUDE = 0.007; // fraction of height, peak scale change
	const BREATHING_SPEED = (2 * Math.PI) / 5; // radians/sec (~3.6s per breath)

	// First-person "walk" camera tuning, roughly at head height.
	const EYE_HEIGHT = FIGURE_HEIGHT * 0.9;
	// Steering is click-and-hold-drag (or touch-drag), proportional to drag
	// distance. Scrolling (or a vertical touch-drag) only ever walks forward/back.
	const DRAG_LOOK_RADIANS_PER_SWIPE = Math.PI / 2;
	// A mouse-drag also tilts the view up/down (touch-drag doesn't — that
	// axis is the walk gesture there), clamped short of straight up/down.
	const MAX_DRAG_PITCH = (60 * Math.PI) / 180;
	const WALK_SPEED = 0.02; // world units of *target* movement per unit of (clamped) wheel delta
	const MAX_WHEEL_STEP = 45; // clamp a single wheel event so trackpad flings don't teleport you
	// The camera glides toward each new wheel-driven position rather than
	// jumping. Smaller = snappier, larger = more sluggish.
	const FOLLOW_TIME = 0.1; // seconds to close ~63% of the remaining distance
	// The door-click auto-walk (see handleDoorClick) moves at this constant
	// speed instead — not eased like FOLLOW_TIME, so lining up with the
	// door and then walking straight through it both happen at one
	// consistent pace with no acceleration burst at the handoff between them.
	const DOOR_WALK_SPEED = 9; // world units/second
	const DOOR_WALK_YAW_SPEED = Math.PI * 0.7; // radians/second, turning to face forward once aligned
	// Keeps the walker inside the walls/edges so the camera's near-clip
	// plane never pokes through geometry; z spans plaza + building.
	const WALK_MARGIN = 3;
	const MIN_WALK_X = -HALF_WIDTH + WALK_MARGIN;
	const MAX_WALK_X = HALF_WIDTH - WALK_MARGIN;
	const MIN_WALK_Z = -HALF_DEPTH + WALK_MARGIN;
	const MAX_WALK_Z = HALF_DEPTH + EXTERIOR_DEPTH - WALK_MARGIN;
	// Where the walker starts: out in the plaza facing the building's
	// doors/sign — unless debugMode is on, starting just inside instead.
	const DEFAULT_START_Z = HALF_DEPTH + EXTERIOR_DEPTH;
	const DEBUG_START_Z = HALF_DEPTH - WALK_MARGIN;
	// Toggled with a `?debug` query param — a dev convenience, not a
	// feature that needs a UI button.
	const debugMode =
		typeof window !== "undefined" &&
		new URLSearchParams(window.location.search).has("debug");

	// Collision "nudging": a person near the walker is pushed sideways out
	// of the way via a small (offsetX, offsetZ) displacement that grows
	// while you're nearby and decays back to zero once you've moved on.
	const COLLISION_RADIUS = 1.1; // how close (world units) before a person gets nudged
	const PUSH_STRENGTH = 12; // how hard they're pushed, per second, at maximum overlap
	const MAX_OFFSET = 1.6; // a person can never be nudged further than this from their spot
	const OFFSET_RETURN_TIME = 0.6; // seconds for a nudge to mostly relax back
	// People also nudge each other aside, checked via a spatial hash grid
	// (see personGrid below) rather than an O(n²) all-pairs scan.
	const PERSON_COLLISION_RADIUS = 0.8; // just under the ~0.85 spawn spacing, so resting people don't jitter
	const PERSON_PUSH_STRENGTH = 3;
	const PERSON_CELL_SIZE = PERSON_COLLISION_RADIUS;

	// How long the crowd takes to walk from Y1 to Y2 layout (or back).
	const POSITION_TRANSITION_MS = 3500;

	// `mode` swaps which view is large vs. tucked into the corner (see the
	// .topdown-active CSS below) — the walk camera itself never changes.
	// `selectedVariable` drives the recolor dropdown
	// `positionMode` picks which wave's layout the crowd walks toward
	let mode = $state("walk"); // "walk" | "topdown"
	let selectedVariable = $state("AFTER_DEATH");
	let positionMode = $state("Y1"); // "Y1" | "Y2"

	// Debug convenience only: mirrors the "Color by" dropdown into
	// ?variable=, so a specific view can be linked/reloaded directly.
	// One-way (dropdown -> URL) — nothing reads this param back on load.
	$effect(() => {
		const variable = selectedVariable;
		if (!debugMode) return;
		const url = new URL(window.location.href);
		url.searchParams.set("variable", variable);
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
			const rawPeople = await response.json();
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
			const ageMax = 90; //Math.max(...allAges);

			// Younger respondents are placed toward the front (near where the
			// camera starts, larger Z); older respondents toward the back
			// wall (more negative Z).
			function ageToZ(age) {
				const t = (age - ageMin) / (ageMax - ageMin || 1);
				return HALF_DEPTH - t * ROOM_DEPTH;
			}

			// Inverse of ageToZ, for the ControlPanel's "Age" readout.
			// Clamped to [ageMin, ageMax] since WALK_MARGIN lets the walker
			// get slightly closer to the walls than the extreme respondents.
			function zToAge(z) {
				const t = (HALF_DEPTH - z) / ROOM_DEPTH;
				return Math.round(
					ageMin + Math.min(1, Math.max(0, t)) * (ageMax - ageMin)
				);
			}

			// Which third of the room the walker is physically in.
			function currentZoneKey() {
				if (renderWalkX < -ZONE_WIDTH / 2) return "no";
				if (renderWalkX > ZONE_WIDTH / 2) return "yes";
				return "unsure";
			}

			// Refreshes storyTexts (bound to the top-of-screen overlay in the
			// template) from copy.json: every "all" entry whose [age,
			// age_end] contains currentAge, plus every entry in whichever
			// zone (no/unsure/yes) array the walker is currently in — both
			// can be active at once, so this is a list, not a single string.
			function updateStoryText() {
				if (currentAge === null) {
					storyTexts = [];
					return;
				}
				const zoneKey = currentZoneKey();
				const matches = [];
				const collect = (entries) => {
					for (const entry of entries ?? []) {
						if (
							currentAge >= Number(entry.age) &&
							currentAge < Number(entry.age_end)
						) {
							matches.push(entry.text);
						}
					}
				};
				collect(copy.all);
				collect(copy[zoneKey]);
				storyTexts = matches;
			}

			// Computes a collision-free layout for one wave (Y1 or Y2) via
			// rejection sampling against a spatial hash grid. Returns {x, z}
			// per respondent; z is driven by age, x spread across the zone.
			function computeLayout(getZone, getAge) {
				const MIN_SPACING = 0.85; // minimum center-to-center distance between any two people
				const cellSize = MIN_SPACING;
				const occupiedCells = new Map(); // "cx,cz" -> [{x, z}, ...]

				function cellKeyFor(x, z) {
					return `${Math.floor(x / cellSize)},${Math.floor(z / cellSize)}`;
				}

				function farEnoughFromEveryoneElse(x, z) {
					const cx = Math.floor(x / cellSize);
					const cz = Math.floor(z / cellSize);
					// A person can only be too close to someone in the same
					// or an adjacent cell, since cells are sized to MIN_SPACING.
					for (let dx = -1; dx <= 1; dx++) {
						for (let dz = -1; dz <= 1; dz++) {
							const bucket = occupiedCells.get(`${cx + dx},${cz + dz}`);
							if (!bucket) continue;
							for (const other of bucket) {
								const ddx = other.x - x;
								const ddz = other.z - z;
								if (ddx * ddx + ddz * ddz < MIN_SPACING * MIN_SPACING)
									return false;
							}
						}
					}
					return true;
				}

				// Horizontal placement uses the full zone width (there's no
				// bar or other obstacle at the boundary anymore), with just a small wall margin.
				const WALL_MARGIN = 1.5;
				const HALF_ZONE = ZONE_WIDTH / 2;

				// zone is -1 (No), 0 (Unsure), or 1 (Yes). wallMargin shrinks
				// on each retry so dense age bands find room.
				function zoneBounds(zone, wallMargin) {
					if (zone < 0) return [-HALF_WIDTH + wallMargin, -HALF_ZONE];
					if (zone > 0) return [HALF_ZONE, HALF_WIDTH - wallMargin];
					return [-HALF_ZONE, HALF_ZONE];
				}

				return respondents.map((person) => {
					const zone = getZone(person);
					const baseZ = ageToZ(getAge(person));

					let x, z;
					const MAX_ATTEMPTS = 40;
					for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
						// Widen the search area on each retry so dense age
						// bands still find room instead of exhausting all 40 attempts.
						const widen = 1 + attempt / MAX_ATTEMPTS;
						const [min, max] = zoneBounds(zone, WALL_MARGIN / widen);
						x = min + Math.random() * (max - min);
						// Clamped so jitter never pushes the front-most age band past HALF_DEPTH into the facade.
						z = Math.min(
							HALF_DEPTH - WALL_MARGIN,
							baseZ + (Math.random() - 0.5) * (ROOM_DEPTH / 40) * widen
						);
						if (farEnoughFromEveryoneElse(x, z)) break;
					}
					// If every attempt failed, keep the last candidate rather than leaving the person unplaced.

					const key = cellKeyFor(x, z);
					if (!occupiedCells.has(key)) occupiedCells.set(key, []);
					occupiedCells.get(key).push({ x, z });

					return { x, z };
				});
			}

			const zoneFor = (value) =>
				value === "No" ? -1 : value === "Yes" ? 1 : 0;
			const y1Layout = computeLayout(
				(p) => zoneFor(p.AFTER_DEATH_Y1),
				(p) => p.AGE_Y1
			);
			const y2Layout = computeLayout(
				(p) => zoneFor(p.AFTER_DEATH_Y2),
				(p) => p.AGE_Y2
			);

			// A person's Y1 -> Y2 walk is a straight line between the two
			// endpoints — there's no bar or other obstacle at a zone
			// boundary to route around anymore. Returns { waypoints,
			// fractions }: fractions[i] is waypoints[i]'s cumulative-length
			// progress (0..1), for evaluateBlendPath below. Only ever two
			// waypoints now, but keeping the same shape means
			// evaluateBlendPath doesn't need to know that.
			function buildBlendPath(x1, z1, x2, z2) {
				const waypoints = [
					{ x: x1, z: z1 },
					{ x: x2, z: z2 }
				];
				return { waypoints, fractions: [0, 1] };
			}

			// Evaluates a person's blend path at progress t (0..1, same as
			// currentPositionBlend), finding the segment t falls in and lerping within it.
			function evaluateBlendPath({ waypoints, fractions }, t) {
				for (let i = 0; i < fractions.length - 1; i++) {
					if (t <= fractions[i + 1] || i === fractions.length - 2) {
						const segStart = fractions[i];
						const segEnd = fractions[i + 1];
						const u =
							segEnd > segStart ? (t - segStart) / (segEnd - segStart) : 0;
						const a = waypoints[i];
						const b = waypoints[i + 1];
						return { x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u };
					}
				}
				const last = waypoints[waypoints.length - 1];
				return { x: last.x, z: last.z };
			}

			respondents.forEach((person, i) => {
				// The fixed Y1/Y2 layout endpoints; __x/__z (below) is
				// wherever between them the room is currently showing (see currentPositionBlend).
				person.__xY1 = y1Layout[i].x;
				person.__zY1 = y1Layout[i].z;
				person.__xY2 = y2Layout[i].x;
				person.__zY2 = y2Layout[i].z;
				person.__x = person.__xY1;
				person.__z = person.__zY1;
				// The straight-line route between those two endpoints.
				person.__blendPath = buildBlendPath(
					person.__xY1,
					person.__zY1,
					person.__xY2,
					person.__zY2
				);
				person.__offsetX = 0;
				person.__offsetZ = 0;
				// Independent height/weight variation, so the crowd isn't a
				// field of identical clones — height scales Y only, weight
				// (build) scales X/Z, so a taller person isn't automatically bulkier too.
				person.__heightScale = 1 + Math.random() * 0.1;
				person.__widthScale = 0.7 + Math.random() * 0.6;
				// Which way this person is facing (radians); turned smoothly
				// toward their actual movement each frame (see updatePeoplePositions). Starts random.
				person.__facingYaw = Math.random() * Math.PI * 2;
				// 0..1, how "in motion" this person is — eases leg/arm swing
				// in/out as they start/stop moving (see updatePeoplePositions).
				person.__walkAmount = 0;
				// This person's own smoothed ground speed (world units/sec),
				// so their walk clip's playback rate tracks it instead of a flat 1x.
				person.__walkSpeed = 0;
				// Ambient wandering is an idle <-> shuffle state machine (see
				// updateWander): mostly stands still, occasionally shuffles
				// to a nearby resting spot. Staggered randomly so the room doesn't move in lockstep.
				person.__wanderRadius = 0 + Math.random() * 0.5;
				person.__wanderX = 0;
				person.__wanderZ = 0;
				person.__moving = false;
				person.__moveFromX = 0;
				person.__moveFromZ = 0;
				person.__moveToX = 0;
				person.__moveToZ = 0;
				person.__moveStart = 0;
				person.__moveDuration = 1;
				// Long, widely-staggered idle stretches so most of the crowd
				// is standing still at any given moment — occasional shuffles
				// (see updateWander) are the exception, not a constant fidget.
				person.__nextMoveTime = 2 + Math.random() * 20;
				// 0..1 progress through the current shuffle (0 when idle).
				person.__moveT = 0;
				// A random 0..1 fraction of the walk clip's duration, so each
				// mixer starts at a different point instead of stepping in unison.
				person.__animOffsetFraction = Math.random();
				// A random phase seed for the idle breathing wobble, so the crowd doesn't breathe in unison.
				person.__breathPhase = Math.random() * Math.PI * 2;
				// About 1 in 10 people stand with arms crossed while idle
				// (the body GLB's own ArmsCrossed clip); everyone else gets
				// the regular Idle clip (see restAction setup below).
				person.__armsCrossed = Math.random() < 0.1;
				// This frame's voluntary (rest-position-only) movement
				// direction — set each frame in Pass 1, read in Pass 2 to
				// catch a wander move that starts out behind current facing.
				person.__voluntaryMoveDx = 0;
				person.__voluntaryMoveDz = 0;
			});

			const width = container.clientWidth;
			const height = container.clientHeight;

			// --- Core three.js setup: scene, camera, renderer ---

			const BG_COLOR = 0x0f000d;

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
			function computeDoorVisibleFovDegrees(aspect) {
				const requiredVerticalFovRad =
					2 * Math.atan(Math.tan(requiredHalfHorizontalFovRad) / aspect);
				// Clamped to a sane range so an extreme aspect ratio (a very
				// short/wide or very narrow/tall window) can't push this to
				// a degenerate fisheye or pinhole value.
				return Math.min(
					120,
					Math.max(50, (requiredVerticalFovRad * 180) / Math.PI)
				);
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
			const BG_COLOR_CSS = `#${BG_COLOR.toString(16).padStart(6, "0")}`;

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
			const keyLight = new THREE.DirectionalLight(0xf5cfb0, 4.2);
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
			keyLight.shadow.mapSize.set(2048, 2048);
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

			const fillLight = new THREE.DirectionalLight(0x6a5a8a, 1.3);
			fillLight.position.set(0.6, 0.4, 1); // opposite side, dim — keeps the far side of every facet from going pure black
			scene.add(fillLight);

			// A soft overhead fill just for the exterior plaza — keyLight/
			// fillLight alone left the pebbled ground out there reading as
			// almost pure black (see exteriorFloorMaterial below). Ranged
			// short enough to fall off before it reaches past the doorway,
			// so the interior's own moodier lighting is untouched.
			const exteriorFillLight = new THREE.PointLight("#ffe9c7", 2.5, 30, 1.5);
			exteriorFillLight.position.set(0, 6, HALF_DEPTH + EXTERIOR_DEPTH / 2);
			scene.add(exteriorFillLight);

			// A shared toon shading ramp: just two hard-edged steps
			// (NearestFilter, no interpolation) — shadow tone or highlight
			// tone, nothing in between. Capped well under 255 so even the
			// highlight tone never blows out toward white.
			const toonRampCanvas = document.createElement("canvas");
			toonRampCanvas.width = 2;
			toonRampCanvas.height = 1;
			const toonRampCtx = toonRampCanvas.getContext("2d");
			[40, 150].forEach((v, i) => {
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

			// A lighter tint of a base color — used for the door fixtures'
			// hot core (see buildDoor below), a shade lighter than the
			// neon pink everything else outside uses.
			function lightenColor(input, amount) {
				return new THREE.Color(input).lerp(new THREE.Color(0xffffff), amount);
			}

			// Shared everywhere so every wall (interior shell, exterior
			// floor) reads as the same material family: one dark,
			// desaturated purple, plain (no texture — see the walls
			// themselves), lit only by keyLight/fillLight's shading.
			const CONCRETE_COLOR = "#191022";

			// A self-illuminated bright rectangle standing in for the
			// doorway opening, so the light source has a visible origin.
			const doorGlowMaterial = new THREE.MeshBasicMaterial({ color: "#fff4e0" });
			// A flat, unlit plane like this is exactly the geometry that
			// breaks OutlineEffect's inflated-backface trick at grazing
			// view angles (see doorOutlineMaterial below) — its outline
			// shell can balloon into a huge stray triangle instead of a
			// thin rim. This plane doesn't need an outline at all, so just suppress it.
			doorGlowMaterial.userData.outlineParameters = { visible: false };
			const doorGlow = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH * 0.5, ROOM_HEIGHT * 0.4),
				doorGlowMaterial
			);
			doorGlow.position.set(0, ROOM_HEIGHT * 0.24, -HALF_DEPTH + 0.05);
			scene.add(doorGlow);

			// The room shell: floor, ceiling, back wall, side walls. Since
			// the walk camera is clamped (WALK_MARGIN) rather than freely
			// orbiting, the shell can just match the room bounds exactly.

			// Stretched past the building's depth to also cover the exterior
			// plaza, so the ground outside isn't a void — recentered to
			// match. Also widened to OUTER_WALL_HALF_WIDTH like the facade,
			// so a shifted interior never exposes a floor edge.
			// Outline disabled on the floor/ceiling/wall materials below: a
			// large flat plane's inflated backface outline shell sits almost
			// exactly on top of the plane itself, and on mobile GPUs
			// (typically less precise depth buffers) that reads as jittery
			// z-fighting flicker rather than a clean edge. A flat wall has no
			// silhouette against empty space to outline anyway, so this is
			// both a fix and a simplification ("keep the wall simple").
			const floorMaterial = new THREE.MeshToonMaterial({
				color: 0x020106,
				gradientMap: toonGradientMap,
				flatShading: true
			});
			floorMaterial.userData.outlineParameters = { visible: false };
			const floor = new THREE.Mesh(
				new THREE.PlaneGeometry(OUTER_WALL_HALF_WIDTH * 2, ROOM_DEPTH),
				floorMaterial
			);
			floor.rotation.x = -Math.PI / 2; // lay the plane flat
			floor.receiveShadow = true;
			scene.add(floor);

			// The exterior plaza floor: a separate mesh/material from the
			// interior above (rather than one floor plane spanning both),
			// so it can be its own dark desaturated purple rather than
			// the interior's near-black tone — unlit, like the facade
			// (see facadeMaterial below), so the plaza stays "not very lit."
			// Darker than the interior floor, and lit (unlike the brick
			// facade) — keyLight/fillLight are dim enough out here that
			// it still reads as dark, but real enough that the pebbles
			// below can actually catch a bit of light/shadow rather than
			// being uniformly flat.
			const exteriorFloorMaterial = new THREE.MeshToonMaterial({
				color: "#110515",
				gradientMap: toonGradientMap
			});
			exteriorFloorMaterial.userData.outlineParameters = { visible: false };
			const exteriorFloor = new THREE.Mesh(
				new THREE.PlaneGeometry(OUTER_WALL_HALF_WIDTH * 2, EXTERIOR_DEPTH),
				exteriorFloorMaterial
			);
			exteriorFloor.rotation.x = -Math.PI / 2;
			exteriorFloor.position.z = HALF_DEPTH + EXTERIOR_DEPTH / 2;
			exteriorFloor.receiveShadow = true;
			scene.add(exteriorFloor);

			// Pebbles/rocks scattered across the plaza — real 3D shapes
			// (a low-detail icosahedron per instance, flat-shaded for
			// sharp rock-like facets, not a texture), so they actually
			// catch light and cast/receive shadows rather than just
			// being painted on.
			const PEBBLE_COUNT = 6000;
			const PEBBLE_MIN_RADIUS = 0.01;
			const PEBBLE_MAX_RADIUS = 0.04;
			const pebbleGeometry = new THREE.IcosahedronGeometry(1, 0);
			const pebbleMaterial = new THREE.MeshToonMaterial({
				color: "#040006",
				gradientMap: toonGradientMap,
				flatShading: true
			});
			pebbleMaterial.userData.outlineParameters = { visible: false };
			const pebbleInstances = new THREE.InstancedMesh(
				pebbleGeometry,
				pebbleMaterial,
				PEBBLE_COUNT
			);
			pebbleInstances.castShadow = false;
			pebbleInstances.receiveShadow = true;
			const pebblePlacementHelper = new THREE.Object3D();
			for (let i = 0; i < PEBBLE_COUNT; i++) {
				const radius =
					PEBBLE_MIN_RADIUS +
					Math.random() * (PEBBLE_MAX_RADIUS - PEBBLE_MIN_RADIUS);
				pebblePlacementHelper.position.set(
					-OUTER_WALL_HALF_WIDTH + Math.random() * OUTER_WALL_HALF_WIDTH * 2,
					radius * 0.4, // partly embedded in the floor, not resting on top of it
					HALF_DEPTH + Math.random() * EXTERIOR_DEPTH
				);
				pebblePlacementHelper.rotation.set(
					Math.random() * Math.PI,
					Math.random() * Math.PI,
					Math.random() * Math.PI
				);
				pebblePlacementHelper.scale.set(
					radius * (0.7 + Math.random() * 0.6),
					radius * (0.5 + Math.random() * 0.5), // flatter than wide, like a real pebble
					radius * (0.7 + Math.random() * 0.6)
				);
				pebblePlacementHelper.updateMatrix();
				pebbleInstances.setMatrixAt(i, pebblePlacementHelper.matrix);
			}
			pebbleInstances.instanceMatrix.needsUpdate = true;
			scene.add(pebbleInstances);

			const ceilingMaterial = new THREE.MeshToonMaterial({
				color: 0x000000,
				gradientMap: toonGradientMap,
				flatShading: true
			});
			ceilingMaterial.userData.outlineParameters = { visible: false };
			const ceiling = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH),
				ceilingMaterial
			);
			ceiling.rotation.x = Math.PI / 2;
			ceiling.position.y = ROOM_HEIGHT;
			scene.add(ceiling);

			// Floor grid: a thin line at every whole-year age (so the depth
			// axis actually reads as "age"), plus a noticeably thicker line
			// at each of the two boundaries between the No/Unsure/Yes
			// zones — replaces the old generic decorative GridHelper with
			// lines that mean something specific in this room.
			const AGE_LINE_COLOR = "#361433";
			const ZONE_LINE_COLOR = "#361433";
			const ZONE_LINE_THICKNESS = 0.07;

			const ageLinePositions = [];
			for (let age = Math.ceil(ageMin); age <= Math.floor(ageMax); age++) {
				const z = ageToZ(age);
				ageLinePositions.push(-HALF_WIDTH, 0, z, HALF_WIDTH, 0, z);
			}
			const ageLineGeometry = new THREE.BufferGeometry();
			ageLineGeometry.setAttribute(
				"position",
				new THREE.Float32BufferAttribute(ageLinePositions, 3)
			);
			const ageLines = new THREE.LineSegments(
				ageLineGeometry,
				new THREE.LineBasicMaterial({ color: AGE_LINE_COLOR })
			);
			ageLines.position.y = 0.01; // avoid z-fighting with the floor plane
			scene.add(ageLines);

			// A plain LineBasicMaterial's linewidth is ignored by most
			// browsers/GPUs (a long-standing WebGL limitation) — a thin
			// floor-level quad is the only reliable way to get a line that
			// actually reads as thicker than the age lines above.
			const zoneLineMaterial = new THREE.MeshBasicMaterial({
				color: ZONE_LINE_COLOR
			});
			zoneLineMaterial.userData.outlineParameters = { visible: false };
			for (const x of [-ZONE_WIDTH / 2, ZONE_WIDTH / 2]) {
				const zoneLine = new THREE.Mesh(
					new THREE.PlaneGeometry(ZONE_LINE_THICKNESS, ROOM_DEPTH),
					zoneLineMaterial
				);
				zoneLine.rotation.x = -Math.PI / 2;
				zoneLine.position.set(x, 0.012, 0);
				scene.add(zoneLine);
			}

			const backWallMaterial = new THREE.MeshToonMaterial({
				color: CONCRETE_COLOR,
				map: wallGradientMap,
				gradientMap: toonGradientMap,
				flatShading: true
			});
			backWallMaterial.userData.outlineParameters = { visible: false };
			// A real box, not a flat plane — extruded outward (away from
			// the room) by WALL_THICKNESS so its inner face lands exactly
			// where the old flat plane sat, without eating into the room
			// or any of the collision bounds.
			const backWall = new THREE.Mesh(
				new THREE.BoxGeometry(ROOM_WIDTH, ROOM_HEIGHT, WALL_THICKNESS),
				backWallMaterial
			);
			backWall.position.set(
				0,
				ROOM_HEIGHT / 2,
				-HALF_DEPTH - WALL_THICKNESS / 2
			);
			backWall.castShadow = true;
			backWall.receiveShadow = true;
			scene.add(backWall);

			// Renders text onto a canvas and wraps it in an unlit plane —
			// dependency-free, no font asset needed for real TextGeometry.
			// `neon` draws two shadow-blur passes for a glowing-tube look;
			// `text` may be a string or an array of lines stacked top to bottom.
			function makeTextPanel(
				text,
				{ width, height, fontSize, color = "#ff29d8", neon = true }
			) {
				const lines = Array.isArray(text) ? text : [text];
				const canvas = document.createElement("canvas");
				canvas.width = 724;
				canvas.height = Math.round(724 * (height / width));
				const ctx = canvas.getContext("2d");
				ctx.font = `400 ${fontSize}px "Menlo", mono`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const cx = canvas.width / 2;
				const maxWidth = canvas.width * 0.94;
				const lineHeight = canvas.height / (lines.length + 3);
				for (let i = 0; i < lines.length; i++) {
					const cy = lineHeight * (i + 1);
					const lineText = lines[i]; // Corrected string variable usage

					if (neon) {
						// 1. Crisp Neon Outline (Defines the glass edge sharply)
						ctx.save();
						ctx.strokeStyle = color;
						ctx.lineWidth = 4;
						ctx.shadowColor = color;
						ctx.shadowBlur = 10;
						ctx.strokeText(lineText, cx, cy, maxWidth);
						ctx.restore();

						// 2. Tight Color Glow (Minimal blur to prevent light wash out)
						ctx.save();
						ctx.fillStyle = color;
						ctx.shadowColor = color;
						ctx.shadowBlur = 4;
						ctx.fillText(lineText, cx, cy, maxWidth);
						ctx.restore();

						// 3. Sharp White Core (Pure white tube center, 0 blur for max legibility)
						ctx.save();
						ctx.fillStyle = "#ffffff";
						ctx.shadowColor = "transparent";
						ctx.shadowBlur = 0;
						ctx.fillText(lineText, cx, cy, maxWidth);
						ctx.restore();
					} else {
						ctx.fillStyle = color;
						ctx.fillText(lineText, cx, cy, maxWidth);
					}
				}
				const texture = new THREE.CanvasTexture(canvas);
				const material = new THREE.MeshBasicMaterial({
					map: texture,
					transparent: true
				});
				// Flat planes like this text panel are exactly the
				// geometry that breaks OutlineEffect's inflated-backface
				// trick at grazing view angles (see doorOutlineMaterial
				// below) — suppressed everywhere else that isn't a real 3D object, so do the same here.
				material.userData.outlineParameters = { visible: false };
				return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
			}

			// keyLight/fillLight are directional — a directional light has
			// no position, so there's no way to keep it away from the
			// facade by distance the way the point lights' own falloff
			// naturally limits them. FACADE_LIGHT_LAYER (see camera
			// above) turned out not to help with this either: three.js
			// layers only gate whether a light is active for a camera at
			// all, not which specific objects it illuminates — once a
			// light is active, it lights everything the camera draws,
			// regardless of either one's layer. So instead, this patches
			// the two facade materials' own compiled shader to drop the
			// directional-lights loop entirely, leaving the point-light
			// loop (fixtureLight/signLight) untouched — the only way to
			// actually make one material blind to specific lights.
			function excludeDirectionalLights(material) {
				material.onBeforeCompile = (shader) => {
					// onBeforeCompile runs before three resolves #include
					// directives, so the shader source here still says
					// literally "#include <lights_fragment_begin>" — the
					// #if ( NUM_DIR_LIGHTS > 0 ) line this needs to patch
					// doesn't exist as text yet. Pull that chunk's actual
					// source from THREE.ShaderChunk, patch the one line,
					// and substitute the whole patched chunk in place of
					// the include so three's own resolver has nothing
					// left to expand there.
					const patchedChunk = THREE.ShaderChunk.lights_fragment_begin.replace(
						"#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )",
						"#if ( 0 > 1 ) && defined( RE_Direct )"
					);
					shader.fragmentShader = shader.fragmentShader.replace(
						"#include <lights_fragment_begin>",
						patchedChunk
					);
				};
			}

			// The backing wall behind the bricks (see below) — plain dark
			// mortar tone, no texture; the bricks themselves are what
			// give this wall its shape now, not an image of bricks.
			const facadeMaterial = new THREE.MeshToonMaterial({
				color: 0x000000,
				gradientMap: toonGradientMap
			});
			facadeMaterial.userData.outlineParameters = { visible: false };
			excludeDirectionalLights(facadeMaterial);
			excludeDirectionalLights(facadeMaterial);

			// The lower tier's solid segments left over once each door
			// opening is cut out — ascending [xStart, xEnd] pairs. Spans
			// OUTER_WALL_HALF_WIDTH (much wider than the room itself) rather
			// than just HALF_WIDTH, so the facade still fully covers the
			// view no matter how far the interior has shifted behind it —
			// the doors themselves stay right where they are (DOORS' x values are untouched).
			function facadeSolidXRanges() {
				const halfDoor = DOOR_WIDTH / 2;
				const ranges = [];
				let x = -OUTER_WALL_HALF_WIDTH;
				for (const door of DOORS) {
					const gapStart = door.x - halfDoor;
					if (gapStart > x) ranges.push([x, gapStart]);
					x = door.x + halfDoor;
				}
				if (x < OUTER_WALL_HALF_WIDTH) ranges.push([x, OUTER_WALL_HALF_WIDTH]);
				return ranges;
			}
			// Boxed like the other walls now (see backWall/sideWall above)
			// — straddling DOOR_Z the same way each door's own panel
			// already does (BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT,
			// FACADE_THICKNESS) below), rather than extruding outward
			// only, so the facade and the doors set into it stay flush.
			for (const [xStart, xEnd] of facadeSolidXRanges()) {
				const width = xEnd - xStart;
				const lowerTier = new THREE.Mesh(
					new THREE.BoxGeometry(width, DOOR_HEIGHT, FACADE_THICKNESS),
					facadeMaterial
				);
				lowerTier.position.set((xStart + xEnd) / 2, DOOR_HEIGHT / 2, DOOR_Z);
				lowerTier.layers.set(FACADE_LIGHT_LAYER);
				lowerTier.receiveShadow = true;
				scene.add(lowerTier);
			}
			// The upper tier is one continuous solid lintel spanning the
			// full (wide) width, holding the sign above the doors.
			const upperTierHeight = ROOM_HEIGHT * 1.2 - DOOR_HEIGHT;
			const upperTier = new THREE.Mesh(
				new THREE.BoxGeometry(
					OUTER_WALL_HALF_WIDTH * 2,
					upperTierHeight,
					FACADE_THICKNESS
				),
				facadeMaterial
			);
			upperTier.position.set(0, DOOR_HEIGHT + upperTierHeight / 2, DOOR_Z);
			upperTier.layers.set(FACADE_LIGHT_LAYER);
			upperTier.receiveShadow = true;
			scene.add(upperTier);

			// Real 3D brick, not an image of brick — individual boxes,
			// offset every other row (a running bond, like real
			// brickwork), proud of the backing wall above — so the point
			// lights at each fixture/the sign actually cast shadows
			// between them instead of a bumpMap faking the relief.
			// Sized chunky/stylized (real brick would be a huge instance
			// count for no visual benefit at this camera distance),
			// matching the rest of the scene's low-poly character.
			const BRICK_WIDTH = 0.8;
			const BRICK_HEIGHT = 0.3;
			const BRICK_DEPTH = 0.1;
			const BRICK_GAP = 0.04; // mortar gap between adjacent bricks
			// Sits just proud of the backing wall's own plaza-facing face.
			const BRICK_PROTRUSION = FACADE_THICKNESS / 2 + BRICK_DEPTH / 2;
			// The brick's own outermost face, as a local offset from
			// DOOR_Z — for anything (the sign, the door lamps) that needs
			// to clear the bricks rather than sit flush with the old
			// flat wall.
			const BRICK_FRONT_LOCAL_Z = FACADE_THICKNESS / 2 + BRICK_DEPTH;

			// One brick per row/column across a rectangular region of the
			// facade — every row is filled edge to edge: a running-bond
			// offset row starts with a narrower (not full-width) brick to
			// fill that lead-in instead of leaving a gap, and whatever's
			// left at the far end (less than a full brick) is its own
			// narrower brick too, clipped exactly to xEnd, rather than
			// either leaving a gap or overhanging past it (into a door
			// opening, for the segments that flank one). Width is
			// per-brick (via the instance's own scale, see below), not
			// baked into the shared geometry.
			function brickPositionsFor(xStart, xEnd, yStart, yEnd) {
				const positions = [];
				const rows = Math.max(1, Math.round((yEnd - yStart) / BRICK_HEIGHT));
				const rowHeight = (yEnd - yStart) / rows;
				const MIN_BRICK_WIDTH = 0.12;
				for (let row = 0; row < rows; row++) {
					const y = yStart + rowHeight * (row + 0.5);
					const rowOffset = row % 2 === 0 ? 0 : BRICK_WIDTH / 2;
					let x = xStart;
					if (rowOffset > MIN_BRICK_WIDTH) {
						positions.push({ x: xStart + rowOffset / 2, y, width: rowOffset });
						x = xStart + rowOffset;
					}
					while (x < xEnd - MIN_BRICK_WIDTH) {
						const width = Math.min(BRICK_WIDTH, xEnd - x);
						positions.push({ x: x + width / 2, y, width });
						x += width;
					}
				}
				return positions;
			}

			const brickPositions = [];
			for (const [xStart, xEnd] of facadeSolidXRanges()) {
				brickPositions.push(...brickPositionsFor(xStart, xEnd, 0, DOOR_HEIGHT));
			}
			brickPositions.push(
				...brickPositionsFor(
					-OUTER_WALL_HALF_WIDTH,
					OUTER_WALL_HALF_WIDTH,
					DOOR_HEIGHT,
					DOOR_HEIGHT + upperTierHeight
				)
			);

			// Unit width (1 world unit); each instance is scaled on X to
			// its own brick's actual width (full-width bricks get scale 1).
			const brickGeometry = new THREE.BoxGeometry(
				1,
				BRICK_HEIGHT - BRICK_GAP,
				BRICK_DEPTH
			);
			// MeshToonMaterial, not MeshStandardMaterial — a hard 2-step
			// light/shadow ramp (see toonGradientMap above), same as
			// every other lit surface in the scene (the crowd, the
			// interior walls), instead of MeshStandardMaterial's smooth
			// PBR falloff — so a brick reads as either lit or in shadow,
			// no soft gradient between the two.
			const brickMaterial = new THREE.MeshToonMaterial({
				color: "#2d1625",
				gradientMap: toonGradientMap
			});
			brickMaterial.userData.outlineParameters = { visible: false };
			excludeDirectionalLights(brickMaterial);
			const brickInstances = new THREE.InstancedMesh(
				brickGeometry,
				brickMaterial,
				brickPositions.length
			);
			brickInstances.castShadow = true;
			brickInstances.receiveShadow = true;
			brickInstances.layers.set(FACADE_LIGHT_LAYER);
			const brickPlacementHelper = new THREE.Object3D();
			brickPositions.forEach(({ x, y, width }, i) => {
				brickPlacementHelper.position.set(
					x,
					// A little per-brick jitter, on top of the running-bond
					// pattern itself, so the coursing reads as real,
					// slightly imperfect masonry rather than a perfect grid.
					y + (Math.random() - 0.5) * 0.03,
					DOOR_Z + BRICK_PROTRUSION + (Math.random() * 0.3 - 0.5) * 0.04
				);
				brickPlacementHelper.scale.set(width - BRICK_GAP, 1, 1);
				brickPlacementHelper.updateMatrix();
				brickInstances.setMatrixAt(i, brickPlacementHelper.matrix);
			});
			brickInstances.instanceMatrix.needsUpdate = true;
			scene.add(brickInstances);

			// The building's name — a neon sign on the lintel facing the
			// plaza, glowing pink, sized to sit above the clustered doors.
			const buildingSign = makeTextPanel(BUILDING_LABEL, {
				width: 14,
				height: 4,
				fontSize: 24,
				color: "#ff36a8",
				neon: true
			});
			// Must clear the brick's own outermost face (BRICK_PROTRUSION
			// is bricks' center, so + half their depth again gets to
			// their front) or the real 3D brick relief would now hide it
			// from outside — unlike the old flat lintel, these bricks
			// actually stick out further than a bare +0.01 accounted for.
			buildingSign.position.set(
				0,
				DOOR_HEIGHT + 0.3,
				DOOR_Z + BRICK_FRONT_LOCAL_Z + 0.1
			);
			scene.add(buildingSign);

			// The sign's own pool of light on the brick around it — see
			// FACADE_LIGHT_LAYER above for why this only affects the
			// facade and nothing else in the scene.
			const signLight = new THREE.PointLight("#ff36a8", 1, 7, 2);
			// Out past the bricks' own front face, next to the sign
			// itself — not embedded in/behind the brick relief.
			signLight.position.set(
				0,
				DOOR_HEIGHT + 0.3,
				DOOR_Z + BRICK_FRONT_LOCAL_Z + 0.25
			);
			signLight.layers.set(FACADE_LIGHT_LAYER);
			signLight.castShadow = true;
			signLight.shadow.mapSize.set(512, 512);
			signLight.shadow.bias = -0.002;
			scene.add(signLight);

			// Each door is a real panel, hinged on its left edge, closed
			// until the walker approaches (see updateDoors). The label lives on the panel so it swings with it.
			function buildDoor(door) {
				const hinge = new THREE.Group();
				hinge.position.set(door.x - DOOR_WIDTH / 2, 0, DOOR_Z);
				scene.add(hinge);

				const doorColorHex = DOOR_ZONE_COLORS[door.label] ?? NEON_PINK;
				const doorColorLightHex = DOOR_ZONE_COLORS_LIGHT[door.label] ?? NEON_PINK;
				const baseColor = new THREE.Color(doorColorHex);

				// 1. Darkened tint of the door's zone color for the main
				// surface (Provides contrast for neon light while
				// maintaining color identity) — doorGradientMap adds the
				// same top-lighter/bottom-darker depth cue as the walls (see
				// wallGradientMap above), just not on the neon frame below,
				// which stays a flat, uniformly saturated "glowing tube."
				const panelMaterial = new THREE.MeshBasicMaterial({
					color: baseColor.clone().multiplyScalar(0.12),
					map: doorGradientMap
				});
				panelMaterial.userData.outlineParameters = { visible: false };
				const panel = new THREE.Mesh(
					new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, FACADE_THICKNESS),
					panelMaterial
				);
				panel.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT / 2, 0);
				// receiveShadow only, no castShadow: the frame below sits
				// only 0.005-0.01 units in front of/around this panel —
				// nearly coincident surfaces at a scale far finer than the
				// shadow map's texel size (a 2048px map over the
				// ~100-unit-wide area keyLight's frustum covers), so having
				// both cast onto each other read as flickery shadow-acne
				// noise across the whole door rather than a real shadow.
				panel.receiveShadow = true;
				hinge.add(panel);

				// 2. Bright neon outline frame matching the door's zone color
				const frameGeo = new THREE.BoxGeometry(
					DOOR_WIDTH + 0.04,
					DOOR_HEIGHT + 0.04,
					FACADE_THICKNESS + 0.01
				);
				const frameMaterial = new THREE.MeshBasicMaterial({
					color: baseColor
				});
				frameMaterial.userData.outlineParameters = { visible: false };
				const frame = new THREE.Mesh(frameGeo, frameMaterial);
				frame.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT / 2, -0.005);
				// No castShadow/receiveShadow — meant to read as a uniformly
				// lit glowing neon tube (see the comment above panelMaterial),
				// which any shadow falling across it would break.
				hinge.add(frame);

				// 3. Crisp Neon Text
				const label = makeTextPanel(door.label, {
					width: DOOR_WIDTH * 1.15,
					height: DOOR_HEIGHT * 0.4,
					fontSize: 100,
					color: doorColorLightHex,
					neon: true
				});
				label.position.set(
					DOOR_WIDTH / 2,
					DOOR_HEIGHT * 0.62,
					FACADE_THICKNESS / 2 + 0.02
				);
				hinge.add(label);

				// Lamp fixture mounted above door
				const fixtureColor = lightenColor(doorColorLightHex, 0.4);
				const fixtureZ = BRICK_FRONT_LOCAL_Z + 0.25;
				const fixtureMaterial = new THREE.MeshBasicMaterial({
					color: fixtureColor
				});
				fixtureMaterial.userData.outlineParameters = { visible: false };

				const bracketMaterial = new THREE.MeshBasicMaterial({
					color: 0x1a1a1a
				});
				bracketMaterial.userData.outlineParameters = { visible: false };

				const bracketLength = fixtureZ - FACADE_THICKNESS / 2;
				const bracket = new THREE.Mesh(
					new THREE.CylinderGeometry(0.025, 0.025, bracketLength, 6),
					bracketMaterial
				);
				bracket.rotation.x = Math.PI / 2;
				bracket.position.set(
					DOOR_WIDTH / 2,
					DOOR_HEIGHT + 0.25,
					FACADE_THICKNESS / 2 + bracketLength / 2
				);
				hinge.add(bracket);

				const fixture = new THREE.Mesh(
					new THREE.SphereGeometry(0.15, 12, 8),
					fixtureMaterial
				);
				fixture.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT + 0.25, fixtureZ);
				hinge.add(fixture);

				// Point light on facade
				const fixtureLight = new THREE.PointLight(fixtureColor, 4, 3, 4);
				fixtureLight.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT + 0.25, fixtureZ);
				fixtureLight.layers.set(FACADE_LIGHT_LAYER);
				fixtureLight.castShadow = true;
				fixtureLight.shadow.mapSize.set(512, 512);
				fixtureLight.shadow.bias = -0.002;
				hinge.add(fixtureLight);

				// Floor threshold
				const thresholdMaterial = new THREE.MeshBasicMaterial({
					color: "#1f021a"
				});
				thresholdMaterial.userData.outlineParameters = { visible: false };
				const threshold = new THREE.Mesh(
					new THREE.PlaneGeometry(DOOR_WIDTH * 0.8, 0.3),
					thresholdMaterial
				);
				threshold.rotation.x = -Math.PI / 2;
				threshold.position.set(door.x, 0.02, DOOR_Z);
				scene.add(threshold);

				door.hinge = hinge;
				hinge.userData.door = door;
			}
			DOORS.forEach(buildDoor);

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
			function isOuterDoorPassable(x) {
				const door = DOORS.find((d) => Math.abs(x - d.x) < DOOR_WIDTH / 2);
				return door ? door.openAmount > DOOR_PASSABLE_OPEN_AMOUNT : false;
			}
			function resolveOuterDoorCollision(x, z) {
				if (
					Math.abs(z - DOOR_Z) < FACADE_CLEARANCE &&
					!isOuterDoorPassable(x)
				) {
					z = DOOR_Z + Math.sign(z - DOOR_Z || 1) * FACADE_CLEARANCE;
				}
				return z;
			}

			// The inner wall: at z = HALF_DEPTH, plain openings (no doors,
			// the outer ones already gate entry) sized to CORRIDOR_WIDTH.
			// Derived straight from each door's own x (not an independent
			// copy of it) so this wall's openings always line up with
			// wherever the doors actually are, even after moving them.
			const ZONE_XS = DOORS.map((door) => door.x);
			function innerWallSolidXRanges() {
				const halfGap = CORRIDOR_WIDTH / 2;
				const ranges = [];
				let x = -HALF_WIDTH;
				for (const zoneX of ZONE_XS) {
					const gapStart = zoneX - halfGap;
					if (gapStart > x) ranges.push([x, gapStart]);
					x = zoneX + halfGap;
				}
				if (x < HALF_WIDTH) ranges.push([x, HALF_WIDTH]);
				return ranges;
			}
			// Concrete, not brick — this one isn't the outside/door wall,
			// just another interior partition, so it matches the
			// back/side walls' material instead of the facade's.
			const innerWallMaterial = new THREE.MeshToonMaterial({
				color: CONCRETE_COLOR,
				map: wallGradientMap,
				gradientMap: toonGradientMap,
				flatShading: true
			});
			innerWallMaterial.userData.outlineParameters = { visible: false };
			// Collected for handlePersonClick's line-of-sight check below —
			// a person raycast hit shouldn't count if a wall was actually
			// closer to the camera along that same ray.
			const innerWallMeshes = [];
			for (const [xStart, xEnd] of innerWallSolidXRanges()) {
				// Boxed like the facade's own panels — straddles
				// HALF_DEPTH the same way, consistent with FACADE_CLEARANCE
				// (already sized around a FACADE_THICKNESS-deep wall here).
				const innerWall = new THREE.Mesh(
					new THREE.BoxGeometry(
						xEnd - xStart,
						ROOM_HEIGHT * 1.2,
						FACADE_THICKNESS
					),
					innerWallMaterial
				);
				innerWall.position.set(
					(xStart + xEnd) / 2,
					(ROOM_HEIGHT * 1.2) / 2,
					HALF_DEPTH
				);
				innerWall.castShadow = true;
				innerWall.receiveShadow = true;
				innerRoomGroup.add(innerWall);
				innerWallMeshes.push(innerWall);
			}
			// Always open — the outer doors are the only real gate. The
			// crowd never needs this either (same as resolveOuterDoorCollision).
			function resolveInnerWallCollision(x, z) {
				const isInOpening = ZONE_XS.some(
					(zoneX) => Math.abs(x - zoneX) < CORRIDOR_WIDTH / 2
				);
				if (Math.abs(z - HALF_DEPTH) < FACADE_CLEARANCE && !isInOpening) {
					z = HALF_DEPTH + Math.sign(z - HALF_DEPTH || 1) * FACADE_CLEARANCE;
				}
				return z;
			}

			// A real box (not a flat plane) for the same "these walls
			// have volume" reason as the back wall — a box's own
			// width/height/depth axes already point the right way once
			// placed, so unlike the old plane this needs no Y rotation.
			// Split at HALF_DEPTH (interior vs. exterior plaza), same
			// idea as the floor above — the interior segment keeps the
			// lit concrete look, the exterior segment (see below) is its
			// own separate, pure-black, unlit material instead.
			const sideWallGeometry = new THREE.BoxGeometry(
				WALL_THICKNESS,
				ROOM_HEIGHT,
				ROOM_DEPTH
			);
			const sideWallMaterial = new THREE.MeshToonMaterial({
				color: CONCRETE_COLOR,
				map: wallGradientMap,
				gradientMap: toonGradientMap,
				flatShading: true
			});
			sideWallMaterial.userData.outlineParameters = { visible: false };

			// Extruded outward from HALF_WIDTH (away from the room) by
			// WALL_THICKNESS, so the inner face lands exactly where the
			// old flat plane sat.
			const leftWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
			leftWall.position.set(
				-HALF_WIDTH - WALL_THICKNESS / 2,
				ROOM_HEIGHT / 2,
				0
			);
			leftWall.castShadow = true;
			leftWall.receiveShadow = true;
			scene.add(leftWall);

			const rightWall = leftWall.clone();
			rightWall.position.x = HALF_WIDTH + WALL_THICKNESS / 2;
			scene.add(rightWall);

			// The exterior plaza's own side walls — pure black and
			// unlit, so the plaza reads as dark on every side, not just
			// the brick facade you're facing.
			const exteriorSideWallGeometry = new THREE.BoxGeometry(
				WALL_THICKNESS,
				ROOM_HEIGHT,
				EXTERIOR_DEPTH
			);
			const exteriorSideWallMaterial = new THREE.MeshBasicMaterial({
				color: 0x000000
			});
			exteriorSideWallMaterial.userData.outlineParameters = { visible: false };
			const leftExteriorWall = new THREE.Mesh(
				exteriorSideWallGeometry,
				exteriorSideWallMaterial
			);
			leftExteriorWall.position.set(
				-HALF_WIDTH - WALL_THICKNESS / 2,
				ROOM_HEIGHT / 2,
				HALF_DEPTH + EXTERIOR_DEPTH / 2
			);
			scene.add(leftExteriorWall);

			const rightExteriorWall = leftExteriorWall.clone();
			rightExteriorWall.position.x = HALF_WIDTH + WALL_THICKNESS / 2;
			scene.add(rightExteriorWall);

			// Each person is its own clone of a body GLB matching their own
			// GENDER (see pickModelForPerson above), with an independent
			// skeleton and material (so applyColorVariable can tint each
			// separately). A shared InstancedMesh handles the blob shadow under everyone.

			// Parallel arrays, indexed like `respondents`.
			const personRoots = new Array(respondents.length);
			const personBodyMaterials = new Array(respondents.length);
			const personMixers = new Array(respondents.length);
			const personWalkActions = new Array(respondents.length);
			const personRestActions = new Array(respondents.length);

			// This person's own true color at full resolution (set by
			// applyColorVariable) — the per-frame LOD pass in
			// updatePeoplePositions reads this every frame and writes a
			// distance-darkened version into the material's actual .color,
			// so the stable reference never itself gets darkened (which
			// would otherwise compound every frame).
			const personBaseColors = new Array(respondents.length);
			const personSkinMaterials = new Array(respondents.length);

			respondents.forEach((person, i) => {
				const model = pickModelForPerson(person);
				const instance = cloneSkinned(model.scene);
				// These GLBs separate skin/shirt/pants/shoes/hair into real
				// sub-meshes (by material name) — skin and hair stay a
				// neutral black, matching the original silhouette look;
				// shirt/pants/shoes all get the same per-person outfit
				// material (not shared across people) so applyColorVariable
				// can tint the whole outfit as one unit. The black outline
				// around each part is drawn by OutlineEffect (see effect.render).
				const neutralMaterial = new THREE.MeshToonMaterial({
					color: 0x000000,
					gradientMap: toonGradientMap,
					flatShading: true,
					vertexColors: true
				});
				const outfitMaterial = new THREE.MeshToonMaterial({
					gradientMap: toonGradientMap,
					flatShading: true,
					vertexColors: true
				});
				// Created once per person and mutated in place every frame
				// (see updatePeoplePositions) rather than replaced — with
				// ~2,500 people, allocating a fresh object here every frame
				// for both materials was 5,000 extra small allocations/frame for no reason.
				neutralMaterial.userData.outlineParameters = {
					thickness: OUTLINE_DEFAULT_THICKNESS
				};
				outfitMaterial.userData.outlineParameters = {
					thickness: OUTLINE_DEFAULT_THICKNESS
				};
				instance.traverse((node) => {
					if (node.isMesh) {
						const originalName = node.material.name;
						node.material =
							originalName === "Body_skin" || originalName === "Hair"
								? neutralMaterial
								: outfitMaterial;
					}
				});
				personBodyMaterials[i] = outfitMaterial;
				personSkinMaterials[i] = neutralMaterial;
				personBaseColors[i] = new THREE.Color();
				innerRoomGroup.add(instance);
				personRoots[i] = instance;
				// Read back by handlePersonClick's raycast hit, which walks
				// up from whatever sub-mesh it actually hit to find this.
				instance.userData.personIndex = i;

				if (model.walkClip) {
					const mixer = new THREE.AnimationMixer(instance);

					const walkAction = mixer.clipAction(model.walkClip);
					walkAction.play();

					// A real looping Idle clip, cross-faded in by weight as
					// this person slows to a stop, so they settle toward a
					// natural standing animation instead of freezing
					// mid-stride. Only a minority get ArmsCrossed instead (see person.__armsCrossed).
					const restAction = mixer.clipAction(
						person.__armsCrossed ? model.armsCrossedClip : model.idleClip
					);
					restAction.play();

					// Stagger each person's starting pose so the crowd
					// doesn't all step (or idle) in lockstep.
					mixer.update(person.__animOffsetFraction * model.walkClip.duration);

					personMixers[i] = mixer;
					personWalkActions[i] = walkAction;
					personRestActions[i] = restAction;
				}
			});

			// A flat, opaque disc for the blob shadow — a plain low-segment
			// circle, solid-filled, no gradient and no alpha blending (a
			// transparent disc would visibly darken wherever two people's
			// shadows overlap, which reads as a soft gradient even though
			// each individual disc is a flat color). Opaque is both simpler and cheaper.
			const shadowGeometry = new THREE.CircleGeometry(SHADOW_RADIUS, 8);
			// Unlit flat tone, so it reads the same regardless of doorway light.
			const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
			// OutlineEffect would otherwise draw its usual inflated black
			// backface ring around this disc's edge too — on a flat ground
			// shadow that just reads as a soft rim/gradient around an
			// otherwise flat fill, which is exactly what we don't want here.
			shadowMaterial.userData.outlineParameters = { visible: false };
			const shadows = new THREE.InstancedMesh(
				shadowGeometry,
				shadowMaterial,
				respondents.length
			);
			innerRoomGroup.add(shadows);

			// Reused scratch object for the shadow's position -> matrix math, avoiding a per-frame allocation.
			const placementHelper = new THREE.Object3D();
			// Lies a shadow disc flat on the floor (circles face +Z by default).
			const FLAT_ROTATION = new THREE.Quaternion().setFromEuler(
				new THREE.Euler(-Math.PI / 2, 0, 0)
			);

			// Far crowd LOD: a person's own body/shape never changes with
			// distance (a different mesh swapping in reads as their identity
			// changing, not just "less detail") — only its color (darker
			// with distance, see LOD_COLOR_BANDS) and its OutlineEffect
			// outline thickness (thinner with distance) step through a few
			// bands, and its animation freezes in whatever pose it's in once far enough away.
			function pickLodBand(distToWalker) {
				for (const band of LOD_COLOR_BANDS) {
					if (distToWalker <= band.maxDistance) return band;
				}
				return LOD_COLOR_BANDS[LOD_COLOR_BANDS.length - 1];
			}

			// Rebuilt every frame in updatePeoplePositions: "cx,cz" -> array
			// of respondent indices in that cell. Reused via .clear() to avoid allocating a new Map per frame.
			const personGrid = new Map();

			// Every person's on-screen position is their base spot plus (1)
			// an idle-then-shuffle "wander" within a small assigned area
			// (see updateWander) and (2) a temporary collision-nudge that
			// decays once the walker moves on. Both stay small relative to MIN_SPACING.

			// Smoothstep: eases a 0..1 progress value in and out, so a shuffle accelerates gently rather than snapping.
			function smoothstep(t) {
				return t * t * (3 - 2 * t);
			}

			// The shortest signed angular distance from `a` to `b` (radians,
			// in (-π, π]) — always the short way around, even across the -π/π wraparound.
			function shortestAngleDelta(a, b) {
				let delta = (b - a) % (Math.PI * 2);
				if (delta > Math.PI) delta -= Math.PI * 2;
				if (delta < -Math.PI) delta += Math.PI * 2;
				return delta;
			}

			// Advances one person's idle/shuffle state machine and returns
			// their current (wanderX, wanderZ) offset. Facing is handled centrally in updatePeoplePositions.
			function updateWander(person, elapsedSeconds) {
				if (person.__moving) {
					const t =
						(elapsedSeconds - person.__moveStart) / person.__moveDuration;
					if (t >= 1) {
						person.__wanderX = person.__moveToX;
						person.__wanderZ = person.__moveToZ;
						person.__moving = false;
						person.__moveT = 0;
						// Stand still for a while before the next shuffle, randomized so people don't step in sync.
						person.__nextMoveTime = elapsedSeconds + Math.random() * 20;
					} else {
						const eased = smoothstep(Math.max(0, t));
						person.__wanderX =
							person.__moveFromX +
							(person.__moveToX - person.__moveFromX) * eased;
						person.__wanderZ =
							person.__moveFromZ +
							(person.__moveToZ - person.__moveFromZ) * eased;
						person.__moveT = Math.max(0, Math.min(1, t));
					}
				} else if (elapsedSeconds >= person.__nextMoveTime) {
					// Time to shuffle: pick a new resting spot within this
					// person's own small assigned area (a disk of radius
					// wanderRadius around their base position) and glide
					// there over a brief, randomized duration.
					const angle = Math.random() * Math.PI * 2;
					const radius = Math.random() * person.__wanderRadius;
					person.__moveFromX = person.__wanderX;
					person.__moveFromZ = person.__wanderZ;
					person.__moveToX = Math.cos(angle) * radius;
					person.__moveToZ = Math.sin(angle) * radius;
					person.__moveStart = elapsedSeconds;
					person.__moveDuration = 0.7 + Math.random() * 0.8;
					person.__moving = true;
				}
				return [person.__wanderX, person.__wanderZ];
			}

			function updatePeoplePositions(dt, elapsedSeconds) {
				const decay = Math.exp(-dt / OFFSET_RETURN_TIME);
				const facingFactor = 1 - Math.exp(-dt / FACING_TURN_TIME);
				const walkAmountFactor = 1 - Math.exp(-dt / WALK_AMOUNT_SMOOTH_TIME);
				const walkSpeedFactor = 1 - Math.exp(-dt / WALK_SPEED_SMOOTH_TIME);

				// Pass 1: advance decay + wander for everyone, and bucket
				// each pre-repulsion position into a spatial grid so pass 2
				// only checks nearby cells instead of scanning everyone.
				personGrid.clear();
				for (let i = 0; i < respondents.length; i++) {
					const person = respondents[i];
					// Where this person's "resting" spot is right now, along
					// their Y1 -> Y2 route (see buildBlendPath) — this is
					// what makes the crowd walk across the room when toggled.
					const { x: blendedX, z: blendedZ } = evaluateBlendPath(
						person.__blendPath,
						currentPositionBlend
					);
					// This frame's pre-update resting spot (blend + wander,
					// not the collision nudge below), so we can tell how far/which way they actually moved.
					const prevRestX = person.__x + person.__wanderX;
					const prevRestZ = person.__z + person.__wanderZ;
					person.__x = blendedX;
					person.__z = blendedZ;
					person.__offsetX *= decay;
					person.__offsetZ *= decay;
					updateWander(person, elapsedSeconds); // updates person.__wanderX/__wanderZ

					// Face wherever the combined movement is actually taking
					// them, turning smoothly and only while moving (so
					// standing still keeps facing the last walked direction).
					const moveDx = person.__x + person.__wanderX - prevRestX;
					const moveDz = person.__z + person.__wanderZ - prevRestZ;
					const isMoving =
						moveDx * moveDx + moveDz * moveDz > MOVE_FACING_EPSILON_SQ;
					if (isMoving) {
						const desiredYaw = Math.atan2(moveDz, moveDx);
						person.__facingYaw +=
							shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
					}
					// Voluntary movement only (not the collision-push offset,
					// applied separately below) — read in Pass 2 to catch the
					// brief window where facing hasn't caught up yet with a
					// sudden change in wander direction, so a wander move
					// picked "behind" someone doesn't play the walk clip
					// forward while their facing still points the old way.
					person.__voluntaryMoveDx = moveDx;
					person.__voluntaryMoveDz = moveDz;
					person.__walkAmount +=
						((isMoving ? 1 : 0) - person.__walkAmount) * walkAmountFactor;
					// How fast they're actually covering ground, smoothed the
					// same way as elsewhere — keeps the walk clip's rate in sync with real ground speed.
					const currentSpeed = dt > 0 ? Math.hypot(moveDx, moveDz) / dt : 0;
					person.__walkSpeed +=
						(currentSpeed - person.__walkSpeed) * walkSpeedFactor;

					const x = person.__x + person.__wanderX + person.__offsetX;
					const z = person.__z + person.__wanderZ + person.__offsetZ;
					const key = `${Math.floor(x / PERSON_CELL_SIZE)},${Math.floor(z / PERSON_CELL_SIZE)}`;
					let bucket = personGrid.get(key);
					if (!bucket) personGrid.set(key, (bucket = []));
					bucket.push(i);
				}

				// Pass 2: walker-collision, then person-vs-person repulsion
				// against grid neighbors, then write the final transforms.
				for (let i = 0; i < respondents.length; i++) {
					const person = respondents[i];
					const wanderX = person.__wanderX;
					const wanderZ = person.__wanderZ;

					const currentX = person.__x + wanderX + person.__offsetX;
					const currentZ = person.__z + wanderZ + person.__offsetZ;
					const dx = currentX - renderWalkX;
					const dz = currentZ - renderWalkZ;
					const dist = Math.hypot(dx, dz);

					if (dist > 0 && dist < COLLISION_RADIUS) {
						const push =
							((COLLISION_RADIUS - dist) / COLLISION_RADIUS) *
							PUSH_STRENGTH *
							dt;
						person.__offsetX += (dx / dist) * push;
						person.__offsetZ += (dz / dist) * push;
					}

					const cx = Math.floor(currentX / PERSON_CELL_SIZE);
					const cz = Math.floor(currentZ / PERSON_CELL_SIZE);
					for (let gx = -1; gx <= 1; gx++) {
						for (let gz = -1; gz <= 1; gz++) {
							const bucket = personGrid.get(`${cx + gx},${cz + gz}`);
							if (!bucket) continue;
							for (const j of bucket) {
								if (j === i) continue;
								const other = respondents[j];
								const ox = other.__x + other.__wanderX + other.__offsetX;
								const oz = other.__z + other.__wanderZ + other.__offsetZ;
								const pdx = currentX - ox;
								const pdz = currentZ - oz;
								const pdist = Math.hypot(pdx, pdz);
								if (pdist > 0 && pdist < PERSON_COLLISION_RADIUS) {
									const push =
										((PERSON_COLLISION_RADIUS - pdist) /
											PERSON_COLLISION_RADIUS) *
										PERSON_PUSH_STRENGTH *
										dt;
									person.__offsetX += (pdx / pdist) * push;
									person.__offsetZ += (pdz / pdist) * push;
								}
							}
						}
					}

					const offsetLength = Math.hypot(person.__offsetX, person.__offsetZ);
					if (offsetLength > MAX_OFFSET) {
						const scale = MAX_OFFSET / offsetLength;
						person.__offsetX *= scale;
						person.__offsetZ *= scale;
					}

					const finalZ = person.__z + wanderZ + person.__offsetZ;
					const finalX = person.__x + wanderX + person.__offsetX;

					// Within FACE_CAMERA_RADIUS, override the movement-based
					// facing and turn to look at the walker instead.
					const toWalkerX = renderWalkX - finalX;
					const toWalkerZ = renderWalkZ - finalZ;
					const distToWalkerSq = toWalkerX * toWalkerX + toWalkerZ * toWalkerZ;

					if (
						distToWalkerSq < FACE_CAMERA_RADIUS * FACE_CAMERA_RADIUS &&
						distToWalkerSq > MOVE_FACING_EPSILON_SQ
					) {
						// Negate the Z and X values to flip the desired rotation 180 degrees
						const desiredYaw = Math.atan2(-toWalkerZ, -toWalkerX);

						person.__facingYaw +=
							shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
					}
					const yaw = person.__facingYaw;
					const heightScale = person.__heightScale;
					const widthScale = person.__widthScale;
					// Only voluntary movement (Pass 1's __voluntaryMoveDx/Dz)
					// ever gets the step-back hold treatment below — being
					// shoved by the walker or another person just slides
					// someone aside with no special animation handling at
					// all (cheaper, and it isn't their own motion to react
					// to). This mainly catches a wander move picked "behind"
					// someone: for the brief window before facingYaw
					// (smoothed) catches up, their voluntary movement points
					// opposite their current facing.
					const isVoluntaryBackward =
						person.__voluntaryMoveDx * person.__voluntaryMoveDx +
							person.__voluntaryMoveDz * person.__voluntaryMoveDz >
							MOVE_FACING_EPSILON_SQ &&
						person.__voluntaryMoveDx * Math.cos(yaw) +
							person.__voluntaryMoveDz * Math.sin(yaw) <
							0;

					// LOD: this person's own body/shape is always what's
					// rendered (root stays visible) — only its color,
					// outline thickness, and whether its walk-cycle keeps
					// animating depend on distance (see LOD_COLOR_BANDS/pickLodBand above).
					const distToWalker = Math.sqrt(distToWalkerSq);
					const band = pickLodBand(distToWalker);
					const isFrozen = distToWalker > LOD_FREEZE_DISTANCE;

					const bodyMaterial = personBodyMaterials[i];
					const skinMaterial = personSkinMaterials[i];
					const brightness =
						i === clickedPersonIndex
							? SELECTED_PERSON_BRIGHTNESS
							: band.brightness;
					bodyMaterial.color
						.copy(personBaseColors[i])
						.multiplyScalar(brightness);
					bodyMaterial.userData.outlineParameters.thickness =
						band.outlineThickness;
					skinMaterial.userData.outlineParameters.thickness =
						band.outlineThickness;

					// Position/orient/scale this person's whole clone at once.
					// A subtle "breathing" wobble (Y scale) fades in as they stop, and out as they start walking.
					const root = personRoots[i];
					// Beyond RENDER_CULL_DISTANCE they're fully faded into
					// the fog anyway (see walkFog above) — skipping the draw
					// call entirely for everyone out there is the actual perf win, not just the visual fade.
					root.visible = distToWalker <= RENDER_CULL_DISTANCE;
					const baseHeightScale = heightScale * WALKER_SCALE_CORRECTION;
					const baseWidthScale = widthScale * WALKER_SCALE_CORRECTION;
					const breathAmount = 1 - person.__walkAmount;
					const breath =
						Math.sin(elapsedSeconds * BREATHING_SPEED + person.__breathPhase) *
						BREATHING_AMPLITUDE *
						breathAmount;
					root.position.set(finalX, 0, finalZ);
					root.rotation.y = yaw;
					root.scale.set(
						baseWidthScale,
						baseHeightScale * (1 + breath),
						baseWidthScale
					);

					// Advance this person's walk clip, cross-faded against the
					// (also looping) Idle/ArmsCrossed rest action by how much
					// they're moving. Playback rate separately tracks their
					// ground speed (WALK_ANIM_SPEED) instead of a flat 1x.
					// Skipped once far enough away (isFrozen) — no point
					// paying for skeletal animation on a body that's just a few pixels on screen.
					const mixer = personMixers[i];
					if (mixer && !isFrozen) {
						const walkAction = personWalkActions[i];
						const restAction = personRestActions[i];
						if (isVoluntaryBackward) {
							// Their own next wander step is behind where
							// they're still facing: instead of the Walk clip
							// looping forward while they visibly move
							// backward (a moonwalk), hold at a fixed "one
							// foot stepped back" point in the clip until facing catches up.
							walkAction.paused = true;
							walkAction.time =
								walkAction.getClip().duration * STEP_BACK_HOLD_FRACTION;
							walkAction.weight = 1;
							restAction.weight = 0;
						} else {
							walkAction.paused = false;
							const speedScale = Math.min(
								MAX_WALK_TIMESCALE,
								Math.max(
									MIN_WALK_TIMESCALE,
									person.__walkSpeed / WALK_ANIM_SPEED
								)
							);
							walkAction.timeScale = person.__walkAmount * speedScale;
							walkAction.weight = person.__walkAmount;
							restAction.weight = 1 - person.__walkAmount;
						}
						mixer.update(dt);
					}

					// The blob shadow: a flat disc on the floor under the
					// person, sized with their width (footprint), not
					// height. Dropped once frozen/far — scaled to nothing
					// rather than left out of the instance count.
					placementHelper.quaternion.copy(FLAT_ROTATION);
					placementHelper.position.set(finalX, 0.015, finalZ);
					placementHelper.scale.setScalar(isFrozen ? 0 : widthScale);
					placementHelper.updateMatrix();
					shadows.setMatrixAt(i, placementHelper.matrix);

					// This person's flat position for the 2D minimap (see Minimap.lifedeath.svelte's draw()).
					minimapX[i] = finalX;
					minimapZ[i] = finalZ;
				}

				shadows.instanceMatrix.needsUpdate = true;
			}

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

			// Where the walker is trying to go (updated instantly by input).
			let targetWalkX = 0;
			let targetWalkZ = debugMode ? DEBUG_START_Z : DEFAULT_START_Z;
			// Where the camera (and collision checks) actually are — glides
			// toward the target above every frame.
			let renderWalkX = targetWalkX;
			let renderWalkZ = targetWalkZ;

			let hasEnteredRoom = false;

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

			// Non-null while the mouse button (or a touch) is down, holding
			// the last move event's position so each handler only looks at the delta since last time.
			let lastMouseDragX = null;
			let lastMouseDragY = null;
			let lastTouchY = null;
			let lastTouchX = null;
			// Where the mouse went down, held until the next mousedown (see
			// handleMouseDown) so a click's total drag distance can still be
			// measured after mouseup has already cleared lastMouseDragX/Y.
			let mouseDownX = null;
			let mouseDownY = null;
			// True once the current press/touch has moved past
			// DOOR_CLICK_DRAG_THRESHOLD_PX at any point — unlike comparing
			// the click event's own final position against mouseDownX/Y,
			// this also catches a drag that happens to end back near where
			// it started (steering left then right, say), which a
			// same-position distance check alone would wrongly let through
			// as a "click". Reset on the next mousedown/touchstart, not on
			// mouseup/touchend, since the synthetic "click"/tap event this
			// gates fires after those.
			let hasDragged = false;
			// Where the camera is steering/tilting toward — updated instantly by input.
			let targetCameraYaw = 0;
			let targetCameraPitch = 0;
			// The camera's actual current heading/tilt, gliding toward the
			// target above rather than snapping — same idea as renderWalkX/Z.
			let cameraYaw = 0;
			let cameraPitch = 0;

			// Keeps an angle in (-π, π] so it doesn't grow without bound as
			// someone spins around and around while steering.
			function wrapAngle(angle) {
				return (
					((((angle + Math.PI) % (Math.PI * 2)) + Math.PI * 2) %
						(Math.PI * 2)) -
					Math.PI
				);
			}

			function walk(rawDelta) {
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
				// Forward direction on the ground plane for the current heading (pitch is never a factor).
				const forwardX = Math.sin(targetCameraYaw);
				const forwardZ = -Math.cos(targetCameraYaw);
				// Positive wheel delta ("scroll down") moves forward, like scrolling down a page carries you further in.
				const distance = delta * WALK_SPEED;
				targetWalkX = Math.min(
					MAX_WALK_X,
					Math.max(MIN_WALK_X, targetWalkX + forwardX * distance)
				);
				targetWalkZ = Math.min(
					MAX_WALK_Z,
					Math.max(MIN_WALK_Z, targetWalkZ + forwardZ * distance)
				);
				targetWalkZ = resolveOuterDoorCollision(targetWalkX, targetWalkZ);
				targetWalkZ = resolveInnerWallCollision(targetWalkX, targetWalkZ);
			}

			function handleWheel(event) {
				if (mode !== "walk") return;
				event.preventDefault(); // don't also scroll the page
				walk(event.deltaY);
			}

			// Click-and-hold-drag steering: only turns the camera while the
			// mouse button is held (lastMouseDragX is non-null only between mousedown and mouseup).
			function handleMouseDown(event) {
				lastMouseDragX = event.clientX;
				lastMouseDragY = event.clientY;
				// Kept until the next mousedown (unlike lastMouseDragX/Y,
				// which handleMouseUp clears) so handleDoorClick can still
				// measure the total drag distance once the click event fires afterward.
				mouseDownX = event.clientX;
				mouseDownY = event.clientY;
				hasDragged = false;
				container.style.cursor = "grab";
			}

			function handleMouseMove(event) {
				if (lastMouseDragX === null) return;
				if (!hasDragged && mouseDownX !== null) {
					const totalDist = Math.hypot(
						event.clientX - mouseDownX,
						event.clientY - mouseDownY
					);
					if (totalDist > DOOR_CLICK_DRAG_THRESHOLD_PX) hasDragged = true;
				}
				const rect = container.getBoundingClientRect();
				const dxNormalized = (lastMouseDragX - event.clientX) / rect.width;
				targetCameraYaw = wrapAngle(
					targetCameraYaw + dxNormalized * DRAG_LOOK_RADIANS_PER_SWIPE
				);
				lastMouseDragX = event.clientX;
				// Inverted: drag up to look down, drag down to look up — clamped short of straight up/down.
				const dyNormalized = (event.clientY - lastMouseDragY) / rect.height;
				targetCameraPitch = Math.max(
					-MAX_DRAG_PITCH,
					Math.min(
						MAX_DRAG_PITCH,
						targetCameraPitch + dyNormalized * DRAG_LOOK_RADIANS_PER_SWIPE
					)
				);
				lastMouseDragY = event.clientY;
			}

			function handleMouseUp() {
				lastMouseDragX = null;
				lastMouseDragY = null;
				container.style.cursor = "all-scroll";
			}

			const doorRaycaster = new THREE.Raycaster();
			const doorClickPointer = new THREE.Vector2();
			const DOOR_CLICK_DRAG_THRESHOLD_PX = 6;
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
			function handleDoorClick(event) {
				if (hasEnteredRoom || mode !== "walk") return;
				if (hasDragged || isPointerOverMinimap(event)) return;
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
				// Line up with the door's X first (still out in the plaza —
				// see the animate() check that releases pendingDoorWalkZ once
				// aligned); only then walk forward through it.
				targetWalkX = door.x;
				pendingDoorWalkZ = AUTO_WALK_INSIDE_Z;
				autoWalking = true;
			}

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
				if (hasDragged || isPointerOverMinimap(event)) return;
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
				clickedPerson = respondents[index];
				clickedPersonIndex = index;
			}

			// --- STATE VARIABLES ---
			// Axis locking variables
			let startTouchX = null;
			let startTouchY = null;
			let hasDeterminedDirection = false;
			let isSwipingHorizontally = false;
			let isSwipingVertically = false;

			// --- EVENT LISTENERS ---
			container.addEventListener("touchstart", handleTouchStart, {
				passive: false
			});
			container.addEventListener("touchmove", handleTouchMove, {
				passive: false
			});
			container.addEventListener("touchend", handleTouchEnd);
			container.addEventListener("touchcancel", handleTouchEnd);

			function handleTouchStart(event) {
				const touch = event.touches[0];
				if (!touch) return;

				// Record the exact starting coordinates
				startTouchX = touch.clientX;
				startTouchY = touch.clientY;
				// Also feeds handleDoorClick's tap-vs-drag distance check,
				// same as handleMouseDown does for mouse input — the
				// synthetic "click" event browsers fire after a tap carries
				// these same coordinates.
				mouseDownX = touch.clientX;
				mouseDownY = touch.clientY;
				hasDragged = false;

				// Set the "last" coordinates for the first move calculation
				lastTouchX = touch.clientX;
				lastTouchY = touch.clientY;

				// Reset axis locks for the new swipe
				hasDeterminedDirection = false;
				isSwipingHorizontally = false;
				isSwipingVertically = false;
			}

			function handleTouchMove(event) {
				const touch = event.touches[0];
				if (!touch) return;

				// Prevent the browser from trying to scroll the page natively
				event.preventDefault();

				// 1. DETERMINE AND LOCK THE AXIS
				if (!hasDeterminedDirection) {
					const totalDx = touch.clientX - startTouchX;
					const totalDy = touch.clientY - startTouchY;

					// Wait until the user has moved at least 5 pixels to determine intent.
					// This prevents micro-jitters when they first touch the screen.
					if (Math.abs(totalDx) > 5 || Math.abs(totalDy) > 5) {
						if (Math.abs(totalDx) > Math.abs(totalDy)) {
							isSwipingHorizontally = true;
						} else {
							isSwipingVertically = true;
						}
						hasDeterminedDirection = true; // Lock it in
						// Unlike hasDeterminedDirection (reset by handleTouchEnd,
						// which fires before the synthetic click/tap event this
						// gates), this survives until the next touchstart — see
						// handleDoorClick/handlePersonClick.
						hasDragged = true;
					}
				}

				// 2. APPLY MOVEMENT (Only if the axis has been locked)
				if (
					hasDeterminedDirection &&
					lastTouchX !== null &&
					lastTouchY !== null
				) {
					const dx = touch.clientX - lastTouchX;
					const dy = touch.clientY - lastTouchY;
					const rect = container.getBoundingClientRect();

					if (isSwipingHorizontally) {
						// Horizontal drag -> Look around (Yaw)
						const dxNormalized = -dx / rect.width;
						targetCameraYaw = wrapAngle(
							targetCameraYaw + dxNormalized * DRAG_LOOK_RADIANS_PER_SWIPE
						);
					} else if (isSwipingVertically) {
						// Vertical drag -> Walk forward/backward (Z-axis)
						const dyNormalized = dy / rect.height;
						const fovScale = camera.fov / 60;
						const BASE_WALK_SPEED = 300;

						walk(dyNormalized * BASE_WALK_SPEED * fovScale);
					}
				}

				// 3. UPDATE LAST TOUCH COORDS
				lastTouchX = touch.clientX;
				lastTouchY = touch.clientY;
			}

			function handleTouchEnd(event) {
				// Clear out everything when the user lifts their finger
				lastTouchX = null;
				lastTouchY = null;
				startTouchX = null;
				startTouchY = null;

				hasDeterminedDirection = false;
				isSwipingHorizontally = false;
				isSwipingVertically = false;
			}

			// Any arrow key or the space bar flips between walk and top-down view, same as the toggle button.
			function handleKeyDown(event) {
				if (event.key.startsWith("Arrow") || event.key === " ") {
					event.preventDefault();
					mode = mode === "walk" ? "topdown" : "walk";
				}
			}

			// Idle cursor hints that you can scroll here; handleMouseDown/Up
			// swap it to "grab" for the duration of an actual drag.
			container.style.cursor = "all-scroll";
			container.addEventListener("wheel", handleWheel, { passive: false });
			container.addEventListener("mousedown", handleMouseDown);
			container.addEventListener("mousemove", handleMouseMove);
			// Listen on window (not just container) for mouseup, so
			// releasing the button after dragging off the canvas still
			// stops the drag.
			window.addEventListener("mouseup", handleMouseUp);
			container.addEventListener("click", handleDoorClick);
			container.addEventListener("click", handlePersonClick);
			window.addEventListener("keydown", handleKeyDown);

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
			}

			// Eased start/end blend between each person's Y1/Y2 layout (0 = Y1, 1 = Y2), same easing as computeWalkPose above.
			let currentPositionBlend = 0;
			let positionTransition = null;
			let previousPositionMode = positionMode;

			$effect(() => {
				const newPositionMode = positionMode;
				if (newPositionMode === previousPositionMode) return;
				positionTransition = {
					start: performance.now(),
					from: currentPositionBlend,
					to: newPositionMode === "Y2" ? 1 : 0
				};
				previousPositionMode = newPositionMode;
			});

			function updatePositionBlend() {
				if (!positionTransition) return;
				const t = Math.min(
					1,
					(performance.now() - positionTransition.start) /
						POSITION_TRANSITION_MS
				);
				const eased = t * t * (3 - 2 * t); // smoothstep
				currentPositionBlend =
					positionTransition.from +
					(positionTransition.to - positionTransition.from) * eased;
				if (t >= 1) positionTransition = null;
			}

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
			updatePeoplePositions(0, 0);

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
					// Constant speed, not eased — exponential easing's speed
					// is proportional to remaining distance, so the moment
					// pendingDoorWalkZ resolves above (a fresh, larger
					// delta) velocity jumps discontinuously, reading as a
					// sudden burst. A fixed units/second step has no such
					// jump, and (unlike an asymptotic ease) actually arrives.
					const stepX =
						Math.sign(targetWalkX - renderWalkX) *
						Math.min(Math.abs(targetWalkX - renderWalkX), DOOR_WALK_SPEED * dt);
					const stepZ =
						Math.sign(targetWalkZ - renderWalkZ) *
						Math.min(Math.abs(targetWalkZ - renderWalkZ), DOOR_WALK_SPEED * dt);
					renderWalkX += stepX;
					renderWalkZ += stepZ;

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
				cameraPitch = targetCameraPitch;

				updatePositionBlend();
				updateEnteredRoom();
				updatePeoplePositions(dt, simulatedElapsed);
				updateCamera();
				updateDoors(dt);
				currentAge = zToAge(renderWalkZ);
				updateStoryText();

				// Skipped during the door auto-walk (autoWalking): it draws
				// every person twice (an inflated backface pass plus the
				// normal one), and crossing the threshold is exactly the
				// moment a lot of people go from "far, frozen, no
				// animation" to "close, animating, full LOD" all at once —
				// the single biggest fixed cost in the frame is the one this
				// briefly turns off, right when everything else spikes.
				if (autoWalking) {
					renderer.render(scene, camera);
				} else {
					effect.render(scene, camera);
				}
				minimapComponent.draw({
					walkerX: renderWalkX,
					walkerZ: renderWalkZ,
					walkerYaw: cameraYaw,
					minimapX,
					minimapZ,
					personColorCSS,
					respondentCount: respondents.length
				});
			}
			animate();

			// Returned to onMount's outer scope and called on teardown.
			return () => {
				cancelAnimationFrame(frameId);
				webglResizeObserver.disconnect();
				container.removeEventListener("wheel", handleWheel);
				container.removeEventListener("mousedown", handleMouseDown);
				container.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
				container.removeEventListener("click", handleDoorClick);
				container.removeEventListener("click", handlePersonClick);
				container.removeEventListener("touchstart", handleTouchStart);
				container.removeEventListener("touchmove", handleTouchMove);
				container.removeEventListener("touchend", handleTouchEnd);
				container.removeEventListener("touchcancel", handleTouchEnd);
				window.removeEventListener("keydown", handleKeyDown);
				renderer.dispose();
				shadowGeometry.dispose();
				sideWallGeometry.dispose();
				exteriorSideWallGeometry.dispose();
				scene.traverse((obj) => {
					if (obj.material) obj.material.dispose?.();
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

<div class="lifedeath-room" class:topdown-active={mode === "topdown"} bind:this={container}>
	<ControlPanel
		{variableOptions}
		bind:selectedVariable
		{legendData}
		bind:mode
		bind:positionMode
		{currentAge}
		{loadingMessage}
	/>
	{#if storyTexts.length > 0}
		<div class="story-overlay" transition:fade>
			{#each storyTexts as text}
				<p>{text}</p>
			{/each}
		</div>
	{/if}
	<div class="age">Age {currentAge}</div>
	<Minimap bind:this={minimapComponent} {mode} {container} />
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
		   (.minimap-canvas, .age, ControlPanel's .minimap) is positioned
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
	}

	/* The minimap itself (its box sizing/topdown-active variant) is styled
	   in Minimap.lifedeath.svelte now — it owns that <canvas>. */
	.age {
		position: absolute;
		right: 24px;
		bottom: 300px;
		width: 120px;
		text-align: center;
		color: var(--color-light-purple);
		font-size: 18px;
		z-index: 10;
	}
</style>
