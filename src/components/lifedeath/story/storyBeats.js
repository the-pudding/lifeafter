import { ZONE_WIDTH } from "../room/roomConfig.js";

// wave to revert to when no beat names one
const DEFAULT_WAVE = "Y2";

// marks where the audio toggle goes in a beat's text
export const STORY_AUDIO_TOKEN = "{{audio}}";

// the same, for the explore button on the closing beat
export const STORY_EXPLORE_TOKEN = "{{explore}}";

const STORY_AUDIO_MARKUP = `<div class="hints audio">${STORY_AUDIO_TOKEN}</div>`;

const STORY_EXPLORE_MARKUP = `<div class="hints audio">${STORY_EXPLORE_TOKEN}</div>`;

// ">> NAME|headline" in a beat's text names its inline chart and caption
const CHART_MARKER = /(?:^|\r?\n)[ \t]*>>[ \t]*([A-Za-z0-9_-]+)[ \t]*(?:\|[ \t]*([^\r\n]*))?/g;

function extractChartMarker(text) {
	let chart = null;
	const stripped = text.replace(CHART_MARKER, (full, chartName, headline) => {
		if (!chart) chart = { name: chartName, caption: headline?.trim() || null };
		return "";
	});
	return { text: stripped.trim(), chart };
}

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

	// the last entry to set a variable or wave, so it fires once on entry
	let lastAppliedStoryVariableEntry = null;
	// what it wrote, so the revert can tell story picks from manual ones
	let lastStoryAssignedVariable = null;
	let lastStoryAssignedWave = null;

	function clearLatches() {
		lastAppliedStoryVariableEntry = null;
		lastStoryAssignedVariable = null;
		lastStoryAssignedWave = null;
	}

	// the first and last text beats carry the audio and explore buttons
	const textEntries = (copy.all ?? []).filter((entry) => entry.text?.trim());
	const firstTextEntry = textEntries[0];
	const lastTextEntry = textEntries[textEntries.length - 1];


	// beats matching the walker: shared entries plus their zone
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
				showPanels: false,
				narrationId: null,
				chart: null,
				beatAge: null,
				beatAgeEnd: null
			});
			return;
		}

		const zoneKey = currentZoneKey();
		const matches = [];
		let matchedHidePanel = false;
		let matchedHideMap = false;
		let matchedHighlightMap = false;
		let matchedHideYear = false;
		let matchedShowPanels = false;
		let matchedAny = false;
		let matchedVariableEntry = null;
		// the first matching id; its {id}.mp3 narrates the beat
		let matchedNarrationId = null;
		// the first matching chart name, rendered under the beat's text
		let matchedChart = null;
		// the span of the first matching text beat, for the floor flash
		let matchedBeatAge = null;
		let matchedBeatAgeEnd = null;
		// flags arrive as strings from the spreadsheet
		const isFlagSet = (value) => value === "true" || value === true;
		const collect = (entries) => {
			for (const entry of entries ?? []) {
				if (currentAge >= Number(entry.age) && currentAge < Number(entry.age_end)) {
					matchedAny = true;
					// text-free entries still carry flags
					if (entry.text?.trim()) {
						if (matchedBeatAge === null) {
							matchedBeatAge = Number(entry.age);
							matchedBeatAgeEnd = Number(entry.age_end);
						}
						const marker = extractChartMarker(entry.text);
						if (!matchedChart && marker.chart) matchedChart = marker.chart;
						let text = marker.text;
						if (entry === firstTextEntry && !text.includes(STORY_AUDIO_TOKEN)) {
							text += ` ${STORY_AUDIO_MARKUP}`;
						}
						if (entry === lastTextEntry && !text.includes(STORY_EXPLORE_TOKEN)) {
							text += ` ${STORY_EXPLORE_MARKUP}`;
						}
						matches.push(text);
					}
					// the spreadsheet writes "null" for beats with no recording
					const entryId = String(entry.id ?? "").trim();
					if (matchedNarrationId === null && entryId && entryId !== "null") {
						matchedNarrationId = entryId;
					}
					if (isFlagSet(entry.hide_panel)) matchedHidePanel = true;
					if (isFlagSet(entry.hide_map)) matchedHideMap = true;
					if (isFlagSet(entry.hl_minimap)) matchedHighlightMap = true;
					if (isFlagSet(entry.hide_year)) matchedHideYear = true;
					if (isFlagSet(entry.show_panels)) matchedShowPanels = true;
					// a `chart:` field still works as a marker-free fallback
					if (!matchedChart && entry.chart) matchedChart = { name: entry.chart, caption: null };
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
			// whether the script is running here at all
			hasBeat: matchedAny,
			showPanels: matchedShowPanels,
			narrationId: matchedNarrationId,
			chart: matchedChart,
			beatAge: matchedBeatAge,
			beatAgeEnd: matchedBeatAgeEnd
		});

		if (!matchedVariableEntry) {
			// revert on leaving, unless the reader has since picked their own
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
			// each field defaults on its own; a new beat overrides a manual pick
			const variable = matchedVariableEntry.var_color || "AFTER_DEATH";
			const wave = matchedVariableEntry.wave === "1" ? "Y1" : "Y2";
			setSelectedVariable(variable);
			setPositionMode(wave);
			lastAppliedStoryVariableEntry = matchedVariableEntry;
			// remembered for the revert above
			lastStoryAssignedVariable = variable;
			lastStoryAssignedWave = wave;
		}
	}

	// forget the last applied beat, so the current one fires again
	function reset() {
		clearLatches();
	}

	return { update, reset, currentZoneKey };
}

// the age the script runs out at: past this there are no beats left
export function storyEndAge(copy) {
	const ends = Object.values(copy)
		.filter(Array.isArray)
		.flat()
		.map((beat) => Number(beat.age_end))
		.filter((age) => Number.isFinite(age));
	return ends.length > 0 ? Math.max(...ends) : null;
}

// age spans no beat covers, used to tint the floor where the script is quiet
export function storyGapAgeRanges(copy, ageMin, ageMax) {
	const covered = Object.values(copy)
		.filter(Array.isArray)
		.flat()
		.map((beat) => [Number(beat.age), Number(beat.age_end)])
		.filter(([start, end]) => Number.isFinite(start) && Number.isFinite(end))
		.sort((a, b) => a[0] - b[0]);

	// merge overlapping spans, then take the gaps between them
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
