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
		panelHeight = $bindable(0)
	} = $props();

	let panelEl;
	// reports rendered height so the topdown map can clear it. content
	// varies with variable and viewport, so a fixed guess drifts
	$effect(() => {
		if (!panelEl) return;
		const resizeObserver = new ResizeObserver(() => {
			panelHeight = panelEl.offsetHeight;
		});
		resizeObserver.observe(panelEl);
		return () => resizeObserver.disconnect();
	});
</script>

<div class="panel" class:is-hidden={hidden} bind:this={panelEl}>
	{#if loadingMessage}
		<div class="loading">{loadingMessage}</div>
	{:else}
		<label class="field">
			<!-- <span>Color by</span> -->
			<select bind:value={selectedVariable}>
				{#each variableOptions as group (group.parent)}
					<optgroup label={group.parent}>
						{#each group.options as option (option.key)}
							<option value={option.key}>{option.label}</option>
						{/each}
					</optgroup>
				{/each}
			</select>
		</label>

		{#if legendData?.kind === "categorical"}
			<div class="legend">
				{#each legendData.items as item (item.label)}
					<div class="legend-row" style:background={item.color}>
						{item.label}
					</div>
				{/each}
			</div>
		{/if}

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

{#if !loadingMessage && !hideMap}
	<!-- tracks whichever small box currently sits at this corner — the
	     minimap in walk mode (Minimap.lifedeath.svelte's own
	     .minimap-canvas), or the walk-view preview in top-down mode
	     (Main's own canvas.webgl-canvas.topdown-active) — see
	     class:topdown-active below. this div itself ignores pointer
	     events so drag-to-steer/scroll-to-walk still reach the 3D canvas
	     underneath; only the button re-enables them. -->
	<div class="minimap" class:topdown-active={mode === "topdown"} class:is-hidden={hidden}>
		<button class="minimap-toggle" onclick={() => (mode = mode === "walk" ? "topdown" : "walk")}>
			{mode === "walk" ? "Top-down view" : "Back to walk view"}
		</button>
	</div>
{/if}

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
		font-size: 1rem;
		text-transform: uppercase;
	}

	.field select {
		font-size: 1.1rem !important;
		/* reset.css targets the bare tag and would win over the mono font */
		font-family: inherit;
		background:black;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.4);
		border-radius: 0;
		padding: 0.3rem 0.4rem;
		max-width: 600px;
	}

.legend {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	margin-left: 0px;
	color: var(--color-light-purple);
    gap: 0.5rem; /* tighter gap between items */
    font-size: 1rem; /* larger text size */
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
		background: transparent;
		color: rgba(255, 255, 255, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 0rem;
		padding: 0.35rem 0.6rem;
		font-size: 0.75rem;
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
		font-size: 0.8rem;
		font-weight: 600;
	}

	.instructions {
		color: #a99cb8;
		font-size: 0.7rem;
	}

	.loading {
		color: #c3c2b7;
		font-size: 0.8rem;
	}

	/* fade, not cut. CSS transition, since the render loop starves Svelte's.
	   pointer-events dropped so a hidden panel isn't clickable */
	.panel,
	.minimap {
		transition: opacity 320ms ease-out;
	}
	.panel.is-hidden,
	.minimap.is-hidden {
		opacity: 0;
		pointer-events: none;
	}

	/* anchor for the toggle button only; the canvases draw themselves.
	   tracks the walk-mode minimap box, or the topdown preview below, so
	   the button sits under whichever is shown */
	.minimap {
		position: absolute;
		right: 10px;
		bottom: 10px;
		width: 124px;
		z-index: 999;
		pointer-events: none;
	}

	.minimap.topdown-active {
		right: 24px;
		width: 200px;
	}

	@media (max-width: 640px) {
		.minimap {
			width: min(124px, 30vw);
		}
		.minimap.topdown-active {
			/* the preview is hidden on mobile topdown, and the enlarged
			   minimap is JS-sized, so span the full width instead */
			right: 0;
			left: 0;
			width: auto;
		}
	}

	.minimap-toggle {
		position: absolute;
		right: 0;
		left: 0;
		bottom: 7px;
		width: 100%;
		text-align: center;
		pointer-events: auto;
		background: rgba(10, 5, 16, 0.85);
		color: #eee;
		border: 1px solid rgba(255, 255, 255, 0.2);
		padding: 8px 6px;
		border-radius: 0px;
		font-family: var(--font-mono);
		font-size: 14px !important;
		cursor: pointer;
		backdrop-filter: blur(4px);
		z-index: 999;
		box-sizing: border-box;
	}

	.minimap-toggle:hover {
		background: rgba(255, 255, 255, 0.18);
	}
</style>
