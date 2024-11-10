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
	import installServicePlugin from '$lib/apis/installPlugin';

	// Constants
	const IP_ADDRESS = '10.1.4.212';

	// Interfaces
	interface PageState {
		category: 'core' | 'general';
		nodeId: string;
	}

	interface PluginListItem {
		name: string;
		id: string;
		description?: string;
		version?: string;
		type?: string;
	}

	interface IPluginInstall {
		nodeId: string;
		launchType: 'INTER_PP' | 'INTRA_PP';
		id: string;
		version: string;
	}

	// State
	const pageState = $page.state as PageState;
	let category: 'core' | 'general' = pageState.category;
	let nodeId: string = pageState.nodeId;
	let isOpen = false;
	let showModal = false;
	let selectedPlugin: PluginListItem = {} as PluginListItem;
	let pluginServices: PluginListItem[] = [];
	let availablePlugins: PluginListItem[] = [];

	// Navigation handlers
	const goBack = () => history.go(-1);
	const addPlugin = () => (isOpen = true);
	const showSettings = (plugin: PluginListItem) => {
		showModal = true;
		selectedPlugin = plugin;
	};

	// Plugin management functions
	async function fetchMediaHubs() {
		try {
			const nodesData = await getNodes($gatewayId);
			const [firstHub] = nodesData.nodes;
			processMediaData(firstHub.plugins);
		} catch (error) {
			console.error('Failed to fetch media hubs:', error);
		}
	}

	async function unInstallPlugin() {
		showModal = false;
		if (!selectedPlugin?.name) return;

		if (confirm(`Do you want to uninstall ${selectedPlugin.name}`)) {
			await fetchMediaHubs();
			await init();
			console.log('Uninstalled:', selectedPlugin);
		}
	}

	function getUninstalledDevicePlugins(): PluginListItem[] {
		const installedPluginIds = new Set(pluginServices.map((service) => service.id));
		const installingPluginIds = new Set($installingPluigns.map((plugin) => plugin.id));
		let cloudDevicePlugins: PluginListItem[] = [];

		CloudPluginStore.subscribe((cloudStore) => {
			if (category === 'core') {
				cloudStore.core.plugins.forEach((plugin) => {
					if (plugin.device_plugins?.length) {
						cloudDevicePlugins.push(
							...plugin.device_plugins.map((dp) => ({
								name: dp.name,
								id: dp.id,
								description: dp.description,
								version: dp.version
							}))
						);
					}
				});
			} else {
				cloudDevicePlugins = cloudStore.general.plugins.map((plugin) => ({
					name: plugin.name,
					id: plugin.id,
					description: plugin.description,
					version: plugin.version
				}));
			}
		});

		return cloudDevicePlugins.filter(
			(plugin) => !installedPluginIds.has(plugin.id) && !installingPluginIds.has(plugin.id)
		);
	}

	const handlePluginInstallation = async (event: CustomEvent) => {
		const selectedPlugin = event.detail;

		try {
			const fullPlugin = await new Promise<PluginListItem | null>((resolve) => {
				CloudPluginStore.subscribe((cloudStore) => {
					let found = null;
					cloudStore.core.plugins.forEach((corePlugin) => {
						if (corePlugin.device_plugins) {
							const plugin = corePlugin.device_plugins.find((dp) => dp.id === selectedPlugin.id);
							if (plugin) found = plugin;
						}
					});
					resolve(found);
				})();
			});

			if (fullPlugin) {
				const installData: IPluginInstall = {
					id: fullPlugin.id,
					launchType: 'INTER_PP',
					nodeId: pageState.nodeId,
					version: fullPlugin.version || '1.0.0'
				};

				$installingPluigns = [...$installingPluigns, { ...fullPlugin, coreType: category }];
				await installServicePlugin(IP_ADDRESS, installData);
				availablePlugins = getUninstalledDevicePlugins();
			}
		} catch (error) {
			console.error('Installation failed:', error);
		}
	};

	async function init() {
		if (category === 'core') {
			pluginServices = $pluginStore.plugins.core.plugins.reduce((acc: PluginListItem[], plugin) => {
				if (plugin.device_plugins?.length) {
					return [...acc, ...plugin.device_plugins];
				}
				return acc;
			}, []);
		} else {
			pluginServices = $pluginStore.plugins.general.plugins;
		}

		availablePlugins = getUninstalledDevicePlugins();
	}

	onMount(init);

	// Reactive statement for store changes
	$: {
		$installingPluigns;
		$CloudPluginStore;
		if (pluginServices.length >= 0) {
			availablePlugins = getUninstalledDevicePlugins();
		}
	}
</script>

<div class="theme-page">
    <Modal bind:isOpen={showModal} title="Plugin Settings" style="height:13vh;">
        <div class="p-2 uninstall-button" on:click={unInstallPlugin}>
            <span class="icon-delete fsipx-24" />
            Uninstall plugin
        </div>
    </Modal>

    <header class="header bottom-shadow">
        <p class="title-large" style="padding-left: 8px;">
            {category === 'core' ? 'Device Plugins' : 'General Plugins'}
        </p>
    </header>

    <main class="content-container">
        <div class="content">
            {#if pluginServices.length > 0}
                {#each pluginServices as service (service.id)}
                    <PluginCard
                        name={service.name}
                        desc={service.description}
                        on:longPressed={() => showSettings(service)}
                    />
                {/each}
            {:else}
                <p class="no-plugins">
                    {category === 'core' ? 'No device plugins available' : 'No general plugins available'}
                </p>
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
        bind:isOpen
        title={category === 'core' ? 'Device Plugins' : 'General Plugins'}
        list={availablePlugins}
        on:PluginSelection={handlePluginInstallation}
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
        padding: 16px 8px;
        flex-shrink: 0; /* Prevent header from shrinking */
    }

    .content-container {
        flex: 1;
        overflow: hidden; /* Hide overflow */
        position: relative;
        padding-bottom: 80px; /* Add space for footer */
    }

    .content {
        height: 100%;
        overflow-y: auto; /* Enable vertical scrolling */
        padding: 16px 8px;
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    .footer {
        position: absolute;
        bottom: 16px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        /* background: var(--background-color, white); Add background to footer */
        z-index: 1; /* Ensure footer stays above content */
    }

    .uninstall-button {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
    }

    .no-plugins {
        text-align: center;
        padding: 2rem;
    }

    /* Optional: Add scrollbar styling */
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