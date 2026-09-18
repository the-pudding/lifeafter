import * as THREE from "three";

// floating dust motes: a small wrapped volume of drifting points that
// follows the walker, tinted faint pink/purple and lit near the sconces
export function createDust(scene, { ageToZ, zToAgeExact, ageMin, ageMax }) {
	const COUNT = 700;
	const BOX = { x: 30, y: 9, z: 44 };
	const TINT = [0.7, 0.58, 0.74];
	const baseX = new Float32Array(COUNT);
	const baseY = new Float32Array(COUNT);
	const baseZ = new Float32Array(COUNT);
	const phase = new Float32Array(COUNT);
	const fall = new Float32Array(COUNT);
	for (let i = 0; i < COUNT; i++) {
		baseX[i] = (Math.random() - 0.5) * BOX.x;
		baseY[i] = Math.random() * BOX.y;
		baseZ[i] = (Math.random() - 0.5) * BOX.z;
		phase[i] = Math.random() * Math.PI * 2;
		// each mote settles at its own unhurried pace
		fall[i] = 0.05 + Math.random() * 0.1;
	}

	const canvas = document.createElement("canvas");
	canvas.width = 32;
	canvas.height = 32;
	const ctx = canvas.getContext("2d");
	const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
	gradient.addColorStop(0, "rgba(252, 240, 252, 1)");
	gradient.addColorStop(0.4, "rgba(252, 240, 252, 0.45)");
	gradient.addColorStop(1, "rgba(252, 240, 252, 0)");
	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, 32, 32);

	const positions = new Float32Array(COUNT * 3);
	const colors = new Float32Array(COUNT * 3);
	const geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		"position",
		new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
	);
	geometry.setAttribute(
		"color",
		new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
	);
	const material = new THREE.PointsMaterial({
		map: new THREE.CanvasTexture(canvas),
		vertexColors: true,
		size: 0.042,
		sizeAttenuation: true,
		transparent: true,
		opacity: 0.4,
		depthWrite: false,
		blending: THREE.AdditiveBlending
	});
	material.userData.outlineParameters = { visible: false };
	const points = new THREE.Points(geometry, material);
	points.frustumCulled = false;
	scene.add(points);

	let time = 0;
	// keeps a coordinate within half a box span of the walker
	function wrap(value, center, span) {
		let d = (value - center) % span;
		if (d < -span / 2) d += span;
		if (d > span / 2) d -= span;
		return center + d;
	}

	// glowX/glowY: where the sconce globes sit, so motes can catch the light
	function update(dt, walkX, walkZ, glowX, glowY) {
		time += dt;
		for (let i = 0; i < COUNT; i++) {
			let y = (baseY[i] - time * fall[i]) % BOX.y;
			if (y < 0) y += BOX.y;
			y += 0.15;
			const sway = Math.sin(time * 0.13 + phase[i]);
			const drift = Math.cos(time * 0.09 + phase[i] * 1.7);
			const x = wrap(baseX[i] + sway * 0.6, walkX, BOX.x);
			const z = wrap(baseZ[i] + drift * 0.6, walkZ, BOX.z);
			positions[i * 3] = x;
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = z;
			// brightness from the nearest sconce, one per age line on each wall
			let lit = 0.4;
			const age = Math.round(zToAgeExact(z));
			if (age >= ageMin && age <= ageMax) {
				const dx = Math.abs(x) - glowX;
				const dy = y - glowY;
				const dz = z - ageToZ(age);
				lit += 2.6 / (1 + (dx * dx + dy * dy + dz * dz) * 0.35);
			}
			if (lit > 3) lit = 3;
			colors[i * 3] = TINT[0] * lit;
			colors[i * 3 + 1] = TINT[1] * lit;
			colors[i * 3 + 2] = TINT[2] * lit;
		}
		geometry.attributes.position.needsUpdate = true;
		geometry.attributes.color.needsUpdate = true;
	}

	return { update };
}
