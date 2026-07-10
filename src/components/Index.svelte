<script>
	import { getContext } from "svelte";
	import Main from "$components/lifedeath/Main.lifedeath.svelte";
	import Footer from "$components/Footer.svelte";

	// const copy = getContext("copy");
	// const data = getContext("data");
</script>

<svelte:boundary onerror={(e) => console.error(e)}>
	<Main />
	<!-- <Footer recirc={true} /> -->
</svelte:boundary>
