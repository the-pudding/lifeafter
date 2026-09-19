<script>
	// left shelf for the clicked person: every variable they answered
	import {
		variableConfig,
		groupedVariableOptions,
		getColumns,
		getCategoryFor,
		columnForWave,
		numericScale,
		parseNumericValue
	} from "$data/variable_config.js";
	import { tidyMarital, RELIGION_NOUN } from "./people/personSummary.js";

	// `wave` is bindable, so flipping it here also walks the crowd
	let { person, wave = $bindable("Y1"), onclose } = $props();

	const open = $derived(person != null);
	const groups = groupedVariableOptions();

	// the value as recorded, not the bucket label
	function formatValue(key, config, column) {
		const raw = person?.[column];
		if (raw === null || raw === undefined || raw === "") return "—";
		if (config.type === "categorical") {
			if (getCategoryFor(key, raw)?.key === "no_answer") return "—";
			return key === "MARITAL_STATUS" ? tidyMarital(String(raw)) : String(raw);
		}
		if (config.type === "numeric") {
			const num = parseNumericValue(key, raw);
			return num !== null ? String(num) : String(raw);
		}
		return String(raw);
	}

	// the variable's span, shared with the legend
	function numericScaleFor(key, config) {
		return config.type === "numeric" ? numericScale(key) : null;
	}

	// bar fill from 0 to 1, clamped
	function fillFractionFor(value, scale) {
		return Math.max(0, Math.min(1, (value - scale.min) / (scale.max - scale.min)));
	}

	// small counts read better as pips than as a bar
	function isPipVariable(key, config) {
		return (
			config.parent === "Health & Habits" || key === "NUM_CHILDREN" || key === "NUM_HOUSEHOLD"
		);
	}


	// the answer as recorded, or null for missing and admin codes
	function rawAnswer(currentPerson, baseVar, waveKey) {
		const column = columnForWave(baseVar, waveKey);
		const raw = column ? currentPerson[column] : null;
		if (typeof raw !== "string" || raw === "") return null;
		if (getCategoryFor(baseVar, raw)?.key === "no_answer") return null;
		return raw;
	}

	function genderNoun(genderRaw) {
		if (genderRaw === "Male") return "man";
		if (genderRaw === "Female") return "woman";
		return "person";
	}

	// pronouns, with the verb forms that agree with them
	const SINGULAR_VERBS = {
		identify: "identifies",
		say: "says",
		believe: "believes",
		attend: "attends",
		follow: "follows"
	};
	function pronounsFor(genderRaw) {
		if (genderRaw === "Female") {
			return { subj: "she", poss: "her", is: "is", does: "does", s: (v) => SINGULAR_VERBS[v] ?? v };
		}
		if (genderRaw === "Male") {
			return { subj: "he", poss: "his", is: "is", does: "does", s: (v) => SINGULAR_VERBS[v] ?? v };
		}
		return { subj: "they", poss: "their", is: "are", does: "do", s: (v) => v };
	}

	const cap = (text) => text.charAt(0).toUpperCase() + text.slice(1);

	// how each self-identity reads in the intro, by kind of answer
	const IDENTITY_ADJECTIVE = new Set([
		"White", "Black", "Asian", "Hispanic", "Arab", "Jewish", "Mestizo",
		"Mestizo(a)", "Indigenous", "Branca", "Parda", "Preta", "Amarela",
		"Indígena", "Colored", "Chinese-Filipino"
	]);
	const IDENTITY_ADJECTIVE_RENAME = {
		"Mestizo(a)": "Mestizo",
		"Chinese (Cantonese)": "Cantonese Chinese",
		"Chinese (Hakka)": "Hakka Chinese"
	};
	const IDENTITY_AFTER = {
		"Schedule caste": "from a Scheduled Caste",
		"Schedule tribe": "from a Scheduled Tribe",
		"Other backward caste": "from an Other Backward Class",
		"Australian British/European": "of British or European descent",
		"Kenyan Somali/Somali": "of the Somali ethnic group",
		"Miji Kenda tribes": "of the Miji Kenda ethnic group"
	};
	const IDENTITY_SKIP = new Set([
		"None", "Other", "(DK)", "(Refused)", "(Saw, skipped)",
		"Prefer not to answer", "General", "Polish", "Turkish", "Australian",
		"African", "Other European"
	]);
	// countries that take an article
	const COUNTRY_WITH_THE = new Set(["United States", "United Kingdom", "Philippines"]);

	// "Kenya:  Kamba" -> { adjective, afterPhrase }, either may be null
	function describeIdentity(selfidRaw) {
		if (typeof selfidRaw !== "string" || !selfidRaw.includes(":")) return {};
		const identity = selfidRaw.split(":").slice(1).join(":").trim();
		if (!identity || IDENTITY_SKIP.has(identity)) return {};
		if (IDENTITY_ADJECTIVE_RENAME[identity]) {
			return { adjective: IDENTITY_ADJECTIVE_RENAME[identity] };
		}
		if (IDENTITY_ADJECTIVE.has(identity)) return { adjective: identity };
		if (IDENTITY_AFTER[identity]) return { afterPhrase: IDENTITY_AFTER[identity] };
		// ethnic groups keep a compound's first name, minus parentheticals
		const group = identity.split("/")[0].replace(/\s*\(.*\)$/, "").trim();
		return { afterPhrase: `of the ${group} ethnic group` };
	}

	// "an 80-year-old", "a 22-year-old", "an Arab man"
	function article(next) {
		return /^(8|18$|18[^\d]|[aeiouAEIOU])/.test(next) ? "an" : "a";
	}

	// "She is married and is a homemaker." — each answer as a predicate
	const MARITAL_PHRASE = {
		Married: "married",
		"Single/Never been married": "single",
		Divorced: "divorced",
		Separated: "separated",
		Widowed: "widowed",
		"Domestic partner": "in a domestic partnership"
	};
	const EMPLOYMENT_PHRASE = {
		"Employed for an employer": "employed",
		"Self-employed": "self-employed",
		Homemaker: "a homemaker",
		Student: "a student",
		Retired: "retired",
		"Unemployed and looking for a job": "unemployed"
	};

	// how each religion reads in "identifies as ..." and "grew up ..."
	function identifiesClause(adherent, p) {
		if (adherent === "No religion") return `${p.s("identify")} with no religion`;
		if (adherent === "Other religion") return `${p.s("identify")} with another religion`;
		if (adherent === "Jewish") return `${p.s("identify")} as Jewish`;
		if (["Shinto", "Chinese folk religion", "Animist or folk religion", "Umbanda / Candomblé"].includes(adherent)) {
			return `${p.s("follow")} ${adherent}`;
		}
		return `${p.s("identify")} as a ${adherent}`;
	}
	function grewUpSentence(adherent, p) {
		if (adherent === "No religion") return `${cap(p.subj)} grew up with no religion.`;
		if (adherent === "Other religion") return `${cap(p.subj)} grew up in another religion.`;
		if (["Shinto", "Chinese folk religion", "Animist or folk religion", "Umbanda / Candomblé"].includes(adherent)) {
			return `${cap(p.subj)} grew up following ${adherent}.`;
		}
		return `${cap(p.subj)} grew up ${adherent}.`;
	}
	function beliefClause(raw, p) {
		if (raw === "One God") return `${p.s("say")} ${p.subj} ${p.s("believe")} in one God`;
		if (raw === "More than one god")
			return `${p.s("say")} ${p.subj} ${p.s("believe")} in more than one god`;
		if (raw === "An impersonal spiritual force")
			return `${p.s("say")} ${p.subj} ${p.s("believe")} in an impersonal spiritual force`;
		if (raw === "Unsure") return `${p.is} unsure whether there is a god or spiritual force`;
		if (raw === "None of these")
			return `${p.does} not believe in a god or spiritual force`;
		return null;
	}
	function attendanceClause(raw, p) {
		const times = {
			"A few times a year": "a few times a year",
			"One to three times a month": "one to three times a month",
			"Once a week": "once a week",
			"More than once a week": "more than once a week"
		}[raw];
		if (raw === "Never") return `never ${p.s("attend")} religious services`;
		return times ? `${p.s("attend")} religious services ${times}` : null;
	}

	// "x, y, and z" — or just "x and y", or "x"
	function listClauses(clauses) {
		if (clauses.length <= 1) return clauses.join("");
		if (clauses.length === 2) return clauses.join(" and ");
		return `${clauses.slice(0, -1).join(", ")}, and ${clauses[clauses.length - 1]}`;
	}

	// a plain-language intro built from their answers
	function buildIntroSentence(currentPerson, waveKey) {
		if (!currentPerson) return "";
		const noun = genderNoun(currentPerson.GENDER);
		const p = pronounsFor(currentPerson.GENDER);
		const currentAge = currentPerson[waveKey === "Y1" ? "AGE_Y1" : "AGE_Y2"];

		// who and where they are: age, gender, identity, country
		const { adjective, afterPhrase } = describeIdentity(currentPerson.SELFID1);
		const country = currentPerson.COUNTRY;
		const descriptor = [
			typeof currentAge === "number" ? `${currentAge}-year-old` : null,
			adjective,
			noun
		]
			.filter(Boolean)
			.join(" ");
		let sentence = `This is ${article(descriptor)} ${descriptor}`;
		if (afterPhrase) sentence += ` ${afterPhrase}`;
		if (typeof country === "string" && country) {
			sentence += ` in ${COUNTRY_WITH_THE.has(country) ? "the " : ""}${country}`;
		}
		sentence += ".";
		const sentences = [sentence];

		// marital status and work, as their own sentence
		const maritalRaw = rawAnswer(currentPerson, "MARITAL_STATUS", waveKey);
		const marital = maritalRaw ? MARITAL_PHRASE[maritalRaw] : null;
		const employmentRaw = rawAnswer(currentPerson, "EMPLOYMENT", waveKey);
		const employment = employmentRaw ? EMPLOYMENT_PHRASE[employmentRaw] : null;
		const predicates = [marital, employment].filter(Boolean).map((t) => `${p.is} ${t}`);
		if (predicates.length > 0) {
			sentences.push(`${cap(p.subj)} ${predicates.join(" and ")}.`);
		}

		// their religious life: affiliation, god, importance, attendance
		const religionRaw = rawAnswer(currentPerson, "REL2", waveKey);
		const adherent = religionRaw ? (RELIGION_NOUN[religionRaw] ?? null) : null;
		const beliefRaw = rawAnswer(currentPerson, "BELIEVE_GOD_BROAD", waveKey);
		const importantRaw = rawAnswer(currentPerson, "REL_IMPORTANT", waveKey);
		const attendRaw = rawAnswer(currentPerson, "ATTEND_SVCS", waveKey);
		const clauses = [
			adherent && identifiesClause(adherent, p),
			beliefRaw && beliefClause(beliefRaw, p),
			importantRaw === "Yes"
				? `${p.s("say")} religion is important in ${p.poss} daily life`
				: importantRaw === "No"
					? `${p.s("say")} religion is not important in ${p.poss} daily life`
					: null,
			attendRaw && attendanceClause(attendRaw, p)
		].filter(Boolean);
		if (clauses.length > 0) sentences.push(`${cap(p.subj)} ${listClauses(clauses)}.`);

		// where they started: religion at age twelve (asked once)
		const grewUpRaw = rawAnswer(currentPerson, "REL1", "Y1");
		const grewUpAdherent = grewUpRaw ? (RELIGION_NOUN[grewUpRaw] ?? null) : null;
		if (grewUpAdherent) sentences.push(grewUpSentence(grewUpAdherent, p));

		// and the question the room is built on
		const afterDeathColumn = columnForWave("AFTER_DEATH", waveKey);
		const afterDeathLabel = afterDeathColumn
			? getCategoryFor("AFTER_DEATH", currentPerson[afterDeathColumn])?.label
			: null;
		if (afterDeathLabel) {
			const belief =
				afterDeathLabel === "Yes"
					? `${p.subj} ${p.s("believe")}`
					: afterDeathLabel === "No"
						? `${p.subj} ${p.does} not believe`
						: `${p.subj} ${p.is} unsure whether`;
			sentences.push(
				`In ${waveKey === "Y1" ? "2022-23" : "2024"}, ${belief} there is life after death.`
			);
		}
		return sentences.join(" ");
	}

	const introSentence = $derived(buildIntroSentence(person, wave));
