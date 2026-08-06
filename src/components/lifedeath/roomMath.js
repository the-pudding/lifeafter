// Pure math/geometry helpers used by Main.lifedeath.svelte's walk
// simulation, crowd LOD, and camera setup — no Three.js or Svelte
// dependency, so these are easy to read and test in isolation from the
// scene-building code itself.

/** Keeps an angle in (-π, π] so it doesn't grow without bound as someone spins around and around while steering. */
export function wrapAngle(angle) {
	return (
		((((angle + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) -
		Math.PI
	);
}

/** The shortest signed angular distance from `a` to `b` (radians, in (-π, π]) — always the short way around, even across the -π/π wraparound. */
export function shortestAngleDelta(a, b) {
	let delta = (b - a) % (Math.PI * 2);
	if (delta > Math.PI) delta -= Math.PI * 2;
	if (delta < -Math.PI) delta += Math.PI * 2;
	return delta;
}

/**
 * The `root.rotation.y` that makes a crowd-member GLB's own front face
 * world direction (dx, dz) — NOT the plain `Math.atan2(dz, dx)` a
 * standard glTF (local -Z forward) would use. Empirically confirmed
 * (rendering one body at a handful of test rotation.y values and
 * checking which way its face/hood pointed) that these particular
 * bodies are rigged facing local +Z instead, so world-forward at a given
 * rotation.y is (sin y, cos y), not (-sin y, -cos y) — hence atan2's
 * arguments here are (dx, dz), swapped from the usual (dz, dx).
 */
export function directionToYaw(dx, dz) {
	return Math.atan2(dx, dz);
}

/** Eases a 0..1 progress value in and out, so a transition accelerates/decelerates gently rather than snapping linearly. */
export function smoothstep(t) {
	return t * t * (3 - 2 * t);
}

/** The first band (ascending by maxDistance) the given distance falls within — the last band acts as a catch-all for anything beyond it. */
export function pickLodBand(distance, bands) {
	for (const band of bands) {
		if (distance <= band.maxDistance) return band;
	}
	return bands[bands.length - 1];
}

/**
 * Builds the age <-> room-depth (Z) mapping for a given respondent age
 * range and room size — younger respondents sit toward the front (larger
 * Z, near the doors), older respondents toward the back wall (more
 * negative Z). Shared between both directions so a given age always maps
 * to the same depth it'd map back from.
 */
export function createAgeZMapping({ ageMin, ageMax, halfDepth, roomDepth }) {
	function ageToZ(age) {
		const t = (age - ageMin) / (ageMax - ageMin || 1);
		return halfDepth - t * roomDepth;
	}
	function zToAge(z) {
		const t = (halfDepth - z) / roomDepth;
		return Math.round(
			ageMin + Math.min(1, Math.max(0, t)) * (ageMax - ageMin)
		);
	}
	return { ageToZ, zToAge };
}

/**
 * Pushes a walker back to whichever side of the outer doors' Z plane
 * they're already on, unless the specific door they're in front of is
 * open enough to pass through — a no-op otherwise.
 */
export function createOuterDoorCollisionResolver({
	doors,
	doorZ,
	doorWidth,
	facadeClearance,
	doorPassableOpenAmount
}) {
	function isPassable(x) {
		const door = doors.find((d) => Math.abs(x - d.x) < doorWidth / 2);
		return door ? door.openAmount > doorPassableOpenAmount : false;
	}
	return function resolveOuterDoorCollision(x, z) {
		if (Math.abs(z - doorZ) < facadeClearance && !isPassable(x)) {
			z = doorZ + Math.sign(z - doorZ || 1) * facadeClearance;
		}
		return z;
	};
}

/**
 * Pushes a walker back to whichever side of the inner partition wall's Z
 * plane they're already on, unless they're within one of its corridor
 * openings — always open, since the outer doors are the only real gate.
 */
export function createInnerWallCollisionResolver({
	zoneXs,
	halfDepth,
	facadeClearance,
	corridorWidth
}) {
	return function resolveInnerWallCollision(x, z) {
		const isInOpening = zoneXs.some(
			(zoneX) => Math.abs(x - zoneX) < corridorWidth / 2
		);
		if (Math.abs(z - halfDepth) < facadeClearance && !isInOpening) {
			z = halfDepth + Math.sign(z - halfDepth || 1) * facadeClearance;
		}
		return z;
	};
}

/**
 * Critically-damped spring toward `target`, with a hard cap on speed —
 * the standard "SmoothDamp" (Unity/Game Programming Gems) formulation.
 * Unlike a plain exponential ease (`current += (target - current) *
 * factor`), whose instantaneous speed is always proportional to the
 * remaining distance, this carries real velocity from frame to frame: it
 * ramps up to maxSpeed (acceleration) and eases back down to zero right
 * as it arrives (deceleration), and — the reason it's used for the
 * door auto-walk specifically — a sudden mid-flight change to `target`
 * doesn't jolt the velocity, it just smoothly re-curves toward the new
 * target instead.
 *
 * Returns `{ value, velocity }`; pass the previous call's `velocity` back
 * in on the next frame (0 to start). `smoothTime` is roughly the seconds
 * to close most of the remaining distance once at full speed.
 */
export function smoothDamp(current, target, velocity, smoothTime, maxSpeed, dt) {
	smoothTime = Math.max(0.0001, smoothTime);
	const omega = 2 / smoothTime;
	const x = omega * dt;
	const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
	const originalTarget = target;
	const maxChange = maxSpeed * smoothTime;
	const change = Math.max(-maxChange, Math.min(maxChange, current - target));
	const adjustedTarget = current - change;
	const temp = (velocity + omega * change) * dt;
	let nextVelocity = (velocity - omega * temp) * exp;
	let value = adjustedTarget + (change + temp) * exp;
	// Prevent overshoot: once the eased value would cross past the real
	// target, snap to it and zero out the velocity component that
	// would've carried it further.
	if (originalTarget - current > 0 === value > originalTarget) {
		value = originalTarget;
		nextVelocity = (value - originalTarget) / dt;
	}
	return { value, velocity: nextVelocity };
}

/**
 * The vertical (three.js `camera.fov`) angle, in degrees, that reproduces
 * a given required horizontal half-angle at a given aspect ratio (width /
 * height) — a wide/short viewport needs less vertical fov than a
 * narrow/tall one to show the same horizontal spread. Clamped to a sane
 * range so an extreme aspect ratio can't push it to a degenerate fisheye
 * or pinhole value.
 */
export function computeFovForHorizontalHalfAngle(
	halfAngleRad,
	aspect,
	{ minFov = 50, maxFov = 120 } = {}
) {
	const verticalFovRad = 2 * Math.atan(Math.tan(halfAngleRad) / aspect);
	return Math.min(maxFov, Math.max(minFov, (verticalFovRad * 180) / Math.PI));
}
