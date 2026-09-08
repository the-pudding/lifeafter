import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";

// one body per respondent, plus the shared shadow mesh
export function spawnCrowd(innerRoomGroup, respondents, config) {
	const { toonGradientMap, outlineDefaultThickness, shadowRadius, pickModelForPerson } = config;

	// parallel arrays, indexed like `respondents`
	const personRoots = new Array(respondents.length);
	const personBodyMaterials = new Array(respondents.length);
	const personMixers = new Array(respondents.length);
	const personWalkActions = new Array(respondents.length);
	const personRestActions = new Array(respondents.length);

	// the true colour, kept apart so lod darkening can't compound
	const personBaseColors = new Array(respondents.length);
	const personSkinMaterials = new Array(respondents.length);

	respondents.forEach((person, i) => {
		const model = pickModelForPerson(person);
		const instance = cloneSkinned(model.scene);
		// skin and hair stay black; the outfit tints as one material
		const neutralMaterial = new THREE.MeshToonMaterial({
			color: 0x000000,
			gradientMap: toonGradientMap,
			flatShading: true,
			vertexColors: true
		});
		const outfitMaterial = new THREE.MeshToonMaterial({
			gradientMap: toonGradientMap,
			flatShading: true,
			vertexColors: true
		});
		// mutated in place, to avoid thousands of allocations a frame
		neutralMaterial.userData.outlineParameters = { thickness: outlineDefaultThickness };
		outfitMaterial.userData.outlineParameters = { thickness: outlineDefaultThickness };
		instance.traverse((node) => {
			if (node.isMesh) {
				const originalName = node.material.name;
				node.material =
					originalName === "Body_skin" || originalName === "Hair"
						? neutralMaterial
						: outfitMaterial;
			}
		});
		personBodyMaterials[i] = outfitMaterial;
		personSkinMaterials[i] = neutralMaterial;
		personBaseColors[i] = new THREE.Color();
		innerRoomGroup.add(instance);
		personRoots[i] = instance;
		// read by the click raycast, walking up from the mesh it hit
		instance.userData.personIndex = i;

		if (model.walkClip) {
			const mixer = new THREE.AnimationMixer(instance);

			const walkAction = mixer.clipAction(model.walkClip);
			walkAction.play();

			// idle loop, cross-faded in as they slow so they don't freeze mid-stride
			const restAction = mixer.clipAction(
				person.__armsCrossed ? model.armsCrossedClip : model.idleClip
			);
			restAction.play();

			// staggered, so the crowd isn't in lockstep
			mixer.update(person.__animOffsetFraction * model.walkClip.duration);

			personMixers[i] = mixer;
			personWalkActions[i] = walkAction;
			personRestActions[i] = restAction;
		}
	});

	// an opaque disc; transparent would darken where two shadows overlap
	const shadowGeometry = new THREE.CircleGeometry(shadowRadius, 8);
	// unlit, so it reads the same under any light
	const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	// or the outline pass rings the disc
	shadowMaterial.userData.outlineParameters = { visible: false };
	const shadows = new THREE.InstancedMesh(shadowGeometry, shadowMaterial, respondents.length);
	innerRoomGroup.add(shadows);

	// scratch object, to avoid allocating each frame
	const placementHelper = new THREE.Object3D();
	// lies the disc flat, since circles face +z by default
	const flatRotation = new THREE.Quaternion().setFromEuler(
		new THREE.Euler(-Math.PI / 2, 0, 0)
	);

	return {
		personRoots,
		personBodyMaterials,
		personSkinMaterials,
		personBaseColors,
		personMixers,
		personWalkActions,
		personRestActions,
		shadows,
		placementHelper,
		flatRotation
	};
}
