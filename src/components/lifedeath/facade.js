import * as THREE from "three";
import { makeSvgNeonPanel } from "./textPanel.js";
import wordmarkSvg from "$svg/wordmark-script-stacked-plain.svg?raw";
import signSvg from "$svg/sign.svg?raw";
import bylineSvg from "$svg/byline.svg?raw";

// keyLight/fillLight are directional — a directional light has no
// position, so there's no way to keep it away from the facade by
// distance the way the point lights' own falloff naturally limits them.
// A facade light layer turned out not to help with this either: three.js
// layers only gate whether a light is active for a camera at all, not
// which specific objects it illuminates — once a light is active, it
// lights everything the camera draws, regardless of either one's layer.
// So instead, this patches the facade materials' own compiled shader to
// drop the directional-lights loop entirely, leaving the point-light
// loop (fixtureLight/signLight, see doors.js) untouched — the only way to
// actually make one material blind to specific lights.
// Default (unhovered) brightness multiplier for the wordmark/byline links —
// see wrapCanvasInPanel in textPanel.js, whose face material's color is
// otherwise plain white (1) and only multiplies the canvas texture's own
// neon-glow pixels. Dimmed a bit below that so hovering (see Main's
// setFacadeSignHover, which restores this to a full, un-boosted 1 on
// hover) reads as a real "lighting up," not just a subtle shift.
export const FACADE_LINK_DIM_BRIGHTNESS = 0.7;

