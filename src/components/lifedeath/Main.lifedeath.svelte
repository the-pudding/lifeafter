<script>
	// Svelte lifecycle hook: runs once after this component mounts to the DOM.
	// We use it to set up (and later tear down) the three.js scene, since
	// three.js needs a real <canvas> element to attach to.
	import { onMount } from "svelte";
	// The whole three.js library, namespaced as THREE (e.g. THREE.Scene).
	import * as THREE from "three";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	// Deep-clones a rigged/animated GLTF scene graph, including giving the
	// clone its own independent skeleton — a plain Object3D.clone() would
	// share bones (and so animation state) across every instance.
	import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";
	// A name -> human-readable-label lookup for every column in people.json,
	// e.g. "AFTER_DEATH_Y1" -> "Belief in life after death (Year 1)". This
	// file is small (232 short strings) so it's safe to bundle directly.
	import variableLabels from "$data/variable_labels.json";
	// The overlay UI (dropdown, legend, mode buttons) — split out since it's
	// plain presentational markup with no three.js of its own.
	import ControlPanel from "./ControlPanel.svelte";

	// The person sample itself (~17MB) lives in static/ and is fetched at
	// runtime (see onMount below), rather than imported as a JS module.
	// Importing a file this size would embed it straight into the JS
	// bundle — parsing/holding that much data blows well past the tighter
	// per-tab memory limits mobile browsers enforce, and the page simply
	// fails to load there, even though desktop has enough headroom not to
	// notice. Fetching it as JSON after the page/bundle has already loaded
	// avoids that entirely.
	const PEOPLE_DATA_URL = "/data/people.json";
	// A small, low-poly rigged humanoid with a baked-in "Walk" animation
	// clip — each person in the crowd gets their own cloned instance (see
	// buildScene) rather than the earlier hand-built, procedurally-swung
	// capsule figures. CC-BY-4.0 (Sketchfab, "Base Mesh 246 Tri" by
	// assblasterplastered) — needs attribution if this ships publicly.
	const WALKER_GLB_URL = "/assets/app/base_mesh_246_tri_walking.glb";

	// ---------------------------------------------------------------------
	// Fixed colors for the default "recolor by" variable (AFTER_DEATH_Y1).
	// ---------------------------------------------------------------------
	const NO_COLOR = 0x3b0764; // dark purple — "No"
	const YES_COLOR = 0xff2ec4; // bright magenta — "Yes"
	// The two ends of the gradient used for any *continuous numeric*
	// variable the user picks from the dropdown (see continuousColor()) —
	// its own palette, separate from the No/Yes categorical colors above.
	const CONTINUOUS_LOW_COLOR = 0xff7a00; // bright orange — low values
	const CONTINUOUS_HIGH_COLOR = 0x9d00ff; // intense purple — high values
	// Used for missing/null values, or a "before you pick a category" gray.
	const MUTED_COLOR = 0x55505f;

	// ---------------------------------------------------------------------
	// Room dimensions, in arbitrary "world units" (roughly meters, since our
	// person figures are ~1.3 units tall — see BODY_/HEAD_ constants below).
	// ---------------------------------------------------------------------
	// Sized for the ~1,850 people who end up with a valid Yes/No + age (out
	// of the 2,500 sampled). The x-placement formula below clusters people
	// within about ±0.57 * HALF_WIDTH of center, so the width is trimmed
	// down from an earlier, wider draft to match that footprint instead of
	// leaving a wide empty margin along each side wall.
	const ROOM_WIDTH = 44; // left/right (No <-> Yes)
	const ROOM_DEPTH = 100; // front/back (younger <-> older)
	const ROOM_HEIGHT = 50;

	// Half-extents are used constantly below, so compute them once.
	const HALF_WIDTH = ROOM_WIDTH / 2;
	const HALF_DEPTH = ROOM_DEPTH / 2;

	// ---------------------------------------------------------------------
	// Each person is a clone of WALKER_GLB_URL — a real rigged, skinned
	// humanoid mesh with a baked-in "Walk" animation clip — rather than a
	// hand-built procedural figure. Its bounding box (measured once via a
	// throwaway prototype) is ~0.62 x 1.85 x 0.28 world units, i.e. already
	// modeled at roughly human scale in meters, so FIGURE_HEIGHT below is
	// just that known height rather than something computed from anatomy
	// constants.
	// ---------------------------------------------------------------------
	// Total figure height, from floor to top of head — used to pick a camera
	// eye height that feels "among" the people rather than towering over them.
	const FIGURE_HEIGHT = 2;
	// A soft, cheap "blob shadow" disc on the floor under each person —
	// simpler and far cheaper than real shadow-mapping (which would mean a
	// shadow-casting point light rendering a cube map for every one of
	// these instances), and reads fine for small ground-level figures.
	const SHADOW_RADIUS = 0.4;

	// ---------------------------------------------------------------------
	// Walk-cycle animation: each person's own THREE.AnimationMixer plays
	// the GLB's "Walk" clip, sped up/down by how much they're actually
	// moving (see updatePeoplePositions, which combines the Y1/Y2 blend
	// walk and local wander shuffle into one per-frame movement vector).
	// The clip only has one pose per moment though — no separate "standing
	// still" animation — so a fully stopped person would otherwise freeze
	// wherever mid-stride they happened to stop. To avoid that, each person
	// actually runs *two* actions (see buildScene): the Walk clip playing
	// normally, and a synthetic single-frame "bind pose" clip (legs/arms
	// straight, however the model was actually modeled/rigged) held
	// frozen, cross-faded by weight as __walkAmount rises/falls — so
	// stopping settles back toward standing normally instead of freezing
	// mid-step.
	// ---------------------------------------------------------------------
	// How fast a person's facing turns to match their current direction of
	// travel, and how fast their walk-amount fades in/out as they start/stop
	// moving — both frame-rate independent, same pattern as FOLLOW_TIME
	// below but for the crowd instead of the camera.
	const FACING_TURN_TIME = 0.3; // seconds to close ~63% of the remaining turn
	const WALK_AMOUNT_SMOOTH_TIME = 0.25; // seconds to close ~63% of the fade in/out
	// Below this squared per-frame displacement, a person is considered at
	// rest (not turning or animating) rather than reacting to floating
	// point noise.
	const MOVE_FACING_EPSILON_SQ = 1e-6;
	// Within this distance of the walker, a person turns to face the
	// camera directly instead of whichever way they're actually moving —
	// like they've noticed you and are looking your way as you pass by.
	const FACE_CAMERA_RADIUS = 3.5;
	// A subtle vertical "breathing" wobble while standing still, fading out
	// as __walkAmount rises toward "walking" — scales the whole figure's Y
	// axis slightly rather than targeting a specific chest/spine bone,
	// since bone names vary between GLB rigs.
	const BREATHING_AMPLITUDE = 0.012; // fraction of height, peak scale change
	const BREATHING_SPEED = (2 * Math.PI) / 3.6; // radians/sec (~3.6s per breath)

	// ---------------------------------------------------------------------
	// First-person "walk" camera tuning.
	// ---------------------------------------------------------------------
	// A little above the figures' own head height — enough to see over the
	// crowd rather than being buried in it, while still feeling ground-level.
	const EYE_HEIGHT = FIGURE_HEIGHT * 1;
	// Steering is an explicit click-and-hold drag (touch: just touch-and-
	// drag) — horizontal motion turns the camera directly, proportional to
	// how far you've dragged, same gesture on mouse and touch. Scrolling
	// (or, on touch, a vertical drag) *only* ever walks forward/back along
	// wherever you're currently facing — it never turns you on its own, so
	// dragging is the only way to change heading. A drag all the way across
	// the container's width turns you this many radians; no clamp, so
	// dragging the same direction keeps turning all the way around,
	// including facing backward.
	const DRAG_LOOK_RADIANS_PER_SWIPE = Math.PI / 2;
	// A mouse-drag also tilts the view up/down (touch-drag doesn't — that
	// axis is already spoken for as the walk gesture there), clamped so you
	// can look a good way up/down without ever quite flipping past
	// straight-up/-down.
	const MAX_DRAG_PITCH = (60 * Math.PI) / 180;
	const WALK_SPEED = 0.007; // world units of *target* movement per unit of (clamped) wheel delta
	const MAX_WHEEL_STEP = 45; // clamp a single wheel event so trackpad flings don't teleport you
	// The camera doesn't jump straight to each new wheel-driven position —
	// it glides toward it. Smaller = snappier, larger = more sluggish.
	const FOLLOW_TIME = 0.18; // seconds to close ~63% of the remaining distance
	// Same idea, but for steering: the camera turns toward its new heading/
	// tilt rather than snapping instantly there.
	const TURN_FOLLOW_TIME = 0.35;
	// Keep the walker a little inside the walls/back wall/entrance so the
	// camera's near-clipping plane never pokes through geometry.
	const WALK_MARGIN = 3;
	const MIN_WALK_X = -HALF_WIDTH + WALK_MARGIN;
	const MAX_WALK_X = HALF_WIDTH - WALK_MARGIN;
	const MIN_WALK_Z = -HALF_DEPTH + WALK_MARGIN;
	const MAX_WALK_Z = HALF_DEPTH - WALK_MARGIN + 1;

	// ---------------------------------------------------------------------
	// Collision "nudging": when the walker gets close to a person, that
	// person is pushed sideways out of the way rather than blocking you (or
	// letting you walk through them). Each person has a small (offsetX,
	// offsetZ) displacement from their base position that grows while
	// you're nearby and decays back toward zero once you've moved on.
	// ---------------------------------------------------------------------
	const COLLISION_RADIUS = 1.1; // how close (world units) before a person gets nudged
	const PUSH_STRENGTH = 12; // how hard they're pushed, per second, at maximum overlap
	const MAX_OFFSET = 1.6; // a person can never be nudged further than this from their spot
	const OFFSET_RETURN_TIME = 0.6; // seconds for a nudge to mostly relax back
	// People also nudge *each other* aside — e.g. two people shuffling
	// toward the same spot — checked via a spatial hash grid each frame
	// (see personGrid below) rather than an O(n²) all-pairs scan.
	const PERSON_COLLISION_RADIUS = 0.8; // just under the ~0.85 spawn spacing, so resting people don't jitter
	const PERSON_PUSH_STRENGTH = 3;
	const PERSON_CELL_SIZE = PERSON_COLLISION_RADIUS;

	// ---------------------------------------------------------------------
	// Top-down view: a fixed camera pose looking straight down at the whole
	// room, toggled by the button in the overlay. Switching between this and
	// walk mode animates smoothly rather than cutting instantly.
	// ---------------------------------------------------------------------
	const TOPDOWN_HEIGHT = ROOM_DEPTH * 0.9;
	const MODE_TRANSITION_MS = 1250;

	// How long the whole crowd takes to walk from their Y1 layout to their
	// Y2 layout (or back) when the button below is toggled — much longer
	// than the camera's mode transition, since this is people crossing the
	// room, not just a viewpoint blend.
	const POSITION_TRANSITION_MS = 3500;

	// `mode` switches between the two camera behaviors; `selectedVariable`
	// drives the recolor-by-variable dropdown; `renderStyle` switches
	// between the normal render and a blocky "8-bit" pixel-art look;
	// `positionMode` switches which wave's layout the crowd is walking
	// toward. All four are Svelte 5 "runes" state — reading them (even from
	// a plain function, like inside the render loop below) always sees the
	// latest value.
	let mode = $state("walk"); // "walk" | "topdown"
	let selectedVariable = $state("AFTER_DEATH_Y1");
	let renderStyle = $state("smooth"); // "smooth" | "pixel"
	let positionMode = $state("Y1"); // "Y1" | "Y2"
	// A small summary of the current color mapping, rendered as a legend.
	// Either { kind: "categorical", items: [{label, color, count}, ...] }
	// or { kind: "continuous", min, max }.
	let legendData = $state(null);
	// Non-empty until the people.json fetch and the walker GLB (see onMount)
	// have both resolved; the control panel shows this instead of its
	// normal controls until then.
	let loadingMessage = $state("Loading people…");

	// The <div> that three.js's <canvas> gets appended into.
	let container;

	// Sorted list of dropdown options: every column in people.json, labeled
	// with its human-readable description where we have one.
	const variableOptions = Object.keys(variableLabels)
		.map((key) => ({ key, label: variableLabels[key] || key }))
		.sort((a, b) => a.label.localeCompare(b.label));

	onMount(() => {
		// `disposed` guards against the fetch below resolving after the
		// user has already navigated away and this component was torn down.
		let disposed = false;
		// Replaced with the real teardown function once buildScene() runs.
		let cleanup = () => {};

		function loadWalkerGLB() {
			return new Promise((resolve, reject) => {
				new GLTFLoader().load(WALKER_GLB_URL, resolve, undefined, reject);
			});
		}

		(async () => {
			// Fetch the person data and the walker model in parallel — both
			// are needed before there's anything meaningful to build.
			const [response, gltf] = await Promise.all([fetch(PEOPLE_DATA_URL), loadWalkerGLB()]);
			const rawPeople = await response.json();
			if (disposed) return;
			// buildScene() creates a $effect() internally to react to color
			// changes. Effects normally can only be created synchronously
			// during component init, but this all runs after an `await`, so
			// we open an explicit effect scope with $effect.root() and fold
			// its teardown into buildScene()'s own cleanup.
			let sceneCleanup = () => {};
			const disposeRoot = $effect.root(() => {
				sceneCleanup = buildScene(rawPeople, gltf);
			});
			cleanup = () => {
				sceneCleanup();
				disposeRoot();
			};
			loadingMessage = "";
		})();

		function buildScene(rawPeople, gltf) {
			// Only respondents with a clean Yes/No answer (not "Unsure" or a
			// non-response) and a real numeric age *in both waves* get a
			// figure — Y1 fields drive their starting layout, Y2 fields
			// drive where they walk to when the Y2 toggle is on.
			const respondents = rawPeople.filter(
				(d) =>
					(d.AFTER_DEATH_Y1 === "No" || d.AFTER_DEATH_Y1 === "Yes") &&
					typeof d.AGE_Y1 === "number" &&
					(d.AFTER_DEATH_Y2 === "No" || d.AFTER_DEATH_Y2 === "Yes") &&
					typeof d.AGE_Y2 === "number"
			);

			// One shared age -> depth scale for both waves (rather than each
			// wave separately stretching to fill the room), so a given age
			// lands at the same depth whether it came from Y1 or Y2 — the
			// two layouts are visually comparable, not just individually
			// "full."
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

			// Computes a full collision-free layout for one wave (Y1 or Y2):
			// rejection sampling against a spatial hash grid rather than
			// pure independent randomness, so nobody spawns on top of (or
			// overlapping) anyone else. Horizontally, people are spread
			// evenly across nearly the full width of their side (just a
			// small center-aisle gap and wall margin) — only the z (depth)
			// position is driven by age. Returns an array of {x, z} parallel
			// to `respondents`. Run once for Y1 and once for Y2 below, so
			// every person has both a starting layout and a "walk to when
			// toggled" layout.
			function computeLayout(getSide, getAge) {
				const MIN_SPACING = 0.85; // minimum center-to-center distance between any two people
				const cellSize = MIN_SPACING;
				const occupiedCells = new Map(); // "cx,cz" -> [{x, z}, ...]

				function cellKeyFor(x, z) {
					return `${Math.floor(x / cellSize)},${Math.floor(z / cellSize)}`;
				}

				function farEnoughFromEveryoneElse(x, z) {
					const cx = Math.floor(x / cellSize);
					const cz = Math.floor(z / cellSize);
					// A person can only ever be too close to someone in the
					// same or an adjacent cell, since cells are sized to
					// MIN_SPACING.
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

				// Horizontal placement uses nearly the full width on each
				// side — just a small gap at the center aisle and a small
				// margin from the side walls — so people are spread evenly
				// across the room rather than clustered toward the center.
				const CENTER_GAP = 0.5;
				const WALL_MARGIN = 1.5;
				const X_RANGE = HALF_WIDTH - CENTER_GAP - WALL_MARGIN;

				return respondents.map((person) => {
					const side = getSide(person);
					const baseZ = ageToZ(getAge(person));

					let x, z;
					const MAX_ATTEMPTS = 40;
					for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
						// Widen the search area a bit on each retry so dense
						// age bands (many people sharing almost the same z)
						// still find room instead of exhausting all 40
						// attempts.
						const widen = 1 + attempt / MAX_ATTEMPTS;
						x = side * (CENTER_GAP + Math.random() * Math.min(X_RANGE * widen, HALF_WIDTH - WALL_MARGIN));
						z = baseZ + (Math.random() - 0.5) * (ROOM_DEPTH / 40) * widen;
						if (farEnoughFromEveryoneElse(x, z)) break;
					}
					// (If every attempt failed — extremely unlikely at this
					// density — we just keep the last, closest-fit candidate
					// rather than leaving the person unplaced.)

					const key = cellKeyFor(x, z);
					if (!occupiedCells.has(key)) occupiedCells.set(key, []);
					occupiedCells.get(key).push({ x, z });

					return { x, z };
				});
			}

			const y1Layout = computeLayout(
				(p) => (p.AFTER_DEATH_Y1 === "No" ? -1 : 1),
				(p) => p.AGE_Y1
			);
			const y2Layout = computeLayout(
				(p) => (p.AFTER_DEATH_Y2 === "No" ? -1 : 1),
				(p) => p.AGE_Y2
			);

			respondents.forEach((person, i) => {
				// The fixed Y1/Y2 layout endpoints; __x/__z (below) is
				// wherever between them the room is currently showing —
				// see currentPositionBlend in updatePeoplePositions.
				person.__xY1 = y1Layout[i].x;
				person.__zY1 = y1Layout[i].z;
				person.__xY2 = y2Layout[i].x;
				person.__zY2 = y2Layout[i].z;
				person.__x = person.__xY1;
				person.__z = person.__zY1;
				person.__offsetX = 0;
				person.__offsetZ = 0;
				// Per-person size variation, so the crowd isn't a field of
				// identical clones — scales the whole walker model uniformly.
				person.__bodyScale = 0.9 + Math.random() * 0.2;
				// Which way this person is facing (radians; see
				// updatePeoplePositions, which turns this smoothly toward
				// whichever way they're actually moving each frame — Y1/Y2
				// blend walk, local wander shuffle, or both combined — so
				// they only ever move "forward.") Starts random.
				person.__facingYaw = Math.random() * Math.PI * 2;
				// 0..1, how "in motion" this person is right now — eases
				// the leg/arm swing in and out as they start/stop moving
				// (see updatePeoplePositions).
				person.__walkAmount = 0;
				// Ambient wandering is an idle <-> shuffle state machine (see
				// updateWander below), not continuous motion: each person
				// mostly stands still at (wanderX, wanderZ) within their own
				// small "assigned area" around their base spot, and every so
				// often shuffles to a new nearby resting spot. Starting
				// idle-until times are staggered randomly so the whole room
				// doesn't shuffle in lockstep.
				person.__wanderRadius = 0.35 + Math.random() * 0.4;
				person.__wanderX = 0;
				person.__wanderZ = 0;
				person.__moving = false;
				person.__moveFromX = 0;
				person.__moveFromZ = 0;
				person.__moveToX = 0;
				person.__moveToZ = 0;
				person.__moveStart = 0;
				person.__moveDuration = 1;
				person.__nextMoveTime = 1.5 + Math.random() * 6;
				// 0..1 progress through the current shuffle (0 when idle) —
				// eases the shuffle's own position interpolation.
				person.__moveT = 0;
				// A random 0..1 fraction of the walk clip's duration, so each
				// person's AnimationMixer starts at a different point in the
				// cycle instead of the whole crowd stepping in unison (see
				// where each person's mixer is created below).
				person.__animOffsetFraction = Math.random();
				// A random phase seed for the idle breathing wobble, so the
				// crowd doesn't all breathe in unison either.
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
			scene.fog = new THREE.Fog(BG_COLOR, ROOM_DEPTH * 0.55, ROOM_DEPTH * 1.3);

			const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 800);

			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setSize(width, height);
			container.appendChild(renderer.domElement);

			// --- "8-bit" pixel-art render mode ---
			//
			// The trick: render the real scene into a low-resolution offscreen
			// target (a fraction of the canvas's actual pixel size), then draw
			// that target's texture, magnified with *nearest-neighbor* (i.e.
			// blocky, not smoothed) filtering, onto a fullscreen quad in the
			// real canvas. That upscale is what produces the chunky pixel
			// look — nothing about the 3D scene itself changes.
			const PIXEL_DOWNSCALE = 7; // how blocky — 1 offscreen pixel covers this many screen pixels
			const pixelRenderTarget = new THREE.WebGLRenderTarget(1, 1, {
				minFilter: THREE.NearestFilter,
				magFilter: THREE.NearestFilter,
				// Anti-alias the low-res render itself (before the blocky
				// nearest-neighbor upscale) so each big "pixel" is a clean
				// blended color — like a hand-placed pixel-art tile — rather
				// than a single aliased sample that shimmers/flickers as the
				// camera moves.
				samples: 4
			});
			const pixelScene = new THREE.Scene();
			const pixelCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
			const pixelQuadGeometry = new THREE.PlaneGeometry(2, 2);
			const pixelQuadMaterial = new THREE.MeshBasicMaterial({ map: pixelRenderTarget.texture });
			pixelScene.add(new THREE.Mesh(pixelQuadGeometry, pixelQuadMaterial));

			function updatePixelTargetSize() {
				const w = Math.max(1, Math.floor(container.clientWidth / PIXEL_DOWNSCALE));
				const h = Math.max(1, Math.floor(container.clientHeight / PIXEL_DOWNSCALE));
				pixelRenderTarget.setSize(w, h);
			}
			updatePixelTargetSize();

			// --- Lighting: the room's dominant light source is a bright
			// doorway at the far (back) end — like a "walk toward the
			// light" scene — so distant, older figures near the doorway are
			// brightly lit while everything closer to the entrance falls
			// off toward black. A second light at the entrance (front) end
			// mirrors it at half the intensity, so the room isn't lit from
			// only one direction, without competing with the back doorway
			// as the room's obvious main light. Two much dimmer fill
			// lights — one from the top, one from the back — round out the
			// shading further. ---

			const doorLight = new THREE.PointLight(0xfff4e0, 950, ROOM_DEPTH * 1.4, 1.5);
			doorLight.position.set(0, ROOM_HEIGHT * 0.35, -HALF_DEPTH + 1.5);
			scene.add(doorLight);

			const frontLight = new THREE.PointLight(0xfff4e0, doorLight.intensity * 0.5, ROOM_DEPTH * 1.4, 1.5);
			frontLight.position.set(0, ROOM_HEIGHT * 0.35, HALF_DEPTH - 1.5);
			scene.add(frontLight);

			const topFillLight = new THREE.PointLight(0xfff4e0, 45, ROOM_DEPTH * 1.2, 1.5);
			topFillLight.position.set(0, ROOM_HEIGHT * 0.85, 0);
			scene.add(topFillLight);

			const backFillLight = new THREE.PointLight(0xfff4e0, 70, ROOM_DEPTH * 1.2, 1.5);
			backFillLight.position.set(0, ROOM_HEIGHT * 0.5, -HALF_DEPTH + 4);
			scene.add(backFillLight);

			// A self-illuminated (unlit-by-scene-lighting) bright rectangle
			// standing in for the doorway opening itself, so the light
			// source has a visible origin rather than glowing from nowhere.
			const doorGlow = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH * 0.1, ROOM_HEIGHT * 0.4),
				new THREE.MeshBasicMaterial({ color: 0xfff4e0 })
			);
			doorGlow.position.set(0, ROOM_HEIGHT * 0.24, -HALF_DEPTH + 0.05);
			scene.add(doorGlow);

			// --- The room shell: floor, ceiling, back wall, two side walls,
			// and a faint glass-like front wall at the entrance. Because the
			// walk camera's position is clamped (see WALK_MARGIN above)
			// rather than freely orbiting, the shell can just match the room
			// bounds exactly — there's no risk of the camera ending up
			// outside it and seeing an unlit exterior face. ---

			const floor = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH),
				new THREE.MeshStandardMaterial({ color: 0x07050c, roughness: 1 })
			);
			floor.rotation.x = -Math.PI / 2; // lay the plane flat
			scene.add(floor);

			const ceiling = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_DEPTH),
				new THREE.MeshStandardMaterial({ color: 0x120e1c, roughness: 1 })
			);
			ceiling.rotation.x = Math.PI / 2;
			ceiling.position.y = ROOM_HEIGHT;
			scene.add(ceiling);

			// A faint floor grid, purely decorative, to help convey scale
			// and depth as you walk.
			const grid = new THREE.GridHelper(Math.max(ROOM_WIDTH, ROOM_DEPTH), 32, 0x4a3860, 0x2a2038);
			grid.position.y = 0.01; // avoid z-fighting with the floor plane
			scene.add(grid);

			// A thick painted-looking line straight down the center of the
			// floor, separating the No side from the Yes side. Unlit
			// (MeshBasicMaterial) so it stays visible regardless of how dim
			// the doorway light is at that point in the room.
			const centerLine = new THREE.Mesh(
				new THREE.PlaneGeometry(0.4, ROOM_DEPTH),
				new THREE.MeshBasicMaterial({ color: 0x9c96a3 })
			);
			centerLine.rotation.x = -Math.PI / 2;
			centerLine.position.y = 0.02; // above the floor/grid, avoiding z-fighting
			scene.add(centerLine);

			const backWall = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_HEIGHT),
				new THREE.MeshStandardMaterial({ color: 0x2a2036, roughness: 1 })
			);
			backWall.position.set(0, ROOM_HEIGHT / 2, -HALF_DEPTH);
			scene.add(backWall);

			// The front "wall" is a dark, closed door — the camera starts
			// just inside it, facing away toward the bright doorway at the
			// far end. Solid and unlit-by-design (MeshBasicMaterial ignores
			// scene lights entirely) so it reads as flat black regardless of
			// the doorLight's reach, unlike the lit MeshStandardMaterial
			// walls elsewhere in the room.
			const frontWall = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH, ROOM_HEIGHT * 1.2),
				new THREE.MeshBasicMaterial({ color: 0x050308, side: THREE.DoubleSide })
			);
			frontWall.position.set(0, (ROOM_HEIGHT * 1.2) / 2, HALF_DEPTH);
			scene.add(frontWall);

			// A slightly darker inset rectangle on the front wall, reading
			// as the closed door shape itself.
			const doorFrame = new THREE.Mesh(
				new THREE.PlaneGeometry(ROOM_WIDTH * 0.1, ROOM_HEIGHT * 0.4),
				new THREE.MeshBasicMaterial({ color: 0x000000 })
			);
			doorFrame.position.set(0, ROOM_HEIGHT * 0.24, HALF_DEPTH - 0.05);
			scene.add(doorFrame);

			const sideWallGeometry = new THREE.PlaneGeometry(ROOM_DEPTH, ROOM_HEIGHT);
			const sideWallMaterial = new THREE.MeshStandardMaterial({
				color: 0x241c30,
				roughness: 1,
				side: THREE.DoubleSide
			});

			const leftWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
			leftWall.position.set(-HALF_WIDTH, ROOM_HEIGHT / 2, 0);
			leftWall.rotation.y = Math.PI / 2;
			scene.add(leftWall);

			const rightWall = leftWall.clone();
			rightWall.position.x = HALF_WIDTH;
			scene.add(rightWall);

			// --- The people themselves: each is its own clone of the walker
			// GLB (see WALKER_GLB_URL), with an independent skeleton (so
			// each can be mid-stride at a different point) and an
			// independent material (so applyColorVariable can tint each one
			// separately — clone() shares materials by reference otherwise,
			// same as any three.js Object3D clone). Position/rotation/scale
			// and each mixer's playback are updated every frame in
			// updatePeoplePositions. A shared InstancedMesh still handles
			// the (much simpler, non-skinned) blob shadow under everyone. ---

			const walkClip = gltf.animations.find((a) => a.name === "Walk") ?? gltf.animations[0];
			// Different GLB exports have wildly different native scales (one
			// walker measured ~1.85 world units tall, matching FIGURE_HEIGHT
			// almost exactly; another came in ~270 units tall, apparently
			// modeled in centimeters or some other unrelated unit). Rather
			// than hardcode a fix for one file, measure whatever was loaded
			// and derive a correction that normalizes it to FIGURE_HEIGHT,
			// so swapping in a differently-scaled model just works.
			const walkerHeight = new THREE.Box3().setFromObject(gltf.scene).getSize(new THREE.Vector3()).y;
			const WALKER_SCALE_CORRECTION = walkerHeight > 0 ? FIGURE_HEIGHT / walkerHeight : 1;

			// A synthetic single-frame clip capturing each animated bone's
			// *current* transform — called here, before any clone or mixer
			// has touched gltf.scene, so "current" means the model's actual
			// bind pose (whatever pose it was modeled/rigged in). That's a
			// far more reliable "standing normally" reference than picking
			// an arbitrary frame out of the Walk clip (which could freeze
			// mid-stride, one leg forward, arms swinging) — and it works
			// for any rig, since it just mirrors the Walk clip's own track
			// structure rather than needing to know bone names.
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
			// clipAction() caches by (clip, root), so every person's "rest"
			// action needs its own distinct clip object — otherwise calling
			// it twice for the same clone (once for the Walk action, once
			// for the rest action) would just hand back the same action.
			// The bind pose is identical for every clone though (they're
			// all copies of the same untouched source), so it only needs
			// to be captured once and reused.
			const restClip = walkClip && buildBindPoseClip(gltf.scene, walkClip);
			// Parallel arrays, indexed like `respondents`.
			const personRoots = new Array(respondents.length);
			const personMeshes = new Array(respondents.length);
			const personMixers = new Array(respondents.length);
			const personWalkActions = new Array(respondents.length);
			const personRestActions = new Array(respondents.length);

			respondents.forEach((person, i) => {
				const instance = cloneSkinned(gltf.scene);
				instance.traverse((node) => {
					if (node.isMesh) {
						node.material = node.material.clone();
						personMeshes[i] = node;
					}
				});
				scene.add(instance);
				personRoots[i] = instance;

				if (walkClip) {
					const mixer = new THREE.AnimationMixer(instance);

					const walkAction = mixer.clipAction(walkClip);
					walkAction.play();

					// Frozen on the bind-pose clip's one frame, cross-faded
					// in by weight as this person slows to a stop (see
					// updatePeoplePositions) — this is what lets them
					// settle toward standing normally instead of freezing
					// wherever mid-stride they happened to stop.
					const restAction = mixer.clipAction(restClip);
					restAction.play();
					restAction.paused = true;

					// Stagger each person's starting pose around the cycle
					// (see person.__animOffsetFraction) so the crowd doesn't
					// all step in lockstep — only advances walkAction, since
					// restAction is paused.
					mixer.update(person.__animOffsetFraction * walkClip.duration);

					personMixers[i] = mixer;
					personWalkActions[i] = walkAction;
					personRestActions[i] = restAction;
				}
			});

			// A flat, mostly-transparent disc for the blob shadow (see
			// SHADOW_RADIUS above).
			const shadowGeometry = new THREE.CircleGeometry(SHADOW_RADIUS, 16);
			// A soft round "blob" shadow — solid dark center fading out to
			// fully transparent at the edge — drawn once into a small canvas
			// and reused as a texture for every instance. This is the simple
			// cartoony ground-shadow look (think Zelda), rather than a flat,
			// hard-edged disc.
			const shadowCanvas = document.createElement("canvas");
			shadowCanvas.width = shadowCanvas.height = 64;
			const shadowCtx = shadowCanvas.getContext("2d");
			const shadowGradient = shadowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
			shadowGradient.addColorStop(0, "rgba(0, 0, 0, 0.55)");
			shadowGradient.addColorStop(0.7, "rgba(0, 0, 0, 0.35)");
			shadowGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
			shadowCtx.fillStyle = shadowGradient;
			shadowCtx.fillRect(0, 0, 64, 64);
			const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
			// Unlit (the texture's own gradient does all the shading) so it
			// reads the same regardless of the doorway light's reach, and
			// doesn't itself need a per-instance data color.
			const shadowMaterial = new THREE.MeshBasicMaterial({
				map: shadowTexture,
				transparent: true,
				depthWrite: false
			});
			const shadows = new THREE.InstancedMesh(shadowGeometry, shadowMaterial, respondents.length);
			scene.add(shadows);

			// Reused scratch object for the shadow's position -> matrix math
			// below, so we're not allocating a new Object3D per person per
			// frame.
			const placementHelper = new THREE.Object3D();
			// Lies a shadow disc flat on the floor (circles face +Z by default).
			const FLAT_ROTATION = new THREE.Quaternion().setFromEuler(new THREE.Euler(-Math.PI / 2, 0, 0));

			// Rebuilt every frame in updatePeoplePositions: "cx,cz" -> array
			// of respondent indices whose (pre-repulsion) position falls in
			// that cell. Reused across frames (via .clear()) to avoid
			// allocating a new Map every frame.
			const personGrid = new Map();

			// Every person's on-screen position is their fixed base spot plus
			// two layered displacements:
			//   1. An idle-then-shuffle "wander" within their own small
			//      assigned area: they mostly just stand still, and every so
			//      often (randomized per person, so the room never moves in
			//      unison) take a few seconds to shuffle to a new nearby
			//      resting spot before going idle again. See updateWander.
			//   2. A temporary collision-nudge that grows while the walker
			//      is within COLLISION_RADIUS and decays back to zero once
			//      you've moved on.
			// Both stay small relative to MIN_SPACING, so people wander
			// within their own "assigned area" without drifting into their
			// neighbors. Called once up front (dt = 0, elapsedSeconds = 0 —
			// a pure initial layout pass) and then every animation frame.

			// Smoothstep: eases a 0..1 progress value in and out, so a
			// shuffle accelerates gently rather than starting/stopping
			// instantly.
			function smoothstep(t) {
				return t * t * (3 - 2 * t);
			}

			// The shortest signed angular distance from `a` to `b` (radians,
			// in (-π, π]) — turning by this amount always takes the short way
			// around rather than potentially spinning the long way when the
			// two angles straddle the -π/π wraparound.
			function shortestAngleDelta(a, b) {
				let delta = (b - a) % (Math.PI * 2);
				if (delta > Math.PI) delta -= Math.PI * 2;
				if (delta < -Math.PI) delta += Math.PI * 2;
				return delta;
			}

			// Advances one person's idle/shuffle state machine and returns
			// their current (wanderX, wanderZ) offset from their base spot.
			// Facing is handled centrally in updatePeoplePositions, which
			// turns each person to face wherever this movement (combined
			// with any Y1/Y2 blend walk) is actually taking them.
			function updateWander(person, elapsedSeconds) {
				if (person.__moving) {
					const t = (elapsedSeconds - person.__moveStart) / person.__moveDuration;
					if (t >= 1) {
						person.__wanderX = person.__moveToX;
						person.__wanderZ = person.__moveToZ;
						person.__moving = false;
						person.__moveT = 0;
						// Stand still for a while before the next shuffle —
						// a few seconds, randomized so people don't all step
						// in sync.
						person.__nextMoveTime = elapsedSeconds + 3 + Math.random() * 5;
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

				// Pass 1: advance decay + wander for everyone, and bucket
				// each person's *pre-repulsion* position into a spatial grid
				// so pass 2 only has to check nearby cells for neighbors
				// instead of scanning every other person.
				personGrid.clear();
				for (let i = 0; i < respondents.length; i++) {
					const person = respondents[i];
					// Where this person's "resting" spot is right now,
					// somewhere between their Y1 and Y2 layout position —
					// this is what makes the whole crowd walk across the
					// room when the Y1/Y2 button is toggled.
					const blendedX = person.__xY1 + (person.__xY2 - person.__xY1) * currentPositionBlend;
					const blendedZ = person.__zY1 + (person.__zY2 - person.__zY1) * currentPositionBlend;
					// This frame's pre-update resting spot (blend + wander,
					// but not the small collision nudge below — that's
					// avoidance jitter, not real walking), so after updating
					// both below we can tell how far and which way this
					// person actually moved this frame.
					const prevRestX = person.__x + person.__wanderX;
					const prevRestZ = person.__z + person.__wanderZ;
					person.__x = blendedX;
					person.__z = blendedZ;
					person.__offsetX *= decay;
					person.__offsetZ *= decay;
					updateWander(person, elapsedSeconds); // updates person.__wanderX/__wanderZ

					// Face wherever that combined movement — Y1/Y2 blend
					// walk, local wander shuffle, or both at once — is
					// actually taking them, turning smoothly rather than
					// snapping, and only while actually moving (so someone
					// standing still keeps facing whichever way they last
					// walked). This is what keeps a person's legs/arms
					// swinging in the direction they're really traveling,
					// even mid-shuffle during a room-crossing Y1/Y2 walk.
					const moveDx = person.__x + person.__wanderX - prevRestX;
					const moveDz = person.__z + person.__wanderZ - prevRestZ;
					const isMoving = moveDx * moveDx + moveDz * moveDz > MOVE_FACING_EPSILON_SQ;
					if (isMoving) {
						const desiredYaw = Math.atan2(moveDz, moveDx);
						person.__facingYaw += shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
					}
					person.__walkAmount += ((isMoving ? 1 : 0) - person.__walkAmount) * walkAmountFactor;

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

					const finalX = person.__x + wanderX + person.__offsetX;
					const finalZ = person.__z + wanderZ + person.__offsetZ;

					// Within FACE_CAMERA_RADIUS, override the movement-based
					// facing from pass 1 above and turn to look at the
					// walker instead — takes priority over "face whichever
					// way you're moving" while you're close by.
					const toWalkerX = renderWalkX - finalX;
					const toWalkerZ = renderWalkZ - finalZ;
					const distToWalkerSq = toWalkerX * toWalkerX + toWalkerZ * toWalkerZ;
					if (distToWalkerSq < FACE_CAMERA_RADIUS * FACE_CAMERA_RADIUS && distToWalkerSq > MOVE_FACING_EPSILON_SQ) {
						const desiredYaw = Math.atan2(toWalkerZ, toWalkerX);
						person.__facingYaw += shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
					}
					const yaw = person.__facingYaw;
					const bodyScale = person.__bodyScale;

					// Position/orient/scale this person's whole walker clone
					// at once — no per-part matrix math needed now that
					// they're one rigged mesh instead of several separately-
					// placed capsules. A subtle vertical "breathing" wobble
					// (Y scale only) fades in as they stop moving, and fades
					// back out the instant they start walking again.
					const root = personRoots[i];
					const baseScale = bodyScale * WALKER_SCALE_CORRECTION;
					const breathAmount = 1 - person.__walkAmount;
					const breath =
						Math.sin(elapsedSeconds * BREATHING_SPEED + person.__breathPhase) *
						BREATHING_AMPLITUDE *
						breathAmount;
					root.position.set(finalX, 0, finalZ);
					root.rotation.y = yaw;
					root.scale.set(baseScale, baseScale * (1 + breath), baseScale);

					// Advance this person's own walk-cycle clip, scaled by
					// how much they're actually moving (0..1 — see pass 1
					// above), and cross-fade it against the frozen bind-pose
					// "rest" action by the same amount — so someone standing
					// still settles toward standing normally instead of
					// freezing wherever mid-stride they stopped, and resumes
					// smoothly from where they left off once they start
					// walking again.
					const mixer = personMixers[i];
					if (mixer) {
						const walkAction = personWalkActions[i];
						const restAction = personRestActions[i];
						walkAction.timeScale = person.__walkAmount;
						walkAction.weight = person.__walkAmount;
						restAction.weight = 1 - person.__walkAmount;
						mixer.update(dt);
					}

					// The blob shadow: a flat, unlit disc on the floor right
					// under the person, sized with their overall body scale.
					placementHelper.quaternion.copy(FLAT_ROTATION);
					placementHelper.position.set(finalX, 0.015, finalZ);
					placementHelper.scale.setScalar(bodyScale);
					placementHelper.updateMatrix();
					shadows.setMatrixAt(i, placementHelper.matrix);
				}

				shadows.instanceMatrix.needsUpdate = true;
			}

			// ---------------------------------------------------------------
			// Recoloring: figures out, for the chosen variable, whether it
			// reads as categorical (assign each distinct value its own hue)
			// or continuous numeric (fade along the No -> Yes gradient), then
			// writes one THREE.Color per instance into both InstancedMeshes.
			// ---------------------------------------------------------------

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
					// Special-cased so the default view matches the original
					// dark-purple/bright-magenta request exactly (people are
					// already filtered to just Yes/No in both waves, so this
					// is just the two fixed brand colors either way).
					const noColor = new THREE.Color(NO_COLOR);
					const yesColor = new THREE.Color(YES_COLOR);
					getColor = (person) => (person[variableKey] === "Yes" ? yesColor : noColor);
					legendData = {
						kind: "categorical",
						items: [
							{ label: "No", color: "#3b0764" },
							{ label: "Yes", color: "#ff2ec4" }
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
						// Sort for a stable (and vaguely meaningful, for
						// numeric-coded categories) color assignment.
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
							// Cap the legend at 12 swatches; a variable like
							// COUNTRY has 23+ categories and a full list would
							// swamp the overlay.
							items: sorted.slice(0, 12).map((value) => ({
								label: String(value),
								color: `#${colorMap.get(value).getHexString()}`
							})),
							overflow: Math.max(0, sorted.length - 12)
						};
					}
				}

				// Each person has their own (already-cloned, see buildScene)
				// material, so tinting one doesn't affect anyone else.
				for (let i = 0; i < respondents.length; i++) {
					personMeshes[i].material.color.copy(getColor(respondents[i]));
				}
			}

			// Re-run whenever the dropdown's bound value changes. Reading
			// `selectedVariable` here (a $state variable) is what makes this
			// effect re-fire on change.
			$effect(() => {
				applyColorVariable(selectedVariable);
			});

			// ---------------------------------------------------------------
			// First-person "walk" controls.
			//
			// - The camera's height (y) never changes — it's "locked to the
			//   ground" at EYE_HEIGHT.
			// - Steering is an explicit click-and-hold-drag on desktop (or
			//   touch-and-drag on mobile): horizontal motion turns the
			//   camera directly, proportional to how far you've dragged
			//   (see DRAG_LOOK_RADIANS_PER_SWIPE) — not tied to how hard
			//   you're scrolling. On a mouse drag specifically, vertical
			//   motion also tilts the view up/down (clamped, see
			//   MAX_DRAG_PITCH); touch-drag doesn't, since that axis is
			//   already the walk gesture there. Just moving the mouse
			//   around without the button held doesn't turn or tilt the
			//   camera at all.
			// - Scrolling (or, on touch, a vertical drag) only ever walks
			//   forward/back along whatever heading you're currently
			//   facing — it never turns you on its own, so a scroll is
			//   always a straight walk. On a wheel, scrolling down moves
			//   forward (like scrolling down a page carries you further
			//   into the room); on touch, dragging down does (the opposite
			//   convention, since it's the touch gesture for scrolling a
			//   page *up*). This sets a *target* position; the camera
			//   glides toward it (see FOLLOW_TIME) rather than snapping
			//   there instantly.
			// ---------------------------------------------------------------

			// Where the walker is trying to go (updated instantly by input).
			let targetWalkX = 0;
			let targetWalkZ = MAX_WALK_Z - 1; // start just inside the front entrance
			// Where the camera (and collision checks) actually are — glides
			// toward the target above every frame.
			let renderWalkX = targetWalkX;
			let renderWalkZ = targetWalkZ;

			// Non-null while the mouse button (or a touch) is down, holding
			// the position from the last move event, so each handler only
			// has to look at the *delta* since last time.
			let lastMouseDragX = null;
			let lastMouseDragY = null;
			let lastTouchY = null;
			let lastTouchX = null;
			// Where the camera is steering/tilting *toward* — updated
			// instantly by input (see handleMouseMove/handleTouchMove
			// below).
			let targetCameraYaw = 0;
			let targetCameraPitch = 0;
			// The camera's actual current heading/tilt, which glides toward
			// the target above (see the animate() loop) rather than
			// snapping straight to it — same idea as renderWalkX/Z gliding
			// toward targetWalkX/Z.
			let cameraYaw = 0;
			let cameraPitch = 0;

			// Keeps an angle in (-π, π] so it doesn't grow without bound as
			// someone spins around and around while steering.
			function wrapAngle(angle) {
				return ((angle + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI;
			}

			function walk(rawDelta) {
				// Ignore input in top-down mode, and while a mode-switch
				// animation is in flight (see `transition` below) so a stray
				// scroll doesn't yank the target mid-transition.
				if (mode !== "walk" || transition) return;
				const delta = Math.max(-MAX_WHEEL_STEP, Math.min(MAX_WHEEL_STEP, rawDelta));
				// Forward direction on the ground plane for the current
				// heading (pitch is never a factor — the camera is always
				// level).
				const forwardX = Math.sin(targetCameraYaw);
				const forwardZ = -Math.cos(targetCameraYaw);
				// Positive wheel delta ("scroll down", as if scrolling further
				// down a page) should move forward, so it feels like scrolling
				// down carries you deeper into the room.
				const distance = delta * WALK_SPEED;
				targetWalkX = Math.min(MAX_WALK_X, Math.max(MIN_WALK_X, targetWalkX + forwardX * distance));
				targetWalkZ = Math.min(MAX_WALK_Z, Math.max(MIN_WALK_Z, targetWalkZ + forwardZ * distance));
			}

			function handleWheel(event) {
				if (mode !== "walk") return;
				event.preventDefault(); // don't also scroll the page
				walk(event.deltaY);
			}

			// Click-and-hold-drag steering, desktop's equivalent of the
			// touch-drag below: only turns the camera while the mouse
			// button is actually held down (lastMouseDragX is only non-
			// null between a mousedown and the matching mouseup).
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
				// Inverted: drag up to look down, drag down to look up —
				// clamped so you can't drag your way to looking straight
				// up/down (or past it).
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
				// A horizontal drag turns the camera directly, proportional
				// to how far you've dragged across the container — drag
				// right to look left, drag left to look right (matching the
				// feel of dragging the room itself, not the camera). No
				// clamp, so you can keep dragging the same direction to turn
				// all the way around, including facing backward.
				if (lastTouchX !== null) {
					const rect = container.getBoundingClientRect();
					const dxNormalized = (lastTouchX - touch.clientX) / rect.width;
					targetCameraYaw = wrapAngle(targetCameraYaw + dxNormalized * DRAG_LOOK_RADIANS_PER_SWIPE);
				}
				lastTouchX = touch.clientX;
				// Touch devices have no wheel, so a vertical drag stands in
				// for scroll — but touch uses the opposite convention from
				// the wheel above: dragging your finger *down* (the gesture
				// that scrolls a page *up*) walks forward, dragging up walks
				// back.
				if (lastTouchY !== null) {
					walk(touch.clientY - lastTouchY);
				}
				lastTouchY = touch.clientY;
			}

			function handleTouchEnd() {
				lastTouchY = null;
				lastTouchX = null;
			}

			// Any arrow key, or the space bar, is an alternate way to flip
			// between walk and top-down view — the same toggle the button
			// does.
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

			// ---------------------------------------------------------------
			// Camera pose + walk <-> top-down transition.
			//
			// computeWalkPose()/computeTopdownPose() each return the
			// {position, quaternion} the camera *would* have right now in
			// that mode — they're pure functions of the current walk/pointer
			// state, with no side effects on the camera itself. That lets us
			// capture a "from" and "to" pose the instant the mode changes and
			// smoothly blend between them over MODE_TRANSITION_MS, instead of
			// the view cutting instantly.
			// ---------------------------------------------------------------

			// A throwaway camera used purely to compute a look-at quaternion
			// without touching the real camera. This has to be a Camera (not
			// a plain Object3D) — three.js's Object3D.lookAt() orients
			// non-camera objects to *face toward* the target from behind it,
			// the opposite of how a camera orients to look *at* the target,
			// so a plain Object3D helper here would silently produce a
			// camera pose rotated 180° from the intended one.
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

			// Fires only when `mode` actually changes (the initial run, at
			// mount, sees newMode === previousMode and does nothing). Both
			// poses are computed from the *current* live state, so this
			// naturally captures "wherever the camera happens to be right
			// now" as the starting point.
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

			// Same pattern as the camera's walk<->topdown transition above,
			// but blending each person's position between their Y1 and Y2
			// layout instead of blending a camera pose. 0 = fully Y1 layout,
			// 1 = fully Y2 layout; updatePeoplePositions reads this every
			// frame to compute each person's current base (x, z).
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
				renderer.setSize(w, h);
				updatePixelTargetSize();
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

				// Same idea for steering: turn the camera toward its target
				// heading/tilt instead of snapping there. Yaw uses the
				// shortest-path delta (see shortestAngleDelta) so turning
				// from, say, -170° to +170° takes the short 20° way around
				// rather than spinning the long way.
				const turnFactor = 1 - Math.exp(-dt / TURN_FOLLOW_TIME);
				cameraYaw += shortestAngleDelta(cameraYaw, targetCameraYaw) * turnFactor;
				cameraPitch += (targetCameraPitch - cameraPitch) * turnFactor;

				updatePositionBlend();
				updatePeoplePositions(dt, (now - animationStart) / 1000);
				updateCamera();

				if (renderStyle === "pixel") {
					// Render the real scene into the small offscreen target,
					// then draw that (nearest-filtered) texture full-size —
					// the upscale is what makes it look blocky.
					renderer.setRenderTarget(pixelRenderTarget);
					renderer.render(scene, camera);
					renderer.setRenderTarget(null);
					renderer.render(pixelScene, pixelCamera);
				} else {
					renderer.render(scene, camera);
				}
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
				shadowTexture.dispose();
				sideWallGeometry.dispose();
				pixelRenderTarget.dispose();
				pixelQuadGeometry.dispose();
				pixelQuadMaterial.dispose();
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
		bind:renderStyle
		bind:positionMode
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
