// survey row to info panel lines
import {
	variableConfig,
	columnForWave,
	getCategoryFor,
	getRangeFor,
	gradientColorForValue,
	numericScale,
	parseNumericValue
} from "$data/variable_config.js";

// selfid "country: ethnicity" for display; no colon means no pair
function formatSelfId(raw) {
	if (typeof raw !== "string" || !raw.includes(":")) return null;
	return raw.replace(/:\s+/, ": ");
}

// last line: the selected variable's value, in its colour
export function selectedVariableLine(person, waveKey, baseVar) {
	const config = variableConfig[baseVar];
	const column = columnForWave(baseVar, waveKey);
	if (!config || !column) return null;
	const raw = person[column];
	if (raw === null || raw === undefined || raw === "") return null;

	// numeric answers read against their scale, on the crowd's ramp
	const scale = config.type === "numeric" ? numericScale(baseVar) : null;
	if (scale) {
		const value = parseNumericValue(baseVar, raw);
		const color = gradientColorForValue(baseVar, raw);
		if (value === null || !color) return null;
		return { text: `${value} of ${scale.maxLabel}`, color };
	}

	const bucket =
		config.type === "numeric"
			? getRangeFor(baseVar, raw)
			: getCategoryFor(baseVar, raw);
	// unmapped values render muted, with nothing to label
	if (!bucket) return null;
	// admin codes aren't answers
	if (bucket.key === "no_answer") return null;

	if (baseVar === "AFTER_DEATH") {
		const text =
			bucket.key === "yes"
				? "Believes in an afterlife"
				: bucket.key === "no"
					? "Does not believe in an afterlife"
					: "Unsure about an afterlife";
		return { text, color: bucket.color };
	}
	// the answer as recorded, not the bucket it folds into
	const value = typeof raw === "string" && raw !== "" ? raw : bucket.label;
	return { text: value, color: bucket.color };
}

// the raw answer, dropping admin codes
function rawAnswer(person, baseVar, waveKey) {
	const column = columnForWave(baseVar, waveKey);
	if (!column) return null;
	const raw = person[column];
	if (typeof raw !== "string" || raw === "") return null;
	if (getCategoryFor(baseVar, raw)?.key === "no_answer") return null;
	return raw;
}

// survey wording to reading wording
export function tidyMarital(raw) {
	return raw === "Single/Never been married" ? "Single" : raw;
}

// panel lines for a person; entries are strings or { text, color }
export function formatNearbyPersonLines(person, waveKey, baseVar) {
	const age = person[waveKey === "Y1" ? "AGE_Y1" : "AGE_Y2"];
	const gender = rawAnswer(person, "GENDER", waveKey);
	const marital = rawAnswer(person, "MARITAL_STATUS", waveKey);
	const topLine = [typeof age === "number" ? age : null, gender, marital && tidyMarital(marital)]
		.filter(Boolean)
		.join(", ");
	// skipped when it's already the last line
	const religion = baseVar === "REL2" ? null : rawAnswer(person, "REL2", waveKey);
	return [
		topLine,
		formatSelfId(person.SELFID1),
		religion,
		selectedVariableLine(person, waveKey, baseVar)
	].filter(Boolean);
}
