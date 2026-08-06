import * as THREE from "three";
import { clone as cloneSkinned } from "three/examples/jsm/utils/SkeletonUtils.js";

/**
 * Spawns one body clone per respondent — each their own independent
 * skeleton + outfit material (so Main.lifedeath.svelte's
 * applyColorVariable can tint each separately), matching their own
 * GENDER (see `pickModelForPerson`, still owned by Main since it's part
 * of the earlier GLB-loading phase, not scene-building) — plus the
 * crowd's shared blob-shadow InstancedMesh. Returns the parallel
 * per-person arrays/handles Main's own per-frame updatePeoplePositions
 * (which stays in Main — this is only the one-time spawn, not the
 * per-frame animation) reads and mutates every frame.
 */
export function spawnCrowd(innerRoomGroup, respondents, config) {
	const { toonGradientMap, outlineDefaultThickness, shadowRadius, pickModelForPerson } = config;

	// Parallel arrays, indexed like `respondents`.
	const personRoots = new Array(respondents.length);
	const personBodyMaterials = new Array(respondents.length);
	const personMixers = new Array(respondents.length);
	const personWalkActions = new Array(respondents.length);
	const personRestActions = new Array(respondents.length);

	// This person's own true color at full resolution (set by
	// applyColorVariable) — the per-frame LOD pass in
	// updatePeoplePositions reads this every frame and writes a
	// distance-darkened version into the material's actual .color, so
	// the stable reference never itself gets darkened (which would
	// otherwise compound every frame).
	const personBaseColors = new Array(respondents.length);
	const personSkinMaterials = new Array(respondents.length);

	respondents.forEach((person, i) => {
		const model = pickModelForPerson(person);
		const instance = cloneSkinned(model.scene);
		// These GLBs separate skin/shirt/pants/shoes/hair into real
		// sub-meshes (by material name) — skin and hair stay a neutral
		// black, matching the original silhouette look; shirt/pants/shoes
		// all get the same per-person outfit material (not shared across
		// people) so applyColorVariable can tint the whole outfit as one
		// unit. The black outline around each part is drawn by
		// OutlineEffect (see effect.render in Main).
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
		// Created once per person and mutated in place every frame (see
		// updatePeoplePositions) rather than replaced — with ~2,500
		// people, allocating a fresh object here every frame for both
		// materials was 5,000 extra small allocations/frame for no reason.
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
		// Read back by handlePersonClick's raycast hit, which walks up
		// from whatever sub-mesh it actually hit to find this.
		instance.userData.personIndex = i;

		if (model.walkClip) {
			const mixer = new THREE.AnimationMixer(instance);

			const walkAction = mixer.clipAction(model.walkClip);
			walkAction.play();

			// A real looping Idle clip, cross-faded in by weight as this
			// person slows to a stop, so they settle toward a natural
			// standing animation instead of freezing mid-stride. Only a
			// minority get ArmsCrossed instead (see person.__armsCrossed).
			const restAction = mixer.clipAction(
				person.__armsCrossed ? model.armsCrossedClip : model.idleClip
			);
			restAction.play();

			// Stagger each person's starting pose so the crowd doesn't
			// all step (or idle) in lockstep.
			mixer.update(person.__animOffsetFraction * model.walkClip.duration);

			personMixers[i] = mixer;
			personWalkActions[i] = walkAction;
			personRestActions[i] = restAction;
		}
	});

	// A flat, opaque disc for the blob shadow — a plain low-segment
	// circle, solid-filled, no gradient and no alpha blending (a
	// transparent disc would visibly darken wherever two people's
	// shadows overlap, which reads as a soft gradient even though each
	// individual disc is a flat color). Opaque is both simpler and cheaper.
	const shadowGeometry = new THREE.CircleGeometry(shadowRadius, 8);
	// Unlit flat tone, so it reads the same regardless of doorway light.
	const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
	// OutlineEffect would otherwise draw its usual inflated black
	// backface ring around this disc's edge too — on a flat ground shadow
	// that just reads as a soft rim/gradient around an otherwise flat
	// fill, which is exactly what we don't want here.
	shadowMaterial.userData.outlineParameters = { visible: false };
	const shadows = new THREE.InstancedMesh(shadowGeometry, shadowMaterial, respondents.length);
	innerRoomGroup.add(shadows);

	// Reused scratch object for the shadow's position -> matrix math,
	// avoiding a per-frame allocation.
	const placementHelper = new THREE.Object3D();
	// Lies a shadow disc flat on the floor (circles face +Z by default).
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
