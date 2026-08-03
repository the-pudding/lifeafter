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
				class:active={positionMode === "Y1"}
				onclick={() => (positionMode = "Y1")}
			>
				Wave 1
			</button>
			<button
				class="mode-toggle"
				class:active={positionMode === "Y2"}
				onclick={() => (positionMode = "Y2")}
			>
				Wave 2
			</button>
		</div>

		<!-- {#if mode === "walk"}
			{#if currentAge !== null}
				<div class="current-age">Age {currentAge}</div>
			{/if}
			<div class="instructions">Drag to steer &nbsp;·&nbsp; scroll to walk</div>
		{/if} -->
	{/if}
</div>

{#if !loadingMessage}
	<!-- Positions the toggle button over the real minimap <canvas> that
	     Minimap.lifedeath.svelte draws separately (see its own
	     .minimap-canvas — this div's own width/height must match that box).
	     This div itself ignores pointer events so drag-to-steer/
	     scroll-to-walk still reach the 3D canvas underneath; only the button re-enables them. -->
	<div class="minimap">
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
		backdrop-filter: blur(3px);
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
		background: rgba(255, 255, 255, 0.08);
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 0;
		padding: 0.3rem 0.4rem;
		max-width: 320px;
	}

.legend {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
	margin-left: 0px;
	color: var(--color-light-purple);
    gap: 0.5rem; /* tighter gap between items */
    font-size: 1rem; /* larger text size */
	text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
}

.legend-row {
    display: flex;
    align-items: center;
    gap: 0.25rem; /* reduced space between swatch and label */
}

.swatch {
    width: 0.85rem; /* slightly enlarged to balance the bigger text */
    height: 0.85rem;
	border: 2px solid #000;
    /* border-radius: 50%; */
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

	.mode-toggle.active {
		background: #9d00ff;
		border-color: #9d00ff;
		color: #fff;
	}

	.mode-toggle.active:hover {
		background: #9d00ff;
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

	/* Just an anchor for the toggle button below — the minimap itself is a
	   real <canvas> (see Minimap.lifedeath.svelte), which draws its own
	   border; this div positions nothing but the button. */
	.minimap {
		position: absolute;
		right: 24px;
		bottom: 24px;
		width: 136px;
		height: 252px;
		z-index: 10;
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
