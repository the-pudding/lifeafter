import { smoothstep, shortestAngleDelta, pickLodBand, directionToYaw } from "../room/roomMath.js";

// below this, a person's positionBlend is considered to have caught up
// with the shared target — avoids treating floating-point dust as a
// still-pending Y1<->Y2 move forever.
const POSITION_BLEND_EPSILON = 1e-4;

/**
 * computes a collision-free layout for one wave (Y1 or Y2) via rejection
 * sampling against a spatial hash grid.
 */
export function computeLayout(respondents, getZone, getAge, config) {
	const { ageToZ, zoneWidth, halfWidth, halfDepth, roomDepth } = config;
	const MIN_SPACING = 0.85; // minimum center-to-center distance between any two people
	const cellSize = MIN_SPACING;
	const occupiedCells = new Map(); // "cx,cz" -> [{x, z}, ...]

	function cellKeyFor(x, z) {
		return `${Math.floor(x / cellSize)},${Math.floor(z / cellSize)}`;
	}

	function farEnoughFromEveryoneElse(x, z) {
		const cx = Math.floor(x / cellSize);
		const cz = Math.floor(z / cellSize);
		// A person can only be too close to someone in the same or an
		// adjacent cell, since cells are sized to MIN_SPACING.
		for (let dx = -1; dx <= 1; dx++) {
			for (let dz = -1; dz <= 1; dz++) {
				const bucket = occupiedCells.get(`${cx + dx},${cz + dz}`);
				if (!bucket) continue;
				for (const other of bucket) {
					const ddx = other.x - x;
					const ddz = other.z - z;
					if (ddx * ddx + ddz * ddz < MIN_SPACING * MIN_SPACING) return false;
				}
			}
		}
		return true;
	}

	// horizontal placement uses the full zone width (there's no bar or
	// other obstacle at the boundary anymore), with just a small wall margin.
	const WALL_MARGIN = 1.5;
	const HALF_ZONE = zoneWidth / 2;

	// zone is -1 (No), 0 (Unsure), or 1 (Yes). wallMargin shrinks on each
	// retry so dense age bands find room.
	function zoneBounds(zone, wallMargin) {
		if (zone < 0) return [-halfWidth + wallMargin, -HALF_ZONE];
		if (zone > 0) return [HALF_ZONE, halfWidth - wallMargin];
		return [-HALF_ZONE, HALF_ZONE];
	}

	return respondents.map((person) => {
		const zone = getZone(person);
		const baseZ = ageToZ(getAge(person));

		let x, z;
		const MAX_ATTEMPTS = 40;
		for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
			// widen the search area on each retry so dense age bands still
			// find room instead of exhausting all 40 attempts.
			const widen = 1 + attempt / MAX_ATTEMPTS;
			const [min, max] = zoneBounds(zone, WALL_MARGIN / widen);
			x = min + Math.random() * (max - min);
			// clamped so jitter never pushes the front-most age band past halfDepth into the facade.
			z = Math.min(
				halfDepth - WALL_MARGIN,
				baseZ + (Math.random() - 0.5) * (roomDepth / 40) * widen
			);
			if (farEnoughFromEveryoneElse(x, z)) break;
		}
		// if every attempt failed, keep the last candidate rather than leaving the person unplaced.

		const key = cellKeyFor(x, z);
		if (!occupiedCells.has(key)) occupiedCells.set(key, []);
		occupiedCells.get(key).push({ x, z });

		return { x, z };
	});
}

// A person's Y1 -> Y2 walk is a straight line between the two endpoints.
function buildBlendPath(x1, z1, x2, z2) {
	const waypoints = [
		{ x: x1, z: z1 },
		{ x: x2, z: z2 }
	];
	return { waypoints, fractions: [0, 1] };
}

// evaluates a person's blend path at progress t (0..1, same as
// person.__positionBlend), finding the segment t falls in and lerping within it.
function evaluateBlendPath({ waypoints, fractions }, t) {
	for (let i = 0; i < fractions.length - 1; i++) {
		if (t <= fractions[i + 1] || i === fractions.length - 2) {
			const segStart = fractions[i];
			const segEnd = fractions[i + 1];
			const u = segEnd > segStart ? (t - segStart) / (segEnd - segStart) : 0;
			const a = waypoints[i];
			const b = waypoints[i + 1];
			return { x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u };
		}
	}
	const last = waypoints[waypoints.length - 1];
	return { x: last.x, z: last.z };
}

