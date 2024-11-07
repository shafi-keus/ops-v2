<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/modal.svelte';
	import { installingPluigns } from '$lib/stores/node-config';
	import { createEventDispatcher } from 'svelte';
	export let isOpen = false;
	export let list = ['General', 'Device'];
	export let title = '';

	const dispatch = createEventDispatcher();

	const installPlugin = async (item: string) => {
		dispatch('PluginSelection', {
			name: item
		});
		isOpen = false
	};
</script>

<Modal {title} bind:isOpen>
	<div class="px-2 item">
		{#each list as item, i}
		
			<p
				class:item={i < list.length - 1}
				style="padding: 8px;"
				on:click={() => installPlugin(item)}
			>
				{item}
			</p>
		{/each}
	</div>
	<div class="p-2">
		<Button outlined on:click={() => (isOpen = false)}>
			<span class="icon-close-1 fsipx-24" />
			Close
		</Button>
	</div>
</Modal>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.item {
		border-bottom: 2px solid rgb(196, 198, 207);
	}
</style>
