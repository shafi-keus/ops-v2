<script lang="ts">
    import { longpress } from "$lib/utils/events/longPress";

    type colorType= "white" | "red" | "blue" | "black" | "plain";
    type sizeType= "sm"| "lg" | "md" | "";
    
    export let color:colorType="plain";
    let className:string="";
    export {className as class}
    export let outlined=false;
    export let small=false;
    export let size:sizeType="";
    export let select = false;
    export let iconClass = "clr-blue";
    export let style = "";

    let classes=`shadow-${outlined? "normal":"inward"} btn-${color} ${size.length!=0? "-"+size:""}`;
    console.log(classes);
</script>

<div class="d-inline-block" use:longpress={{duration:1000}} on:longpress>
    <button class="position-relative {classes} {className}" style="width:{small? 56:109}px;height:{small? 56:110}px;{style}" on:click on:keydown on:keypress on:touchstart on:touchend on:touchmove on:touchcancel>
        {#if select}
            <span class="icon-check-circle fsipx-25 card-btn-icon {iconClass}" /> 
        {/if}
        {#if $$slots.icon}
            <div class="mt-1 d-inline-block">
                <slot name="icon" />
        /root/keus-iot-platform/libs    
    </div>
            {:else}
            <div class="mt-1">
                <i class="mdi mdi-note-text-outline d-block fsipx-20"></i>
            </div>
        {/if}
        <div class="d-inline-block mt-1 mb-1">
            <slot />
        </div>
        {#if $$slots.desc}
            <div class="d-inline-block fsipx-11 desc">
                <slot name="desc" />
            </div>
        {/if}
    </button>
</div>

<style lang="scss">
    .desc{
        font-weight: 300;
    }
    .card-btn-icon{
        position: absolute;
        right:10px;
    }
</style>