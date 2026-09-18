// crowd data, models, animation, collision, LOD, info panels
import { asset } from "$app/paths";

export const PEOPLE_DATA_URL = asset("/data/people.json");

// per-country average adult height, age 19
export const HEIGHT_DATA_URL = asset("/data/height26.csv");

// rigged bodies with a baked walk clip. CC-BY-4.0, Sketchfab "Base Mesh 246 Tri"
export const BASE_URL = asset("/assets/app/bodies_clothes/");

export const MALE_BODY_URLS = [
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

export const FEMALE_BODY_URLS = [
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

// floor to top of head
export const FIGURE_HEIGHT = 2;

// blob-shadow disc radius
export const SHADOW_RADIUS = 0.4;

// outline thickness, nearest band
export const OUTLINE_DEFAULT_THICKNESS = 0.003;

// past this, walk mixer stops updating
export const LOD_FREEZE_DISTANCE = 5;

// distance bands: dim body, thin outline. never swaps meshes
export const LOD_COLOR_BANDS = [
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

// clicked person. >1 = blown out
export const SELECTED_PERSON_BRIGHTNESS = 4;

// hovered person
export const HOVERED_PERSON_BRIGHTNESS = 1.8;

// facing turn rate
export const FACING_TURN_TIME = 0.8; // seconds to close ~63% of the remaining turn

export const WALK_AMOUNT_SMOOTH_TIME = 0.4; // seconds to close ~63% of the fade in/out

// smoothing on speed -> clip playback rate
export const WALK_SPEED_SMOOTH_TIME = 0.05;

// Y1<->Y2 walk speed, units/sec. paced per-person by distance
export const POSITION_TRANSITION_SPEED = 3;

// speed that plays the clip at 1x, as a fraction of the above
export const WALK_ANIM_SPEED_FACTOR = 0.18;

export const WALK_ANIM_SPEED =
	POSITION_TRANSITION_SPEED * WALK_ANIM_SPEED_FACTOR;

// clip playback rate bounds
export const MIN_WALK_TIMESCALE = 0.8;

export const MAX_WALK_TIMESCALE = 8;

// below this sq. movement = at rest
export const MOVE_FACING_EPSILON_SQ = 1e-6;

// clip point held while moving opposite facing. avoids moonwalking
export const STEP_BACK_HOLD_FRACTION = 0.15;

// within this, people face the camera
export const FACE_CAMERA_RADIUS = 3.5;

// max distance for an info panel
export const NEARBY_PERSON_MAX_DISTANCE = 22;

// widest selection cone. camera fov narrows it at runtime
export const NEARBY_PERSON_FOV_HALF_ANGLE = Math.PI / 4; // 45° either side of dead ahead = 90° total

// trimmed off half-fov so panels don't clip at the edge
export const NEARBY_PERSON_FOV_SCREEN_MARGIN = (5 * Math.PI) / 180; // 5°

// gap between head and panel, on top of the line's length
export const NEARBY_PERSON_HEAD_GAP = 0.05;

// most panels shown at once
export const NEARBY_PEOPLE_MAX = 4;

// panel width at reference distance. height follows line count
export const NEARBY_PANEL_WORLD_WIDTH = 0.8;

// distance where a panel is its literal world size
export const NEARBY_PANEL_REFERENCE_DISTANCE = 3.5;

// panels scale against this fov, so they hold their pixel size on any viewport
export const NEARBY_PANEL_REFERENCE_FOV = 64;

export const NEARBY_PANEL_MAX_FOV_SCALE = 2.6;

// apparent-size bounds. between them, scales with distance; outside, clamped
export const NEARBY_PANEL_MIN_APPARENT_SCALE = 1;

export const NEARBY_PANEL_MAX_APPARENT_SCALE = 1.4;

// panel fade in/out
export const NEARBY_PANEL_FADE_SECONDS = 0.28;

// leader line from head to panel: length, draw time, thickness
export const NEARBY_PANEL_LINE_LENGTH = 0.2;

export const NEARBY_PANEL_LINE_SECONDS = 0.18;

export const NEARBY_PANEL_LINE_WIDTH = 0.005;

// matches the panel's own border
export const NEARBY_PANEL_LINE_COLOR = "#ffffff";

export const NEARBY_PANEL_LINE_OPACITY = 0.35;

// how often the selection re-ranks; drops are immediate
export const NEARBY_SELECTION_REFRESH_INTERVAL = 0.35; // seconds

// hysteresis: a challenger has to be about 22% closer to take a slot
export const NEARBY_INCUMBENT_STICKINESS = 0.6;

// breathing wobble, as Y scale
export const BREATHING_AMPLITUDE = 0.01; // fraction of height, peak scale change

export const BREATHING_SPEED = (2 * Math.PI) / 5; // radians/sec (~3.6s per breath), idle only

// breaths per walk loop. 2 = one bob per footfall
export const BREATH_CYCLES_PER_STRIDE = 2;

// breath scale while walking
export const WALK_BREATH_AMPLITUDE_SCALE = 0.6;

// walker nudges people aside; they relax back
export const COLLISION_RADIUS = 1.1; // how close (world units) before a person gets nudged

export const PUSH_STRENGTH = 12; // how hard they're pushed, per second, at maximum overlap

export const MAX_OFFSET = 1.6; // a person can never be nudged further than this from their spot

export const OFFSET_RETURN_TIME = 0.6; // seconds for a nudge to mostly relax back

// person-person nudging, via spatial hash grid
export const PERSON_COLLISION_RADIUS = 0.8; // just under the ~0.85 spawn spacing, so resting people don't jitter

export const PERSON_PUSH_STRENGTH = 3;

export const PERSON_CELL_SIZE = PERSON_COLLISION_RADIUS;

// turn pace for a Y1<->Y2 move
export const BLEND_TURN_TIME = 0.06;

// turn must land this close before walking
export const BLEND_TURN_GATE_ANGLE = Math.PI / 9; // 20°

// fixed ease-in window, any walk length
export const BLEND_MOVE_EASE_SECONDS = 0.2;
