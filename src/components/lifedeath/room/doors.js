import * as THREE from "three";
import { makeSvgNeonPanel } from "../utilities/textPanel.js";
import { excludeDirectionalLights } from "./facade.js";

// brightness of a door label before it's hovered
export const DOOR_LABEL_DIM_BRIGHTNESS = 0.65;

// lightens a colour, for the fixtures' hot core
function lightenColor(input, amount) {
	return new THREE.Color(input).lerp(new THREE.Color(0xffffff), amount);
}

// darkens a colour, so the knob reads against its own door
function darkenColor(input, amount) {
	return new THREE.Color(input).lerp(new THREE.Color(0x000000), amount);
}

// builds each door
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
		// one sized svg per door label
		doorLabelAssets
	} = config;

	function buildDoor(door) {
		const hinge = new THREE.Group();
		hinge.position.set(door.x - doorWidth / 2, 0, doorZ);
		scene.add(hinge);

		const doorColorHex = doorZoneColors[door.label] ?? neonPink;
		const doorColorLightHex = doorZoneColorsLight[door.label] ?? neonPink;
		const baseColor = new THREE.Color(doorColorHex);

		// the panel
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

		// everything below sits on the door's outside face
		const doorFixtures = new THREE.Group();
		hinge.add(doorFixtures);

		// the label
		const labelAsset = doorLabelAssets[door.label];
		const label = makeSvgNeonPanel(labelAsset.svg, {
			width: labelAsset.width,
			height: labelAsset.height,
			color: doorColorLightHex,
			glowColor: doorColorLightHex,
			depthBiasUnits: -20
		});
		// starts dimmed; main lights it on hover
		label.material[4].color.setScalar(DOOR_LABEL_DIM_BRIGHTNESS);
		// in front of the panel, and above the knob the wide label would reach
		label.position.set(doorWidth / 2, doorHeight * 0.76, facadeThickness / 2);
		doorFixtures.add(label);

		// hinges: three barrels along the pivot edge
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
			// casts no shadow: this close to the lamp it would be out of scale
			hingeBarrel.receiveShadow = true;
			doorFixtures.add(hingeBarrel);
		});

		// the knob, on the free edge opposite the hinges
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
		// no shadow, for the same reason as the hinges
		doorFixtures.add(knobStem);
		const knob = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), knobMaterial);
		knob.position.set(doorWidth - 0.35, doorHeight * 0.5, facadeThickness / 2 + 0.17);
		knob.layers.set(facadeLightLayer);
		knob.receiveShadow = true;
		doorFixtures.add(knob);

		// the lamp above the door
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

		// the lamp's own light, on the facade layer
		const fixtureLight = new THREE.PointLight(fixtureColor, 12, 30, .9);
		fixtureLight.position.set(doorWidth / 2, doorHeight + lightHeightAdjustment, fixtureZ);
		fixtureLight.layers.set(facadeLightLayer);
		fixtureLight.castShadow = true;
		fixtureLight.shadow.mapSize.set(1024, 1024);
		fixtureLight.shadow.camera.near = 0.05;
		fixtureLight.shadow.bias = -0.002;
		// keeps shadow acne off the panel, which sits close to this light
		fixtureLight.shadow.normalBias = 0.02;
		// how dark this light's shadows read
		fixtureLight.shadow.intensity = 0.5;
		doorFixtures.add(fixtureLight);

		// the lamp's pool of light on the ground, additive so it can't z-fight
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

		// a faint cone joining the lamp to its pool
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

		// the threshold under the door
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
		// exposed for main's hover handling
		door.panelMaterial = panelMaterial;
		door.baseColor = baseColor;
		// hidden once the walker is inside and this door is shut
		door.exteriorFixtures = doorFixtures;
		door.threshold = threshold;
		// scaled by main to stay legible across camera fovs
		door.label = label;
	}

	doors.forEach(buildDoor);
}
