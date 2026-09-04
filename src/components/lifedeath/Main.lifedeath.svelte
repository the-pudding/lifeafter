<script>
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import { asset } from "$app/paths";
	import * as THREE from "three";
	import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
	// fork of OutlineEffect; wobbles the hull for a hand-drawn line
	import { PencilOutlineEffect } from "./utilities/PencilOutlineEffect.js";
	import { buildRoomShell } from "./room/roomShell.js";
	import {
		buildFacade,
		FACADE_LINK_DIM_BRIGHTNESS,
		signPlacement
	} from "./room/facade.js";
	import { buildDoors, DOOR_LABEL_DIM_BRIGHTNESS } from "./room/doors.js";
	import { createInputController } from "./utilities/inputController.js";
	import { spawnCrowd } from "./people/crowd.js";
	import { makeLabelPanel } from "./utilities/textPanel.js";
	import { formatNearbyPersonLines } from "./people/personSummary.js";
	import { buildHeightLookup, createHeightScaleFor } from "./people/personHeights.js";
	import { prepareModel } from "./people/crowdModels.js";
	import { createStoryBeats } from "./story/storyBeats.js";
	import { createNearbyPanels } from "./people/nearbyPanels.js";
	import loadCsv from "$utils/loadCsv.js";
	import {
		computeLayout,
		initializeCrowdState,
		createCrowdAnimator
	} from "./people/crowdSimulation.js";
	// facade + door label art
	import noSvg from "$svg/no.svg?raw";
	import unsureSvg from "$svg/unsure.svg?raw";
	import yesSvg from "$svg/yes.svg?raw";

	// "Color by" dropdown, recolor, legend
	import {
		variableConfig,
		groupedVariableOptions,
		getColumns,
		getCategoryFor,
		gradientColorForValue,
		numericScale,
		GRADIENT_PALETTE
	} from "$data/variable_config.js";
	// story text. "all" shows anywhere, the rest only in their zone
	import copy from "$data/copy.json";

	import signSvg from "$svg/sign.svg?raw";
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
	} from "./room/roomMath.js";


	import {
		BG_COLOR,
		BG_COLOR_CSS,
		CORRIDOR_WALL_HEIGHT,
		CORRIDOR_WIDTH,
		DEBUG_START_Z,
		DEFAULT_CAMERA_PITCH,
		DEFAULT_START_Z,
		DOORS,
		DOOR_HEIGHT,
		DOOR_LABEL_ASSETS,
		DOOR_LABEL_MAX_HEIGHT,
		DOOR_LABEL_MAX_WIDTH,
		DOOR_OPEN_ANGLE,
		DOOR_OPEN_TIME,
		DOOR_PASSABLE_OPEN_AMOUNT,
		DOOR_TRIGGER_RADIUS,
		DOOR_WALK_SMOOTH_TIME,
		DOOR_WALK_SPEED,
		DOOR_WALK_YAW_SPEED,
		DOOR_WIDTH,
		DOOR_Z,
		DOOR_ZONE_COLORS,
		DOOR_ZONE_COLORS_LIGHT,
		DRAG_LOOK_RADIANS_PER_SWIPE,
		EXTERIOR_DEPTH,
		EYE_HEIGHT,
		FACADE_CLEARANCE,
		FACADE_THICKNESS,
		FOLLOW_TIME,
		HALF_DEPTH,
		HALF_WIDTH,
		KEY_MOVE_DELTA_PER_SECOND,
		MAX_DRAG_PITCH,
		MAX_WALK_X,
		MAX_WALK_Z,
		MAX_WHEEL_STEP,
		MIN_WALK_X,
		MIN_WALK_Z,
		MUTED_COLOR,
		NEON_PINK,
		OUTER_WALL_HALF_WIDTH,
		ROOM_DEPTH,
		ROOM_ENTRY_PITCH_TILT,
		ROOM_ENTRY_PITCH_TIME,
		ROOM_HEIGHT,
		ROOM_WIDTH,
		DOOR_WALK_SETTLE_DISTANCE,
		DOOR_WALK_SETTLE_SPEED,
		SCROLL_WALK_MIN_SCALE,
		SCROLL_WALK_NARROW_WIDTH,
		SCROLL_WALK_WIDE_WIDTH,
		SIDE_WALL_MARGIN,
		TURN_CLEARANCE,
		VESTIBULE_CEILING_HEIGHT,
		VESTIBULE_DEPTH,
		WALK_MARGIN,
		WALK_SPEED,
		WALL_THICKNESS,
		ZONE_WIDTH,
		debugAgeParam,
		debugMode,
		debugSearchParams,
		debugVariableParam,
		isMobileViewport,
		sizeDoorLabelSvg
	} from "./room/roomConfig.js";
	import {
		BASE_URL,
		BLEND_MOVE_EASE_SECONDS,
		BLEND_TURN_GATE_ANGLE,
		BLEND_TURN_TIME,
		BREATHING_AMPLITUDE,
		BREATHING_SPEED,
		BREATH_CYCLES_PER_STRIDE,
		COLLISION_RADIUS,
		FACE_CAMERA_RADIUS,
		FACING_TURN_TIME,
		FEMALE_BODY_URLS,
		FIGURE_HEIGHT,
		HEIGHT_DATA_URL,
		HOVERED_PERSON_BRIGHTNESS,
		LOD_COLOR_BANDS,
		LOD_FREEZE_DISTANCE,
		MALE_BODY_URLS,
		MAX_OFFSET,
		MAX_WALK_TIMESCALE,
		MIN_WALK_TIMESCALE,
		MOVE_FACING_EPSILON_SQ,
		NEARBY_INCUMBENT_STICKINESS,
		NEARBY_PANEL_MAX_APPARENT_SCALE,
		NEARBY_PANEL_MIN_APPARENT_SCALE,
		NEARBY_PANEL_REFERENCE_DISTANCE,
		NEARBY_PANEL_WORLD_WIDTH,
		NEARBY_PEOPLE_MAX,
		NEARBY_PERSON_FOV_HALF_ANGLE,
		NEARBY_PERSON_FOV_SCREEN_MARGIN,
		NEARBY_PERSON_HEAD_GAP,
		NEARBY_PERSON_MAX_DISTANCE,
		NEARBY_SELECTION_REFRESH_INTERVAL,
		OFFSET_RETURN_TIME,
		OUTLINE_DEFAULT_THICKNESS,
		PEOPLE_DATA_URL,
		PERSON_CELL_SIZE,
		PERSON_COLLISION_RADIUS,
		PERSON_PUSH_STRENGTH,
		POSITION_TRANSITION_SPEED,
		PUSH_STRENGTH,
		SELECTED_PERSON_BRIGHTNESS,
		SHADOW_RADIUS,
		STEP_BACK_HOLD_FRACTION,
		WALK_AMOUNT_SMOOTH_TIME,
		WALK_ANIM_SPEED,
		WALK_ANIM_SPEED_FACTOR,
		WALK_BREATH_AMPLITUDE_SCALE,
		WALK_SPEED_SMOOTH_TIME
	} from "./people/peopleConfig.js";
	// mode = which view is large. selectedVariable = recolor.
	// positionMode = which wave's layout the crowd walks to
	let mode = $state("walk"); // "walk" | "topdown"
	let selectedVariable = $state(debugVariableParam ?? "AFTER_DEATH");
	let positionMode = $state("Y1"); // "Y1" | "Y2"

	// debug: mirror variable + age into the URL
	$effect(() => {
		const variable = selectedVariable;
		const age = currentAge;
		if (!debugMode) return;
		const url = new URL(window.location.href);
		url.searchParams.set("variable", variable);
		if (age !== null) url.searchParams.set("age", age.toFixed(1));
		window.history.replaceState({}, "", url);
	});
	// legend data: { kind: "categorical", items } or { kind: "continuous", min, max }
	let legendData = $state(null);
	// age at the walker's depth. inverse of ageToZ, per frame. null until loaded
	let currentAge = $state(null);
	// active story text. can be more than one
	let storyTexts = $state([]);
	// markdown links -> anchors. links only; the rest of the copy is raw
	// HTML. http(s) only, so no javascript: URLs
	// copy.json can drop an audio toggle inline with {{audio}}, anywhere —
	// including inside one of its own <div>s, so this substitutes markup
	// rather than splitting the string (which would cut a tag in half).
	// `playing` is an argument, not a closure read, so the template re-runs
	// this when it changes and the label stays honest
	const STORY_AUDIO_TOKEN = /\{\{audio\}\}/g;
	function storyAudioButton(playing) {
		const icon = playing
			? '<path class="wave" d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path class="wave" d="M18 6.8a7.4 7.4 0 0 1 0 10.4"/>'
			: '<path class="wave" d="M16 9.5l5 5M21 9.5l-5 5"/>';
		return (
			`<button class="story-audio" type="button" data-story-audio aria-pressed="${playing}">` +
			`<svg viewBox="0 0 24 24" aria-hidden="true">` +
			`<path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z"/>${icon}</svg>` +
			`${playing ? "Sound on" : "Sound off"}</button>`
		);
	}

	function renderStoryText(text, playing = false) {
		return text
			.replace(
				/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
				(_match, label, href) =>
					`<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
			)
			.replace(STORY_AUDIO_TOKEN, () => storyAudioButton(playing));
	}
	// story beat asked to hide the panel/minimap
	let hidePanel = $state(false);
	let hideMap = $state(false);
	// hl_minimap: hop the minimap. hide_year: hide the wave toggle
	let highlightMap = $state(false);
	let hideYear = $state(false);
	// whether any copy.json entry is active here at all
	let storyHasBeat = $state(false);
	// load screen cross-fade. slow on purpose: the room resolving out of
	// the black is the opening beat
	const LOADING_FADE_MS = 2600;
	// one full cycle of the wavy line: it draws itself, then rubs itself
	// out. nothing waits on it — the screen goes the moment the crowd is
	// ready, cutting the line off wherever it happens to be
	const LOADING_LINE_MS = 5400;
	// a fast load shouldn't flash a line that barely gets started, so it
	// only appears once the wait is long enough to be worth acknowledging
	const LOADING_LINE_DELAY_MS = 1000;
	let loadingLineVisible = $state(false);
	// no skip button before this age — covers the plaza and the first steps
	// inside, where zToAge clamps below the youngest respondent
	const EXPLORE_MIN_AGE = 18;
	// seconds to close ~63% of a crowd recolor; higher = slower cross-fade
	const CROWD_RECOLOR_TIME = 0.35;
	// how far past the back wall the walker can press into the light
	const LIGHT_NUDGE_DEPTH = 2.2;
	// seconds to close ~63% of that overshoot; lower = springier
	const LIGHT_PUSHBACK_TIME = 0.22;
	// how close to the wall the message appears
	const LIGHT_MESSAGE_MARGIN = 0.9;
	// true while pressed into the light
	let inLight = $state(false);
	// "skip to explore": no story text, no beat overrides, free movement
	let exploreMode = $state(false);
	// live "inside" check. unlike hasEnteredRoom, flips back on exit
	let insideRoom = $state(false);
	// debug HUD snapshot. debug mode only
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
	// hidden by a story beat, or by being outside
	// pressing into the light clears the screen for its message, and
	// everything comes back on the way out
	const shouldHidePanel = $derived(hidePanel || !insideRoom || inLight);
	const shouldHideMap = $derived(hideMap || !insideRoom || inLight);
	// panel height, so the topdown map clears it. stays mounted while
	// hidden, so this stays accurate
	let controlPanelHeight = $state(0);
	const panelClearPx = $derived(shouldHidePanel ? 0 : controlPanelHeight);
	// story overlay height, so the topdown map stops above it
	let storyOverlayHeight = $state(0);
	// no text reserves nothing
	const storyClearPx = $derived(storyTexts.length > 0 ? storyOverlayHeight : 0);
	// first hover/click of the minimap stops the hop. sticky
	let minimapAcknowledged = $state(false);
	// walk mode only — topdown centers via a transform the hop would override
	// the wave toggle belongs to the script: shown while a beat is running
	// (unless it hides it), and while exploring. hidden between beats.
	const shouldHideYear = $derived(
		exploreMode ? false : hideYear || !storyHasBeat
	);
	const shouldBounceMap = $derived(
		highlightMap && !shouldHideMap && !minimapAcknowledged && mode === "walk"
	);
	// non-empty until data + GLBs resolve; shown in place of the controls
	// vertical fov keeping all three doors visible at any aspect. at
	// component scope, not inside buildScene: the loading screen places its
	// own copy of the sign with this, before any of the scene exists
	const outermostDoorX =
		Math.max(...DOORS.map((d) => Math.abs(d.x))) + DOOR_WIDTH / 2;
	const distanceToDoors = DEFAULT_START_Z - DOOR_Z;
	const DOOR_VIEW_MARGIN = 1.35; // breathing room past the doors' exact edges; also sets how wide the walk view is
	const requiredHalfHorizontalFovRad =
		Math.atan(outermostDoorX / distanceToDoors) * DOOR_VIEW_MARGIN;
	const computeDoorVisibleFovDegrees = (aspect) =>
		computeFovForHorizontalHalfAngle(requiredHalfHorizontalFovRad, aspect);
	// fixed-world-size text loses pixels at a wider fov. compensate
	// against a 16:9 reference
	const REFERENCE_ASPECT = 16 / 9;
	const REFERENCE_FOV = computeDoorVisibleFovDegrees(REFERENCE_ASPECT);
	// capped per surface: labels overrun the door quickly, the sign has
	// the whole lintel
	const MAX_DOOR_LABEL_SCALE = 1.25;
	const MAX_SIGN_SCALE = 2.3;
	function computeTextFovScale(fovDegrees, maxScale) {
		const rawScale =
			Math.tan(THREE.MathUtils.degToRad(fovDegrees / 2)) /
			Math.tan(THREE.MathUtils.degToRad(REFERENCE_FOV / 2));
		return Math.min(rawScale, maxScale);
	}

	// world Y that lands the sign cluster SIGN_SCREEN_FRACTION down the
	// screen from the plaza's opening camera. both fov and the start pitch
	// vary with viewport, so a fixed height sits at a different spot on
	// every aspect ratio — this solves for the height instead
	const SIGN_SCREEN_FRACTION = 0.25;
	function signClusterTargetY(fovDegrees, signZ) {
		// ndc y: +1 top, -1 bottom
		const ndcY = 1 - 2 * SIGN_SCREEN_FRACTION;
		const k = ndcY * Math.tan(THREE.MathUtils.degToRad(fovDegrees / 2));
		const pitch = DEFAULT_CAMERA_PITCH;
		const distance = DEFAULT_START_Z - signZ;
		return (
			EYE_HEIGHT +
			(distance * (Math.sin(pitch) + k * Math.cos(pitch))) /
				(Math.cos(pitch) - k * Math.sin(pitch))
		);
	}

	// background music: off until asked for. the file is 13MB, so it is
	// only fetched on the first unmute, never on load
	let audioOn = $state(false);
	let audioEl;
	// the element is the source of truth, not a flag of our own: play()'s
	// promise can stay pending, which would leave the button lying about
	// what's actually happening
	function toggleAudio() {
		if (!audioEl) return;
		if (audioEl.paused) audioEl.play().catch(() => {});
		else audioEl.pause();
	}

	let loadingMessage = $state("Loading people…");
	// kept mounted through the fade, so the sign doesn't cut
	let loadingFading = $state(false);
	// measured eagerly, not in an effect: the load screen paints on the
	// very first frame, and a null rect would flash the sign in the corner
	let viewport = $state({
		width: typeof window === "undefined" ? 0 : window.innerWidth,
		height: typeof window === "undefined" ? 0 : window.innerHeight
	});

	/**
	 * Screen rect the facade sign will occupy once the scene is up. The
	 * loading screen draws its own copy of the sign right here, so when it
	 * fades the sign appears to have been there all along.
	 */
	const loadingSignRect = $derived.by(() => {
		const { width, height } = viewport;
		if (!width || !height) return null;
		const fov = computeDoorVisibleFovDegrees(width / height);
		const scale = computeTextFovScale(fov, MAX_SIGN_SCALE);
		const placed = signPlacement({
			doorHeight: DOOR_HEIGHT,
			doorZ: DOOR_Z,
			facadeThickness: FACADE_THICKNESS,
			scale,
			centerY: null
		});
		const centerY = signPlacement({
			doorHeight: DOOR_HEIGHT,
			doorZ: DOOR_Z,
			facadeThickness: FACADE_THICKNESS,
			scale,
			centerY: signClusterTargetY(fov, placed.z)
		}).centerY;

		// project (0, centerY, signZ) from the plaza camera
		const pitch = DEFAULT_CAMERA_PITCH;
		const halfFovTan = Math.tan(THREE.MathUtils.degToRad(fov / 2));
		const dz = DEFAULT_START_Z - placed.z;
		const dy = centerY - EYE_HEIGHT;
		const yCam = dy * Math.cos(pitch) - dz * Math.sin(pitch);
		const depth = dy * Math.sin(pitch) + dz * Math.cos(pitch);
		if (depth <= 0) return null;
		// world units -> px at that depth. the vertical fov governs both,
		// so width uses the viewport height, not its width
		const pxPerUnit = height / (2 * depth * halfFovTan);
		return {
			width: placed.width * pxPerUnit,
			height: placed.height * pxPerUnit,
			centerX: width / 2,
			centerY: height / 2 - yCam * pxPerUnit
		};
	});

	// clicked crowd member -> modal. null closes
	let clickedPerson = $state(null);
	// their index; respondents has no stable id. read per frame to light them
	let clickedPersonIndex = $state(null);
	// info panels are 3D objects owned by buildScene — no reactive state here.
	// plain let: a stable ref read at click time, so Minimap's callback
	// can stay one closure
	let selectPersonImpl = null;
	// set in buildScene; lets the explore toggle re-arm the beats
	let storyBeatsImpl = null;
	// entering topdown closes the modal
	$effect(() => {
		if (mode === "topdown") {
			clickedPerson = null;
			clickedPersonIndex = null;
		}
	});

	// covers the walk/topdown swap: snap opaque, then let CSS ease it out
	const MODE_FADE_MS = 260;
	let modeVeilVisible = $state(false);
	let modeVeilTimeout;
	// guards the effect from re-triggering. seeded so no veil on first render
	let lastVeiledMode = "walk";
	$effect(() => {
		const currentMode = mode;
		if (currentMode === lastVeiledMode) return;
		lastVeiledMode = currentMode;
		modeVeilVisible = true;
		clearTimeout(modeVeilTimeout);
		// one tick opaque, so the swap is painted over before fading
		modeVeilTimeout = setTimeout(() => (modeVeilVisible = false), 16);
	});

	// canvas host. $state so Minimap's container prop updates on bind
	let container = $state();
	// bound so onMount can call init()/draw()
	let minimapComponent;

	// dropdown options by parent
	const variableOptions = groupedVariableOptions();



	$effect(() => {
		const timer = setTimeout(
			() => (loadingLineVisible = true),
			LOADING_LINE_DELAY_MS
		);
		return () => clearTimeout(timer);
	});

	// the load screen's sign placement depends on the viewport, and it is
	// drawn before the scene's own resize handling exists
	$effect(() => {
		const measure = () =>
			(viewport = { width: window.innerWidth, height: window.innerHeight });
		measure();
		window.addEventListener("resize", measure);
		return () => window.removeEventListener("resize", measure);
	});

	onMount(() => {
		let disposed = false;
		let cleanup = () => {};

		function loadGLB(url) {
			return new Promise((resolve, reject) => {
				new GLTFLoader().load(url, resolve, undefined, reject);
			});
		}

		(async () => {
			const [response, heightRows, maleGltfs, femaleGltfs] = await Promise.all([
				fetch(PEOPLE_DATA_URL),
				loadCsv(HEIGHT_DATA_URL),
				Promise.all(MALE_BODY_URLS.map(loadGLB)),
				Promise.all(FEMALE_BODY_URLS.map(loadGLB))
			]);
			// columnar on the wire for size; rebuilt into {column: value}
			const peopleTable = await response.json();
			const rawPeople = peopleTable.rows.map((row) => {
				const person = {};
				for (let i = 0; i < peopleTable.columns.length; i++) {
					person[peopleTable.columns[i]] = row[i];
				}
				return person;
			});
			if (disposed) return;
			const heightScaleFor = createHeightScaleFor(buildHeightLookup(heightRows));
			let sceneCleanup = () => {};
			const disposeRoot = $effect.root(() => {
				sceneCleanup = buildScene(rawPeople, maleGltfs, femaleGltfs, heightScaleFor);
			});
			cleanup = () => {
				sceneCleanup();
				disposeRoot();
			};
			// fade rather than cut; unmounted once the transition is done.
			// no waiting on the line — it just gets cut off wherever it is
			loadingFading = true;
			setTimeout(() => {
				loadingMessage = "";
				loadingFading = false;
			}, LOADING_FADE_MS);
		})();

		function buildScene(rawPeople, maleGltfs, femaleGltfs, heightScaleFor) {
			const maleModels = maleGltfs.map(prepareModel);
			const femaleModels = femaleGltfs.map(prepareModel);
			const allModels = [...maleModels, ...femaleModels];

			// body matching gender, else the full pool
			function pickModelForPerson(person) {
				if (person.GENDER === "Male")
					return maleModels[Math.floor(Math.random() * maleModels.length)];
				if (person.GENDER === "Female")
					return femaleModels[Math.floor(Math.random() * femaleModels.length)];
				return allModels[Math.floor(Math.random() * allModels.length)];
			}

			// GLB scales vary; measure one and correct all to FIGURE_HEIGHT
			const referenceHeight = new THREE.Box3()
				.setFromObject(allModels[0].scene)
				.getSize(new THREE.Vector3()).y;
			const WALKER_SCALE_CORRECTION =
				referenceHeight > 0 ? FIGURE_HEIGHT / referenceHeight : 1;

			// needs a clean answer + age in both waves. Y1 = start, Y2 = destination
			const isAfterDeathAnswer = (value) =>
				value === "No" || value === "Unsure" || value === "Yes";
			const respondents = rawPeople.filter(
				(d) =>
					isAfterDeathAnswer(d.AFTER_DEATH_Y1) &&
					typeof d.AGE_Y1 === "number" &&
					isAfterDeathAnswer(d.AFTER_DEATH_Y2) &&
					typeof d.AGE_Y2 === "number"
			);

			// one age -> depth scale for both waves, so layouts stay comparable
			const allAges = respondents.flatMap((d) => [d.AGE_Y1, d.AGE_Y2]);
			const ageMin = Math.min(...allAges) - 1;
			const ageMax = Math.max(...allAges);

			// young at the front (larger Z), old at the back. zToAge inverts, clamped
			const { ageToZ, zToAge } = createAgeZMapping({
				ageMin,
				ageMax,
				halfDepth: HALF_DEPTH,
				roomDepth: ROOM_DEPTH
			});

			// narration layer. getters/setters since it reads and writes state above
			const storyBeats = createStoryBeats({
				copy,
				getCurrentAge: () => currentAge,
				getRenderWalkX: () => renderWalkX,
				getSelectedVariable: () => selectedVariable,
				setSelectedVariable: (value) => (selectedVariable = value),
				getPositionMode: () => positionMode,
				setPositionMode: (value) => (positionMode = value),
				onUpdate: (result) => {
					storyTexts = result.texts;
					hidePanel = result.hidePanel;
					hideMap = result.hideMap;
					highlightMap = result.highlightMap;
					hideYear = result.hideYear;
					storyHasBeat = result.hasBeat;
				}
			});
			storyBeatsImpl = storyBeats;

			// called with this room's geometry and each wave's zone/age accessors.
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
			// everyone starts at the default wave's layout
			initializeCrowdState(respondents, y1Layout, y2Layout, positionMode === "Y2" ? 1 : 0, {
				heightScaleFor
			});

			const width = container.clientWidth;
			const height = container.clientHeight;

			// --- scene, camera, renderer ---

			const scene = new THREE.Scene();
			scene.background = new THREE.Color(BG_COLOR);
			// fog hides the back wall's edge. tied to the LOD bands so fade and
			// detail cutoffs line up. past RENDER_CULL_DISTANCE, nothing is drawn
			const FOG_NEAR = LOD_FREEZE_DISTANCE;
			const FOG_FAR = 50;
			const RENDER_CULL_DISTANCE = FOG_FAR;
			const walkFog = new THREE.Fog(BG_COLOR, FOG_NEAR, FOG_FAR);
			scene.fog = walkFog;

			// groups the inner wall + crowd
			const innerRoomGroup = new THREE.Group();
			scene.add(innerRoomGroup);

			// best-effort; CSS size may not have resolved. resizeWebglCanvas corrects
			const initialAspect = width / height;
			const fov = computeDoorVisibleFovDegrees(initialAspect);

			const camera = new THREE.PerspectiveCamera(fov, initialAspect, 0.1, 800);
			// facade brick + point lights on their own layer, isolated from the
			// toon lights. camera must enable it to see the facade
			const FACADE_LIGHT_LAYER = 1;
			camera.layers.enable(FACADE_LIGHT_LAYER);
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			// updateStyle=false: box is CSS-driven, inline sizes would fight it
			renderer.setSize(width, height, false);
			renderer.domElement.classList.add("webgl-canvas");
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			container.appendChild(renderer.domElement);
			// outline as an inflated back-face pass, wobbled per vertex
			const effect = new PencilOutlineEffect(renderer, {
				defaultThickness: OUTLINE_DEFAULT_THICKNESS,
				defaultColor: [0, 0, 0],
				defaultKeepAlive: true
			});

			// minimap owns its canvas; this feeds it positions, colors, layout

			// per-frame minimap positions, typed arrays. color changes with the dropdown
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

			// directional only. no falloff = one intensity per flat face, which
			// keeps the toon facets hard-edged. ambient lifts the shadow band;
			// kept low so the shadow step still registers
			const AMBIENT_LIGHT_INTENSITY = 0.55;
			const ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY);
			scene.add(ambientLight);

			const keyLight = new THREE.DirectionalLight(0xf5cfb0, 4.8);
			keyLight.position.set(0, 1, -1); // from the doorway end, angled down
			scene.add(keyLight);
			scene.add(keyLight.target);

			// only shadow caster. frustum sized to the cull radius, recentered per frame
			keyLight.castShadow = true;
			// 4096: the frustum covers 40x120 units, and 2048 left edges blocky.
			// shadow.radius softens the rest
			keyLight.shadow.mapSize.set(4096, 4096);
			keyLight.shadow.radius = 3;
			keyLight.shadow.bias = -0.0015;
			// acne on the brick relief that depth bias alone missed
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


			// short-range fill on the walker, so nearby faces never go black
			const cameraLight = new THREE.PointLight("#cbb8ff", 1.2, 10, 2);
			scene.add(cameraLight);

			// toon ramp: two hard steps, capped short of white/black
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

			// vertical gradient for walls/doors. multiplies independent of the ramp
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
				// mipmapping a 1px texture renders as a checkerboard
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

			// zone x per door, shared by the shell and door builders
			const ZONE_XS = DOORS.map((door) => door.x);

			// exterior, grouped for one hide once inside with doors shut.
			// per-door fixtures hide separately, on their own open state
			const exteriorGroup = new THREE.Group();
			exteriorGroup.name = "exterior";
			scene.add(exteriorGroup);

			// each builds itself; Main owns the shared lights/materials.
			// buildFacade first: brickFrontLocalZ positions each door's lamp
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
			const { brickFrontLocalZ, wordmarkLogo, byline, signGroup, layoutSign, signZ } =
				buildFacade(scene, {
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

			// applies the text scale. called here and again once fov is authoritative
			function updateTextFovScale() {
				const signScale = computeTextFovScale(camera.fov, MAX_SIGN_SCALE);
				const doorLabelScale = computeTextFovScale(camera.fov, MAX_DOOR_LABEL_SCALE);
				// X/Y only — these are boxes; scaling depth lifts them off the wall
				signGroup.scale.set(signScale, signScale, 1);
				// scaled alone; group-scaling would shift it under the sign.
				// its Y follows too, so the grown sign doesn't cover it
				byline.scale.set(signScale, signScale, 1);
				layoutSign(signScale, signClusterTargetY(camera.fov, signZ));
				for (const door of DOORS) {
					door.label.scale.set(doorLabelScale, doorLabelScale, 1);
				}
			}
			updateTextFovScale();

			// opens on approach. TRIGGER_RADIUS must exceed FACADE_CLEARANCE,
			// or a shut door blocks first
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

			// skip the exterior once inside with all doors shut. fixtures key off
			// their own openAmount. "closed enough", since it eases asymptotically
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

			// flips on first entry, unlocking normal navigation
			function updateEnteredRoom() {
				if (!hasEnteredRoom && renderWalkZ <= HALF_DEPTH) {
					hasEnteredRoom = true;
					autoWalking = false;
				}
			}

			// pushes back to their side of DOOR_Z. no-op at an open door
			const resolveOuterDoorCollision = createOuterDoorCollisionResolver({
				doors: DOORS,
				doorZ: DOOR_Z,
				doorWidth: DOOR_WIDTH,
				facadeClearance: FACADE_CLEARANCE,
				doorPassableOpenAmount: DOOR_PASSABLE_OPEN_AMOUNT
			});

			// always open; the outer doors are the only gate. crowd never needs it
			const resolveInnerWallCollision = createInnerWallCollisionResolver({
				zoneXs: ZONE_XS,
				halfDepth: HALF_DEPTH,
				facadeClearance: FACADE_CLEARANCE,
				corridorWidth: CORRIDOR_WIDTH
			});

			// one clone each, own skeleton + material so they tint separately.
			// returned arrays indexed like respondents
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

			// per-frame crowd logic lives in crowdSimulation.js, fed live state
			// via getters. distance only dims and thins, never swaps a body
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



			// column for the current wave, else the only one
			function resolveColumn(baseVar) {
				const columns = getColumns(baseVar);
				return (
					columns.find((column) => column.endsWith(`_${positionMode}`)) ??
					columns[0]
				);
			}

			// recolor target; personBaseColors ease toward these each frame.
			// the first pass snaps, so the crowd doesn't fade up from black
			const personTargetColors = respondents.map(() => new THREE.Color());
			let hasAppliedColorVariable = false;

			function applyColorVariable(baseVar) {
				const config = variableConfig[baseVar];
				const column = resolveColumn(baseVar);
				const muted = new THREE.Color(MUTED_COLOR);
				const mutedCSS = `#${muted.getHexString()}`;

				// numeric variables aren't bucketed: each answer takes its own
				// spot on the ramp, and the legend shows the ramp and its range
				const scale = config.type === "numeric" ? numericScale(baseVar) : null;
				legendData = scale
					? {
							kind: "gradient",
							min: scale.min,
							max: scale.max,
							stops: GRADIENT_PALETTE
						}
					: {
							kind: "categorical",
							items: config.categories.map((bucket) => ({
								label: bucket.label,
								color: bucket.color
							}))
						};
				const colorFor = scale
					? (person) => gradientColorForValue(baseVar, person[column])
					: (person) => getCategoryFor(baseVar, person[column])?.color ?? null;

				// target color; the frame loop eases into it, then applies LOD
				// darkening. CSS feeds the minimap, which switches outright
				for (let i = 0; i < respondents.length; i++) {
					const color = colorFor(respondents[i]);
					if (color) {
						personTargetColors[i].set(color);
						personColorCSS[i] = color;
					} else {
						personTargetColors[i].copy(muted);
						personColorCSS[i] = mutedCSS;
					}
					if (!hasAppliedColorVariable) personBaseColors[i].copy(personTargetColors[i]);
				}
				hasAppliedColorVariable = true;
			}

			// eases every body toward its target color
			function advanceCrowdColors(dt) {
				const factor = 1 - Math.exp(-dt / CROWD_RECOLOR_TIME);
				for (let i = 0; i < personBaseColors.length; i++) {
					personBaseColors[i].lerp(personTargetColors[i], factor);
				}
			}

			// re-runs on variable change, and on wave via resolveColumn
			$effect(() => {
				applyColorVariable(selectedVariable);
			});

			// walk controls. height locked to EYE_HEIGHT, drag steers, scroll walks

			// ?age= reopens at that depth instead of the door
			const debugAgeZ =
				debugAgeParam !== null && debugAgeParam !== "" ? ageToZ(Number(debugAgeParam)) : null;
			// input target
			let targetWalkX = 0;
			let targetWalkZ = debugAgeZ ?? (debugMode ? DEBUG_START_Z : DEFAULT_START_Z);
			// actual position; glides toward the target
			let renderWalkX = targetWalkX;
			let renderWalkZ = targetWalkZ;

			// reopening at ?age= counts as already inside
			let hasEnteredRoom = debugAgeZ !== null;

			// Z to walk once X lines up. moving both at once clipped the facade
			let pendingDoorWalkZ = null;
			const DOOR_ALIGN_EPSILON = 0.4;
			// door click -> inside. yaw eases instead of snapping while true
			let autoWalking = false;
			// the eased motion outlives autoWalking, which ends at the doorway
			// so the outline pass can come back on — handing the last of the
			// travel to the much tighter follow glide used to jerk the stop
			let doorWalkEasing = false;
			// smoothDamp velocity, fed back per frame for a continuous handoff
			let doorWalkVelX = 0;
			let doorWalkVelZ = 0;
			let doorWalkVelYaw = 0;

			// steering target, set instantly by input
			let targetCameraYaw = 0;
			let targetCameraPitch = DEFAULT_CAMERA_PITCH;
			// actual heading/tilt, gliding toward the target
			let cameraYaw = 0;
			let cameraPitch = DEFAULT_CAMERA_PITCH;
			// eases to ROOM_ENTRY_PITCH_TILT inside. added on top, so drag stays 1:1
			let roomEntryPitchOffset = 0;

			// shared by walk()/strafe(): moves the target along a ground direction
			function moveDirection(dirX, dirZ, rawDelta) {
				// the cornered preview isn't a control surface
				if (mode !== "walk") return;
				// their own input wins over the tail of the door walk
				doorWalkEasing = false;
				// outside, forward is disabled — a door click sets the target.
				// explore mode lifts that
				if (!hasEnteredRoom && !exploreMode) return;
				const delta = Math.max(
					-MAX_WHEEL_STEP,
					Math.min(MAX_WHEEL_STEP, rawDelta)
				);
				const distance = delta * WALK_SPEED;
				targetWalkX = Math.min(
					MAX_WALK_X,
					Math.max(MIN_WALK_X, targetWalkX + dirX * distance)
				);
				// the back wall is soft: the walker can push a little way into
				// the light before it pushes them back (see animate())
				targetWalkZ = Math.min(
					MAX_WALK_Z,
					Math.max(MIN_WALK_Z - LIGHT_NUDGE_DEPTH, targetWalkZ + dirZ * distance)
				);
				targetWalkZ = resolveOuterDoorCollision(targetWalkX, targetWalkZ);
				targetWalkZ = resolveInnerWallCollision(targetWalkX, targetWalkZ);
			}

			// gesture walking eases off on narrow viewports; full speed on wide
			function scrollWalkScale() {
				const viewportWidth = window.innerWidth;
				const span = SCROLL_WALK_WIDE_WIDTH - SCROLL_WALK_NARROW_WIDTH;
				const t = Math.min(
					1,
					Math.max(0, (viewportWidth - SCROLL_WALK_NARROW_WIDTH) / span)
				);
				return SCROLL_WALK_MIN_SCALE + (1 - SCROLL_WALK_MIN_SCALE) * t;
			}

			// positive = forward, like scrolling down a page
			function walk(rawDelta) {
				// ground-plane forward for the current heading
				moveDirection(Math.sin(targetCameraYaw), -Math.cos(targetCameraYaw), rawDelta);
			}

			// positive = camera-right
			function strafe(rawDelta) {
				moveDirection(Math.cos(targetCameraYaw), Math.sin(targetCameraYaw), rawDelta);
			}

			const doorRaycaster = new THREE.Raycaster();
			const doorClickPointer = new THREE.Vector2();
			// past the inner wall, so hasEnteredRoom flips as the walk finishes
			const AUTO_WALK_INSIDE_Z = HALF_DEPTH - 4;

			// click blockers. doors via their hinge group, so mid-swing still blocks
			const occluderMeshes = [
				backWall,
				leftWall,
				rightWall,
				...innerWallMeshes,
				...DOORS.map((d) => d.hinge)
			];

			// info panels. after the crowd, since it needs personRoots
			const nearbyPanels = createNearbyPanels({
				respondents,
				personRoots,
				camera,
				renderer,
				innerRoomGroup,
				occluderMeshes,
				walkerScaleCorrection: WALKER_SCALE_CORRECTION,
				getRenderWalkX: () => renderWalkX,
				getRenderWalkZ: () => renderWalkZ,
				getCameraYaw: () => cameraYaw,
				getInsideRoom: () => insideRoom,
				getMode: () => mode,
				getPositionMode: () => positionMode,
				getSelectedVariable: () => selectedVariable,
				getHasStoryText: () => storyTexts.length > 0
			});

			// pointer over the minimap. its canvas is pointer-events:none so drag
			// and scroll pass through, but clicks shouldn't
			function isPointerOverMinimap(event) {
				return minimapComponent.containsPoint(event.clientX, event.clientY);
			}

			// sets the walk target through a door; per-frame easing animates it.
			// X first, then forward. shared by click and keyboard
			function walkThroughDoor(door) {
				targetWalkX = door.x;
				pendingDoorWalkZ = AUTO_WALK_INSIDE_Z;
				autoWalking = true;
				doorWalkEasing = true;
				doorWalkVelX = 0;
				doorWalkVelZ = 0;
				doorWalkVelYaw = 0;
			}

			function handleDoorClick(event) {
				// live position, not the latch, so click-to-enter always works
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

			// opens the modal for an index and lights them. shared by raycast + minimap
			function selectPerson(index) {
				clickedPerson = respondents[index];
				clickedPersonIndex = index;
			}
			function closeModal() {
				clickedPerson = null;
				clickedPersonIndex = null;
			}
			selectPersonImpl = selectPerson;

			// modal for the clicked person. only raycasts visible people —
			// most of the ~2,500 are culled
			function handlePersonClick(event) {
				if (mode !== "walk") return;
				// clickable only from inside; outside, doors are the interaction
				if (!insideRoom) return;
				if (inputController.hasDragged || isPointerOverMinimap(event)) return;
				const rect = container.getBoundingClientRect();
				doorClickPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				doorClickPointer.y =
					-((event.clientY - rect.top) / rect.height) * 2 + 1;
				doorRaycaster.setFromCamera(doorClickPointer, camera);
				// walls/doors included, so the nearest hit must be a person
				const hits = doorRaycaster.intersectObjects(
					[
						...personRoots.filter((root) => root.visible),
						...occluderMeshes
					],
					true
				);
				// a click that lands on anything but a person dismisses the modal
				if (hits.length === 0) return closeModal();
				let obj = hits[0].object;
				while (obj && obj.userData.personIndex === undefined) obj = obj.parent;
				const index = obj?.userData.personIndex;
				if (index === undefined) return closeModal();
				selectPerson(index);
			}

			// raycasts wordmark + byline. shared by click and hover
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

			// clicking the topdown preview returns to walk mode
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

			// full brightness + pointer on hover
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

			// lights the label, not the panel. needs an explicit revert, since
			// nothing else writes that material per frame
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

			// the LOD pass reads this via a getter, so it only needs setting
			let hoveredPersonIndex = null;

			// one pass over everything clickable, in order, mutually exclusive.
			// skipped while a button is held, to leave the drag cursor alone
			function handlePointerHover(event) {
				// pointer movement takes hover from keyboard focus
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

				// doors only matter outside
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

			// keyboard equivalent of hover, outside. Tab or arrows cycle, Enter
			// activates, -1 = nothing. same highlight as mouse hover
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

			// arrows walk/strafe while held. space toggles topdown
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
					// outside, arrows cycle focus instead
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
					// event.repeat: don't rapid-fire on auto-repeat
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

			// drag-to-steer + scroll-to-walk. owns its gesture state, reads/writes
			// the target through these accessors
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
				getScrollWalkScale: scrollWalkScale,
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
			// no keyup fires if focus leaves mid-press
			window.addEventListener("blur", handleWindowBlur);

			// one camera pose. the topdown toggle swaps canvases, not the camera

			// throwaway camera for a look-at quaternion; Object3D.lookAt differs
			const poseHelper = new THREE.PerspectiveCamera();

			function computeWalkPose() {
				const yaw = cameraYaw;
				const pitch = cameraPitch;
				// spherical -> cartesian look direction
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
				// slides the shadow frustum with the walker
				keyLight.target.position.set(renderWalkX, 0, renderWalkZ);
				keyLight.position
					.copy(keyLightDir)
					.multiplyScalar(-KEY_LIGHT_SHADOW_DISTANCE)
					.add(keyLight.target.position);

				const pose = computeWalkPose();
				camera.position.copy(pose.position);
				camera.quaternion.copy(pose.quaternion);

				// keeps cameraLight on the walker
				cameraLight.position.copy(camera.position);
			}

			// raw target (0 = Y1, 1 = Y2). each person eases at their own pace
			const targetPositionBlend = $derived(positionMode === "Y2" ? 1 : 0);

			// the canvas's box, not the container's — in topdown it's the corner
			// box. updateStyle=false: inline sizes fight the CSS and, via this
			// observer, shrink the view each frame
			function resizeWebglCanvas() {
				const w = renderer.domElement.clientWidth;
				const h = renderer.domElement.clientHeight;
				if (w === 0 || h === 0) return;
				camera.aspect = w / h;
				// fov too, but only outside in walk mode. the first call here has
				// the real settled dimensions
				if (mode === "walk" && !hasEnteredRoom) {
					camera.fov = computeDoorVisibleFovDegrees(w / h);
					updateTextFovScale();
				}
				camera.updateProjectionMatrix();
				renderer.setSize(w, h, false);
				effect.setSize(w, h, false);
			}
			// observer, not a window "resize", so it catches the topdown swap
			const webglResizeObserver = new ResizeObserver(resizeWebglCanvas);
			webglResizeObserver.observe(renderer.domElement);

			// initial layout pass. dt = 0, so just base positions
			crowdAnimator.update(0, 0);

			let frameId;
			let lastFrameTime = performance.now();
			// from capped dt, not the wall clock, so a backgrounded tab doesn't
			// return with everything overdue
			let simulatedElapsed = 0;
			function animate() {
				frameId = requestAnimationFrame(animate);

				const now = performance.now();
				// clamped, so a backgrounded tab doesn't jump on return
				const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
				lastFrameTime = now;
				simulatedElapsed += dt;

				// held keys applied per frame, scaled by dt, not OS key-repeat
				const keyMoveDelta = KEY_MOVE_DELTA_PER_SECOND * dt;
				if (heldArrowKeys.has("ArrowUp")) walk(keyMoveDelta);
				if (heldArrowKeys.has("ArrowDown")) walk(-keyMoveDelta);
				if (heldArrowKeys.has("ArrowRight")) strafe(keyMoveDelta);
				if (heldArrowKeys.has("ArrowLeft")) strafe(-keyMoveDelta);

				// X lined up: release the queued Z and face forward, so it reads as
				// walking through rather than sliding in
				if (
					pendingDoorWalkZ !== null &&
					Math.abs(renderWalkX - targetWalkX) < DOOR_ALIGN_EPSILON
				) {
					targetWalkZ = pendingDoorWalkZ;
					pendingDoorWalkZ = null;
					targetCameraYaw = 0;
				}

				if (doorWalkEasing) {
					// carries velocity, so no jolt when the queued Z becomes the target
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

					// eased like the position, not a constant rate, so the turn
					// settles instead of stopping dead on arrival
					const yawResult = smoothDamp(
						0,
						shortestAngleDelta(cameraYaw, targetCameraYaw),
						doorWalkVelYaw,
						DOOR_WALK_SMOOTH_TIME,
						DOOR_WALK_YAW_SPEED,
						dt
					);
					cameraYaw = wrapAngle(cameraYaw + yawResult.value);
					doorWalkVelYaw = yawResult.velocity;

					// arrived: hand steering back
					if (
						Math.abs(targetWalkZ - renderWalkZ) < DOOR_WALK_SETTLE_DISTANCE &&
						Math.abs(targetWalkX - renderWalkX) < DOOR_WALK_SETTLE_DISTANCE &&
						Math.abs(doorWalkVelZ) < DOOR_WALK_SETTLE_SPEED &&
						pendingDoorWalkZ === null
					) {
						doorWalkEasing = false;
						targetCameraYaw = cameraYaw;
					}
				} else {
					// glide toward the target. ~63% of the distance per FOLLOW_TIME
					const followFactor = 1 - Math.exp(-dt / FOLLOW_TIME);
					renderWalkX += (targetWalkX - renderWalkX) * followFactor;
					renderWalkZ += (targetWalkZ - renderWalkZ) * followFactor;

					// steering snaps to the drag, so looking around tracks instantly
					cameraYaw = targetCameraYaw;
				}
				const entryPitchFactor = 1 - Math.exp(-dt / ROOM_ENTRY_PITCH_TIME);
				const targetEntryPitchOffset =
					renderWalkZ <= HALF_DEPTH ? ROOM_ENTRY_PITCH_TILT : 0;
				roomEntryPitchOffset +=
					(targetEntryPitchOffset - roomEntryPitchOffset) * entryPitchFactor;
				cameraPitch = targetCameraPitch + roomEntryPitchOffset;

				updateEnteredRoom();
				advanceCrowdColors(dt);
				crowdAnimator.update(dt, simulatedElapsed);
				updateCamera();
				updateDoors(dt);
				currentAge = zToAge(renderWalkZ);
				// stepping inside drops exterior focus, so no stuck highlight
				if (!insideRoom && renderWalkZ <= HALF_DEPTH && exteriorFocusIndex !== -1) {
					exteriorFocusIndex = -1;
					highlightExteriorFocus();
				}
				insideRoom = renderWalkZ <= HALF_DEPTH;

				// the light pushes back: past the wall the target eases home,
				// harder the deeper they've pressed in, so it reads magnetic
				if (targetWalkZ < MIN_WALK_Z) {
					const overshoot = MIN_WALK_Z - targetWalkZ;
					const pull = 1 - Math.exp(-dt / LIGHT_PUSHBACK_TIME);
					targetWalkZ += overshoot * pull;
					if (MIN_WALK_Z - targetWalkZ < 0.01) targetWalkZ = MIN_WALK_Z;
				}
				// shown once they're actually pressing into it
				inLight = renderWalkZ < MIN_WALK_Z + LIGHT_MESSAGE_MARGIN;
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
				if (exploreMode) {
					// story off; clear what it left on screen
					storyTexts = [];
					hidePanel = false;
					hideMap = false;
					highlightMap = false;
					hideYear = false;
					storyHasBeat = false;
				} else {
					storyBeats.update();
				}
				nearbyPanels.update(dt);

				// the outline pass draws everyone twice; skipped during the auto-walk,
				// back on the frame they enter
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

			// the fov solve covers door spread, not wordmark height, which can
			// crop on wide short windows. no-op if already in view
			function ensureWordmarkInView() {
				const box = new THREE.Box3().setFromObject(wordmarkLogo);
				const topPoint = new THREE.Vector3(
					(box.min.x + box.max.x) / 2,
					box.max.y,
					(box.min.z + box.max.z) / 2
				);
				// -> where the logo's top edge lands at a candidate pitch, CSS px.
				// negative = cropped
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

				// pitching up brings it down into frame. search up, then bisect
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
				// animate() rebuilds cameraPitch from the target each frame
				targetCameraPitch = hi;
				cameraPitch = hi;
			}
			ensureWordmarkInView();

			animate();

			// teardown
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
					// material arrays have no .dispose and would leak their texture
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

		// on destroy
		return () => {
			disposed = true;
			clearTimeout(modeVeilTimeout);
			cleanup();
		};
	});
</script>

<div
	class="lifedeath-room"
	class:topdown-active={mode === "topdown"}
	style="--bg-color: {BG_COLOR_CSS}; --click-cursor-url: url({asset(
		'/assets/app/click.svg'
	)});"
	bind:this={container}
