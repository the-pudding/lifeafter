// pure math for the walk, the crowd and the camera

// keeps an angle in (-π, π]
export function wrapAngle(angle) {
	return (
		((((angle + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) -
		Math.PI
	);
}

// the shortest signed angle from `a` to `b`, across the wraparound
export function shortestAngleDelta(a, b) {
	let delta = (b - a) % (Math.PI * 2);
	if (delta > Math.PI) delta -= Math.PI * 2;
	if (delta < -Math.PI) delta += Math.PI * 2;
	return delta;
}

// the rotation facing a body toward (dx, dz); these models face local +z
export function directionToYaw(dx, dz) {
	return Math.atan2(dx, dz);
}

// eases a 0..1 progress in and out
export function smoothstep(t) {
	return t * t * (3 - 2 * t);
}

// the first band a distance falls within; the last is a catch-all
export function pickLodBand(distance, bands) {
	for (const band of bands) {
		if (distance <= band.maxDistance) return band;
	}
	return bands[bands.length - 1];
}

// maps age to depth and back: young at the front, old at the back
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

// pushes back to their side of the door plane, unless that door is open
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

// the same for the inner wall, unless they're in an opening
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

// a speed-capped spring toward `target`, carrying velocity between frames
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
	// snaps on overshoot
	if (originalTarget - current > 0 === value > originalTarget) {
		value = originalTarget;
		nextVelocity = (value - originalTarget) / dt;
	}
	return { value, velocity: nextVelocity };
}

// the vertical fov giving a horizontal half-angle at an aspect, clamped
export function computeFovForHorizontalHalfAngle(
	halfAngleRad,
	aspect,
	{ minFov = 50, maxFov = 120 } = {}
) {
	const verticalFovRad = 2 * Math.atan(Math.tan(halfAngleRad) / aspect);
	return Math.min(maxFov, Math.max(minFov, (verticalFovRad * 180) / Math.PI));
}
