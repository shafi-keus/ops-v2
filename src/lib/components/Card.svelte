<script lang="ts">
    export let className="";
    export {className as class};
    export let cardClass = "";
    export let style="";

</script>

<div class="card shadow-normal {cardClass}" style={style} on:click on:keydown on:keypress on:touchstart on:touchend on:touchmove on:touchcancel>
    <div class="card-body theme-page {className}">
        <slot />
    </div>
</div>

<style lang="scss">
    .card,.card-body{
        border-radius: 16px;
    }
</style>