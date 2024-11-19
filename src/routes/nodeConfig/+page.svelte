<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
	import Button from '$lib/components/Button.svelte';
	import {
		installingPluigns,
		pluginStore,
		processMediaData,
		type CorePluginOutput,
		type GeneralPluginOutput
	} from '$lib/stores/node-config';
	import { onMount } from 'svelte';
	import AvailableCategories from '$lib/components/AvailablePluginList.svelte';
	import PluginCard from '$lib/components/PluginCard.svelte';
	import { CloudPluginStore, INTER_PLUGINS } from '$lib/utils';
	import installServicePlugin from '$lib/apis/installPlugin';
	import { getNodes } from '$lib/hubRpcs/getNodes';
	import { gatewayId } from '$lib/stores';
	import { installPluginThroughNats } from '$lib/hubRpcs/installPlugin';
	import { unInstallPluginThroughNats } from '$lib/hubRpcs/unInstallPlugin';
	import Modal from '$lib/components/modal.svelte';
	import { Toast } from '@capacitor/toast';

	// Add uninstalling plugins store
	const uninstallingPlugins = writable<string[]>([]);

	const IP_ADDRESS = '10.1.4.107';
	const LAUNCH_TYPE = 'INTRA_PP';
	const DEFAULT_VERSION = '1.0.0';

	interface PluginCategory {
		type: string;
		name: string;
		description: string;
		plugins: CorePluginOutput[] | GeneralPluginOutput[];
	}

	interface PageState {
		nodeId: string;
	}

	interface CloudPlugin {
		id: string;
		name: string;
		description: string;
		type: string;
		version?: string;
	}

	let isOpen = false;
	let showModal = false;
	let selectedPlugin: any = {};
	let nodeId: string = '';
	let pluginCategories: PluginCategory[] = [];
	let availablePluginCategories: CloudPlugin[] = [];
	const pageState = $page.state as PageState;

	type LaunchType = 'INTER_PP' | 'INTRA_PP';

	const goBack = () => history.go(-1);
	const addCategory = () => (isOpen = true);

	const showSettings = (plugin: any) => {
		showModal = true;
		selectedPlugin = plugin;
	};

	const handleUninstall = async () => {
		showModal = false;
		if (!selectedPlugin?.name || !selectedPlugin?.version || !pageState.nodeId) return;

		const shouldUninstall = confirm(`Do you want to uninstall ${selectedPlugin.name}?`);
		if (!shouldUninstall) return;

		try {
			uninstallingPlugins.update((plugins) => [...plugins, selectedPlugin.id]);

			const uninstallData = {
				pluginId: selectedPlugin.id,
				nodeId: pageState.nodeId,
				version: selectedPlugin.version || DEFAULT_VERSION
			};

			let resp = await unInstallPluginThroughNats($gatewayId, uninstallData);
			if (resp?.success) {
				await Toast.show({
					text: `${selectedPlugin.name} uninstalled successfully`,
					duration: 'short',
					position: 'top'
				});
			}

			await fetchMediaHubs();
			await init();
		} catch (error) {
			console.log('Uninstallation failed:', error);
			alert('Failed to uninstall the plugin');
		} finally {
			uninstallingPlugins.update((plugins) => plugins.filter((id) => id !== selectedPlugin.id));
			showModal = false;
		}
	};

	const navigateToServicePlugins = (category: string, categoryId?: string) => {
		goto('./servicePlugins', {
			state: {
				category,
				nodeId: pageState.nodeId,
				...(categoryId && { categoryId })
			}
		});
	};
	const determineLaunchType = (pluginId: string): LaunchType =>
		INTER_PLUGINS.has(pluginId) ? 'INTER_PP' : 'INTRA_PP';

	const handlePluginSelection = async (event: CustomEvent) => {
		const selectedPlugin = event.detail;

		try {
			const fullPlugin = await getFullPluginDetails(selectedPlugin.id);
			if (!fullPlugin) {
				console.log('Plugin not found in cloud store');
				return;
			}

			const installData: any = {
				id: fullPlugin.id,
				launchType: determineLaunchType(fullPlugin.id),
				nodeId: pageState.nodeId,
				version: fullPlugin.version || DEFAULT_VERSION
			};

			$installingPluigns = [...$installingPluigns, fullPlugin];
			availablePluginCategories = getAvailablePlugins(pluginCategories, $CloudPluginStore);

			const response = await installPluginThroughNats($gatewayId, installData);

			if (response?.success) {
				await fetchMediaHubs();
				init();
			} else {
				alert('Failed to install the plugin');
			}
		} catch (error) {
			console.log('Error during plugin installation:', error);
			$installingPluigns = $installingPluigns.filter((p) => p.id !== selectedPlugin.id);
			alert('Failed to install the plugin');
		}
	};

	function getFullPluginDetails(pluginId: string): Promise<CloudPlugin | null> {
		return new Promise((resolve) => {
			CloudPluginStore.subscribe((cloudStore) => {
				const plugin = cloudStore.core.plugins.find((plugin) => plugin.id === pluginId);
				resolve(plugin || null);
			})();
		});
	}

	function getAvailablePlugins(
		installedPlugins: PluginCategory[],
		cloudPlugins: typeof $CloudPluginStore
	): CloudPlugin[] {
		const installedCoreIds = new Set(
			installedPlugins
				.find((category) => category.type === 'core')
				?.plugins.map((plugin) => plugin.id) || []
		);

		const installingPluginIds = new Set(
			$installingPluigns
				.filter((plugin) => plugin.type === 'CORE_PLUGIN')
				.map((plugin) => plugin.id)
		);

		return cloudPlugins.core.plugins
			.filter((plugin) => !installedCoreIds.has(plugin.id) && !installingPluginIds.has(plugin.id))
			.map(({ id, name, description, type }) => ({
				id,
				name,
				description,
				type
			}));
	}

	async function fetchMediaHubs() {
		try {
			const nodesData: any = await getNodes($gatewayId);
			const [firstHub] = nodesData.nodes;
			processMediaData(firstHub.plugins);
		} catch (error) {
			console.log('Failed to fetch media hubs:', error);
		}
	}

	const init = async () => {
		const store = $pluginStore.plugins;
		nodeId = pageState.nodeId;
		pluginCategories = Object.entries(store)
			.filter(([_, data]) => data?.plugins?.length > 0)
			.map(([type, data]) => ({
				type,
				name: data?.name || '',
				description: data?.description || '',
				plugins: data?.plugins
			}));

		if (!pluginCategories.some((category) => category.type === 'general')) {
			pluginCategories.push({
				type: 'general',
				name: 'General Plugins',
				description: 'Plugins for general utilities',
				plugins: []
			});
		}
	};

	onMount(() => {
		init();
		const unsubscribe = CloudPluginStore.subscribe((cloudStore) => {
			availablePluginCategories = getAvailablePlugins(pluginCategories, cloudStore);
		});

		return unsubscribe;
	});

	$: if (pluginCategories.length > 0) {
		availablePluginCategories = getAvailablePlugins(pluginCategories, $CloudPluginStore);
	}
