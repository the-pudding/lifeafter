// pure math for the walk sim, crowd LOD, and camera. no three.js or Svelte

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
 * rotation.y facing a body's front toward (dx, dz). these GLBs are rigged
 * facing local +Z, not the usual -Z, so forward is (sin y, cos y) and
 * atan2's arguments are swapped.
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
 * age <-> depth mapping. young at the front (larger Z), old at the back.
 * both directions share it, so a round trip is stable.
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
 * pushes back to their side of the door plane, unless that door is open.
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
 * same for the inner wall, unless they're in a corridor opening.
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
 * critically-damped spring toward `target`, speed-capped. the standard
 * SmoothDamp. unlike an exponential ease it carries velocity frame to
 * frame, so it accelerates, decelerates, and re-curves without jolting
 * when `target` changes mid-flight.
 *
 * returns { value, velocity }; feed velocity back in (0 to start).
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
	// snap on overshoot
	if (originalTarget - current > 0 === value > originalTarget) {
		value = originalTarget;
		nextVelocity = (value - originalTarget) / dt;
	}
	return { value, velocity: nextVelocity };
}

/**
 * vertical fov (deg) reproducing a horizontal half-angle at an aspect.
 * clamped, so an extreme aspect can't reach fisheye or pinhole.
 */
export function computeFovForHorizontalHalfAngle(
	halfAngleRad,
	aspect,
	{ minFov = 50, maxFov = 120 } = {}
) {
	const verticalFovRad = 2 * Math.atan(Math.tan(halfAngleRad) / aspect);
	return Math.min(maxFov, Math.max(minFov, (verticalFovRad * 180) / Math.PI));
}
