// one-time GLB prep: smooth geometry, bake leg shadow, pick clips
import * as THREE from "three";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// a one-frame clip of the bind pose, used when a model has no idle
function buildBindPoseClip(root, referenceClip) {
	const tracks = referenceClip.tracks.map((track) => {
		const dot = track.name.lastIndexOf(".");
		const node = root.getObjectByName(track.name.slice(0, dot));
		const value = node[track.name.slice(dot + 1)];
		const values =
			typeof value.toArray === "function" ? value.toArray() : [value];
		return new track.constructor(track.name, [0], values);
	});
	return new THREE.AnimationClip("BindPose", 1, tracks);
}

// a vertical brightness ramp, dark at the feet, baked into vertex colours
const LEG_SHADOW_MIN_BRIGHTNESS = 0;
const LEG_SHADOW_TOP_FRACTION = 2;
function bakeLegShadow(geometry) {
	geometry.computeBoundingBox();
	const minY = geometry.boundingBox.min.y;
	const maxY = geometry.boundingBox.max.y;
	const span = maxY - minY || 1;
	const position = geometry.attributes.position;
	const colors = new Float32Array(position.count * 3);
	for (let v = 0; v < position.count; v++) {
		const t = Math.min(
			1,
			Math.max(0, (position.getY(v) - minY) / span / LEG_SHADOW_TOP_FRACTION)
		);
		const eased = t * t * (3 - 2 * t); // smoothstep
		const brightness =
			LEG_SHADOW_MIN_BRIGHTNESS + (1 - LEG_SHADOW_MIN_BRIGHTNESS) * eased;
		colors[v * 3] = brightness;
		colors[v * 3 + 1] = brightness;
		colors[v * 3 + 2] = brightness;
	}
	geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
}

export function prepareModel(gltf) {
	gltf.scene.traverse((node) => {
		if (node.isMesh) {
			node.geometry.deleteAttribute("normal");
			node.geometry.deleteAttribute("uv");
			node.geometry = mergeVertices(node.geometry);
			node.geometry.computeVertexNormals();
			bakeLegShadow(node.geometry);
		}
	});
	const walkClip =
		gltf.animations.find((a) => a.name === "Walk") ?? gltf.animations[0];
	// real clips ship with the bodies; the bind pose is the fallback
	const idleClip =
		gltf.animations.find((a) => a.name === "Idle") ??
		(walkClip && buildBindPoseClip(gltf.scene, walkClip));
	const armsCrossedClip = idleClip;
	return { scene: gltf.scene, walkClip, idleClip, armsCrossedClip };
}
