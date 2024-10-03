<script>
	import { goto } from '$app/navigation';
	import { bleInitialize } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(async()=>{
		await goto("./search");
	})
	// const init = async () => await goto('./search');
	// $: if ($bleInitialize) init();
</script>
