<script lang="ts">
  export let style = "";
  export let placeholder = "";
  export let inputValue = "";
  export let borderclr = "1px solid rgba(0 , 0, 0,0.6)"
</script>

<div class="input" {style}>
  <input type="text" id="typeText" style="border:{borderclr}" {placeholder} bind:value={inputValue} autofocus/>
</div>

<style>
  #typeText {
    width: 100%;
    min-height: 5.5vh;
    border-radius: 14px;
    outline: none;
    padding: 10px;
    font-size: 1rem;
    
  }
  ::placeholder{
    color: #185EAF;
  }
  :disabled {
    color: black;
  }
</style>
