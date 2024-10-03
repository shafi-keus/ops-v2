<script lang="ts">
  export let isOpen = false;
  export let style = "";
</script>

{#if isOpen}
  <div class="backDiv" on:click|self={() => (isOpen = false)}>
    <div class="popUpDiv theme-page" {style}>
      <slot />
    </div>
  </div>
{/if}

<style lang="scss">
  .backDiv {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
  }
  .popUpDiv {
    width: 358px;
    // min-height:251px;
    border-radius: 15px;
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation: popUpAnimation 0.2s forwards ease-in-out;
  }
  @keyframes popUpAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
