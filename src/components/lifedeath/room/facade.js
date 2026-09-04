import * as THREE from "three";
import { makeSvgNeonPanel } from "../utilities/textPanel.js";
import wordmarkSvg from "$svg/wordmark-script-stacked-plain.svg?raw";
import signSvg from "$svg/sign.svg?raw";
import bylineSvg from "$svg/byline.svg?raw";

// dim state for the wordmark/byline links; lit fully on hover
export const FACADE_LINK_DIM_BRIGHTNESS = 0.7;

// --- sign geometry -----------------------------------------------------
// module scope, not inside buildFacade: the loading screen draws its own
// copy of this sign and has to land it in exactly the same place, before
// any of this is built.
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

// where the wordmark+sign+byline cluster's visual center sits relative to
// the sign's bottom edge, per unit of scale. lets a caller place the
// cluster by its center instead of by the sign's own anchor
const CLUSTER_CENTER_OFFSET =
	(SIGN_HEIGHT / 2 + LOGO_Y + LOGO_HEIGHT / 2 - (BYLINE_GAP + BYLINE_HEIGHT)) / 2;

/**
 * Where the sign panel itself ends up, in world units, for a given fov
 * scale and cluster center. One source of truth for buildFacade's own
 * layout and for the loading screen that has to match it.
 */
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
	// never let the byline sink onto the door lamps (doorHeight + 0.4,
	// sphere radius 0.15), however low the requested center is
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
		// onBeforeCompile runs before three resolves #include directives, so the
		// shader source here still says literally "#include
		// <lights_fragment_begin>".
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

