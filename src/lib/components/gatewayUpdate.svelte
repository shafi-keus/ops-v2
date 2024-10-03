<script>
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import { goto } from "$app/navigation";
  export let gatewayupdate = "";
  let rebooting = 0;
  let configuring = 0;
  let loading = 0;
  let image = "/images/rebooting.png";

  async function startLoading() {
    rebooting = 1;
    loading = 1;
    await delay(3000);
    rebooting = 2;
    image = "/images/updating.png";
    configuring = 1;
    await delay(3000);
    configuring = 2;
    image = "/images/updated.png";
    loading = 0;
  }
  function delay(time) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }
  onMount(async () => {
    await startLoading();
  });
</script>

<div class="mainpage theme-page">
  <div class="header bottom-shadow">
    <p class="title-large">
      {gatewayupdate}
    </p>
  </div>
  <div class="content">
    <div
      class="d-flex align-items-center justify-content-center flex-column my-3"
      style="position: relative;"
    >
      <div
        class:d-none={configuring != 1}
        style="font-size: small;font-weight:300;display:inline-block;margin-bottom:0.7rem;"
      >
        gateway is rebooted
      </div>
      <div
        class:d-none={configuring != 2}
        style="font-size: small;font-weight:300;display:inline-block;margin-top:10px;"
        class="d-flex align-items-center justify-content-center flex-column"
      >
        <img src="/images/configured.png" alt="" />
        <p style="color:green;margin-top:1rem;font-weight:500;">
          {#if gatewayupdate == "Gateway updating"}
            gateway updated successfully !
          {:else}
            gateway configured successfully !
          {/if}
        </p>
      </div>
      {#if rebooting == 1}
        Gateway is rebooting
      {:else if configuring == 1 && gatewayupdate == "Gateway updating"}
        Gateway is being updated
      {:else if configuring == 1 && gatewayupdate == "Configuration"}
        Gateway is being configured
      {:else if configuring == 1}
        Gateway is being converted
      {/if}
    </div>
    <div
      class="spinner-border text-info"
      role="status"
      class:d-none={!loading}
      style="position:fixed;left:45%"
    >
      <span class="sr-only" />
    </div>
    <div style="width:100%;position:fixed;top:37%;text-align:center;">
      <img src={image} alt="" />
      <div class:d-none={configuring != 2} style="margin-top:20px;">
        {#if gatewayupdate == "Configuration"}
          <Button size="md" style="padding:16px 24px;" on:click={() => goto("/gatewayDetails")}
            >Enter details</Button
          >
        {:else}
          <Button
            size="md"
            style="padding:16px 24px;"
            on:click={() => {
              gatewayupdate = "";
            }}>Go to gateways</Button
          >
        {/if}
      </div>
    </div>
  </div>
</div>

<style>
  .header {
    width: 100%;
    height: 10vh;
    padding: 2.5rem 1.2rem;
  }
  .content {
    width: 100%;
    height: 90vh;
  }
  .mainpage {
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 99999999999;
    left: 0;
    top: 0;
  }
</style>
