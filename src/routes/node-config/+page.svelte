<script lang="ts">
    import { goto } from '$app/navigation';
    import Button from '$lib/components/Button.svelte';
    import { installingPluigns, pluginStore } from '$lib/stores/node-config';
    import { onMount } from 'svelte';
    import AvailableCategories from './AvailablePluginList.svelte';
    import PluginCard from './PluginCard.svelte';

    let isOpen = false;

    interface PluginCategory {
        name: string;
        categoryName: string;
        description: string;
    }

    let pluginCategories: PluginCategory[] = [];

    const goBack = async () => {
        history.go(-1);
    };

    const addCategory = async () => {
        isOpen = true;
    };

    const getServicePlugins = async (category: string) => {
        await goto('./node-config/service-plugins', {
            state: category
        });
    };

    onMount(() => {
        const store = $pluginStore.plugins;
        // Extract categories with names and descriptions
        pluginCategories = Object.entries(store).map(([type, data]) => ({
            name: type,                   // core or general
            categoryName: data.name,      // The display name from the store
            description: data.description // The description from the store
        }));
        console.log('Plugin Categories:', pluginCategories);
    });
</script>

<div class="theme-page">
    <div class="header bottom-shadow">
        <p class="title-large" style="padding-left: 8px;">Plugin Categories</p>
    </div>
    <div class="content">
        {#each pluginCategories as category}
            <PluginCard
                name={category.categoryName}
                desc={category.description}
                on:click={() => getServicePlugins(category.name)}
            />
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