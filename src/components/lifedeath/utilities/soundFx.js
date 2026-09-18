// the synthesized sounds: door chord, click, per-person tones and the walk
// wind. all voiced in the tones both scores share (Sunday is C major,
// Monday E minor), so everything harmonizes with either
export function createSoundFx({ getAudioOn, getFocusFade }) {
	let audioContext = null;

	// creates the context on first need, resuming it if the browser slept it
	function ensureContext() {
		audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
		if (audioContext.state === "suspended") audioContext.resume();
		return audioContext;
	}

	// a long airy reverb tail shared by every effect, built once
	let reverbNode = null;
	function reverb() {
		if (reverbNode) return reverbNode;
		const seconds = 3.2;
		const rate = audioContext.sampleRate;
		const frames = Math.floor(rate * seconds);
		const impulse = audioContext.createBuffer(2, frames, rate);
		for (let ch = 0; ch < 2; ch++) {
			const samples = impulse.getChannelData(ch);
			for (let i = 0; i < frames; i++) {
				samples[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / frames, 2.2);
			}
		}
		const convolver = audioContext.createConvolver();
		convolver.buffer = impulse;
		const wet = audioContext.createGain();
		wet.gain.value = 0.9;
		convolver.connect(wet).connect(audioContext.destination);
		reverbNode = convolver;
		return convolver;
	}

	// one enveloped sine into the reverb and the dry output
	function tone(freq, level, attack, decay, stop, start) {
		const osc = audioContext.createOscillator();
		const gain = audioContext.createGain();
		osc.type = "sine";
		osc.frequency.setValueAtTime(freq, start);
		gain.gain.setValueAtTime(0.0001, start);
		gain.gain.exponentialRampToValueAtTime(level, start + attack);
		gain.gain.exponentialRampToValueAtTime(0.0001, start + decay);
		osc.connect(gain);
		gain.connect(reverb());
		gain.connect(audioContext.destination);
		osc.start(start);
		osc.stop(start + stop);
		return osc;
	}

	// crossing a door: a soft chord that swells and hangs, more breath than thunk
	function playDoorSound() {
		if (!getAudioOn()) return;
		try {
			ensureContext();
			const start = audioContext.currentTime;
			// an open fifth plus octave, each voice drifting a few cents
			for (const [freq, level, drift] of [
				[329.63, 0.05, 5],
				[493.88, 0.038, -4],
				[659.25, 0.022, 7]
			]) {
				const osc = tone(freq, level, 0.18, 2.4, 2.5, start);
				osc.detune.setValueAtTime(0, start);
				osc.detune.linearRampToValueAtTime(drift, start + 2.2);
			}
			// a faint high breath under the chord
			const frames = Math.floor(audioContext.sampleRate * 1.2);
			const buffer = audioContext.createBuffer(1, frames, audioContext.sampleRate);
			const samples = buffer.getChannelData(0);
			for (let i = 0; i < frames; i++) {
				samples[i] = (Math.random() * 2 - 1) * (1 - i / frames);
			}
			const breath = audioContext.createBufferSource();
			breath.buffer = buffer;
			const filter = audioContext.createBiquadFilter();
			filter.type = "bandpass";
			filter.frequency.value = 2800;
			filter.Q.value = 0.8;
			const breathGain = audioContext.createGain();
			breathGain.gain.setValueAtTime(0.0001, start);
			breathGain.gain.exponentialRampToValueAtTime(0.02, start + 0.25);
			breathGain.gain.exponentialRampToValueAtTime(0.0001, start + 1.1);
			breath.connect(filter).connect(breathGain).connect(reverb());
			breath.start(start);
		} catch {
			// no audio available, so the door opens quietly
		}
	}

	// a glassy ping for clicks that rings out through the reverb
	const CLICK_VOLUME = 0.045;
	function playClick() {
		if (!getAudioOn()) return;
		try {
			ensureContext();
			const start = audioContext.currentTime;
			tone(1318.5, CLICK_VOLUME, 0.008, 0.75, 0.8, start);
			tone(2637.0, CLICK_VOLUME * 0.35, 0.008, 0.75, 0.8, start);
		} catch {
			// no audio available, so the click stays silent
		}
	}

	// each person answers a click with their own note, kept high
	const PERSON_TONES = [659.25, 783.99, 880.0, 987.77, 1046.5, 1318.5, 1567.98, 1975.53];
	const PERSON_TONE_VOLUME = 0.06;
	function playPersonTone(index) {
		if (!getAudioOn()) return;
		try {
			ensureContext();
			const start = audioContext.currentTime;
			// deterministic: the same person always sounds the same note
			const freq = PERSON_TONES[Math.abs(index * 7) % PERSON_TONES.length];
			tone(freq, PERSON_TONE_VOLUME, 0.012, 1.3, 1.4, start);
			tone(freq * 2, PERSON_TONE_VOLUME * 0.28, 0.012, 1.3, 1.4, start);
		} catch {
			// no audio available, so the person stays silent
		}
	}

	// the walk wind: a looping noise bed whose loudness and brightness
	// follow the camera's ground speed, whatever the direction
	const WIND_MAX_GAIN = 0.32;
	const WIND_FULL_SPEED = 18;
	let windNodes = null;
	let windLevel = 0;
	let windPrevX = null;
	let windPrevZ = null;
	function ensureWind() {
		if (windNodes || !audioContext) return;
		const frames = audioContext.sampleRate * 2;
		const buffer = audioContext.createBuffer(1, frames, audioContext.sampleRate);
		const samples = buffer.getChannelData(0);
		// heavily smoothed noise: dark and soft, no hiss to begin with
		let last = 0;
		for (let i = 0; i < frames; i++) {
			last = last * 0.985 + (Math.random() * 2 - 1) * 0.015;
			samples[i] = last * 18;
		}
		const source = audioContext.createBufferSource();
		source.buffer = buffer;
		source.loop = true;
		// a deep hollow band plus a low roof: bass-forward, like breath
		const filter = audioContext.createBiquadFilter();
		filter.type = "bandpass";
		filter.frequency.value = 120;
		filter.Q.value = 1.6;
		const roof = audioContext.createBiquadFilter();
		roof.type = "lowpass";
		roof.frequency.value = 520;
		const gain = audioContext.createGain();
		gain.gain.value = 0;
		// a slow swell under the level, so it breathes rather than hisses
		const lfo = audioContext.createOscillator();
		lfo.frequency.value = 0.23;
		const lfoDepth = audioContext.createGain();
		lfoDepth.gain.value = 0;
		lfo.connect(lfoDepth).connect(gain.gain);
		lfo.start();
		source.connect(filter).connect(roof).connect(gain).connect(audioContext.destination);
		source.start();
		windNodes = { filter, gain, lfoDepth };
	}
	function updateWind(dt, walkX, walkZ) {
		if (!getAudioOn() || !audioContext) {
			if (windNodes) windNodes.gain.gain.value = 0;
			windPrevX = walkX;
			windPrevZ = walkZ;
			return;
		}
		ensureWind();
		if (!windNodes) return;
		const dx = windPrevX === null ? 0 : walkX - windPrevX;
		const dz = windPrevZ === null ? 0 : walkZ - windPrevZ;
		windPrevX = walkX;
		windPrevZ = walkZ;
		const speed = dt > 0 ? Math.sqrt(dx * dx + dz * dz) / dt : 0;
		const target = Math.min(1, speed / WIND_FULL_SPEED);
		// quick to gust, slower to die down
		const ease = target > windLevel ? dt * 7 : dt * 2.2;
		windLevel += (target - windLevel) * Math.min(1, ease);
		const base = WIND_MAX_GAIN * windLevel * windLevel * getFocusFade();
		windNodes.gain.gain.value = base;
		windNodes.lfoDepth.gain.value = base * 0.3;
		windNodes.filter.frequency.value = 100 + 200 * windLevel;
	}

	return {
		ensureContext,
		// null until something has needed audio
		context: () => audioContext,
		playDoorSound,
		playClick,
		playPersonTone,
		updateWind
	};
}
