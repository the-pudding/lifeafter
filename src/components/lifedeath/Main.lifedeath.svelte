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
	import {
		createStoryBeats,
		storyGapAgeRanges,
		STORY_AUDIO_TOKEN,
		STORY_EXPLORE_TOKEN,
		storyEndAge
	} from "./story/storyBeats.js";
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
	// story text: "all" shows anywhere, the rest only in their zone
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
		STORY_GAP_FLOOR_COLOR,
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
	// which view is large, what colours the crowd, and which wave it stands in
	let mode = $state("walk"); // "walk" | "topdown"
	let selectedVariable = $state(debugVariableParam ?? "AFTER_DEATH");
	let positionMode = $state("Y1"); // "Y1" | "Y2"

	// debug: mirrors the variable and age into the url
	$effect(() => {
		const variable = selectedVariable;
		const age = currentAge;
		if (!debugMode) return;
		const url = new URL(window.location.href);
		url.searchParams.set("variable", variable);
		if (age !== null) url.searchParams.set("age", age.toFixed(1));
		window.history.replaceState({}, "", url);
	});
	// legend data: either categorical items or a gradient with its range
	let legendData = $state(null);
	// the age at the walker's depth, null until the crowd loads
	let currentAge = $state(null);
	// the active story text, which can be more than one block
	let storyTexts = $state([]);
	// the audio toggle's markup; `playing` is an argument so the label stays live
	function storyAudioButton(playing) {
		const icon = playing
			? '<path class="wave" d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path class="wave" d="M18 6.8a7.4 7.4 0 0 1 0 10.4"/>'
			: '<path class="wave" d="M16 9.5l5 5M21 9.5l-5 5"/>';
		return (
			`<button class="story-audio" type="button" data-story-audio aria-pressed="${playing}">` +
			`<svg viewBox="0 0 24 24" aria-hidden="true">` +
			`<path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z"/>${icon}</svg>` +
			`${playing ? "Turn off audio" : "Turn on audio"}</button>`
		);
	}

	// the closing beat's way out, in the same pill as the audio toggle
	function storyExploreButton() {
		return (
			`<button class="story-audio" type="button" data-story-explore>` +
			`<svg viewBox="0 0 24 24" aria-hidden="true">` +
			`<path class="wave" d="M4 12h14M13 7l5 5-5 5"/></svg>` +
			`Skip to explore</button>`
		);
	}

	// turns markdown links into anchors, and the tokens into their buttons
	function renderStoryText(text, playing = false) {
		return text
			.replace(
				/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
				(_match, label, href) =>
					`<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
			)
			.split(STORY_AUDIO_TOKEN)
			.join(storyAudioButton(playing))
			.split(STORY_EXPLORE_TOKEN)
			.join(storyExploreButton());
	}
	// a story beat asked to hide the panel or minimap
	let hidePanel = $state(false);
	let hideMap = $state(false);
	// hl_minimap glows the map; hide_year hides the wave toggle
	let highlightMap = $state(false);
	let hideYear = $state(false);
	// whether any beat is active here at all
	let storyHasBeat = $state(false);
	// the active beat's id; {id}.mp3 narrates it
	let narrationId = $state(null);
	// the load screen's fade out, slow on purpose
	const LOADING_FADE_MS = 2600;
	// the label and line clear well before the veil does
	const LOADING_COPY_FADE_MS = 450;
	// the css transition starts a frame late, so the unmount waits that out
	const LOADING_UNMOUNT_BUFFER_MS = 160;
	// one full cycle of the wavy line, which nothing waits on
	const LOADING_LINE_MS = 5400;
	// the line is already drawing in #preboot, so this one picks it up at the
	// same point in the cycle rather than snapping back to undrawn
	const loadingLinePhaseMs =
		typeof performance === "undefined" ? 0 : Math.round(performance.now());

	// frames rendered under the overlay before the fade starts
	const LOADING_WARMUP_FRAMES = 4;

	// resolves after n animation frames, so heavy first frames finish first
	function waitForFrames(count) {
		return new Promise((resolve) => {
			let left = count;
			const step = () => (left-- > 0 ? requestAnimationFrame(step) : resolve());
			step();
		});
	}
	// no skip button before this age, which covers the plaza and the entrance
	const EXPLORE_MIN_AGE = 18;
	// how long a crowd recolour takes to settle
	const CROWD_RECOLOR_TIME = 0.35;
	// how far past the back wall the walker can press into the light
	const LIGHT_NUDGE_DEPTH = 2.2;
	// how quickly that overshoot eases back; lower is springier
	const LIGHT_PUSHBACK_TIME = 0.22;
	// how close to the wall the message appears
	const LIGHT_MESSAGE_MARGIN = 0.9;
	// true while pressed into the light
	let inLight = $state(false);
	// explore mode: no story text, no beat overrides, free movement
	// asked for by the reader, rather than fallen into by walking past the
	// end of the script
	let exploreExplicit = $state(false);
	// where the script runs out
	const STORY_END_AGE = storyEndAge(copy);
	const pastStoryEnd = $derived(
		STORY_END_AGE !== null && currentAge !== null && currentAge > STORY_END_AGE
	);
	// explore is on when they ask for it, or once they walk past the last
	// beat — walking back before it hands the story over again
	const exploreMode = $derived(exploreExplicit || pastStoryEnd);
	// a live inside check, which flips back on leaving
	let insideRoom = $state(false);
	// the debug hud's snapshot
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
	// hidden by a beat, by being outside, or by pressing into the light
	const shouldHidePanel = $derived(hidePanel || !insideRoom || inLight);
	const shouldHideMap = $derived(hideMap || !insideRoom || inLight);
	// the panel's height, so the topdown map can clear it
	let controlPanelHeight = $state(0);
	const panelClearPx = $derived(shouldHidePanel ? 0 : controlPanelHeight);
	// the story overlay's height, so the topdown map stops above it
	let storyOverlayHeight = $state(0);
	// no text reserves nothing
	const storyClearPx = $derived(
		storyTexts.length > 0 && mode !== "topdown" ? storyOverlayHeight : 0
	);
	// the first hover or click of the minimap stops the glow, for good
	let minimapAcknowledged = $state(false);
	// the wave toggle shows while a beat runs or while exploring
	const shouldHideYear = $derived(
		exploreMode ? false : hideYear || !storyHasBeat
	);
	// walk mode only, since topdown centres with its own transform
	const shouldBounceMap = $derived(
		highlightMap && !shouldHideMap && !minimapAcknowledged && mode === "walk"
	);
	// the vertical fov keeping all three doors in frame at any aspect
	const outermostDoorX =
		Math.max(...DOORS.map((d) => Math.abs(d.x))) + DOOR_WIDTH / 2;
	const distanceToDoors = DEFAULT_START_Z - DOOR_Z;
	const DOOR_VIEW_MARGIN = 1.35; // breathing room past the doors' exact edges; also sets how wide the walk view is
	const requiredHalfHorizontalFovRad =
		Math.atan(outermostDoorX / distanceToDoors) * DOOR_VIEW_MARGIN;
	const computeDoorVisibleFovDegrees = (aspect) =>
		computeFovForHorizontalHalfAngle(requiredHalfHorizontalFovRad, aspect);
	// world-sized text loses pixels at a wider fov, so it scales against 16:9
	const REFERENCE_ASPECT = 16 / 9;
	const REFERENCE_FOV = computeDoorVisibleFovDegrees(REFERENCE_ASPECT);
	// capped per surface: a label overruns its door long before the sign does
	const MAX_DOOR_LABEL_SCALE = 1.25;
	const MAX_SIGN_SCALE = 2.3;
	function computeTextFovScale(fovDegrees, maxScale) {
		const rawScale =
			Math.tan(THREE.MathUtils.degToRad(fovDegrees / 2)) /
			Math.tan(THREE.MathUtils.degToRad(REFERENCE_FOV / 2));
		return Math.min(rawScale, maxScale);
	}

	// the world height that lands the sign cluster this far down the screen
	const SIGN_SCREEN_FRACTION = 0.25;
	function signClusterTargetY(fovDegrees, signZ) {
		// ndc y runs +1 at the top to -1 at the bottom
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

	// background music, off until asked for
	let audioOn = $state(false);
	let sundayEl;
	let mondayEl;
	// the overlap when the score changes, long enough to dissolve
	const MUSIC_FADE_MS = 3000;
	// ducking has to be prompt, or the voice starts over the bed
	const MUSIC_DUCK_FADE_MS = 1300;
	// a dip either side of the loop point, so the repeat has a seam
	const MUSIC_LOOP_FADE_SECONDS = 2.5;
	const MUSIC_LOOP_FADE_FLOOR = 0.3;
	// monday scores what the reader drives, sunday the narrated beats
	const musicTrack = $derived(exploreMode || !storyHasBeat ? "monday" : "sunday");
	// the incoming and outgoing tracks for a given state
	function trackPair(track) {
		return track === "monday" ? [mondayEl, sundayEl] : [sundayEl, mondayEl];
	}

	// the pair currently ramping past each other, or null when settled
	let musicFade = null;
	// both tracks play at once; stepped from the render loop, not a timer
	function crossfadeMusic(incoming, outgoing) {
		musicFade = { incoming, outgoing };
	}
	// moves `current` toward `target` by at most `step`
	function approach(current, target, step) {
		if (current < target) return Math.min(target, current + step);
		return Math.max(target, current - step);
	}
	// what the mix wants each track at, before the loop fade below. kept
	// apart from element.volume, or the two would overwrite each other
	const musicLevels = new Map();
	const levelOf = (el) => musicLevels.get(el) ?? 0;

	// a track loops seamlessly, which lands the same bar twice with no seam.
	// dipping either side of the wrap gives it an ending and a beginning
	function loopFade(el) {
		if (!el || !Number.isFinite(el.duration) || el.duration <= 0) return 1;
		const fromEdge = Math.min(el.currentTime, el.duration - el.currentTime);
		if (fromEdge >= MUSIC_LOOP_FADE_SECONDS) return 1;
		const t = Math.max(0, fromEdge) / MUSIC_LOOP_FADE_SECONDS;
		return MUSIC_LOOP_FADE_FLOOR + (1 - MUSIC_LOOP_FADE_FLOOR) * t;
	}

	function advanceMusicFade(dt) {
		const crossStep = (dt * 1000) / MUSIC_FADE_MS;
		const duckStep = (dt * 1000) / MUSIC_DUCK_FADE_MS;
		// the active track eases toward its target, which drops under narration
		const target = narrationPlaying ? MUSIC_DUCK_VOLUME : 1;
		const [active] = trackPair(musicTrack);
		// a track change moves at the crossfade's pace, ducking at its own
		const isCrossfadingIn = musicFade?.incoming === active;
		if (active && !active.paused) {
			musicLevels.set(
				active,
				approach(levelOf(active), target, isCrossfadingIn ? crossStep : duckStep)
			);
		}
		if (musicFade) {
			const { incoming, outgoing } = musicFade;
			if (incoming && incoming.paused) musicLevels.set(incoming, target);
			if (outgoing) {
				musicLevels.set(outgoing, Math.max(0, levelOf(outgoing) - crossStep));
			}
			const incomingDone =
				!incoming || Math.abs(levelOf(incoming) - target) < 0.01;
			if (incomingDone && (!outgoing || levelOf(outgoing) <= 0)) {
				outgoing?.pause();
				musicFade = null;
			}
		}
		// the mix, dipped around each track's own loop point
		for (const el of [sundayEl, mondayEl]) {
			if (!el) continue;
			el.volume = Math.min(1, Math.max(0, levelOf(el) * loopFade(el)));
		}
	}

	// audioOn is set here, since a crossfade pauses the outgoing track
	function toggleAudio() {
		const [incoming, outgoing] = trackPair(musicTrack);
		if (!incoming) return;
		if (audioOn) {
			musicFade = null;
			incoming.pause();
			outgoing?.pause();
			audioOn = false;
			return;
		}
		musicLevels.set(incoming, 0);
		incoming.volume = 0;
		incoming.play().catch(() => {});
		crossfadeMusic(incoming, outgoing);
		audioOn = true;
	}

	// narration: a beat's {id}.mp3, played once on entry, over ducked music
	const NARRATION_VOLUME = 1;
	// element volume caps at 1, so the voice runs through a gain node
	const NARRATION_GAIN = 3.6;
	// quick: an interruption rather than a transition
	const NARRATION_FADE_MS = 350;
	// where the music sits while someone is talking
	const MUSIC_DUCK_VOLUME = 0.34;
	let narrationEl;
	let narrationFadingOut = false;
	// built once: the element can only be routed into the graph a single time
	let narrationSource = null;
	function ensureNarrationGain() {
		if (!narrationEl || narrationSource) return;
		try {
			audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
			narrationSource = audioContext.createMediaElementSource(narrationEl);
			// compressed first, or this much gain just clips
			const compressor = audioContext.createDynamicsCompressor();
			compressor.threshold.value = -26;
			compressor.knee.value = 28;
			compressor.ratio.value = 10;
			compressor.attack.value = 0.004;
			compressor.release.value = 0.22;
			const gain = audioContext.createGain();
			gain.gain.value = NARRATION_GAIN;
			narrationSource
				.connect(compressor)
				.connect(gain)
				.connect(audioContext.destination);
		} catch {
			// no web audio here, so it plays at the element's own volume
			narrationSource = null;
		}
	}
	// drives the ducking, so the music lifts as soon as it ends
	let narrationPlaying = $state(false);

	function stopNarration() {
		if (!narrationEl || narrationEl.paused) {
			narrationPlaying = false;
			return;
		}
		narrationFadingOut = true;
	}

	function advanceNarrationFade(dt) {
		if (!narrationEl || !narrationFadingOut) return;
		narrationEl.volume = Math.max(
			0,
			narrationEl.volume - (dt * 1000) / NARRATION_FADE_MS
		);
		if (narrationEl.volume <= 0) {
			narrationEl.pause();
			narrationFadingOut = false;
			narrationPlaying = false;
		}
	}

	// starts and stops with the beat, and only with sound on
	$effect(() => {
		const id = narrationId;
		const soundOn = audioOn;
		if (!narrationEl) return;
		if (!soundOn || !id) {
			stopNarration();
			return;
		}
		narrationFadingOut = false;
		ensureNarrationGain();
		if (audioContext?.state === "suspended") audioContext.resume();
		narrationEl.src = asset(`/assets/app/${id}.mp3`);
		narrationEl.volume = NARRATION_VOLUME;
		narrationEl.currentTime = 0;
		narrationPlaying = true;
		// a beat with no recording just stays quiet
		narrationEl.play().catch(() => {
			narrationPlaying = false;
		});
	});

	// a door's thunk: a low sine for the body, filtered noise for the knock
	function playDoorSound() {
		if (!audioOn) return;
		try {
			audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
			if (audioContext.state === "suspended") audioContext.resume();
			const start = audioContext.currentTime;

			const body = audioContext.createOscillator();
			const bodyGain = audioContext.createGain();
			body.type = "sine";
			body.frequency.setValueAtTime(190, start);
			body.frequency.exponentialRampToValueAtTime(70, start + 0.16);
			bodyGain.gain.setValueAtTime(0.0001, start);
			bodyGain.gain.exponentialRampToValueAtTime(0.22, start + 0.008);
			bodyGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.28);
			body.connect(bodyGain).connect(audioContext.destination);
			body.start(start);
			body.stop(start + 0.3);

			// a short noise burst, rolled off so it thuds rather than hisses
			const frames = Math.floor(audioContext.sampleRate * 0.06);
			const buffer = audioContext.createBuffer(1, frames, audioContext.sampleRate);
			const samples = buffer.getChannelData(0);
			for (let i = 0; i < frames; i++) {
				samples[i] = (Math.random() * 2 - 1) * (1 - i / frames);
			}
			const knock = audioContext.createBufferSource();
			knock.buffer = buffer;
			const filter = audioContext.createBiquadFilter();
			filter.type = "lowpass";
			filter.frequency.value = 900;
			const knockGain = audioContext.createGain();
			knockGain.gain.setValueAtTime(0.14, start);
			knockGain.gain.exponentialRampToValueAtTime(0.0001, start + 0.09);
			knock.connect(filter).connect(knockGain).connect(audioContext.destination);
			knock.start(start);
		} catch {
			// no audio available, so the door opens quietly
		}
	}

	// a synthesised blip for clicks, on the same switch as the music
	const CLICK_VOLUME = 0.09;
	let audioContext = null;
	function playClick() {
		if (!audioOn) return;
		try {
			audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
			if (audioContext.state === "suspended") audioContext.resume();
			const start = audioContext.currentTime;
			const osc = audioContext.createOscillator();
			const gain = audioContext.createGain();
			// a quick drop in pitch reads as a tap, not a beep
			osc.type = "sine";
			osc.frequency.setValueAtTime(1500, start);
			osc.frequency.exponentialRampToValueAtTime(620, start + 0.035);
			// ramped, since an instant cut is a pop
			gain.gain.setValueAtTime(0.0001, start);
			gain.gain.exponentialRampToValueAtTime(CLICK_VOLUME, start + 0.005);
			gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.07);
			osc.connect(gain).connect(audioContext.destination);
			osc.start(start);
			osc.stop(start + 0.08);
		} catch {
			// no audio available, so the click stays silent
		}
	}

	// every button clicks; people and the minimap fire at their own call sites
	$effect(() => {
		const onDocumentClick = (event) => {
			if (event.target.closest?.("button")) playClick();
		};
		document.addEventListener("click", onDocumentClick);
		return () => document.removeEventListener("click", onDocumentClick);
	});

	// pulls both tracks down once the scene is up, so a mode change can't stall
	function preloadMusic() {
		for (const el of [sundayEl, mondayEl]) {
			// load() rewinds and re-buffers, which would cut a track that the
			// reader has already started
			if (!el || !el.paused) continue;
			el.preload = "auto";
			el.load();
		}
	}

	// the score follows the mode, once the reader has asked for sound
	$effect(() => {
		const track = musicTrack;
		if (!audioOn) return;
		const [incoming, outgoing] = trackPair(track);
		if (!incoming) return;
		if (incoming.paused) {
			musicLevels.set(incoming, 0);
			incoming.volume = 0;
			incoming.play().catch(() => {});
		}
		crossfadeMusic(incoming, outgoing);
	});

	// non-empty until the data and models resolve
	let loadingMessage = $state("Loading people…");
	// kept mounted through the fade, so nothing cuts
	let loadingFading = $state(false);
	// measured eagerly, since the load screen paints on the first frame
	let viewport = $state({
		width: typeof window === "undefined" ? 0 : window.innerWidth,
		height: typeof window === "undefined" ? 0 : window.innerHeight
	});

	// where the facade sign will land once the scene is up
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

		// projected from the plaza camera
		const pitch = DEFAULT_CAMERA_PITCH;
		const halfFovTan = Math.tan(THREE.MathUtils.degToRad(fov / 2));
		const dz = DEFAULT_START_Z - placed.z;
		const dy = centerY - EYE_HEIGHT;
		const yCam = dy * Math.cos(pitch) - dz * Math.sin(pitch);
		const depth = dy * Math.sin(pitch) + dz * Math.cos(pitch);
		if (depth <= 0) return null;
		// world units to pixels at that depth; the vertical fov governs both
		const pxPerUnit = height / (2 * depth * halfFovTan);
		return {
			width: placed.width * pxPerUnit,
			height: placed.height * pxPerUnit,
			centerX: width / 2,
			centerY: height / 2 - yCam * pxPerUnit
		};
	});

	// the clicked person, or null when the modal is closed
	let clickedPerson = $state(null);
	// their index, read each frame to light them
	let clickedPersonIndex = $state(null);
	// a stable ref read at click time, so the minimap's callback stays one closure
	let selectPersonImpl = null;
	// leaving explore re-arms the beats, so the one they walk back into
	// applies again — however they left, by button or by walking
	let wasExploring = false;
	$effect(() => {
		const exploring = exploreMode;
		if (wasExploring && !exploring) storyBeatsImpl?.reset();
		wasExploring = exploring;
	});

	// set in buildScene, so the explore toggle can re-arm the beats
	let storyBeatsImpl = null;
	// entering topdown closes the modal
	$effect(() => {
		if (mode === "topdown") {
			clickedPerson = null;
			clickedPersonIndex = null;
		}
	});

	// covers the walk and topdown swap: snaps opaque, then eases out
	const MODE_FADE_MS = 260;
	let modeVeilVisible = $state(false);
	let modeVeilTimeout;
	// seeded, so the first render doesn't veil
	let lastVeiledMode = "walk";
	$effect(() => {
		const currentMode = mode;
		if (currentMode === lastVeiledMode) return;
		lastVeiledMode = currentMode;
		modeVeilVisible = true;
		clearTimeout(modeVeilTimeout);
		// one tick opaque, so the swap is painted over before it fades
		modeVeilTimeout = setTimeout(() => (modeVeilVisible = false), 16);
	});

	// the canvas host, as state so the minimap's prop updates on bind
	let container = $state();
	// bound, so onMount can call into it
	let minimapComponent;

	// dropdown options, grouped by parent
	const variableOptions = groupedVariableOptions({ colorableOnly: true });



	// app.html paints a stand-in before the bundle runs; this replaces it
	$effect(() => {
		document.getElementById("preboot")?.remove();
	});

	// the load screen is drawn before the scene's own resize handling exists
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
			// columnar on the wire for size, rebuilt into objects here
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
			// the first frames pay for shader compiles and texture uploads, which
			// would stutter the fade. they run under the opaque overlay instead
			await waitForFrames(LOADING_WARMUP_FRAMES);
			if (disposed) return;
			// fades rather than cuts, unmounting once it's done
			loadingFading = true;
			setTimeout(() => {
				loadingMessage = "";
				loadingFading = false;
			}, LOADING_FADE_MS + LOADING_UNMOUNT_BUFFER_MS);
			// the warmup frames above already cover the fade's worst moment, so
			// the tracks can start pulling down now
			preloadMusic();
		})();

		function buildScene(rawPeople, maleGltfs, femaleGltfs, heightScaleFor) {
			const maleModels = maleGltfs.map(prepareModel);
			const femaleModels = femaleGltfs.map(prepareModel);
			const allModels = [...maleModels, ...femaleModels];

			// a body matching their gender, else the full pool
			function pickModelForPerson(person) {
				if (person.GENDER === "Male")
					return maleModels[Math.floor(Math.random() * maleModels.length)];
				if (person.GENDER === "Female")
					return femaleModels[Math.floor(Math.random() * femaleModels.length)];
				return allModels[Math.floor(Math.random() * allModels.length)];
			}

			// model scales vary, so measure one and correct the rest
			const referenceHeight = new THREE.Box3()
				.setFromObject(allModels[0].scene)
				.getSize(new THREE.Vector3()).y;
			const WALKER_SCALE_CORRECTION =
				referenceHeight > 0 ? FIGURE_HEIGHT / referenceHeight : 1;

			// needs a clean answer and age in both waves
			const isAfterDeathAnswer = (value) =>
				value === "No" || value === "Unsure" || value === "Yes";
			const respondents = rawPeople.filter(
				(d) =>
					isAfterDeathAnswer(d.AFTER_DEATH_Y1) &&
					typeof d.AGE_Y1 === "number" &&
					isAfterDeathAnswer(d.AFTER_DEATH_Y2) &&
					typeof d.AGE_Y2 === "number"
			);

			// one age-to-depth scale for both waves, so the layouts compare
			const allAges = respondents.flatMap((d) => [d.AGE_Y1, d.AGE_Y2]);
			const ageMin = Math.min(...allAges) - 1;
			const ageMax = Math.max(...allAges);

			// young at the front, old at the back
			const { ageToZ, zToAge } = createAgeZMapping({
				ageMin,
				ageMax,
				halfDepth: HALF_DEPTH,
				roomDepth: ROOM_DEPTH
			});

			// the story layer, reading and writing the state above
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
					narrationId = result.narrationId;
				}
			});
			storyBeatsImpl = storyBeats;

			// given this room's geometry and each wave's accessors
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
			// everyone starts in the default wave's layout
			initializeCrowdState(respondents, y1Layout, y2Layout, positionMode === "Y2" ? 1 : 0, {
				heightScaleFor
			});

			const width = container.clientWidth;
			const height = container.clientHeight;

			// scene, camera and renderer

			const scene = new THREE.Scene();
			scene.background = new THREE.Color(BG_COLOR);
			// fog hides the back wall, tied to the lod bands so the cutoffs line up
			const FOG_NEAR = LOD_FREEZE_DISTANCE;
			const FOG_FAR = 50;
			const RENDER_CULL_DISTANCE = FOG_FAR;
			const walkFog = new THREE.Fog(BG_COLOR, FOG_NEAR, FOG_FAR);
			scene.fog = walkFog;

			// groups the inner wall and the crowd
			const innerRoomGroup = new THREE.Group();
			scene.add(innerRoomGroup);

			// best effort; the resize handler corrects it once css resolves
			const initialAspect = width / height;
			const fov = computeDoorVisibleFovDegrees(initialAspect);

			const camera = new THREE.PerspectiveCamera(fov, initialAspect, 0.1, 800);
			// the facade and its lights sit on their own layer
			const FACADE_LIGHT_LAYER = 1;
			camera.layers.enable(FACADE_LIGHT_LAYER);
			const renderer = new THREE.WebGLRenderer({ antialias: true });
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			// the box is css-driven, so inline sizes would fight it
			renderer.setSize(width, height, false);
			renderer.domElement.classList.add("webgl-canvas");
			renderer.shadowMap.enabled = true;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;
			container.appendChild(renderer.domElement);
			// the outline: an inflated back-face pass, wobbled per vertex
			const effect = new PencilOutlineEffect(renderer, {
				defaultThickness: OUTLINE_DEFAULT_THICKNESS,
				defaultColor: [0, 0, 0],
				defaultKeepAlive: true
			});

			// the minimap owns its canvas; this feeds it positions and colours

			// per-frame minimap positions, as typed arrays
			const minimapX = new Float32Array(respondents.length);
			const minimapZ = new Float32Array(respondents.length);
			const personColorCSS = new Array(respondents.length).fill(BG_COLOR_CSS);

			minimapComponent.init({
				roomWidth: ROOM_WIDTH,
				halfWidth: HALF_WIDTH,
				zoneWidth: ZONE_WIDTH,
				halfDepth: HALF_DEPTH,
				exteriorDepth: EXTERIOR_DEPTH,
				ageMin,
				ageMax,
				ageToZ
			});

			// directional only, so the toon facets stay hard-edged
			const AMBIENT_LIGHT_INTENSITY = 1.5;
			const ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY);
			scene.add(ambientLight);

			const keyLight = new THREE.DirectionalLight("#f5b0db", 10.8);
			keyLight.position.set(0, 1, -1); // from the doorway end, angled down
			scene.add(keyLight);
			scene.add(keyLight.target);

			// the only shadow caster, its frustum recentred each frame
			keyLight.castShadow = true;
			// big enough for the frustum it covers; the radius softens the rest
			keyLight.shadow.mapSize.set(4096, 4096);
			keyLight.shadow.radius = 3;
			keyLight.shadow.bias = -0.0015;
			// clears acne on the brick relief that depth bias alone missed
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

			const fillLight = new THREE.DirectionalLight(0x6a5a8a, 2.5);
			fillLight.position.set(0.6, 0.4, 1); // opposite side, dim — keeps the far side of every facet from going pure black
			scene.add(fillLight);


			// a short-range fill on the walker, so near faces never go black
			const cameraLight = new THREE.PointLight("#cbb8ff", 1.2, 10, 2);
			scene.add(cameraLight);

			// the toon ramp: two hard steps, short of white and black
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

			// a vertical gradient for walls and doors
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
				// mipmapping a one-pixel texture renders as a checkerboard
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

			// the x of each zone, shared by the shell and door builders
			const ZONE_XS = DOORS.map((door) => door.x);

			// the exterior, grouped so it hides in one go once inside
			const exteriorGroup = new THREE.Group();
			exteriorGroup.name = "exterior";
			scene.add(exteriorGroup);

			// the facade first: the doors' lamps are placed off its brick face
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
					doorWidth: DOOR_WIDTH,
					doorHeight: DOOR_HEIGHT,
					zoneXs: ZONE_XS,
					ageMin,
					ageMax,
					ageToZ,
					// the script's quiet stretches, as depth spans
					storyGapZRanges: storyGapAgeRanges(copy, ageMin, ageMax).map(
						([start, end]) => [ageToZ(start), ageToZ(end)]
					),
					storyGapFloorColor: STORY_GAP_FLOOR_COLOR,
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

			// applies the text scale, again once the fov is settled
			function updateTextFovScale() {
				const signScale = computeTextFovScale(camera.fov, MAX_SIGN_SCALE);
				const doorLabelScale = computeTextFovScale(camera.fov, MAX_DOOR_LABEL_SCALE);
				// x and y only, or scaling depth lifts them off the wall
				signGroup.scale.set(signScale, signScale, 1);
				// scaled and placed on its own, so a grown sign can't cover it
				byline.scale.set(signScale, signScale, 1);
				layoutSign(signScale, signClusterTargetY(camera.fov, signZ));
				for (const door of DOORS) {
					door.label.scale.set(doorLabelScale, doorLabelScale, 1);
				}
			}
			updateTextFovScale();

			// opens on approach, from further out than the facade blocks
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

			// skips the exterior once inside with the doors shut
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

			// pushes back to their side of the doors, unless one is open
			const resolveOuterDoorCollision = createOuterDoorCollisionResolver({
				doors: DOORS,
				doorZ: DOOR_Z,
				doorWidth: DOOR_WIDTH,
				facadeClearance: FACADE_CLEARANCE,
				doorPassableOpenAmount: DOOR_PASSABLE_OPEN_AMOUNT
			});

			// always open: the outer doors are the only gate
			const resolveInnerWallCollision = createInnerWallCollisionResolver({
				zoneXs: ZONE_XS,
				halfDepth: HALF_DEPTH,
				facadeClearance: FACADE_CLEARANCE,
				corridorWidth: DOOR_WIDTH
			});

			// one clone each, with their own skeleton and material
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

			// the per-frame crowd logic, fed live state through getters
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



			// the column for the current wave, else the only one
			function resolveColumn(baseVar) {
				const columns = getColumns(baseVar);
				return (
					columns.find((column) => column.endsWith(`_${positionMode}`)) ??
					columns[0]
				);
			}

			// the colours each body eases toward; the first pass snaps
			const personTargetColors = respondents.map(() => new THREE.Color());
			let hasAppliedColorVariable = false;

			function applyColorVariable(baseVar) {
				const config = variableConfig[baseVar];
				const column = resolveColumn(baseVar);
				const muted = new THREE.Color(MUTED_COLOR);
				const mutedCSS = `#${muted.getHexString()}`;

				// numeric answers aren't bucketed: each takes its own spot on the ramp
				const scale = config.type === "numeric" ? numericScale(baseVar) : null;
				legendData = scale
					? {
							kind: "gradient",
							min: scale.min,
							max: scale.max,
							// an open-ended top bucket keeps its plus in the legend
							maxLabel: scale.maxLabel,
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

				// the target colour; the minimap's copy follows the ease below
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
				// the first pass lands on its colours outright; later ones ease,
				// and the minimap is refreshed for as long as that runs
				if (hasAppliedColorVariable) recolorRampSeconds = CROWD_RECOLOR_TIME * 5;
				hasAppliedColorVariable = true;
			}

			// how much longer the minimap's colours are worth rewriting
			let recolorRampSeconds = 0;

			// eases every body toward its target colour
			function advanceCrowdColors(dt) {
				const factor = 1 - Math.exp(-dt / CROWD_RECOLOR_TIME);
				for (let i = 0; i < personBaseColors.length; i++) {
					personBaseColors[i].lerp(personTargetColors[i], factor);
				}
				// the dots fade with the crowd rather than cutting to the new colour
				if (recolorRampSeconds > 0) {
					recolorRampSeconds -= dt;
					for (let i = 0; i < personBaseColors.length; i++) {
						personColorCSS[i] = `#${personBaseColors[i].getHexString()}`;
					}
				}
			}

			// re-runs on a variable change, and on a wave change
			$effect(() => {
				applyColorVariable(selectedVariable);
			});

			// walk controls: drag steers, scroll walks, height is fixed

			// ?age= reopens at that depth instead of the door
			const debugAgeZ =
				debugAgeParam !== null && debugAgeParam !== "" ? ageToZ(Number(debugAgeParam)) : null;
			// where input wants the walker
			let targetWalkX = 0;
			let targetWalkZ = debugAgeZ ?? (debugMode ? DEBUG_START_Z : DEFAULT_START_Z);
			// where they actually are, gliding toward it
			let renderWalkX = targetWalkX;
			let renderWalkZ = targetWalkZ;

			// reopening at ?age= counts as already inside
			let hasEnteredRoom = debugAgeZ !== null;

			// the depth to walk once x lines up, so nothing clips the facade
			let pendingDoorWalkZ = null;
			const DOOR_ALIGN_EPSILON = 0.4;
			// true through a door walk, when the yaw eases rather than snaps
			let autoWalking = false;
			// the eased motion outlives autoWalking, which ends at the doorway
			let doorWalkEasing = false;
			// velocity fed back each frame, for a continuous handoff
			let doorWalkVelX = 0;
			let doorWalkVelZ = 0;
			let doorWalkVelYaw = 0;

			// the steering target, set instantly by input
			let targetCameraYaw = 0;
			let targetCameraPitch = DEFAULT_CAMERA_PITCH;
			// the actual heading and tilt, gliding toward it
			let cameraYaw = 0;
			let cameraPitch = DEFAULT_CAMERA_PITCH;
			// an extra tilt once inside, added on top so dragging stays 1:1
			let roomEntryPitchOffset = 0;

			// moves the target along a ground direction; shared by walk and strafe
			function moveDirection(dirX, dirZ, rawDelta) {
				// the cornered preview isn't a control surface
				if (mode !== "walk") return;
				// their own input wins over the tail of a door walk
				doorWalkEasing = false;
				// outside, only a door click moves them, unless they're exploring
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
				// the back wall is soft: they can press into the light a little
				targetWalkZ = Math.min(
					MAX_WALK_Z,
					Math.max(MIN_WALK_Z - LIGHT_NUDGE_DEPTH, targetWalkZ + dirZ * distance)
				);
				targetWalkZ = resolveOuterDoorCollision(targetWalkX, targetWalkZ);
				targetWalkZ = resolveInnerWallCollision(targetWalkX, targetWalkZ);
			}

			// gesture walking eases off on narrow viewports
			function scrollWalkScale() {
				const viewportWidth = window.innerWidth;
				const span = SCROLL_WALK_WIDE_WIDTH - SCROLL_WALK_NARROW_WIDTH;
				const t = Math.min(
					1,
					Math.max(0, (viewportWidth - SCROLL_WALK_NARROW_WIDTH) / span)
				);
				return SCROLL_WALK_MIN_SCALE + (1 - SCROLL_WALK_MIN_SCALE) * t;
			}

			// positive walks forward
			function walk(rawDelta) {
				// forward along the ground, for the current heading
				moveDirection(Math.sin(targetCameraYaw), -Math.cos(targetCameraYaw), rawDelta);
			}

			// positive strafes right
			function strafe(rawDelta) {
				moveDirection(Math.cos(targetCameraYaw), Math.sin(targetCameraYaw), rawDelta);
			}

			const doorRaycaster = new THREE.Raycaster();
			const doorClickPointer = new THREE.Vector2();
			// past the inner wall, so entry registers as the walk finishes
			const AUTO_WALK_INSIDE_Z = HALF_DEPTH - 4;

			// what blocks a click; doors go in by hinge, so a swing still blocks
			const occluderMeshes = [
				backWall,
				leftWall,
				rightWall,
				...innerWallMeshes,
				...DOORS.map((d) => d.hinge)
			];

			// the info panels, built after the crowd they attach to
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
				getHasStoryText: () => storyTexts.length > 0,
				getHoveredPersonIndex: () => hoveredPersonIndex
			});

			// whether the pointer is over the minimap, which clicks shouldn't cross
			function isPointerOverMinimap(event) {
				return minimapComponent.containsPoint(event.clientX, event.clientY);
			}

			// sets the walk target through a door: across first, then forward
			function walkThroughDoor(door) {
				playDoorSound();
				targetWalkX = door.x;
				pendingDoorWalkZ = AUTO_WALK_INSIDE_Z;
				autoWalking = true;
				doorWalkEasing = true;
				doorWalkVelX = 0;
				doorWalkVelZ = 0;
				doorWalkVelYaw = 0;
			}

			function handleDoorClick(event) {
				// the live position, so click-to-enter always works
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

			// opens the modal for a person and lights them
			function selectPerson(index) {
				playClick();
				clickedPerson = respondents[index];
				clickedPersonIndex = index;
			}
			function closeModal() {
				clickedPerson = null;
				clickedPersonIndex = null;
			}
			selectPersonImpl = selectPerson;

			// opens the modal on a click, raycasting only visible people
			function handlePersonClick(event) {
				if (mode !== "walk") return;
				// only from inside; outside, the doors are the interaction
				if (!insideRoom) return;
				if (inputController.hasDragged || isPointerOverMinimap(event)) return;
				const rect = container.getBoundingClientRect();
				doorClickPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
				doorClickPointer.y =
					-((event.clientY - rect.top) / rect.height) * 2 + 1;
				doorRaycaster.setFromCamera(doorClickPointer, camera);
				// walls and doors included, so the nearest hit has to be a person
				const hits = doorRaycaster.intersectObjects(
					[
						...personRoots.filter((root) => root.visible),
						...occluderMeshes
					],
					true
				);
				// a click on anything else dismisses the modal
				if (hits.length === 0) return closeModal();
				let obj = hits[0].object;
				while (obj && obj.userData.personIndex === undefined) obj = obj.parent;
				const index = obj?.userData.personIndex;
				if (index === undefined) return closeModal();
				selectPerson(index);
			}

			// raycasts the wordmark and byline, for both click and hover
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

			// full brightness and a pointer on hover
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

			// lights the label rather than the panel, so it needs reverting by hand
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

			// the lod pass reads this and applies it each frame
			let hoveredPersonIndex = null;

			// one pass over everything hoverable, skipped while a button is held
			function handlePointerHover(event) {
				// moving the pointer takes hover back from keyboard focus
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

				// doors only matter from outside
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

			// the keyboard equivalent of hover, outside: tab or arrows cycle
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

			// arrows walk and strafe while held; space toggles topdown
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
					// ignores auto-repeat, so it doesn't rapid-fire
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

			// the gesture controller, driving the targets through these accessors
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

			// one camera pose; the topdown toggle swaps canvases, not cameras

			// a throwaway camera, since Object3D's own lookAt differs
			const poseHelper = new THREE.PerspectiveCamera();

			function computeWalkPose() {
				const yaw = cameraYaw;
				const pitch = cameraPitch;
				// spherical angles to a look direction
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
				// slides the shadow frustum along with the walker
				keyLight.target.position.set(renderWalkX, 0, renderWalkZ);
				keyLight.position
					.copy(keyLightDir)
					.multiplyScalar(-KEY_LIGHT_SHADOW_DISTANCE)
					.add(keyLight.target.position);

				const pose = computeWalkPose();
				camera.position.copy(pose.position);
				camera.quaternion.copy(pose.quaternion);

				// keeps the fill light on the walker
				cameraLight.position.copy(camera.position);
			}

			// the wave target, 0 to 1; each person eases at their own pace
			const targetPositionBlend = $derived(positionMode === "Y2" ? 1 : 0);

			// measured off the canvas, not the container, which differ in topdown
			function resizeWebglCanvas() {
				const w = renderer.domElement.clientWidth;
				const h = renderer.domElement.clientHeight;
				if (w === 0 || h === 0) return;
				camera.aspect = w / h;
				// the fov too, but only outside in walk mode
				if (mode === "walk" && !hasEnteredRoom) {
					camera.fov = computeDoorVisibleFovDegrees(w / h);
					updateTextFovScale();
				}
				camera.updateProjectionMatrix();
				renderer.setSize(w, h, false);
				effect.setSize(w, h, false);
			}
			// an observer rather than a window resize, so it catches the topdown swap
			const webglResizeObserver = new ResizeObserver(resizeWebglCanvas);
			webglResizeObserver.observe(renderer.domElement);

			// an initial layout pass, with no time elapsed
			crowdAnimator.update(0, 0);

			let frameId;
			let lastFrameTime = performance.now();
			// accumulated from capped frames, so a backgrounded tab can't run up a debt
			let simulatedElapsed = 0;
			function animate() {
				frameId = requestAnimationFrame(animate);

				const now = performance.now();
				// clamped, so a backgrounded tab doesn't jump on return
				const dt = Math.min(0.1, (now - lastFrameTime) / 1000);
				lastFrameTime = now;
				simulatedElapsed += dt;

				// held keys applied per frame rather than by key repeat
				const keyMoveDelta = KEY_MOVE_DELTA_PER_SECOND * dt;
				if (heldArrowKeys.has("ArrowUp")) walk(keyMoveDelta);
				if (heldArrowKeys.has("ArrowDown")) walk(-keyMoveDelta);
				if (heldArrowKeys.has("ArrowRight")) strafe(keyMoveDelta);
				if (heldArrowKeys.has("ArrowLeft")) strafe(-keyMoveDelta);

				// once lined up, release the queued depth and face forward
				if (
					pendingDoorWalkZ !== null &&
					Math.abs(renderWalkX - targetWalkX) < DOOR_ALIGN_EPSILON
				) {
					targetWalkZ = pendingDoorWalkZ;
					pendingDoorWalkZ = null;
					targetCameraYaw = 0;
				}

				if (doorWalkEasing) {
					// carries velocity, so the queued depth arrives without a jolt
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

					// eased like the position, so the turn settles rather than stops dead
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

					// arrived, so steering goes back to the reader
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
					// glides toward the target
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
				advanceMusicFade(dt);
				advanceNarrationFade(dt);
				advanceCrowdColors(dt);
				crowdAnimator.update(dt, simulatedElapsed);
				updateCamera();
				updateDoors(dt);
				currentAge = zToAge(renderWalkZ);
				// stepping inside drops exterior focus, so nothing stays lit
				if (!insideRoom && renderWalkZ <= HALF_DEPTH && exteriorFocusIndex !== -1) {
					exteriorFocusIndex = -1;
					highlightExteriorFocus();
				}
				insideRoom = renderWalkZ <= HALF_DEPTH;

				// past the wall the target eases home, harder the deeper they press
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
					// story off, so clear what it left on screen
					narrationId = null;
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

				// the outline pass draws everyone twice, so it waits out the door walk
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

			// the fov solve covers the doors, not the wordmark, which can crop
			function ensureWordmarkInView() {
				const box = new THREE.Box3().setFromObject(wordmarkLogo);
				const topPoint = new THREE.Vector3(
					(box.min.x + box.max.x) / 2,
					box.max.y,
					(box.min.z + box.max.z) / 2
				);
				// where the logo's top edge lands at a given pitch; negative is cropped
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

				// pitching up brings it into frame: search, then bisect
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
				// the frame loop rebuilds the pitch from this target
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
					// material arrays have no dispose of their own
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
	style="background: var(--bg-color); --click-cursor-url: url({asset(
		'/assets/app/click.svg'
	)});"
	bind:this={container}
>
	<!-- the load screen: the sign, a label and the drawn line -->
	{#if loadingMessage}
		<div
			class="loading-screen"
			class:loading-screen--out={loadingFading}
			style="--loading-fade-ms: {LOADING_FADE_MS}ms; --loading-copy-fade-ms: {LOADING_COPY_FADE_MS}ms; --loading-line-ms: {LOADING_LINE_MS}ms; --loading-line-phase: -{loadingLinePhaseMs}ms"
		>
			{#if loadingSignRect}
				<div
					class="loading-sign"
					class:loading-hide={loadingFading}
					style="left:{loadingSignRect.centerX}px; top:{loadingSignRect.centerY}px; width:{loadingSignRect.width}px;"
				>
					{@html signSvg}
				</div>
			{/if}
			<div class="loading-label" class:loading-hide={loadingFading}>loading…</div>
			<!-- the line is static; two wipes in the page colour draw and rub it
			     out, since only transforms keep running when the thread blocks -->
			<div
				class="loading-line"
				class:loading-hide={loadingFading}
				role="img"
				aria-label={loadingMessage}
			>
				<svg class="loading-line-art" viewBox="0 0 120 24">
					<!-- deliberately uneven; an even sine reads as a progress bar -->
					<path
						d="M2 13 C 4 9, 6 17, 9 12 S 11 6, 14 15 S 17 19, 21 10
						   S 24 2, 29 14 S 36 21, 43 11 S 48 8, 52 13
						   S 56 22, 61 12 S 64 3, 68 9 S 71 16, 75 11
						   S 82 1, 88 15 S 93 21, 99 10 S 104 6, 108 14
						   S 113 18, 118 12"
					/>
				</svg>
				<div class="loading-line-wipe loading-line-wipe--draw"></div>
				<div class="loading-line-wipe loading-line-wipe--rub"></div>
			</div>
		</div>
	{/if}
	<!-- always mounted, faded by `hidden`, so it can transition -->
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
	{#if storyTexts.length > 0 && mode !== "topdown"}
		<div
			class="story-overlay"
			class:no_map={shouldHideMap}
			onclick={(event) => {
				if (event.target.closest("[data-story-audio]")) toggleAudio();
				if (event.target.closest("[data-story-explore]")) exploreExplicit = true;
			}}
			transition:fade
			bind:clientHeight={storyOverlayHeight}
		>
			<!-- keyed on the text, so a new beat replays the flash -->
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
		onClickSound={playClick}
		onPersonClick={(index) => selectPersonImpl?.(index)}
	/>
	<!-- covers the walk and topdown swap, over everything else -->
	<div
		class="mode-veil"
		class:mode-veil--opaque={modeVeilVisible}
		style="--mode-fade-ms: {MODE_FADE_MS}ms"
	></div>
	<!-- shown while pressing into the light at the back wall -->
	<div class="light-message" class:light-message--on={inLight}>
		Hi, it's good to see you. But you can't go in here right now.
	</div>
	<!-- background music, off by default -->
	<!-- neither is fetched until the reader turns sound on -->
	<audio
		bind:this={sundayEl}
		src={asset("/assets/app/Sunday.mp3")}
		loop
		preload="none"
	></audio>
	<!-- the beat's own recording, one element re-pointed per beat -->
	<audio
		bind:this={narrationEl}
		preload="none"
		onended={() => (narrationPlaying = false)}
		onerror={() => (narrationPlaying = false)}
	></audio>
	<audio
		bind:this={mondayEl}
		src={asset("/assets/app/Monday.mp3")}
		loop
		preload="none"
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
	{#if mode === "topdown"}
		<!-- the map is the whole view here, so this offers only the way back -->
		<button
			class="explore-toggle explore-toggle--wide"
			onclick={() => (mode = "walk")}
		>
			Return to walk mode
		</button>
	{:else}
		<button
			class="explore-toggle"
			class:explore-toggle--hidden={inLight ||
				currentAge < EXPLORE_MIN_AGE ||
				pastStoryEnd}
			onclick={() => (exploreExplicit = !exploreExplicit)}
		>
			{exploreMode ? "Return to story" : "Skip to explore"}
		</button>
	{/if}
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
		/* dvh tracks the real height as a mobile address bar moves */
		height: 100vh;
		height: 100dvh;
		background: var(--bg-color) !important;
		/* a touch drag drives the camera, not the page */
		touch-action: none;
		overscroll-behavior: none;
	}

	/* the page takes the minimap's background, so they read as one surface */
	.lifedeath-room.topdown-active {
		background: var(--bg-color);
	}

	.lifedeath-room :global(canvas) {
		display: block;
		touch-action: none;
	}

	/* full-bleed, or the corner box in topdown, below every overlay */
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
		/* shares a right edge and width with the button below it */
		right: 10px;
		bottom: 50px;
		width: 200px;
		height: 150px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		z-index: 6;
		/* clicking it returns to walk mode */
		cursor: pointer;
	}

	/* below this there's no room for the preview beside the map */
	@media (max-width: 900px) {
		.lifedeath-room.topdown-active :global(canvas.webgl-canvas) {
			/* important, since three sets display inline */
			display: none !important;
		}
	}

	/* the same background as the topdown view, so the fade resolves into it */
	.mode-veil {
		position: absolute;
		inset: 0;
		z-index: 40;
		pointer-events: none;
		background: var(--bg-color);
		opacity: 0;
		transition: opacity var(--mode-fade-ms) ease-out;
	}
	/* opaque before the swap, then the rule above eases it out */
	.mode-veil--opaque {
		opacity: 1;
		transition: none;
	}

	/* the minimap styles itself */


	/* black on the white light, so it only reads once you're in it */
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

	/* the load screen: the sign, the label and the line */
	.loading-screen {
		position: absolute;
		inset: 0;
		z-index: 40;
		pointer-events: none;
		background: var(--bg-color);
		opacity: 1;
		transition: opacity var(--loading-fade-ms) ease-out;
		/* its own layer, so the render loop's frames can't stutter the fade */
		will-change: opacity;
	}
	/* the overlay fades, revealing the scene behind it */
	.loading-screen--out {
		opacity: 0;
	}
	.loading-sign {
		position: absolute;
		/* centred on the projected rect, so left and top are its middle */
		transform: translate(-50%, -50%);
		/* unlit, so the overlay fading out reads as the neon coming on */
		filter: none;
		/* it sits exactly over the real sign, so it dissolves at the veil's own
		   pace: the tubing lights up in place rather than blinking out first */
		transition: opacity var(--loading-fade-ms) ease-out;
		will-change: opacity;
	}
	.loading-sign :global(svg) {
		width: 100%;
		height: auto;
		display: block;
	}
	/* unlit pink tubing; the outline is a stroked rect, so it needs its own rule */
	.loading-sign :global(path) {
		fill: #6b3350;
	}
	.loading-sign :global(rect) {
		stroke: #6b3350;
	}

	/* sits just above the line, on the same axis */
	.loading-label {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
		margin-top: -38px;
		font-family: var(--font-serif);
		font-size: 0.85rem;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.65);
		white-space: nowrap;
	}
	.loading-line {
		position: absolute;
		/* centred on the screen, not on the sign, whose rect resolves later */
		left: 50%;
		top: 50%;
		width: 120px;
		height: 24px;
		margin-left: -60px;
		margin-top: -12px;
		/* clips the wipes when they sit outside */
		overflow: hidden;
	}
	.loading-line-art {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
	/* the line itself, drawn once and never animated */
	.loading-line-art path {
		fill: none;
		/* the room's neon pink */
		stroke: #ff36a8;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	/* the page colour, so a wipe over the line reads as bare background */
	.loading-line-wipe {
		position: absolute;
		inset: 0;
		background: var(--bg-color);
		/* its own layer: transforms then run on the compositor, which keeps
		   going while the main thread is busy loading */
		will-change: transform;
	}
	/* slides off to the right, uncovering the line left to right */
	.loading-line-wipe--draw {
		animation: loading-draw var(--loading-line-ms) ease-in-out infinite;
		/* negative, so it resumes where #preboot's copy had got to */
		animation-delay: var(--loading-line-phase, 0ms);
	}
	/* waits off to the left, then slides across to rub the line out */
	.loading-line-wipe--rub {
		animation: loading-rub var(--loading-line-ms) ease-in-out infinite;
		animation-delay: var(--loading-line-phase, 0ms);
	}
	@keyframes loading-draw {
		0% {
			transform: translateX(0);
		}
		45%,
		100% {
			transform: translateX(100%);
		}
	}
	@keyframes loading-rub {
		0%,
		55% {
			transform: translateX(-100%);
		}
		100% {
			transform: translateX(0);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.loading-line-wipe--draw {
			animation: none;
			transform: translateX(100%);
		}
		.loading-line-wipe--rub {
			animation: none;
			transform: translateX(-100%);
		}
	}

	/* the sign cross-fades with the veil; the label and line have nothing
	   behind them, so they clear early and quickly */
	.loading-hide {
		opacity: 0;
	}
	.loading-label,
	.loading-line {
		transition: opacity var(--loading-copy-fade-ms) ease-out;
		will-change: opacity;
	}

	/* top-right */
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
	/* the speaker body is filled; the waves and cross are strokes */
	.audio-toggle svg .wave {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.7;
		stroke-linecap: round;
	}

	/* bottom-right, under the minimap and matching its width */
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
		font-size: 0.95rem;
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
	/* tracks the minimap's width at every size, so the two stack flush */
	@media (min-width: 1400px) {
		.explore-toggle {
			width: 178px;
		}
	}
	@media (min-width: 1800px) {
		.explore-toggle {
			width: 208px;
		}
	}
	/* tracks the minimap's mobile width, so the two stack flush */
	@media (max-width: 640px) {
		.explore-toggle {
			width: min(100px, 25vw);
			font-size: 0.7rem;
			padding: 0.3rem 0.35rem;
		}
	}
	/* matches the preview above it, fixed so the two line up whatever the label */
	.explore-toggle--wide {
		width: 200px;
	}
	/* out of the way while the light's message is up */
	.explore-toggle--hidden {
		opacity: 0;
		pointer-events: none;
	}

	/* the debug hud */
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