/**
 * seeds every respondent's simulation state (position, blend path, gait
 * variation, wander/idle state machine) from their Y1/Y2 layouts.
 */
export function initializeCrowdState(
	respondents,
	y1Layout,
	y2Layout,
	initialBlend = 0,
	{ heightScaleFor } = {}
) {
	respondents.forEach((person, i) => {
		// the fixed Y1/Y2 layout endpoints; __x/__z (below) is wherever
		// between them the room is currently showing (see __positionBlend).
		person.__xY1 = y1Layout[i].x;
		person.__zY1 = y1Layout[i].z;
		person.__xY2 = y2Layout[i].x;
		person.__zY2 = y2Layout[i].z;
		// the straight-line route between those two endpoints.
		person.__blendPath = buildBlendPath(
			person.__xY1,
			person.__zY1,
			person.__xY2,
			person.__zY2
		);
		// this person's own progress (0 = Y1, 1 = Y2) along __blendPath, eased
		// toward the shared target independently per-person (see the animator's
		// update()) at a pace derived from THEIR OWN distance below.
		person.__positionBlend = initialBlend;
		const startPos = evaluateBlendPath(person.__blendPath, initialBlend);
		person.__x = startPos.x;
		person.__z = startPos.z;
		person.__blendPathDistance = Math.hypot(
			person.__xY2 - person.__xY1,
			person.__zY2 - person.__zY1
		);
		// tracks the current timed Y1<->Y2 move, if any (see update()'s own
		// distance-covered ramp).
		person.__blendMoveActive = false;
		person.__blendMoveStartBlend = initialBlend;
		person.__blendMoveStartTime = 0;
		person.__blendMoveTarget = initialBlend;
		person.__offsetX = 0;
		person.__offsetZ = 0;
		// independent height/weight variation, so the crowd isn't a field of
		// identical clones.
		person.__heightScale = heightScaleFor
			? heightScaleFor(person)
			: 1 + Math.random() * 0.1;
		person.__widthScale = 0.7 + Math.random() * 0.6;
		// which way this person is facing (radians); turned smoothly
		// toward their actual movement each frame (see the animator's
		// update()). starts random.
		person.__facingYaw = Math.random() * Math.PI * 2;
		// 0..1, how "in motion" this person is — eases leg/arm swing
		// in/out as they start/stop moving.
		person.__walkAmount = 0;
		// this person's own smoothed ground speed (world units/sec), so
		// their walk clip's playback rate tracks it instead of a flat 1x.
		person.__walkSpeed = 0;
		// ambient wandering is an idle <-> shuffle state machine (see
		// updateWander below): mostly stands still, occasionally shuffles
		// to a nearby resting spot. staggered randomly so the room doesn't move in lockstep.
		person.__wanderRadius = 0 + Math.random() * 0.5;
		person.__wanderX = 0;
		person.__wanderZ = 0;
		person.__moving = false;
		person.__moveFromX = 0;
		person.__moveFromZ = 0;
		person.__moveToX = 0;
		person.__moveToZ = 0;
		person.__moveStart = 0;
		person.__moveDuration = 1;
		// long, widely-staggered idle stretches so most of the crowd is
		// standing still at any given moment — occasional shuffles (see
		// updateWander) are the exception, not a constant fidget.
		person.__nextMoveTime = 2 + Math.random() * 20;
		// 0..1 progress through the current shuffle (0 when idle).
		person.__moveT = 0;
		// A random 0..1 fraction of the walk clip's duration, so each
		// mixer starts at a different point instead of stepping in unison.
		person.__animOffsetFraction = Math.random();
		// A random phase seed for the idle breathing wobble, so the crowd doesn't breathe in unison.
		person.__breathPhase = Math.random() * Math.PI * 2;
		// about 1 in 10 people stand with arms crossed while idle (the
		// body GLB's own ArmsCrossed clip); everyone else gets the
		// regular Idle clip (see crowd.js's spawnCrowd).
		person.__armsCrossed = Math.random() < 0.1;
		// this frame's voluntary (rest-position-only) movement direction
		// — set each frame in Pass 1, read in Pass 2 to catch a wander
		// move that starts out behind current facing.
		person.__voluntaryMoveDx = 0;
		person.__voluntaryMoveDz = 0;
	});
}

/**
 * owns the crowd's own per-frame simulation: wander/idle shuffling,
 * walker- and person-vs-person collision, facing, walk-cycle blending, LOD
 * (color/outline/animation-freeze by distance), and writing each person's
 * final transform plus their blob shadow and minimap dot.
 */
