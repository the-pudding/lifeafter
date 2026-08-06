import * as THREE from "three";
import { makeSvgNeonPanel } from "./textPanel.js";
import { excludeDirectionalLights } from "./facade.js";

// Default (unhovered) brightness multiplier for each door's own label —
// see wrapCanvasInPanel in textPanel.js, whose face material's color is
// otherwise plain white (1) and only multiplies the canvas texture's own
// neon-glow pixels. Dimmed a bit below that so the hover brightening (see
// Main.lifedeath.svelte's setHoveredDoor, which pushes this back up past 1)
// reads as a real jump instead of top of the labels already sitting at max.
export const DOOR_LABEL_DIM_BRIGHTNESS = 0.65;

// A lighter tint of a base color — used for the door fixtures' hot core,
// a shade lighter than the neon pink everything else outside uses.
function lightenColor(input, amount) {
	return new THREE.Color(input).lerp(new THREE.Color(0xffffff), amount);
}

// A darker shade of a base color — used for the door knob, so it reads
// as a distinct fixture against its own door's panel color.
function darkenColor(input, amount) {
	return new THREE.Color(input).lerp(new THREE.Color(0x000000), amount);
}

/**
 * Builds each door — a real panel, hinged on its left edge, closed until
 * the walker approaches (see updateDoors in Main.lifedeath.svelte). The
 * label lives on the panel so it swings with it. Mutates each `door`
 * object in place (`door.hinge = ...`), same as the rest of the app
 * already expects (see updateDoors/handleDoorClick), so callers keep
 * their existing `door.hinge`/`door.x`/`door.label` references.
 */
