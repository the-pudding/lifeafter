<script>
	// shadow, plain, line, bubble
	import wordmark from "$svg/wordmark-bubble.svg";
</script>

<header>
	<div class="wordmark">
		<a href="https://pudding.cool" aria-label="The Pudding" target="_self"
			>{@html wordmark}</a
		>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 999;
		height: 50px;
	} 
	.wordmark {
		max-width: 10em;
		/* margin: 0 auto; */
		padding: 32px 0;
		/* transform: rotate(-4deg); */
		left: 50%;
		position: fixed;
		top: 0px;
		z-index: 999;
		transform: translateX(-50%) rotate(-4deg);
	}

	.wordmark a {
		border: none;
		display: block;
		color: var(--color-fg);
	}

	.wordmark a:hover {
		background-color: transparent;
	}
</style>
