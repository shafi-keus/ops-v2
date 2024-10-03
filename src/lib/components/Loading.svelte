<script lang="ts">
    export let loading = true;
    export let height = 30;
    export let className = ""
    export let m_height;
    export {className as class}
</script>

{#if loading}
    <div class="spinner-div d-flex align-items-center justify-content-center {className}" >
        <div class="spinner-border" role="status" style="color:#185EAF;" />
    </div>
    {:else}
    <slot/>
{/if}

<style>
    /* .spinner-border{
    scale: .7;
  } */
</style>