export function createCrowdAnimator({
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
	flatRotation,
	minimapX,
	minimapZ,
	getRenderWalkX,
	getRenderWalkZ,
	getTargetPositionBlend,
	positionTransitionSpeed,
	blendTurnTime,
	blendTurnGateAngle,
	blendMoveEaseSeconds,
	getClickedPersonIndex,
	getHoveredPersonIndex,
	lodColorBands,
	offsetReturnTime,
	facingTurnTime,
	walkAmountSmoothTime,
	walkSpeedSmoothTime,
	personCellSize,
	collisionRadius,
	pushStrength,
	personCollisionRadius,
	personPushStrength,
	maxOffset,
	faceCameraRadius,
	moveFacingEpsilonSq,
	renderCullDistance,
	walkerScaleCorrection,
	breathingSpeed,
	breathingAmplitude,
	breathCyclesPerStride,
	walkBreathAmplitudeScale,
	stepBackHoldFraction,
	minWalkTimescale,
	maxWalkTimescale,
	walkAnimSpeed,
	selectedPersonBrightness,
	hoveredPersonBrightness,
	lodFreezeDistance
}) {
	// rebuilt every frame: "cx,cz" -> array of respondent indices in that
	// cell. reused via .clear() to avoid allocating a new Map per frame.
	const personGrid = new Map();

	// advances one person's idle/shuffle state machine and returns their
	// current (wanderX, wanderZ) offset. facing is handled centrally in update().
	function updateWander(person, elapsedSeconds) {
		if (person.__moving) {
			const t = (elapsedSeconds - person.__moveStart) / person.__moveDuration;
			if (t >= 1) {
				person.__wanderX = person.__moveToX;
				person.__wanderZ = person.__moveToZ;
				person.__moving = false;
				person.__moveT = 0;
				// stand still for a while before the next shuffle, randomized so people don't step in sync.
				person.__nextMoveTime = elapsedSeconds + Math.random() * 20;
			} else {
				const eased = smoothstep(Math.max(0, t));
				person.__wanderX =
					person.__moveFromX + (person.__moveToX - person.__moveFromX) * eased;
				person.__wanderZ =
					person.__moveFromZ + (person.__moveToZ - person.__moveFromZ) * eased;
				person.__moveT = Math.max(0, Math.min(1, t));
			}
		} else if (elapsedSeconds >= person.__nextMoveTime) {
			// time to shuffle: pick a new resting spot within this
			// person's own small assigned area (a disk of radius
			// wanderRadius around their base position) and glide there
			// over a brief, randomized duration.
			const angle = Math.random() * Math.PI * 2;
			const radius = Math.random() * person.__wanderRadius;
			person.__moveFromX = person.__wanderX;
			person.__moveFromZ = person.__wanderZ;
			person.__moveToX = Math.cos(angle) * radius;
			person.__moveToZ = Math.sin(angle) * radius;
			person.__moveStart = elapsedSeconds;
			person.__moveDuration = 0.7 + Math.random() * 0.8;
			person.__moving = true;
		}
		return [person.__wanderX, person.__wanderZ];
	}

	function update(dt, elapsedSeconds) {
		const renderWalkX = getRenderWalkX();
		const renderWalkZ = getRenderWalkZ();
		const targetPositionBlend = getTargetPositionBlend();
		const clickedPersonIndex = getClickedPersonIndex();
		const hoveredPersonIndex = getHoveredPersonIndex();

		const decay = Math.exp(-dt / offsetReturnTime);
		const facingFactor = 1 - Math.exp(-dt / facingTurnTime);
		const walkAmountFactor = 1 - Math.exp(-dt / walkAmountSmoothTime);
		const walkSpeedFactor = 1 - Math.exp(-dt / walkSpeedSmoothTime);

		// pass 1: advance decay + wander for everyone, and bucket each
		// pre-repulsion position into a spatial grid so pass 2 only
		// checks nearby cells instead of scanning everyone.
		personGrid.clear();
		for (let i = 0; i < respondents.length; i++) {
			const person = respondents[i];
			// A pending Y1<->Y2 move: turn to face the new travel direction at
			// blendTurnTime (much faster than facingTurnTime's ordinary wander turn) and
			// hold position until that turn has mostly landed.
			const blendDelta = targetPositionBlend - person.__positionBlend;
			const hasPendingBlendMove = Math.abs(blendDelta) > POSITION_BLEND_EPSILON;
			if (hasPendingBlendMove) {
				// the fixed Y1<->Y2 route's own direction, flipped depending on which way
				// this person is currently headed (blendDelta's sign).
				const forward = blendDelta > 0;
				const pathDx = person.__xY2 - person.__xY1;
				const pathDz = person.__zY2 - person.__zY1;
				const travelYaw = directionToYaw(
					forward ? pathDx : -pathDx,
					forward ? pathDz : -pathDz
				);
				const blendTurnFactor = 1 - Math.exp(-dt / blendTurnTime);
				person.__facingYaw +=
					shortestAngleDelta(person.__facingYaw, travelYaw) * blendTurnFactor;
				const isTurnedToward =
					Math.abs(shortestAngleDelta(person.__facingYaw, travelYaw)) <
					blendTurnGateAngle;
				if (isTurnedToward) {
					const targetBlend = forward ? 1 : 0;
					// (Re)start the timed move the first frame it's turned enough to walk, or if
					// the shared target flipped mid-walk (a rapid wave toggle).
					if (!person.__blendMoveActive || person.__blendMoveTarget !== targetBlend) {
						person.__blendMoveActive = true;
						person.__blendMoveStartBlend = person.__positionBlend;
						person.__blendMoveStartTime = elapsedSeconds;
						person.__blendMoveTarget = targetBlend;
					}
					const elapsedMove = elapsedSeconds - person.__blendMoveStartTime;
					const rampSeconds = Math.max(blendMoveEaseSeconds, 1e-6);
					// distance covered so far along this move: a linear
					// speed ramp 0 -> positionTransitionSpeed over
					// [0, rampSeconds] (integrates to a quadratic in t),
					// then constant positionTransitionSpeed after.
					const distanceCovered =
						elapsedMove < rampSeconds
							? (positionTransitionSpeed * elapsedMove * elapsedMove) /
								(2 * rampSeconds)
							: (positionTransitionSpeed * rampSeconds) / 2 +
								positionTransitionSpeed * (elapsedMove - rampSeconds);
					const progress =
						person.__blendPathDistance > 0
							? Math.min(1, distanceCovered / person.__blendPathDistance)
							: 1;
					// progress is already clamped to 1 above, so this lands exactly on the
					// target once distanceCovered catches up to blendPathDistance.
					person.__positionBlend =
						person.__blendMoveStartBlend +
						(person.__blendMoveTarget - person.__blendMoveStartBlend) * progress;
				}
			} else {
				person.__blendMoveActive = false;
			}
			// where this person's "resting" spot is right now, along
			// their Y1 -> Y2 route (see buildBlendPath) — this is what
			// makes the crowd walk across the room when toggled.
			const { x: blendedX, z: blendedZ } = evaluateBlendPath(
				person.__blendPath,
				person.__positionBlend
			);
			// this frame's pre-update resting spot (blend + wander, not
			// the collision nudge below), so we can tell how far/which way they actually moved.
			const prevRestX = person.__x + person.__wanderX;
			const prevRestZ = person.__z + person.__wanderZ;
			person.__x = blendedX;
			person.__z = blendedZ;
			person.__offsetX *= decay;
			person.__offsetZ *= decay;
			updateWander(person, elapsedSeconds); // updates person.__wanderX/__wanderZ

			// face wherever the combined movement is actually taking them, turning
			// smoothly and only while moving (so standing still keeps facing the last
			// walked direction).
			const moveDx = person.__x + person.__wanderX - prevRestX;
			const moveDz = person.__z + person.__wanderZ - prevRestZ;
			const isMoving = moveDx * moveDx + moveDz * moveDz > moveFacingEpsilonSq;
			if (isMoving && !hasPendingBlendMove) {
				const desiredYaw = directionToYaw(moveDx, moveDz);
				person.__facingYaw +=
					shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
			}
			// voluntary movement only (not the collision-push offset, applied separately
			// below).
			person.__voluntaryMoveDx = moveDx;
			person.__voluntaryMoveDz = moveDz;
			person.__walkAmount += ((isMoving ? 1 : 0) - person.__walkAmount) * walkAmountFactor;
			// how fast they're actually covering ground, smoothed the
			// same way as elsewhere — keeps the walk clip's rate in sync with real ground speed.
			const currentSpeed = dt > 0 ? Math.hypot(moveDx, moveDz) / dt : 0;
			person.__walkSpeed += (currentSpeed - person.__walkSpeed) * walkSpeedFactor;

			const x = person.__x + person.__wanderX + person.__offsetX;
			const z = person.__z + person.__wanderZ + person.__offsetZ;
			const key = `${Math.floor(x / personCellSize)},${Math.floor(z / personCellSize)}`;
			let bucket = personGrid.get(key);
			if (!bucket) personGrid.set(key, (bucket = []));
			bucket.push(i);
		}

		// pass 2: walker-collision, then person-vs-person repulsion
		// against grid neighbors, then write the final transforms.
		for (let i = 0; i < respondents.length; i++) {
			const person = respondents[i];
			const wanderX = person.__wanderX;
			const wanderZ = person.__wanderZ;

			const currentX = person.__x + wanderX + person.__offsetX;
			const currentZ = person.__z + wanderZ + person.__offsetZ;
			const dx = currentX - renderWalkX;
			const dz = currentZ - renderWalkZ;
			const dist = Math.hypot(dx, dz);

			if (dist > 0 && dist < collisionRadius) {
				const push = ((collisionRadius - dist) / collisionRadius) * pushStrength * dt;
				person.__offsetX += (dx / dist) * push;
				person.__offsetZ += (dz / dist) * push;
			}

			const cx = Math.floor(currentX / personCellSize);
			const cz = Math.floor(currentZ / personCellSize);
			for (let gx = -1; gx <= 1; gx++) {
				for (let gz = -1; gz <= 1; gz++) {
					const bucket = personGrid.get(`${cx + gx},${cz + gz}`);
					if (!bucket) continue;
					for (const j of bucket) {
						if (j === i) continue;
						const other = respondents[j];
						const ox = other.__x + other.__wanderX + other.__offsetX;
						const oz = other.__z + other.__wanderZ + other.__offsetZ;
						const pdx = currentX - ox;
						const pdz = currentZ - oz;
						const pdist = Math.hypot(pdx, pdz);
						if (pdist > 0 && pdist < personCollisionRadius) {
							const push =
								((personCollisionRadius - pdist) / personCollisionRadius) *
								personPushStrength *
								dt;
							person.__offsetX += (pdx / pdist) * push;
							person.__offsetZ += (pdz / pdist) * push;
						}
					}
				}
			}

			const offsetLength = Math.hypot(person.__offsetX, person.__offsetZ);
			if (offsetLength > maxOffset) {
				const scale = maxOffset / offsetLength;
				person.__offsetX *= scale;
				person.__offsetZ *= scale;
			}

			const finalZ = person.__z + wanderZ + person.__offsetZ;
			const finalX = person.__x + wanderX + person.__offsetX;

			// their own voluntary movement this frame, from pass 1
			const isActivelyMoving =
				person.__voluntaryMoveDx * person.__voluntaryMoveDx +
					person.__voluntaryMoveDz * person.__voluntaryMoveDz >
				moveFacingEpsilonSq;

			// within faceCameraRadius, override the movement-based facing and turn to
			// look at the walker instead.
			const toWalkerX = renderWalkX - finalX;
			const toWalkerZ = renderWalkZ - finalZ;
			const distToWalkerSq = toWalkerX * toWalkerX + toWalkerZ * toWalkerZ;

			if (
				!isActivelyMoving &&
				distToWalkerSq < faceCameraRadius * faceCameraRadius &&
				distToWalkerSq > moveFacingEpsilonSq
			) {
				const desiredYaw = directionToYaw(toWalkerX, toWalkerZ);

				person.__facingYaw +=
					shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
			}
			const yaw = person.__facingYaw;
			const heightScale = person.__heightScale;
			const widthScale = person.__widthScale;
			// being shoved by the walker or another person just slides someone aside
			// with no special animation handling at all (cheaper, and it isn't their own
			// motion to react to).
			const isVoluntaryBackward =
				isActivelyMoving &&
				person.__voluntaryMoveDx * Math.sin(yaw) +
					person.__voluntaryMoveDz * Math.cos(yaw) <
					0;

			// LOD: this person's own body/shape is always what's rendered (root stays
			// visible).
			const distToWalker = Math.sqrt(distToWalkerSq);
			const band = pickLodBand(distToWalker, lodColorBands);
			const isFrozen =
				distToWalker > lodFreezeDistance &&
				!isActivelyMoving &&
				!person.__blendMoveActive &&
				person.__walkAmount <= 0.01;

			const bodyMaterial = personBodyMaterials[i];
			const skinMaterial = personSkinMaterials[i];
			const brightness =
				i === clickedPersonIndex
					? selectedPersonBrightness
					: i === hoveredPersonIndex
						? hoveredPersonBrightness
						: band.brightness;
			bodyMaterial.color.copy(personBaseColors[i]).multiplyScalar(brightness);
			bodyMaterial.userData.outlineParameters.thickness = band.outlineThickness;
			skinMaterial.userData.outlineParameters.thickness = band.outlineThickness;

			// advance this person's walk clip, cross-faded against the (also looping)
			// Idle/ArmsCrossed rest action by how much they're moving.
			const mixer = personMixers[i];
			const walkAction = personWalkActions[i];
			// also read by the breathing block below (breathSpeedFactor) so a person
			// striding faster breathes with more amplitude, not just a faster-cycling
			// phase.
			const speedScale = Math.min(
				maxWalkTimescale,
				Math.max(minWalkTimescale, person.__walkSpeed / walkAnimSpeed)
			);
			if (mixer && !isFrozen) {
				const restAction = personRestActions[i];
				if (isVoluntaryBackward) {
					// their own next wander step is behind where they're still facing: instead
					// of the Walk clip looping forward while they visibly move backward (a
					// moonwalk), hold at a fixed "one foot stepped back" point in the clip until
					// facing catches up.
					walkAction.paused = true;
					walkAction.time = walkAction.getClip().duration * stepBackHoldFraction;
					walkAction.weight = 1;
					restAction.weight = 0;
				} else {
					walkAction.paused = false;
					walkAction.timeScale = person.__walkAmount * speedScale;
					walkAction.weight = person.__walkAmount;
					restAction.weight = 1 - person.__walkAmount;
				}
				mixer.update(dt);
			}

			// position/orient/scale this person's whole clone at once.
			const root = personRoots[i];
			// beyond renderCullDistance they're fully faded into the fog
			// anyway (see Main's walkFog) — skipping the draw call
			// entirely for everyone out there is the actual perf win, not just the visual fade.
			root.visible = distToWalker <= renderCullDistance;
			const baseHeightScale = heightScale * walkerScaleCorrection;
			const baseWidthScale = widthScale * walkerScaleCorrection;
			const idlePhaseValue = Math.sin(
				elapsedSeconds * breathingSpeed + person.__breathPhase
			);
			let breath;
			if (mixer && !isFrozen && person.__walkAmount > 0.01) {
				const clipDuration = walkAction.getClip().duration;
				const cyclePhase =
					(walkAction.time / clipDuration) * Math.PI * 2 * breathCyclesPerStride;
				const walkPhaseValue = Math.sin(cyclePhase);
				// striding faster (higher speedScale, same value driving the walk clip's own
				// timeScale just above) breathes deeper, not just faster-cycling.
				const BREATH_SPEED_FACTOR_MIN = 0.7;
				const BREATH_SPEED_FACTOR_MAX = 1.6;
				const speedT =
					(speedScale - minWalkTimescale) / (maxWalkTimescale - minWalkTimescale);
				const breathSpeedFactor =
					BREATH_SPEED_FACTOR_MIN +
					speedT * (BREATH_SPEED_FACTOR_MAX - BREATH_SPEED_FACTOR_MIN);
				// walkBreathAmplitudeScale scales just this walking term, independent of
				// breathingAmplitude (which also sets the idle-standing breath above).
				breath =
					(idlePhaseValue * (1 - person.__walkAmount) +
						walkPhaseValue *
							person.__walkAmount *
							breathSpeedFactor *
							walkBreathAmplitudeScale) *
					breathingAmplitude;
			} else {
				breath = idlePhaseValue * breathingAmplitude;
			}
			root.position.set(finalX, 0, finalZ);
			root.rotation.y = yaw;
			root.scale.set(baseWidthScale, baseHeightScale * (1 + breath), baseWidthScale);

			// the blob shadow: a flat disc on the floor under the person,
			// sized with their width (footprint), not height. dropped once
			// frozen/far — scaled to nothing rather than left out of the instance count.
			placementHelper.quaternion.copy(flatRotation);
			placementHelper.position.set(finalX, 0.015, finalZ);
			placementHelper.scale.setScalar(isFrozen ? 0 : widthScale);
			placementHelper.updateMatrix();
			shadows.setMatrixAt(i, placementHelper.matrix);

			// this person's flat position for the 2D minimap (see Minimap.lifedeath.svelte's draw()).
			minimapX[i] = finalX;
			minimapZ[i] = finalZ;
		}

		shadows.instanceMatrix.needsUpdate = true;
	}

	return { update };
}
