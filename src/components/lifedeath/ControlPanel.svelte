<script>
	// overlay ui; reads and writes the props main passes
	import { variableConfig, washedBackgroundCSS } from "$data/variable_config.js";
	// weighted (ANNUAL_WEIGHT_C2) Wave 2 breakdowns, baked by the GFS
	// notebook pipeline (data/GFS/export_group_percentages.py)
	import groupPercentages from "$data/group_percentages.json";

	let {
		variableOptions,
		selectedVariable = $bindable(),
		legendData,
		mode = $bindable(),
		positionMode = $bindable(),
		currentAge = null,
		loadingMessage = "",
		hideMap = false,
		hideYear = false,
		hidden = false,
		// story mode leaves the dropdown as a label; explore hands it over
		exploreMode = false,
		panelHeight = $bindable(0)
	} = $props();

	let panelEl;

	// hover box under the legend: within each afterlife group, this
	// variable's weighted answer split, colored like the legend
	const groupStats = $derived.by(() => {
		const stats = groupPercentages[selectedVariable];
		const config = variableConfig[selectedVariable];
		if (!stats || !config) return null;
		const buckets = config.type === "numeric" ? config.ranges : config.categories;
		const colors = (buckets ?? []).map((b) => b.color);
		return Object.entries(stats.groups).map(([name, pcts]) => ({
			name,
			segments: pcts
				.map((pct, i) => ({
					pct,
					color: colors[i] ?? "#443254",
					label: stats.buckets[i]
				}))
				.filter((s) => s.pct > 0)
		}));
	});

	// reports the panel's bottom edge, so the topdown map can clear it
	$effect(() => {
		if (!panelEl) return;
		const resizeObserver = new ResizeObserver(() => {
			panelHeight = panelEl.offsetTop + panelEl.offsetHeight;
		});
		resizeObserver.observe(panelEl);
		return () => resizeObserver.disconnect();
	});
</script>

