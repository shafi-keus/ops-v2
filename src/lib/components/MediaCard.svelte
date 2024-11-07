<script>
	import { goto } from "$app/navigation";


	import Button from "./Button.svelte";
import Card from "./Card.svelte";

    export let id = ''

</script>
<Card>
    <p class="p-2"  style="border-bottom: 1px solid rgba(0,0,0,0.09);font-size: 15px;font-style: normal;font-weight: 500;">Node Id : {id}</p>
    <Button block on:click={()=>goto('./node-config')} >
        Plugins
    </Button>
</Card>