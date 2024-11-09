<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { truncateText } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	export let name = '';
	export let desc = '';
	const dispatch = createEventDispatcher();
	let params = { duration: 300 };

	export let installing = false;

	const showModal = async () => {
		console.log('pressed');
		dispatch('longPressed');
	};
</script>

<Card on:click style={installing ? 'opacity: .5;' : ''} on:longpress={showModal}>
	<p class="label-large">{name}</p>
	{#if desc}
		<p class="label-medium" style="color : gray">{truncateText(desc,40)}</p>
	{/if}
	{#if installing}
		<div style="display: flex;align-items: center;">
			<div class="label-medium">installing plugin</div>
			<div><Loader scale={0.5} color="text-secondary" /></div>
		</div>
	{/if}
</Card>

<style>
	* {
		margin: 0;
		padding: 0;
	}
</style>
