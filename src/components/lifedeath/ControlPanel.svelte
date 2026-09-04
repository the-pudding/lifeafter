<script>
	// overlay UI. no three.js — just reads/writes the props Main passes
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
		// story mode leaves the dropdown as a read-only label; explore hands
		// the variable back to the reader
		exploreMode = false,
		panelHeight = $bindable(0)
	} = $props();

	let panelEl;
	// reports the panel's bottom edge so the topdown map can clear it —
	// its own height plus wherever it starts, since narrow screens push it
	// down past the explore button. content varies with variable and
	// viewport, so a fixed guess drifts
	$effect(() => {
		if (!panelEl) return;
		const resizeObserver = new ResizeObserver(() => {
			panelHeight = panelEl.offsetTop + panelEl.offsetHeight;
		});
		resizeObserver.observe(panelEl);
		return () => resizeObserver.disconnect();
	});
</script>

<div class="panel" class:is-hidden={hidden} bind:this={panelEl}>
	{#if loadingMessage}
		<div class="loading">{loadingMessage}</div>
	{:else}
		<!-- keyed on the variable, so picking a new one remounts these and
		     re-runs the slide-in: the change reads as a change -->
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

			{#if legendData?.kind === "gradient"}
			<!-- continuous scale: the ramp itself, with its two ends -->
			<div class="legend legend--gradient legend--enter">
				<span class="legend-end">{legendData.min}</span>
				<div
					class="legend-ramp"
					style:background="linear-gradient(to right, {legendData.stops.join(', ')})"
				></div>
				<span class="legend-end">{legendData.max}</span>
			</div>
		{:else if legendData?.kind === "categorical"}
			<div class="legend legend--enter">
				{#each legendData.items as item (item.label)}
					<div class="legend-row" style:background={item.color}>
						{item.label}
					</div>
				{/each}
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
		font-family: var(--font-serif);
		font-size: 0.7rem;
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
		font-size: 0.95rem !important;
		/* reset.css targets the bare tag and would win over the mono font */
		font-family: inherit;
		font-weight: 700;
		background:black;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0;
		padding: 0.3rem 0.4rem;
		max-width: 600px;
	}

	/* story mode: reads as a caption, not a control. browsers grey out and
	   fade a disabled select, so colour and opacity are restated here */
	.field select:disabled {
		border-color: transparent;
		/* no border or box to sit inside, so drop the inset too and let it
		   line up with the legend below it */
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
    font-size: 0.85rem;
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
		font-family: var(--font-serif);
		background: transparent;
		color: rgba(255, 255, 255, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 0rem;
		padding: 0.3rem 0.55rem;
		font-size: 0.68rem;
		cursor: pointer;
		transition:
			color 150ms ease-out,
			border-color 150ms ease-out;
	}

	.mode-toggle:hover {
		color: rgba(255, 255, 255, 0.75);
		border-color: rgba(255, 255, 255, 0.45);
	}

	/* selected = white, unselected = dimmed */
	.mode-toggle.active {
		background: transparent;
		border-color: #fff;
		color: #fff;
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

	/* fade, not cut. CSS transition, since the render loop starves Svelte's.
	   pointer-events dropped so a hidden panel isn't clickable */
	.panel {
		transition: opacity 320ms ease-out;
	}
	.panel.is-hidden {
		opacity: 0;
		pointer-events: none;
	}


	/* narrow screens: smaller type; nothing to clear at the top any more,
	   the explore button lives down by the minimap now */
	@media (max-width: 700px) {
		.panel {
			font-size: 0.62rem;
			gap: 0.5rem;
			padding: 0.75rem;
		}
		.panel :global(select),
		.field select {
			font-size: 0.8rem !important;
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

	/* a new variable slides its label and legend in from the left, so the
	   recolor isn't the only signal that something changed. CSS keyframes
	   rather than a svelte transition — the three.js loop next door starves
	   main-thread-driven ones */
	.field--enter {
		animation: control-slide-in 380ms cubic-bezier(0.16, 0.9, 0.3, 1) both;
	}
	.legend--enter {
		/* a beat behind the label, so they read as one sweep */
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
