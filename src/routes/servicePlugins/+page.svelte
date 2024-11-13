<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { installingPluigns, pluginStore, processMediaData } from '$lib/stores/node-config';
	import { writable } from 'svelte/store';
	import { getNodes } from '$lib/hubRpcs/getNodes';
	import { gatewayId } from '$lib/stores';
	import { CloudPluginStore, INTER_PLUGINS } from '$lib/utils';
	import installServicePlugin from '$lib/apis/installPlugin';
	import uninstallPlugin from '$lib/apis/uninstallPlugin';
	import Button from '$lib/components/Button.svelte';
	import AvailablePlugins from '$lib/components/AvailablePluginList.svelte';
	import PluginCard from '$lib/components/PluginCard.svelte';
	import Modal from '$lib/components/modal.svelte';
	import { installPluginThroughNats } from '$lib/hubRpcs/installPlugin';
	import { unInstallPluginThroughNats } from '$lib/hubRpcs/unInstallPlugin';
	import { Toast } from '@capacitor/toast';

	// Add uninstalling plugins store
	const uninstallingPlugins = writable<string[]>([]);

	type LaunchType = 'INTER_PP' | 'INTRA_PP';
	type CategoryType = 'core' | 'general';

	interface PageState {
		category: CategoryType;
		nodeId: string;
		categoryId: string;
	}

	interface PluginListItem {
		name: string;
		id: string;
		description?: string;
		version?: string;
		type?: string;
		coreType?: CategoryType;
	}

	interface PluginInstallData {
		nodeId: string;
		launchType: LaunchType;
		id: string;
		version: string;
	}

	interface PluginUninstallData {
		nodeId: string;
		pluginId: string;
		version: string;
	}

	// Constants
	const IP_ADDRESS = '10.1.4.107';
	const DEFAULT_VERSION = '1.0.0';

	const pageState = $page.state as PageState;
	const { category = 'general', nodeId = '' } = pageState;

	let state = {
		isOpen: false,
		showModal: false,
		selectedPlugin: {} as PluginListItem,
		pluginServices: [] as PluginListItem[],
		availablePlugins: [] as PluginListItem[]
	};

	const determineLaunchType = (pluginId: string): LaunchType =>
		INTER_PLUGINS.has(pluginId) ? 'INTER_PP' : 'INTRA_PP';

	interface FindPluginParams {
		pluginId: string;
		type: 'core' | 'general';
	}

	const findPluginInStore = ({
		pluginId,
		type
	}: FindPluginParams): Promise<PluginListItem | null> => {
		return new Promise((resolve) => {
			// console.log('plugin id and type : ', pluginId, type);
			// console.log('cloud store data : ', $CloudPluginStore);

			CloudPluginStore.subscribe((store) => {
				let found = null;

				if (type === 'core') {
					found = store.core.plugins
						.flatMap((plugin) => plugin.device_plugins || [])
						.find((dp) => dp?.id === pluginId);
				} else {
					found = store.general.plugins.find((plugin) => plugin.id === pluginId);
				}

				resolve(found || null);
			})();
		});
	};

	const getAvailablePlugins = (): PluginListItem[] => {
		const installedIds = new Set(state.pluginServices.map((s) => s.id));
		const installingIds = new Set($installingPluigns.map((p) => p.id));

		let plugins: PluginListItem[] = [];

		CloudPluginStore.subscribe((store) => {
			if (category === 'core') {
				const targetPlugin = store.core.plugins.find(
					(p) => p.id === pageState.categoryId && p.device_plugins?.length
				);
				plugins =
					targetPlugin?.device_plugins?.map((dp) => ({
						name: dp.name,
						id: dp.id,
						description: dp.description,
						version: dp.version
					})) || [];
			} else {
				plugins = store.general.plugins.map((p) => ({
					name: p.name,
					id: p.id,
					description: p.description,
					version: p.version
				}));
			}
		});

		// console.log("plugins : ",plugins)


		return plugins.filter((p) => !installedIds.has(p.id) && !installingIds.has(p.id));
	};

	const handlePluginInstall = async (event: CustomEvent) => {
		try {
			const selectedPlugin = event.detail;
			console.log(selectedPlugin);
			const pluginType = category;

			const plugin = await findPluginInStore({
				pluginId: selectedPlugin.id,
				type: pluginType
			});

			if (!plugin) return;

			const installData: PluginInstallData = {
				id: plugin.id,
				launchType: determineLaunchType(plugin.id),
				nodeId: pageState.nodeId,
				version: plugin.version || DEFAULT_VERSION
			};

			console.log("installing data : ",installData)

			$installingPluigns = [...$installingPluigns, { ...plugin, coreType: pluginType }];
			const response = await installPluginThroughNats($gatewayId, installData);

			if (response?.success) {
				await fetchMediaHubs();
				await initializePlugins();
			}
			state.availablePlugins = getAvailablePlugins();
		} catch (error) {
			console.error('Installation failed:', error);
			$installingPluigns = $installingPluigns.filter((p) => p.id !== event.detail.id);
		}
	};

	const handleUninstall = async () => {
		state.showModal = false;
		const { selectedPlugin } = state;
		if (!selectedPlugin?.name || !selectedPlugin?.version || !pageState.nodeId) return;

		const shouldUninstall = confirm(`Do you want to uninstall ${selectedPlugin.name}?`);
		if (!shouldUninstall) return;

		try {
			uninstallingPlugins.update((plugins) => [...plugins, selectedPlugin.id]);

			const uninstallData: PluginUninstallData = {
				pluginId: selectedPlugin.id,
				nodeId: pageState.nodeId,
				version: selectedPlugin.version
			};

			let resp = await unInstallPluginThroughNats($gatewayId, uninstallData);
			console.log('plugin uninstall resp : ', resp);
			if (resp?.success) {
				await Toast.show({
					text: `${selectedPlugin.name} uninstalled successfully`,
					duration: 'short',
					position: 'top'
				});
			}

			await fetchMediaHubs();
			await initializePlugins();
		} catch (error) {
			console.error('Uninstallation failed:', error);
		} finally {
			uninstallingPlugins.update((plugins) => plugins.filter((id) => id !== selectedPlugin.id));
			state.showModal = false;
		}
	};

	const goBack = () => history.go(-1);
	const addPlugin = () => (state.isOpen = true);
	const showSettings = (plugin: PluginListItem) => {
		state.showModal = true;
		state.selectedPlugin = plugin;
	};

	const fetchMediaHubs = async () => {
		try {
			const { nodes } = <any>await getNodes($gatewayId);
			processMediaData(nodes[0].plugins);
		} catch (error) {
			console.error('Failed to fetch media hubs:', error);
		}
	};

	const initializePlugins = async () => {
		if (category === 'core') {
			state.pluginServices =
				$pluginStore.plugins.core.plugins.find((p) => p.id === pageState.categoryId)
					?.device_plugins || [];
		} else {
			state.pluginServices = $pluginStore.plugins.general.plugins;
		}

		state.availablePlugins = getAvailablePlugins();
	};

	onMount(initializePlugins);

	$: {
		if (state.pluginServices.length >= 0) {
			state.availablePlugins = getAvailablePlugins();
		}
	}
