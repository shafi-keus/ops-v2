<script>
	import Button from './Button.svelte';
	import { createEventDispatcher } from 'svelte';
	let image = '/images/rebooting.png';
	export let progress = 1;
	export let isOpen = false;
	const dispatch = createEventDispatcher();

	const goBack = () => {
		isOpen = false;
	};

	$: {
		if (progress == 1) {
			image = '/images/updating.png';
		} else if (progress == 2) {
			image = '/images/rebooting.png';
		} else {
			image = '/images/updated.png';
		}
	}
</script>

{#if isOpen}
	<div class="mainpage theme-page">
		<header class="header bottom-shadow">
			<p class="title-large" style="padding-left: 8px;">Gateway Configuration</p>
		</header>
		<div class="content">
			<div
				class="d-flex align-items-center justify-content-center flex-column my-3"
				style="position: relative;"
			>
				{#if progress == 1}
					Gateway is being configured
				{:else if progress == 2}
					Failed to configure
				{:else if progress == 3}
					Gateway configured successfully
				{/if}
			</div>
			<div
				class="spinner-border text-info"
				role="status"
				class:d-none={progress != 1}
				style="position:fixed;left:45%"
			>
				<span class="sr-only" />
			</div>
			<div style="width:100%;position:fixed;top:37%;text-align:center;">
				<img src={image} alt="" />
				<div
					class:d-none={progress != 3}
					style="margin-top:20px;display: flex;align-items: center;justify-content:center"
				>
					<Button size="md" style="padding:16px 24px;" on:click={goBack}>Go to gateways</Button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	* {
		margin: 0;
		padding: 0;
	}

	.header {
		width: 100%;
		padding: 16px 8px;
	}

	.content {
		width: 100%;
		height: 90vh;
	}
	.mainpage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		z-index: 99999999999;
		left: 0;
		top: 0;
	}
</style>
