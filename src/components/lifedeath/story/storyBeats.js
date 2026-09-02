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
				hideYear: false
			});
			return;
		}

		const zoneKey = currentZoneKey();
		const matches = [];
		let matchedHidePanel = false;
		let matchedHideMap = false;
		let matchedHighlightMap = false;
		let matchedHideYear = false;
		let matchedVariableEntry = null;
		// flags arrive as "true" from the exported spreadsheet
		const isFlagSet = (value) => value === "true" || value === true;
		const collect = (entries) => {
			for (const entry of entries ?? []) {
				if (currentAge >= Number(entry.age) && currentAge < Number(entry.age_end)) {
					// text-free entries still carry flags. empty text would render
					// as a blank filled box
					if (entry.text?.trim()) matches.push(entry.text);
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
			hideYear: matchedHideYear
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
