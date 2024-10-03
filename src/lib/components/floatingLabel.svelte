<script lang="ts">
  import { onMount } from "svelte";

  type title = "Enter phone number" | "Enter email ID";
  export let title = "Enter phone number";
  onMount(() => {
    document.getElementById("ele")?.focus();
  });
</script>

<div class="main">
  <div class="child theme-page">&nbsp;&nbsp;{title}&nbsp;&nbsp;</div>
  {#if title == "Enter email ID"}
    <input id="ele" class="parent theme-page" type="email" />
  {:else}
    <input id="ele" class="parent theme-page" type="tel" />
  {/if}
</div>

<style>
  .main {
    position: relative;
    height: 67px;
  }
  .parent {
    position: absolute;
    top: 13px;
    border: 1.6px solid rgb(61, 128, 214);
    width: 90vw;
    height: 50px;
    border-radius: 10px;
  }
  .child {
    color: rgb(61, 128, 214);
    position: absolute;
    margin-left: 10px;
    width: max-content;
    text-align: center;
    z-index: 1;
  }
  input:focus {
    outline: none;
    font-size: large;
  }
</style>
