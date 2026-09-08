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
	import { tidyMarital } from "./people/personSummary.js";

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

	// the variable's own span, shared with the legend so an open-ended top
	// bucket ("3+") reads the same in both
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

	const age = $derived(person?.[wave === "Y1" ? "AGE_Y1" : "AGE_Y2"] ?? null);
	const waveYearLabel = $derived(wave === "Y1" ? "2022-23" : "2024");

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

	// a plain-language intro built from their answers
	function buildIntroSentence(currentPerson, waveKey) {
		if (!currentPerson) return "";
		const noun = genderNoun(currentPerson.GENDER);
		const currentAge = currentPerson[waveKey === "Y1" ? "AGE_Y1" : "AGE_Y2"];

		const maritalRaw = rawAnswer(currentPerson, "MARITAL_STATUS", waveKey);
		const maritalLabel = maritalRaw && tidyMarital(maritalRaw);
		const employmentLabel = rawAnswer(currentPerson, "EMPLOYMENT", waveKey);
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
			sentence += ` In ${waveKey === "Y1" ? "2022-23" : "2024"}, they ${belief} there is life after death.`;
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
		font-family: var(--font-mono);
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
		color: rgba(255, 255, 255, 0.85);
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
