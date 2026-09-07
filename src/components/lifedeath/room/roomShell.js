import * as THREE from "three";

// the room shell: floor, exterior plaza floor + pebbles, ceiling, back wall,
// inner partition wall, side walls (interior + exterior).
const CONCRETE_COLOR = "#191022";

// A shared palette/geometry factory for the alley's ground/wall debris —
// broken brick chunks, planks/boards, and crumpled trash. real 3D pieces
// (not a texture), toon-shaded the same flat, non-gradient way as
// everything else in the scene (see floorMaterial/pebbleMaterial below).
const DEBRIS_KINDS = [
	{ name: "brick", color: "#0a0709" },
	{ name: "plank", color: "#1a1118" },
	{ name: "trash", color: "#0c070a" }
];

/**
 * builds every static structural surface of the room and adds it to the
 * scene (the inner wall goes into `innerRoomGroup` instead, same as the
 * crowd, since it's specific to "which zone this is").
 */
export function buildRoomShell(scene, innerRoomGroup, config) {
	const {
		toonGradientMap,
		wallGradientMap,
		roomWidth,
		roomHeight,
		roomDepth,
		halfWidth,
		halfDepth,
		outerWallHalfWidth,
		exteriorDepth,
		zoneWidth,
		wallThickness,
		facadeThickness,
		corridorWidth,
		zoneXs,
		ageMin,
		ageMax,
		ageToZ,
		// [zStart, zEnd] spans with no story beat, and the colour to lay
		// over the floor there
		storyGapZRanges = [],
		storyGapFloorColor,
		// the exterior-plaza-only meshes below (exteriorFloor, the plaza's own
		// debris/pebbles, its backdrop and side walls) go into this shared group
		// instead of straight onto `scene`.
		exteriorGroup
	} = config;

	// stretched past the building's depth to also cover the exterior plaza, so
	// the ground outside isn't a void.
	const floorMaterial = new THREE.MeshToonMaterial({
		color: "#060106",
		gradientMap: toonGradientMap,
		flatShading: true
	});
	floorMaterial.userData.outlineParameters = { visible: false };
	const floor = new THREE.Mesh(
		new THREE.PlaneGeometry(outerWallHalfWidth * 2, roomDepth),
		floorMaterial
	);
	floor.rotation.x = -Math.PI / 2; // lay the plane flat
	floor.receiveShadow = true;
	scene.add(floor);

	// patches of floor over the story's quiet stretches. laid just above
	// the floor rather than cut into it, so the floor itself stays one
	// plane; polygonOffset keeps them from z-fighting it at depth
	if (storyGapFloorColor && storyGapZRanges.length > 0) {
		// no polygonOffset: it pulled the patch in front of the floor grid,
		// which has to stay legible over these sections. plain height
		// ordering is enough — everything past the fog is invisible anyway,
		// and within that range the depth buffer separates 0.01 cleanly
		const gapFloorMaterial = new THREE.MeshToonMaterial({
			color: storyGapFloorColor,
			gradientMap: toonGradientMap,
			flatShading: true
		});
		gapFloorMaterial.userData.outlineParameters = { visible: false };
		for (const [zStart, zEnd] of storyGapZRanges) {
			const depth = Math.abs(zEnd - zStart);
			if (depth <= 0) continue;
			const patch = new THREE.Mesh(
				new THREE.PlaneGeometry(roomWidth, depth),
				gapFloorMaterial
			);
			patch.rotation.x = -Math.PI / 2;
			patch.position.set(0, 0.01, (zStart + zEnd) / 2);
			patch.receiveShadow = true;
			scene.add(patch);
		}
	}

	// the exterior plaza floor: a separate mesh/material from the interior above
	// (rather than one floor plane spanning both), so it can be its own
	// desaturated purple rather than the interior's near-black tone.
	const exteriorFloorMaterial = new THREE.MeshToonMaterial({
		color: "#22162b",
		gradientMap: toonGradientMap
	});
	exteriorFloorMaterial.userData.outlineParameters = { visible: false };
	const exteriorFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(outerWallHalfWidth * 2, exteriorDepth),
		exteriorFloorMaterial
	);
	exteriorFloor.rotation.x = -Math.PI / 2;
	exteriorFloor.position.z = halfDepth + exteriorDepth / 2;
	exteriorFloor.receiveShadow = true;
	exteriorGroup.add(exteriorFloor);

	// alley debris scattered across the plaza.
	const DEBRIS_COUNT_PER_KIND = 60;
	const debrisGeometries = {
		brick: new THREE.BoxGeometry(1, 1, 1),
		plank: new THREE.BoxGeometry(1, 1, 1),
		trash: new THREE.IcosahedronGeometry(1, 0)
	};
	// keeps brick-wall debris from spawning directly in front of a door
	// opening (zoneXs) — same "clear a gap around each door" idea as
	// facade.js's facadeSolidXRanges, just a simple rejection check here
	// rather than pre-computing solid ranges.
	const DOOR_CLEARANCE = corridorWidth / 2 + 0.4;
	function isNearDoor(x) {
		return zoneXs.some((zoneX) => Math.abs(x - zoneX) < DOOR_CLEARANCE);
	}
	function randomBrickWallX() {
		let x = -outerWallHalfWidth + Math.random() * outerWallHalfWidth * 2;
		for (let attempt = 0; attempt < 5 && isNearDoor(x); attempt++) {
			x = -outerWallHalfWidth + Math.random() * outerWallHalfWidth * 2;
		}
		return x;
	}
	// keeps debris out of each door's ground-glow pool
	const SPOTLIGHT_RADIUS = 3.3;
	function isInSpotlight(x, z) {
		return zoneXs.some((zoneX) => {
			const dx = x - zoneX;
			const dz = z - halfDepth;
			return dx * dx + dz * dz < SPOTLIGHT_RADIUS * SPOTLIGHT_RADIUS;
		});
	}
	function pickOutsideSpotlight(generateXZ) {
		let candidate = generateXZ();
		for (let attempt = 0; attempt < 6 && isInSpotlight(candidate[0], candidate[1]); attempt++) {
			candidate = generateXZ();
		}
		return candidate;
	}

	// A real 2x4's cross-section, not a thin flat lath — thickness is
	// most of the width (a true 2x4 is ~1.5"x3.5", ratio ~0.43), not the
	// sliver it was before, so a plank actually reads as having depth
	// from any angle instead of going invisible-thin edge-on.
	const PLANK_WIDTH = 0.16;
	const PLANK_THICKNESS = 0.075;

	const debrisPlacementHelper = new THREE.Object3D();
	for (const kind of DEBRIS_KINDS) {
		const material = new THREE.MeshToonMaterial({
			color: kind.color,
			gradientMap: toonGradientMap,
			flatShading: true
		});
		material.userData.outlineParameters = { visible: false };
		const instances = new THREE.InstancedMesh(
			debrisGeometries[kind.name],
			material,
			DEBRIS_COUNT_PER_KIND
		);
		instances.castShadow = true;
		instances.receiveShadow = true;
		for (let i = 0; i < DEBRIS_COUNT_PER_KIND; i++) {
			// most of each kind piles up against the brick facade (z near halfDepth)
			// now, with only a smaller share against the two exterior side walls and the
			// rest scattered loose.
			const placementRoll = Math.random();
			const brickWallChance = kind.name === "plank" ? 0.8 : 0.55;
			const AGAINST_BRICK_WALL = placementRoll < brickWallChance;
			const AGAINST_SIDE_WALL =
				!AGAINST_BRICK_WALL && placementRoll < brickWallChance + 0.15;
			const wallSign = Math.random() < 0.5 ? -1 : 1;
			let x, y, z, tilt;
			if (kind.name === "plank" && AGAINST_BRICK_WALL) {
				// leaned up against the brick wall's base, tilted forward
				// into the plaza (+z, the only direction there is to lean
				// — unlike the two side walls, there's no "other side").
				const length = 0.5 + Math.random() * 0.7;
				[x, z] = pickOutsideSpotlight(() => [randomBrickWallX(), halfDepth + 0.06]);
				tilt = (Math.random() * 20 + 12) * (Math.PI / 180);
				y = (Math.cos(tilt) * length) / 2;
				debrisPlacementHelper.position.set(x, y, z);
				debrisPlacementHelper.rotation.set(tilt, Math.random() * Math.PI * 0.2, 0);
				debrisPlacementHelper.scale.set(PLANK_WIDTH, length, PLANK_THICKNESS);
			} else if (AGAINST_BRICK_WALL) {
				[x, z] = pickOutsideSpotlight(() => [
					randomBrickWallX(),
					halfDepth + 0.1 + Math.random() * 0.25
				]);
				const size =
					kind.name === "brick"
						? 0.08 + Math.random() * 0.06
						: 0.05 + Math.random() * 0.08;
				debrisPlacementHelper.position.set(x, size * 0.5, z);
				debrisPlacementHelper.rotation.set(
					Math.random() * Math.PI * 0.3,
					Math.random() * Math.PI,
					Math.random() * Math.PI * 0.3
				);
				debrisPlacementHelper.scale.set(
					size * (0.8 + Math.random() * 0.6),
					size * (0.6 + Math.random() * 0.5),
					size * (0.8 + Math.random() * 0.6)
				);
			} else if (kind.name === "plank" && AGAINST_SIDE_WALL) {
				// leaned up against the wall base, tilted rather than flat.
				const length = 0.5 + Math.random() * 0.7;
				[x, z] = pickOutsideSpotlight(() => [
					wallSign * (halfWidth - 0.08 - Math.random() * 0.15),
					halfDepth + Math.random() * exteriorDepth
				]);
				tilt = (Math.random() * 20 + 12) * (Math.PI / 180);
				y = (Math.cos(tilt) * length) / 2;
				debrisPlacementHelper.position.set(x, y, z);
				debrisPlacementHelper.rotation.set(0, Math.random() * Math.PI, -wallSign * tilt);
				debrisPlacementHelper.scale.set(PLANK_THICKNESS, length, PLANK_WIDTH);
			} else if (AGAINST_SIDE_WALL) {
				[x, z] = pickOutsideSpotlight(() => [
					wallSign * (halfWidth - 0.15 - Math.random() * 0.35),
					halfDepth + Math.random() * exteriorDepth
				]);
				const size =
					kind.name === "brick"
						? 0.08 + Math.random() * 0.06
						: 0.05 + Math.random() * 0.08;
				debrisPlacementHelper.position.set(x, size * 0.5, z);
				debrisPlacementHelper.rotation.set(
					Math.random() * Math.PI * 0.3,
					Math.random() * Math.PI,
					Math.random() * Math.PI * 0.3
				);
				debrisPlacementHelper.scale.set(
					size * (0.8 + Math.random() * 0.6),
					size * (0.6 + Math.random() * 0.5),
					size * (0.8 + Math.random() * 0.6)
				);
			} else {
				[x, z] = pickOutsideSpotlight(() => [
					-outerWallHalfWidth + Math.random() * outerWallHalfWidth * 2,
					halfDepth + Math.random() * exteriorDepth
				]);
				if (kind.name === "plank") {
					// lying flat, not tumbled — only yaw (the rotation around the vertical axis)
					// varies.
					const length = 0.4 + Math.random() * 0.8;
					debrisPlacementHelper.position.set(x, PLANK_THICKNESS / 2, z);
					debrisPlacementHelper.rotation.set(0, Math.random() * Math.PI, 0);
					debrisPlacementHelper.scale.set(PLANK_WIDTH, PLANK_THICKNESS, length);
				} else {
					const size =
						kind.name === "brick"
							? 0.09 + Math.random() * 0.07
							: 0.04 + Math.random() * 0.07;
					debrisPlacementHelper.position.set(x, size * 0.4, z);
					debrisPlacementHelper.rotation.set(
						Math.random() * Math.PI,
						Math.random() * Math.PI,
						Math.random() * Math.PI
					);
					debrisPlacementHelper.scale.set(
						size * (0.7 + Math.random() * 0.6),
						size * (0.5 + Math.random() * 0.6),
						size * (0.7 + Math.random() * 0.6)
					);
				}
			}
			debrisPlacementHelper.updateMatrix();
			instances.setMatrixAt(i, debrisPlacementHelper.matrix);
		}
		instances.instanceMatrix.needsUpdate = true;
		exteriorGroup.add(instances);
	}

	// A fine scatter of small pebbles/grit on top of the chunkier debris
	// above — keeps the ground from reading as empty between the bigger
	// pieces, same low-detail-icosahedron trick as before.
	const PEBBLE_COUNT = 200;
	const PEBBLE_MIN_RADIUS = 0.01;
	const PEBBLE_MAX_RADIUS = 0.035;
	const pebbleMaterial = new THREE.MeshToonMaterial({
		color: "#250e31",
		gradientMap: toonGradientMap,
		flatShading: true
	});
	pebbleMaterial.userData.outlineParameters = { visible: false };
	const pebbleInstances = new THREE.InstancedMesh(
		new THREE.IcosahedronGeometry(1, 0),
		pebbleMaterial,
		PEBBLE_COUNT
	);
	pebbleInstances.castShadow = false;
	pebbleInstances.receiveShadow = true;
	for (let i = 0; i < PEBBLE_COUNT; i++) {
		const radius =
			PEBBLE_MIN_RADIUS + Math.random() * (PEBBLE_MAX_RADIUS - PEBBLE_MIN_RADIUS);
		debrisPlacementHelper.position.set(
			-outerWallHalfWidth + Math.random() * outerWallHalfWidth * 2,
			radius * 0.4,
			halfDepth + Math.random() * exteriorDepth
		);
		debrisPlacementHelper.rotation.set(
			Math.random() * Math.PI,
			Math.random() * Math.PI,
			Math.random() * Math.PI
		);
		debrisPlacementHelper.scale.set(
			radius * (0.7 + Math.random() * 0.6),
			radius * (0.5 + Math.random() * 0.5),
			radius * (0.7 + Math.random() * 0.6)
		);
		debrisPlacementHelper.updateMatrix();
		pebbleInstances.setMatrixAt(i, debrisPlacementHelper.matrix);
	}
	pebbleInstances.instanceMatrix.needsUpdate = true;
	exteriorGroup.add(pebbleInstances);

	// A solid black backdrop right at the plaza's far edge (where exteriorFloor
	// ends, halfDepth + exteriorDepth).
	const exteriorBackdropMaterial = new THREE.MeshBasicMaterial({
		color: 0x000000,
		side: THREE.DoubleSide
	});
	exteriorBackdropMaterial.userData.outlineParameters = { visible: false };
	const exteriorBackdrop = new THREE.Mesh(
		new THREE.PlaneGeometry(outerWallHalfWidth * 2, roomHeight * 4),
		exteriorBackdropMaterial
	);
	exteriorBackdrop.position.set(0, roomHeight, halfDepth + exteriorDepth);
	exteriorGroup.add(exteriorBackdrop);

	const ceilingMaterial = new THREE.MeshToonMaterial({
		color: 0x000000,
		gradientMap: toonGradientMap,
		flatShading: true
	});
	ceilingMaterial.userData.outlineParameters = { visible: false };
	const ceiling = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth, roomDepth),
		ceilingMaterial
	);
	ceiling.rotation.x = Math.PI / 2;
	ceiling.position.y = roomHeight;
	scene.add(ceiling);

	// A self-illuminated bright rectangle standing in for the doorway
	// opening, so the light source has a visible origin.
	const doorGlowMaterial = new THREE.MeshBasicMaterial({ color: "#fff4e0" });
	doorGlowMaterial.userData.outlineParameters = { visible: false };
	// top edge unchanged; the bottom now reaches the floor
	const doorGlowTop = roomHeight * 0.44;
	const doorGlow = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth * 0.5, doorGlowTop),
		doorGlowMaterial
	);
	doorGlow.position.set(0, doorGlowTop / 2, -halfDepth + 0.05);
	scene.add(doorGlow);

	// faint unfogged halo, so the light still reads from across the room —
	// fog swallows the plane above well before then. soft-edged on purpose:
	// a hard-edged rectangle that small crawls as the walker moves
	const beaconCanvas = document.createElement("canvas");
	beaconCanvas.width = 128;
	beaconCanvas.height = 128;
	const beaconCtx = beaconCanvas.getContext("2d");
	const beaconGradient = beaconCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
	beaconGradient.addColorStop(0, "rgba(255, 244, 224, 1)");
	beaconGradient.addColorStop(0.45, "rgba(255, 244, 224, 0.55)");
	beaconGradient.addColorStop(1, "rgba(255, 244, 224, 0)");
	beaconCtx.fillStyle = beaconGradient;
	beaconCtx.fillRect(0, 0, 128, 128);
	const beaconTexture = new THREE.CanvasTexture(beaconCanvas);
	beaconTexture.colorSpace = THREE.SRGBColorSpace;
	const doorGlowBeaconMaterial = new THREE.MeshBasicMaterial({
		map: beaconTexture,
		transparent: true,
		opacity: 0.5,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		fog: false
	});
	doorGlowBeaconMaterial.userData.outlineParameters = { visible: false };
	const doorGlowBeacon = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth * 0.8, doorGlowTop * 1.6),
		doorGlowBeaconMaterial
	);
	// stands well clear of the glow: seen from across the room the depth
	// buffer can't separate near-coplanar planes, and the two shimmer
	doorGlowBeacon.position.set(0, doorGlowTop / 2, -halfDepth + 1.2);
	scene.add(doorGlowBeacon);

	// floor grid: a thin line at every whole-year age (so the depth axis
	// actually reads as "age"), plus a noticeably thicker line at each of
	// the two boundaries between the No/Unsure/Yes zones — lines that mean
	// something specific in this room rather than a generic decorative grid.
	const AGE_LINE_COLOR = "#361433";
	const ZONE_LINE_COLOR = "#361433";
	const ZONE_LINE_THICKNESS = 0.07;

	const ageLinePositions = [];
	for (let age = Math.ceil(ageMin); age <= Math.floor(ageMax); age++) {
		const z = ageToZ(age);
		ageLinePositions.push(-halfWidth, 0, z, halfWidth, 0, z);
	}
	const ageLineGeometry = new THREE.BufferGeometry();
	ageLineGeometry.setAttribute(
		"position",
		new THREE.Float32BufferAttribute(ageLinePositions, 3)
	);
	const ageLines = new THREE.LineSegments(
		ageLineGeometry,
		new THREE.LineBasicMaterial({ color: AGE_LINE_COLOR })
	);
	ageLines.position.y = 0.02; // clears the floor, and the story-gap patches over it
	scene.add(ageLines);

	// A plain LineBasicMaterial's linewidth is ignored by most
	// browsers/GPUs (a long-standing WebGL limitation) — a thin
	// floor-level quad is the only reliable way to get a line that
	// actually reads as thicker than the age lines above.
	const zoneLineMaterial = new THREE.MeshBasicMaterial({
		color: ZONE_LINE_COLOR
	});
	zoneLineMaterial.userData.outlineParameters = { visible: false };
	for (const x of [-zoneWidth / 2, zoneWidth / 2]) {
		const zoneLine = new THREE.Mesh(
			new THREE.PlaneGeometry(ZONE_LINE_THICKNESS, roomDepth),
			zoneLineMaterial
		);
		zoneLine.rotation.x = -Math.PI / 2;
		zoneLine.position.set(x, 0.025, 0);
		scene.add(zoneLine);
	}

	const backWallMaterial = new THREE.MeshToonMaterial({
		color: CONCRETE_COLOR,
		map: wallGradientMap,
		gradientMap: toonGradientMap,
		flatShading: true
	});
	backWallMaterial.userData.outlineParameters = { visible: false };
	// A real box, not a flat plane — extruded outward (away from the
	// room) by wallThickness so its inner face lands exactly where the
	// old flat plane sat, without eating into the room or any of the
	// collision bounds.
	const backWall = new THREE.Mesh(
		new THREE.BoxGeometry(roomWidth, roomHeight, wallThickness),
		backWallMaterial
	);
	backWall.position.set(0, roomHeight / 2, -halfDepth - wallThickness / 2);
	backWall.castShadow = true;
	backWall.receiveShadow = true;
	scene.add(backWall);

	// the inner wall: at z = halfDepth, plain openings (no doors, the outer ones
	// already gate entry) sized to corridorWidth.
	function innerWallSolidXRanges() {
		const halfGap = corridorWidth / 2;
		const ranges = [];
		let x = -halfWidth;
		for (const zoneX of zoneXs) {
			const gapStart = zoneX - halfGap;
			if (gapStart > x) ranges.push([x, gapStart]);
			x = zoneX + halfGap;
		}
		if (x < halfWidth) ranges.push([x, halfWidth]);
		return ranges;
	}
	// concrete, not brick — this one isn't the outside/door wall, just
	// another interior partition, so it matches the back/side walls'
	// material instead of the facade's.
	const innerWallMaterial = new THREE.MeshToonMaterial({
		color: CONCRETE_COLOR,
		map: wallGradientMap,
		gradientMap: toonGradientMap,
		flatShading: true
	});
	innerWallMaterial.userData.outlineParameters = { visible: false };
	// collected for handlePersonClick's line-of-sight check in Main — a
	// person raycast hit shouldn't count if a wall was actually closer to
	// the camera along that same ray.
	const innerWallMeshes = [];
	for (const [xStart, xEnd] of innerWallSolidXRanges()) {
		// boxed like the facade's own panels — straddles halfDepth the
		// same way, consistent with FACADE_CLEARANCE (already sized
		// around a facadeThickness-deep wall here).
		const innerWall = new THREE.Mesh(
			new THREE.BoxGeometry(xEnd - xStart, roomHeight * 1.2, facadeThickness),
			innerWallMaterial
		);
		innerWall.position.set((xStart + xEnd) / 2, (roomHeight * 1.2) / 2, halfDepth);
		innerWall.castShadow = true;
		innerWall.receiveShadow = true;
		innerRoomGroup.add(innerWall);
		innerWallMeshes.push(innerWall);
	}

	// A real box (not a flat plane) for the same "these walls have volume"
	// reason as the back wall.
	const sideWallGeometry = new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth);
	const sideWallMaterial = new THREE.MeshToonMaterial({
		color: CONCRETE_COLOR,
		map: wallGradientMap,
		gradientMap: toonGradientMap,
		flatShading: true
	});
	sideWallMaterial.userData.outlineParameters = { visible: false };

	// extruded outward from halfWidth (away from the room) by
	// wallThickness, so the inner face lands exactly where the old flat
	// plane sat.
	const leftWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
	leftWall.position.set(-halfWidth - wallThickness / 2, roomHeight / 2, 0);
	leftWall.castShadow = true;
	leftWall.receiveShadow = true;
	scene.add(leftWall);

	const rightWall = leftWall.clone();
	rightWall.position.x = halfWidth + wallThickness / 2;
	scene.add(rightWall);

	// the exterior plaza's own side walls — pure black and unlit, so the
	// plaza reads as dark on every side, not just the brick facade you're facing.
	const exteriorSideWallGeometry = new THREE.BoxGeometry(
		wallThickness,
		roomHeight,
		exteriorDepth
	);
	const exteriorSideWallMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	exteriorSideWallMaterial.userData.outlineParameters = { visible: false };
	const leftExteriorWall = new THREE.Mesh(
		exteriorSideWallGeometry,
		exteriorSideWallMaterial
	);
	leftExteriorWall.position.set(
		-halfWidth - wallThickness / 2,
		roomHeight / 2,
		halfDepth + exteriorDepth / 2
	);
	exteriorGroup.add(leftExteriorWall);

	const rightExteriorWall = leftExteriorWall.clone();
	rightExteriorWall.position.x = halfWidth + wallThickness / 2;
	exteriorGroup.add(rightExteriorWall);

	return { backWall, leftWall, rightWall, innerWallMeshes };
}
