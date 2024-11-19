<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import { truncateText } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	export let name = '';
	export let desc = '';
	const dispatch = createEventDispatcher();

	export let installing = false;
	export let uninstalling = false;

	const showModal = async () => {
		dispatch('longPressed');
	};
</script>

<Card
	on:click
	style={installing || uninstalling ? 'opacity: .5;' : ''}
	on:longpress={showModal}
	longpressDuration={700}
>
	<p class="label-large">{name}</p>
	{#if desc && !uninstalling}
		<p class="label-medium" style="color : gray">{truncateText(desc, 40)}</p>
	{/if}
	{#if installing || uninstalling}
		<div style="display: flex;align-items: center;">
			<div class="label-medium">{installing ? 'Installing' : 'Uninstalling'} plugin</div>
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
