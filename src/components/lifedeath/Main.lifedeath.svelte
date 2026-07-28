<script>
	import { onMount } from "svelte";
	import * as THREE from "three";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	// Deep-clones a rigged GLTF graph with its own skeleton — plain
	// Object3D.clone() would share bones/animation state across instances.
	import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
	// Used once, up front, to weld the walker GLB's low-poly hard-edged
	// geometry into smooth-shaded geometry — see smoothGeometry() below.
	import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
	import { OutlineEffect } from "three/addons/effects/OutlineEffect.js";
	
	// Name -> human-readable-label lookup for every people.json column.
	import variableLabels from "$data/variable_labels.json";
	
	import ControlPanel from "./ControlPanel.svelte";

	// Fetched at runtime (~17MB) rather than imported as a module
	const PEOPLE_DATA_URL = "/data/people.json";
	// Low-poly rigged humanoids with a baked-in "Walk" clip, one body per
	// GENDER x body-type combo; each crowd member clones whichever matches
	// their own GENDER. CC-BY-4.0 (Sketchfab, "Base Mesh 246 Tri").
	const MALE_BODY_URLS = [
		"/assets/app/bodies/base_mesh_246_tri_walking_m_athletic.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_average.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_broad.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_heavyset.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_short_stocky.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_slim.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_tall_lanky.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_m_wiry.glb"
	];
	const FEMALE_BODY_URLS = [
		"/assets/app/bodies/base_mesh_246_tri_walking_f_athletic.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_curvy.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_heavyset.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_pear.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_petite.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_slim.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_stocky.glb",
		"/assets/app/bodies/base_mesh_246_tri_walking_f_tall_lanky.glb"
	];

	// Fixed colors for the default recolor-by variable (AFTER_DEATH_Y1),
	const NO_COLOR = 0xff7a1a; // warm orange — "No"
	const UNSURE_COLOR = 0x9d00ff; // purple — "Unsure"
	const YES_COLOR = 0xff2ec4; // pink — "Yes"
	// Gradient ends for any continuous-numeric variable (see
	// continuousColor()) — a separate palette from the categorical colors above.
	const CONTINUOUS_LOW_COLOR = 0xff7a00; // bright orange — low values
	const CONTINUOUS_HIGH_COLOR = 0x9d00ff; // intense purple — high values
	// Used for missing/null values, or a "before you pick a category" gray.
	const MUTED_COLOR = 0x55505f;

	// Room dimensions, in arbitrary "world units" (~1.3 units per figure).
	// Sized for the ~1,460 people with a valid No/Unsure/Yes + age in both waves.
	const ROOM_WIDTH = 80; // left/right: No, Unsure, Yes, one third each
	const ROOM_DEPTH = 100; // front/back (younger <-> older)
	const ROOM_HEIGHT = 50;

	// Half-extents are used constantly below, so compute them once.
	const HALF_WIDTH = ROOM_WIDTH / 2;
	const HALF_DEPTH = ROOM_DEPTH / 2;
	// Room splits into three equal zones (No/Unsure/Yes) with a solid bar —
	// a real obstacle, not just a line (see resolveBarCollision) — at each boundary.
	const ZONE_WIDTH = ROOM_WIDTH / 3;
	const BAR_HEIGHT = 1.1; // counter height, floor to bar top
	const BAR_THICKNESS = 0.9; // counter depth, along the zone boundary's x axis
	const BAR_COLOR = 0x241016; // dark, moody bar-wood color
	// A narrow gap opens in the bar every 10 years of age (see ageToZ), so
	// crowd/walker can cross zones there instead of only at the room's ends.
	const BAR_GAP_YEARS = 10;
	const BAR_GAP_WIDTH = 1.6; // world units
	// How close a person's (or the walker's) center may get to a bar's
	// centerline before being pushed back — half the counter thickness plus clearance.
	const BAR_CLEARANCE = BAR_THICKNESS / 2 + 0.4;

	// The exterior: a dark plaza where the walker starts, and an enclosed
	// vestibule whose corridors route from the entrance to the correct zone.
	const EXTERIOR_DEPTH = 26;
	const VESTIBULE_DEPTH = 10;
	const DOOR_Z = HALF_DEPTH + VESTIBULE_DEPTH;
	const DOOR_WIDTH = 1.6; // just wide enough for one figure
	const DOOR_HEIGHT = 3; // just clears a figure's head (FIGURE_HEIGHT is 2)
	const FACADE_THICKNESS = 0.6;
	const FACADE_CLEARANCE = FACADE_THICKNESS / 2 + 0.4;
	// How close the walker must be to trigger a door, and how open (0..1)
	// it must get before it stops blocking — between FACADE_CLEARANCE and half DOOR_SPACING.
	const DOOR_TRIGGER_RADIUS = 1.2;
	const DOOR_OPEN_TIME = 0.35; // seconds to close ~63% of the remaining open/close
	const DOOR_OPEN_ANGLE = Math.PI * 0.8; // swings inward, almost flat against the inside wall
	const DOOR_PASSABLE_OPEN_AMOUNT = 0.5;
	// Center-to-center door spacing — wider than CORRIDOR_WIDTH so the
	// Unsure corridor and Yes/No turns don't overlap behind the facade.
	const DOOR_SPACING = 3.2;
	// A light frame around each door, reading as a lit doorway from the dark plaza.
	const DOOR_OUTLINE_THICKNESS = 0.1;
	const DOOR_OUTLINE_COLOR = 0xff2ec4; // matches the neon sign
	// openAmount (0 closed .. 1 open) is plain per-door render state, not a
	// Svelte rune — updateDoors() in onMount advances it every frame.
	const DOORS = [
		{ x: -DOOR_SPACING, label: "No", openAmount: 0 },
		{ x: 0, label: "Unsure", openAmount: 0 },
		{ x: DOOR_SPACING, label: "Yes", openAmount: 0 }
	];
	const BUILDING_LABEL = ["Do you", "believe in", "life after death?"];

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
		{ maxDistance: LOD_FREEZE_DISTANCE, brightness: 1, outlineThickness: OUTLINE_DEFAULT_THICKNESS },
		{ maxDistance: 18, brightness: 0.5, outlineThickness: OUTLINE_DEFAULT_THICKNESS * 0.8 },
		{ maxDistance: 26, brightness: 0.3, outlineThickness: OUTLINE_DEFAULT_THICKNESS * 0.4 },
		{ maxDistance: Infinity, brightness: 0.15, outlineThickness: OUTLINE_DEFAULT_THICKNESS * 0.15 }
	];

	// Walk-cycle animation: since the "Walk" clip has no standing-still
	// pose, each person cross-fades it against a frozen bind-pose clip by __walkAmount when they stop.
	// How fast a person's facing turns to match travel direction, and how
	// fast walk-amount fades — same frame-rate-independent pattern as FOLLOW_TIME.
	const FACING_TURN_TIME = 0.3; // seconds to close ~63% of the remaining turn
	const WALK_AMOUNT_SMOOTH_TIME = 0.25; // seconds to close ~63% of the fade in/out
	// The walk clip's baked-in stride only looks right at its animated
	// speed, so playback rate tracks each person's own smoothed ground
	// speed instead of a flat 1x (MIN/MAX bound the extremes).
	const WALK_SPEED_SMOOTH_TIME = 0.1;
	const WALK_ANIM_SPEED = 6;
	const MIN_WALK_TIMESCALE = 2;
	const MAX_WALK_TIMESCALE = 15;
	// Below this squared per-frame displacement, a person is considered at
	// rest rather than reacting to floating point noise.
	const MOVE_FACING_EPSILON_SQ = 1e-6;
	// Within this distance of the walker, a person turns to face the
	// camera directly instead of whichever way they're actually moving.
	const FACE_CAMERA_RADIUS = 3.5;
	// A subtle "breathing" wobble while standing still, fading out as
	// __walkAmount rises — scales the figure's Y axis since bone names vary between GLB rigs.
	const BREATHING_AMPLITUDE = 0.012; // fraction of height, peak scale change
	const BREATHING_SPEED = (2 * Math.PI) / 3.6; // radians/sec (~3.6s per breath)

	// First-person "walk" camera tuning, roughly at head height.
	const EYE_HEIGHT = FIGURE_HEIGHT;
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
	const FOLLOW_TIME = 0.18; // seconds to close ~63% of the remaining distance
	// Keeps the walker inside the walls/edges so the camera's near-clip
	// plane never pokes through geometry; z spans plaza + building.
	const WALK_MARGIN = 3;
	const MIN_WALK_X = -HALF_WIDTH + WALK_MARGIN;
	const MAX_WALK_X = HALF_WIDTH - WALK_MARGIN;
	const MIN_WALK_Z = -HALF_DEPTH + WALK_MARGIN;
	const MAX_WALK_Z = HALF_DEPTH + EXTERIOR_DEPTH - WALK_MARGIN;
	// Where the walker starts: out in the plaza facing the building's
	// doors/sign — unless debugMode is on, starting just inside instead.
	const DEFAULT_START_Z = HALF_DEPTH + EXTERIOR_DEPTH - WALK_MARGIN - 2;
	const DEBUG_START_Z = HALF_DEPTH - WALK_MARGIN;
	// Toggled with a `?debug` query param — a dev convenience, not a
	// feature that needs a UI button.
	const debugMode = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("debug");

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

	// Top-down view: a fixed camera pose looking straight down at the room,
	// toggled by the overlay button, animating smoothly between modes.
	const TOPDOWN_HEIGHT = ROOM_DEPTH * 0.9;
	const MODE_TRANSITION_MS = 1250;

	// Minimap: an always-on top-down view rendered into a viewport carved
	// out of this same canvas (see renderMinimap). ControlPanel.svelte's
	// toggle button uses these same px numbers to line up with it.
	const MINIMAP_SIZE_PX = 160;
	const MINIMAP_MARGIN_PX = 24;

	// How long the crowd takes to walk from Y1 to Y2 layout (or back) —
	// longer than the camera's mode transition since people cross the room.
	const POSITION_TRANSITION_MS = 3500;

	// `mode` switches camera behavior
	// `selectedVariable` drives the recolor dropdown
	// `positionMode` picks which wave's layout the crowd walks toward
	let mode = $state("walk"); // "walk" | "topdown"
	let selectedVariable = $state("AFTER_DEATH_Y1");
	let positionMode = $state("Y1"); // "Y1" | "Y2"
	// A small summary of the current color mapping, rendered as a legend.
	// Either { kind: "categorical", items: [{label, color, count}, ...] } or { kind: "continuous", min, max }.
	let legendData = $state(null);
	// The age the walker's current depth corresponds to — inverse of ageToZ, updated every frame; null until the room has loaded.
	let currentAge = $state(null);
	// Non-empty until people.json and the walker GLB have both resolved; the control panel shows this instead of its normal controls until then.
	let loadingMessage = $state("Loading people…");

	// The <div> that three.js's <canvas> gets appended into.
	let container;

	// Sorted list of dropdown options: every column in people.json, labeled with its human-readable description where we have one.
	const variableOptions = Object.keys(variableLabels)
		.map((key) => ({ key, label: variableLabels[key] || key }))
		.sort((a, b) => a.label.localeCompare(b.label));

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
			// (bind-pose) transform — a more reliable "standing normally" reference than an arbitrary Walk-clip frame.
			function buildBindPoseClip(root, referenceClip) {
				const tracks = referenceClip.tracks.map((track) => {
					const dot = track.name.lastIndexOf(".");
					const node = root.getObjectByName(track.name.slice(0, dot));
					const value = node[track.name.slice(dot + 1)];
					const values = typeof value.toArray === "function" ? value.toArray() : [value];
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
			const LEG_SHADOW_MIN_BRIGHTNESS = 0.08;
			const LEG_SHADOW_TOP_FRACTION = 0.35;
			function bakeLegShadow(geometry) {
				geometry.computeBoundingBox();
				const minY = geometry.boundingBox.min.y;
				const maxY = geometry.boundingBox.max.y;
				const span = maxY - minY || 1;
				const position = geometry.attributes.position;
				const colors = new Float32Array(position.count * 3);
				for (let v = 0; v < position.count; v++) {
					const t = Math.min(1, Math.max(0, (position.getY(v) - minY) / span / LEG_SHADOW_TOP_FRACTION));
					const eased = t * t * (3 - 2 * t); // smoothstep
					const brightness = LEG_SHADOW_MIN_BRIGHTNESS + (1 - LEG_SHADOW_MIN_BRIGHTNESS) * eased;
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
				const walkClip = gltf.animations.find((a) => a.name === "Walk") ?? gltf.animations[0];
				return { scene: gltf.scene, walkClip, restClip: walkClip && buildBindPoseClip(gltf.scene, walkClip) };
			}
			const maleModels = maleGltfs.map(prepareModel);
			const femaleModels = femaleGltfs.map(prepareModel);
			const allModels = [...maleModels, ...femaleModels];

			// Picks a body for this respondent's own GENDER (falling back to
			// the full pool for anything else), so the crowd isn't a field
			// of identical clones the way a single shared model would be.
			function pickModelForPerson(person) {
				if (person.GENDER === "Male") return maleModels[Math.floor(Math.random() * maleModels.length)];
				if (person.GENDER === "Female") return femaleModels[Math.floor(Math.random() * femaleModels.length)];
				return allModels[Math.floor(Math.random() * allModels.length)];
			}

			// GLB exports vary wildly in native scale, so measure one
			// reference model and derive a correction to FIGURE_HEIGHT,
			// applied to every body so their relative height differences carry through unchanged.
			const referenceHeight = new THREE.Box3().setFromObject(allModels[0].scene).getSize(new THREE.Vector3()).y;
			const WALKER_SCALE_CORRECTION = referenceHeight > 0 ? FIGURE_HEIGHT / referenceHeight : 1;

			// Only respondents with a clean No/Unsure/Yes answer and a real
			// numeric age in *both* waves get a figure — Y1 drives their starting layout, Y2 their walk-to spot.
			const isAfterDeathAnswer = (value) => value === "No" || value === "Unsure" || value === "Yes";
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
			const ageMin = Math.min(...allAges);
			const ageMax = Math.max(...allAges);

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
				return Math.round(ageMin + Math.min(1, Math.max(0, t)) * (ageMax - ageMin));
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
								if (ddx * ddx + ddz * ddz < MIN_SPACING * MIN_SPACING) return false;
							}
						}
					}
					return true;
				}

				// Horizontal placement uses nearly the full zone width, with
				// clearance from the bar (BAR_CLEARANCE — a solid obstacle)
				// and a small wall margin, so people spread evenly rather than clustering centrally.
				const WALL_MARGIN = 1.5;
				const HALF_ZONE = ZONE_WIDTH / 2;

				// zone is -1 (No), 0 (Unsure), or 1 (Yes). wallMargin shrinks
				// on each retry so dense age bands find room, but bar clearance never shrinks.
				function zoneBounds(zone, wallMargin) {
					if (zone < 0) return [-HALF_WIDTH + wallMargin, -HALF_ZONE - BAR_CLEARANCE];
					if (zone > 0) return [HALF_ZONE + BAR_CLEARANCE, HALF_WIDTH - wallMargin];
					return [-HALF_ZONE + BAR_CLEARANCE, HALF_ZONE - BAR_CLEARANCE];
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

			const zoneFor = (value) => (value === "No" ? -1 : value === "Yes" ? 1 : 0);
			const y1Layout = computeLayout(
				(p) => zoneFor(p.AFTER_DEATH_Y1),
				(p) => p.AGE_Y1
			);
			const y2Layout = computeLayout(
				(p) => zoneFor(p.AFTER_DEATH_Y2),
				(p) => p.AGE_Y2
			);

			// One gap z per age divisible by BAR_GAP_YEARS, descending — the
			// same openings the bar itself is built with (see room-shell section below).
			function barGapZs() {
				const zs = [];
				const start = Math.ceil(ageMin / BAR_GAP_YEARS) * BAR_GAP_YEARS;
				const end = Math.floor(ageMax / BAR_GAP_YEARS) * BAR_GAP_YEARS;
				for (let age = start; age <= end; age += BAR_GAP_YEARS) zs.push(ageToZ(age));
				return zs.sort((a, b) => b - a);
			}

			// The bar-boundary x's a person must cross to get from zone1 to
			// zone2, in the order they're crossed.
			function boundariesBetween(zone1, zone2) {
				const lo = Math.min(zone1, zone2);
				const hi = Math.max(zone1, zone2);
				const boundaries = [];
				if (lo <= -1 && hi >= 0) boundaries.push(-ZONE_WIDTH / 2);
				if (lo <= 0 && hi >= 1) boundaries.push(ZONE_WIDTH / 2);
				return zone1 <= zone2 ? boundaries : boundaries.reverse();
			}

			function nearestGapZ(z) {
				const gaps = barGapZs();
				let best = 0;
				let bestDist = Infinity;
				for (const gapZ of gaps) {
					const dist = Math.abs(gapZ - z);
					if (dist < bestDist) {
						bestDist = dist;
						best = gapZ;
					}
				}
				return best;
			}

			// A person's Y1 -> Y2 walk is a straight line unless it crosses
			// a bar, in which case it routes through the nearest gap.
			// Returns { waypoints, fractions }: fractions[i] is waypoints[i]'s
			// cumulative-length progress (0..1), for evaluateBlendPath below.
			function buildBlendPath(x1, z1, zone1, x2, z2, zone2) {
				const boundaries = boundariesBetween(zone1, zone2);
				const waypoints = [{ x: x1, z: z1 }];
				if (boundaries.length > 0) {
					const gapZ = nearestGapZ((z1 + z2) / 2);
					for (const boundaryX of boundaries) waypoints.push({ x: boundaryX, z: gapZ });
				}
				waypoints.push({ x: x2, z: z2 });

				const fractions = [0];
				let total = 0;
				const segmentLengths = [];
				for (let i = 0; i < waypoints.length - 1; i++) {
					const dx = waypoints[i + 1].x - waypoints[i].x;
					const dz = waypoints[i + 1].z - waypoints[i].z;
					const length = Math.hypot(dx, dz);
					segmentLengths.push(length);
					total += length;
				}
				let cumulative = 0;
				for (const length of segmentLengths) {
					cumulative += length;
					fractions.push(total > 0 ? cumulative / total : 1);
				}
				return { waypoints, fractions };
			}

			// Evaluates a person's blend path at progress t (0..1, same as
			// currentPositionBlend), finding the segment t falls in and lerping within it.
			function evaluateBlendPath({ waypoints, fractions }, t) {
				for (let i = 0; i < fractions.length - 1; i++) {
					if (t <= fractions[i + 1] || i === fractions.length - 2) {
						const segStart = fractions[i];
						const segEnd = fractions[i + 1];
						const u = segEnd > segStart ? (t - segStart) / (segEnd - segStart) : 0;
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
				// The route between those two endpoints — straight unless
				// it crosses a zone, then bent through the nearest bar opening.
				person.__blendPath = buildBlendPath(
					person.__xY1,
					person.__zY1,
					zoneFor(person.AFTER_DEATH_Y1),
					person.__xY2,
					person.__zY2,
					zoneFor(person.AFTER_DEATH_Y2)
				);
				person.__offsetX = 0;
				person.__offsetZ = 0;
				// Independent height/weight variation, so the crowd isn't a
				// field of identical clones — height scales Y only, weight
				// (build) scales X/Z, so a taller person isn't automatically bulkier too.
				person.__heightScale = 1 + Math.random() * 0.1;
				person.__widthScale = 1 + Math.random() * 0.3;
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
				person.__wanderRadius = 0.3 + Math.random() * 0.3;
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
				person.__nextMoveTime = 6 + Math.random() * 20;
				// 0..1 progress through the current shuffle (0 when idle).
				person.__moveT = 0;
				// A random 0..1 fraction of the walk clip's duration, so each
				// mixer starts at a different point instead of stepping in unison.
				person.__animOffsetFraction = Math.random();
				// A random phase seed for the idle breathing wobble, so the crowd doesn't breathe in unison.
				person.__breathPhase = Math.random() * Math.PI * 2;
			});

			const width = container.clientWidth;
			const height = container.clientHeight;

			// --- Core three.js setup: scene, camera, renderer ---

			const BG_COLOR = 0x0d0815;

			const scene = new THREE.Scene();
			scene.background = new THREE.Color(BG_COLOR);
			// Fog fades distant geometry to the background color, hiding the
			// hard edge where the back wall would otherwise pop into view.
			// Distance is measured from the camera though, and the top-down
			// camera sits TOPDOWN_HEIGHT (~90 units) above the floor — well
			// into this same fog band — so looking straight down would fog
			// the whole room out to near-black. Disabled while in topdown
			// mode instead (see updateCamera) rather than tuned around two very different camera heights.
			const walkFog = new THREE.Fog(BG_COLOR, ROOM_DEPTH * 0.55, ROOM_DEPTH * 1.3);
			scene.fog = walkFog;

			const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 800);

			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height);
			container.appendChild(renderer.domElement);
			// Draws each person's black silhouette outline as a second
			// (inflated, back-face) pass — the standard cheap per-object
			// outline technique, done here instead of by hand per body part.
			const effect = new OutlineEffect(renderer, {
				defaultThickness: 0.005,
				defaultColor: [0, 0, 0],
				defaultKeepAlive: true
			});

			// Minimap: a fixed orthographic camera rendered into a viewport
			// carved out of this same canvas (see renderMinimap) — cheaper
			// than a second canvas/renderer. Renders layer 1 only — flat,
			// fixed-size dot markers instead of the actual room geometry
			// (whose per-person scale would make far/near dots read very differently in size).
			const minimapHalfSpan = Math.max(HALF_WIDTH, HALF_DEPTH) * 1.05;
			const minimapCamera = new THREE.OrthographicCamera(
				-minimapHalfSpan,
				minimapHalfSpan,
				minimapHalfSpan,
				-minimapHalfSpan,
				0.1,
				TOPDOWN_HEIGHT * 1.5
			);
			minimapCamera.position.set(0, TOPDOWN_HEIGHT, 0);
			minimapCamera.up.set(0, 0, -1); // keep "forward" (young) pointing up-screen, same as computeTopdownPose
			minimapCamera.lookAt(0, 0, 0);
			minimapCamera.layers.set(1);

			// A bright marker showing the walker's position, floated above head height so the crowd never occludes it.
			const walkerMarker = new THREE.Mesh(
				new THREE.ConeGeometry(1.4, 3, 12),
				new THREE.MeshBasicMaterial({ color: 0xffee66 })
			);
			walkerMarker.layers.set(1);
			scene.add(walkerMarker);

			// One flat, unlit dot per respondent — reused every frame in
			// updatePeoplePositions, same InstancedMesh-per-frame pattern as
			// the blob shadows. Per-instance color (set in applyColorVariable)
			// mirrors each person's own body color, so material.color stays
			// plain white — it multiplies against the instance color otherwise.
			const MINIMAP_DOT_RADIUS = 0.9;
			const minimapDots = new THREE.InstancedMesh(
				new THREE.CircleGeometry(MINIMAP_DOT_RADIUS, 2),
				new THREE.MeshBasicMaterial({ color: 0xffffff }),
				respondents.length
			);
			minimapDots.layers.set(1);
			scene.add(minimapDots);

			function renderMinimap() {
				walkerMarker.position.set(renderWalkX, FIGURE_HEIGHT + 2, renderWalkZ);

				const w = container.clientWidth;
				const h = container.clientHeight;
				const x = w - MINIMAP_SIZE_PX - MINIMAP_MARGIN_PX;
				const y = MINIMAP_MARGIN_PX; // three.js viewport/scissor y is measured from the bottom
				renderer.setScissorTest(true);
				renderer.setViewport(x, y, MINIMAP_SIZE_PX, MINIMAP_SIZE_PX);
				renderer.setScissor(x, y, MINIMAP_SIZE_PX, MINIMAP_SIZE_PX);
				renderer.render(scene, minimapCamera);
				renderer.setScissorTest(false);
				renderer.setViewport(0, 0, w, h);
			}

			// No scene lights at all: every material below is unlit
			// (MeshBasicMaterial), so a per-pixel color is exactly its
			// .color/vertex-color with no lighting falloff to ever produce a
			// soft gradient — flat by construction rather than by tuning a
			// gradient map. Depth/shape still reads via the OutlineEffect
			// silhouette, the baked leg-shadow vertex colors, and the doorGlow/neon panels below.

			// A self-illuminated bright rectangle standing in for the
			// doorway opening, so the light source has a visible origin.
			const doorGlow = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH * 0.1, ROOM_HEIGHT * 0.4),
				new THREE.MeshBasicMaterial({ color: 0xfff4e0 })
			);
			doorGlow.position.set(0, ROOM_HEIGHT * 0.24, -HALF_DEPTH + 0.05);
			scene.add(doorGlow);

			// The room shell: floor, ceiling, back wall, side walls. Since
			// the walk camera is clamped (WALK_MARGIN) rather than freely
			// orbiting, the shell can just match the room bounds exactly.

			// Stretched past the building's depth to also cover the
			// exterior plaza, so the ground outside isn't a void — recentered to match.
			const floor = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH + EXTERIOR_DEPTH),
				new THREE.MeshBasicMaterial({ color: 0x020106 })
			);
			floor.rotation.x = -Math.PI / 2; // lay the plane flat
			floor.position.z = EXTERIOR_DEPTH / 2;
			scene.add(floor);

			const ceiling = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH),
				new THREE.MeshBasicMaterial({ color: 0x120e1c })
			);
			ceiling.rotation.x = Math.PI / 2;
			ceiling.position.y = ROOM_HEIGHT;
			scene.add(ceiling);

			// A faint floor grid, purely decorative, to convey scale/depth —
			// noticeably lighter than the floor itself so the lines actually read against the now much-darker floor.
			const grid = new THREE.GridHelper(Math.max(ROOM_WIDTH, ROOM_DEPTH), 32, 0x6a5488, 0x453264);
			grid.position.y = 0.01; // avoid z-fighting with the floor plane
			scene.add(grid);

			// A solid bar counter at each zone boundary — an actual
			// obstacle (see resolveBarCollision), topped with a glass panel
			// up to the ceiling. A gap opens every BAR_GAP_YEARS of age, at the z each age band already occupies.
			const barMaterial = new THREE.MeshBasicMaterial({ color: BAR_COLOR });
			const glassMaterial = new THREE.MeshBasicMaterial({
				color: 0x9fd8e8,
				transparent: true,
				opacity: 0.2,
				side: THREE.DoubleSide
			});

			// The solid bar ranges left over once a BAR_GAP_WIDTH walkway is
			// cut around each gap z — [front, back] pairs, used both as
			// collision truth (isZBlocked) and where the counter/glass are built.
			function barSolidZRanges() {
				const halfGap = BAR_GAP_WIDTH / 2;
				const ranges = [];
				let z = HALF_DEPTH;
				for (const gapZ of barGapZs()) {
					const back = gapZ + halfGap;
					if (back < z) ranges.push([z, back]);
					z = gapZ - halfGap;
				}
				if (z > -HALF_DEPTH) ranges.push([z, -HALF_DEPTH]);
				return ranges;
			}
			const barSolid = barSolidZRanges();

			function isZBlocked(z) {
				return barSolid.some(([front, back]) => z <= front && z >= back);
			}

			// Pushes back out to the nearer side when approaching either
			// bar's centerline — a no-op unless z is blocked there (isZBlocked).
			function resolveBarCollision(x, z) {
				for (const barX of [-ZONE_WIDTH / 2, ZONE_WIDTH / 2]) {
					if (isZBlocked(z) && Math.abs(x - barX) < BAR_CLEARANCE) {
						x = barX + Math.sign(x - barX || 1) * BAR_CLEARANCE;
					}
				}
				return x;
			}

			// Builds one full bar along boundary x: a counter to BAR_HEIGHT,
			// glass continuing to DOOR_HEIGHT, and a continuous glass
			// lintel above spanning the full depth with no gaps.
			function buildBar(x) {
				for (const [front, back] of barSolid) {
					const length = front - back;
					const center = (front + back) / 2;

					const counter = new THREE.Mesh(
						new THREE.BoxGeometry(BAR_THICKNESS, BAR_HEIGHT, length),
						barMaterial
					);
					counter.position.set(x, BAR_HEIGHT / 2, center);
					scene.add(counter);
				}
			}

			buildBar(-ZONE_WIDTH / 2);
			buildBar(ZONE_WIDTH / 2);

			const backWall = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_HEIGHT),
				new THREE.MeshBasicMaterial({ color: 0x2a2036 })
			);
			backWall.position.set(0, ROOM_HEIGHT / 2, -HALF_DEPTH);
			scene.add(backWall);

			// Renders text onto a canvas and wraps it in an unlit plane —
			// dependency-free, no font asset needed for real TextGeometry.
			// `neon` draws two shadow-blur passes for a glowing-tube look;
			// `text` may be a string or an array of lines stacked top to bottom.
			function makeTextPanel(text, { width, height, fontSize, color = "#fdf6e3", neon = false }) {
				const lines = Array.isArray(text) ? text : [text];
				const canvas = document.createElement("canvas");
				canvas.width = 1024;
				canvas.height = Math.round(1024 * (height / width));
				const ctx = canvas.getContext("2d");
				ctx.font = `bold ${fontSize}px "Arial Black", Arial, sans-serif`;
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				const cx = canvas.width / 2;
				const maxWidth = canvas.width * 0.94;
				const lineHeight = canvas.height / (lines.length + 1);
				ctx.fillStyle = color;
				for (let i = 0; i < lines.length; i++) {
					const cy = lineHeight * (i + 1);
					if (neon) {
						ctx.shadowColor = color;
						ctx.shadowBlur = 45;
						ctx.fillText(lines[i], cx, cy, maxWidth);
						ctx.shadowBlur = 22;
						ctx.fillText(lines[i], cx, cy, maxWidth);
					} else {
						ctx.fillText(lines[i], cx, cy, maxWidth);
					}
				}
				const texture = new THREE.CanvasTexture(canvas);
				const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
				return new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
			}

			// The outer facade: the building's front at z = DOOR_Z, solid
			// everywhere except the three doors.
			const facadeMaterial = new THREE.MeshBasicMaterial({ color: 0x050308, side: THREE.DoubleSide });

			// The lower tier's solid segments left over once each door
			// opening is cut out — ascending [xStart, xEnd] pairs.
			function facadeSolidXRanges() {
				const halfDoor = DOOR_WIDTH / 2;
				const ranges = [];
				let x = -HALF_WIDTH;
				for (const door of DOORS) {
					const gapStart = door.x - halfDoor;
					if (gapStart > x) ranges.push([x, gapStart]);
					x = door.x + halfDoor;
				}
				if (x < HALF_WIDTH) ranges.push([x, HALF_WIDTH]);
				return ranges;
			}
			for (const [xStart, xEnd] of facadeSolidXRanges()) {
				const width = xEnd - xStart;
				const lowerTier = new THREE.Mesh(new THREE.PlaneGeometry(width, DOOR_HEIGHT), facadeMaterial);
				lowerTier.position.set((xStart + xEnd) / 2, DOOR_HEIGHT / 2, DOOR_Z);
				scene.add(lowerTier);
			}
			// The upper tier is one continuous solid lintel spanning the
			// full width, holding the sign above the doors.
			const upperTierHeight = ROOM_HEIGHT * 1.2 - DOOR_HEIGHT;
			const upperTier = new THREE.Mesh(new THREE.PlaneGeometry(ROOM_WIDTH, upperTierHeight), facadeMaterial);
			upperTier.position.set(0, DOOR_HEIGHT + upperTierHeight / 2, DOOR_Z);
			scene.add(upperTier);

			// The building's name — a neon sign on the lintel facing the
			// plaza, glowing pink, sized to sit above the clustered doors.
			const buildingSign = makeTextPanel(BUILDING_LABEL, {
				width: 14,
				height: 4,
				fontSize: 54,
				color: "#ff2ec4",
				neon: true
			});
			// +0.05: must sit on the plaza-facing side of the lintel, or the opaque wall would hide it from outside.
			buildingSign.position.set(0, DOOR_HEIGHT + 2.2, DOOR_Z + 0.05);
			scene.add(buildingSign);

			const doorOutlineMaterial = new THREE.MeshBasicMaterial({ color: DOOR_OUTLINE_COLOR });

			// Each door is a real panel, hinged on its left edge, closed
			// until the walker approaches (see updateDoors). The label lives on the panel so it swings with it.
			function buildDoor(door) {
				const hinge = new THREE.Group();
				hinge.position.set(door.x - DOOR_WIDTH / 2, 0, DOOR_Z);
				scene.add(hinge);

				const panel = new THREE.Mesh(
					new THREE.BoxGeometry(DOOR_WIDTH, DOOR_HEIGHT, FACADE_THICKNESS),
					facadeMaterial
				);
				panel.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT / 2, 0);
				hinge.add(panel);

				const label = makeTextPanel(door.label, {
					width: DOOR_WIDTH * 1.15,
					height: DOOR_HEIGHT * 0.4,
					fontSize: 160
				});
				label.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT * 0.62, FACADE_THICKNESS / 2 + 0.02);
				hinge.add(label);

				// A light frame tracing the panel's outline, reading as a
				// lit doorway from across the plaza; parented to the hinge so it swings with the door.
				const t = DOOR_OUTLINE_THICKNESS;
				const outlineZ = FACADE_THICKNESS / 2 + t / 2;
				const topBar = new THREE.Mesh(new THREE.BoxGeometry(DOOR_WIDTH + t, t, t), doorOutlineMaterial);
				topBar.position.set(DOOR_WIDTH / 2, DOOR_HEIGHT, outlineZ);
				hinge.add(topBar);
				const bottomBar = topBar.clone();
				bottomBar.position.y = 0;
				hinge.add(bottomBar);
				const sideBar = new THREE.Mesh(new THREE.BoxGeometry(t, DOOR_HEIGHT, t), doorOutlineMaterial);
				sideBar.position.set(0, DOOR_HEIGHT / 2, outlineZ);
				hinge.add(sideBar);
				const otherSideBar = sideBar.clone();
				otherSideBar.position.x = DOOR_WIDTH;
				hinge.add(otherSideBar);

				// A bright floor-level rectangle in the opening, same trick
				// as doorGlow above — an unmistakable "walk here" threshold, fixed to the ground not the hinge.
				const threshold = new THREE.Mesh(
					new THREE.PlaneGeometry(DOOR_WIDTH * 0.8, 0.3),
					new THREE.MeshBasicMaterial({ color: 0xfff4e0 })
				);
				threshold.rotation.x = -Math.PI / 2;
				threshold.position.set(door.x, 0.02, DOOR_Z);
				scene.add(threshold);

				door.hinge = hinge;
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
					const isNear = dx * dx + dz * dz < DOOR_TRIGGER_RADIUS * DOOR_TRIGGER_RADIUS;
					door.openAmount += ((isNear ? 1 : 0) - door.openAmount) * openFactor;
					door.hinge.rotation.y = door.openAmount * DOOR_OPEN_ANGLE;
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
				if (Math.abs(z - DOOR_Z) < FACADE_CLEARANCE && !isOuterDoorPassable(x)) {
					z = DOOR_Z + Math.sign(z - DOOR_Z || 1) * FACADE_CLEARANCE;
				}
				return z;
			}

			// The inner wall: at z = HALF_DEPTH, plain openings (no doors,
			// the outer ones already gate entry) sized to CORRIDOR_WIDTH.
			const ZONE_XS = [-ZONE_WIDTH, 0, ZONE_WIDTH];
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
			for (const [xStart, xEnd] of innerWallSolidXRanges()) {
				const innerWall = new THREE.Mesh(
					new THREE.PlaneGeometry(xEnd - xStart, ROOM_HEIGHT * 1.2),
					facadeMaterial
				);
				innerWall.position.set((xStart + xEnd) / 2, (ROOM_HEIGHT * 1.2) / 2, HALF_DEPTH);
				scene.add(innerWall);
			}
			// Always open — the outer doors are the only real gate. The
			// crowd never needs this either (same as resolveOuterDoorCollision).
			function resolveInnerWallCollision(x, z) {
				const isInOpening = ZONE_XS.some((zoneX) => Math.abs(x - zoneX) < CORRIDOR_WIDTH / 2);
				if (Math.abs(z - HALF_DEPTH) < FACADE_CLEARANCE && !isInOpening) {
					z = HALF_DEPTH + Math.sign(z - HALF_DEPTH || 1) * FACADE_CLEARANCE;
				}
				return z;
			}

			// The vestibule's corridors: solid side walls connecting each
			// outer door to its zone's inner-wall opening. Unsure runs
			// straight; No/Yes turn behind their door (see turnZ below).
			function buildCorridorAlongZ(x, zStart, zEnd) {
				const length = Math.abs(zStart - zEnd);
				const zCenter = (zStart + zEnd) / 2;
				const hw = CORRIDOR_WIDTH / 2;
				for (const side of [-1, 1]) {
					const wall = new THREE.Mesh(
						new THREE.PlaneGeometry(length, CORRIDOR_WALL_HEIGHT),
						hallwayWallMaterial
					);
					wall.rotation.y = Math.PI / 2;
					wall.position.set(x + side * hw, CORRIDOR_WALL_HEIGHT / 2, zCenter);
					scene.add(wall);
				}
			}
			function buildCorridorAlongX(z, xStart, xEnd) {
				const length = Math.abs(xStart - xEnd);
				const xCenter = (xStart + xEnd) / 2;
				const hw = CORRIDOR_WIDTH / 2;
				for (const side of [-1, 1]) {
					const wall = new THREE.Mesh(
						new THREE.PlaneGeometry(length, CORRIDOR_WALL_HEIGHT),
						hallwayWallMaterial
					);
					wall.position.set(xCenter, CORRIDOR_WALL_HEIGHT / 2, z + side * hw);
					scene.add(wall);
				}
			}
			const hallwayWallMaterial = new THREE.MeshBasicMaterial({
				color: 0x241c30,
				side: THREE.DoubleSide
			});

			// Unsure: straight through, door already lined up with its zone.
			buildCorridorAlongZ(0, DOOR_Z, HALF_DEPTH);

			// Yes/No: turn right behind their door — the sideways leg
			// starts as close as TURN_CLEARANCE allows, no straight lead-in.
			const turnZ = DOOR_Z - FACADE_CLEARANCE - TURN_CLEARANCE - CORRIDOR_WIDTH / 2;
			buildCorridorAlongX(turnZ, DOOR_SPACING, ZONE_WIDTH);
			buildCorridorAlongZ(ZONE_WIDTH, turnZ, HALF_DEPTH);

			// No: mirrored — turn left, then straight in.
			buildCorridorAlongX(turnZ, -DOOR_SPACING, -ZONE_WIDTH);
			buildCorridorAlongZ(-ZONE_WIDTH, turnZ, HALF_DEPTH);

			// One low ceiling over the whole vestibule — deliberately
			// cramped compared to the room beyond the inner wall.
			const vestibuleCeiling = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, VESTIBULE_DEPTH),
				hallwayWallMaterial
			);
			vestibuleCeiling.rotation.x = Math.PI / 2;
			vestibuleCeiling.position.set(0, VESTIBULE_CEILING_HEIGHT, (HALF_DEPTH + DOOR_Z) / 2);
			scene.add(vestibuleCeiling);

			// The three corridors above, as axis-aligned rectangles, for
			// resolveVestibuleCollision to hold the walker to.
			const corridorRects = (() => {
				const hw = CORRIDOR_WIDTH / 2;
				return [
					{ xMin: -hw, xMax: hw, zMin: HALF_DEPTH, zMax: DOOR_Z }, // Unsure
					{ xMin: DOOR_SPACING - hw, xMax: ZONE_WIDTH + hw, zMin: turnZ - hw, zMax: turnZ + hw }, // Yes turn
					{ xMin: ZONE_WIDTH - hw, xMax: ZONE_WIDTH + hw, zMin: HALF_DEPTH, zMax: turnZ }, // Yes run
					{ xMin: -ZONE_WIDTH - hw, xMax: -DOOR_SPACING + hw, zMin: turnZ - hw, zMax: turnZ + hw }, // No turn
					{ xMin: -ZONE_WIDTH - hw, xMax: -ZONE_WIDTH + hw, zMin: HALF_DEPTH, zMax: turnZ } // No run
				];
			})();
			// A no-op outside the vestibule's z range; inside it, clamps to
			// whichever corridor rectangle is nearest.
			function resolveVestibuleCollision(x, z) {
				if (z <= HALF_DEPTH || z >= DOOR_Z) return { x, z };
				for (const r of corridorRects) {
					if (x >= r.xMin && x <= r.xMax && z >= r.zMin && z <= r.zMax) return { x, z };
				}
				let best = { x, z };
				let bestDist = Infinity;
				for (const r of corridorRects) {
					const cx = Math.min(r.xMax, Math.max(r.xMin, x));
					const cz = Math.min(r.zMax, Math.max(r.zMin, z));
					const dist = Math.hypot(cx - x, cz - z);
					if (dist < bestDist) {
						bestDist = dist;
						best = { x: cx, z: cz };
					}
				}
				return best;
			}

			// Neon wayfinding arrows: one in the Unsure corridor, one at
			// each turn, one before each inner door — facing back toward the door.
			function buildArrowSign(x, z, rotationY, arrow, color = ARROW_COLOR) {
				const sign = makeTextPanel(arrow, {
					width: CORRIDOR_WIDTH * 0.8,
					height: CORRIDOR_WIDTH * 0.8,
					fontSize: 160,
					color,
					neon: true
				});
				sign.position.set(x, CORRIDOR_WALL_HEIGHT * 0.35, z);
				sign.rotation.y = rotationY;
				scene.add(sign);
			}
			// All three face default (+z) — correct for anyone walking in -z, deeper into the vestibule.
			buildArrowSign(0, HALF_DEPTH + (DOOR_Z - HALF_DEPTH) * 0.4, 0, "↑"); // straight ahead, mid-corridor
			// At each T-junction's entry side, first thing seen from the door.
			buildArrowSign(DOOR_SPACING, turnZ + 0.1, 0, "→"); // turn right, toward Yes
			buildArrowSign(-DOOR_SPACING, turnZ + 0.1, 0, "←"); // turn left, toward No

			// Arrows painted on the ground, pointing the walking direction:
			// left for No, straight for Unsure, right for Yes. Laying a
			// plane flat maps local +y to world -z, so an unrotated glyph already points correctly.
			function buildFloorArrow(x, z, arrow) {
				const sign = makeTextPanel(arrow, {
					width: CORRIDOR_WIDTH * 0.7,
					height: CORRIDOR_WIDTH * 0.7,
					fontSize: 160,
					color: ARROW_COLOR,
					neon: true
				});
				sign.rotation.x = -Math.PI / 2;
				sign.position.set(x, 0.03, z); // just above the floor, avoiding z-fighting
				scene.add(sign);
			}
			buildFloorArrow(0, HALF_DEPTH + (DOOR_Z - HALF_DEPTH) * 0.4, "↑");
			buildFloorArrow(DOOR_SPACING, turnZ, "→");
			buildFloorArrow(-DOOR_SPACING, turnZ, "←");

			// The inner door to each zone: outlined in that zone's own data
			// color, plus a matching arrow confirming "this way" ahead of it.
			function buildInnerDoorway(zoneX, color) {
				const outlineMaterial = new THREE.MeshBasicMaterial({ color });
				const t = DOOR_OUTLINE_THICKNESS;
				const halfW = CORRIDOR_WIDTH / 2;
				const z = HALF_DEPTH + 0.05; // just on the vestibule side of the inner wall
				const topBar = new THREE.Mesh(new THREE.BoxGeometry(CORRIDOR_WIDTH + t, t, t), outlineMaterial);
				topBar.position.set(zoneX, DOOR_HEIGHT, z);
				scene.add(topBar);
				const bottomBar = topBar.clone();
				bottomBar.position.y = 0;
				scene.add(bottomBar);
				const sideBar = new THREE.Mesh(new THREE.BoxGeometry(t, DOOR_HEIGHT, t), outlineMaterial);
				sideBar.position.set(zoneX - halfW, DOOR_HEIGHT / 2, z);
				scene.add(sideBar);
				const otherSideBar = sideBar.clone();
				otherSideBar.position.x = zoneX + halfW;
				scene.add(otherSideBar);

				const hexColor = `#${new THREE.Color(color).getHexString()}`;
				buildArrowSign(zoneX, HALF_DEPTH + 2.5, 0, "↑", hexColor);
			}
			buildInnerDoorway(-ZONE_WIDTH, NO_COLOR);
			buildInnerDoorway(0, UNSURE_COLOR);
			buildInnerDoorway(ZONE_WIDTH, YES_COLOR);

			// Stretched past the building's depth to also flank the
			// exterior plaza — recentered to match, same idea as the floor above.
			const sideWallGeometry = new THREE.PlaneGeometry(ROOM_DEPTH + EXTERIOR_DEPTH, ROOM_HEIGHT);
			const sideWallMaterial = new THREE.MeshBasicMaterial({
				color: 0x241c30,
				side: THREE.DoubleSide
			});

			const leftWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
			leftWall.position.set(-HALF_WIDTH, ROOM_HEIGHT / 2, EXTERIOR_DEPTH / 2);
			leftWall.rotation.y = Math.PI / 2;
			scene.add(leftWall);

			const rightWall = leftWall.clone();
			rightWall.position.x = HALF_WIDTH;
			scene.add(rightWall);

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
				const neutralMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, vertexColors: true });
				const outfitMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });
				instance.traverse((node) => {
					if (node.isMesh) {
						const originalName = node.material.name;
						node.material = originalName === "Body_skin" || originalName === "Hair" ? neutralMaterial : outfitMaterial;
					}
				});
				personBodyMaterials[i] = outfitMaterial;
				personSkinMaterials[i] = neutralMaterial;
				personBaseColors[i] = new THREE.Color();
				scene.add(instance);
				personRoots[i] = instance;

				if (model.walkClip) {
					const mixer = new THREE.AnimationMixer(instance);

					const walkAction = mixer.clipAction(model.walkClip);
					walkAction.play();

					// Frozen on the bind-pose clip's one frame, cross-faded
					// in by weight as this person slows to a stop, so they
					// settle toward standing instead of freezing mid-stride.
					const restAction = mixer.clipAction(model.restClip);
					restAction.play();
					restAction.paused = true;

					// Stagger each person's starting pose so the crowd
					// doesn't all step in lockstep — only advances walkAction, since restAction is paused.
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
			const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x0a0810 });
			// OutlineEffect would otherwise draw its usual inflated black
			// backface ring around this disc's edge too — on a flat ground
			// shadow that just reads as a soft rim/gradient around an
			// otherwise flat fill, which is exactly what we don't want here.
			shadowMaterial.userData.outlineParameters = { visible: false };
			const shadows = new THREE.InstancedMesh(shadowGeometry, shadowMaterial, respondents.length);
			scene.add(shadows);

			// Reused scratch object for the shadow's position -> matrix math, avoiding a per-frame allocation.
			const placementHelper = new THREE.Object3D();
			// Lies a shadow disc flat on the floor (circles face +Z by default).
			const FLAT_ROTATION = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));

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
					const t = (elapsedSeconds - person.__moveStart) / person.__moveDuration;
					if (t >= 1) {
						person.__wanderX = person.__moveToX;
						person.__wanderZ = person.__moveToZ;
						person.__moving = false;
						person.__moveT = 0;
						// Stand still for a while before the next shuffle, randomized so people don't step in sync.
						person.__nextMoveTime = elapsedSeconds + 6 + Math.random() * 20;
					} else {
						const eased = smoothstep(Math.max(0, t));
						person.__wanderX = person.__moveFromX + (person.__moveToX - person.__moveFromX) * eased;
						person.__wanderZ = person.__moveFromZ + (person.__moveToZ - person.__moveFromZ) * eased;
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
					const { x: blendedX, z: blendedZ } = evaluateBlendPath(person.__blendPath, currentPositionBlend);
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
					const isMoving = moveDx * moveDx + moveDz * moveDz > MOVE_FACING_EPSILON_SQ;
					if (isMoving) {
						const desiredYaw = Math.atan2(moveDz, moveDx);
						person.__facingYaw += shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
					}
					person.__walkAmount += ((isMoving ? 1 : 0) - person.__walkAmount) * walkAmountFactor;
					// How fast they're actually covering ground, smoothed the
					// same way as elsewhere — keeps the walk clip's rate in sync with real ground speed.
					const currentSpeed = dt > 0 ? Math.hypot(moveDx, moveDz) / dt : 0;
					person.__walkSpeed += (currentSpeed - person.__walkSpeed) * walkSpeedFactor;

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
						const push = ((COLLISION_RADIUS - dist) / COLLISION_RADIUS) * PUSH_STRENGTH * dt;
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
										((PERSON_COLLISION_RADIUS - pdist) / PERSON_COLLISION_RADIUS) *
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
					// The bar counters are solid, same as for the walker —
					// stops someone cutting through mid-stride during a zone-crossing walk.
					const finalX = resolveBarCollision(person.__x + wanderX + person.__offsetX, finalZ);

					// Within FACE_CAMERA_RADIUS, override the movement-based
					// facing and turn to look at the walker instead.
					const toWalkerX = renderWalkX - finalX;
					const toWalkerZ = renderWalkZ - finalZ;
					const distToWalkerSq = toWalkerX * toWalkerX + toWalkerZ * toWalkerZ;
					if (distToWalkerSq < FACE_CAMERA_RADIUS * FACE_CAMERA_RADIUS && distToWalkerSq > MOVE_FACING_EPSILON_SQ) {
						const desiredYaw = Math.atan2(toWalkerZ, toWalkerX);
						person.__facingYaw += shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
					}
					const yaw = person.__facingYaw;
					const heightScale = person.__heightScale;
					const widthScale = person.__widthScale;

					// LOD: this person's own body/shape is always what's
					// rendered (root stays visible) — only its color,
					// outline thickness, and whether its walk-cycle keeps
					// animating depend on distance (see LOD_COLOR_BANDS/pickLodBand above).
					const distToWalker = Math.sqrt(distToWalkerSq);
					const band = pickLodBand(distToWalker);
					const isFrozen = distToWalker > LOD_FREEZE_DISTANCE;

					const bodyMaterial = personBodyMaterials[i];
					const skinMaterial = personSkinMaterials[i];
					bodyMaterial.color.copy(personBaseColors[i]).multiplyScalar(band.brightness);
					bodyMaterial.userData.outlineParameters = { thickness: band.outlineThickness };
					skinMaterial.userData.outlineParameters = { thickness: band.outlineThickness };

					// Position/orient/scale this person's whole clone at once.
					// A subtle "breathing" wobble (Y scale) fades in as they stop, and out as they start walking.
					const root = personRoots[i];
					const baseHeightScale = heightScale * WALKER_SCALE_CORRECTION;
					const baseWidthScale = widthScale * WALKER_SCALE_CORRECTION;
					const breathAmount = 1 - person.__walkAmount;
					const breath =
						Math.sin(elapsedSeconds * BREATHING_SPEED + person.__breathPhase) * BREATHING_AMPLITUDE * breathAmount;
					root.position.set(finalX, 0, finalZ);
					root.rotation.y = yaw;
					root.scale.set(baseWidthScale, baseHeightScale * (1 + breath), baseWidthScale);

					// Advance this person's walk clip, cross-faded against
					// the frozen rest action by how much they're moving.
					// Playback rate separately tracks their ground speed
					// (WALK_ANIM_SPEED) instead of a flat 1x. Skipped once
					// far enough away (isFrozen) — no point paying for
					// skeletal animation on a body that's just a few pixels on screen.
					const mixer = personMixers[i];
					if (mixer && !isFrozen) {
						const walkAction = personWalkActions[i];
						const restAction = personRestActions[i];
						const speedScale = Math.min(
							MAX_WALK_TIMESCALE,
							Math.max(MIN_WALK_TIMESCALE, person.__walkSpeed / WALK_ANIM_SPEED)
						);
						walkAction.timeScale = person.__walkAmount * speedScale;
						walkAction.weight = person.__walkAmount;
						restAction.weight = 1 - person.__walkAmount;
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

					// This person's minimap dot — same flat placement as the
					// shadow, but fixed-size and floated above the crowd/
					// room (which the minimap camera never renders anyway) for a consistent, unlit position marker.
					placementHelper.position.set(finalX, FIGURE_HEIGHT + 1, finalZ);
					placementHelper.scale.setScalar(1);
					placementHelper.updateMatrix();
					minimapDots.setMatrixAt(i, placementHelper.matrix);
				}

				shadows.instanceMatrix.needsUpdate = true;
				minimapDots.instanceMatrix.needsUpdate = true;
			}

			// Recoloring: classifies the chosen variable as categorical (own
			// hue per value) or continuous (fade along a gradient), then writes a color per instance.

			function classifyVariable(variableKey) {
				const values = new Set();
				let numericCount = 0;
				let total = 0;
				for (const person of respondents) {
					const value = person[variableKey];
					if (value === null || value === undefined) continue;
					total++;
					if (typeof value === "number") numericCount++;
					values.add(value);
				}
				// "Continuous" means: almost all values are numbers, and there
				// are enough distinct ones that a discrete color per value
				// wouldn't be legible (e.g. AGE_Y1 has ~80 distinct ages).
				const isNumeric = total > 0 && numericCount / total > 0.9;
				const isContinuous = isNumeric && values.size > 15;
				return { isContinuous, values };
			}

			function continuousColor(t) {
				// Linear color interpolation from bright orange (t=0, low
				// values) to intense purple (t=1, high values).
				return new THREE.Color(CONTINUOUS_LOW_COLOR).lerp(new THREE.Color(CONTINUOUS_HIGH_COLOR), t);
			}

			function categoricalColor(index, count) {
				// Evenly rotate around the color wheel so any number of
				// categories get maximally-distinguishable hues.
				const hue = index / Math.max(count, 1);
				return new THREE.Color().setHSL(hue, 0.62, 0.56);
			}

			function applyColorVariable(variableKey) {
				let getColor;

				if (variableKey === "AFTER_DEATH_Y1" || variableKey === "AFTER_DEATH_Y2") {
					// Special-cased so the fixed answer colors always match the room zones, rather than categoricalColor().
					const noColor = new THREE.Color(NO_COLOR);
					const unsureColor = new THREE.Color(UNSURE_COLOR);
					const yesColor = new THREE.Color(YES_COLOR);
					getColor = (person) => {
						const value = person[variableKey];
						if (value === "Yes") return yesColor;
						if (value === "No") return noColor;
						return unsureColor;
					};
					legendData = {
						kind: "categorical",
						items: [
							{ label: "No", color: `#${noColor.getHexString()}` },
							{ label: "Unsure", color: `#${unsureColor.getHexString()}` },
							{ label: "Yes", color: `#${yesColor.getHexString()}` }
						]
					};
				} else {
					const { isContinuous, values } = classifyVariable(variableKey);

					if (isContinuous) {
						const numbers = [...values];
						const min = Math.min(...numbers);
						const max = Math.max(...numbers);
						const muted = new THREE.Color(MUTED_COLOR);
						getColor = (person) => {
							const value = person[variableKey];
							if (typeof value !== "number") return muted;
							const t = max > min ? (value - min) / (max - min) : 0.5;
							return continuousColor(t);
						};
						legendData = { kind: "continuous", min, max };
					} else {
						// Sort for a stable, vaguely meaningful color assignment.
						const sorted = [...values].sort((a, b) => (a > b ? 1 : a < b ? -1 : 0));
						const colorMap = new Map(
							sorted.map((value, i) => [value, categoricalColor(i, sorted.length)])
						);
						const muted = new THREE.Color(MUTED_COLOR);
						getColor = (person) => {
							const value = person[variableKey];
							return value === null || value === undefined ? muted : colorMap.get(value);
						};
						legendData = {
							kind: "categorical",
							// Cap the legend at 12 swatches; some variables have 23+ categories.
							items: sorted.slice(0, 12).map((value) => ({
								label: String(value),
								color: `#${colorMap.get(value).getHexString()}`
							})),
							overflow: Math.max(0, sorted.length - 12)
						};
					}
				}

				// Each person has their own body material, so tinting one
				// doesn't affect anyone else — the minimap dot mirrors the
				// same color. The body material itself is written every
				// frame in updatePeoplePositions from personBaseColors (darkened by LOD distance band), not here directly.
				for (let i = 0; i < respondents.length; i++) {
					const color = getColor(respondents[i]);
					personBaseColors[i].copy(color);
					minimapDots.setColorAt(i, color);
				}
				minimapDots.instanceColor.needsUpdate = true;
			}

			// Re-run whenever the dropdown's bound value changes. Reading
			// `selectedVariable` here (a $state variable) is what makes this
			// effect re-fire on change.
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

			// Non-null while the mouse button (or a touch) is down, holding
			// the last move event's position so each handler only looks at the delta since last time.
			let lastMouseDragX = null;
			let lastMouseDragY = null;
			let lastTouchY = null;
			let lastTouchX = null;
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
				return ((angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
			}

			function walk(rawDelta) {
				// Ignore input in top-down mode, and mid mode-switch transition (a stray scroll shouldn't yank the target).
				if (mode !== "walk" || transition) return;
				const delta = Math.max(-MAX_WHEEL_STEP, Math.min(MAX_WHEEL_STEP, rawDelta));
				// Forward direction on the ground plane for the current heading (pitch is never a factor).
				const forwardX = Math.sin(targetCameraYaw);
				const forwardZ = -Math.cos(targetCameraYaw);
				// Positive wheel delta ("scroll down") moves forward, like scrolling down a page carries you further in.
				const distance = delta * WALK_SPEED;
				targetWalkX = Math.min(MAX_WALK_X, Math.max(MIN_WALK_X, targetWalkX + forwardX * distance));
				targetWalkZ = Math.min(MAX_WALK_Z, Math.max(MIN_WALK_Z, targetWalkZ + forwardZ * distance));
				// The bar counters are solid — don't let a step carry the walker through except at an actual gap.
				targetWalkX = resolveBarCollision(targetWalkX, targetWalkZ);
				// Same idea for the vestibule's two walls — solid except at an open door or zone opening.
				targetWalkZ = resolveOuterDoorCollision(targetWalkX, targetWalkZ);
				targetWalkZ = resolveInnerWallCollision(targetWalkX, targetWalkZ);
				// And the corridors themselves — solid walls, not just a suggested path.
				({ x: targetWalkX, z: targetWalkZ } = resolveVestibuleCollision(targetWalkX, targetWalkZ));
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
				container.style.cursor = "grab";
			}

			function handleMouseMove(event) {
				if (lastMouseDragX === null) return;
				const rect = container.getBoundingClientRect();
				const dxNormalized = (lastMouseDragX - event.clientX) / rect.width;
				targetCameraYaw = wrapAngle(targetCameraYaw + dxNormalized * DRAG_LOOK_RADIANS_PER_SWIPE);
				lastMouseDragX = event.clientX;
				// Inverted: drag up to look down, drag down to look up — clamped short of straight up/down.
				const dyNormalized = (event.clientY - lastMouseDragY) / rect.height;
				targetCameraPitch = Math.max(
					-MAX_DRAG_PITCH,
					Math.min(MAX_DRAG_PITCH, targetCameraPitch + dyNormalized * DRAG_LOOK_RADIANS_PER_SWIPE)
				);
				lastMouseDragY = event.clientY;
			}

			function handleMouseUp() {
				lastMouseDragX = null;
				lastMouseDragY = null;
				container.style.cursor = "all-scroll";
			}

			function handleTouchMove(event) {
				const touch = event.touches[0];
				if (!touch) return;
				event.preventDefault(); // don't let the page scroll/bounce under our drag
				// A horizontal drag turns the camera proportional to drag
				// distance — drag right to look left, like dragging the room itself. No clamp on full rotation.
				if (lastTouchX !== null) {
					const rect = container.getBoundingClientRect();
					const dxNormalized = (lastTouchX - touch.clientX) / rect.width;
					targetCameraYaw = wrapAngle(targetCameraYaw + dxNormalized * DRAG_LOOK_RADIANS_PER_SWIPE);
				}
				lastTouchX = touch.clientX;
				// Touch has no wheel, so a vertical drag stands in for
				// scroll — opposite convention from the wheel: dragging down walks forward.
				if (lastTouchY !== null) {
					walk(touch.clientY - lastTouchY);
				}
				lastTouchY = touch.clientY;
			}

			function handleTouchEnd() {
				lastTouchY = null;
				lastTouchX = null;
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
			container.addEventListener("touchmove", handleTouchMove, { passive: false });
			container.addEventListener("touchend", handleTouchEnd);
			window.addEventListener("keydown", handleKeyDown);

			// Camera pose + walk <-> top-down transition. computeWalkPose()/
			// computeTopdownPose() are pure functions of current state, letting us capture from/to poses and blend them.

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
				return { position: poseHelper.position.clone(), quaternion: poseHelper.quaternion.clone() };
			}

			function computeTopdownPose() {
				poseHelper.position.set(0, TOPDOWN_HEIGHT, HALF_DEPTH * 0.15);
				poseHelper.up.set(0, 0, -1); // keep "forward" (young) pointing up-screen
				poseHelper.lookAt(0, 0, HALF_DEPTH * 0.15);
				return { position: poseHelper.position.clone(), quaternion: poseHelper.quaternion.clone() };
			}

			// Non-null while a walk<->topdown blend is in progress: the
			// start timestamp plus the poses being blended between. Plain
			// (non-reactive) state — the render loop reads it every frame,
			// so it doesn't need to be a Svelte rune.
			let transition = null;
			let previousMode = mode;

			// Fires only when `mode` actually changes. Both poses are
			// computed from current live state, capturing wherever the camera happens to be as the start point.
			$effect(() => {
				const newMode = mode;
				if (newMode === previousMode) return;
				transition = {
					start: performance.now(),
					from: previousMode === "topdown" ? computeTopdownPose() : computeWalkPose(),
					to: newMode === "topdown" ? computeTopdownPose() : computeWalkPose()
				};
				previousMode = newMode;
			});

			function updateCamera() {
				// See walkFog above: the topdown camera is high enough that
				// the walk-mode fog distances would fog the whole floor to
				// near-black, so fog is simply off while looking top-down.
				scene.fog = mode === "topdown" ? null : walkFog;

				if (transition) {
					const t = Math.min(1, (performance.now() - transition.start) / MODE_TRANSITION_MS);
					const eased = t * t * (3 - 2 * t); // smoothstep: ease in and out
					camera.position.lerpVectors(transition.from.position, transition.to.position, eased);
					camera.quaternion.slerpQuaternions(transition.from.quaternion, transition.to.quaternion, eased);
					if (t >= 1) transition = null;
					return;
				}

				const pose = mode === "topdown" ? computeTopdownPose() : computeWalkPose();
				camera.position.copy(pose.position);
				camera.quaternion.copy(pose.quaternion);
			}

			// Same pattern as the camera's walk<->topdown transition, but
			// blending each person's Y1/Y2 layout (0 = Y1, 1 = Y2) instead of a camera pose.
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
				const t = Math.min(1, (performance.now() - positionTransition.start) / POSITION_TRANSITION_MS);
				const eased = t * t * (3 - 2 * t); // smoothstep
				currentPositionBlend =
					positionTransition.from + (positionTransition.to - positionTransition.from) * eased;
				if (t >= 1) positionTransition = null;
			}

			function handleResize() {
				const w = container.clientWidth;
				const h = container.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				effect.setSize(w, h);
			}
			window.addEventListener("resize", handleResize);

			// Initial layout pass (dt = 0 means no decay/push happens yet,
			// just base positions written into the instance matrices).
			updatePeoplePositions(0, 0);

			let frameId;
			let lastFrameTime = performance.now();
			const animationStart = lastFrameTime;
			function animate() {
				frameId = requestAnimationFrame(animate);

				const now = performance.now();
				// Clamp dt so e.g. switching browser tabs for a while doesn't
				// cause a giant catch-up jump on the next frame.
				const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
				lastFrameTime = now;

				// Glide the rendered walk position toward the input-driven
				// target. This exponential ("critically damped") follow is
				// frame-rate independent: after FOLLOW_TIME seconds, ~63% of
				// the remaining distance has been closed, regardless of fps.
				const followFactor = 1 - Math.exp(-dt / FOLLOW_TIME);
				renderWalkX += (targetWalkX - renderWalkX) * followFactor;
				renderWalkZ += (targetWalkZ - renderWalkZ) * followFactor;

				// Steering (yaw/pitch) snaps straight to the drag input —
				// no follow-time smoothing — so looking around tracks the
				// mouse/touch instantly instead of trailing behind it.
				cameraYaw = targetCameraYaw;
				cameraPitch = targetCameraPitch;

				updatePositionBlend();
				updatePeoplePositions(dt, (now - animationStart) / 1000);
				updateCamera();
				updateDoors(dt);
				currentAge = zToAge(renderWalkZ);

				// OutlineEffect's backface-inflation technique breaks down
				// for the topdown camera's near-vertical look angle — it was
				// producing a screen-filling black outline shell instead of
				// a thin rim, making the whole view look solid black.
				// Topdown is a functional overview rather than part of the
				// stylized outlined look anyway, so it just skips the effect and renders plainly.
				if (mode === "topdown") {
					renderer.render(scene, camera);
				} else {
					effect.render(scene, camera);
				}
				renderMinimap();
			}
			animate();

			// Returned to onMount's outer scope and called on teardown.
			return () => {
				cancelAnimationFrame(frameId);
				window.removeEventListener("resize", handleResize);
				container.removeEventListener("wheel", handleWheel);
				container.removeEventListener("mousedown", handleMouseDown);
				container.removeEventListener("mousemove", handleMouseMove);
				window.removeEventListener("mouseup", handleMouseUp);
				container.removeEventListener("touchmove", handleTouchMove);
				container.removeEventListener("touchend", handleTouchEnd);
				window.removeEventListener("keydown", handleKeyDown);
				renderer.dispose();
				shadowGeometry.dispose();
				sideWallGeometry.dispose();
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

<div class="lifedeath-room" bind:this={container}>
	<ControlPanel
		{variableOptions}
		bind:selectedVariable
		{legendData}
		bind:mode
		bind:positionMode
		{currentAge}
		{loadingMessage}
	/>
</div>

<style>
	.lifedeath-room {
		position: relative;
		width: 100%;
		height: 100vh;
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
</style>
