// room, door, and camera constants. world units.
import { FIGURE_HEIGHT } from "../people/peopleConfig.js";
import noSvg from "$svg/no.svg?raw";
import notSureSvg from "$svg/not-sure.svg?raw";
import yesSvg from "$svg/yes.svg?raw";

// bg for scene, minimap, topdown page
export const BG_COLOR = 0x0f000d;

export const BG_COLOR_CSS = `#${BG_COLOR.toString(16).padStart(6, "0")}`;

// missing/null values
export const MUTED_COLOR = "#cccccc";

// sign, door frames, lamps
export const NEON_PINK = "#ff8dce";

// floor tint over age spans with no story beat — lighter and pinker than
// the floor's own near-black, so the quiet stretches read as different
// ground. CHANGE THIS to retune those sections.
export const STORY_GAP_FLOOR_COLOR = "#250819";

// door fills, per zone
export const DOOR_ZONE_COLORS = {
	No: "rgb(69, 50, 7)",
	Unsure: "#3e1f42",
	Yes: "#53043d"
};

// hover/focus variant
export const DOOR_ZONE_COLORS_LIGHT = {
	No: "rgb(255, 179, 1)",
	Unsure: "#8c19c6",
	Yes: "#fd08a8"
};

export const ROOM_WIDTH = 30; // left/right: No, Unsure, Yes, one third each

export const ROOM_DEPTH = 290; // front/back (younger <-> older)

export const ROOM_HEIGHT = 50;

export const HALF_WIDTH = ROOM_WIDTH / 2;

export const HALF_DEPTH = ROOM_DEPTH / 2;

// one third per answer
export const ZONE_WIDTH = ROOM_WIDTH / 3;

// plaza depth; walker starts here
export const EXTERIOR_DEPTH = 16;

export const VESTIBULE_DEPTH = 0;

export const DOOR_Z = HALF_DEPTH + VESTIBULE_DEPTH;

export const DOOR_WIDTH = 2.4; // just wide enough for one figure

export const DOOR_HEIGHT = 4; // just clears a figure's head

export const FACADE_THICKNESS = 0.6;

export const FACADE_CLEARANCE = FACADE_THICKNESS / 2 + 0.4;

// extrudes outward, away from the walkable room
export const WALL_THICKNESS = 0.5;

// distance that opens a door
export const DOOR_TRIGGER_RADIUS = 1.2;

export const DOOR_OPEN_TIME = 0.35; // seconds to close ~63% of the remaining open/close

export const DOOR_OPEN_ANGLE = Math.PI * 0.8; // swings inward, almost flat against the inside wall

// open amount (0..1) that stops blocking
export const DOOR_PASSABLE_OPEN_AMOUNT = 0.5;

// one per zone. openAmount advanced per frame by updateDoors()
export const DOORS = [
	{ x: -ZONE_WIDTH + ZONE_WIDTH / 3, label: "No", openAmount: 0 },
	{ x: 0, label: "Unsure", openAmount: 0 },
	{ x: ZONE_WIDTH - ZONE_WIDTH / 3, label: "Yes", openAmount: 0 }
];

// box each label SVG fits inside, aspect preserved
export const DOOR_LABEL_MAX_WIDTH = 1.6;

export const DOOR_LABEL_MAX_HEIGHT = 1.0;

// fit label, whichever dimension binds first. `scale` lets one door's
// label run bigger than the shared box (the door itself is 2.4 wide, so
// anything past ~1.5 starts overhanging the panel)
export function sizeDoorLabelSvg(svg, viewBoxWidth, viewBoxHeight, scale = 1) {
	const aspect = viewBoxWidth / viewBoxHeight;
	const maxWidth = DOOR_LABEL_MAX_WIDTH * scale;
	const maxHeight = DOOR_LABEL_MAX_HEIGHT * scale;
	const widthAtMaxHeight = maxHeight * aspect;
	const height = widthAtMaxHeight <= maxWidth ? maxHeight : maxWidth / aspect;
	return { svg, width: height * aspect, height };
}

// "not sure" stacks two lines in an 80x56 box, so each line's letters are
// only ~28 of those units against no/yes's ~48 — it needs ~1.17x just to
// match their letter size, and the scale below goes past that so this door
// reads bigger, as intended.
export const DOOR_LABEL_ASSETS = {
	No: sizeDoorLabelSvg(noSvg, 58, 48),
	Unsure: sizeDoorLabelSvg(notSureSvg, 80, 56, 1.2),
	Yes: sizeDoorLabelSvg(yesSvg, 71, 48)
};

// shell matches room width
export const OUTER_WALL_HALF_WIDTH = HALF_WIDTH;

// ~three people abreast
export const CORRIDOR_WIDTH = 2.7;

