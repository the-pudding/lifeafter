// room, door, and camera constants. world units.
import { FIGURE_HEIGHT } from "../people/peopleConfig.js";
import noSvg from "$svg/no.svg?raw";
import notSureSvg from "$svg/not-sure.svg?raw";
import yesSvg from "$svg/yes.svg?raw";

// the one background: scene, fog, minimap, topdown and the load screen
export const BG_COLOR = "#110818";

export const BG_COLOR_CSS = BG_COLOR;

// no-answer people: desaturated dark purple
export const MUTED_COLOR = "#443254";

// sign, door frames, lamps
export const NEON_PINK = "#cfa4ff";

// floor tint over age spans with no story beat
export const STORY_GAP_FLOOR_COLOR = "#1e0b2a";

// door fills, per zone
export const DOOR_ZONE_COLORS = {
	No: "#53043d",
	Unsure: "#3e1f42",
	Yes: "rgb(69, 50, 7)"
};

// hover/focus variant
export const DOOR_ZONE_COLORS_LIGHT = {
	No: "#fd08a8",
	Unsure: "#8c19c6",
	Yes: "rgb(255, 179, 1)"
};

export const ROOM_WIDTH = 30; // left/right: No, Unsure, Yes, one third each

export const ROOM_DEPTH = 360; // front/back (younger <-> older)

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

// fits a label in the shared box; `scale` lets one door run bigger
export function sizeDoorLabelSvg(svg, viewBoxWidth, viewBoxHeight, scale = 1) {
	const aspect = viewBoxWidth / viewBoxHeight;
	const maxWidth = DOOR_LABEL_MAX_WIDTH * scale;
	const maxHeight = DOOR_LABEL_MAX_HEIGHT * scale;
	const widthAtMaxHeight = maxHeight * aspect;
	const height = widthAtMaxHeight <= maxWidth ? maxHeight : maxWidth / aspect;
	return { svg, width: height * aspect, height };
}

// "not sure" stacks two lines, so it needs a bigger scale to match the others
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

// start pitch. positive = up. the wider fov leaves room to aim higher
export const DEFAULT_CAMERA_PITCH = isMobileViewport
	? (0 * Math.PI) / 180
	: (6 * Math.PI) / 180;

// extra look-down once inside, sized so the in-room pitch stays put
export const ROOM_ENTRY_PITCH_TILT = (-10 * Math.PI) / 180;

export const ROOM_ENTRY_PITCH_TIME = 0.6; // seconds to close ~63% of that tilt

export const WALK_SPEED = 0.02; // world units of target movement per unit of wheel delta

// the furthest one input event can move the walker, and the curve's top
export const MAX_WHEEL_STEP = 60; // clamps one wheel event so trackpad flings don't teleport

// scroll response curve: raise the exponent for finer control, lower for linear
export const WHEEL_FULL_SPEED_DELTA = 70; // delta that reaches the top of the curve

export const WHEEL_RESPONSE_EXPONENT = 1.9;

// overall damping on wheel walking; swipes and keys are untouched
export const WHEEL_WALK_SCALE = 0.8;

// touch deltas are far smaller than wheel deltas, so they get their own reference
export const TOUCH_FULL_SPEED_DELTA = 24;

// swipes walk faster, since thumbs can't repeat as fast as a wheel
export const TOUCH_WALK_BOOST = 2;

// scroll and swipe walking scale down on small screens
export const SCROLL_WALK_NARROW_WIDTH = 1100; // at or below: slowest

export const SCROLL_WALK_WIDE_WIDTH = 1700; // at or above: unchanged

export const SCROLL_WALK_MIN_SCALE = 0.345;

// story mode's forward-facing turn cone
export const STORY_YAW_CONE_DEGREES = 140;
// how quickly the overshoot eases back inside the cone; bigger is gentler
export const STORY_YAW_PUSHBACK_TIME = 0.3;

// arrow-key rate. x WALK_SPEED = ~5 units/sec
export const KEY_MOVE_DELTA_PER_SECOND = 250;

// camera glide. smaller = snappier
export const FOLLOW_TIME = 0.05; // seconds to close ~63% of the remaining distance

// door auto-walk. smoothDamp carries velocity across the x->z handoff
export const DOOR_WALK_SPEED = 10; // world units/second, smoothDamp's speed cap

// how long the arrival takes to settle; bigger is a softer stop
export const DOOR_WALK_SMOOTH_TIME = 0.85; // seconds to close most of the distance at full speed

// below both of these the walk is done and steering resumes
export const DOOR_WALK_SETTLE_DISTANCE = 0.03;

export const DOOR_WALK_SETTLE_SPEED = 0.05;

export const DOOR_WALK_YAW_SPEED = Math.PI * 0.7; // radians/second, turning to face forward

// keeps near-clip plane out of walls
export const WALK_MARGIN = 3;

// keeps the walker inside the colonnade, out of the pillar aisles
export const SIDE_WALL_MARGIN = 2.2;

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

// ?screenrecord=true — larger type, so the room reads in a video frame.
// independent of ?debug, since a recording wants no hud
export const screenRecordMode =
	(debugSearchParams?.has("screenrecord") ?? false) &&
	debugSearchParams.get("screenrecord") !== "false";

// how much bigger that type runs. drives both the --text-scale css knob and
// the minimap's canvas labels, which css can't reach
export const SCREEN_RECORD_TEXT_SCALE = 1.3;
