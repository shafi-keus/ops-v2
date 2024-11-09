<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Modal from '$lib/components/modal.svelte';
    import { createEventDispatcher } from 'svelte';

    // Match the interface with the data you're actually passing
    interface PluginListItem {
        name: string;
        id: string;
    }

    export let isOpen = false;
    // Use PluginListItem[] type to match what you're passing
    export let list: PluginListItem[] = [];
    export let title = '';

    const dispatch = createEventDispatcher();

    const installPlugin = async (plugin: PluginListItem) => {
        // Dispatch the plugin information
        dispatch('PluginSelection', plugin);
        isOpen = false;
    };
</script>

<Modal {title} bind:isOpen>
    <div class="px-2 item">
        {#each list as plugin, i}
            <p
                class:item={i < list.length - 1}
                style="padding: 8px;"
                on:click={() => installPlugin(plugin)}
            >
                {plugin.name}
            </p>
        {:else}
            <p class="p-2">No plugins are available</p>
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