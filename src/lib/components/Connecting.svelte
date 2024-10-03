<script>
  export let deviceId="";
  import {connectedDevicesStore} from "$lib/stores/index"
</script>
<div class="connecting">
  {#if $connectedDevicesStore[deviceId]}
      <p class="connecting-text">Fetching details...</p>
  {:else}
      <p class="connecting-text">Connecting...</p>
  {/if}
</div>

<style>
  .connecting {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* 100% viewport height */
    background-color: rgba(0, 0, 0, 0.4); /* Transparent black background */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
  }
  .connecting-text {
    font-size: 1rem;
    color:blue;
    text-align: center;
    font-weight: bold;
  }
</style>
