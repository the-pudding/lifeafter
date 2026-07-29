<script>
	// Purely presentational: the overlay UI for the lifedeath room. It knows
	// nothing about three.js — it just reads/writes the bindable mode props
	// Main.lifedeath.svelte passes it, so it can live as a plain, simple
	// component separate from all the WebGL/animation logic.
	let {
		variableOptions,
		selectedVariable = $bindable(),
		legendData,
		mode = $bindable(),
		positionMode = $bindable(),
		currentAge = null,
		loadingMessage = ""
	} = $props();
</script>

<div class="panel">
	{#if loadingMessage}
		<div class="loading">{loadingMessage}</div>
	{:else}
		<label class="field">
			<span>Color by</span>
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
					<div class="legend-row">
						<span class="swatch" style:background={item.color}></span>
						{item.label}
					</div>
				{/each}
			</div>
		{/if}

		<div class="button-row">
			<button
				class="mode-toggle"
				onclick={() => (positionMode = positionMode === "Y1" ? "Y2" : "Y1")}
			>
				{positionMode === "Y1" ? "Toggle to Y2" : "Toggle to Y1"}
			</button>
		</div>

		{#if mode === "walk"}
			{#if currentAge !== null}
				<div class="current-age">Age {currentAge}</div>
			{/if}
			<div class="instructions">Drag to steer &nbsp;·&nbsp; scroll to walk</div>
		{/if}
	{/if}
</div>

{#if !loadingMessage}
	<!-- Frames the live top-down minimap that Main.lifedeath.svelte renders
	     directly onto the WebGL canvas underneath (see MINIMAP_SIZE_PX /
	     MINIMAP_MARGIN_PX there — these px values must match). This div
	     itself ignores pointer events so drag-to-steer/scroll-to-walk still
	     reach the canvas underneath; only the button re-enables them. -->
	<div class="minimap">
		<button class="minimap-toggle" onclick={() => (mode = mode === "walk" ? "topdown" : "walk")}>
			{mode === "walk" ? "Top-down view" : "Back to walk view"}
		</button>
	</div>
{/if}

<style>
	.panel {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		background: rgba(10, 5, 16, 0.6);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		color: #eee;
		font-size: 0.8rem;
		line-height: 1.6;
		backdrop-filter: blur(4px);
		max-width: 16rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.field span {
		color: #a99cb8;
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.field select {
		background: rgba(255, 255, 255, 0.08);
		color: #eee;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0.35rem;
		padding: 0.3rem 0.4rem;
		font-size: 0.8rem;
		max-width: 100%;
	}

	.legend {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.legend-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.swatch {
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 50%;
		flex: none;
	}

	.button-row {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.mode-toggle {
		align-self: flex-start;
		background: rgba(255, 255, 255, 0.1);
		color: #eee;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0.35rem;
		padding: 0.35rem 0.6rem;
		font-size: 0.75rem;
		cursor: pointer;
	}

	.mode-toggle:hover {
		background: rgba(255, 255, 255, 0.18);
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

	/* Must match MINIMAP_SIZE_PX / MINIMAP_MARGIN_PX in Main.lifedeath.svelte
	   — this frames the live WebGL render underneath, it draws nothing
	   itself. */
	.minimap {
		position: absolute;
		right: 24px;
		bottom: 24px;
		width: 160px;
		height: 160px;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 0.5rem;
		pointer-events: none;
	}

	.minimap-toggle {
		position: absolute;
		left: 50%;
		bottom: -1rem;
		transform: translateX(-50%);
		pointer-events: auto;
		background: rgba(10, 5, 16, 0.85);
		color: #eee;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		padding: 0.3rem 0.7rem;
		font-size: 0.7rem;
		white-space: nowrap;
		cursor: pointer;
		backdrop-filter: blur(4px);
	}

	.minimap-toggle:hover {
		background: rgba(255, 255, 255, 0.18);
	}
</style>
