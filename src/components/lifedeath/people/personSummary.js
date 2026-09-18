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

// count variables read as counts ("2 children"), not scale positions
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const COUNT_LINES = {
	NUM_CHILDREN: (n) =>
		n === 0 ? "No children at home" : `${plural(n, "child", "children")} at home`,
	NUM_HOUSEHOLD: (n) => `${plural(n, "adult", "adults")} in household`,
	CIGARETTES: (n) =>
		n === 0 ? "Doesn't smoke" : `${plural(n, "cigarette", "cigarettes")} a day`,
	DRINKS: (n) =>
		n === 0 ? "No drinks this week" : `${plural(n, "drink", "drinks")} this week`,
	DAYS_EXERCISE: (n) =>
		n === 0 ? "No exercise this week" : `Exercised ${n} of 7 days`
};

// religions as adherents ("Buddhist"), shared with the person modal
export const RELIGION_NOUN = {
	Christianity: "Christian",
	Islam: "Muslim",
	Hinduism: "Hindu",
	Buddhism: "Buddhist",
	Judaism: "Jewish",
	Taoism: "Taoist",
	Shinto: "Shinto",
	Sikhism: "Sikh",
	Spiritism: "Spiritist",
	"Chinese folk/traditional religion": "Chinese folk religion",
	"Primal, Animist, or Folk religion": "Animist or folk religion",
	"No religion/Atheist/Agnostic": "No religion",
	None: "No religion",
	"Some other religion": "Other religion",
	"Other Religion": "Other religion",
	"Umbanda, Candomblé, and other African-derived religions": "Umbanda / Candomblé"
};

// no-answer codes never render on a panel
const ADMIN_RAW = /^\((Saw, skipped|Refused|DK)\)$|^Prefer not to answer$/;

// per-variable phrasings that fold the question's context in
const VALUE_REWRITES = {
	REL1: (raw) => RELIGION_NOUN[raw] ?? null,
	REL2: (raw) => RELIGION_NOUN[raw] ?? null,
	RELIGIOUS_AFFILIATION: (raw) => RELIGION_NOUN[raw] ?? null,
	URBAN_RURAL: (raw) => `Lives in ${raw.charAt(0).toLowerCase()}${raw.slice(1)}`,
	MARITAL_STATUS: (raw) => tidyMarital(raw),
	// "Changed" alone reads as a verb; the bucket says what changed
	CHANGE_ANSWER: (raw, bucket) => bucket.label,
	BELIEVE_GOD: believesLine,
	BELIEVE_GOD_BROAD: believesLine
};

function believesLine(raw) {
	const map = {
		"One God": "Believes in one God",
		"More than one god": "Believes in more than one god",
		"An impersonal spiritual force": "Believes in a spiritual force",
		"None of these": "Believes in none of these"
	};
	return map[raw] ?? null;
}

// survey-instrument artifacts have no place over someone's head
function tidyAnswer(raw, bucket) {
	let text = raw
		// "Baptist, such as [insert country specific examples]" -> "Baptist"
		.replace(/,? such as \[insert country specific.*$/i, "")
		// "Atheist – do not believe in any god" -> "Atheist"
		.replace(/\s+–\s+.*$/, "")
		.replace("Pentecostal/Charismatic denominations", "Pentecostal/Charismatic")
		// "(Does not apply)" is an answer here, not an admin code
		.replace(/^\((.+)\)$/, "$1")
		.trim();
	// a bare "None" gets its context from the bucket label
	if (text === "None") text = bucket.label;
	// answers written as full sentences fall back to the shorter label
	if (text.length > 44) text = bucket.label;
	return text;
}

// last line: the selected variable's value, in its colour
export function selectedVariableLine(person, waveKey, baseVar) {
	const config = variableConfig[baseVar];
	const column = columnForWave(baseVar, waveKey);
	if (!config || !column) return null;
	const raw = person[column];
	if (raw === null || raw === undefined || raw === "") return null;
	if (typeof raw === "string" && ADMIN_RAW.test(raw)) return null;

	// numeric answers read against their scale, on the crowd's ramp
	const scale = config.type === "numeric" ? numericScale(baseVar) : null;
	if (scale) {
		const value = parseNumericValue(baseVar, raw);
		const color = gradientColorForValue(baseVar, raw);
		if (value === null || !color) return null;
		const asCount = COUNT_LINES[baseVar];
		return { text: asCount ? asCount(value) : `${value} of ${scale.maxLabel}`, color };
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
	// the variable's own phrasing first, then the answer as recorded
	const rewritten =
		typeof raw === "string" ? VALUE_REWRITES[baseVar]?.(raw, bucket) : null;
	const value =
		rewritten ??
		(typeof raw === "string" && raw !== "" ? tidyAnswer(raw, bucket) : bucket.label);
	return { text: value, color: bucket.color };
}

// the raw answer, dropping admin codes
function rawAnswer(person, baseVar, waveKey) {
	const column = columnForWave(baseVar, waveKey);
	if (!column) return null;
	const raw = person[column];
	if (typeof raw !== "string" || raw === "") return null;
	if (ADMIN_RAW.test(raw)) return null;
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
	// the religion line, as the adherent; skipped when it's the last line
	const rawReligion = baseVar === "REL2" ? null : rawAnswer(person, "REL2", waveKey);
	const religion = rawReligion ? (RELIGION_NOUN[rawReligion] ?? rawReligion) : null;
	return [
		topLine,
		formatSelfId(person.SELFID1),
		religion,
		selectedVariableLine(person, waveKey, baseVar)
	].filter(Boolean);
}