</script>

<div
	class="shelf"
	class:shelfopen={open}
	role="dialog"
	aria-label="Respondent details"
	tabindex="-1"
	onclick={(e) => e.stopPropagation()}
	onmousedown={(e) => e.stopPropagation()}
	onkeydown={(e) => e.stopPropagation()}
>
	<button class="detailsClose" onclick={onclose}>Close panel</button>
	<div class="modalData">
		{#if person}
			<div class="wave-toggle-row">
				<button class="wave-toggle" class:active={wave === "Y1"} onclick={() => (wave = "Y1")}>
					2022-23
				</button>
				<button class="wave-toggle" class:active={wave === "Y2"} onclick={() => (wave = "Y2")}>
					2024
				</button>
			</div>

			<p class="narrative">{introSentence}</p>

			{#each groups as group}
				{@const rows = group.options.filter(({ key }) => {
					const column = columnForWave(key, wave);
					return column && person[column] != null && person[column] !== "";
				})}
				{#if rows.length > 0}
					<div class="waveHed">{group.parent}</div>
					{#each rows as { key, label }}
						{@const config = variableConfig[key]}
						{@const column = columnForWave(key, wave)}
						{@const isPip = isPipVariable(key, config)}
						{@const scale = !isPip ? numericScaleFor(key, config) : null}
						{@const numericValue =
							isPip || scale ? parseNumericValue(key, person[column]) : null}
						<div class="stat">
							<span class="statLabel">{label}</span>
							{#if isPip && numericValue !== null}
								{#if numericValue === 0}
									<span class="statValue">None</span>
								{:else}
									<div class="pipRow" role="img" aria-label="{numericValue}">
										{#each { length: numericValue } as _}
											<span class="pip pip--filled"></span>
										{/each}
									</div>
								{/if}
							{:else if scale && numericValue !== null}
								{@const fraction = fillFractionFor(numericValue, scale)}
								<div class="rangeBar" role="img" aria-label="{formatValue(key, config, column)} of {scale.min} to {scale.maxLabel}">
									<div class="rangeBarFill" style="width: {fraction * 100}%">
										{#if fraction >= 0.22}
											<span class="rangeBarValue rangeBarValue--inside"
												>{formatValue(key, config, column)}</span
											>
										{/if}
									</div>
									{#if fraction < 0.22}
										<span
											class="rangeBarValue rangeBarValue--outside"
											style="left: {fraction * 100}%"
											>{formatValue(key, config, column)}</span
										>
									{/if}
								</div>
							{:else}
								<span class="statValue">{formatValue(key, config, column)}</span>
							{/if}
						</div>
					{/each}
				{/if}
			{/each}
		{/if}
	</div>
	<div class="fixed_spacer"></div>
	<!-- <div class="spacer"></div> -->
</div>

<style>
	.shelf {
		display: block;
		font-family: var(--font-sans);
		position: fixed;
		left: -380px;
		top: 0px;
		width: 380px;
		max-width: 100%;
		/* dvh tracks the real visible height as a mobile address bar moves */
		height: 100%;
		height: 100dvh;
		background: #0a0510;
		/* thin rule down the open edge, so it reads against the room */
		border-right: 1px solid rgba(255, 255, 255, 0.22);
		box-sizing: border-box;
		z-index: 999999;
		transition: left 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
		overflow-y: scroll;
		pointer-events: auto;
		scrollbar-color: #472a45 black;
		scrollbar-width: thin;
	}
	.shelf::-webkit-scrollbar {
		width: 5px;
	}
	.shelf::-webkit-scrollbar-track {
		background: black;
	}
	.shelf::-webkit-scrollbar-thumb {
		background: #472a45;
		border-radius: 3px;
	}
	.shelf.shelfopen {
		left: 0px;
	}
	/* below 450px it takes the whole screen, closed offset included */
	@media (max-width: 449px) {
		.shelf {
			width: 100%;
			left: -100%;
		}
	}
	.detailsClose {
		font-size: 15px;
		display: block;
		cursor: pointer;
		color: rgba(255,255,255,0.8);
		font-weight: bold;
		font-family: var(--font-sans);
		background: #000;
		padding: 10px 5px;
		border: none;
		border-bottom: 1px solid rgba(255,255,255,0.2);
		border-radius: 0;
		text-align: center;
		position: sticky;
		top: 0px;
		width: 100%;
		box-sizing: border-box;
		/* keeps it above content scrolling underneath it */
		z-index: 20;
	}
	.detailsClose:hover {
		/* background: #221030; */
		color: #fff;
	}
	.modalData {
		padding: 20px;
		box-sizing: border-box;
	}
	.wave-toggle-row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 14px;
	}
	.wave-toggle {
		background: #1a0c2b;
		/* unselected: raised, in a darker purple */
		color: #8f6fae;
		border: 1px solid rgba(207, 164, 255, 0.35);
		border-radius: 0;
		padding: 0.35rem 0.6rem;
		font-size: 0.75rem;
		cursor: pointer;
	}
	.wave-toggle:hover {
		background: #2a1740;
	}
	/* selected: white, and pressed into its shadow */
	.wave-toggle.active {
		background: #1a0c2b;
		border-color: rgba(207, 164, 255, 0.7);
		color: #fff;
		box-shadow: none;
		transform: translate(2px, 2px);
	}
	.narrative {
		font-size: 0.85rem;
		line-height: 1.5;
		/* the modal's default text: a very faint pink/purple, not pure white */
		color: rgba(243, 229, 248, 0.95);
		margin: 0 0 16px;
	}
	.waveHed {
		font-size: 1rem;
		margin: 20px 0 8px;
		font-weight: bold;
		color: var(--color-light-purple);
		border-bottom: 2px solid var(--color-light-purple);
	}
	.stat {
		display: block;
		margin-bottom: 10px;
		font-size: 0.78rem;
		line-height: 1.3;
	}
	.statLabel {
		display: block;
		color: rgba(255, 255, 255, 0.5);
	}
	.statValue {
		display: block;
		color: rgba(255, 255, 255, 1);
	}
	/* a numeric answer as how full a bar is, over the variable's own span */
	.rangeBar {
		position: relative;
		margin-top: 3px;
		height: 18px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
	}
	.rangeBarFill {
		position: relative;
		height: 100%;
		min-width: 2px;
		background: #9d00ff;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		box-sizing: border-box;
		transition: width 200ms ease-out;
	}
	.rangeBarValue {
		font-size: 0.72rem;
		white-space: nowrap;
	}
	/* enough fill to hold the label inside it */
	.rangeBarValue--inside {
		padding-right: 4px;
		color: #fff;
	}
	/* too little fill, so the label sits just past the bar's edge */
	.rangeBarValue--outside {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 4px;
		color: rgba(243, 229, 248, 0.85);
	}
	/* small counts as one dot per unit, filled up to the value */
	.pipRow {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin-top: 4px;
	}
	.pip {
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.25);
		box-sizing: border-box;
		flex: none;
	}
	.pip--filled {
		background: #9d00ff;
		border-color: #9d00ff;
	}
	.fixed_spacer {
		position: sticky;
		bottom: 0px;
		left: 0px;
		height: 120px;
		background: linear-gradient(180deg, rgba(10, 5, 16, 0) 0%, rgba(0, 0, 0, 1) 79%);
		width: 100%;
	}
	.spacer {
		background: #0a0510;
		height: 100px;
		display: block;
	}
</style>
