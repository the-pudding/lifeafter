import { smoothstep, shortestAngleDelta, pickLodBand, directionToYaw } from "../room/roomMath.js";

// below this, a person has caught up with the shared wave target
const POSITION_BLEND_EPSILON = 1e-4;

// a collision-free layout for one wave, by rejection sampling
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
		// cells are spacing-sized, so only neighbours can be too close
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

	// placed across the full zone width, less a small wall margin
	const WALL_MARGIN = 1.5;
	const HALF_ZONE = zoneWidth / 2;

	// the zone is -1, 0 or 1; the margin shrinks on each retry
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
			// widens on each retry, so dense age bands still find room
			const widen = 1 + attempt / MAX_ATTEMPTS;
			const [min, max] = zoneBounds(zone, WALL_MARGIN / widen);
			x = min + Math.random() * (max - min);
			// clamped, so jitter can't push the front band into the facade
			z = Math.min(
				halfDepth - WALL_MARGIN,
				baseZ + (Math.random() - 0.5) * (roomDepth / 40) * widen
			);
			if (farEnoughFromEveryoneElse(x, z)) break;
		}
		// if every attempt failed, keep the last candidate anyway

		const key = cellKeyFor(x, z);
		if (!occupiedCells.has(key)) occupiedCells.set(key, []);
		occupiedCells.get(key).push({ x, z });

		return { x, z };
	});
}

// a person's walk between waves is a straight line between endpoints
function buildBlendPath(x1, z1, x2, z2) {
	const waypoints = [
		{ x: x1, z: z1 },
		{ x: x2, z: z2 }
	];
	return { waypoints, fractions: [0, 1] };
}

// the point along a person's path at progress t
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

// seeds every respondent's simulation state from their two layouts
export function initializeCrowdState(
	respondents,
	y1Layout,
	y2Layout,
	initialBlend = 0,
	{ heightScaleFor } = {}
) {
	respondents.forEach((person, i) => {
		// the fixed endpoints; the live position sits somewhere between them
		person.__xY1 = y1Layout[i].x;
		person.__zY1 = y1Layout[i].z;
		person.__xY2 = y2Layout[i].x;
		person.__zY2 = y2Layout[i].z;
		// the route between those endpoints
		person.__blendPath = buildBlendPath(
			person.__xY1,
			person.__zY1,
			person.__xY2,
			person.__zY2
		);
		// their own progress along that route, eased at their own pace
		person.__positionBlend = initialBlend;
		const startPos = evaluateBlendPath(person.__blendPath, initialBlend);
		person.__x = startPos.x;
		person.__z = startPos.z;
		person.__blendPathDistance = Math.hypot(
			person.__xY2 - person.__xY1,
			person.__zY2 - person.__zY1
		);
		// tracks the current timed move between waves, if any
		person.__blendMoveActive = false;
		person.__blendMoveStartBlend = initialBlend;
		person.__blendMoveStartTime = 0;
		person.__blendMoveTarget = initialBlend;
		person.__offsetX = 0;
		person.__offsetZ = 0;
		// height and build variation, so the crowd isn't identical clones
		person.__heightScale = heightScaleFor
			? heightScaleFor(person)
			: 1 + Math.random() * 0.1;
		person.__widthScale = 0.7 + Math.random() * 0.6;
		// which way they face, turned smoothly toward their movement
		person.__facingYaw = Math.random() * Math.PI * 2;
		// how in motion they are, easing the limb swing in and out
		person.__walkAmount = 0;
		// their smoothed ground speed, which drives the clip's playback rate
		person.__walkSpeed = 0;
		// idle and shuffle: mostly standing, occasionally moving a step
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
		// long staggered idles, so most of the crowd is still at any moment
		person.__nextMoveTime = 2 + Math.random() * 20;
		// progress through the current shuffle, zero when idle
		person.__moveT = 0;
		// a random offset into the walk clip, so nobody steps in unison
		person.__animOffsetFraction = Math.random();
		// a random phase for the breathing wobble
		person.__breathPhase = Math.random() * Math.PI * 2;
		// about one in ten stands with arms crossed while idle
		person.__armsCrossed = Math.random() < 0.1;
		// this frame's own movement, set in the first pass and read in the second
		person.__voluntaryMoveDx = 0;
		person.__voluntaryMoveDz = 0;
	});
}

