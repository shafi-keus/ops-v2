<script lang="ts">

  export let isOpen = false;
  export let title = "";
  export let style = "";
</script>

{#if isOpen}
  <div class="backDiv" on:click|self={()=>isOpen=false} >
    <div class="modalDiv theme-page" style={style}>
      {#if title}
        <h1 class="modHead bottom-shadow ">
          <span class="mx-3 title-large">{title}</span>
        </h1>
      {/if}
      <div class="modCon">
        <div class="slotDiv">
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}

<style lang="scss">
  .backDiv{
    position: fixed;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-color: rgba(0,0,0,.8);
    z-index: 999;
  }
  .slotDiv{
    height: 100%;
    width: 100%;
  }
  .modalDiv{
    width:100vw;
    position: absolute;
    bottom:-100%;
    border-radius: 16px 16px 0 0;
    animation: modalAnimation 200ms ease-in-out forwards;
  }
  .modCon{
      max-height: 100%;
      min-height: 100%;
      // overflow-x:hidden ;
      // margin : 16px;
      gap:16px;
    }
    .modHead{
        min-height:56px;
        max-height:56px;
        font-size: 18px;
        display: flex;
        align-items: center;
        font-weight: 400;
      }
  @keyframes modalAnimation {
    0%{
      bottom:-100%;
    }
    100%{
      bottom:0;
    }
  }
</style>