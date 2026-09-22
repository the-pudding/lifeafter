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

	// the walker's wake: per-mote displacement, pushed while passing,
	// relaxing back once the air settles
	const offsetX = new Float32Array(COUNT);
	const offsetZ = new Float32Array(COUNT);
	let prevWalkX = null;
	let prevWalkZ = null;
	const WAKE_RADIUS = 3.2;
	// the wake sits at body height, not the ceiling
	const WAKE_HEIGHT = 1.6;
	const WAKE_PUSH = 0.25;
	const WAKE_MAX = 1.3;
	const WAKE_SETTLE_TIME = 1.1;

	// glowX/glowY: where the sconce globes sit, so motes can catch the light
	// tremor (0..1): the music's vibrato, a faint sideways shiver — never
	// vertical, so the fall stays a fall
	function update(dt, walkX, walkZ, glowX, glowY, tremor = 0) {
		time += dt;
		const shiverAmp = tremor * 0.015;

		// the walker's wake, from their velocity this frame
		let velX = 0;
		let velZ = 0;
		if (prevWalkX !== null && dt > 0) {
			velX = (walkX - prevWalkX) / dt;
			velZ = (walkZ - prevWalkZ) / dt;
		}
		prevWalkX = walkX;
		prevWalkZ = walkZ;
		const speed = Math.sqrt(velX * velX + velZ * velZ);
		const wakeOn = speed > 0.5;
		const wakeDecay = Math.exp(-dt / WAKE_SETTLE_TIME);

		for (let i = 0; i < COUNT; i++) {
			let y = (baseY[i] - time * fall[i]) % BOX.y;
			if (y < 0) y += BOX.y;
			y += 0.15;
			const sway = Math.sin(time * 0.13 + phase[i]);
			const drift = Math.cos(time * 0.09 + phase[i] * 1.7);
			const shiverX =
				shiverAmp > 0.0003 ? Math.sin(time * 41 + phase[i] * 5.3) * shiverAmp : 0;
			const x = wrap(baseX[i] + sway * 0.6 + shiverX, walkX, BOX.x);
			const z = wrap(baseZ[i] + drift * 0.6, walkZ, BOX.z);

			// passing pushes nearby motes outward — sideways only, so the
			// air parts without lifting anything
			if (wakeOn) {
				const dx = x - walkX;
				const dz = z - walkZ;
				const dy = (y - WAKE_HEIGHT) * 0.8;
				const distSq = dx * dx + dz * dz + dy * dy;
				if (distSq < WAKE_RADIUS * WAKE_RADIUS) {
					const dist = Math.sqrt(distSq) || 0.001;
					const falloff = 1 - dist / WAKE_RADIUS;
					const push = Math.min(speed, 14) * falloff * falloff * dt * WAKE_PUSH;
					offsetX[i] += (dx / dist) * push;
					offsetZ[i] += (dz / dist) * push;
				}
			}
			offsetX[i] *= wakeDecay;
			offsetZ[i] *= wakeDecay;
			if (offsetX[i] > WAKE_MAX) offsetX[i] = WAKE_MAX;
			else if (offsetX[i] < -WAKE_MAX) offsetX[i] = -WAKE_MAX;
			if (offsetZ[i] > WAKE_MAX) offsetZ[i] = WAKE_MAX;
			else if (offsetZ[i] < -WAKE_MAX) offsetZ[i] = -WAKE_MAX;

			positions[i * 3] = x + offsetX[i];
			positions[i * 3 + 1] = y;
			positions[i * 3 + 2] = z + offsetZ[i];
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
