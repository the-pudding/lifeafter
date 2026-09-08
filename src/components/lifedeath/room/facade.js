import * as THREE from "three";
import { makeSvgNeonPanel } from "../utilities/textPanel.js";
import wordmarkSvg from "$svg/wordmark-script-stacked-plain.svg?raw";
import signSvg from "$svg/sign.svg?raw";
import bylineSvg from "$svg/byline.svg?raw";

// dim state for the wordmark/byline links; lit fully on hover
export const FACADE_LINK_DIM_BRIGHTNESS = 0.7;

// sign geometry, at module scope so the loading screen can place its own copy
export const SIGN_WIDTH = 5.4;

export const SIGN_HEIGHT = (SIGN_WIDTH * 63) / 318;

const SIGN_ABOVE_DOOR = 1.9;
// clear of the brick relief
const SIGN_FACE_OFFSET = 0.1;
const BRICK_DEPTH = 0.4;

const LOGO_WIDTH = 2;
const LOGO_HEIGHT = (LOGO_WIDTH * 247) / 600; // matches the SVG's own 600x247 viewBox
const WORDMARK_GAP = 0.3; // clearance above the sign's own top edge
const LOGO_Y = SIGN_HEIGHT / 2 + WORDMARK_GAP + LOGO_HEIGHT / 2;

const BYLINE_WIDTH = 1.95;
const BYLINE_HEIGHT = (BYLINE_WIDTH * 56) / 271; // byline.svg's own 271x56 viewBox
const BYLINE_GAP = 0.22; // clearance below the sign's own bottom edge

// the cluster's centre relative to the sign's bottom edge, per unit of scale
const CLUSTER_CENTER_OFFSET =
	(SIGN_HEIGHT / 2 + LOGO_Y + LOGO_HEIGHT / 2 - (BYLINE_GAP + BYLINE_HEIGHT)) / 2;

// where the sign lands in world units, for a given scale and cluster centre
export function signPlacement({
	doorHeight,
	doorZ,
	facadeThickness,
	scale = 1,
	centerY = null
}) {
	const signBottomAnchor = doorHeight + SIGN_ABOVE_DOOR - SIGN_HEIGHT / 2;
	const requested =
		centerY === null ? signBottomAnchor : centerY - CLUSTER_CENTER_OFFSET * scale;
	// never lets the byline sink onto the door lamps
	const lowestBottomY = doorHeight + 0.75 + (BYLINE_GAP + BYLINE_HEIGHT) * scale;
	const bottomY = Math.max(lowestBottomY, requested);
	return {
		bottomY,
		centerY: bottomY + (SIGN_HEIGHT / 2) * scale,
		bylineCenterY: bottomY - (BYLINE_GAP + BYLINE_HEIGHT / 2) * scale,
		width: SIGN_WIDTH * scale,
		height: SIGN_HEIGHT * scale,
		z: doorZ + facadeThickness / 2 + BRICK_DEPTH + SIGN_FACE_OFFSET
	};
}

export function excludeDirectionalLights(material) {
	material.onBeforeCompile = (shader) => {
		// runs before three resolves its includes, so the directive is still text
		const patchedChunk = THREE.ShaderChunk.lights_fragment_begin.replace(
			"#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )",
			"#if ( 0 > 1 ) && defined( RE_Direct )"
		);
		shader.fragmentShader = shader.fragmentShader.replace(
			"#include <lights_fragment_begin>",
			patchedChunk
		);
	};
}

