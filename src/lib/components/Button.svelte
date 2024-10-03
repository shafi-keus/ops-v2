<script lang="ts">
  import Loading from "./Loading.svelte";

  type colorType = "white" | "red" | "blue" | "black" | "plain";
  type sizeType = "sm" | "lg" | "md" | "" | "xs" | "xl" | "xxl";

  export let color: colorType = "blue";
  let className: string = "";
  export { className as class };
  export let outlined = false;
  export let size: sizeType = "";
  export let circle = false;
  export let badge = false;
  export let badgeCount = 0;
  export let block = false;
  export let badgeColor: colorType = "blue";
  export let shadowInward = false;
  export let style = "";
  export let id = "";
  export let disabled = false;
  export let loading = false;

  $: classes = `shadow-${shadowInward ? "inward" : ""} btn-${color}${
    outlined ? "-outlined" : "" 
  }${size.length != 0 ? "-" + size : ""} ${
    circle ? `circle${size.length > 0 ? "-" + size : ""}` : ""
  } btn-cls`;
</script>

<button
disabled = {disabled}
  {id}
  class="{classes} {className}"
  {style}
  class:block
  on:click
  on:keydown
  on:keypress
  on:touchstart
  on:touchend
  on:touchmove
  on:touchcancel
  {...$$restProps}
>
  <div class="position-relative">
    <Loading bind:loading>
      {#if badge}
          <span class="badge-{badgeColor}">{badgeCount}</span>
      {/if}
      <slot/>
  </Loading>
  </div>
</button>

<style lang="scss">
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .block {
    width: 100%;
  }
  .btn-cls{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