export const TURN_CLEARANCE = 0.15;

export const VESTIBULE_CEILING_HEIGHT = DOOR_HEIGHT + 0.6;

export const CORRIDOR_WALL_HEIGHT = VESTIBULE_CEILING_HEIGHT;

// eye height
export const EYE_HEIGHT = FIGURE_HEIGHT * 0.9;

// yaw per full-screen drag
export const DRAG_LOOK_RADIANS_PER_SWIPE = Math.PI / 2;

// drag tilt limit
export const MAX_DRAG_PITCH = (60 * Math.PI) / 180;

// read once at init
export const isMobileViewport =
	typeof window !== "undefined" && window.innerWidth <= 640;

// start pitch. positive = up. phones tilt down
export const DEFAULT_CAMERA_PITCH = isMobileViewport
	? (-4 * Math.PI) / 180
	: (2 * Math.PI) / 180;

// extra look-down once inside
export const ROOM_ENTRY_PITCH_TILT = (-6 * Math.PI) / 180;

export const ROOM_ENTRY_PITCH_TIME = 0.6; // seconds to close ~63% of that tilt

export const WALK_SPEED = 0.02; // world units of target movement per unit of wheel delta

// the ceiling on how far one input event can move the walker, and the top
// of the response curve below
export const MAX_WHEEL_STEP = 60; // clamps one wheel event so trackpad flings don't teleport

// Scroll/swipe response curve. Mapping the delta straight through gives
// one pace — gentle and hard scrolling differ only by the ratio of their
// deltas, which is a narrow band in practice. Shaping it by a power curve
// opens that up: a light scroll inches along where it used to walk, and a
// firm one covers real ground, all against the same ceiling above.
// Raise the exponent for finer low-end control, lower it toward 1 to go
// back to a linear feel.
export const WHEEL_FULL_SPEED_DELTA = 70; // delta that reaches the top of the curve

export const WHEEL_RESPONSE_EXPONENT = 1.9;

// scroll/swipe walking is scaled down on small screens. a trackpad or
// touch swipe sends the same pixel deltas whatever the display, but a 13"
// laptop shows less room per pixel, so the same gesture reads as a sprint.
// keys and door auto-walk are rate-based and unaffected.
export const SCROLL_WALK_NARROW_WIDTH = 1100; // at or below: slowest

export const SCROLL_WALK_WIDE_WIDTH = 1700; // at or above: unchanged

export const SCROLL_WALK_MIN_SCALE = 0.3;

// arrow-key rate. x WALK_SPEED = ~5 units/sec
export const KEY_MOVE_DELTA_PER_SECOND = 250;

// camera glide. smaller = snappier
export const FOLLOW_TIME = 0.1; // seconds to close ~63% of the remaining distance

// door auto-walk. smoothDamp carries velocity across the x->z handoff
export const DOOR_WALK_SPEED = 10; // world units/second, smoothDamp's speed cap

// the cruise is capped by the speed above, so this mostly sets how long
// the arrival takes to settle — the bigger it is, the softer the stop
export const DOOR_WALK_SMOOTH_TIME = 0.85; // seconds to close most of the distance at full speed

// below both of these the walk is done and normal steering resumes
export const DOOR_WALK_SETTLE_DISTANCE = 0.03;

export const DOOR_WALK_SETTLE_SPEED = 0.05;

export const DOOR_WALK_YAW_SPEED = Math.PI * 0.7; // radians/second, turning to face forward

// keeps near-clip plane out of walls
export const WALK_MARGIN = 3;

// tighter, so side walls are reachable
export const SIDE_WALL_MARGIN = 0.4;

export const MIN_WALK_X = -HALF_WIDTH + SIDE_WALL_MARGIN;

export const MAX_WALK_X = HALF_WIDTH - SIDE_WALL_MARGIN;

export const MIN_WALK_Z = -HALF_DEPTH + WALK_MARGIN;

export const MAX_WALK_Z = HALF_DEPTH + EXTERIOR_DEPTH - WALK_MARGIN;

// plaza, facing the doors
export const DEFAULT_START_Z = HALF_DEPTH + EXTERIOR_DEPTH - 4;

// debug: start inside
export const DEBUG_START_Z = HALF_DEPTH - WALK_MARGIN;

// ?debug
export const debugSearchParams =
	typeof window !== "undefined"
		? new URLSearchParams(window.location.search)
		: null;
export const debugMode = debugSearchParams?.has("debug") ?? false;

// ?variable= / &age= restore a debug view
export const debugVariableParam = debugMode
	? debugSearchParams.get("variable")
	: null;

export const debugAgeParam = debugMode ? debugSearchParams.get("age") : null;
