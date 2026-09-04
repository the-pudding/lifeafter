import * as THREE from "three";
import { makeSvgNeonPanel } from "../utilities/textPanel.js";
import { excludeDirectionalLights } from "./facade.js";

// default (unhovered) brightness multiplier for each door's own label.
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
 * builds each door.
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
		// one {svg, width, height} entry per door label ("No"/"Unsure"/ "Yes").
		doorLabelAssets
	} = config;

	function buildDoor(door) {
		const hinge = new THREE.Group();
		hinge.position.set(door.x - doorWidth / 2, 0, doorZ);
		scene.add(hinge);

		const doorColorHex = doorZoneColors[door.label] ?? neonPink;
		const doorColorLightHex = doorZoneColorsLight[door.label] ?? neonPink;
		const baseColor = new THREE.Color(doorColorHex);

		// 1.
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

		// everything below this point (label, hinge barrels, knob, lamp, glow,
		// light) sits on the door's OUTSIDE face.
		const doorFixtures = new THREE.Group();
		hinge.add(doorFixtures);

		// 2.
		const labelAsset = doorLabelAssets[door.label];
		const label = makeSvgNeonPanel(labelAsset.svg, {
			width: labelAsset.width,
			height: labelAsset.height,
			color: doorColorLightHex,
			glowColor: doorColorLightHex,
			depthBiasUnits: -20
		});
		// starts dimmed (see DOOR_LABEL_DIM_BRIGHTNESS above); Main's
		// setHoveredDoor brightens it back up on hover, same pattern as the
		// facade sign links (see setFacadeSignHover) and the door panel's
		// own baseColor/panelMaterial brightening just above it.
		label.material[4].color.setScalar(DOOR_LABEL_DIM_BRIGHTNESS);
		// comfortably in front of the panel's own front face (facadeThickness/2).
		// sits above the knob (doorHeight * 0.5, x near the free edge): the
		// two-line label is wide enough to reach it, unlike no/yes
		label.position.set(doorWidth / 2, doorHeight * 0.76, facadeThickness / 2);
		doorFixtures.add(label);

		// 3. hinges — three barrels along the door's pivot edge (x = 0 in
		// the hinge group's own local space, since the group's origin is
		// already the door's left/pivot edge), dark hardware like the lamp
		// bracket. toon-shaded/shadowed the same as the panel (see above).
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
			// no castShadow: this close to fixtureLight, a piece this small
			// throws a shadow blob wildly out of proportion to its size —
			// reads as a shadow that doesn't match the light rather than
			// hardware detail. still receives shadows normally.
			hingeBarrel.receiveShadow = true;
			doorFixtures.add(hingeBarrel);
		});

		// 4. door knob — on the door's free edge (opposite the hinges), a
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
		// no castShadow here or on the knob below — same reasoning as the
		// hinges: a piece this small, this close to fixtureLight, casts a
		// shadow blob that reads as wrong rather than as hardware detail.
		doorFixtures.add(knobStem);
		const knob = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), knobMaterial);
		knob.position.set(doorWidth - 0.35, doorHeight * 0.5, facadeThickness / 2 + 0.17);
		knob.layers.set(facadeLightLayer);
		knob.receiveShadow = true;
		doorFixtures.add(knob);

		// lamp fixture above the door
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

		// point light on facade.
		const fixtureLight = new THREE.PointLight(fixtureColor, 12, 30, .9);
		fixtureLight.position.set(doorWidth / 2, doorHeight + lightHeightAdjustment, fixtureZ);
		fixtureLight.layers.set(facadeLightLayer);
		fixtureLight.castShadow = true;
		fixtureLight.shadow.mapSize.set(1024, 1024);
		fixtureLight.shadow.camera.near = 0.05;
		fixtureLight.shadow.bias = -0.002;
		// reduces acne on the door panel's own front face — the panel
		// sits close to this light (see keyLight.shadow.normalBias in
		// Main for the same fix applied to the brick facade's fine relief).
		fixtureLight.shadow.normalBias = 0.02;
		// how dark the shadows this light casts read (on the door panel, the brick,
		// the ground debris).
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

		// A faint downward light cone connecting the lamp to its own ground pool
		// above.
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

		// floor threshold under the door
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
		// exposed for Main.lifedeath.svelte's own hover handling.
		door.panelMaterial = panelMaterial;
		door.baseColor = baseColor;
		// exposed for Main.lifedeath.svelte's own performance pass — hidden
		// once the walker's inside and this specific door is shut (see
		// doorFixtures' own comment above for why it's safe to hide: none
		// of this is visible from inside a closed door anyway).
		door.exteriorFixtures = doorFixtures;
		door.threshold = threshold;
		// scaled by Main.lifedeath.svelte to stay legible across different
		// camera fovs (see its own textFovScale, applied the same way to
		// the facade's own signGroup).
		door.label = label;
	}

	doors.forEach(buildDoor);
}
