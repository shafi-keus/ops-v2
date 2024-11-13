<script lang="ts">
	export let isOpen = false;
	export let title = '';
	export let style = '';
</script>

{#if isOpen}
	<div class="backDiv" on:click|self={() => (isOpen = false)}>
		<div class="modalDiv theme-page" {style}>
			{#if title}
				<h1 class="modHead bottom-shadow">
					<span class="mx-3 title-large">{title}</span>
				</h1>
			{/if}
			<div class="modCon">
				<div class="slotDiv">
					<slot />
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}
	.backDiv {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.8);
		z-index: 999;
	}

	.modalDiv {
		width: 100vw;
		position: absolute;
		bottom: -100%;
		border-radius: 16px 16px 0 0;
		animation: modalAnimation 200ms ease-in-out forwards;
		display: flex;
		flex-direction: column;
		max-height: 100vh;
	}

	.modHead {
		min-height: 56px;
		max-height: 56px;
		font-size: 18px;
		display: flex;
		align-items: center;
		border-radius: 16px 16px 0 0;
		font-weight: 400;
		position: sticky;
		top: 0;
		background: inherit;
		z-index: 2;
	}

	.modCon {
		flex: 1;
		overflow-y: auto;
		// padding: 16px;
		-webkit-overflow-scrolling: touch;
	}

	.slotDiv {
		height: 100%;
		width: 100%;
	}

	@keyframes modalAnimation {
		0% {
			bottom: -100%;
		}
		100% {
			bottom: 0;
		}
	}
</style>
