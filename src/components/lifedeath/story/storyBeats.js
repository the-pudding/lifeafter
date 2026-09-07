import { ZONE_WIDTH } from "../room/roomConfig.js";

// wave to revert to when no beat names one
const DEFAULT_WAVE = "Y1";

/**
 * copy.json narration: which beats are active for the walker's age and
 * position, plus the flags a beat can set (hide panel/minimap, hop the
 * minimap, force a variable/wave).
 *
 * getters/setters because it reads live walker state and writes Svelte
 * state Main owns. onUpdate delivers everything in one batch per frame.
 */
/**
 * Marks where the audio toggle goes in a beat's text. copy.json is
 * regenerated from a Google Doc (`npm run gdoc`), so anything written into
 * the file by hand is lost on the next fetch — the opening beat gets this
 * injected below instead of carrying it. Writing {{audio}} into the doc
 * still works, and wins: the injection only fires when it's absent.
 */
export const STORY_AUDIO_TOKEN = "{{audio}}";

const STORY_AUDIO_MARKUP = `<div class="hints audio">${STORY_AUDIO_TOKEN}</div>`;

export function createStoryBeats({
	copy,
	getCurrentAge,
	getRenderWalkX,
	getSelectedVariable,
	setSelectedVariable,
	getPositionMode,
	setPositionMode,
	onUpdate
}) {
	// which third of the room the walker is in
	function currentZoneKey() {
		const x = getRenderWalkX();
		if (x < -ZONE_WIDTH / 2) return "no";
		if (x > ZONE_WIDTH / 2) return "yes";
		return "unsure";
	}

	// last entry to set variable/wave, by identity — fires once on entry,
	// not every frame in range
	let lastAppliedStoryVariableEntry = null;
	// what it wrote, so the revert can tell story-set from walker-set
	let lastStoryAssignedVariable = null;
	let lastStoryAssignedWave = null;

	function clearLatches() {
		lastAppliedStoryVariableEntry = null;
		lastStoryAssignedVariable = null;
		lastStoryAssignedWave = null;
	}

	// the opening beat, by identity — the first shared entry that actually
	// renders a box. flag-only entries above it don't count
	const firstTextEntry = (copy.all ?? []).find((entry) => entry.text?.trim());

	// active beats: matching "all" entries plus the walker's zone.
	// applies the first entry's var_color/wave
	function update() {
		const currentAge = getCurrentAge();
		if (currentAge === null) {
			clearLatches();
			onUpdate({
				texts: [],
				hidePanel: false,
				hideMap: false,
				highlightMap: false,
				hideYear: false,
				hasBeat: false,
				narrationId: null
			});
			return;
		}

		const zoneKey = currentZoneKey();
		const matches = [];
		let matchedHidePanel = false;
		let matchedHideMap = false;
		let matchedHighlightMap = false;
		let matchedHideYear = false;
		let matchedAny = false;
		let matchedVariableEntry = null;
		// the first matching entry that has one; its {id}.mp3 narrates the beat
		let matchedNarrationId = null;
		// flags arrive as "true" from the exported spreadsheet
		const isFlagSet = (value) => value === "true" || value === true;
		const collect = (entries) => {
			for (const entry of entries ?? []) {
				if (currentAge >= Number(entry.age) && currentAge < Number(entry.age_end)) {
					matchedAny = true;
					// text-free entries still carry flags. empty text would render
					// as a blank filled box
					if (entry.text?.trim()) {
						const text = entry.text;
						matches.push(
							entry === firstTextEntry && !text.includes(STORY_AUDIO_TOKEN)
								? `${text} ${STORY_AUDIO_MARKUP}`
								: text
						);
					}
					// the spreadsheet writes a literal "null" for beats with no
					// recording, which is not a filename
					const entryId = String(entry.id ?? "").trim();
					if (matchedNarrationId === null && entryId && entryId !== "null") {
						matchedNarrationId = entryId;
					}
					if (isFlagSet(entry.hide_panel)) matchedHidePanel = true;
					if (isFlagSet(entry.hide_map)) matchedHideMap = true;
					if (isFlagSet(entry.hl_minimap)) matchedHighlightMap = true;
					if (isFlagSet(entry.hide_year)) matchedHideYear = true;
					if (!matchedVariableEntry && (entry.var_color || entry.wave)) {
						matchedVariableEntry = entry;
					}
				}
			}
		};
		collect(copy.all);
		collect(copy[zoneKey]);

		onUpdate({
			texts: matches,
			hidePanel: matchedHidePanel,
			hideMap: matchedHideMap,
			highlightMap: matchedHighlightMap,
			hideYear: matchedHideYear,
			// any entry matched, text or not — "is the script running here"
			hasBeat: matchedAny,
			narrationId: matchedNarrationId
		});

		if (!matchedVariableEntry) {
			// revert once on leaving a range, but only if the value is still
			// what the story wrote — a manual pick survives until the next beat
			if (lastAppliedStoryVariableEntry) {
				if (getSelectedVariable() === lastStoryAssignedVariable) {
					setSelectedVariable("AFTER_DEATH");
				}
				if (getPositionMode() === lastStoryAssignedWave) {
					setPositionMode(DEFAULT_WAVE);
				}
			}
			clearLatches();
		} else if (matchedVariableEntry !== lastAppliedStoryVariableEntry) {
			// fields default independently. a new beat overrides a manual pick
			const variable = matchedVariableEntry.var_color || "AFTER_DEATH";
			const wave = matchedVariableEntry.wave === "1" ? "Y1" : "Y2";
			setSelectedVariable(variable);
			setPositionMode(wave);
			lastAppliedStoryVariableEntry = matchedVariableEntry;
			// for the revert above
			lastStoryAssignedVariable = variable;
			lastStoryAssignedWave = wave;
		}
	}

	// forget the last applied beat, so the current one re-fires.
	// used when returning from explore mode
	function reset() {
		clearLatches();
	}

	return { update, reset, currentZoneKey };
}

/**
 * Age spans with no story beat anywhere — every group in copy.json merged
 * together, then inverted across the crowd's age range. The room floor is
 * tinted over these, so a reader can see where the script goes quiet.
 */
export function storyGapAgeRanges(copy, ageMin, ageMax) {
	const covered = Object.values(copy)
		.filter(Array.isArray)
		.flat()
		.map((beat) => [Number(beat.age), Number(beat.age_end)])
		.filter(([start, end]) => Number.isFinite(start) && Number.isFinite(end))
		.sort((a, b) => a[0] - b[0]);

	// merge overlapping/touching spans, then take what's left between them
	const merged = [];
	for (const [start, end] of covered) {
		const last = merged[merged.length - 1];
		if (last && start <= last[1]) last[1] = Math.max(last[1], end);
		else merged.push([start, end]);
	}

	const gaps = [];
	let cursor = ageMin;
	for (const [start, end] of merged) {
		if (start > cursor) gaps.push([cursor, Math.min(start, ageMax)]);
		cursor = Math.max(cursor, end);
	}
	if (cursor < ageMax) gaps.push([cursor, ageMax]);
	return gaps.filter(([start, end]) => end > start);
}
