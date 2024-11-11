<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
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
	import { CloudPluginStore } from '$lib/utils';
	import installServicePlugin from '$lib/apis/installPlugin';
	import { getNodes } from '$lib/hubRpcs/getNodes';
	import { gatewayId } from '$lib/stores';

	// Constants
	const IP_ADDRESS = '10.1.4.107';
	const LAUNCH_TYPE = 'INTRA_PP';

	// Interfaces
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

	// State
	let isOpen = false;
	let nodeId: string = '';
	let pluginCategories: PluginCategory[] = [];
	let availablePluginCategories: CloudPlugin[] = [];

	// Navigation handlers
	const goBack = () => history.go(-1);
	const addCategory = () => (isOpen = true);
	const navigateToServicePlugins = (category: string) =>
		goto('./servicePlugins', { state: { category, nodeId } });

	// Plugin installation handler
	const handlePluginSelection = async (event: CustomEvent) => {
		const selectedPlugin = event.detail;

		try {
			const fullPlugin = await getFullPluginDetails(selectedPlugin.id);
			if (!fullPlugin) {
				console.error('Plugin not found in cloud store');
				return;
			}

			const pageState = $page.state as PageState;

			const installData: any = {
				id: fullPlugin.id,
				launchType: LAUNCH_TYPE,
				nodeId: pageState.nodeId,
				version: fullPlugin.version || '1.0.0'
			};

			$installingPluigns = [...$installingPluigns, fullPlugin];
			const response = await installServicePlugin(IP_ADDRESS, installData);

			await fetchMediaHubs();
			init();

			console.log(
				response.success
					? 'Plugin installed successfully'
					: `Failed to install plugin: ${response.error}`
			);
		} catch (error) {
			console.error('Error during plugin installation:', error);
		}
	};

	// Helper functions
	function getFullPluginDetails(pluginId: string): Promise<CloudPlugin | null> {
		return new Promise((resolve) => {
			CloudPluginStore.subscribe((cloudStore) => {
				const plugin = cloudStore.core.plugins.find((plugin) => plugin.id === pluginId);
				resolve(plugin || null);
			})();
		});
	}

	function getUninstalledCorePlugins(
		installedPlugins: PluginCategory[],
		cloudPlugins: typeof $CloudPluginStore
	): CloudPlugin[] {
		const installedCoreNames = new Set(
			installedPlugins
				.find((category) => category.type === 'core')
				?.plugins.map((plugin) => plugin.name) || []
		);

		const installingPluginNames = new Set(
			$installingPluigns
				.filter((plugin) => plugin.type === 'CORE_PLUGIN')
				.map((plugin) => plugin.name)
		);

		return cloudPlugins.core.plugins
			.filter(
				(plugin) => !installedCoreNames.has(plugin.name) && !installingPluginNames.has(plugin.name)
			)
			.map(({ id, name, description, type }) => ({
				id,
				name,
				description,
				type
			}));
	}

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

	const init = async () => {
		const store = $pluginStore.plugins;
		nodeId = <string>$page.state;
		pluginCategories = Object.entries(store)
			.filter(([_, data]) => data?.plugins?.length > 0)
			.map(([type, data]) => ({
				type,
				name: data?.name || '',
				description: data?.description || '',
				plugins: data?.plugins
			}));
	};

	// Lifecycle and reactivity
	onMount(() => {
		init();
		// Single subscription to handle both store changes
		const unsubscribe = CloudPluginStore.subscribe((cloudStore) => {
			// if (pluginCategories.length > 0) {
			availablePluginCategories = getUninstalledCorePlugins(pluginCategories, cloudStore);
			// }
		});

		return unsubscribe;
	});

	// Reactive statement for store changes
	$: if (pluginCategories.length > 0) {
		availablePluginCategories = getUninstalledCorePlugins(pluginCategories, $CloudPluginStore);
	}
</script>

<div class="theme-page">
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
						on:click={() => navigateToServicePlugins(category.type)}
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
</style>
