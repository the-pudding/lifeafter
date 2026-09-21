import * as THREE from "three";

// the room shell: floors, ceiling, back wall, partition and side walls
const CONCRETE_COLOR = "#1d1024";

// the alley debris: brick chunks, planks and trash, as real geometry
const DEBRIS_KINDS = [
	{ name: "brick", color: "#0b0810" },
	{ name: "plank", color: "#191223" },
	{ name: "trash", color: "#0c0913" }
];

// an alpha gradient: opaque up to solidUntil of the height, gone by the top
function createTopFadeAlphaMap(solidUntil) {
	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 128;
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
	gradient.addColorStop(0, "rgb(0, 0, 0)");
	gradient.addColorStop(1 - solidUntil, "rgb(255, 255, 255)");
	gradient.addColorStop(1, "rgb(255, 255, 255)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = THREE.ClampToEdgeWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;
	// mipmapping a one-pixel texture renders as a checkerboard
	texture.generateMipmaps = false;
	texture.minFilter = THREE.LinearFilter;
	texture.magFilter = THREE.LinearFilter;
	return texture;
}

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
		// the ages where a story beat begins; year lines are drawn only there
		beatLineAges = null,
		// everything plaza-only goes in this group rather than on the scene
		exteriorGroup
	} = config;

	// stretched past the building, so the ground outside isn't a void
	const floorMaterial = new THREE.MeshToonMaterial({
		color: "#070312",
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

	// the plaza floor, its own mesh so it can be a lighter purple
	const exteriorFloorMaterial = new THREE.MeshToonMaterial({
		color: "#282038",
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
		color: "#260f36",
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

	// the light at the end: a full-bright sheet dissolving upward
	const doorGlowMaterial = new THREE.MeshBasicMaterial({
		// kin to the sconces' pale purple, a touch pinker and brighter
		color: "#f9ddfc",
		transparent: true,
		alphaMap: createTopFadeAlphaMap(0.45)
	});
	doorGlowMaterial.userData.outlineParameters = { visible: false };
	const doorGlow = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth, roomHeight),
		doorGlowMaterial
	);
	doorGlow.position.set(0, roomHeight / 2, -halfDepth + 0.05);
	scene.add(doorGlow);

	// an unfogged halo, so the light still reads from across the room
	const beaconCanvas = document.createElement("canvas");
	beaconCanvas.width = 128;
	beaconCanvas.height = 128;
	const beaconCtx = beaconCanvas.getContext("2d");
	const beaconGradient = beaconCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
	// normal blending, so nudging into it stays this purple instead of
	// additively clamping to white
	beaconGradient.addColorStop(0, "rgba(249, 221, 252, 1)");
	beaconGradient.addColorStop(0.45, "rgba(249, 221, 252, 0.6)");
	beaconGradient.addColorStop(1, "rgba(249, 221, 252, 0)");
	beaconCtx.fillStyle = beaconGradient;
	beaconCtx.fillRect(0, 0, 128, 128);
	const beaconTexture = new THREE.CanvasTexture(beaconCanvas);
	beaconTexture.colorSpace = THREE.SRGBColorSpace;
	const doorGlowBeaconMaterial = new THREE.MeshBasicMaterial({
		map: beaconTexture,
		transparent: true,
		opacity: 0.85,
		depthWrite: false,
		fog: false
	});
	doorGlowBeaconMaterial.userData.outlineParameters = { visible: false };
	// oversized and unfogged, so the light reads from across the room
	const doorGlowBeacon = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth * 1.25, roomHeight * 1.5),
		doorGlowBeaconMaterial
	);
	// well clear of the glow, or the two shimmer against each other
	doorGlowBeacon.position.set(0, roomHeight * 0.45, -halfDepth + 1.2);
	scene.add(doorGlowBeacon);

	// floor grid: a line per year of age, and a thicker one per zone boundary
	const AGE_LINE_COLOR = "#211b2d";
	const ZONE_LINE_COLOR = "#211b2d";
	const ZONE_LINE_THICKNESS = 0.07;

	// year-line quads: a floor strip and wall risers at every age
	const AGE_LINE_FLOOR_THICKNESS = 0.035; // the floor strips, much finer
	const AGE_LINE_FLASH_COLOR = "#dfa9f2";
	const AGE_LINE_FLASH_SECONDS = 0.9;
	const everyYear = [];
	for (let age = Math.ceil(ageMin); age <= Math.floor(ageMax); age++) everyYear.push(age);
	const lineAges = [
		...new Set(beatLineAges?.length ? beatLineAges : everyYear)
	]
		.filter((age) => age >= ageMin && age <= ageMax)
		.sort((a, b) => a - b);
	const ageCount = lineAges.length;
	const ageLineMaterial = new THREE.MeshBasicMaterial({
		color: AGE_LINE_COLOR,
		side: THREE.DoubleSide
	});
	ageLineMaterial.userData.outlineParameters = { visible: false };
	const floorLines = new THREE.InstancedMesh(
		new THREE.PlaneGeometry(roomWidth, AGE_LINE_FLOOR_THICKNESS),
		ageLineMaterial,
		ageCount
	);
	const lineMatrix = new THREE.Matrix4();
	const flat = new THREE.Matrix4().makeRotationX(-Math.PI / 2);
	for (let i = 0; i < ageCount; i++) {
		const z = ageToZ(lineAges[i]);
		lineMatrix.copy(flat).setPosition(0, 0.02, z);
		floorLines.setMatrixAt(i, lineMatrix);
	}
	floorLines.instanceMatrix.needsUpdate = true;
	// instance bounds confuse the culler; these always span the view anyway
	floorLines.frustumCulled = false;
	scene.add(floorLines);

	// colonnade: a pillar per age on each wall, fading to black at the top
	const PILLAR_RADIUS = 1.1;
	// lambert: smooth gradient shading, not the crowd's stepped toon bands
	const pillarMaterial = new THREE.MeshLambertMaterial({
		color: CONCRETE_COLOR,
		emissive: "#070310",
		emissiveMap: wallGradientMap,
		map: wallGradientMap
	});
	// outlined like the people: a thin black hand-drawn contour
	pillarMaterial.userData.outlineParameters = { visible: true };
	const pillarGeometry = new THREE.CylinderGeometry(
		PILLAR_RADIUS,
		PILLAR_RADIUS,
		roomHeight,
		20,
		1,
		true
	);
	// the colonnade starts at the first real age line (18) and stops one
	// short of the back, so no pillar crowds the light
	const pillarAges = everyYear.filter(
		(age) => age >= ageMin + 1 && age <= Math.floor(ageMax) - 1
	);
	const pillars = new THREE.InstancedMesh(
		pillarGeometry,
		pillarMaterial,
		pillarAges.length * 2
	);
	// sunk into the wall; left instances spin 180° so every pillar's
	// local -x faces the room and one local sconce position serves all
	const pillarX = halfWidth - PILLAR_RADIUS * 0.65;
	const pillarFlip = new THREE.Matrix4().makeRotationY(Math.PI);
	for (let i = 0; i < pillarAges.length; i++) {
		const z = ageToZ(pillarAges[i]);
		lineMatrix.copy(pillarFlip).setPosition(-pillarX, roomHeight / 2, z);
		pillars.setMatrixAt(i * 2, lineMatrix);
		lineMatrix.identity().setPosition(pillarX, roomHeight / 2, z);
		pillars.setMatrixAt(i * 2 + 1, lineMatrix);
	}
	pillars.instanceMatrix.needsUpdate = true;
	pillars.castShadow = true;
	pillars.receiveShadow = true;
	pillars.frustumCulled = false;
	scene.add(pillars);

	// a sconce per pillar: a full-bright globe set into the pillar face
	const SCONCE_Y = 7.5;
	const SCONCE_COLOR = "#e0c8ff"; // pale candle purple
	const pillarFaceX = pillarX - PILLAR_RADIUS;
	const sconceX = pillarFaceX - 0.28; // floats a touch off the pillar face
	// unfogged and un-outlined: fog made a dark disc, the hull a crescent
	const sconceMaterial = new THREE.MeshBasicMaterial({ color: SCONCE_COLOR, fog: false });
	sconceMaterial.userData.outlineParameters = { visible: false };
	const globes = new THREE.InstancedMesh(
		new THREE.SphereGeometry(0.15, 12, 8),
		sconceMaterial,
		pillarAges.length * 2
	);
	for (let i = 0; i < pillarAges.length; i++) {
		const z = ageToZ(pillarAges[i]);
		lineMatrix.identity().setPosition(-sconceX, SCONCE_Y, z);
		globes.setMatrixAt(i * 2, lineMatrix);
		lineMatrix.identity().setPosition(sconceX, SCONCE_Y, z);
		globes.setMatrixAt(i * 2 + 1, lineMatrix);
	}
	globes.instanceMatrix.needsUpdate = true;
	globes.frustumCulled = false;
	scene.add(globes);

	// the sconce lights its pillar in the shader: a per-fragment falloff
	// in local space, so it wraps the cylinder from every viewing angle
	const sconceLocal = new THREE.Vector3(
		sconceX - pillarX,
		SCONCE_Y - roomHeight / 2,
		0
	);
	// kept faint: the pillar should catch the light, not be floodlit
	const sconceGlowColor = new THREE.Color(SCONCE_COLOR).multiplyScalar(0.32);
	pillarMaterial.onBeforeCompile = (shader) => {
		shader.uniforms.uSconcePos = { value: sconceLocal };
		shader.uniforms.uSconceColor = { value: sconceGlowColor };
		shader.vertexShader = shader.vertexShader
			.replace("#include <common>", "#include <common>\nvarying vec3 vPillarLocal;")
			.replace(
				"#include <begin_vertex>",
				"#include <begin_vertex>\n\tvPillarLocal = position;"
			);
		shader.fragmentShader = shader.fragmentShader
			.replace(
				"#include <common>",
				"#include <common>\nvarying vec3 vPillarLocal;\nuniform vec3 uSconcePos;\nuniform vec3 uSconceColor;"
			)
			.replace(
				"#include <emissivemap_fragment>",
				`#include <emissivemap_fragment>
	{
		float sconceD = distance(vPillarLocal, uSconcePos);
		totalEmissiveRadiance += uSconceColor / (1.0 + sconceD * sconceD * 3.0);
	}`
			);
	};

	// each globe's halo: one additive sprite per sconce
	const glowCanvas = document.createElement("canvas");
	glowCanvas.width = 64;
	glowCanvas.height = 64;
	const glowCtx = glowCanvas.getContext("2d");
	const glowGradient = glowCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
	glowGradient.addColorStop(0, "rgba(255, 252, 245, 1)");
	glowGradient.addColorStop(0.25, "rgba(228, 205, 255, 0.8)");
	glowGradient.addColorStop(0.6, "rgba(196, 160, 245, 0.3)");
	glowGradient.addColorStop(1, "rgba(196, 160, 245, 0)");
	glowCtx.fillStyle = glowGradient;
	glowCtx.fillRect(0, 0, 64, 64);
	const glowTexture = new THREE.CanvasTexture(glowCanvas);
	glowTexture.colorSpace = THREE.SRGBColorSpace;
	const glowPositions = new Float32Array(pillarAges.length * 2 * 3);
	for (let i = 0; i < pillarAges.length; i++) {
		const z = ageToZ(pillarAges[i]);
		glowPositions[i * 6] = -sconceX;
		glowPositions[i * 6 + 1] = SCONCE_Y;
		glowPositions[i * 6 + 2] = z;
		glowPositions[i * 6 + 3] = sconceX;
		glowPositions[i * 6 + 4] = SCONCE_Y;
		glowPositions[i * 6 + 5] = z;
	}
	const glowGeometry = new THREE.BufferGeometry();
	glowGeometry.setAttribute("position", new THREE.BufferAttribute(glowPositions, 3));
	const glowMaterial = new THREE.PointsMaterial({
		map: glowTexture,
		color: "#e2ccff",
		size: 1.2,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.8,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});
	glowMaterial.userData.outlineParameters = { visible: false };
	const sconceGlows = new THREE.Points(glowGeometry, glowMaterial);
	sconceGlows.frustumCulled = false;
	scene.add(sconceGlows);

	// fades the colonnade, its sconces, and the side walls (with their
	// cast shadows) out of the aerial view
	const GLOW_BASE_OPACITY = glowMaterial.opacity;
	function setColonnadeFade(opacity) {
		const clamped = Math.max(0, Math.min(1, opacity));
		const translucent = clamped < 1;
		for (const material of [pillarMaterial, sconceMaterial, sideWallMaterial]) {
			material.transparent = translucent;
			material.opacity = clamped;
		}
		glowMaterial.opacity = GLOW_BASE_OPACITY * clamped;
		const show = clamped > 0.01;
		pillars.visible = show;
		globes.visible = show;
		sconceGlows.visible = show;
		leftWall.visible = show;
		rightWall.visible = show;
		leftWall.castShadow = show;
		rightWall.castShadow = show;
	}

	// a translucent patch that keeps the active beat's floor span lit;
	// drawn below the shadow discs (y 0.015) so the two never z-fight
	const beatFlashMaterial = new THREE.MeshBasicMaterial({
		color: AGE_LINE_FLASH_COLOR,
		transparent: true,
		opacity: 0,
		depthWrite: false
	});
	beatFlashMaterial.userData.outlineParameters = { visible: false };
	const beatFlashPatch = new THREE.Mesh(
		new THREE.PlaneGeometry(roomWidth, 1),
		beatFlashMaterial
	);
	beatFlashPatch.rotation.x = -Math.PI / 2;
	beatFlashPatch.position.y = 0.006;
	beatFlashPatch.visible = false;
	scene.add(beatFlashPatch);

	const BEAT_LIT_OPACITY = 0.1;
	const BEAT_LIT_EASE = 4; // per second, both in and out
	let beatLitTarget = 0;
	const beatFloorFlash = {
		// lights the beat's span and holds it until clear()
		set(ageStart, ageEnd) {
			const zStart = ageToZ(ageStart);
			const zEnd = ageToZ(Number.isFinite(ageEnd) ? ageEnd : ageStart + 1);
			const depth = Math.abs(zEnd - zStart);
			if (depth <= 0) return;
			beatFlashPatch.scale.y = depth; // local y is depth once laid flat
			beatFlashPatch.position.z = (zStart + zEnd) / 2;
			beatLitTarget = BEAT_LIT_OPACITY;
			beatFlashPatch.visible = true;
		},
		clear() {
			beatLitTarget = 0;
		},
		update(dt) {
			if (!beatFlashPatch.visible) return;
			const k = Math.min(1, dt * BEAT_LIT_EASE);
			beatFlashMaterial.opacity += (beatLitTarget - beatFlashMaterial.opacity) * k;
			if (beatLitTarget === 0 && beatFlashMaterial.opacity < 0.005) {
				beatFlashMaterial.opacity = 0;
				beatFlashPatch.visible = false;
			}
		}
	};

	// a thin quad, since line width is ignored by most gpus; the dividers
	// stop a year short of the light at the back
	const zoneLineMaterial = new THREE.MeshBasicMaterial({
		color: ZONE_LINE_COLOR
	});
	zoneLineMaterial.userData.outlineParameters = { visible: false };
	const zoneLineEndZ = ageToZ(ageMax - 1);
	const zoneLineLength = halfDepth - zoneLineEndZ;
	for (const x of [-zoneWidth / 2, zoneWidth / 2]) {
		const zoneLine = new THREE.Mesh(
			new THREE.PlaneGeometry(ZONE_LINE_THICKNESS, zoneLineLength),
			zoneLineMaterial
		);
		zoneLine.rotation.x = -Math.PI / 2;
		zoneLine.position.set(x, 0.025, (halfDepth + zoneLineEndZ) / 2);
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

	// headers close each opening above its door
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

	// side walls, with a faint glow so the room's edges stay readable
	const sideWallGeometry = new THREE.BoxGeometry(wallThickness, roomHeight, roomDepth);
	// near-black, so the wall-colored pillars read in front of them
	const sideWallMaterial = new THREE.MeshToonMaterial({
		color: "#050208",
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

	return {
		backWall,
		leftWall,
		rightWall,
		innerWallMeshes,
		beatFloorFlash,
		// where the sconce globes sit, so the dust can catch their light
		candleGlowX: sconceX,
		candleGlowY: SCONCE_Y,
		setColonnadeFade
	};
}
