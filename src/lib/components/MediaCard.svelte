<script>
	import { goto } from '$app/navigation';

	import Button from './Button.svelte';
	import Card from './Card.svelte';

	export let id = '';
</script>

<Card>
	<h3 class="header">
		<span style="position: absolute; left:3%"><img src="/images/master.svg" alt="" /></span>
		<p
			style="position: relative;left:28px;font-size: 18px;width:max-content;display: inline-block;"
		>
			Media Hub
		</p>
		<!-- remove gateway -->
		<!-- <span
			class="float-end mx-1"
			on:click={() => {
				// dispatch('remove', index);
			}}
		>
			<img src="/images/close.svg" alt="close" style="width:27px;height:27px;" />
		</span> -->
	</h3>

	<p
		class="p-2"
		style="border-bottom: 1px solid rgba(0,0,0,0.09);font-size: 15px;font-style: normal;font-weight: 500;"
	>
		Node Id : {id}
	</p>
	<Button
		block
		on:click={() =>
			goto('./nodeConfig', {
				state: {
					nodeId: id
				}
			})}>Plugins</Button
	>
</Card>
