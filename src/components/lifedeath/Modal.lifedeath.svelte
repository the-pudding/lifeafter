<script>
	// A left-side detail panel for whichever crowd member was clicked (see
	// handlePersonClick in Main.lifedeath.svelte) — shows every variable
	// from variable_config.js that this respondent actually answered,
	// grouped the same way the "Color by" dropdown groups them. Modeled
	// after the love-hcm project's own Modal.love.svelte "shelf" pattern.
	import {
		variableConfig,
		groupedVariableOptions,
		getColumns,
		getCategoryFor,
		parseNumericValue
	} from "$data/variable_config.js";

	// `wave` ("Y1" | "Y2") is bindable so this toggle and the ControlPanel's
	// own Wave 1/Wave 2 buttons share one piece of state in
	// Main.lifedeath.svelte — flipping it here also walks the crowd to
	// their other wave's position, same as the control panel toggle.
	let { person, wave = $bindable("Y1"), onclose } = $props();

	const open = $derived(person != null);
	const groups = groupedVariableOptions();

	// The one column for this variable that matches the selected wave —
	// null if this respondent has no data for that wave at all. Variables
	// with only a single column (no suffix at all, like GENDER, or a
	// recruit-only "_Y1"-only question like REL1) aren't really wave-
	// specific, so that one column shows for either wave.
	function columnForWave(key, waveKey) {
		const columns = getColumns(key);
		if (columns.length <= 1) return columns[0] ?? null;
		return columns.find((column) => column.endsWith(`_${waveKey}`)) ?? null;
	}

	function formatValue(key, config, column) {
		const raw = person?.[column];
		if (raw === null || raw === undefined || raw === "") return "—";
		if (config.type === "categorical") {
			return getCategoryFor(key, raw)?.label ?? String(raw);
		}
		if (config.type === "numeric") {
			const num = parseNumericValue(key, raw);
			return num !== null ? String(num) : String(raw);
		}
		return String(raw);
	}

	const age = $derived(person?.[wave === "Y1" ? "AGE_Y1" : "AGE_Y2"] ?? null);
	const waveYearLabel = $derived(wave === "Y1" ? "Wave 1" : "Wave 2");

	function genderNoun(genderRaw) {
		if (genderRaw === "Male") return "man";
		if (genderRaw === "Female") return "woman";
		return "person";
	}

	// A short, plain-language intro built from whatever this respondent
	// actually answered — same spirit as the love-hcm modal's own intro
	// sentence, just built from GFS's variables instead of that survey's.
	function buildIntroSentence(currentPerson, waveKey) {
		if (!currentPerson) return "";
		const noun = genderNoun(currentPerson.GENDER);
		const currentAge = currentPerson[waveKey === "Y1" ? "AGE_Y1" : "AGE_Y2"];

		const maritalColumn = columnForWave("MARITAL_STATUS", waveKey);
		const maritalLabel = maritalColumn
			? getCategoryFor("MARITAL_STATUS", currentPerson[maritalColumn])?.label
			: null;
		const employmentColumn = columnForWave("EMPLOYMENT", waveKey);
		const employmentLabel = employmentColumn
			? getCategoryFor("EMPLOYMENT", currentPerson[employmentColumn])?.label
			: null;
		const afterDeathColumn = columnForWave("AFTER_DEATH", waveKey);
		const afterDeathLabel = afterDeathColumn
			? getCategoryFor("AFTER_DEATH", currentPerson[afterDeathColumn])?.label
			: null;

		let sentence = "This is a";
		if (typeof currentAge === "number") sentence += ` ${currentAge}-year-old`;
		sentence += ` ${noun}`;
		const traits = [maritalLabel, employmentLabel].filter(Boolean).map((t) => t.toLowerCase());
		if (traits.length > 0) sentence += ` who is ${traits.join(" and ")}`;
		sentence += ".";

		if (afterDeathLabel) {
			const belief =
				afterDeathLabel === "Yes"
					? "believe"
					: afterDeathLabel === "No"
						? "do not believe"
						: "are unsure whether";
			sentence += ` In ${waveKey === "Y1" ? "Wave 1" : "Wave 2"}, they ${belief} there is life after death.`;
		}
		return sentence;
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
	<button class="detailsClose" onclick={onclose}>Click to close</button>
	<div class="modalData">
		{#if person}
			<div class="wave-toggle-row">
				<button class="wave-toggle" class:active={wave === "Y1"} onclick={() => (wave = "Y1")}>
					Wave 1
				</button>
				<button class="wave-toggle" class:active={wave === "Y2"} onclick={() => (wave = "Y2")}>
					Wave 2
				</button>
			</div>

			<p class="narrative">{introSentence}</p>
			<div class="stat">
				<span class="statLabel">Age ({waveYearLabel})</span>
				<span class="statValue">{age ?? "—"}</span>
			</div>

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
						<div class="stat">
							<span class="statLabel">{label}</span>
							<span class="statValue">{formatValue(key, config, column)}</span>
						</div>
					{/each}
				{/if}
			{/each}
		{/if}
	</div>
	<div class="fixed_spacer"></div>
	<div class="spacer"></div>
</div>

<style>
	.shelf {
		display: block;
		position: fixed;
		left: -380px;
		top: 0px;
		width: 360px;
		max-width: 100%;
		/* height:100% of a position:fixed element resolves against the
		   viewport, which on mobile browsers includes address-bar space —
		   100dvh (with 100% as the fallback) tracks the real visible
		   height as it shows/hides, same fix as .lifedeath-room. */
		height: 100%;
		height: 100dvh;
		background: #0a0510;
		z-index: 999999;
		transition: left 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
		overflow-y: scroll;
		pointer-events: auto;
		scrollbar-color: #3d2840 black;
		scrollbar-width: thin;
	}
	.shelf::-webkit-scrollbar {
		width: 5px;
	}
	.shelf::-webkit-scrollbar-track {
		background: black;
	}
	.shelf::-webkit-scrollbar-thumb {
		background: #3d2840;
		border-radius: 3px;
	}
	.shelf.shelfopen {
		left: 0px;
	}
	.detailsClose {
		font-size: 15px;
		display: block;
		cursor: pointer;
		color: black;
		font-weight: bold;
		background: var(--color-light-purple);
		padding: 10px 5px;
		border: 5px solid #000;
		border-top: 10px solid #000;
		border-radius: 0;
		text-align: center;
		position: sticky;
		top: 0px;
		width: 100%;
		box-sizing: border-box;
		opacity: 0.9;
	}
	.detailsClose:hover {
		text-decoration: underline;
		opacity: 1;
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
		background: rgba(255, 255, 255, 0.1);
		color: #eee;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.35rem;
		padding: 0.35rem 0.6rem;
		font-size: 0.75rem;
		cursor: pointer;
	}
	.wave-toggle:hover {
		background: rgba(255, 255, 255, 0.18);
	}
	.wave-toggle.active {
		background: #9d00ff;
		border-color: #9d00ff;
		color: #fff;
	}
	.narrative {
		font-size: 0.85rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.95);
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
	.fixed_spacer {
		position: sticky;
		bottom: 0px;
		left: 0px;
		height: 120px;
		background: linear-gradient(180deg, rgba(10, 5, 16, 0) 0%, rgba(0, 0, 0, 1) 79%);
		width: 100%;
	}
	.spacer {
		height: 100px;
		display: block;
	}
</style>
