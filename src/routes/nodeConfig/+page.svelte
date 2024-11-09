<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import {
		pluginStore,
		type CorePluginOutput,
		type GeneralPluginOutput
	} from '$lib/stores/node-config';

	import { onMount } from 'svelte';
	import AvailableCategories from '$lib/components/AvailablePluginList.svelte';
	import PluginCard from '$lib/components/PluginCard.svelte';
	import { CloudPluginStore } from '$lib/utils';

	let isOpen = false;

	interface PluginCategory {
		type: string;
		name: string;
		description: string;
		plugins: CorePluginOutput[] | GeneralPluginOutput[];
	}

	interface AvailablePlugin {
		id: string;
		name: string;
		description: string;
		type: string;
	}

	let pluginCategories: PluginCategory[] = [];
	let availablePluginCategories: AvailablePlugin[] = [];

	const goBack = async () => {
		history.go(-1);
	};

	const addCategory = async () => {
		isOpen = true;
	};

	const getServicePlugins = async (category: string) => {
		await goto('./servicePlugins', {
			state: category
		});
	};

	// Function to get uninstalled core plugins with full object info
	function getUninstalledCorePlugins(
		installedPlugins: PluginCategory[],
		cloudPlugins: typeof $CloudPluginStore
	): AvailablePlugin[] {
		// Get installed core plugin names
		const installedCoreNames = new Set(
			installedPlugins
				.find((category) => category.type === 'core')
				?.plugins.map((plugin) => plugin.name) || []
		);
		console.log(cloudPlugins.core.plugins)

		// Get all core plugins from cloud with full object info
		const cloudCorePlugins = cloudPlugins.core.plugins
			.filter((plugin) => !installedCoreNames.has(plugin.name))
			.map((plugin) => ({
				id: plugin.id, // Fallback to name if id doesn't exist
				name: plugin.name,
				description: plugin.description,
				type: plugin.type
			}));

		return cloudCorePlugins;
	}

	const handlePluginSelection = async (event: CustomEvent) => {
		const selectedPlugin = event.detail;
		console.log('Selected Plugin Full Object:', selectedPlugin);

		// Here you can handle the plugin installation
		// You'll have access to all plugin details through selectedPlugin
	};

	onMount(() => {
		const store = $pluginStore.plugins;
		pluginCategories = Object.entries(store)
			.filter(([_, data]) => {
				return data && Array.isArray(data.plugins) && data.plugins.length > 0;
			})
			.map(([type, data]) => ({
				type,
				name: data?.name || '',
				description: data?.description || '',
				plugins: data?.plugins
			}));

		// Subscribe to CloudPluginStore to get available plugins
		const unsubscribe = CloudPluginStore.subscribe((cloudStore) => {
			availablePluginCategories = getUninstalledCorePlugins(pluginCategories, cloudStore);
		});

		return () => unsubscribe();
	});
</script>

<div class="theme-page">
	<div class="header bottom-shadow">
		<p class="title-large" style="padding-left: 8px;">Plugin Categories</p>
	</div>
	<div class="content">
		{#each pluginCategories as category}
			{#if category.type == 'core'}
				{#each category.plugins as plugin}
					<PluginCard
						name={plugin.name}
						desc={plugin.description}
						on:click={() => getServicePlugins(category.type)}
					/>
				{/each}
			{:else}
				<PluginCard
					name={category.name}
					desc={category.description}
					on:click={() => getServicePlugins(category.type)}
				/>
			{/if}
		{/each}
	</div>
	<div class="footer">
		<Button circle color="black" on:click={goBack} size="lg">
			<span class="icon-chevron-left-1" />
		</Button>
		<Button circle size="lg" on:click={addCategory}>
			<span class="icon-plus-1" />
		</Button>
	</div>
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
