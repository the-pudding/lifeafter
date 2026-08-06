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
		loadingMessage = "",
		hideMap = false,
		panelHeight = $bindable(0)
	} = $props();

	let panelEl;
	// Reports this panel's own real rendered height back up to Main so the
	// top-down minimap (see Minimap.lifedeath.svelte's panelClear prop) can
	// clear it exactly — its content (legend row count, wrapped text) varies
	// with the selected variable and viewport width, so a guessed fixed
	// value drifts out of sync; measuring is the only thing that stays correct.
	$effect(() => {
		if (!panelEl) return;
		const resizeObserver = new ResizeObserver(() => {
			panelHeight = panelEl.offsetHeight;
		});
		resizeObserver.observe(panelEl);
		return () => resizeObserver.disconnect();
	});
</script>

<div class="panel" bind:this={panelEl}>
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

		<!-- {#if mode === "walk"}
			{#if currentAge !== null}
				<div class="current-age">Age {currentAge}</div>
			{/if}
			<div class="instructions">Drag to steer &nbsp;·&nbsp; scroll to walk</div>
		{/if} -->
	{/if}
</div>

{#if !loadingMessage && !hideMap}
	<!-- Tracks whichever small box currently sits at this corner — the
	     minimap in walk mode (Minimap.lifedeath.svelte's own
	     .minimap-canvas), or the walk-view preview in top-down mode
	     (Main's own canvas.webgl-canvas.topdown-active) — see
	     class:topdown-active below. This div itself ignores pointer
	     events so drag-to-steer/scroll-to-walk still reach the 3D canvas
	     underneath; only the button re-enables them. -->
	<div class="minimap" class:topdown-active={mode === "topdown"}>
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
		/* reset.css's own `select { font-family: var(--font-form) }` rule
		   otherwise wins over .lifedeath-room's mono font (app.css) —
		   form controls don't automatically inherit page font in every
		   browser, and that reset rule targets the bare tag directly. */
		font-family: inherit;
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

	/* Just an anchor for the toggle button below — the minimap/preview
	   itself is a real <canvas> (Minimap.lifedeath.svelte /
	   Main.lifedeath.svelte respectively), which draws its own border;
	   this div positions nothing but the button. Tracks the walk-mode
	   minimap corner box by default (Minimap.lifedeath.svelte's own
	   .minimap-canvas: right: 10px, width: 124px, mobile-capped below) —
	   the topdown-active variant below instead tracks the topdown-mode
	   walk-view preview (Main's own canvas.webgl-canvas.topdown-active:
	   right: 24px, width: 200px), so the button always sits under
	   whichever of the two boxes is actually shown at this corner. */
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
			/* The webgl preview is hidden entirely on mobile topdown (see
			   Main's own @media rule) — the enlarged minimap is the only
			   thing left at this corner there, centered and sized by its
			   own JS (see Minimap.lifedeath.svelte's layoutMinimapBox), not
			   a fixed box this could track directly — spanning the full
			   width instead of guessing at that is the simpler, still-
			   correct fallback. */
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
