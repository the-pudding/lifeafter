// survey row -> info panel lines
import {
	variableConfig,
	columnForWave,
	getCategoryFor,
	getRangeFor
} from "$data/variable_config.js";

// SELFID "Country:  Ethnicity" -> display. no colon = not a real pair, dropped
function formatSelfId(raw) {
	if (typeof raw !== "string" || !raw.includes(":")) return null;
	return raw.replace(/:\s+/, ": ");
}

// last line: selected variable's value, in its config color. value only —
// the control panel already names the question. AFTER_DEATH gets prose
export function selectedVariableLine(person, waveKey, baseVar) {
	const config = variableConfig[baseVar];
	const column = columnForWave(baseVar, waveKey);
	if (!config || !column) return null;
	const raw = person[column];
	if (raw === null || raw === undefined || raw === "") return null;
	const bucket =
		config.type === "numeric"
			? getRangeFor(baseVar, raw)
			: getCategoryFor(baseVar, raw);
	// unmapped -> rendered muted, nothing to label
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
	// raw where it's prose, bucket label for numerics
	const value = typeof raw === "string" && raw !== "" ? raw : bucket.label;
	return { text: value, color: bucket.color };
}

// raw answer, not the lumped legend label. admin codes dropped
function rawAnswer(person, baseVar, waveKey) {
	const column = columnForWave(baseVar, waveKey);
	if (!column) return null;
	const raw = person[column];
	if (typeof raw !== "string" || raw === "") return null;
	if (getCategoryFor(baseVar, raw)?.key === "no_answer") return null;
	return raw;
}

// lines: age/gender/marital, race/ethnicity, selected variable.
// missing dropped. entries are strings or { text, color }
export function formatNearbyPersonLines(person, waveKey, baseVar) {
	const age = person[waveKey === "Y1" ? "AGE_Y1" : "AGE_Y2"];
	const gender = rawAnswer(person, "GENDER", waveKey);
	const marital = rawAnswer(person, "MARITAL_STATUS", waveKey);
	const topLine = [typeof age === "number" ? age : null, gender, marital]
		.filter(Boolean)
		.join(", ");
	return [
		topLine,
		formatSelfId(person.SELFID1),
		selectedVariableLine(person, waveKey, baseVar)
	].filter(Boolean);
}
