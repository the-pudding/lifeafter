<script>
	// right-side shelf for the doc's info section; the person modal's twin
	let { open = false, text = "", onclose } = $props();

	// markdown links to anchors, and blank lines to paragraphs
	const paragraphs = $derived(
		(text ?? "")
			.replace(/\r/g, "")
			.split(/\n\s*\n/)
			.map((p) =>
				p
					.trim()
					.replace(
						/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
						(_m, label, href) =>
							`<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
					)
			)
			.filter(Boolean)
	);
</script>

<div
	class="shelf"
	class:shelfopen={open}
	role="dialog"
	aria-label="About this piece"
	tabindex="-1"
	onclick={(e) => e.stopPropagation()}
	onmousedown={(e) => e.stopPropagation()}
	onkeydown={(e) => e.stopPropagation()}
>
	<button class="detailsClose" onclick={onclose}>Close panel</button>
	<div class="modalData">
		<div class="waveHed">About this piece</div>
		{#each paragraphs as p}
			<p class="narrative">{@html p}</p>
		{/each}
	</div>
	<div class="fixed_spacer"></div>
</div>

<style>
	/* the person modal's shelf, mirrored to the right edge */
	.shelf {
		display: block;
		font-family: var(--font-sans);
		position: fixed;
		right: -380px;
		top: 0px;
		width: 380px;
		max-width: 100%;
		height: 100%;
		height: 100dvh;
		background: #0a0510;
		border-left: 1px solid rgba(255, 255, 255, 0.22);
		box-sizing: border-box;
		z-index: 999999;
		transition: right 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
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
		right: 0px;
	}
	@media (max-width: 449px) {
		.shelf {
			width: 100%;
			right: -100%;
		}
	}
	.detailsClose {
		font-size: 15px;
		display: block;
		cursor: pointer;
		color: rgba(255, 255, 255, 0.8);
		font-weight: bold;
		font-family: var(--font-sans);
		background: #000;
		padding: 10px 5px;
		border: none;
		border-bottom: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 0;
		text-align: center;
		position: sticky;
		top: 0px;
		width: 100%;
		box-sizing: border-box;
		z-index: 20;
	}
	.detailsClose:hover {
		color: #fff;
	}
	.modalData {
		padding: 20px;
		box-sizing: border-box;
	}
	.waveHed {
		font-size: 1rem;
		margin: 0 0 12px;
		font-weight: bold;
		color: var(--color-light-purple);
		border-bottom: 2px solid var(--color-light-purple);
	}
	.narrative {
		font-size: 0.85rem;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.95);
		margin: 0 0 14px;
	}
	.narrative :global(a) {
		color: #fff;
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-decoration-color: rgba(255, 255, 255, 0.6);
		text-underline-offset: 3px;
	}
	.narrative :global(a:hover) {
		text-decoration-color: #fff;
	}
	.fixed_spacer {
		position: sticky;
		bottom: 0px;
		left: 0px;
		height: 120px;
		background: linear-gradient(180deg, rgba(10, 5, 16, 0) 0%, rgba(0, 0, 0, 1) 79%);
		width: 100%;
	}
</style>
