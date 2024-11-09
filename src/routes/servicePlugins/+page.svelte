<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { installingPluigns, pluginStore, processMediaData } from '$lib/stores/node-config';
	import { onMount } from 'svelte';
	import AvailablePlugins from '$lib/components/AvailablePluginList.svelte';
	import PluginCard from '$lib/components/PluginCard.svelte';
	import Modal from '$lib/components/modal.svelte';
	import { getNodes } from '$lib/hubRpcs/getNodes';
	import { gatewayId } from '$lib/stores';
	import { CloudPluginStore } from '$lib/utils';

	let category = '';

	let type = $page.state;
	let isOpen = false;
	let pluginServices: any[] = [];
	let showModal = false;
	let selectedPlugin: any = {};

	const goBack = async () => {
		history.go(-1);
	};

	const addPlugin = async () => {
		isOpen = true;
	};

	const showSettings = async (plugin: string) => {
		showModal = true;
		selectedPlugin = plugin;
	};

	async function fetchMediaHubs() {
		try {
			let nodesData = await getNodes($gatewayId);
			let mediaHubs = [...nodesData.nodes];
			processMediaData(mediaHubs[0].plugins);
		} catch (error) {
			console.error('failed to fetch the media hubs');
		}
	}

	const unInstallPlugin = async () => {
		showModal = false;

		if (selectedPlugin) {
			if (confirm(`Do you want to uninstall ${selectedPlugin.name}`)) {
				await fetchMediaHubs();
				await init();
				console.log('uninstalled', selectedPlugin);
			}
		}
	};

	onMount(() => {
		init();
	});

	// Create a separate interface or type for list items
	interface PluginListItem {
		name: string;
		id: string;
		// Add other properties you want to display in the list
	}

	let availablePlugins: PluginListItem[] = [];

	// In your main component where you prepare the data
	function getUninstalledDevicePlugins() {
		const installedPluginIds = new Set(pluginServices.map((service) => service.id));
		const installingPluginIds = new Set($installingPluigns.map((plugin) => plugin.id));

		let cloudDevicePlugins: PluginListItem[] = [];

		CloudPluginStore.subscribe((cloudStore) => {
			cloudStore.core.plugins.forEach((plugin) => {
				if (plugin.device_plugins && plugin.device_plugins.length > 0) {
					// Transform the device plugins to match PluginListItem interface
					const transformedPlugins = plugin.device_plugins.map((dp) => ({
						name: dp.name,
						id: dp.id
					}));
					cloudDevicePlugins.push(...transformedPlugins);
				}
			});
		});

		return cloudDevicePlugins.filter(
			(plugin) => !installedPluginIds.has(plugin.id) && !installingPluginIds.has(plugin.id)
		);
	}

	const init = async () => {
		category = $page.state as 'core' | 'general';
		if (category === 'core') {
			pluginServices = $pluginStore.plugins.core.plugins.reduce((acc: any[], plugin) => {
				if (plugin.device_plugins && plugin.device_plugins.length > 0) {
					return [...acc, ...plugin.device_plugins];
				}
				return acc;
			}, []);

			// Now storing only the required information
			availablePlugins = getUninstalledDevicePlugins();
		} else {
			pluginServices = $pluginStore.plugins.general.plugins;
			availablePlugins = [];
		}
	};

	const installPlugin = async (event: CustomEvent) => {
		const selectedPlugin = event.detail;

		// Find the full plugin object using the ID
		CloudPluginStore.subscribe((cloudStore) => {
			let fullPlugin = {
				name: '',
				id: '',
				type: ''
			};
			cloudStore.core.plugins.forEach((corePlugin) => {
				if (corePlugin.device_plugins) {
					const found = corePlugin.device_plugins.find((dp) => dp.id === selectedPlugin.id);
					if (found) fullPlugin = found;
				}
			});

			if (fullPlugin) {
				console.log('Full Plugin Object:', fullPlugin);
				$installingPluigns = [...$installingPluigns, { ...fullPlugin, coreType: category }];
				availablePlugins = getUninstalledDevicePlugins();
			}
		});
	};
	// Watch for changes in installingPlugins
	$: {
		$installingPluigns; // Track changes in installing plugins
		$CloudPluginStore; // Track changes in cloud store
		if (category === 'core' && pluginServices.length >= 0) {
			availablePlugins = getUninstalledDevicePlugins();
		}
	}
</script>

<div class="theme-page">
	<Modal bind:isOpen={showModal} title="Plugin Settings" style="height:13vh;">
		<div class="p-2" style="display: flex;align-items: center; gap:8px" on:click={unInstallPlugin}>
			<span class="icon-delete fsipx-24" />
			Uninstall plugin
		</div>
	</Modal>

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
			{#each pluginServices as service, i (service.name)}
				<PluginCard
					name={service.name}
					desc={service.description}
					on:longPressed={() => showSettings(service)}
				/>
			{/each}
		{:else}
			<p class="no-plugins">
				{type === 'core' ? 'No device plugins available' : 'No general plugins available'}
			</p>
		{/if}

		{#if $installingPluigns.length > 0}
			{#each $installingPluigns as plugin}
				{#if plugin.coreType == category}
					<PluginCard name={plugin.name} installing={true} />
				{/if}
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
		list={availablePlugins}
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
		padding: 2rem;
	}
</style>
