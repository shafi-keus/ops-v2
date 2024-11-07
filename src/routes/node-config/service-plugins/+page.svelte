<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { installingPluigns, pluginStore } from '$lib/stores/node-config';
	import { onMount } from 'svelte';
	import AvailablePlugins from '../AvailablePluginList.svelte';
	import PluginCard from '../PluginCard.svelte';

	let type = $page.state;
	let isOpen = false;
	let pluginServices: any[] = [];

	const goBack = async () => {
		history.go(-1);
	};

	const addPlugin = async () => {
		isOpen = true;
	};

	const installPlugin = async (event: CustomEvent) => {
		console.log(event.detail);
		$installingPluigns = [...$installingPluigns, event.detail];
	};

	onMount(() => {
		const category = $page.state as 'core' | 'general';

		if (category === 'core') {
			// For core plugins, show device_plugins from all core plugins
			pluginServices = $pluginStore.plugins.core.plugins.reduce((acc: any[], plugin) => {
				if (plugin.device_plugins && plugin.device_plugins.length > 0) {
					return [...acc, ...plugin.device_plugins];
				}
				return acc;
			}, []);
		} else {
			// For general plugins, show the plugins themselves
			pluginServices = $pluginStore.plugins.general.plugins;
		}

		console.log('Plugins for', category, ':', pluginServices);
	});
</script>

<div class="theme-page">
	<div class="header bottom-shadow">
		<p class="title-large" style="padding-left: 8px;">
			{#if type === 'core'}
				Device Plugins
			{:else if type === 'general'}
				General Plugins
			{/if}
		</p>
	</div>
	<div class="content">
		{#if pluginServices.length > 0}
			{#each pluginServices as service}
				<PluginCard name={service.name} desc={service.description} />
			{/each}
		{:else}
			<p class="no-plugins">
				{type === 'core' ? 'No device plugins available' : 'No general plugins available'}
			</p>
		{/if}

		{#if $installingPluigns.length > 0}
			{#each $installingPluigns as plugin}
				<PluginCard name={plugin.name} installing={true} />
			{/each}
		{/if}
	</div>

	<div class="footer">
		<Button circle color="black" on:click={goBack} size="lg">
			<span class="icon-chevron-left-1" />
		</Button>
		<Button circle size="lg" on:click={addPlugin}>
			<span class="icon-plus-1" />
		</Button>
	</div>

	<AvailablePlugins
		bind:isOpen
		title={type === 'core' ? 'Device Plugins' : 'General Plugins'}
		list={pluginServices.map((service) => service.name)}
		on:PluginSelection={installPlugin}
	/>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.header {
		width: 100%;
		padding: 16px 8px;
	}
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding-inline: 8px;
		padding-block: 16px;
		flex-grow: 1;
	}

	.theme-page {
		height: 100vh;
		width: 100vw;
		position: relative;
	}
	.footer {
		position: absolute;
		bottom: 16px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 16px;
	}

	.no-plugins {
		text-align: center;
		color: var(--on-surface-variant);
		padding: 2rem;
	}
</style>
