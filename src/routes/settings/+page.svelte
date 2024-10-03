<script lang="ts">
	import { Button, Input } from '@sveltestrap/sveltestrap';
	let radioGroup = 'high-performance';
</script>

<div class="main theme-page">
	<div class="header bottom-shadow">
		<p class="title-large">Settings</p>
	</div>
	<div class="content p-2">
		{#each ['High-performance', 'Balanced'] as value}
			<Input type="radio" bind:group={radioGroup} {value} label={value} />
		{/each}
	</div>
	<div class="d-flex align-items-center justify-content-between">
		<Button outline color="primary">Back</Button>
		<Button color="primary">Save</Button>
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	label {
		display: block;
		margin: 0.5em 0;
	}
	.main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.header {
		width: 100%;
		padding: 16px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.content {
		flex-grow: 1;
		overflow-y: auto;
		overflow-x: hidden;
	}
</style>
