<script lang="ts">
	import { longpress } from '$lib/utils/events/longPress';

	export let className = '';
	export { className as class };
	export let cardClass = '';
	export let style = '';
	export let longpressDuration = 500;
</script>

<div
	class="card shadow-normal {cardClass}"
	{style}
	on:click
	on:keydown
	on:keypress
	on:touchstart
	on:touchend
	on:touchmove
	on:touchcancel
	use:longpress={{ duration: longpressDuration }}
	on:longpress
>
	<div class="card-body theme-page {className}">
		<slot />
	</div>
</div>

<style lang="scss">
	.card,
	.card-body {
		border-radius: 16px;
	}
</style>
