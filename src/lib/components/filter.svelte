<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { deviceCategoryMap } from '$lib/stores/index';
	import { createEventDispatcher, onMount } from 'svelte';
	export let filters: string[] = [];
	const dispatch = createEventDispatcher();
	let devices: string[] = [];
	let devicetypes: string[] = Object?.keys($deviceCategoryMap);
	let devicetypesIcons: string[] = [
		'embedded_switch.svg',
		'curtain.svg',
		// "scene_control.svg",
		'scene_wizard.svg',
		'curtain_wizard.svg',
		'smart_console.svg',
		'zigbee.svg',
		'acfan.svg',
		'dcfan.svg',
		'ir_blaster.svg',
		'strip4.svg',
		// "contact_sensor.svg",
		'zigbee.svg',
		// "Gateway.svg",
		// "hvac.svg",
		// "cctv.svg",
		'slider_curtain.svg',
		'slider_curtain-1.svg',
		'cv3.svg',
		'cv6.svg',
		'strip4.svg',
		'gate_closed.svg',
		'gate_closed.svg'
		// "zigbee.svg",
		// "dalii.svg",
		// "dalii.svg",
		// "dalii.svg",
		// "bulb.svg",
	];
	let checked: boolean[] = devicetypesIcons.map((x) => false);
	onMount(() => {
		// devicetypes = Object.keys($deviceCategoryMap);
		filters.forEach((x) => {
			checked[devicetypes.indexOf(x)] = true;
		});
	});
</script>

<div class="farLayout theme-page">
	<h1 class="farTitle bottom-shadow"><p class="title-large">Filter</p></h1>
	<!-- <div class="" style="font-size: small;font-weight:400;padding:8px 16px">Device Categories</div> -->
	<div class="content">
		<div class="deviceTypes">
			{#each devicetypes as device, i}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<div
					style="width:100%;border-bottom:{i < devicetypes.length - 1
						? 1
						: 0}px solid rgba(0,0,0,0.09);display:flex;align-items:center; justify-content:space-between;padding-top:16px;padding-bottom:16px"
					on:click={() => {
						if (checked[i]) checked[i] = false;
						else checked[i] = true;
					}}
				>
					<div style="display: flex;gap : 8px;">
						<!-- <span class="{devicetypesIcons[i]} fsipx-24 btn-left-icon" /> -->
						<span><img src="/icons/CategoryIcon/{devicetypesIcons[i]}" alt="" /></span>
						<span style="text-align:left">{device}</span>
					</div>
					<div style="transform: translateY(19%);">
						<input
							type="checkbox"
							style="width: 22px;height:22px;border-color:black;"
							value={device}
							bind:checked={checked[i]}
						/>
					</div>
				</div>
			{/each}
		</div>
	</div>
	<div class="folating_btn">
		<Button outlined on:click={() => dispatch('cancled')}>
			<span class="icon-close fsipx-24 btn-left-icon" />
			<span class="d-inline-block"> Close </span>
		</Button>
		<Button
			size="md"
			style=";position:fixed;right:16px"
			on:click={() => {
				for (let i = 0; i < checked.length; i++) {
					if (checked[i]) devices.push(devicetypes[i]);
				}
				dispatch('applied', devices);
			}}>Apply</Button
		>
	</div>
</div>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}
	.farTitle {
		font-size: 18px;
		font-weight: 400;
		padding: 16px;
	}
	.farLayout {
		height: 100vh;
		width: 100vw;
	}
	.folating_btn {
		display: flex;
		position: fixed;
		bottom: 16px;
		padding-left: 16px;
	}
	.content {
		padding: 16px;
		display: flex;
		flex-direction: column;
		max-height: 84vh;
		overflow: scroll;
	}
</style>
