<script lang="ts">
  type Colors = "text-primary" | "text-secondary" | "text-success" | "text-light"
  export let style = "";
  export let color:Colors = "text-primary"
  export let scale = 0.8
</script>

<div class="loader" {style}>
  <div class="spinner-border {color}" role="status" style="scale : {scale}">
    <span class="sr-only" />
  </div>
</div>

<style>
  .loader {
    width: 100%;
    height: 100%;
    
    /* display: flex;
    align-items: center;
    justify-content: center; */
    margin:0;
    padding:0;
    /* background-color: rgba(0,0,0,.8); */
  }
</style>