export function excludeDirectionalLights(material) {
	material.onBeforeCompile = (shader) => {
		// onBeforeCompile runs before three resolves #include directives,
		// so the shader source here still says literally "#include
		// <lights_fragment_begin>" — the #if ( NUM_DIR_LIGHTS > 0 ) line
		// this needs to patch doesn't exist as text yet. Pull that
		// chunk's actual source from THREE.ShaderChunk, patch the one
		// line, and substitute the whole patched chunk in place of the
		// include so three's own resolver has nothing left to expand there.
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
 * Builds the brick facade (backing wall, running-bond brick relief, the
 * neon building sign and its point light) and adds it to the scene.
 * Returns brickFrontLocalZ — the brick's own outermost face, as a local
 * offset from doorZ — for doors.js's fixtures/lamps to clear the bricks
 * rather than sit flush with the old flat wall — wordmarkLogo/byline,
 * the two meshes Main.lifedeath.svelte wires up as click targets (open
 * pudding.cool / the author page) — and signGroup, the shared parent of
 * the sign/wordmark/byline Main scales together to keep them legible
 * across different camera fovs (see its own textFovScale).
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
		// Every last thing this function builds is the building's OUTSIDE
		// face — never visible from inside the room (which has its own,
		// separate wall surfaces, see roomShell.js) — so it all goes into
		// this shared group instead of straight onto `scene`, letting
		// Main.lifedeath.svelte hide the whole facade in one toggle once
		// the walker's inside with every door shut (see its own
		// exteriorGroup.visible logic).
		exteriorGroup
	} = config;

	// Brick sizing/spacing, declared up front (rather than down by the
	// brick relief itself) because the grout backing below already needs
	// BRICK_DEPTH to know how much of that depth it should fill.
	const BRICK_WIDTH = .8;
	const BRICK_HEIGHT = 0.3;
	const BRICK_DEPTH = 0.4;
	const BRICK_GAP = 0.07; // mortar gap between adjacent bricks
	// How far the grout backing below extends out into the recess behind
	// the bricks — most of a brick's own depth, leaving only the outer
	// third-ish as room for a brick to actually protrude past the grout
	// (see the brick placement loop further down, which randomizes each
	// brick's protrusion within that remaining room).
	const GROUT_DEPTH = BRICK_DEPTH * 0.96;
	// The brick's own outermost possible face, as a local offset from
	// doorZ — for anything (the sign, the door lamps) that needs to clear
	// the bricks rather than sit flush with the grout behind them.
	const BRICK_FRONT_LOCAL_Z = facadeThickness / 2 + BRICK_DEPTH;

	// The backing wall behind the bricks — grout/mortar-colored, and
	// extruded most of the way out into the gap between bricks (by
	// GROUT_DEPTH) rather than sitting flush at the very back of it. A
	// flat dark backing a whole BRICK_DEPTH behind the brick faces read as
	// a deep black void between bricks, not mortar — filling most of that
	// gap in a lighter, grout-like tone and leaving room for only a
	// sliver of actual brick to protrude past it is what makes this read
	// as grouted masonry instead of floating tiles.
	const facadeMaterial = new THREE.MeshToonMaterial({
		color: "#000000",
		gradientMap: toonGradientMap
	});
	facadeMaterial.userData.outlineParameters = { visible: false };
	excludeDirectionalLights(facadeMaterial);
	// Depth/position for the lower/upper tier boxes below: back face stays
	// anchored at doorZ - facadeThickness/2 (unchanged from before), the
	// front face is what moves out by GROUT_DEPTH.
	const facadeDepth = facadeThickness + GROUT_DEPTH;
	const facadeZ = doorZ + GROUT_DEPTH / 2;

	// The lower tier's solid segments left over once each door opening is
	// cut out — ascending [xStart, xEnd] pairs. Spans outerWallHalfWidth
	// (much wider than the room itself) rather than just halfWidth, so the
	// facade still fully covers the view no matter how far the interior
	// has shifted behind it — the doors themselves stay right where they
	// are (each door's own x is untouched).
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
	// Boxed like the other walls (see roomShell.js) — straddling doorZ
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
	// The upper tier is one continuous solid lintel spanning the full
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

	// Real 3D brick, not an image of brick — individual boxes, offset
	// every other row (a running bond, like real brickwork), proud of the
	// grout backing above — so the point lights at each fixture/the sign
	// actually cast shadows between them instead of a bumpMap faking the
	// relief. Sized chunky/stylized (real brick would be a huge instance
	// count for no visual benefit at this camera distance), matching the
	// rest of the scene's low-poly character.
	//
	// How far past the grout's own front face a brick can actually
	// protrude — randomized per brick below (0 = flush with the grout, at
	// this max = the brick's outermost possible face, BRICK_FRONT_LOCAL_Z).
	const MAX_BRICK_PROTRUSION = BRICK_DEPTH - GROUT_DEPTH;
	const groutFrontLocalZ = facadeThickness / 2 + GROUT_DEPTH;

	// One brick per row/column across a rectangular region of the facade
	// — every row is filled edge to edge: a running-bond offset row
	// starts with a narrower (not full-width) brick to fill that lead-in
	// instead of leaving a gap, and whatever's left at the far end (less
	// than a full brick) is its own narrower brick too, clipped exactly to
	// xEnd, rather than either leaving a gap or overhanging past it (into
	// a door opening, for the segments that flank one). Width is per-brick
	// (via the instance's own scale, see below), not baked into the shared geometry.
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

	// Unit width (1 world unit); each instance is scaled on X to its own
	// brick's actual width (full-width bricks get scale 1).
	const brickGeometry = new THREE.BoxGeometry(1, BRICK_HEIGHT - BRICK_GAP, BRICK_DEPTH);
	// MeshToonMaterial, not MeshStandardMaterial — a hard 2-step
	// light/shadow ramp (see toonGradientMap), same as every other lit
	// surface in the scene (the crowd, the interior walls), instead of
	// MeshStandardMaterial's smooth PBR falloff — so a brick reads as
	// either lit or in shadow, no soft gradient between the two. Per-brick
	// color variation (see the setColorAt call below) is what gives the
	// wall texture, not a surface map.
	const brickMaterial = new THREE.MeshToonMaterial({
		color: "#2d1625",
		gradientMap: toonGradientMap
	});
	// A thinner-than-default outline (see PencilOutlineEffect/
	// OUTLINE_DEFAULT_THICKNESS in Main) — its inflated-backface hull
	// grows with camera distance, and at this wall's typical viewing
	// distance the default thickness was enough to poke through the
	// signage mounted just in front of it (see wrapCanvasInPanel's own
	// depth handling in textPanel.js, which only mitigates this, doesn't
	// eliminate it outright). Individual bricks are small enough that a
	// thinner outline still reads fine.
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
		// How far this particular brick pokes out past the grout — mostly
		// proud of it (80-100% of MAX_BRICK_PROTRUSION), with only a
		// little variation, rather than the full 0-100% range that made
		// the wall look chaotic instead of subtly uneven.
		// (Math.random() never takes arguments/a range in JS — always
		// [0, 1) — so this needs the explicit 0.8 + …*0.2 scale below.)
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
		// Slight per-brick color variation (both lighter/darker and a
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

	// Everything sign-related (the "Life after death?" panel, the
	// wordmark, the byline) is parented under this one group instead of
	// going straight into exteriorGroup, positioned at what was previously
	// buildingSign's own anchor — every child's position below is now
	// relative to THIS group's origin, not world space. Main.lifedeath.svelte
	// scales the whole group uniformly (see its own textFovScale) so the
	// sign stays legible at whatever fov a given screen's aspect ratio
	// needs (a wider fov — narrow/mobile screens — otherwise shrinks its
	// on-screen size along with everything else at this same world scale).
	// Scaling the group once, around one shared pivot, keeps the sign/logo/
	// byline in the same proportion and relative position to each other
	// that individually scaling three separate meshes around their own
	// centers wouldn't guarantee.
	const signZ = doorZ + BRICK_FRONT_LOCAL_Z + 0.1;
	// Was +0.6 originally, which put buildingSign's own bounding box
	// (height 4, scaled up to MAX_SIGN_SCALE for mobile legibility, see
	// Main's updateTextFovScale) low enough to genuinely overlap the
	// "Unsure" door's own label at scale — a real 3D overlap, not just a
	// depth-bias/z-fighting artifact, so no amount of polygonOffset
	// tuning on the label's own material could reliably win against it.
	// Now that the sign/byline are sized much smaller (see SIGN_WIDTH/
	// BYLINE_WIDTH below, fit to the wordmark-to-fixture gap instead of
	// scaled for max legibility), the door labels are no longer the
	// binding constraint — the door lamp fixtures are (doors.js's own
	// lightHeightAdjustment, doorHeight + 0.4): +1.6 keeps the sign's own
	// bottom edge, and the byline below it, clear of the fixtures with a
	// bit of margin even at MAX_SIGN_SCALE.
	const signY = doorHeight + 1.6;
	const signGroup = new THREE.Group();
	signGroup.position.set(0, signY, signZ);
	exteriorGroup.add(signGroup);

	// The building's name — a neon sign on the lintel facing the plaza,
	// glowing pink, sized to sit above the clustered doors. sign.svg's own
	// viewBox (318x63) sets the aspect ratio. Sized (along with the byline
	// below) to fit entirely in the gap between the wordmark above and the
	// door lamp fixtures below (see doors.js's lightHeightAdjustment,
	// doorHeight + 0.4) — at the old, much wider 10-14 range this SVG (its
	// own full neon-tube border/frame fills its whole box, unlike the old
	// plain drawn text) was tall enough to visibly dip below the fixtures,
	// and being blown up that large past its own 1024px canvas texture is
	// what read as blurry rather than the crisp vector art it actually is.
	const SIGN_WIDTH = 6;
	const SIGN_HEIGHT = (SIGN_WIDTH * 63) / 318;
	const buildingSign = makeSvgNeonPanel(signSvg, {
		width: SIGN_WIDTH,
		height: SIGN_HEIGHT,
		color: "#ff36a8",
		glowColor: "#ff36a8"
	});
	signGroup.add(buildingSign);

	// The wordmark logo, glowing above the "Life after death?" sign —
	// same neon treatment (see makeSvgNeonPanel), just rasterizing an SVG
	// instead of drawn text. White letterforms (the source SVG itself is
	// a plain black wordmark) inside the sign's own pink glow. Positioned
	// as a fixed local gap above the sign's own top edge (both are
	// children of signGroup, so this stays correct as signGroup's own
	// scale changes, see Main's updateTextFovScale) — NOT `signY - 2.7`,
	// a leftover from when this was a world-space Y before signGroup
	// existed; reused as a *local* offset inside a group already sitting
	// at signY, it was silently doubling (world Y landed at 2*signY-2.7,
	// not signY-2.7), which happened to still look fine at the old
	// SIGN_HEIGHT but stopped being a coincidence worth relying on once
	// signY needed to move for the fixture-clearance fix above.
	const LOGO_WIDTH = 2;
	const LOGO_HEIGHT = (LOGO_WIDTH * 247) / 600; // matches the SVG's own 600x247 viewBox
	const WORDMARK_GAP = 0.3; // clearance above the sign's own top edge
	const wordmarkLogo = makeSvgNeonPanel(wordmarkSvg, {
		width: LOGO_WIDTH,
		height: LOGO_HEIGHT,
		color: "#ffffff",
		glowColor: "#ff36a8"
	});
	const logoY = SIGN_HEIGHT / 2 + WORDMARK_GAP + LOGO_HEIGHT / 2;
	wordmarkLogo.position.set(0, logoY, 0);
	// Starts dimmed (see FACADE_LINK_DIM_BRIGHTNESS above); Main's
	// setFacadeSignHover brightens it back to full on hover.
	wordmarkLogo.material[4].color.setScalar(FACADE_LINK_DIM_BRIGHTNESS);
	signGroup.add(wordmarkLogo);

	// The byline, below the sign in smaller neon text. Deliberately NOT a
	// child of signGroup like buildingSign/wordmarkLogo above — its own Y
	// position is worked out below in world space directly, relative to
	// the sign's own real bottom edge, rather than scaling along with
	// signGroup (see Main's own updateTextFovScale, which scales byline
	// on its own already) — real vertical clearance now, not just a
	// Z-offset illusion: sign.svg's own neon-tube border fills its whole
	// box (unlike the old plain drawn text, which left visible empty
	// margin the byline could sit inside without truly overlapping it).
	// Sized small enough that sign + gap + byline together still clear the
	// door lamp fixtures below (doorHeight + 0.4) with margin to spare even
	// at MAX_SIGN_SCALE (Main's own mobile-legibility scale-up, which grows
	// this panel in place around its own fixed position, not signGroup's).
	const BYLINE_WIDTH = 1.45;
	const BYLINE_HEIGHT = (BYLINE_WIDTH * 56) / 271; // byline.svg's own 271x56 viewBox
	const BYLINE_GAP = 0.15; // clearance below the sign's own bottom edge
	const byline = makeSvgNeonPanel(bylineSvg, {
		width: BYLINE_WIDTH,
		height: BYLINE_HEIGHT,
		color: "#ff36a8",
		glowColor: "#ff36a8"
	});
	const signBottomY = signY - SIGN_HEIGHT / 2;
	const bylineY = signBottomY - BYLINE_GAP - BYLINE_HEIGHT / 2;
	byline.position.set(0, bylineY, signZ + 0.1);
	byline.material[4].color.setScalar(FACADE_LINK_DIM_BRIGHTNESS);
	exteriorGroup.add(byline);

	// The sign's own pool of light on the brick around it — see
	// facadeLightLayer above for why this only affects the facade and
	// nothing else in the scene.
	const signLight = new THREE.PointLight("#ff36a8", 1, 7, 2);
	// Out past the bricks' own front face, next to the sign itself — not
	// embedded in/behind the brick relief.
	signLight.position.set(0, doorHeight + 0.3, doorZ + BRICK_FRONT_LOCAL_Z + 0.25);
	signLight.layers.set(facadeLightLayer);
	signLight.castShadow = true;
	signLight.shadow.mapSize.set(512, 512);
	signLight.shadow.bias = -0.002;
	exteriorGroup.add(signLight);

	return { brickFrontLocalZ: BRICK_FRONT_LOCAL_Z, wordmarkLogo, byline, signGroup };
}
