<script>
    export const address = "";
    import { otaProgressStore } from "$lib/stores/index";
</script>
<div class="progress" style="height: 6px;width:70%;">
  <div
    class="progress-bar progress-bar-striped progress-bar-animated"
    role="progressbar"
    aria-valuemin={0}
    aria-valuemax={100}
    style="width: {$otaProgressStore[address].progress}"
  />
</div>
