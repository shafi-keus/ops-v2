<script>
  export let inputfield = "phone";
</script>

<div class="container mt-5">
  <div class="icon" />
  <div class="text-center">Login</div>
  {#if inputfield == "phone"}
    <div class="form-outline">
      <input type="tel" id="typePhone" class="form-control" />
      <label class="form-label" for="typePhone">Phone number input</label>
    </div>
  {:else}
    <div class="form-outline">
      <input type="email" id="typeEmail" class="form-control" />
      <label class="form-label" for="typeEmail">Email input</label>
    </div>
  {/if}
</div>
