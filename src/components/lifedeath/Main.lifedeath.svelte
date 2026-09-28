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
	import { createSoundFx } from "./utilities/soundFx.js";
	import { createDust } from "./room/dust.js";
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
		GRADIENT_PALETTE,
		highlightCSS
	} from "$data/variable_config.js";
	// story text: "all" shows anywhere, the rest only in their zone
	import copy from "$data/copy.json";
	import narrationTimings from "$data/narration_timings.json";

	import signSvg from "$svg/sign.svg?raw";
	import ControlPanel from "./ControlPanel.svelte";
	import Modal from "./Modal.lifedeath.svelte";
	import Minimap from "./Minimap.lifedeath.svelte";
	import StoryChart from "./story/StoryChart.svelte";
	import InfoModal from "./InfoModal.lifedeath.svelte";
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
		SCREEN_RECORD_TEXT_SCALE,
		screenRecordMode,
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
	// true through the camera flight between the two modes
	let flightActive = $state(false);
	// hides the minimap while a flight crossfades it in or out
	let mapVeiled = $state(false);
	// the flight flips mode itself mid-sequence, so those flips skip the veil
	let suppressModeVeil = false;
	// set by buildScene; the markup routes mode changes through it when it can
	let requestModeImpl = null;
	// the flight and the map proper read as one view to the overlays
	const mapView = $derived(mode === "topdown" || flightActive);

	// injects the hl-* highlight styles (a literal tag here breaks the preprocessor)
	$effect(() => {
		const styleEl = document.createElement("style");
		styleEl.textContent = highlightCSS;
		document.head.appendChild(styleEl);
		return () => styleEl.remove();
	});
	// the between-beats nudge: an arrow spun toward the light each frame
	let walkHintOn = $state(false);
	// turned away from the story's front: the hint area offers a way back
	let keepGoingOn = $state(false);
	// set by the scene, where the walk targets live
	let keepGoingImpl = null;
	// topdown: the map's walker line dragged to a new spot
	let walkerDragImpl = null;
	// the screen-reader door buttons' way in, set by the scene
	let enterDoorImpl = null;
	// what just happened in the scene, spoken through a live region
	let sceneAnnouncement = $state("");
	// a beat's optional inline chart: { name, caption } (see StoryChart.svelte)
	let storyChart = $state(null);
	// the walker's unrounded age, for the chart's position marker
	let walkAgeExact = $state(null);
	// the decade flash: "Ages 30 to 39", centered; fades in, holds, fades out
	let decadeFlash = $state(null); // { text, key }
	// the decade the walker was last in; null outside the room
	let lastWalkDecade = null;
	// the beat the walker is in; its floor span stays lit
	let lastFlashedBeatAge = null;
	let beatFloorFlashImpl = null;
	let walkHintAngle = $state(0);
	let selectedVariable = $state(debugVariableParam ?? "AFTER_DEATH");
	// the room opens on wave 1; beats without a wave still default to Y2
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
	// ?screenrecord: every scaled font size reads --text-scale off the root,
	// so setting it here reaches the overlays and the modals alike
	$effect(() => {
		if (!screenRecordMode) return;
		const root = document.documentElement;
		root.style.setProperty("--text-scale", String(SCREEN_RECORD_TEXT_SCALE));
		return () => root.style.removeProperty("--text-scale");
	});
	// legend data: either categorical items or a gradient with its range
	let legendData = $state(null);
	// the age at the walker's depth, null until the crowd loads
	let currentAge = $state(null);
	// the active story text, which can be more than one block
	let storyTexts = $state([]);
	// the beats' text with markup stripped, for the screen-reader live region
	const storyPlainText = $derived(
		storyTexts
			.map((text) => text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim())
			.join(" ")
	);
	// the audio toggle's markup; `playing` is an argument so the label stays live
	function storyAudioButton(playing) {
		const icon = playing
			? '<path class="wave" d="M15.5 9.2a4 4 0 0 1 0 5.6"/><path class="wave" d="M18 6.8a7.4 7.4 0 0 1 0 10.4"/>'
			: '<path class="wave" d="M16 9.5l5 5M21 9.5l-5 5"/>';
		return (
			// while off, the label bounces, asking for the click
			`<button class="story-audio${playing ? "" : " story-audio--nudge"}" type="button" data-story-audio aria-pressed="${playing}">` +
			`<svg viewBox="0 0 24 24" aria-hidden="true">` +
			`<path d="M4 9.5h3.2L12 5.4v13.2L7.2 14.5H4z"/>${icon}</svg>` +
			`<span class="story-audio-label">${playing ? "Turn off narration and music" : "Turn on narration (recommended)"}</span>` +
			`<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span></button>`
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

	// touch screens tap and swipe, and have no keys to mention
	const touchHints =
		typeof window !== "undefined" &&
		!window.matchMedia("(hover: hover) and (pointer: fine)").matches;
	function localizeHintVerbs(text) {
		if (!touchHints) return text;
		return text.replace(
			/(<div class="hints[^"]*">)([\s\S]*?)(<\/div>)/g,
			(_match, open, inner, close) =>
				open +
				inner
					.replace(/\s*or arrow keys/gi, "")
					.replace(/\s*or spacebar/gi, "")
					.replace(/\bclick\b/gi, (word) => (word[0] === "C" ? "Tap" : "tap"))
					.replace(/\bscroll\b/gi, (word) => (word[0] === "S" ? "Swipe" : "swipe")) +
				close
		);
	}

	// ?screenrecord wants the prose alone: no keycaps, no inline buttons
	function stripInteractionHints(text) {
		return text
			.replace(/<div class="hints[^"]*">[\s\S]*?<\/div>/g, "")
			.split(STORY_EXPLORE_TOKEN)
			.join("")
			.split(STORY_AUDIO_TOKEN)
			.join("")
			.trim();
	}

	// wraps each spoken word in its own span, so the render loop can light it
	// as the voice arrives. indices follow the aligned word list rather than
	// the markup: a word the copy splits across a tag — the link's "Study"
	// and the "." after it — stays one word, and what is never read aloud
	// (hint keycaps, the inline audio button) is passed over
	function wrapNarratedWords(html, words) {
		let out = "";
		let wordIndex = 0;
		// how much of the current word previous runs have already covered
		let consumed = 0;
		let skipTag = null;
		let skipDepth = 0;

		function emitText(chunk) {
			if (!chunk) return;
			if (skipDepth > 0 || wordIndex >= words.length) {
				out += chunk;
				return;
			}
			let at = 0;
			while (at < chunk.length) {
				if (/\s/.test(chunk[at])) {
					out += chunk[at];
					at += 1;
					continue;
				}
				if (wordIndex >= words.length) {
					out += chunk.slice(at);
					return;
				}
				// a span ends at whitespace, at the end of the chunk, or at the
				// end of the current word — an em dash joins two spoken words
				// with no space between them, so one run can carry both
				const remaining = words[wordIndex].w.length - consumed;
				let take = 0;
				while (
					take < remaining &&
					at + take < chunk.length &&
					!/\s/.test(chunk[at + take])
				) {
					take += 1;
				}
				out += `<span class="nw" data-w="${wordIndex}">${chunk.slice(at, at + take)}</span>`;
				consumed += take;
				at += take;
				if (consumed >= words[wordIndex].w.length) {
					wordIndex += 1;
					consumed = 0;
				}
			}
		}

		const tagPattern = /<[^>]+>/g;
		let cursor = 0;
		let match;
		while ((match = tagPattern.exec(html)) !== null) {
			emitText(html.slice(cursor, match.index));
			const tag = match[0];
			const name = /^<\/?([a-z0-9]+)/i.exec(tag)?.[1]?.toLowerCase() ?? "";
			if (skipDepth > 0) {
				if (name === skipTag) skipDepth += tag[1] === "/" ? -1 : 1;
				if (skipDepth === 0) skipTag = null;
			} else if (/^<div[^>]*class="hints/.test(tag)) {
				skipTag = "div";
				skipDepth = 1;
			} else if (name === "button" && tag[1] !== "/") {
				skipTag = "button";
				skipDepth = 1;
			}
			out += tag;
			cursor = tagPattern.lastIndex;
		}
		emitText(html.slice(cursor));
		// anything but an exact fit means the copy and the recording have
		// drifted apart; the beat then reads as it always did
		return wordIndex === words.length && consumed === 0 ? out : html;
	}

	// turns markdown links into anchors, and the tokens into their buttons
	function renderStoryText(text, playing = false, words = null) {
		if (screenRecordMode) text = stripInteractionHints(text);
		const html = localizeHintVerbs(text)
			.replace(
				/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
				(_match, label, href) =>
					`<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
			)
			.split(STORY_AUDIO_TOKEN)
			.join(storyAudioButton(playing))
			.split(STORY_EXPLORE_TOKEN)
			.join(storyExploreButton());
		return words?.length ? wrapNarratedWords(html, words) : html;
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
	// which arrow keys are held right now, echoed by the hint keycaps
	let heldArrowHint = $state({ left: false, right: false, walk: false });
	// the load screen's fade out, slow on purpose
	const LOADING_FADE_MS = 2600;
	// the label and line clear well before the veil does
	const LOADING_COPY_FADE_MS = 450;
	// the css transition starts a frame late, so the unmount waits that out
	const LOADING_UNMOUNT_BUFFER_MS = 160;
	// one full cycle of the wavy line, which nothing waits on
	const LOADING_LINE_MS = 5400;
	// picks up the #preboot line mid-cycle
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
	// how far past the walk limit the walker can press into the light
	const LIGHT_NUDGE_DEPTH = 2.8;
	// where the walker can stand still inside the light. the wall's inner face
	// is LIGHT_NUDGE_DEPTH past the limit, so this is most of the way in
	const LIGHT_REST_DEPTH = 2.3;
	// how quickly that overshoot eases back; lower is springier
	const LIGHT_PUSHBACK_TIME = 0.22;
	// how close to the wall the light counts as entered
	const LIGHT_MESSAGE_MARGIN = 0.9;
	// how far past the walk limit counts as having stepped inside
	const LIGHT_ENTER_DEPTH = 0.3;
	// how far off dead ahead the view can be for the message to first appear
	const LIGHT_FACING_CONE = 0.9;
	// true while pressed into the light
	let inLight = $state(false);
	// true only once they've stepped in and are looking into it
	let lightMessageOn = $state(false);
	// explore mode asked for explicitly by the reader
	let exploreExplicit = $state(false);
	// where the script runs out
	const STORY_END_AGE = storyEndAge(copy);
	// the first text beat ahead of an age, for the keep-going walk
	function nextBeatStartAfter(age, zoneKey) {
		const entries = [...(copy.all ?? []), ...(copy[zoneKey] ?? [])];
		let next = null;
		for (const entry of entries) {
			if (!entry.text?.trim()) continue;
			const start = Number(entry.age);
			if (!Number.isFinite(start) || start <= age) continue;
			if (next === null || start < next) next = start;
		}
		return next;
	}
	const pastStoryEnd = $derived(
		STORY_END_AGE !== null && currentAge !== null && currentAge > STORY_END_AGE
	);
	// the last text beat's span: the corner explore button hides from its
	// start, and past its end the closing hint takes over
	const finalBeatSpan = (() => {
		const entries = Object.values(copy)
			.filter(Array.isArray)
			.flat()
			.filter((entry) => entry.text?.trim());
		const starts = entries.map((e) => Number(e.age)).filter(Number.isFinite);
		const ends = entries.map((e) => Number(e.age_end)).filter(Number.isFinite);
		return {
			start: starts.length ? Math.max(...starts) : null,
			end: ends.length ? Math.max(...ends) : null
		};
	})();
	// past the last beat the closing hint offers explore; nothing auto-flips
	const exploreMode = $derived(exploreExplicit);
	// the closing variant of the walk hint, with its own explore button
	let walkHintFinal = $state(false);
	// a live inside check, which flips back on leaving
	let insideRoom = $state(false);
	// the debug hud's snapshot
	let debugStats = $state({
		x: 0,
		y: EYE_HEIGHT,
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
	// debug: the bare scene, with every overlay out of the way. escape exits,
	// since the panel holding the button goes too
	let screenshotMode = $state(false);
	function toggleScreenshotMode() {
		screenshotMode = !screenshotMode;
		// an open modal would cover the shot
		if (screenshotMode) {
			infoOpen = false;
			clickedPerson = null;
			clickedPersonIndex = null;
		}
	}
	function formatDebugStats(stats) {
		return (
			`x=${stats.x.toFixed(2)} y=${stats.y.toFixed(2)} z=${stats.z.toFixed(2)} ` +
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
	const shouldHidePanel = $derived(
		hidePanel || !insideRoom || inLight || screenshotMode
	);
	const shouldHideMap = $derived(
		hideMap || !insideRoom || inLight || screenshotMode
	);
	// the panel's height, so the topdown map can clear it
	let controlPanelHeight = $state(0);
	const panelClearPx = $derived(shouldHidePanel ? 0 : controlPanelHeight);
	// the story overlay's height, so the topdown map stops above it
	let storyOverlayHeight = $state(0);
	// no text reserves nothing
	const storyClearPx = $derived(
		storyTexts.length > 0 && !mapView && !screenshotMode ? storyOverlayHeight : 0
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
	const DOOR_VIEW_MARGIN = 1.45; // breathing room past the doors' exact edges; also sets how wide the walk view is
	const requiredHalfHorizontalFovRad =
		Math.atan(outermostDoorX / distanceToDoors) * DOOR_VIEW_MARGIN;
	const computeDoorVisibleFovDegrees = (aspect) =>
		computeFovForHorizontalHalfAngle(requiredHalfHorizontalFovRad, aspect);
	// world-sized text loses pixels at a wider fov, so it scales against 16:9
	const REFERENCE_ASPECT = 16 / 9;
	const REFERENCE_FOV = computeDoorVisibleFovDegrees(REFERENCE_ASPECT);
	// narrow screens clamp the fov short of the wide view's door margin, so
	// the spawn slides to where all three doors fit while filling the width
	// ?screenrecord opens nearer the doors, for a tighter frame
	const SCREEN_RECORD_START_CLOSER = 0.15; // of the way in from the usual spawn
	function nudgeStartZ(z) {
		if (!screenRecordMode) return z;
		return DOOR_Z + (z - DOOR_Z) * (1 - SCREEN_RECORD_START_CLOSER);
	}
	function computeStartZ(aspect) {
		const halfVerticalRad = THREE.MathUtils.degToRad(
			computeDoorVisibleFovDegrees(aspect) / 2
		);
		const halfHorizontalRad = Math.atan(Math.tan(halfVerticalRad) * aspect);
		if (halfHorizontalRad >= requiredHalfHorizontalFovRad - 1e-6)
			return nudgeStartZ(DEFAULT_START_Z);
		// a slim margin, so the doors run as wide as the screen allows
		const FIT_MARGIN = 1.12;
		const distance = outermostDoorX / Math.tan(halfHorizontalRad / FIT_MARGIN);
		return nudgeStartZ(
			DOOR_Z + Math.min(Math.max(distance, 6), MAX_WALK_Z - DOOR_Z)
		);
	}
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

	// mutes when the window loses focus, eases back in on return
	let windowFocused = true;
	let focusFade = 1;
	const FOCUS_FADE_IN_MS = 1200;
	const FOCUS_FADE_OUT_MS = 250;
	function advanceFocusFade(dt) {
		const target = windowFocused ? 1 : 0;
		const step =
			(dt * 1000) / (windowFocused ? FOCUS_FADE_IN_MS : FOCUS_FADE_OUT_MS);
		focusFade = approach(focusFade, target, step);
		applyNarrationFocus();
	}
	// fades the narration through its gain node
	function applyNarrationFocus() {
		if (narrationGainNode) {
			narrationGainNode.gain.value = NARRATION_GAIN * focusFade;
		} else if (narrationEl) {
			narrationEl.muted = focusFade <= 0.001;
		}
	}

	// background music, off until asked for — except under ?screenrecord,
	// where the toggle is hidden, so it starts on and the first door click
	// is the gesture autoplay rules need
	let audioOn = $state(screenRecordMode);
	// whether a gesture has actually let the sound start
	let audioStarted = $state(false);
	let sundayEl;
	let mondayEl;
	// the overlap when the score changes, long enough to dissolve
	const MUSIC_FADE_MS = 3000;
	// ducking has to be prompt, or the voice starts over the bed
	const MUSIC_DUCK_FADE_MS = 1300;
	// a dip either side of the loop point, so the repeat has a seam
	const MUSIC_LOOP_FADE_SECONDS = 2.5;
	const MUSIC_LOOP_FADE_FLOOR = 0.3;
	// a beat's recording turned out not to exist, so it has no voiceover
	let narrationMissing = $state(false);
	// sunday: before 20 and under narrated beats; monday: the rest and 80+
	// (chart beats have no recording, so they score as monday even with sound off)
	const musicTrack = $derived(
		currentAge !== null && currentAge < 20
			? "sunday"
			: exploreMode ||
				  narrationId === null ||
				  narrationMissing ||
				  storyChart !== null ||
				  (currentAge !== null && currentAge >= 80)
				? "monday"
				: "sunday"
	);
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
	// each track's target level, kept apart from element.volume
	const musicLevels = new Map();
	const levelOf = (el) => musicLevels.get(el) ?? 0;

	// dips volume around a track's loop point
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
			// the incoming side ramps in the active-track block above, and
			// only once it is actually playing — never snapped to full
			if (outgoing) {
				musicLevels.set(outgoing, Math.max(0, levelOf(outgoing) - crossStep));
				if (levelOf(outgoing) <= 0) outgoing.pause();
			}
			const incomingDone =
				!incoming ||
				(!incoming.paused && Math.abs(levelOf(incoming) - target) < 0.01);
			if (incomingDone && (!outgoing || levelOf(outgoing) <= 0)) {
				musicFade = null;
			}
		}
		// applies the mix, loop dips and focus mute included
		for (const el of [sundayEl, mondayEl]) {
			if (!el) continue;
			el.volume = Math.min(
				1,
				Math.max(0, levelOf(el) * loopFade(el) * focusFade)
			);
		}
	}

	// everything audible ends in one analyser, so the eq bars can dance
	// to the actual sound; falls back silently where web audio can't
	let audioAnalyser = null;
	let analyserFreqData = null;
	// media element sources can only be built once per element
	const musicSources = new Map();
	function ensureAnalyser() {
		if (audioAnalyser) return audioAnalyser;
		const analyserContext = soundFx.ensureContext();
		audioAnalyser = analyserContext.createAnalyser();
		// fine enough bins (~47 Hz at 48k) to isolate a vocal register
		audioAnalyser.fftSize = 1024;
		audioAnalyser.smoothingTimeConstant = 0.75;
		audioAnalyser.connect(analyserContext.destination);
		analyserFreqData = new Uint8Array(audioAnalyser.frequencyBinCount);
		return audioAnalyser;
	}
	function routeMusicThroughAnalyser() {
		try {
			const analyserContext = soundFx.ensureContext();
			const analyser = ensureAnalyser();
			for (const el of [sundayEl, mondayEl]) {
				if (!el || musicSources.has(el)) continue;
				const source = analyserContext.createMediaElementSource(el);
				source.connect(analyser);
				musicSources.set(el, source);
			}
		} catch {
			// no web audio: the bars keep their scripted dance
		}
	}

	// rolls the score for real; safe to call twice, and a no-op without a gesture
	function startMusic() {
		audioStarted = true;
		const [incoming, outgoing] = trackPair(musicTrack);
		if (!incoming) return;
		routeMusicThroughAnalyser();
		musicLevels.set(incoming, 0);
		incoming.volume = 0;
		incoming.play().catch(() => {});
		crossfadeMusic(incoming, outgoing);
	}

	// audioOn is set here, since a crossfade pauses the outgoing track
	function toggleAudio() {
		if (audioOn) {
			musicFade = null;
			sundayEl?.pause();
			mondayEl?.pause();
			audioOn = false;
			return;
		}
		audioOn = true;
		startMusic();
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
	// the focus fade scales this node, when web audio built one
	let narrationGainNode = null;
	function ensureNarrationGain() {
		if (!narrationEl || narrationSource) return;
		try {
			const audioContext = soundFx.ensureContext();
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
			narrationGainNode = gain;
			// ends in the shared analyser, which feeds the destination
			narrationSource.connect(compressor).connect(gain).connect(ensureAnalyser());
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

	// the beat's aligned words, only while there is sound to follow
	const narrationWords = $derived(
		audioOn && audioStarted && narrationId
			? (narrationTimings[narrationId] ?? null)
			: null
	);
	// the overlay's word spans, re-collected whenever the beat's text changes
	let storyOverlayEl = $state(null);
	let narrationWordEls = [];
	let litWordIndex = -1;
	$effect(() => {
		// re-runs after the overlay's html is in the dom
		storyTexts;
		narrationWords;
		narrationWordEls = storyOverlayEl
			? [...storyOverlayEl.querySelectorAll(".nw")]
			: [];
		litWordIndex = -1;
	});
	// the highlight runs ahead of the voice, so the eye reaches a word just
	// before it is spoken rather than chasing it
	const NARRATION_HIGHLIGHT_LEAD = 0.25;
	// lights the word the voice is on. driven from the render loop, so it
	// follows the audio clock rather than a timer that could drift off it
	function advanceNarrationHighlight() {
		if (!narrationWordEls.length) return;
		const words = narrationWords;
		let index = -1;
		if (words && narrationEl && narrationPlaying && !narrationEl.paused) {
			const elapsed = narrationEl.currentTime;
			// the lead eases in from the first word's own start. at full lead
			// from the top the highlight would already be running ahead by the
			// time the voice arrives, and short opening words got skipped
			const lead = Math.min(
				NARRATION_HIGHLIGHT_LEAD,
				Math.max(0, elapsed - words[0].start)
			);
			const time = elapsed + lead;
			for (let i = 0; i < words.length; i += 1) {
				if (time >= words[i].start && time < words[i].end) {
					index = i;
					break;
				}
			}
			// through a clip's opening silence the first word waits lit, and
			// past the last window the lead runs out before the voice does
			if (index === -1) {
				index = time < words[0].start ? 0 : words.length - 1;
			}
		}
		if (index === litWordIndex) return;
		litWordIndex = index;
		for (const el of narrationWordEls) {
			const wordAt = Number(el.dataset.w);
			el.classList.toggle("is-spoken", wordAt === index);
			// everything already read stays up behind the lit word
			el.classList.toggle("is-said", index >= 0 && wordAt <= index);
		}
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
		const soundOn = audioOn && audioStarted;
		if (!narrationEl) return;
		if (!soundOn || !id) {
			stopNarration();
			return;
		}
		narrationFadingOut = false;
		narrationMissing = false;
		ensureNarrationGain();
		if (soundFx.context()?.state === "suspended") soundFx.context().resume();
		narrationEl.src = asset(`/assets/app/${id}.mp3`);
		narrationEl.volume = NARRATION_VOLUME;
		narrationEl.currentTime = 0;
		narrationPlaying = true;
		// a beat with no recording stays quiet, and scores as monday
		narrationEl.play().catch(() => {
			narrationPlaying = false;
			narrationMissing = true;
		});
	});

	// the synthesized fx (door chord, click, person tones, wind), extracted
	const soundFx = createSoundFx({
		getAudioOn: () => audioOn,
		getFocusFade: () => focusFade
	});
	const { playDoorSound, playClick, playPersonTone } = soundFx;

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
			// no load(): it would cut a track already playing
			if (!el || !el.paused) continue;
			el.preload = "auto";
			el.load();
		}
	}

	// the score follows the mode, once the reader has asked for sound
	$effect(() => {
		const track = musicTrack;
		if (!audioOn || !audioStarted) return;
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
	// the right-side info shelf; it and the person modal displace each other
	let infoOpen = $state(false);
	// their index, read each frame to light them
	let clickedPersonIndex = $state(null);
	// a stable ref read at click time, so the minimap's callback stays one closure
	let selectPersonImpl = null;
	// leaving explore re-arms the beats
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
		if (suppressModeVeil) {
			// the flight already covered this swap with its own crossfade
			suppressModeVeil = false;
			lastVeiledMode = currentMode;
			return;
		}
		lastVeiledMode = currentMode;
		modeVeilVisible = true;
		clearTimeout(modeVeilTimeout);
		// one tick opaque, so the swap is painted over before it fades
		modeVeilTimeout = setTimeout(() => (modeVeilVisible = false), 16);
	});

	// the canvas host, as state so the minimap's prop updates on bind
	let container = $state();
	// the corner speed-mark overlay, drawn by the render loop
	let speedCanvas;
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
			// warmup frames run under the overlay, absorbing shader compiles
			await waitForFrames(LOADING_WARMUP_FRAMES);
			if (disposed) return;
			// fades rather than cuts, unmounting once it's done
			loadingFading = true;
			setTimeout(() => {
				loadingMessage = "";
				loadingFading = false;
			}, LOADING_FADE_MS + LOADING_UNMOUNT_BUFFER_MS);
			// audio can start now that warmup is done
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
			const { ageToZ, zToAge, zToAgeExact } = createAgeZMapping({
				ageMin,
				ageMax,
				halfDepth: HALF_DEPTH,
				roomDepth: ROOM_DEPTH
			});

			// the story layer, reading and writing the state above
			const storyBeats = createStoryBeats({
				copy,
				// exact age, so a beat starts at its line, not half a year early
				getCurrentAge: () => walkAgeExact,
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
					storyChart = result.chart;
					if (result.beatAge !== lastFlashedBeatAge) {
						lastFlashedBeatAge = result.beatAge;
						if (result.beatAge !== null) {
							beatFloorFlashImpl?.set(result.beatAge, result.beatAgeEnd);
						} else {
							beatFloorFlashImpl?.clear();
						}
					}
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
			// the wave swap moves only the people who changed their answer
			respondents.forEach((person, i) => {
				if (person.CHANGE_ANSWER === "Same") y2Layout[i] = y1Layout[i];
			});
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

			// dust motes drifting through a wrapped volume around the walker
			const dust = createDust(scene, { ageToZ, zToAgeExact, ageMin, ageMax });

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
			// settled topdown clears to this instead of rendering the room
			renderer.setClearColor(BG_COLOR);
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
			const AMBIENT_LIGHT_INTENSITY = 1.8;
			const ambientLight = new THREE.AmbientLight(0xffffff, AMBIENT_LIGHT_INTENSITY);
			scene.add(ambientLight);

			// pale candle purple: the room reads as lit from the pillar flames
			const keyLight = new THREE.DirectionalLight("#dfc8f7", 10.8);
			keyLight.position.set(0.35, 1, -0.2); // from high on the colonnade
			scene.add(keyLight);
			scene.add(keyLight.target);

			// the only shadow caster, its frustum recentred each frame
			keyLight.castShadow = true;
			// big enough for the frustum it covers; the radius softens the rest
			// 2048 is enough under the soft radius, at a quarter the gpu cost
			keyLight.shadow.mapSize.set(2048, 2048);
			keyLight.shadow.radius = 3;
			keyLight.shadow.bias = -0.0015;
			// clears acne on the brick relief that depth bias alone missed
			keyLight.shadow.normalBias = 0.02;
			// shadow-camera-only distance; it doesn't change the lighting angle
			const KEY_LIGHT_SHADOW_DISTANCE = 60;
			const keyLightDir = new THREE.Vector3(0.35, 1, -0.2).normalize();
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
			function makeToonRamp(dark, lit) {
				const rampCanvas = document.createElement("canvas");
				rampCanvas.width = 2;
				rampCanvas.height = 1;
				const rampCtx = rampCanvas.getContext("2d");
				[dark, lit].forEach((v, i) => {
					rampCtx.fillStyle = `rgb(${v}, ${v}, ${v})`;
					rampCtx.fillRect(i, 0, 1, 1);
				});
				const ramp = new THREE.CanvasTexture(rampCanvas);
				ramp.minFilter = THREE.NearestFilter;
				ramp.magFilter = THREE.NearestFilter;
				ramp.generateMipmaps = false;
				return ramp;
			}
			const toonGradientMap = makeToonRamp(15, 215);
			// the crowd's own ramp sits nearer full-bright, so outfit colors
			// match the legend and minimap instead of muddying under the lights
			const crowdGradientMap = makeToonRamp(15, 250);

			// a vertical gradient for walls and doors; stops run top to bottom
			function createVerticalGradientTexture(stops) {
				const canvas = document.createElement("canvas");
				canvas.width = 1;
				canvas.height = 128;
				const ctx = canvas.getContext("2d");
				const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
				for (const [offset, color] of stops) gradient.addColorStop(offset, color);
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
			// the walls dissolve into blackness toward the ceiling
			const wallGradientMap = createVerticalGradientTexture([
				[0, "rgb(0, 0, 0)"],
				[0.45, "rgb(255, 255, 255)"],
				[1, "rgb(110, 110, 110)"]
			]);
			const doorGradientMap = createVerticalGradientTexture([
				[0, "rgb(255, 255, 255)"],
				[1, "rgb(150, 150, 150)"]
			]);

			// the x of each zone, shared by the shell and door builders
			const ZONE_XS = DOORS.map((door) => door.x);

			// the exterior, grouped so it hides in one go once inside
			const exteriorGroup = new THREE.Group();
			exteriorGroup.name = "exterior";
			scene.add(exteriorGroup);

			// the facade first: the doors' lamps are placed off its brick face
			const {
				backWall,
				leftWall,
				rightWall,
				innerWallMeshes,
				beatFloorFlash,
				candleGlowX,
				candleGlowY,
				setColonnadeFade
			} = buildRoomShell(
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
					exteriorGroup
				}
			);
			beatFloorFlashImpl = beatFloorFlash;
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
			// ?screenrecord: no wordmark over the door, and so no link either
			if (screenRecordMode) wordmarkLogo.visible = false;
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
				crowdGroup,
				topdownDots,
				placementHelper,
				flatRotation: FLAT_ROTATION
			} = spawnCrowd(innerRoomGroup, respondents, {
				toonGradientMap: crowdGradientMap,
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
				// first recolor snaps, later ones ease
				if (hasAppliedColorVariable) {
					recolorRampSeconds = CROWD_RECOLOR_TIME * 5;
					// ~8 time constants, then the lerp snaps and stops running
					colorEaseSecondsLeft = CROWD_RECOLOR_TIME * 8;
				}
				hasAppliedColorVariable = true;
			}

			// how much longer the minimap's colours are worth rewriting
			let recolorRampSeconds = 0;
			// how much longer the bodies are still easing; 0 means settled
			let colorEaseSecondsLeft = 0;

			// eases every body toward its target colour, then goes idle
			function advanceCrowdColors(dt) {
				if (colorEaseSecondsLeft <= 0) return;
				colorEaseSecondsLeft -= dt;
				if (colorEaseSecondsLeft <= 0) {
					// settled: land exactly on the targets so the loop can stop
					for (let i = 0; i < personBaseColors.length; i++) {
						personBaseColors[i].copy(personTargetColors[i]);
						personColorCSS[i] = `#${personTargetColors[i].getHexString()}`;
					}
					return;
				}
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

			// speed marks, like running into wind: side gusts hugging the
			// edges plus fainter strands streaking at the face from mid-screen.
			// all travel outward moving forward, inward moving backward
			// lower than the wind's full gust, so the lines wake at a stroll
			const SPEED_FULL = 13; // world units/sec
			const speedLineAngles = [];
			const speedLineSeeds = [];
			const speedLineBandLo = [];
			const speedLineBandHi = [];
			const speedLineFace = [];
			// side gusts on the left and right edges
			for (const side of [0, Math.PI]) {
				for (let i = 0; i < 8; i++) {
					speedLineAngles.push(side + (Math.random() - 0.5) * 1.15);
					speedLineSeeds.push(Math.random());
					speedLineBandLo.push(0.55);
					speedLineBandHi.push(0.98);
					speedLineFace.push(false);
				}
			}
			// face strands: anywhere on screen, running from nearer the middle
			for (let i = 0; i < 14; i++) {
				speedLineAngles.push(Math.random() * Math.PI * 2);
				speedLineSeeds.push(Math.random());
				speedLineBandLo.push(0.16);
				speedLineBandHi.push(0.8);
				speedLineFace.push(true);
			}
			let speedLevel = 0;
			let speedFlow = 0;
			// the eq bars ride the analyser: four bands into four css vars,
			// toggled by a container class so css can swap off the scripted dance
			const EQ_BANDS = [
				[4, 16],
				[16, 40],
				[40, 88],
				[88, 192]
			];
			let eqLive = false;
			// the low-mids' fast wobble against their slow baseline: vibrato
			// registers, steady loudness doesn't. shifts the dust.
			// bins 1–2 of the 1024-fft at 48k: roughly 47–140 Hz — the floor,
			// pure bass fundamentals
			const TREMOR_BINS = [1, 3];
			let midsBaseline = 0;
			// the wobble's envelope, and how long it has stayed up: only a
			// vibrato held for a beat engages the dust, not a passing hit
			let wobbleEnv = 0;
			let wobbleHeldSeconds = 0;
			const WOBBLE_FLOOR = 0.3;
			const WOBBLE_HOLD_SECONDS = 0.5;
			let musicTremor = 0;
			function updateEqLevels(dt) {
				const live =
					!!audioAnalyser && audioOn && !reducedMotionQuery.matches;
				if (live !== eqLive) {
					eqLive = live;
					container.classList.toggle("eq-live", live);
				}
				if (!live) {
					wobbleEnv = 0;
					wobbleHeldSeconds = 0;
					musicTremor += (0 - musicTremor) * Math.min(1, dt * 5);
					return;
				}
				audioAnalyser.getByteFrequencyData(analyserFreqData);
				for (let band = 0; band < EQ_BANDS.length; band++) {
					const [from, to] = EQ_BANDS[band];
					let sum = 0;
					for (let i = from; i < to; i++) sum += analyserFreqData[i];
					const avg = sum / (to - from) / 255;
					// a floor so the bars never die, a lift so quiet passages read
					const level = Math.min(1, 0.12 + avg * 1.5);
					container.style.setProperty(`--eq${band + 1}`, level.toFixed(3));
				}
				let tremorSum = 0;
				for (let i = TREMOR_BINS[0]; i < TREMOR_BINS[1]; i++) {
					tremorSum += analyserFreqData[i];
				}
				const midsAvg = tremorSum / (TREMOR_BINS[1] - TREMOR_BINS[0]) / 255;
				midsBaseline += (midsAvg - midsBaseline) * Math.min(1, dt * 2.5);
				const wobble = Math.min(1, Math.abs(midsAvg - midsBaseline) * 12);
				// slow-release envelope, so vibrato's own zero-crossings
				// don't reset the hold timer
				wobbleEnv +=
					(wobble - wobbleEnv) * Math.min(1, dt * (wobble > wobbleEnv ? 14 : 3));
				wobbleHeldSeconds =
					wobbleEnv > WOBBLE_FLOOR ? wobbleHeldSeconds + dt : 0;
				const tremorTarget =
					wobbleHeldSeconds > WOBBLE_HOLD_SECONDS ? wobbleEnv : 0;
				// swells in once earned, settles gently after
				musicTremor +=
					(tremorTarget - musicTremor) *
					Math.min(1, dt * (tremorTarget > musicTremor ? 5 : 3));
			}

			let speedTravel = 0;
			let speedPrevX = null;
			let speedPrevZ = null;
			let speedCanvasClear = true;
			function drawSpeedLines(dt) {
				if (!speedCanvas) return;
				const sdx = speedPrevX === null ? 0 : renderWalkX - speedPrevX;
				const sdz = speedPrevZ === null ? 0 : renderWalkZ - speedPrevZ;
				speedPrevX = renderWalkX;
				speedPrevZ = renderWalkZ;
				const speed = dt > 0 ? Math.sqrt(sdx * sdx + sdz * sdz) / dt : 0;
				// signed forwardness along the facing, for the travel direction
				const fwd =
					dt > 0
						? (sdx * Math.sin(cameraYaw) - sdz * Math.cos(cameraYaw)) / dt
						: 0;
				speedFlow +=
					(Math.max(-1, Math.min(1, fwd / SPEED_FULL)) - speedFlow) *
					Math.min(1, dt * 6);
				const shown = mode === "walk" && !flightActive ? 1 : 0;
				const target = Math.min(1, speed / SPEED_FULL) * shown;
				// quick to appear, a touch slower to settle, like the wind
				const ease = target > speedLevel ? dt * 9 : dt * 4.5;
				speedLevel += (target - speedLevel) * Math.min(1, ease);
				// the strands slide along their bands, faster at speed
				speedTravel +=
					dt * (0.2 + 2.0 * speedLevel * speedLevel) * (speedFlow >= 0 ? 1 : -1);
				const dpr = Math.min(window.devicePixelRatio, 2);
				const w = Math.round(speedCanvas.clientWidth * dpr);
				const h = Math.round(speedCanvas.clientHeight * dpr);
				if (w === 0 || h === 0) return;
				if (speedCanvas.width !== w || speedCanvas.height !== h) {
					speedCanvas.width = w;
					speedCanvas.height = h;
				}
				const marksCtx = speedCanvas.getContext("2d");
				// idle: clear once, then stop touching the canvas
				if (speedLevel < 0.04) {
					if (!speedCanvasClear) {
						marksCtx.clearRect(0, 0, w, h);
						speedCanvasClear = true;
					}
					return;
				}
				speedCanvasClear = false;
				marksCtx.clearRect(0, 0, w, h);
				marksCtx.lineCap = "round";
				const cx = w / 2;
				const cy = h / 2;
				for (let i = 0; i < speedLineAngles.length; i++) {
					const face = speedLineFace[i];
					const cos = Math.cos(speedLineAngles[i]);
					const sin = Math.sin(speedLineAngles[i]);
					// distance from center to the screen edge along this angle
					const edgeR = Math.min(Math.abs(cx / cos), Math.abs(cy / sin));
					// where this strand sits along its band; face strands rush
					let t =
						(speedTravel *
							(0.7 + speedLineSeeds[i] * 0.6) *
							(face ? 1.5 : 1) +
							speedLineSeeds[i]) %
						1;
					if (t < 0) t += 1;
					// fades in and out at the band's ends, so the wrap is quiet
					const envelope = Math.sin(t * Math.PI);
					const bandLo = speedLineBandLo[i];
					const outer =
						edgeR * (bandLo + (speedLineBandHi[i] - bandLo) * t);
					const len =
						edgeR * (0.05 + 0.18 * speedLevel) * (0.7 + 0.3 * envelope);
					// pretty transparent throughout; face strands the fainter
					marksCtx.strokeStyle = `rgba(255, 255, 255, ${
						speedLevel * envelope * (face ? 0.18 : 0.28)
					})`;
					marksCtx.lineWidth = dpr * (face ? 0.8 + 0.5 * speedLevel : 1 + speedLevel);
					marksCtx.beginPath();
					marksCtx.moveTo(cx + cos * outer, cy + sin * outer);
					marksCtx.lineTo(cx + cos * (outer - len), cy + sin * (outer - len));
					marksCtx.stroke();
				}
			}

			// walk controls: drag steers, scroll walks, height is fixed

			// ?age= reopens at that depth instead of the door
			const debugAgeZ =
				debugAgeParam !== null && debugAgeParam !== "" ? ageToZ(Number(debugAgeParam)) : null;
			// where input wants the walker
			let targetWalkX = 0;
			let targetWalkZ =
				debugAgeZ ?? (debugMode ? DEBUG_START_Z : computeStartZ(width / height));
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
			// starts at eye level; a right-button drag moves it up or down
			let eyeHeight = EYE_HEIGHT;
			// an extra tilt once inside, added on top so dragging stays 1:1
			let roomEntryPitchOffset = 0;

			// moves the target along a ground direction
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

			// held left/right arrows turn the view rather than strafing;
			// the rate ramps in and out so key turns don't snap
			const KEY_TURN_RADIANS_PER_SECOND = Math.PI * 0.55;
			const KEY_TURN_EASE_SECONDS = 0.05;
			let keyTurnVelocity = 0;
			function advanceKeyTurn(turnDirection, dt) {
				const ease = 1 - Math.exp(-dt / KEY_TURN_EASE_SECONDS);
				keyTurnVelocity +=
					(turnDirection * KEY_TURN_RADIANS_PER_SECOND - keyTurnVelocity) * ease;
				if (Math.abs(keyTurnVelocity) > 0.001 && mode === "walk") {
					targetCameraYaw = wrapAngle(targetCameraYaw + keyTurnVelocity * dt);
				}
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
				// during a beat, a hovered person's panel replaces the beat's own
				getInStoryBeat: () => !exploreMode && storyHasBeat,
				// story mode keeps focus tighter under the quiet score:
				// one panel while Sunday plays, three under Monday, four exploring
				getMaxPanels: () =>
					exploreMode ? NEARBY_PEOPLE_MAX : musicTrack === "sunday" ? 1 : 3,
				getConeHalfAngle: () =>
					exploreMode ? NEARBY_PERSON_FOV_HALF_ANGLE : Math.PI / 8,
				getHoveredPersonIndex: () => hoveredPersonIndex
			});

			// whether the pointer is over the minimap, which clicks shouldn't cross
			function isPointerOverMinimap(event) {
				return minimapComponent.containsPoint(event.clientX, event.clientY);
			}

			// the keep-going walk: face front, center in the current third,
			// and glide to the next story beat on the door walk's easing
			keepGoingImpl = () => {
				const zoneCenter =
					renderWalkX < -ZONE_WIDTH / 2
						? -ZONE_WIDTH
						: renderWalkX > ZONE_WIDTH / 2
							? ZONE_WIDTH
							: 0;
				const age = walkAgeExact ?? zToAgeExact(renderWalkZ);
				const nextStart = nextBeatStartAfter(age, storyBeats.currentZoneKey());
				targetWalkX = zoneCenter;
				// a hair past the beat's line, so it triggers on arrival
				if (nextStart !== null) targetWalkZ = ageToZ(nextStart + 0.05);
				targetCameraYaw = 0;
				doorWalkEasing = true;
				doorWalkVelX = 0;
				doorWalkVelZ = 0;
				doorWalkVelYaw = 0;
			};

			// the map's walker line, dragged: sideways is x, vertical is depth
			walkerDragImpl = ({ x, z }) => {
				doorWalkEasing = false;
				targetWalkX = Math.min(MAX_WALK_X, Math.max(MIN_WALK_X, x));
				targetWalkZ = Math.min(MAX_WALK_Z, Math.max(MIN_WALK_Z, z));
				targetWalkZ = resolveOuterDoorCollision(targetWalkX, targetWalkZ);
				targetWalkZ = resolveInnerWallCollision(targetWalkX, targetWalkZ);
			};

			// the screen-reader buttons enter by the same walk
			enterDoorImpl = (door) => walkThroughDoor(door);

			// sets the walk target through a door: across first, then forward
			function walkThroughDoor(door) {
				sceneAnnouncement = `Walking through the ${door.label} door, into the room among the youngest adults.`;
				// the first door click is the gesture autoplay has been waiting for
				if (audioOn && !audioStarted) startMusic();
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
				// buttons and overlays sit above the scene: never click through
				if (event.target !== renderer.domElement) return;
				if (flightActive) return;
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
				playPersonTone(index);
				infoOpen = false;
				clickedPerson = respondents[index];
				clickedPersonIndex = index;
			}
			function closeModal() {
				clickedPerson = null;
				clickedPersonIndex = null;
				infoOpen = false;
			}
			selectPersonImpl = selectPerson;

			// opens the modal on a click, raycasting only visible people
			function handlePersonClick(event) {
				// buttons and overlays sit above the scene: never click through
				if (event.target !== renderer.domElement) return;
				if (flightActive) return;
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
				const hits = doorRaycaster.intersectObjects(
					screenRecordMode ? [byline] : [wordmarkLogo, byline],
					true
				);
				if (hits.length === 0) return null;
				let obj = hits[0].object;
				while (obj && obj !== wordmarkLogo && obj !== byline) obj = obj.parent;
				return obj === wordmarkLogo || obj === byline ? obj : null;
			}

			function handleFacadeLinkClick(event) {
				// buttons and overlays sit above the scene: never click through
				if (event.target !== renderer.domElement) return;
				if (flightActive) return;
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

			// clicking the aerial view outside the map returns to walk mode
			function handleWebglPreviewClick(event) {
				if (mode !== "topdown" || flightActive) return;
				if (event.target !== renderer.domElement) return;
				requestModeChange("walk");
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
			// eased over a short fade, so hover feels smooth rather than snapping
			const DOOR_LABEL_FADE_TIME = 0.12;
			let hoveredDoor = null;
			// door -> its label's current brightness, only while fading
			const doorLabelFades = new Map();
			function setHoveredDoor(door) {
				if (hoveredDoor === door) return;
				// a door mid-fade keeps its current value; a settled one starts
				// from the state it was left in
				if (hoveredDoor && !doorLabelFades.has(hoveredDoor)) {
					doorLabelFades.set(hoveredDoor, DOOR_LABEL_HOVER_BRIGHTNESS);
				}
				hoveredDoor = door;
				if (hoveredDoor && !doorLabelFades.has(hoveredDoor)) {
					doorLabelFades.set(hoveredDoor, DOOR_LABEL_DIM_BRIGHTNESS);
				}
			}
			function advanceDoorLabelFades(dt) {
				if (doorLabelFades.size === 0) return;
				const step = 1 - Math.exp(-dt / DOOR_LABEL_FADE_TIME);
				for (const [door, current] of doorLabelFades) {
					const target =
						door === hoveredDoor ? DOOR_LABEL_HOVER_BRIGHTNESS : DOOR_LABEL_DIM_BRIGHTNESS;
					let next = current + (target - current) * step;
					if (Math.abs(next - target) < 0.01) {
						next = target;
						doorLabelFades.delete(door);
					} else {
						doorLabelFades.set(door, next);
					}
					door.label.material[4].color.setScalar(next);
				}
			}

			// the lod pass reads this and applies it each frame
			let hoveredPersonIndex = null;

			// raycasts are dear, so pointer moves queue and resolve once a frame
			let pendingHoverEvent = null;
			function handlePointerHover(event) {
				pendingHoverEvent = event;
			}

			// one pass over everything hoverable, skipped while a button is held
			function processPointerHover(event) {
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
			const exteriorTargets = screenRecordMode
				? [...DOORS, byline]
				: [...DOORS, wordmarkLogo, byline];
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

			// arrows walk and turn while held; space toggles topdown
			const heldArrowKeys = new Set();
			// mirrors real presses onto the hint keycaps
			function syncArrowHint() {
				heldArrowHint = {
					left: heldArrowKeys.has("ArrowLeft"),
					right: heldArrowKeys.has("ArrowRight"),
					walk: heldArrowKeys.has("ArrowUp") || heldArrowKeys.has("ArrowDown")
				};
			}
			function handleKeyDown(event) {
				// the only way back, with the debug panel's button hidden
				if (event.key === "Escape" && screenshotMode) {
					event.preventDefault();
					toggleScreenshotMode();
					return;
				}
				// real focusables keep their native keys, so assistive tech,
				// the sr-only door buttons and the dropdown all work
				const activeTag = document.activeElement?.tagName;
				if (
					event.key === "Tab" &&
					activeTag &&
					/^(BUTTON|SELECT|INPUT|TEXTAREA|A)$/.test(activeTag)
				) {
					return;
				}
				if (
					event.key.startsWith("Arrow") &&
					activeTag &&
					/^(SELECT|INPUT|TEXTAREA)$/.test(activeTag)
				) {
					return;
				}
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
					syncArrowHint();
				} else if (event.key === " ") {
					// buttons handle their own space presses
					if (event.target.closest?.("button, [role='button']")) return;
					event.preventDefault();
					// ignores auto-repeat, so it doesn't rapid-fire
					if (event.repeat) return;
					// outside, space works the highlighted door; a first press
					// highlights rather than walking through one unasked
					if (!insideRoom && mode === "walk") {
						if (exteriorFocusIndex === -1) {
							exteriorFocusIndex = 0;
							highlightExteriorFocus();
						} else {
							activateExteriorFocus();
						}
						return;
					}
					requestModeChange(mode === "walk" ? "topdown" : "walk");
				}
			}
			function handleKeyUp(event) {
				if (event.key.startsWith("Arrow")) {
					heldArrowKeys.delete(event.key);
					syncArrowHint();
				}
			}
			function handleWindowBlur() {
				heldArrowKeys.clear();
				syncArrowHint();
				windowFocused = false;
			}
			function handleWindowFocus() {
				windowFocused = true;
			}
			function handleVisibilityChange() {
				if (document.hidden) {
					windowFocused = false;
					// no frames while hidden, so the mute can't ease: snap it
					focusFade = 0;
					for (const el of [sundayEl, mondayEl]) {
						if (el) el.volume = 0;
					}
					applyNarrationFocus();
				} else {
					windowFocused = document.hasFocus();
				}
			}

			// the gesture controller, driving the targets through these accessors
			const inputController = createInputController({
				container,
				getMode: () => (flightActive ? "topdown" : mode),
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
				maxDragPitch: MAX_DRAG_PITCH,
				// debug: right-drag raises or lowers the camera, floor to ceiling
				onEyeHeightDrag: (dyNormalized) => {
					eyeHeight = Math.min(
						ROOM_HEIGHT - 1,
						Math.max(0.3, eyeHeight - dyNormalized * ROOM_HEIGHT * 0.5)
					);
				}
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
			window.addEventListener("focus", handleWindowFocus);
			document.addEventListener("visibilitychange", handleVisibilityChange);
			// a load in a background tab starts muted
			windowFocused = document.hasFocus();
			focusFade = windowFocused ? 1 : 0;

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
				poseHelper.position.set(renderWalkX, eyeHeight, renderWalkZ);
				poseHelper.up.set(0, 1, 0);
				poseHelper.lookAt(
					renderWalkX + lookDir.x,
					eyeHeight + lookDir.y,
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
				if (topdownBlend > 0) {
					// narrowing the fov flattens the view as it climbs
					const overhead = computeOverheadPose();
					const fovNow =
						flightStartFov + (TOPDOWN_FOV - flightStartFov) * topdownBlend;
					if (camera.fov !== fovNow) {
						camera.fov = fovNow;
						camera.updateProjectionMatrix();
					}
					camera.position.lerpVectors(
						pose.position,
						overhead.position,
						topdownBlend
					);
					camera.quaternion.slerpQuaternions(
						pose.quaternion,
						overhead.quaternion,
						topdownBlend
					);
				} else {
					camera.position.copy(pose.position);
					camera.quaternion.copy(pose.quaternion);
				}

				// keeps the fill light on the walker
				cameraLight.position.copy(camera.position);
			}

			// ——— the topdown flight: lift, fog out the bodies, land on the map ———
			const TOPDOWN_FOV = 40;
			const FLIGHT_UP_SECONDS = 1.6;
			const FLIGHT_DOWN_SECONDS = 1.3;
			// matches the minimap's own 320ms opacity transition
			const MAP_FADE_SECONDS = 0.34;
			// dot sizes in world units, matching the 2d map's logical pixels
			const TOPDOWN_DOT_RADIUS = (0.85 * HALF_WIDTH * 2) / 120;
			const WALKER_MARKER_RADIUS = (4.5 * HALF_WIDTH * 2) / 120;
			const DOT_LAYER_Y = 0.08;
			// the map's depth axis runs the room plus the entrance plaza
			const TOPDOWN_Z_CENTER = EXTERIOR_DEPTH / 2;
			const TOPDOWN_Z_RANGE = HALF_DEPTH * 2 + EXTERIOR_DEPTH;

			let flightPhase = "idle"; // idle | up | fadeMap | down
			let flightT = 0;
			let topdownBlend = 0;
			let flightStartFov = camera.fov;
			let lastOverheadHeight = 60;
			const clamp01 = (t) => Math.min(1, Math.max(0, t));
			const easeInOutCubic = (t) =>
				t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
			const smooth01 = (t) => {
				const c = clamp01(t);
				return c * c * (3 - 2 * c);
			};
			const reducedMotionQuery = window.matchMedia(
				"(prefers-reduced-motion: reduce)"
			);

			// the walker's own dot, the white one the 2d map draws
			const walkerMarkerMaterial = new THREE.MeshBasicMaterial({
				color: 0xfefdfe,
				transparent: true,
				opacity: 0,
				depthWrite: false,
				fog: false
			});
			walkerMarkerMaterial.userData.outlineParameters = { visible: false };
			const walkerMarker = new THREE.Mesh(
				new THREE.CircleGeometry(WALKER_MARKER_RADIUS, 24),
				walkerMarkerMaterial
			);
			walkerMarker.rotation.x = -Math.PI / 2;
			walkerMarker.renderOrder = 11;
			walkerMarker.visible = false;
			scene.add(walkerMarker);

			// ——— the corner preview: a scissored second render of the walk view ———
			const PREVIEW_WIDTH = 200;
			const PREVIEW_HEIGHT = 150;
			const PREVIEW_RIGHT = 10;
			const PREVIEW_BOTTOM = 50;
			const previewCamera = new THREE.PerspectiveCamera(
				camera.fov,
				PREVIEW_WIDTH / PREVIEW_HEIGHT,
				0.1,
				800
			);
			previewCamera.layers.enable(FACADE_LIGHT_LAYER);
			// mirrors the css that hides the preview button on small screens
			const previewHiddenQuery = window.matchMedia("(max-width: 900px)");

			function renderPreviewInset() {
				if (previewHiddenQuery.matches) return;
				const w = renderer.domElement.clientWidth;
				const h = renderer.domElement.clientHeight;
				if (
					w < PREVIEW_WIDTH + PREVIEW_RIGHT ||
					h < PREVIEW_HEIGHT + PREVIEW_BOTTOM
				) {
					return;
				}
				const pose = computeWalkPose();
				previewCamera.position.copy(pose.position);
				previewCamera.quaternion.copy(pose.quaternion);
				previewCamera.fov = flightStartFov;
				previewCamera.updateProjectionMatrix();
				// renders a true walk-view picture, then restores the main camera
				const aerialFogNear = walkFog.near;
				const aerialFogFar = walkFog.far;
				walkFog.near = FOG_NEAR;
				walkFog.far = FOG_FAR;
				cameraLight.position.copy(previewCamera.position);
				topdownDots.visible = false;
				walkerMarker.visible = false;
				// the corner preview is a walk view, so the colonnade returns
				setColonnadeFade(1);
				renderer.setScissorTest(true);
				renderer.setViewport(
					w - PREVIEW_WIDTH - PREVIEW_RIGHT,
					PREVIEW_BOTTOM,
					PREVIEW_WIDTH,
					PREVIEW_HEIGHT
				);
				renderer.setScissor(
					w - PREVIEW_WIDTH - PREVIEW_RIGHT,
					PREVIEW_BOTTOM,
					PREVIEW_WIDTH,
					PREVIEW_HEIGHT
				);
				renderer.render(scene, previewCamera);
				renderer.setScissorTest(false);
				renderer.setViewport(0, 0, w, h);
				walkFog.near = aerialFogNear;
				walkFog.far = aerialFogFar;
				topdownDots.visible = true;
				walkerMarker.visible = true;
				setColonnadeFade(0);
			}

			// frames the straight-down view onto the 2d map's plot rectangle
			function computeOverheadPose() {
				const rect = minimapComponent.getTopdownPlotRect();
				if (!rect) return computeWalkPose();
				const w = container.clientWidth;
				const h = container.clientHeight;
				// css px per world unit across the room's width
				const s = rect.width / (HALF_WIDTH * 2);
				const f = 1 / Math.tan((TOPDOWN_FOV * Math.PI) / 360);
				const camHeight = (f * h) / (2 * s);
				lastOverheadHeight = camHeight;
				const cx = -(rect.left + rect.width / 2 - w / 2) / s;
				const cz = TOPDOWN_Z_CENTER - (rect.top + rect.height / 2 - h / 2) / s;
				poseHelper.position.set(cx, camHeight, cz);
				poseHelper.up.set(0, 0, -1);
				poseHelper.lookAt(cx, 0, cz);
				poseHelper.up.set(0, 1, 0);
				return {
					position: poseHelper.position.clone(),
					quaternion: poseHelper.quaternion.clone()
				};
			}

			function requestModeChange(target) {
				if (target === mode || flightPhase !== "idle") return;
				// no destination or reduced motion: veiled snap instead
				if (
					reducedMotionQuery.matches ||
					!minimapComponent?.getTopdownPlotRect()
				) {
					// the veiled snap still lands on the aerial view
					if (target === "topdown") {
						flightStartFov = camera.fov;
						topdownBlend = 1;
					} else {
						topdownBlend = 0;
						camera.fov = flightStartFov;
						camera.updateProjectionMatrix();
					}
					mode = target;
					return;
				}
				// the ascent captures the walk fov, the descent restores it
				if (target === "topdown") flightStartFov = camera.fov;
				flightActive = true;
				mapVeiled = true;
				flightT = 0;
				if (target === "topdown") {
					flightPhase = "up";
				} else {
					// map fades out first, then the descent
					flightPhase = "fadeMap";
					topdownBlend = 1;
				}
			}
			requestModeImpl = requestModeChange;

			function endFlight() {
				flightPhase = "idle";
				flightT = 0;
				topdownBlend = 0;
				flightActive = false;
				camera.fov = flightStartFov;
				camera.updateProjectionMatrix();
			}

			function advanceFlight(dt) {
				if (flightPhase === "idle") return;
				if (flightPhase === "up") {
					flightT += dt / FLIGHT_UP_SECONDS;
					topdownBlend = easeInOutCubic(clamp01(flightT));
					if (flightT >= 1) {
						// arrived: the 2d map fades in over the matching aerial view
						topdownBlend = 1;
						suppressModeVeil = true;
						mode = "topdown";
						mapVeiled = false;
						flightPhase = "idle";
						flightT = 0;
						flightActive = false;
					}
				} else if (flightPhase === "fadeMap") {
					flightT += dt / MAP_FADE_SECONDS;
					if (flightT >= 1) {
						flightPhase = "down";
						flightT = 0;
					}
				} else if (flightPhase === "down") {
					flightT += dt / FLIGHT_DOWN_SECONDS;
					topdownBlend = easeInOutCubic(clamp01(1 - flightT));
					if (flightT >= 1) {
						suppressModeVeil = true;
						mode = "walk";
						mapVeiled = false;
						endFlight();
					}
				}
			}

			// places every dot at its person's map position
			function updateTopdownDots() {
				const active = topdownBlend > 0.001;
				topdownDots.visible = active;
				walkerMarker.visible = active;
				if (!active) return;
				const rect = minimapComponent.getTopdownPlotRect();
				if (!rect) return;
				// how much the 2d map compresses depth relative to width
				const zSquash =
					(rect.height / rect.width) * ((HALF_WIDTH * 2) / TOPDOWN_Z_RANGE);
				// dots surface as the bodies fog out, then gather into map space
				const fade = smooth01((topdownBlend - 0.18) / 0.32);
				topdownDots.material.opacity = fade;
				walkerMarkerMaterial.opacity = fade;
				const gather = smooth01((topdownBlend - 0.35) / 0.65);
				const k = 1 + (zSquash - 1) * gather;
				for (let i = 0; i < respondents.length; i++) {
					placementHelper.quaternion.copy(FLAT_ROTATION);
					placementHelper.position.set(
						minimapX[i],
						DOT_LAYER_Y,
						TOPDOWN_Z_CENTER + (minimapZ[i] - TOPDOWN_Z_CENTER) * k
					);
					placementHelper.scale.setScalar(TOPDOWN_DOT_RADIUS);
					placementHelper.updateMatrix();
					topdownDots.setMatrixAt(i, placementHelper.matrix);
					topdownDots.setColorAt(i, personBaseColors[i]);
				}
				topdownDots.instanceMatrix.needsUpdate = true;
				topdownDots.instanceColor.needsUpdate = true;
				walkerMarker.position.set(
					renderWalkX,
					DOT_LAYER_Y + 0.02,
					TOPDOWN_Z_CENTER + (renderWalkZ - TOPDOWN_Z_CENTER) * k
				);
			}

			// the wave target, 0 to 1; each person eases at their own pace
			const targetPositionBlend = $derived(positionMode === "Y2" ? 1 : 0);

			// measured off the canvas, not the container, which differ in topdown
			function resizeWebglCanvas() {
				const w = renderer.domElement.clientWidth;
				const h = renderer.domElement.clientHeight;
				if (w === 0 || h === 0) return;
				camera.aspect = w / h;
				// the fov too, but only outside in walk mode, and never mid-flight
				if (mode === "walk" && !hasEnteredRoom && topdownBlend === 0) {
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

				advanceFlight(dt);

				// held keys applied per frame rather than by key repeat
				if (!flightActive) {
					const keyMoveDelta = KEY_MOVE_DELTA_PER_SECOND * dt;
					if (heldArrowKeys.has("ArrowUp")) walk(keyMoveDelta);
					if (heldArrowKeys.has("ArrowDown")) walk(-keyMoveDelta);
					advanceKeyTurn(
						(heldArrowKeys.has("ArrowRight") ? 1 : 0) -
							(heldArrowKeys.has("ArrowLeft") ? 1 : 0),
						dt
					);
				}

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
				advanceFocusFade(dt);
				advanceDoorLabelFades(dt);
				advanceMusicFade(dt);
				updateEqLevels(dt);
				soundFx.updateWind(dt, renderWalkX, renderWalkZ);
				dust.update(dt, renderWalkX, renderWalkZ, candleGlowX, candleGlowY, musicTremor);
				drawSpeedLines(dt);
				advanceNarrationFade(dt);
				advanceNarrationHighlight();
				advanceCrowdColors(dt);
				// mid-flight the fog swallows bodies early; at rest it holds
				crowdAnimator.setRenderCullDistance(
					flightPhase === "idle"
						? RENDER_CULL_DISTANCE
						: RENDER_CULL_DISTANCE * Math.max(0, 1 - topdownBlend / 0.55)
				);
				// the pillars and sconces fade out on the way up, like the bodies
				setColonnadeFade(Math.max(0, 1 - topdownBlend / 0.55));
				if (topdownBlend > 0) {
					// fog far stays below the camera, drowning all but the dots
					const aerialFar = Math.max(
						FOG_FAR * 1.05,
						Math.min(FOG_FAR + 140, lastOverheadHeight * 0.85)
					);
					walkFog.far = FOG_FAR + (aerialFar - FOG_FAR) * topdownBlend;
					walkFog.near =
						FOG_NEAR + (walkFog.far * 0.4 - FOG_NEAR) * topdownBlend;
				} else if (walkFog.far !== FOG_FAR) {
					walkFog.near = FOG_NEAR;
					walkFog.far = FOG_FAR;
				}
				crowdAnimator.update(dt, simulatedElapsed);
				updateCamera();
				updateTopdownDots();
				updateDoors(dt);
				currentAge = zToAge(renderWalkZ);
				walkAgeExact = zToAgeExact(renderWalkZ);
				// entering the room counts as age 18 immediately: the first
				// zone beats fire at the door, and plaza beats stay outside
				if (renderWalkZ < HALF_DEPTH) {
					const firstAge = ageMin + 1;
					if (currentAge < firstAge) currentAge = firstAge;
					if (walkAgeExact < firstAge) walkAgeExact = firstAge;
				}
				// stepping inside drops exterior focus, so nothing stays lit
				if (!insideRoom && renderWalkZ <= HALF_DEPTH && exteriorFocusIndex !== -1) {
					exteriorFocusIndex = -1;
					highlightExteriorFocus();
				}
				insideRoom = renderWalkZ <= HALF_DEPTH;

				// crossing into a new decade flashes its span, from the 30s on;
				// entering the room (or reappearing) sets the decade silently
				const walkDecade =
					insideRoom && walkAgeExact !== null ? Math.floor(walkAgeExact / 10) : null;
				if (walkDecade !== lastWalkDecade) {
					const cameFrom = lastWalkDecade;
					lastWalkDecade = walkDecade;
					// only while walking: the topdown map drags across decades
					if (
						mode === "walk" &&
						!flightActive &&
						cameFrom !== null &&
						walkDecade !== null &&
						walkDecade >= 3
					) {
						// the room starts at 18, so that decade's span reads 18–19
						const decadeLabel = (d) => `Ages ${Math.max(18, d * 10)} to ${d * 10 + 9}`;
						decadeFlash = {
							text: decadeLabel(walkDecade),
							key: (decadeFlash?.key ?? 0) + 1
						};
						sceneAnnouncement = `Now among ${decadeLabel(walkDecade).toLowerCase()}.`;
					}
				}

				// the spring reclaims only the depth past the light's resting point
				const lightRestZ = MIN_WALK_Z - LIGHT_REST_DEPTH;
				if (targetWalkZ < lightRestZ) {
					const overshoot = lightRestZ - targetWalkZ;
					const pull = 1 - Math.exp(-dt / LIGHT_PUSHBACK_TIME);
					targetWalkZ += overshoot * pull;
					if (lightRestZ - targetWalkZ < 0.01) targetWalkZ = lightRestZ;
				}
				// entered once they're actually pressing into it
				inLight = renderWalkZ < MIN_WALK_Z + LIGHT_MESSAGE_MARGIN;
				// the light is a full-width sheet across the back, so facing it is
				// simply facing -z. bearing to a point behind the wall swung wide
				// off-centre once close in, which cost anyone off the centre line
				// the message exactly where it should have been surest
				const facingLight = Math.abs(wrapAngle(cameraYaw)) < LIGHT_FACING_CONE;
				const steppedIntoLight = renderWalkZ < MIN_WALK_Z - LIGHT_ENTER_DEPTH;
				// a look into the light raises it; only stepping back out lowers it,
				// so glancing around in there can't snatch it away mid-read
				lightMessageOn =
					steppedIntoLight && (facingLight || lightMessageOn);

				if (debugMode) {
					debugStats = {
						x: renderWalkX,
						y: eyeHeight,
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
				if (pendingHoverEvent) {
					processPointerHover(pendingHoverEvent);
					pendingHoverEvent = null;
				}
				nearbyPanels.update(dt);
				beatFloorFlashImpl?.update(dt);

				// turned around mid-story: the way back replaces the hints
				keepGoingOn =
					!exploreMode &&
					mode === "walk" &&
					!flightActive &&
					hasEnteredRoom &&
					!autoWalking &&
					!doorWalkEasing &&
					!inLight &&
					!pastStoryEnd &&
					Math.abs(wrapAngle(cameraYaw)) > Math.PI * 0.75;

				// between beats, the hint arrow points at the light
				const hintOn =
					!exploreMode &&
					mode === "walk" &&
					!flightActive &&
					hasEnteredRoom &&
					!autoWalking &&
					!inLight &&
					!keepGoingOn &&
					storyTexts.length === 0;
				if (hintOn) {
					// world bearing of the light from here, relative to the view
					const bearing = Math.atan2(
						0 - renderWalkX,
						-(MIN_WALK_Z - renderWalkZ)
					);
					walkHintAngle = wrapAngle(bearing - cameraYaw);
				}
				walkHintOn = hintOn;
				// small epsilon: the debug spawn can land a float hair short
				walkHintFinal =
					hintOn &&
					finalBeatSpan.end !== null &&
					walkAgeExact >= finalBeatSpan.end - 0.01;

				// the outline pass waits out the door walk and the flight
				const steadyTopdown = mode === "topdown" && flightPhase === "idle";
				if (autoWalking || topdownBlend > 0) {
					if (steadyTopdown) {
						// settled topdown: a solid backdrop, so the map sits on
						// flat purple; only the corner inset renders the room
						renderer.clear();
						renderPreviewInset();
					} else {
						renderer.render(scene, camera);
					}
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
				if (screenRecordMode) return;
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
					camera.position.set(renderWalkX, eyeHeight, renderWalkZ);
					camera.up.set(0, 1, 0);
					camera.lookAt(
						renderWalkX + lookDir.x,
						eyeHeight + lookDir.y,
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
				window.removeEventListener("focus", handleWindowFocus);
				document.removeEventListener(
					"visibilitychange",
					handleVisibilityChange
				);
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
			<!-- two compositor-driven wipes draw and rub out the static line -->
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
	{#if storyTexts.length > 0 && !mapView && !screenshotMode}
		<div
			class="story-overlay"
			class:narrating={!!narrationWords?.length && narrationPlaying}
			bind:this={storyOverlayEl}
			class:no_map={shouldHideMap}
			class:key-left-down={heldArrowHint.left}
			class:key-right-down={heldArrowHint.right}
			class:key-walk-down={heldArrowHint.walk}
			onclick={(event) => {
				if (event.target.closest("[data-story-audio]")) toggleAudio();
				if (event.target.closest("[data-story-explore]")) exploreExplicit = true;
			}}
			transition:fade
			bind:clientHeight={storyOverlayHeight}
		>
			<!-- keyed on the text, so a new beat replays the flash -->
			{#key storyTexts.join("\u0000")}
				{#each storyTexts as text, i}
					<!-- the recording follows the first block; the rest stay plain -->
					<p>
						{@html renderStoryText(text, audioOn, i === 0 ? narrationWords : null)}
					</p>
				{/each}
				{#if storyChart}
					<StoryChart
						name={storyChart.name}
						caption={storyChart.caption}
						subcaption={storyChart.subcaption}
						age={walkAgeExact}
					/>
				{/if}
			{/key}
		</div>
	{/if}
	{#if keepGoingOn && !screenshotMode && !screenRecordMode}
		<!-- turned away from the story: one press faces front and walks on -->
		<div class="walk-hint walk-hint--centered" transition:fade>
			<button class="walk-hint-explore keep-going" onclick={() => keepGoingImpl?.()}>
				Continue story
			</button>
		</div>
	{/if}
	{#if walkHintOn && !screenshotMode && !screenRecordMode}
		<!-- between beats: the way onward, spun toward the light -->
		<div class="walk-hint" transition:fade>
			<svg
				viewBox="0 0 24 24"
				style="transform: rotate({walkHintAngle}rad)"
				aria-hidden="true"
			>
				<path d="M12 20 L12 5 M12 5 L6.5 10.5 M12 5 L17.5 10.5" />
			</svg>
			{#if walkHintFinal}
				<div>Keep walking, or turn around and explore</div>
				<button class="walk-hint-explore" onclick={() => (exploreExplicit = true)}>
					Explore
				</button>
			{:else}
				<div>Explore and keep walking</div>
			{/if}
		</div>
	{/if}
	<!-- corner speed marks, painted by the render loop; kept mounted so the
	     loop's canvas reference stays put, hidden when it must be invisible -->
	<canvas
		class="speed-lines"
		class:speed-lines--off={screenshotMode}
		bind:this={speedCanvas}
	></canvas>
	<Minimap
		bind:this={minimapComponent}
		bind:mode
		{container}
		hidden={shouldHideMap || mapVeiled}
		panelClear={panelClearPx}
		bottomClear={storyClearPx}
		bounce={shouldBounceMap}
		onAcknowledge={() => (minimapAcknowledged = true)}
		onClickSound={playClick}
		onPersonClick={(index) => selectPersonImpl?.(index)}
		onWalkerDrag={(pos) => walkerDragImpl?.(pos)}
		onEnterTopdown={() =>
			requestModeImpl ? requestModeImpl("topdown") : (mode = "topdown")}
	/>
	<!-- right after the map in the DOM, so tabbing follows the layout -->
	{#if screenshotMode}
		<!-- nothing: the bare scene -->
	{:else if mode === "topdown"}
		<!-- the map is the whole view here, so this offers only the way back -->
		<button
			class="explore-toggle explore-toggle--wide"
			onclick={() =>
				requestModeImpl ? requestModeImpl("walk") : (mode = "walk")}
		>
			Return to walk mode
		</button>
	{:else if !screenRecordMode}
		<button
			class="explore-toggle"
			class:explore-toggle--hidden={inLight ||
				currentAge < EXPLORE_MIN_AGE ||
				pastStoryEnd ||
				(finalBeatSpan.start !== null &&
					walkAgeExact !== null &&
					walkAgeExact >= finalBeatSpan.start - 0.01)}
			onclick={() => (exploreExplicit = !exploreExplicit)}
		>
			{exploreMode ? "Return to story" : "Skip to explore"}
		</button>
	{/if}
	<!-- covers the walk and topdown swap, over everything else -->
	<div
		class="mode-veil"
		class:mode-veil--opaque={modeVeilVisible}
		style="--mode-fade-ms: {MODE_FADE_MS}ms"
	></div>
	<!-- the screen-reader way in: real buttons for the three doors -->
	{#if !loadingMessage && !insideRoom && mode === "walk"}
		<div class="sr-only">
			<h2>Life after death?</h2>
			<p>
				You are standing outside a room holding 1,500 survey respondents from
				around the world, arranged by their answer to one question: do you
				believe in life after death? Pick a door to walk in, then use the up
				arrow key to walk through the crowd from youngest to oldest.
			</p>
			{#each DOORS as door (door.label)}
				<button onclick={() => enterDoorImpl?.(door)}>
					Enter through the “{door.label}” door
				</button>
			{/each}
		</div>
	{/if}
	<!-- persistent, so screen readers hear each beat as it arrives; the
	     visual overlay mounts and unmounts, which live regions miss -->
	<div class="sr-only" aria-live="polite">{storyPlainText}</div>
	<!-- scene events (entering, decade crossings), spoken as they happen -->
	<div class="sr-only" aria-live="polite">{sceneAnnouncement}</div>
	<!-- the decade flash: fades in, holds two seconds, fades out -->
	{#if decadeFlash && !screenshotMode}
		{#key decadeFlash.key}
			<div
				class="decade-flash"
				onanimationend={(e) => {
					// the drift also ends here; only the fade clears
					if (
						e.target === e.currentTarget &&
						e.animationName.includes("decade-flash-fade")
					) {
						decadeFlash = null;
					}
				}}
			>
				{decadeFlash.text}
			</div>
		{/key}
	{/if}
	<!-- shown while pressing into the light at the back wall; the text only
	     exists while it's on, so screen readers don't read it at load -->
	<div
		class="light-message"
		role="status"
		class:light-message--on={lightMessageOn && !screenshotMode}
	>
		{#if lightMessageOn && !screenshotMode}
			Hi, it's good to see you. But you can't go in here right now.
		{/if}
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
		onerror={() => {
			narrationPlaying = false;
			narrationMissing = true;
		}}
	></audio>
	<audio
		bind:this={mondayEl}
		src={asset("/assets/app/Monday.mp3")}
		loop
		preload="none"
	></audio>
	{#if !screenshotMode && !screenRecordMode}
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
		<!-- roomier screens: bars that dance with the sound, quicker while
		     the narration is actually speaking -->
		<span
			class="eq"
			class:eq--on={audioOn}
			class:eq--talking={audioOn && narrationPlaying}
			aria-hidden="true"><i></i><i></i><i></i><i></i></span>
	</button>
	<button
		class="audio-toggle info-toggle"
		aria-pressed={infoOpen}
		aria-label="About this piece"
		title="About this piece"
		onclick={() => {
			infoOpen = !infoOpen;
			if (infoOpen) {
				clickedPerson = null;
				clickedPersonIndex = null;
			}
			playClick();
		}}
	>
		<svg viewBox="0 0 24 24" aria-hidden="true">
			<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.6" />
			<rect x="11.1" y="10.4" width="1.8" height="6" rx="0.9" />
			<circle cx="12" cy="7.6" r="1.15" />
		</svg>
		<!-- roomier screens: the icon gets its word -->
		<span class="toggle-word" aria-hidden="true">Info</span>
	</button>
	{/if}
	<!-- leaves the story for free roaming, or returns to it -->
	{#if mode === "topdown" && !flightActive && !screenshotMode}
		<!-- frames the scissored corner preview; clicking returns to walk -->
		<button
			class="walk-preview"
			aria-label="Return to walk mode"
			onclick={() =>
				requestModeImpl ? requestModeImpl("walk") : (mode = "walk")}
		></button>
	{/if}
	<!-- the panel hides itself in screenshot mode, so escape is the way back -->
	{#if debugMode && !screenshotMode}
		<div class="debug-panel">
			<div>x: {debugStats.x.toFixed(2)}  y: {debugStats.y.toFixed(2)}  z: {debugStats.z.toFixed(2)}</div>
			<div>yaw: {debugStats.yawDeg.toFixed(1)}°  pitch: {debugStats.pitchDeg.toFixed(1)}°</div>
			<div>fov: {debugStats.fov.toFixed(1)}  age: {debugStats.age?.toFixed(1) ?? "—"}</div>
			<div>mode: {debugStats.mode}  inside: {debugStats.insideRoom}  autoWalk: {debugStats.autoWalking}</div>
			<div>variable: {debugStats.selectedVariable}</div>
			<div class="debug-buttons">
				<button type="button" onclick={copyDebugStats}>
					{debugCopyFeedback ? "Copied!" : "Copy"}
				</button>
				<button type="button" onclick={toggleScreenshotMode}>
					Screenshot mode
				</button>
			</div>
			<div class="debug-note">esc exits screenshot mode</div>
		</div>
	{/if}
</div>

<!-- both stay closed in screenshot mode, so a stray click can't cover the shot -->
<InfoModal
	open={infoOpen && !screenshotMode}
	text={copy.info}
	onclose={() => (infoOpen = false)}
/>

<Modal
	person={screenshotMode ? null : clickedPerson}
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

	/* frames the corner preview; size mirrors the PREVIEW_* constants */
	.walk-preview {
		position: absolute;
		right: 10px;
		bottom: 50px;
		width: 200px;
		height: 150px;
		padding: 0;
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0;
		z-index: 6;
		cursor: pointer;
		/* veils its corner at arrival, then fades to reveal the inset */
		animation: walk-preview-fade 480ms ease-out both;
	}
	@keyframes walk-preview-fade {
		from {
			background-color: var(--bg-color, #0d0815);
			border-color: transparent;
		}
		to {
			background-color: transparent;
			border-color: rgba(255, 255, 255, 0.2);
		}
	}
	/* below this there's no room for the preview beside the map */
	@media (max-width: 900px) {
		.walk-preview {
			display: none;
		}
	}

	/* full-bleed in both modes; in topdown it holds the aerial view */
	.lifedeath-room :global(canvas.webgl-canvas) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
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

	/* speed marks: above the scene, below every control */
	.speed-lines {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		z-index: 4;
	}
	/* screenshot mode: still mounted and sized, just not painted over */
	.speed-lines--off {
		visibility: hidden;
	}

	/* the between-beats nudge, at the hints' shared height */
	.walk-hint {
		position: absolute;
		bottom: 18vh;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		pointer-events: none;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 6px;
		color: rgba(255, 255, 255, 0.85);
		font-family: var(--font-sans);
		font-size: calc(14px * var(--text-scale, 1));
		font-style: italic;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		/* wrapped lines stay centered under the arrow */
		text-align: center;
	}
	.walk-hint svg {
		width: 34px;
		height: 34px;
		fill: none;
		stroke: rgba(255, 255, 255, 0.9);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		/* the loop re-aims it every frame; a short chase smooths the spin */
		transition: transform 120ms linear;
	}
	/* the closing hint's own way into explore; the hint box ignores clicks */
	.walk-hint .walk-hint-explore {
		pointer-events: auto;
		margin-top: 4px;
		font-family: inherit;
		font-size: calc(13px * var(--text-scale, 1));
		font-style: normal;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #cfa4ff;
		background: #1a0c2b;
		border: 1px solid rgba(207, 164, 255, 0.55);
		border-radius: 0;
		padding: 0.35rem 1.1rem;
		cursor: pointer;
		transition:
			color 150ms ease-out,
			border-color 150ms ease-out;
	}
	.walk-hint .walk-hint-explore:hover {
		color: #fff;
		border-color: #fff;
	}
	/* the turn-around offer stands alone, so it reads a touch larger */
	.walk-hint .keep-going {
		font-size: calc(14px * var(--text-scale, 1));
		padding: 0.5rem 1.4rem;
	}
	/* narrow screens: the story column sits left of the minimap, so the
	   hint spans that column exactly and centres its content in it */
	@media (max-width: 800px) {
		.walk-hint {
			left: 5px;
			width: calc(100% - 131px);
			transform: none;
		}
	}
	/* the turn-around offer isn't a nudge toward the floor: it's the one
	   thing to press, so it sits dead centre at every width */
	.walk-hint--centered {
		top: 50%;
		bottom: auto;
		left: 50%;
		width: auto;
		transform: translate(-50%, -50%);
	}

	/* the minimap styles itself */


	/* visually hidden, still read by screen readers */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
	/* the decade flash: holds at full opacity for two seconds, then fades */
	.decade-flash {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9;
		pointer-events: none;
		font-family: var(--font-sans);
		/* shrinks with the viewport so it always holds one line */
		font-size: clamp(17px, 5.5vw, 56px);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		white-space: nowrap;
		/* bare white over the scene, shadowed so it reads on the crowd */
		color: #fff;
		text-shadow:
			0 1px 3px rgba(0, 0, 0, 0.9),
			0 0 18px rgba(0, 0, 0, 0.55);
		opacity: 0;
		/* 0.7s in, a 2s hold, 1s out — with a slow drift the whole way,
		   so it breathes */
		animation:
			decade-flash-fade 3.7s ease-out forwards,
			decade-flash-drift 3.7s linear forwards;
	}
	@keyframes decade-flash-fade {
		0% {
			opacity: 0;
		}
		19%,
		73% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
	/* a near-imperceptible swell, the cinematic push-in */
	@keyframes decade-flash-drift {
		from {
			transform: translate(-50%, -50%) scale(0.99);
		}
		to {
			transform: translate(-50%, -50%) scale(1.035);
		}
	}

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
		font-size: calc(1.35rem * var(--text-scale, 1));
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
		/* sits over the real sign, so the tubing lights up in place */
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
		fill: #4d3a6e;
	}
	.loading-sign :global(rect) {
		stroke: #4d3a6e;
	}

	/* sits just above the line, on the same axis */
	.loading-label {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translateX(-50%);
		margin-top: -38px;
		font-family: var(--font-sans);
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
		stroke: #c47aff;
		stroke-width: 1.6;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	/* the page colour, so a wipe over the line reads as bare background */
	.loading-line-wipe {
		position: absolute;
		inset: 0;
		background: var(--bg-color);
		/* its own layer, so the wipes keep running while the thread loads */
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

	/* the label and line have nothing behind them, so they clear early */
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
		background: #1a0c2b;
		/* same pink as the story text's audio button */
		border: 1px solid rgba(207, 164, 255, 0.55);
		border-radius: 0;
		color: #cfa4ff;
		cursor: pointer;
		transition:
			color 150ms ease-out,
			border-color 150ms ease-out;
	}
	.info-toggle {
		top: 52px;
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
	/* the word and the bars exist only on roomier screens */
	.toggle-word,
	.eq {
		display: none;
	}
	@media (min-width: 1001px) {
		.audio-toggle {
			/* both corner buttons share this width, whatever they hold */
			width: 92px;
			display: inline-flex;
			align-items: center;
			justify-content: center;
			gap: 7px;
		}
		.toggle-word {
			display: block;
			font-family: var(--font-sans);
			font-size: 12px;
			font-weight: 600;
			text-transform: uppercase;
			letter-spacing: 0.08em;
		}
		.eq {
			display: flex;
			align-items: flex-end;
			gap: 2.5px;
			height: 15px;
		}
		/* always dancing — muted while the sound is off, full color while
		   it plays, harder while the narration speaks */
		.eq i {
			width: 3px;
			height: 4px;
			background: rgba(207, 164, 255, 0.35);
			animation: eq-dance 1.1s ease-in-out infinite;
		}
		.eq i:nth-child(1) {
			animation-delay: -0.15s;
		}
		.eq i:nth-child(2) {
			animation-delay: -0.6s;
		}
		.eq i:nth-child(3) {
			animation-delay: -0.35s;
		}
		.eq i:nth-child(4) {
			animation-delay: -0.85s;
		}
		.eq--on i {
			background: currentColor;
		}
		.eq--talking i {
			animation-duration: 0.5s;
		}
		@media (prefers-reduced-motion: reduce) {
			.eq i {
				animation: none;
				height: 9px;
			}
		}
	}
	@keyframes eq-dance {
		0%,
		100% {
			height: 4px;
		}
		50% {
			height: 15px;
		}
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
		font-family: var(--font-sans);
		/* sans runs wider than the old serif; sized to stay inside 124px */
		font-size: 0.82rem;
		/* the same pink as the story and audio buttons */
		color: #cfa4ff;
		background: #1a0c2b;
		border: 1px solid rgba(207, 164, 255, 0.55);
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
			width: min(116px, 29vw);
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

	/* the two actions sit side by side under the readout */
	.debug-buttons {
		display: flex;
		gap: 6px;
	}
	/* how to get back out, since the panel itself goes */
	.debug-note {
		color: rgba(0, 255, 0, 0.6);
		font-size: 10px;
		margin-top: 2px;
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