<!-- inert while faded out, so nothing hidden is read or tabbed to -->
<div class="panel" class:is-hidden={hidden} inert={hidden} bind:this={panelEl}>
	{#if loadingMessage}
		<div class="loading">{loadingMessage}</div>
	{:else}
		<!-- keyed on the variable, so a new one remounts and slides in -->
		{#key selectedVariable}
			<label class="field field--enter">
				<!-- <span>Color by</span> -->
				<select bind:value={selectedVariable} disabled={!exploreMode}>
					{#each variableOptions as group (group.parent)}
						<optgroup label={group.parent}>
							{#each group.options as option (option.key)}
								<option value={option.key}>{option.label}</option>
							{/each}
						</optgroup>
					{/each}
				</select>
			</label>

			{#if legendData?.kind === "gradient" || legendData?.kind === "categorical"}
			<!-- hovering the legend reveals the weighted answer split below it -->
			<div class="legend-hover-zone">
				{#if legendData.kind === "gradient"}
					<!-- a continuous scale: the ramp and its two ends -->
					<div class="legend legend--gradient legend--enter">
						<span class="legend-end">{legendData.min}</span>
						<div
							class="legend-ramp"
							style:background="linear-gradient(to right, {legendData.stops.join(', ')})"
						></div>
						<span class="legend-end">{legendData.maxLabel ?? legendData.max}</span>
					</div>
				{:else}
					<div class="legend legend--enter">
						{#each legendData.items as item (item.label)}
							<!-- category hue dimmed under a dark wash so the white label survives bright swatches -->
							<div
								class="legend-row"
								style:background={washedBackgroundCSS(item.color)}
							>
								{item.label}
							</div>
						{/each}
					</div>
				{/if}
				{#if groupStats}
					<!-- weighted Wave 2 split of this variable inside each belief group -->
					<div class="group-stats">
						<div class="group-stats-title">
							{groupStats.length > 1 ? "How each group answered" : "How everyone answered"}
						</div>
						{#each groupStats as group (group.name)}
							<div class="group-stat-row">
								{#if groupStats.length > 1}
									<span class="group-stat-name">{group.name}</span>
								{/if}
								<div class="group-stat-bar">
									{#each group.segments as seg (seg.label)}
										<div
											class="group-stat-seg"
											style:width="{seg.pct}%"
											style:background={seg.color}
											title="{seg.label}: {seg.pct}%"
										>
											{#if seg.pct >= 10}
												<span class="group-stat-pct">{Math.round(seg.pct)}%</span>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			{/if}
		{/key}


		{#if !hideYear}
			<div class="button-row">
				<button
					class="mode-toggle"
					class:active={positionMode === "Y1"}
					onclick={() => (positionMode = "Y1")}
				>
					2022-23
				</button>
				<button
					class="mode-toggle"
					class:active={positionMode === "Y2"}
					onclick={() => (positionMode = "Y2")}
				>
					2024
				</button>
			</div>
		{/if}

		<!-- {#if mode === "walk"}
			{#if currentAge !== null}
				<div class="current-age">Age {currentAge}</div>
			{/if}
			<div class="instructions">Drag to steer &nbsp;·&nbsp; scroll to walk</div>
		{/if} -->
	{/if}
</div>



<style>
	.panel {
		position: absolute;
		top: 0rem;
		left: 0;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 1rem 1rem;
		/* background: rgba(10, 5, 16, 0.6); */
		/* border: 1px solid rgba(255, 255, 255, 0.1); */
		border-radius: 0.5rem;
		color: #eee;
		font-family: var(--font-sans);
		font-size: 0.8rem;
		line-height: 1.6;
		/* backdrop-filter: blur(3px); */
		/* width: 100%; */
		max-width: 100%;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.field span {
		color: #a99cb8;
		font-size: 0.85rem;
		text-transform: uppercase;
	}

	.field select {
		/* matches the legend size below it */
		font-size: 0.95rem !important;
		text-shadow:
			0 1px 3px rgba(0, 0, 0, 0.95),
			0 0 12px rgba(0, 0, 0, 0.7);
		/* reset.css targets the bare tag and would win otherwise */
		font-family: inherit;
		font-weight: 700;
		background: black;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0;
		padding: 0.3rem 1.5rem 0.3rem 0.4rem;
		max-width: 600px;
		/* our own chevron on the right; the black background hides native ones */
		appearance: none;
		-webkit-appearance: none;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23cfa4ff' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.5rem center;
	}
	/* story mode: a caption, not a control, so no affordance to open it */
	.field select:disabled {
		background-image: none;
		padding-right: 0.4rem;
	}

	/* story mode: a caption, not a control. browsers fade a disabled select */
	.field select:disabled {
		border-color: transparent;
		/* no box: it reads as the chart's headline on the room */
		background: transparent;
		/* no box to sit inside, so it lines up with the legend below */
		padding-left: 0;
		padding-right: 0;
		color: white;
		opacity: 1;
		-webkit-text-fill-color: white;
		cursor: default;
	}

.legend {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	margin-left: 0px;
	color: var(--color-light-purple);
    gap: 0.5rem; /* tighter gap between items */
    font-size: 0.95rem;
}

/* the hover box: hidden until the pointer is over the legend (or the box
   itself, so it doesn't vanish mid-read) */
.legend-hover-zone .group-stats {
	display: none;
}
.legend-hover-zone:hover .group-stats,
.legend-hover-zone:focus-within .group-stats {
	display: block;
}
.group-stats {
	margin-top: 0.5rem;
	width: 270px;
	max-width: 100%;
	background: rgba(10, 5, 16, 0.85);
	border: 1px solid rgba(207, 164, 255, 0.35);
	padding: 0.5rem 0.6rem 0.6rem;
	box-sizing: border-box;
}
.group-stats-title {
	font-size: 0.7rem;
	text-transform: uppercase;
	letter-spacing: 0.05em;
	color: var(--color-light-purple);
	margin-bottom: 0.35rem;
}
.group-stat-row {
	display: flex;
	align-items: flex-end;
	gap: 0.45rem;
	/* room above each bar for the percentage labels */
	margin-top: 16px;
}
.group-stat-row:first-of-type {
	margin-top: 12px;
}
.group-stat-name {
	flex: none;
	width: 44px;
	font-size: 0.72rem;
	color: rgba(255, 255, 255, 0.85);
	line-height: 1;
	padding-bottom: 2px;
}
.group-stat-bar {
	flex: 1;
	display: flex;
	height: 12px;
}
.group-stat-seg {
	position: relative;
	height: 100%;
	min-width: 1px;
}
.group-stat-pct {
	position: absolute;
	top: -14px;
	left: 50%;
	transform: translateX(-50%);
	font-size: 0.66rem;
	line-height: 1;
	color: rgba(255, 255, 255, 0.85);
	white-space: nowrap;
}

.legend--gradient {
    align-items: center;
    gap: 0.4rem;
}

.legend-ramp {
    width: 190px;
    max-width: 45vw;
    height: 0.7rem;
}

.legend-end {
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

.legend-row {
    display: flex;
    align-items: center;
    padding: 0.15rem 0.4rem;
    border-radius: 0rem;
    color: #fff;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
}

	.button-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.mode-toggle {
		align-self: flex-start;
		font-family: var(--font-sans);
		background: #1a0c2b;
		/* unselected: raised, in a darker purple */
		color: #8f6fae;
		border: 1px solid rgba(207, 164, 255, 0.35);
		border-radius: 0rem;
		padding: 0.3rem 0.55rem;
		font-size: 0.78rem;
		cursor: pointer;
		transition:
			color 150ms ease-out,
			border-color 150ms ease-out;
	}

	.mode-toggle:hover {
		color: #b596d6;
		border-color: rgba(207, 164, 255, 0.55);
	}

	/* selected: white, and pressed into its shadow */
	.mode-toggle.active {
		background: #1a0c2b;
		border-color: rgba(207, 164, 255, 0.7);
		color: #fff;
		box-shadow: none;
		transform: translate(2px, 2px);
	}

	.mode-toggle.active:hover {
		color: #fff;
	}

	.current-age {
		color: #eee;
		font-size: 0.7rem;
		font-weight: 600;
	}

	.instructions {
		color: #a99cb8;
		font-size: 0.62rem;
	}

	.loading {
		color: #c3c2b7;
		font-size: 0.7rem;
	}

	/* fades rather than cuts, and a hidden panel can't be clicked */
	.panel {
		transition: opacity 320ms ease-out;
	}
	.panel.is-hidden {
		opacity: 0;
		pointer-events: none;
	}


	/* narrow screens: smaller type */
	@media (max-width: 700px) {
		.panel {
			font-size: 0.62rem;
			gap: 0.5rem;
			padding: 0.75rem;
			/* stops clear of the audio button in the corner */
			box-sizing: border-box;
			max-width: calc(100% - 58px);
		}
		.field select {
			max-width: 100%;
		}
		.panel :global(select),
		.field select {
			font-size: 0.72rem !important;
		}
		.legend {
			font-size: 0.72rem;
			gap: 0.35rem;
		}
		.mode-toggle {
			font-size: 0.62rem;
			padding: 0.25rem 0.45rem;
		}
	}

	/* a new variable slides its label and legend in from the left */
	.field--enter {
		animation: control-slide-in 380ms cubic-bezier(0.16, 0.9, 0.3, 1) both;
	}
	.legend--enter {
		/* a beat behind the label, so the two read as one sweep */
		animation: control-slide-in 380ms cubic-bezier(0.16, 0.9, 0.3, 1) 70ms both;
	}
	@keyframes control-slide-in {
		from {
			transform: translateX(-18px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.field--enter,
		.legend--enter {
			animation: none;
		}
	}
</style>
