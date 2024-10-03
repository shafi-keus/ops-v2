<script lang="ts">
	import { onMount } from "svelte";

    // export let value=0;
    export let value=100;
    export let Rvalue=100;
    // export let min=0;
    export let min=100;
    export let max=100;
    export let range=false;
    export let width=350;
    export let thumbSize=40;
    export let style="";

    if(Rvalue<value) Rvalue=value+1;
    
    let moveThumbLeft=false;
    let moveThumbRight=false;
    let leftThumb=value;
    let rightThumb=Rvalue;
    let track:Element;
    let trackInfo:Object;
    let regexp = /android|iphone|kindle|ipad/i;
    let ismobile:boolean;

    const mouseMoveHandler=(e:MouseEvent)=>{
        if(ismobile) return;
        if(moveThumbLeft && trackInfo){
            // console.log(trackInfo?.left+leftThumb , e?.x,trackInfo?.right);
            if(e.x<trackInfo?.left+(trackInfo?.width*(rightThumb/100)) && e?.x>trackInfo?.left && e?.x<trackInfo?.right) {
                leftThumb=((e.x- trackInfo?.left)/(trackInfo?.right - trackInfo?.left))*100;
            }else if(e.x<trackInfo?.left+(trackInfo?.width*(rightThumb/100)) && e.x<=trackInfo?.left){
                leftThumb=0;
            }
            }else if(moveThumbRight && trackInfo){
                if(e.x>trackInfo?.left+(trackInfo?.width*(leftThumb/100)) && e?.x>trackInfo?.left && e?.x<trackInfo?.right) {
                    rightThumb=((e.x- trackInfo?.left)/(trackInfo?.right - trackInfo?.left))*100;
                }else if(e.x>trackInfo?.left+(trackInfo?.width*(leftThumb/100)) && e.x<=trackInfo?.left){
                    rightThumb=0;
                }
            }
    }

    const mouseUpHandler=(e:Event)=>{
        if(ismobile) return;

        moveThumbLeft=false;
        moveThumbRight=false;
    }

    const touchMoveHandler=(e:TouchEvent)=>{
        if(!ismobile) return;
        if(moveThumbLeft && trackInfo){
            // console.log(trackInfo?.left+leftThumb , e?.x,trackInfo?.right);
            if(e.changedTouches[0].clientX<trackInfo?.left+(trackInfo?.width*(rightThumb/100)) && e?.changedTouches[0].clientX>trackInfo?.left && e?.changedTouches[0].clientX<trackInfo?.right) {
                leftThumb=((e.changedTouches[0].clientX- trackInfo?.left)/(trackInfo?.right - trackInfo?.left))*100;
            }else if(e.changedTouches[0].clientX<trackInfo?.left+(trackInfo?.width*(rightThumb/100)) && e.changedTouches[0].clientX<=trackInfo?.left){
                leftThumb=0;
            }
            }else if(moveThumbRight && trackInfo){
                if(e.changedTouches[0].clientX>trackInfo?.left+(trackInfo?.width*(leftThumb/100)) && e?.changedTouches[0].clientX>trackInfo?.left && e?.changedTouches[0].clientX<trackInfo?.right) {
                    rightThumb=((e.changedTouches[0].clientX- trackInfo.left)/(trackInfo.right - trackInfo.left))*100;
                }else if(e.changedTouches[0].clientX>trackInfo?.left+(trackInfo?.width*(leftThumb/100)) && e.changedTouches[0].clientX<=trackInfo?.left){
                    rightThumb=0;
                }
            }
    }

    const touchEndHandler=(e:Event)=>{
        if(!ismobile) return;

        moveThumbLeft=false;
        moveThumbRight=false;
    }

    $:{
        value=Math.ceil(((max-min)*(leftThumb/100))+min);
        // console.log(value)
    }
    
    $:{
        Rvalue=Math.ceil(((max-min)*(rightThumb/100))+min);
        // console.log(value)
    }

    onMount(()=>{
        ismobile=regexp.test(navigator.userAgent);
        trackInfo=track.getBoundingClientRect();
    })
</script>

<svelte:window 
    on:mouseup={mouseUpHandler}
    on:mousemove={mouseMoveHandler}
    on:touchend={touchEndHandler}
    on:touchmove={touchMoveHandler}
/>

<div class="d-inline-block" style={style}>
    <div class="slider" style="width:{width}px">
        <div class="track" bind:this={track} ></div>
        <div class="fill" style="width:{range? Math.abs(leftThumb - rightThumb):leftThumb}%;{range? `left:${leftThumb}%`:""}">
        </div>
        {#if ismobile}
            <div class="thumb shadow-normal" style="left:{leftThumb}%;width:{thumbSize}px;height:{thumbSize}px;" on:touchstart={()=>{
                moveThumbLeft=true;
            }} >
                <span>{value}%</span>
            </div>
        {:else}
            <div class="thumb shadow-normal" style="left:{leftThumb}%;width:{thumbSize}px;height:{thumbSize}px;" on:mousedown={()=>moveThumbLeft=true}>
                <span>{value}%</span>
            </div>
        {/if}

        {#if range}
            {#if ismobile}
                <div class="thumb shadow-normal" style="left:{rightThumb}%;width:{thumbSize}px;height:{thumbSize}px;" on:touchstart={()=>{
                    moveThumbRight=true;
                }}>
                <span>{Rvalue}%</span>
                </div>
            {:else}
                <div class="thumb shadow-normal" style="left:{rightThumb}%;width:{thumbSize}px;height:{thumbSize}px;"on:mousedown={()=>moveThumbRight=true}>
                    <span>{Rvalue}%</span>
                </div>
            {/if}
        {/if}
    </div>
</div>

<style lang="scss">
    .slider{
        height: 10px;
        position: relative;
        display: flex;
        align-items: center;
    }
    .track{
        min-width:100%;
        background-color: #B0B0B0;
        height:1px;
    }
    .fill{
        width:50%;
        position: absolute;
        background-color: #2767B9;
        height: 3px;
    }
    .thumb{
        background-color: #2767B9;
        position: absolute;
        transform: translateX(-50%);
        border-radius: 50%;
        z-index: 10;
        border:1px solid #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        *{
            color:#fff;
        }
        &:hover{
            scale:1.08;
            z-index: 11;
        }
    }
</style>