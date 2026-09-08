import * as THREE from "three";

// the room shell: floors, ceiling, back wall, partition and side walls
const CONCRETE_COLOR = "#191022";

// the alley debris: brick chunks, planks and trash, as real geometry
const DEBRIS_KINDS = [
	{ name: "brick", color: "#0a0709" },
	{ name: "plank", color: "#1a1118" },
	{ name: "trash", color: "#0c070a" }
];

// builds every static surface of the room
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
		// the inner wall's opening: the door's own aperture, so the wall meets it
		doorWidth,
		doorHeight,
		zoneXs,
		ageMin,
		ageMax,
		ageToZ,
		// depth spans with no story beat, and the colour laid over them
		storyGapZRanges = [],
		storyGapFloorColor,
		// everything plaza-only goes in this group rather than on the scene
		exteriorGroup
	} = config;

	// stretched past the building, so the ground outside isn't a void
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

	// patches over the story's quiet stretches, laid just above the floor
	if (storyGapFloorColor && storyGapZRanges.length > 0) {
		// no polygonoffset, or the patch covers the floor grid
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

	// the plaza floor, its own mesh so it can be a lighter purple
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

	// debris scattered across the plaza
	const DEBRIS_COUNT_PER_KIND = 60;
	const debrisGeometries = {
		brick: new THREE.BoxGeometry(1, 1, 1),
		plank: new THREE.BoxGeometry(1, 1, 1),
		trash: new THREE.IcosahedronGeometry(1, 0)
	};
	// keeps debris from spawning right in front of a door
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
	// keeps debris out of each door's pool of light
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

	// a real 2x4 cross-section, so a plank has depth from any angle
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
			// most piles against the facade, some against the side walls
			const placementRoll = Math.random();
			const brickWallChance = kind.name === "plank" ? 0.8 : 0.55;
			const AGAINST_BRICK_WALL = placementRoll < brickWallChance;
			const AGAINST_SIDE_WALL =
				!AGAINST_BRICK_WALL && placementRoll < brickWallChance + 0.15;
			const wallSign = Math.random() < 0.5 ? -1 : 1;
			let x, y, z, tilt;
			if (kind.name === "plank" && AGAINST_BRICK_WALL) {
				// leaned against the facade, tilted out into the plaza
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
				// leaned against the wall base rather than lying flat
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
					// lying flat, so only the yaw varies
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

	// fine grit between the bigger pieces, so the ground isn't empty
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

	// a black backdrop at the plaza's far edge
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

	// a lit rectangle standing in for the doorway, so the light has a source
	const doorGlowMaterial = new THREE.MeshBasicMaterial({ color: "#fff4e0" });
	doorGlowMaterial.userData.outlineParameters = { visible: false };
	// reaches from the floor to partway up the wall
	const doorGlowTop = roomHeight * 0.44;
	const doorGlow = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth * 0.5, doorGlowTop),
		doorGlowMaterial
	);
	doorGlow.position.set(0, doorGlowTop / 2, -halfDepth + 0.05);
	scene.add(doorGlow);

	// an unfogged halo, so the light still reads from across the room
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
	// well clear of the glow, or the two shimmer against each other
	doorGlowBeacon.position.set(0, doorGlowTop / 2, -halfDepth + 1.2);
	scene.add(doorGlowBeacon);

	// floor grid: a line per year of age, and a thicker one per zone boundary
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

	// a thin quad, since line width is ignored by most gpus
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
	// a box extruded outward, so its inner face is the room's edge
	const backWall = new THREE.Mesh(
		new THREE.BoxGeometry(roomWidth, roomHeight, wallThickness),
		backWallMaterial
	);
	backWall.position.set(0, roomHeight / 2, -halfDepth - wallThickness / 2);
	backWall.castShadow = true;
	backWall.receiveShadow = true;
	scene.add(backWall);

	// the inner wall, with an opening cut to each door
	function innerWallSolidXRanges() {
		const halfGap = doorWidth / 2;
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
	// the wall runs past the room's height, so it reads as solid from below
	const innerWallHeight = roomHeight * 1.2;
	// concrete like the other interior walls, not brick like the facade
	const innerWallMaterial = new THREE.MeshToonMaterial({
		color: CONCRETE_COLOR,
		map: wallGradientMap,
		gradientMap: toonGradientMap,
		flatShading: true
	});
	innerWallMaterial.userData.outlineParameters = { visible: false };
	// collected for main's line-of-sight checks
	const innerWallMeshes = [];
	for (const [xStart, xEnd] of innerWallSolidXRanges()) {
		// boxed like the facade's panels, straddling the same depth
		const innerWall = new THREE.Mesh(
			new THREE.BoxGeometry(xEnd - xStart, innerWallHeight, facadeThickness),
			innerWallMaterial
		);
		innerWall.position.set((xStart + xEnd) / 2, innerWallHeight / 2, halfDepth);
		innerWall.castShadow = true;
		innerWall.receiveShadow = true;
		innerRoomGroup.add(innerWall);
		innerWallMeshes.push(innerWall);
	}

	// an opening only needs to clear its door, so a header closes the rest of
	// it. without these the wall is slotted open to the ceiling
	const headerHeight = innerWallHeight - doorHeight;
	for (const zoneX of zoneXs) {
		const header = new THREE.Mesh(
			new THREE.BoxGeometry(doorWidth, headerHeight, facadeThickness),
			innerWallMaterial
		);
		header.position.set(zoneX, doorHeight + headerHeight / 2, halfDepth);
		header.castShadow = true;
		header.receiveShadow = true;
		innerRoomGroup.add(header);
		innerWallMeshes.push(header);
	}

	// a box, like the back wall, so the walls have volume
	const sideWallGeometry = new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth);
	const sideWallMaterial = new THREE.MeshToonMaterial({
		color: CONCRETE_COLOR,
		map: wallGradientMap,
		gradientMap: toonGradientMap,
		flatShading: true
	});
	sideWallMaterial.userData.outlineParameters = { visible: false };

	// extruded outward, so the inner face is the room's edge
	const leftWall = new THREE.Mesh(sideWallGeometry, sideWallMaterial);
	leftWall.position.set(-halfWidth - wallThickness / 2, roomHeight / 2, 0);
	leftWall.castShadow = true;
	leftWall.receiveShadow = true;
	scene.add(leftWall);

	const rightWall = leftWall.clone();
	rightWall.position.x = halfWidth + wallThickness / 2;
	scene.add(rightWall);

	// the plaza's side walls: black and unlit, so it's dark on every side
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