>
	<!-- while the crowd loads: the sign and a spinner, middle of the screen -->
	{#if loadingMessage}
		<div
			class="loading-screen"
			class:loading-screen--out={loadingFading}
			style="--loading-fade-ms: {LOADING_FADE_MS}ms; --loading-line-ms: {LOADING_LINE_MS}ms"
		>
			{#if loadingSignRect}
				<div
					class="loading-sign"
					style="left:{loadingSignRect.centerX}px; top:{loadingSignRect.centerY}px; width:{loadingSignRect.width}px;"
				>
					{@html signSvg}
				</div>
			{/if}
			{#if loadingLineVisible}
				<svg
					class="loading-line"
					class:loading-line--out={loadingFading}
					viewBox="0 0 120 24"
					role="img"
					aria-label={loadingMessage}
				>
					<!-- deliberately uneven: tight wobbles, a long low swoop, a
					     tall spike. an even sine reads as a progress bar -->
					<path
						d="M2 13 C 4 9, 6 17, 9 12 S 11 6, 14 15 S 17 19, 21 10
						   S 24 2, 29 14 S 36 21, 43 11 S 48 8, 52 13
						   S 56 22, 61 12 S 64 3, 68 9 S 71 16, 75 11
						   S 82 1, 88 15 S 93 21, 99 10 S 104 6, 108 14
						   S 113 18, 118 12"
					/>
				</svg>
			{/if}
		</div>
	{/if}
	<!-- always mounted, faded via `hidden`, so it transitions -->
	<ControlPanel
		{variableOptions}
		bind:selectedVariable
		{legendData}
		bind:mode
		bind:positionMode
		{currentAge}
		{loadingMessage}
		hideYear={shouldHideYear}
		hideMap={shouldHideMap}
		hidden={shouldHidePanel}
		{exploreMode}
		bind:panelHeight={controlPanelHeight}
	/>
	{#if storyTexts.length > 0}
		<div
			class="story-overlay"
			class:no_map={shouldHideMap}
			onclick={(event) => {
				if (event.target.closest("[data-story-audio]")) toggleAudio();
			}}
			transition:fade
			bind:clientHeight={storyOverlayHeight}
		>
			<!-- keyed on the text, so changing beats re-mount the paragraphs
			     and replay their flash animation -->
			{#key storyTexts.join("\u0000")}
				{#each storyTexts as text}
					<p>{@html renderStoryText(text, audioOn)}</p>
				{/each}
			{/key}
		</div>
	{/if}
	<Minimap
		bind:this={minimapComponent}
		bind:mode
		{container}
		hidden={shouldHideMap}
		panelClear={panelClearPx}
		bottomClear={storyClearPx}
		bounce={shouldBounceMap}
		onAcknowledge={() => (minimapAcknowledged = true)}
		onPersonClick={(index) => selectPersonImpl?.(index)}
	/>
	<!-- covers the walk/topdown swap. CSS transition, not Svelte's, which
	     the render loop starves. last, so it sits over everything -->
	<div
		class="mode-veil"
		class:mode-veil--opaque={modeVeilVisible}
		style="--mode-fade-ms: {MODE_FADE_MS}ms"
	></div>
	<!-- shown while pressing into the light at the back wall -->
	<div class="light-message" class:light-message--on={inLight}>
		Hi, it's good to see you here. But you can't go in here right now.
	</div>
	<!-- background music, off by default -->
	<audio
		bind:this={audioEl}
		src={asset("/assets/app/Sunday.wav")}
		loop
		preload="none"
		onplay={() => (audioOn = true)}
		onpause={() => (audioOn = false)}
	></audio>
	<button
		class="audio-toggle"
		aria-pressed={audioOn}
		aria-label={audioOn ? "Mute music" : "Play music"}
		title={audioOn ? "Mute music" : "Play music"}
		onclick={toggleAudio}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z" />
			{#if audioOn}
				<path class="wave" d="M15.5 9.2a4 4 0 0 1 0 5.6" />
				<path class="wave" d="M18 6.8a7.4 7.4 0 0 1 0 10.4" />
			{:else}
				<path class="wave" d="M16 9.5l5 5M21 9.5l-5 5" />
			{/if}
		</svg>
	</button>
	<!-- leaves the story for free roaming, or returns to it -->
	<button
		class="explore-toggle"
		class:explore-toggle--hidden={inLight || currentAge < EXPLORE_MIN_AGE}
		onclick={() => {
			exploreMode = !exploreMode;
			if (exploreMode) {
				// stays on whichever wave is showing — the reader picks from here
			} else {
				// re-arm, so the current beat applies again
				storyBeatsImpl?.reset();
			}
		}}
	>
		{exploreMode ? "Return to story" : "Skip to explore"}
	</button>
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
		/* dvh tracks the real height as a mobile address bar shows/hides */
		height: 100vh;
		height: 100dvh;
		background: #0d0815;
		/* touch-drag drives the camera, not the page */
		touch-action: none;
		overscroll-behavior: none;
	}

	/* page takes the minimap's bg, so they read as one surface */
	.lifedeath-room.topdown-active {
		background: var(--bg-color);
	}

	.lifedeath-room :global(canvas) {
		display: block;
		touch-action: none;
	}

	/* full-bleed, or the corner box in topdown. resizeWebglCanvas keeps
	   resolution in sync. z-index 0 = below every overlay */
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
		/* click returns to walk mode */
		cursor: pointer;
	}

	/* no room for both the preview and the "Back to walk view" button */
	@media (max-width: 640px) {
		.lifedeath-room.topdown-active :global(canvas.webgl-canvas) {
			/* !important: only that outranks three.js's inline display */
			display: none !important;
		}
	}

	/* same bg as the topdown view, so the fade resolves into it.
	   pointer-events:none so it can't double-handle the click */
	.mode-veil {
		position: absolute;
		inset: 0;
		z-index: 40;
		pointer-events: none;
		background: var(--bg-color);
		opacity: 0;
		transition: opacity var(--mode-fade-ms) ease-out;
	}
	/* no transition in: opaque before the swap, then the rule above eases out */
	.mode-veil--opaque {
		opacity: 1;
		transition: none;
	}

	/* minimap styles itself */


	/* black on the white light, so it only reads once you're in it.
	   the shadows thicken it against the glow's bright edges */
	.light-message {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 12;
		pointer-events: none;
		width: min(560px, 80%);
		text-align: center;
		font-family: var(--font-mono);
		font-size: 1.35rem;
		line-height: 1.6;
		color: #000;
		text-shadow:
			0 0 6px rgba(0, 0, 0, 0.55),
			0 0 18px rgba(0, 0, 0, 0.35);
		opacity: 0;
		transition: opacity 420ms ease-out;
	}
	.light-message--on {
		opacity: 1;
	}

	/* load screen: the neon sign, small, with a spinner under it */
	.loading-screen {
		position: absolute;
		inset: 0;
		z-index: 40;
		pointer-events: none;
		background: var(--bg-color);
		opacity: 1;
		transition: opacity var(--loading-fade-ms) ease-out;
	}
	/* the whole overlay fades, revealing the scene behind it. the sign
	   fades with it, but the real one sits directly underneath at the same
	   size and place, so what reads is the black lifting off a sign that
	   was always there */
	.loading-screen--out {
		opacity: 0;
	}
	/* the load line is the one thing that shouldn't linger over the room.
	   it carries no transition at all, so this hides it outright */
	.loading-line--out {
		opacity: 0;
	}
	.loading-sign {
		position: absolute;
		/* centred on the projected rect, so left/top are its middle */
		transform: translate(-50%, -50%);
		/* unlit: dead glass tubing, no halo. the real sign is lit and sits
		   directly underneath at the same size and place, so the overlay
		   fading out reads as the neon coming on */
		filter: none;
	}
	.loading-sign :global(svg) {
		width: 100%;
		height: auto;
	}
	/* the artwork is white; dulled here to the colour unlit tube glass
	   takes against a dark room. the surrounding tube is a <rect> with a
	   white *stroke*, not a filled path, so it needs its own rule */
	.loading-sign :global(path) {
		fill: #392f3c;
	}
	.loading-sign :global(rect) {
		stroke: #392f3c;
	}
	.loading-line {
		position: absolute;
		/* dead centre of the screen, independent of the sign: the sign's
		   own rect resolves a frame or two later, and anchoring to it made
		   it jump */
		left: 50%;
		top: 50%;
		width: 120px;
		height: 24px;
		margin-left: -60px;
		margin-top: -12px;
		overflow: visible;
	}
	.loading-line path {
		fill: none;
		/* the room's neon pink, so the load reads as part of the piece */
		stroke: #ff36a8;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
		/* one dash as long as the path, walked along it: the line draws
		   itself, holds, then rubs itself out from the same end */
		stroke-dasharray: 240 240;
		animation: loading-draw var(--loading-line-ms) ease-in-out infinite;
	}
	@keyframes loading-draw {
		0% {
			stroke-dashoffset: 240;
		}
		45% {
			stroke-dashoffset: 0;
		}
		55% {
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dashoffset: -240;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.loading-line path {
			animation: none;
			stroke-dashoffset: 0;
		}
	}

	/* top-right, the corner the explore toggle used to hold */
	.audio-toggle {
		position: absolute;
		top: 10px;
		right: 12px;
		z-index: 30;
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		padding: 0;
		background: rgba(10, 5, 16, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0;
		color: rgba(255, 255, 255, 0.75);
		cursor: pointer;
		transition:
			color 150ms ease-out,
			border-color 150ms ease-out;
	}
	.audio-toggle:hover {
		color: #fff;
		border-color: #fff;
	}
	.audio-toggle svg {
		width: 19px;
		height: 19px;
		fill: currentColor;
	}
	/* the speaker body is filled; the waves/cross are strokes */
	.audio-toggle svg .wave {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
	}

	/* bottom-right, in the slot the top-down toggle used to hold: directly
	   under the minimap, matching its width */
	.explore-toggle {
		position: absolute;
		bottom: 10px;
		right: 10px;
		width: 124px;
		box-sizing: border-box;
		text-align: center;
		transition: opacity 320ms ease-out;
		z-index: 30;
		font-family: var(--font-serif);
		font-size: 0.85rem;
		color: rgba(255, 255, 255, 0.75);
		background: rgba(10, 5, 16, 0.85);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 0;
		padding: 0.4rem 0.5rem;
		cursor: pointer;
		transition:
			color 150ms ease-out,
			border-color 150ms ease-out;
	}
	.explore-toggle:hover {
		color: #fff;
		border-color: #fff;
	}
	/* tracks the minimap's own mobile width, so the two stack flush */
	@media (max-width: 640px) {
		.explore-toggle {
			width: min(100px, 25vw);
			font-size: 0.7rem;
			padding: 0.3rem 0.35rem;
		}
	}
	/* out of the way while the light's message is up */
	.explore-toggle--hidden {
		opacity: 0;
		pointer-events: none;
	}

	/* debug HUD. below the explore toggle */
	.debug-panel {
		position: absolute;
		top: 46px;
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
