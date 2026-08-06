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

	// Most numeric variables' top bucket is a real scale ceiling (LIFE_SAT's
	// "High (7-10)" truly stops at 10) — but a few (NUM_CHILDREN's "3+",
	// CIGARETTES' "20+") use a wildly wide top bucket (span 27, say,
	// against the previous bucket's span of 1) purely as an open-ended
	// catch-all, not a real bound — its stated max (30) is arbitrary and
	// would leave every realistic value looking near-empty. Detected by
	// comparing the top bucket's own span to the one before it; when it's
	// disproportionately wider, the bucket's start (3) is used as the
	// effective ceiling instead of its stated end, so landing in that
	// bucket simply reads as "maxed out."
	function effectiveMaxFor(config) {
		const sorted = [...config.ranges].sort((a, b) => a.min - b.min);
		const last = sorted[sorted.length - 1];
		const secondLast = sorted[sorted.length - 2];
		if (secondLast) {
			const lastSpan = last.max - last.min;
			const secondLastSpan = secondLast.max - secondLast.min || 1;
			if (lastSpan > secondLastSpan * 3) return last.min;
		}
		return last.max;
	}

	// A numeric variable's own full scale, spanning its ranges' own
	// low/high buckets (see variable_config.js — e.g. LIFE_SAT's
	// low/mid/high buckets span 0-10 overall) — the range-bar below fills
	// against THIS span, not some fixed 0-10 assumption, since not every
	// numeric variable (NUM_CHILDREN, say) is actually a 0-10 scale.
	function numericScaleFor(config) {
		if (config.type !== "numeric" || !config.ranges?.length) return null;
		const min = Math.min(...config.ranges.map((r) => r.min));
		const max = effectiveMaxFor(config);
		return max > min ? { min, max } : null;
	}

	// 0..1 fill fraction for the range bar, clamped in case a raw value
	// happens to fall outside its own configured ranges.
	function fillFractionFor(value, scale) {
		return Math.max(0, Math.min(1, (value - scale.min) / (scale.max - scale.min)));
	}

	// Small discrete counts (kids/adults in the household; Health &
	// Habits' cigarette/drink/exercise-day counts) read better as a row
	// of filled pips — one dot per unit, no fixed total/empty ones since
	// there's no real ceiling to measure against — than a continuous bar,
	// where "63% full" wouldn't mean anything for "3 children."
	function isPipVariable(key, config) {
		return (
			config.parent === "Health & Habits" || key === "NUM_CHILDREN" || key === "NUM_HOUSEHOLD"
		);
	}

	const age = $derived(person?.[wave === "Y1" ? "AGE_Y1" : "AGE_Y2"] ?? null);
	const waveYearLabel = $derived(wave === "Y1" ? "2022-23" : "2024");

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
						{@const scale = !isPip ? numericScaleFor(config) : null}
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
								<div class="rangeBar" role="img" aria-label="{formatValue(key, config, column)} of {scale.min} to {scale.max}">
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
		/* Sticky, but with no z-index it still stacks in plain DOM order —
		   later content scrolling underneath (e.g. a .rangeBarValue--outside
		   label, itself position:absolute) could paint over it once it
		   scrolled up to y=0. This keeps it on top regardless. */
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
	/* A numeric variable's own value shown as how full a bar is (see
	   numericScaleFor/fillFractionFor) instead of a bare number — the
	   track is the variable's own full min..max span, same purple accent
	   as .wave-toggle.active for one consistent "this app's accent color"
	   throughout the modal. */
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
	/* Enough fill to fit the label inside it — right-aligned near the
	   fill's own leading (right) edge, over the accent color. */
	.rangeBarValue--inside {
		padding-right: 4px;
		color: #fff;
	}
	/* Not enough fill — the label sits just past the bar's own leading
	   edge instead, over the track rather than the (too-thin) fill. */
	.rangeBarValue--outside {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 4px;
		color: rgba(255, 255, 255, 0.85);
	}
	/* Small discrete counts (see isPipVariable) — one dot per unit, filled
	   up to the value, same track/fill colors as .rangeBar for one
	   consistent "this is how full/many" visual language. */
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