// the crowd's per-frame simulation: wander, collision, facing, gait and lod
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
	// a spatial grid of who's where, rebuilt each frame and reused
	const personGrid = new Map();

	// advances one person's idle and shuffle, returning their offset
	function updateWander(person, elapsedSeconds) {
		if (person.__moving) {
			const t = (elapsedSeconds - person.__moveStart) / person.__moveDuration;
			if (t >= 1) {
				person.__wanderX = person.__moveToX;
				person.__wanderZ = person.__moveToZ;
				person.__moving = false;
				person.__moveT = 0;
				// stands still a while before the next shuffle
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
			// picks a new resting spot nearby and glides there
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

		// first pass: wander everyone, and bucket them into the grid
		personGrid.clear();
		for (let i = 0; i < respondents.length; i++) {
			const person = respondents[i];
			// a pending wave move: turn to face it, and hold until the turn lands
			const blendDelta = targetPositionBlend - person.__positionBlend;
			const hasPendingBlendMove = Math.abs(blendDelta) > POSITION_BLEND_EPSILON;
			if (hasPendingBlendMove) {
				// the route's direction, flipped to whichever way they're headed
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
					// starts the timed move once they've turned enough to walk
					if (!person.__blendMoveActive || person.__blendMoveTarget !== targetBlend) {
						person.__blendMoveActive = true;
						person.__blendMoveStartBlend = person.__positionBlend;
						person.__blendMoveStartTime = elapsedSeconds;
						person.__blendMoveTarget = targetBlend;
					}
					const elapsedMove = elapsedSeconds - person.__blendMoveStartTime;
					const rampSeconds = Math.max(blendMoveEaseSeconds, 1e-6);
					// distance covered so far: a speed ramp, then a constant
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
					// lands exactly on the target once the distance catches up
					person.__positionBlend =
						person.__blendMoveStartBlend +
						(person.__blendMoveTarget - person.__blendMoveStartBlend) * progress;
				}
			} else {
				person.__blendMoveActive = false;
			}
			// their resting spot right now, somewhere along their route
			const { x: blendedX, z: blendedZ } = evaluateBlendPath(
				person.__blendPath,
				person.__positionBlend
			);
			// the spot before any collision nudge, so movement can be measured
			const prevRestX = person.__x + person.__wanderX;
			const prevRestZ = person.__z + person.__wanderZ;
			person.__x = blendedX;
			person.__z = blendedZ;
			person.__offsetX *= decay;
			person.__offsetZ *= decay;
			updateWander(person, elapsedSeconds); // updates person.__wanderX/__wanderZ

			// faces where they're actually moving, and only while moving
			const moveDx = person.__x + person.__wanderX - prevRestX;
			const moveDz = person.__z + person.__wanderZ - prevRestZ;
			const isMoving = moveDx * moveDx + moveDz * moveDz > moveFacingEpsilonSq;
			if (isMoving && !hasPendingBlendMove) {
				const desiredYaw = directionToYaw(moveDx, moveDz);
				person.__facingYaw +=
					shortestAngleDelta(person.__facingYaw, desiredYaw) * facingFactor;
			}
			// their own movement, without the collision push
			person.__voluntaryMoveDx = moveDx;
			person.__voluntaryMoveDz = moveDz;
			person.__walkAmount += ((isMoving ? 1 : 0) - person.__walkAmount) * walkAmountFactor;
			// their smoothed ground speed, which keeps the clip's rate in step
			const currentSpeed = dt > 0 ? Math.hypot(moveDx, moveDz) / dt : 0;
			person.__walkSpeed += (currentSpeed - person.__walkSpeed) * walkSpeedFactor;

			const x = person.__x + person.__wanderX + person.__offsetX;
			const z = person.__z + person.__wanderZ + person.__offsetZ;
			const key = `${Math.floor(x / personCellSize)},${Math.floor(z / personCellSize)}`;
			let bucket = personGrid.get(key);
			if (!bucket) personGrid.set(key, (bucket = []));
			bucket.push(i);
		}

		// second pass: collisions, then the final transforms
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

			// their own movement this frame, from the first pass
			const isActivelyMoving =
				person.__voluntaryMoveDx * person.__voluntaryMoveDx +
					person.__voluntaryMoveDz * person.__voluntaryMoveDz >
				moveFacingEpsilonSq;

			// close in, they turn to face the walker instead
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
			// being shoved just slides them; it isn't their own motion
			const isVoluntaryBackward =
				isActivelyMoving &&
				person.__voluntaryMoveDx * Math.sin(yaw) +
					person.__voluntaryMoveDz * Math.cos(yaw) <
					0;

			// lod dims and thins with distance; it never swaps the body
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

			// advances the walk clip, cross-faded against their idle by how much they move
			const mixer = personMixers[i];
			const walkAction = personWalkActions[i];
			// also read by the breathing below, so a faster stride breathes deeper
			const speedScale = Math.min(
				maxWalkTimescale,
				Math.max(minWalkTimescale, person.__walkSpeed / walkAnimSpeed)
			);
			if (mixer && !isFrozen) {
				const restAction = personRestActions[i];
				if (isVoluntaryBackward) {
					// moving behind their facing: hold a stepped-back pose rather than moonwalk
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

			// places, turns and scales the whole clone at once
			const root = personRoots[i];
			// past the cull distance they're lost in fog, so skip the draw entirely
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
				// a faster stride breathes deeper, not just quicker
				const BREATH_SPEED_FACTOR_MIN = 0.7;
				const BREATH_SPEED_FACTOR_MAX = 1.6;
				const speedT =
					(speedScale - minWalkTimescale) / (maxWalkTimescale - minWalkTimescale);
				const breathSpeedFactor =
					BREATH_SPEED_FACTOR_MIN +
					speedT * (BREATH_SPEED_FACTOR_MAX - BREATH_SPEED_FACTOR_MIN);
				// scales the walking breath alone, apart from the idle one
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

			// the shadow disc, sized to their footprint and scaled away when far
			placementHelper.quaternion.copy(flatRotation);
			placementHelper.position.set(finalX, 0.015, finalZ);
			placementHelper.scale.setScalar(isFrozen ? 0 : widthScale);
			placementHelper.updateMatrix();
			shadows.setMatrixAt(i, placementHelper.matrix);

			// their flat position, for the minimap
			minimapX[i] = finalX;
			minimapZ[i] = finalZ;
		}

		shadows.instanceMatrix.needsUpdate = true;
	}

	return { update };
}
