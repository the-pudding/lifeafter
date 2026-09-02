// room, door, and camera constants. world units.
import { FIGURE_HEIGHT } from "../people/peopleConfig.js";
import noSvg from "$svg/no.svg?raw";
import unsureSvg from "$svg/unsure.svg?raw";
import yesSvg from "$svg/yes.svg?raw";

// bg for scene, minimap, topdown page
export const BG_COLOR = 0x0f000d;

export const BG_COLOR_CSS = `#${BG_COLOR.toString(16).padStart(6, "0")}`;

// missing/null values
export const MUTED_COLOR = "#cccccc";

// sign, door frames, lamps
export const NEON_PINK = "#ff8dce";

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

export const ROOM_DEPTH = 250; // front/back (younger <-> older)

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

// fit label, whichever dimension binds first
export function sizeDoorLabelSvg(svg, viewBoxWidth, viewBoxHeight) {
	const aspect = viewBoxWidth / viewBoxHeight;
	const widthAtMaxHeight = DOOR_LABEL_MAX_HEIGHT * aspect;
	const height =
		widthAtMaxHeight <= DOOR_LABEL_MAX_WIDTH
			? DOOR_LABEL_MAX_HEIGHT
			: DOOR_LABEL_MAX_WIDTH / aspect;
	return { svg, width: height * aspect, height };
}

export const DOOR_LABEL_ASSETS = {
	No: sizeDoorLabelSvg(noSvg, 58, 48),
	Unsure: sizeDoorLabelSvg(unsureSvg, 129, 48),
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

export const MAX_WHEEL_STEP = 45; // clamps one wheel event so trackpad flings don't teleport

// arrow-key rate. x WALK_SPEED = ~5 units/sec
export const KEY_MOVE_DELTA_PER_SECOND = 250;

// camera glide. smaller = snappier
export const FOLLOW_TIME = 0.1; // seconds to close ~63% of the remaining distance

// door auto-walk. smoothDamp carries velocity across the x->z handoff
export const DOOR_WALK_SPEED = 9; // world units/second, smoothDamp's speed cap

export const DOOR_WALK_SMOOTH_TIME = 0.35; // seconds to close most of the distance at full speed

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
