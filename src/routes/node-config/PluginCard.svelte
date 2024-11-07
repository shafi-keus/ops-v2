<script>
	import Card from '$lib/components/Card.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import PluginProgress from '$lib/components/PluginProgress.svelte';
	export let name = '';
	export let desc = '';
	export let installing = false;
</script>

<Card on:click style={installing ? 'opacity: .5;' : ''}>
	<p class="label-large">{name}</p>
	{#if desc}
		<p class="label-medium" style="color : gray">{desc}</p>
	{/if}
	{#if installing}
		<div style="display: flex;align-items: center;">
			<div class="label-medium">installing plugin</div>
			<div><Loader scale={0.5} color='text-secondary' /></div>
		</div>

		<!-- <PluginProgress {progress} /> -->
	{/if}
</Card>

<style>
	* {
		margin: 0;
		padding: 0;
	}
</style>
