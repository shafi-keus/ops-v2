<script lang="ts">
  export let className = "";
  export { className as class };
  export let cardClass = "";
  export let style = "";
</script>

<div
  class="main shadow-normal theme-page {cardClass}"
  {style}
  on:click
  on:keydown
  on:keypress
  on:touchstart
  on:touchend
  on:touchmove
  on:touchcancel
>
  <div class="body"><slot /></div>
</div>

<style lang="scss">
  .main {
    border-radius: 16px;
    border: none;
  }
  .body {
    padding: 16px;
  }
</style>