</script>

<div class="theme-page">
	<Modal bind:isOpen={showModal} title={selectedPlugin.name} style="height:15vh;">
		<div class="p-2 uninstall-button" on:click={handleUninstall}>
			<span class="icon-delete fsipx-24" />
			Uninstall plugin
		</div>
	</Modal>

	<header class="header bottom-shadow">
		<p class="title-large" style="padding-left: 8px;">Plugin Categories</p>
	</header>

	<main class="content">
		{#each pluginCategories as category}
			{#if category.type === 'core'}
				{#each category.plugins as plugin}
					<PluginCard
						name={plugin.name}
						desc={plugin.description}
						uninstalling={$uninstallingPlugins.includes(plugin.id)}
						on:click={() => navigateToServicePlugins(category.type, plugin.id)}
						on:longPressed={() => showSettings(plugin)}
					/>
				{/each}
			{:else}
				<PluginCard
					name={category.name}
					desc={category.description}
					on:click={() => navigateToServicePlugins(category.type)}
				/>
			{/if}
		{/each}

		{#if $installingPluigns.length > 0}
			{#each $installingPluigns as plugin}
				{#if plugin.type === 'CORE_PLUGIN'}
					<PluginCard name={plugin.name} installing={true} />
				{/if}
			{/each}
		{/if}
	</main>

	<footer class="footer">
		<Button circle color="black" on:click={goBack} size="lg">
			<span class="icon-chevron-left-1" />
		</Button>
		<Button circle size="lg" on:click={addCategory}>
			<span class="icon-plus-1" />
		</Button>
	</footer>

	{#if isOpen}
		<AvailableCategories
			bind:isOpen
			title="Available Plugin Categories"
			list={availablePluginCategories}
			on:PluginSelection={handlePluginSelection}
		/>
	{/if}
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

	.uninstall-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
</style>