</script>

<div class="theme-page">
	<Modal bind:isOpen={state.showModal} title={state.selectedPlugin.name} style="height:15vh;">
		<div class="p-2 uninstall-button" on:click={handleUninstall}>
			<span class="icon-delete fsipx-24" />
			Uninstall plugin
		</div>
	</Modal>

	<header class="header bottom-shadow">
		<p class="title-large">
			{category === 'core' ? 'Device Plugins' : 'General Plugins'}
		</p>
	</header>

	<main class="content-container">
		<div class="content">
			{#if state.pluginServices.length > 0}
				{#each state.pluginServices as service (service.id) }
					<PluginCard
						name={service.name}
						desc={service.description}
						uninstalling={$uninstallingPlugins.includes(service.id)}
						on:longPressed={() => showSettings(service)}
					/>
				{/each}
			{/if}

			{#if $installingPluigns.length > 0}
				{#each $installingPluigns as plugin (plugin.id)}
					{#if plugin.coreType === category}
						<PluginCard name={plugin.name} installing={true} />
					{/if}
				{/each}
			{/if}
		</div>
	</main>

	<footer class="footer">
		<Button circle color="black" on:click={goBack} size="lg">
			<span class="icon-chevron-left-1" />
		</Button>
		<Button circle size="lg" on:click={addPlugin}>
			<span class="icon-plus-1" />
		</Button>
	</footer>

	<AvailablePlugins
		bind:isOpen={state.isOpen}
		title={category === 'core' ? 'Device Plugins' : 'General Plugins'}
		list={state.availablePlugins}
		on:PluginSelection={handlePluginInstall}
	/>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.theme-page {
		height: 100vh;
		width: 100vw;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.header {
		width: 100%;
		padding: 1rem 0.5rem;
		flex-shrink: 0;
	}

	.content-container {
		flex: 1;
		overflow: hidden;
		position: relative;
		padding-bottom: 5rem;
	}

	.content {
		height: 100%;
		overflow-y: auto;
		padding: 1rem 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.footer {
		position: absolute;
		bottom: 1rem;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		padding: 1rem;
		z-index: 1;
	}

	.uninstall-button {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.content::-webkit-scrollbar {
		width: 6px;
	}

	.content::-webkit-scrollbar-track {
		background: transparent;
	}

	.content::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}
</style>