// builds the brick facade, its neon sign and the sign's light
export function buildFacade(scene, config) {
	const {
		toonGradientMap,
		doors,
		doorWidth,
		doorHeight,
		doorZ,
		facadeThickness,
		outerWallHalfWidth,
		roomHeight,
		facadeLightLayer,
		// everything built here is the building's outside face
		exteriorGroup
	} = config;

	// brick sizing, declared up front because the grout backing needs the depth
	const BRICK_WIDTH = .8;
	const BRICK_HEIGHT = 0.3;
	const BRICK_GAP = 0.07; // mortar gap between adjacent bricks
	// how far the grout fills the recess behind the bricks
	const GROUT_DEPTH = BRICK_DEPTH * 0.96;
	// the brick's outermost face, for anything that has to clear it
	const BRICK_FRONT_LOCAL_Z = facadeThickness / 2 + BRICK_DEPTH;

	// the backing wall behind the bricks
	const facadeMaterial = new THREE.MeshToonMaterial({
		color: "#000000",
		gradientMap: toonGradientMap
	});
	facadeMaterial.userData.outlineParameters = { visible: false };
	excludeDirectionalLights(facadeMaterial);
	// depth and position of the two tiers below
	const facadeDepth = facadeThickness + GROUT_DEPTH;
	const facadeZ = doorZ + GROUT_DEPTH / 2;

	// the solid segments left once the door openings are cut out
	function facadeSolidXRanges() {
		const halfDoor = doorWidth / 2;
		const ranges = [];
		let x = -outerWallHalfWidth;
		for (const door of doors) {
			const gapStart = door.x - halfDoor;
			if (gapStart > x) ranges.push([x, gapStart]);
			x = door.x + halfDoor;
		}
		if (x < outerWallHalfWidth) ranges.push([x, outerWallHalfWidth]);
		return ranges;
	}
	// boxed like the other walls, straddling the door plane so both sit flush
	for (const [xStart, xEnd] of facadeSolidXRanges()) {
		const width = xEnd - xStart;
		const lowerTier = new THREE.Mesh(
			new THREE.BoxGeometry(width, doorHeight, facadeDepth),
			facadeMaterial
		);
		lowerTier.position.set((xStart + xEnd) / 2, doorHeight / 2, facadeZ);
		lowerTier.layers.set(facadeLightLayer);
		lowerTier.castShadow = true;
		lowerTier.receiveShadow = true;
		exteriorGroup.add(lowerTier);
	}
	// one continuous lintel across the top, holding the sign
	const upperTierHeight = roomHeight * 1.2 - doorHeight;
	const upperTier = new THREE.Mesh(
		new THREE.BoxGeometry(outerWallHalfWidth * 2, upperTierHeight, facadeDepth),
		facadeMaterial
	);
	upperTier.position.set(0, doorHeight + upperTierHeight / 2, facadeZ);
	upperTier.layers.set(facadeLightLayer);
	upperTier.castShadow = true;
	upperTier.receiveShadow = true;
	exteriorGroup.add(upperTier);

	// real geometry, not an image of brick
	const MAX_BRICK_PROTRUSION = BRICK_DEPTH - GROUT_DEPTH;
	const groutFrontLocalZ = facadeThickness / 2 + GROUT_DEPTH;

	// one brick per row and column across a region of the facade
	function brickPositionsFor(xStart, xEnd, yStart, yEnd) {
		const positions = [];
		const rows = Math.max(1, Math.round((yEnd - yStart) / BRICK_HEIGHT));
		const rowHeight = (yEnd - yStart) / rows;
		const MIN_BRICK_WIDTH = 0.12;
		for (let row = 0; row < rows; row++) {
			const y = yStart + rowHeight * (row + 0.5);
			const rowOffset = row % 2 === 0 ? 0 : BRICK_WIDTH / 2;
			let x = xStart;
			if (rowOffset > MIN_BRICK_WIDTH) {
				positions.push({ x: xStart + rowOffset / 2, y, width: rowOffset });
				x = xStart + rowOffset;
			}
			while (x < xEnd - MIN_BRICK_WIDTH) {
				const width = Math.min(BRICK_WIDTH, xEnd - x);
				positions.push({ x: x + width / 2, y, width });
				x += width;
			}
		}
		return positions;
	}

	const brickPositions = [];
	for (const [xStart, xEnd] of facadeSolidXRanges()) {
		brickPositions.push(...brickPositionsFor(xStart, xEnd, 0, doorHeight));
	}
	brickPositions.push(
		...brickPositionsFor(
			-outerWallHalfWidth,
			outerWallHalfWidth,
			doorHeight,
			doorHeight + upperTierHeight
		)
	);

	// a unit-width brick, scaled on x to each instance's real width
	const brickGeometry = new THREE.BoxGeometry(1, BRICK_HEIGHT - BRICK_GAP, BRICK_DEPTH);
	// toon shaded: a hard two-step ramp, no pbr falloff
	const brickMaterial = new THREE.MeshToonMaterial({
		color: "#2d1625",
		gradientMap: toonGradientMap
	});
	// no outline on individual bricks
	brickMaterial.userData.outlineParameters = { thickness: 0};
	excludeDirectionalLights(brickMaterial);
	const brickInstances = new THREE.InstancedMesh(
		brickGeometry,
		brickMaterial,
		brickPositions.length
	);
	brickInstances.castShadow = true;
	brickInstances.receiveShadow = true;
	brickInstances.layers.set(facadeLightLayer);
	const brickBaseColor = new THREE.Color(brickMaterial.color);
	const brickPlacementHelper = new THREE.Object3D();
	const brickInstanceColor = new THREE.Color();
	brickPositions.forEach(({ x, y, width }, i) => {
		// how far this brick pokes out past the grout
		const protrusion = (0.8 + Math.random() * 0.2) * MAX_BRICK_PROTRUSION;
		const brickFrontLocalZ = groutFrontLocalZ + protrusion;
		brickPlacementHelper.position.set(
			x,
			// a little jitter, so the coursing isn't a perfect grid
			y + (Math.random() - 0.5) * 0.01,
			doorZ + brickFrontLocalZ - BRICK_DEPTH / 2
		);
		brickPlacementHelper.scale.set(width - BRICK_GAP, 1, 1);
		brickPlacementHelper.updateMatrix();
		brickInstances.setMatrixAt(i, brickPlacementHelper.matrix);
		// per-brick colour variation, so the wall isn't one flat colour
		brickInstanceColor
			.copy(brickBaseColor)
			.offsetHSL(
				(Math.random() - 0.5) * 0.03,
				(Math.random() - 0.5) * 0.15,
				(Math.random() - 0.5) * 0.12
			);
		brickInstances.setColorAt(i, brickInstanceColor);
	});
	brickInstances.instanceMatrix.needsUpdate = true;
	if (brickInstances.instanceColor) brickInstances.instanceColor.needsUpdate = true;
	exteriorGroup.add(brickInstances);

	// the sign and wordmark share a group, so they scale together
	const signZ = signPlacement({ doorHeight, doorZ, facadeThickness }).z;
	// high enough that a scaled-up sign clears the door labels
	const signY = doorHeight + 1.9;
	const signGroup = new THREE.Group();
	signGroup.position.set(0, signY, signZ);
	exteriorGroup.add(signGroup);

	// the building's name
	const buildingSign = makeSvgNeonPanel(signSvg, {
		width: SIGN_WIDTH,
		height: SIGN_HEIGHT,
		color: "#ff36a8",
		glowColor: "#ff36a8"
	});
	signGroup.add(buildingSign);

	// the wordmark, above the sign
	const wordmarkLogo = makeSvgNeonPanel(wordmarkSvg, {
		width: LOGO_WIDTH,
		height: LOGO_HEIGHT,
		color: "#ffffff",
		glowColor: "#ff36a8"
	});
	wordmarkLogo.position.set(0, LOGO_Y, 0);
	// starts dimmed; main lights it fully on hover
	wordmarkLogo.material[4].color.setScalar(FACADE_LINK_DIM_BRIGHTNESS);
	signGroup.add(wordmarkLogo);

	// the byline, below the sign
	const byline = makeSvgNeonPanel(bylineSvg, {
		width: BYLINE_WIDTH,
		height: BYLINE_HEIGHT,
		color: "#ff36a8",
		glowColor: "#ff36a8"
	});
	// places the sign and byline for a given scale, growing up from a fixed edge
	function layoutSign(scale = 1, centerY = null) {
		const placed = signPlacement({
			doorHeight,
			doorZ,
			facadeThickness,
			scale,
			centerY
		});
		signGroup.position.set(0, placed.centerY, signZ);
		byline.position.set(0, placed.bylineCenterY, signZ + 0.1);
	}
	layoutSign();
	byline.material[4].color.setScalar(FACADE_LINK_DIM_BRIGHTNESS);
	exteriorGroup.add(byline);

	// the sign's pool of light on the brick, kept to the facade's own layer
	const signLight = new THREE.PointLight("#ff36a8", 1, 7, 2);
	// out past the brick faces, beside the sign rather than behind it
	signLight.position.set(0, doorHeight + 0.3, doorZ + BRICK_FRONT_LOCAL_Z + 0.25);
	signLight.layers.set(facadeLightLayer);
	signLight.castShadow = true;
	signLight.shadow.mapSize.set(512, 512);
	signLight.shadow.bias = -0.002;
	exteriorGroup.add(signLight);

	return { brickFrontLocalZ: BRICK_FRONT_LOCAL_Z, wordmarkLogo, byline, signGroup, layoutSign, signZ };
}