export function buildDoors(scene, doors, config) {
	const {
		doorWidth,
		doorHeight,
		doorZ,
		facadeThickness,
		doorZoneColors,
		doorZoneColorsLight,
		neonPink,
		doorGradientMap,
		toonGradientMap,
		brickFrontLocalZ,
		facadeLightLayer,
		// One {svg, width, height} entry per door label ("No"/"Unsure"/
		// "Yes") — width/height are pre-computed per label (see Main's own
		// DOOR_LABEL_ASSETS) so each keeps its own SVG's aspect ratio
		// (no.svg/unsure.svg/yes.svg are all different shapes) while still
		// landing at roughly the same visible footprint as the others.
		doorLabelAssets
	} = config;

	function buildDoor(door) {
		const hinge = new THREE.Group();
		hinge.position.set(door.x - doorWidth / 2, 0, doorZ);
		scene.add(hinge);

		const doorColorHex = doorZoneColors[door.label] ?? neonPink;
		const doorColorLightHex = doorZoneColorsLight[door.label] ?? neonPink;
		const baseColor = new THREE.Color(doorColorHex);

		// 1. The door's zone color for the main surface — MeshToonMaterial
		// with the same gradientMap/excludeDirectionalLights treatment as
		// the brick facade (see facade.js), so the panel takes on light and
		// casts/receives shadows the same way the brick does: lit only by
		// the nearby point lights (this door's own fixtureLight, the
		// facade's signLight), not the scene's directional keyLight/
		// fillLight. doorGradientMap adds the same top-lighter/bottom-
		// darker depth cue as the walls.
		const panelMaterial = new THREE.MeshToonMaterial({
			color: baseColor,
			map: doorGradientMap,
			gradientMap: toonGradientMap
		});
		panelMaterial.userData.outlineParameters = { visible: false };
		excludeDirectionalLights(panelMaterial);
		const panel = new THREE.Mesh(
			new THREE.BoxGeometry(doorWidth, doorHeight, facadeThickness),
			panelMaterial
		);
		panel.position.set(doorWidth / 2, doorHeight / 2, 0);
		panel.layers.set(facadeLightLayer);
		panel.castShadow = true;
		panel.receiveShadow = true;
		hinge.add(panel);

		// Everything below this point (label, hinge barrels, knob, lamp,
		// glow, light) sits on the door's OUTSIDE face — invisible from
		// inside a closed door anyway (see the FrontSide-only fix in
		// textPanel.js for the label specifically) — grouped together so
		// Main.lifedeath.svelte can hide the whole bundle in one toggle
		// once the walker's inside and this particular door's shut (see
		// door.exteriorFixtures), without touching the panel itself. A
		// child of hinge, not a sibling, so it still swings open with the
		// door instead of staying fixed in place.
		const doorFixtures = new THREE.Group();
		hinge.add(doorFixtures);

		// 2. Crisp Neon SVG label (no.svg/unsure.svg/yes.svg — see
		// doorLabelAssets)
		// depthBiasUnits stronger than the default (-4) — at a steep
		// enough viewing angle the facade sign above (see facade.js's
		// signGroup, scaled up for mobile legibility) can genuinely
		// overlap this label's own screen position with a real, closer
		// depth, winning the depth test and hiding the label — see
		// textPanel.js's own comment on depthBiasUnits for the full story.
		// This pulls the label enough further toward the camera to
		// reliably win that conflict without having to relocate either panel.
		const labelAsset = doorLabelAssets[door.label];
		const label = makeSvgNeonPanel(labelAsset.svg, {
			width: labelAsset.width,
			height: labelAsset.height,
			color: doorColorLightHex,
			glowColor: doorColorLightHex,
			depthBiasUnits: -20
		});
		// Starts dimmed (see DOOR_LABEL_DIM_BRIGHTNESS above); Main's
		// setHoveredDoor brightens it back up on hover, same pattern as the
		// facade sign links (see setFacadeSignHover) and the door panel's
		// own baseColor/panelMaterial brightening just above it.
		label.material[4].color.setScalar(DOOR_LABEL_DIM_BRIGHTNESS);
		// Comfortably in front of the panel's own front face (facadeThickness/2)
		// — nearby outlined hardware (the hinges/knob, and the brick just
		// past the door's edges) all cast PencilOutlineEffect's inflated-
		// backface hull, which grows with camera distance; a small gap
		// here wasn't always enough to keep that hull from poking through
		// the (outline-suppressed) label at typical viewing distances.
		label.position.set(doorWidth / 2, doorHeight * 0.62, facadeThickness / 2);
		doorFixtures.add(label);

		// 3. Hinges — three barrels along the door's pivot edge (x = 0 in
		// the hinge group's own local space, since the group's origin is
		// already the door's left/pivot edge), dark hardware like the lamp
		// bracket. Toon-shaded/shadowed the same as the panel (see above).
		const hingeMaterial = new THREE.MeshToonMaterial({
			color: 0x1a1a1a,
			gradientMap: toonGradientMap
		});
		excludeDirectionalLights(hingeMaterial);
		const hingeGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.32, 8);
		[0.12, 0.5, 0.88].forEach((heightFraction) => {
			const hingeBarrel = new THREE.Mesh(hingeGeo, hingeMaterial);
			hingeBarrel.position.set(0, doorHeight * heightFraction, facadeThickness / 2 + 0.02);
			hingeBarrel.layers.set(facadeLightLayer);
			// No castShadow: this close to fixtureLight, a piece this small
			// throws a shadow blob wildly out of proportion to its size —
			// reads as a shadow that doesn't match the light rather than
			// hardware detail. Still receives shadows normally.
			hingeBarrel.receiveShadow = true;
			doorFixtures.add(hingeBarrel);
		});

		// 4. Door knob — on the door's free edge (opposite the hinges), a
		// shade darker than the panel's own color so it reads as a
		// distinct fixture rather than disappearing into the door.
		const knobColor = lightenColor(baseColor, 0.07);
		const knobMaterial = new THREE.MeshToonMaterial({
			color: knobColor,
			gradientMap: toonGradientMap
		});
		excludeDirectionalLights(knobMaterial);
		const knobStem = new THREE.Mesh(
			new THREE.CylinderGeometry(0.04, 0.04, 0.14, 8),
			knobMaterial
		);
		knobStem.rotation.x = Math.PI / 2;
		knobStem.position.set(doorWidth - 0.35, doorHeight * 0.5, facadeThickness / 2 + 0.07);
		knobStem.layers.set(facadeLightLayer);
		// No castShadow here or on the knob below — same reasoning as the
		// hinges: a piece this small, this close to fixtureLight, casts a
		// shadow blob that reads as wrong rather than as hardware detail.
		doorFixtures.add(knobStem);
		const knob = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), knobMaterial);
		knob.position.set(doorWidth - 0.35, doorHeight * 0.5, facadeThickness / 2 + 0.17);
		knob.layers.set(facadeLightLayer);
		knob.receiveShadow = true;
		doorFixtures.add(knob);

		// Lamp fixture mounted above door
		const fixtureColor = lightenColor(doorColorLightHex, 0.4);
		const fixtureZ = brickFrontLocalZ + 0.25;
		const fixtureMaterial = new THREE.MeshBasicMaterial({ color: fixtureColor });

		const bracketMaterial = new THREE.MeshBasicMaterial({ color: fixtureColor });
		bracketMaterial.userData.outlineParameters = { visible: false };

		const bracketLength = fixtureZ - facadeThickness / 2;
		const bracket = new THREE.Mesh(
			new THREE.CylinderGeometry(0.025, 0.1, bracketLength, 6),
			bracketMaterial
		);
		const lightHeightAdjustment = 0.4;
		bracket.rotation.x = Math.PI / 2;
		bracket.position.set(
			doorWidth / 2,
			doorHeight + lightHeightAdjustment,
			facadeThickness / 2
		);
		doorFixtures.add(bracket);

		const fixture = new THREE.Mesh(new THREE.SphereGeometry(0.15, 12, 8), fixtureMaterial);
		fixture.position.set(doorWidth / 2, doorHeight + lightHeightAdjustment, fixtureZ);
		doorFixtures.add(fixture);

		// Point light on facade — now the only light source outside (see
		// Main, which dropped the old overhead exteriorFillLight), so its
		// distance/decay are tuned to actually reach across the plaza
		// instead of just the doorway. decay 2 (physically-correct
		// inverse-square) was still dropping off too fast to visibly light
		// (or shadow) debris more than a couple units out — decay 1 is the
		// same generous-throw trick the old exteriorFillLight's own
		// comment already used for this exact plaza distance.
		//
		// PointLightShadow derives its shadow camera's far plane straight
		// from this `distance` argument (near stays at the class's own
		// default, 0.5) — pushing distance up to 20 stretched the far/near
		// ratio from 6:1 to 40:1, tanking depth precision everywhere,
		// worst right at the source: the brick sits only ~0.25 units in
		// front of this light (fixtureZ), *closer than the default 0.5
		// near plane*, so it was being clipped out of the shadow map
		// entirely — that's what read as broken shadow artifacts right at
		// the doors/wall. 8 keeps a far/near ratio worth using while still
		// reaching well past the door; the near plane is pulled in far
		// enough to actually include that close-up brick.
		// Intensity bumped well past a "realistic" lamp (4 → 9) — with
		// this as the plaza's only light source, decay 1 still leaves a
		// lot of the wall/ground far enough from any one lamp that it was
		// reading as crushed black rather than dim. Distance/decay stay
		// put so the shadow camera's near/far ratio (see above) doesn't
		// regress back into acne.
		const fixtureLight = new THREE.PointLight(fixtureColor, 12, 30, .9);
		fixtureLight.position.set(doorWidth / 2, doorHeight + lightHeightAdjustment, fixtureZ);
		fixtureLight.layers.set(facadeLightLayer);
		fixtureLight.castShadow = true;
		fixtureLight.shadow.mapSize.set(1024, 1024);
		fixtureLight.shadow.camera.near = 0.05;
		fixtureLight.shadow.bias = -0.002;
		// Reduces acne on the door panel's own front face — the panel
		// sits close to this light (see keyLight.shadow.normalBias in
		// Main for the same fix applied to the brick facade's fine relief).
		fixtureLight.shadow.normalBias = 0.02;
		// How dark the shadows this light casts read (on the door panel,
		// the brick, the ground debris) — 0 would make them invisible,
		// 1 is full dark. Adjust this one value to lighten/darken them;
		// independent of the toon ramp's own lit/shadow contrast (Main's
		// [15, 215]), which applies to every toon-shaded surface in the
		// scene, not just what's in this light's shadow.
		fixtureLight.shadow.intensity = 0.5;
		doorFixtures.add(fixtureLight);

		// A soft, dim, warm-colored glow pool laid flat on the ground right
		// under the lamp — reads as its light spilling/pooling on the
		// pavement below. depthWrite false + additive blending keeps it
		// from z-fighting the floor/threshold beneath it.
		const reflectionMaterial = new THREE.MeshBasicMaterial({
			color: fixtureColor,
			transparent: true,
			opacity: 0.3,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			side: THREE.DoubleSide
		});
		reflectionMaterial.userData.outlineParameters = { visible: false };
		const reflectionGlow = new THREE.Mesh(
			new THREE.CircleGeometry(3, 28),
			reflectionMaterial
		);
		reflectionGlow.rotation.x = -Math.PI / 2;
		reflectionGlow.position.set(doorWidth / 2, 0.016, fixtureZ);
		doorFixtures.add(reflectionGlow);

		// A faint downward light cone connecting the lamp to its own
		// ground pool above — apex at the lamp, base matching the ground
		// glow's exact position/radius, so the beam visually terminates
		// right where the pool it's supposedly casting actually is.
		// ConeGeometry's default orientation is already apex-up/base-down,
		// so no rotation needed. Very transparent + additive so it reads
		// as a soft suggestion of a beam, not a solid shape.
		const lampY = doorHeight + lightHeightAdjustment;
		const groundGlowRadius = 3; // keep in sync with reflectionGlow's CircleGeometry radius above
		const groundGlowY = 0.016;
		const coneHeight = lampY - groundGlowY;
		const lightConeMaterial = new THREE.MeshBasicMaterial({
			color: fixtureColor,
			transparent: true,
			opacity: 0.05,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			side: THREE.DoubleSide
		});
		lightConeMaterial.userData.outlineParameters = { visible: false };
		const lightCone = new THREE.Mesh(
			new THREE.ConeGeometry(groundGlowRadius, coneHeight, 32, 1, true),
			lightConeMaterial
		);
		lightCone.position.set(doorWidth / 2, groundGlowY + coneHeight / 2, fixtureZ);
		doorFixtures.add(lightCone);

		// Floor threshold
		const thresholdMaterial = new THREE.MeshBasicMaterial({ color: "#1f021a" });
		thresholdMaterial.userData.outlineParameters = { visible: false };
		const threshold = new THREE.Mesh(
			new THREE.PlaneGeometry(doorWidth * 0.8, 0.3),
			thresholdMaterial
		);
		threshold.rotation.x = -Math.PI / 2;
		threshold.position.set(door.x, 0.02, doorZ);
		scene.add(threshold);

		door.hinge = hinge;
		hinge.userData.door = door;
		// Exposed for Main.lifedeath.svelte's own hover handling — brightens
		// the panel a bit while the pointer's over the door, same idea as
		// the facade signs' hover glow. panelMaterial.color starts as
		// baseColor and is never touched per-frame by anything else, so a
		// straightforward copy-then-multiply/copy-back round-trips cleanly.
		door.panelMaterial = panelMaterial;
		door.baseColor = baseColor;
		// Exposed for Main.lifedeath.svelte's own performance pass — hidden
		// once the walker's inside and this specific door is shut (see
		// doorFixtures' own comment above for why it's safe to hide: none
		// of this is visible from inside a closed door anyway).
		door.exteriorFixtures = doorFixtures;
		door.threshold = threshold;
		// Scaled by Main.lifedeath.svelte to stay legible across different
		// camera fovs (see its own textFovScale, applied the same way to
		// the facade's own signGroup).
		door.label = label;
	}

	doors.forEach(buildDoor);
}