/**
 * builds the brick facade (backing wall, running-bond brick relief, the
 * neon building sign and its point light) and adds it to the scene.
 */
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
		// every last thing this function builds is the building's OUTSIDE face.
		exteriorGroup
	} = config;

	// brick sizing/spacing, declared up front (rather than down by the
	// brick relief itself) because the grout backing below already needs
	// BRICK_DEPTH to know how much of that depth it should fill.
	const BRICK_WIDTH = .8;
	const BRICK_HEIGHT = 0.3;
	const BRICK_GAP = 0.07; // mortar gap between adjacent bricks
	// how far the grout backing below extends out into the recess behind the
	// bricks.
	const GROUT_DEPTH = BRICK_DEPTH * 0.96;
	// the brick's own outermost possible face, as a local offset from
	// doorZ — for anything (the sign, the door lamps) that needs to clear
	// the bricks rather than sit flush with the grout behind them.
	const BRICK_FRONT_LOCAL_Z = facadeThickness / 2 + BRICK_DEPTH;

	// the backing wall behind the bricks.
	const facadeMaterial = new THREE.MeshToonMaterial({
		color: "#000000",
		gradientMap: toonGradientMap
	});
	facadeMaterial.userData.outlineParameters = { visible: false };
	excludeDirectionalLights(facadeMaterial);
	// depth/position for the lower/upper tier boxes below: back face stays
	// anchored at doorZ - facadeThickness/2 (unchanged from before), the
	// front face is what moves out by GROUT_DEPTH.
	const facadeDepth = facadeThickness + GROUT_DEPTH;
	const facadeZ = doorZ + GROUT_DEPTH / 2;

	// the lower tier's solid segments left over once each door opening is cut
	// out.
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
	// boxed like the other walls (see roomShell.js) — straddling doorZ
	// the same way each door's own panel already does, rather than
	// extruding outward only, so the facade and the doors set into it stay flush.
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
	// the upper tier is one continuous solid lintel spanning the full
	// (wide) width, holding the sign above the doors.
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

	// real 3D brick, not an image of brick.
	const MAX_BRICK_PROTRUSION = BRICK_DEPTH - GROUT_DEPTH;
	const groutFrontLocalZ = facadeThickness / 2 + GROUT_DEPTH;

	// one brick per row/column across a rectangular region of the facade.
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

	// unit width (1 world unit); each instance is scaled on X to its own
	// brick's actual width (full-width bricks get scale 1).
	const brickGeometry = new THREE.BoxGeometry(1, BRICK_HEIGHT - BRICK_GAP, BRICK_DEPTH);
	// toon, not standard: a hard 2-step ramp, no PBR falloff
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
		// how far this particular brick pokes out past the grout.
		const protrusion = (0.8 + Math.random() * 0.2) * MAX_BRICK_PROTRUSION;
		const brickFrontLocalZ = groutFrontLocalZ + protrusion;
		brickPlacementHelper.position.set(
			x,
			// A little per-brick jitter, on top of the running-bond
			// pattern itself, so the coursing reads as real, slightly
			// imperfect masonry rather than a perfect grid — kept small
			// on purpose, this is meant to read as subtle, not chaotic.
			y + (Math.random() - 0.5) * 0.01,
			doorZ + brickFrontLocalZ - BRICK_DEPTH / 2
		);
		brickPlacementHelper.scale.set(width - BRICK_GAP, 1, 1);
		brickPlacementHelper.updateMatrix();
		brickInstances.setMatrixAt(i, brickPlacementHelper.matrix);
		// slight per-brick color variation (both lighter/darker and a
		// little hue drift) so the wall doesn't read as one color
		// stamped identically across every brick — real brick always has
		// some kiln-to-kiln variation.
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

	// everything sign-related (the "Life after death?" panel, the wordmark, the
	// byline) is parented under this one group instead of going straight into
	// exteriorGroup, positioned at what was previously buildingSign's own
	// anchor.
	const signZ = signPlacement({ doorHeight, doorZ, facadeThickness }).z;
	// was +0.6 originally, which put buildingSign's own bounding box (height 4,
	// scaled up to MAX_SIGN_SCALE for mobile legibility, see Main's
	// updateTextFovScale) low enough to genuinely overlap the "Unsure" door's
	// own label at scale.
	const signY = doorHeight + 1.9;
	const signGroup = new THREE.Group();
	signGroup.position.set(0, signY, signZ);
	exteriorGroup.add(signGroup);

	// the building's name.
	const buildingSign = makeSvgNeonPanel(signSvg, {
		width: SIGN_WIDTH,
		height: SIGN_HEIGHT,
		color: "#ff36a8",
		glowColor: "#ff36a8"
	});
	signGroup.add(buildingSign);

	// the wordmark logo, glowing above the "Life after death?" sign.
	const wordmarkLogo = makeSvgNeonPanel(wordmarkSvg, {
		width: LOGO_WIDTH,
		height: LOGO_HEIGHT,
		color: "#ffffff",
		glowColor: "#ff36a8"
	});
	wordmarkLogo.position.set(0, LOGO_Y, 0);
	// starts dimmed (see FACADE_LINK_DIM_BRIGHTNESS above); Main's
	// setFacadeSignHover brightens it back to full on hover.
	wordmarkLogo.material[4].color.setScalar(FACADE_LINK_DIM_BRIGHTNESS);
	signGroup.add(wordmarkLogo);

	// the byline, below the sign in smaller neon text.
	const byline = makeSvgNeonPanel(bylineSvg, {
		width: BYLINE_WIDTH,
		height: BYLINE_HEIGHT,
		color: "#ff36a8",
		glowColor: "#ff36a8"
	});
	// lays out the sign block for a given fov scale. it grows UP from a
	// fixed bottom edge rather than out from its center, so the big mobile
	// scale doesn't push the sign — and the byline under it — down into the
	// door labels. the byline sits outside signGroup and so needs its own
	// placement either way
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

	// the sign's own pool of light on the brick around it — see
	// facadeLightLayer above for why this only affects the facade and
	// nothing else in the scene.
	const signLight = new THREE.PointLight("#ff36a8", 1, 7, 2);
	// out past the bricks' own front face, next to the sign itself — not
	// embedded in/behind the brick relief.
	signLight.position.set(0, doorHeight + 0.3, doorZ + BRICK_FRONT_LOCAL_Z + 0.25);
	signLight.layers.set(facadeLightLayer);
	signLight.castShadow = true;
	signLight.shadow.mapSize.set(512, 512);
	signLight.shadow.bias = -0.002;
	exteriorGroup.add(signLight);

	return { brickFrontLocalZ: BRICK_FRONT_LOCAL_Z, wordmarkLogo, byline, signGroup, layoutSign, signZ };
}
