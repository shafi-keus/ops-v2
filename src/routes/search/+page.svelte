<script lang="ts">
	import { BLE } from 'capacitor-bluetooth';
	import Loader from '$lib/components/Loader.svelte';
	import Button from '$lib/components/Button.svelte';
	import Modal from '$lib/components/modal.svelte';
	// import Qr from '$lib/components/qrcode.svelte';
	import Inputfield from '$lib/components/inputfield.svelte';
	// import * as homeStructures from '$lib/generated/hub/home/home_structures';
	// import { getHubData } from '$lib/hubRpcs/getHubData';
	// import { natsTypeConversionUtils } from '$lib/utils/bufferUtil';

	let leadserach = false;
	let active = false;
	let inputValue = '';
	let foundFlag = 0;
	let foundMsg = '';
	// let qr = false;

	import { token } from '$lib/constants/global';
	import { gatewayData, Gateway, gatewayId, leadId, nc, gateways } from '$lib/stores/index';
	import getAllGatewaysApi from '$lib/apis/getAllGateways';
	import type { PluginListenerHandle } from '@capacitor/core';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { App } from '@capacitor/app';
	// import Fetcher from '$lib/components/Fetcher.svelte';

	import { bleInitialize } from '$lib/stores';
	let listner: PluginListenerHandle;

	onDestroy(async () => {
		await listner.remove();
	});
	async function getAllGateways() {
		let data;
		data = { token: token };

		let getGatewaysApiResp = await getAllGatewaysApi(data);
		console.log(`getGatewaysApiResp : `, JSON.stringify(getGatewaysApiResp));

		if (getGatewaysApiResp?.success) {
			// console.log(
			//   "executed get gatewayfunction --->",
			//   JSON.stringify(getGatewaysApiResp?.data?.res)
			// );
			$gatewayData = getGatewaysApiResp?.data?.res;
		}
	}
	onMount(async () => {
		listner = await App.addListener('backButton', async () => {
			if (leadserach) leadserach = false;
			else await goto('/');
			return;
		});
		getAllGateways();
	});

	$: {
		if (inputValue) {
			foundFlag = 0;
			foundMsg = '';
			inputValue = inputValue.trim();
			active = true;
			let leadFound = $gatewayData.some((obj: any) => obj.leadId == inputValue);
			if (leadFound) {
				foundFlag = 2;
				foundMsg = `Home found with ID: ${inputValue}`;
			}
		} else {
			active = false;
		}
	}

	async function BleSkip() {
		// if(!await BleController.checkBle())
		// {
		//   alert("Please enable bluetooth");
		//   return;
		// }
		$leadId = '';
		$gatewayId = '';
		$gateways = [];
		$Gateway = '';
		await goto('devices');
	}

	async function search(leadID: string) {
		leadID = leadID.trim();
		// console.log(JSON.stringify($gatewayData));
		let value: any = $gatewayData.find((obj: any) => obj.leadId == leadID);

		if (value) {
			if ($gateways.length > 0) $gateways.length = 0;
			$leadId = leadID;
			$gatewayId = value.gatewayId;
			$Gateway = $gatewayId + '-HUB-REQ-MANAGER-BINARY-RPC';
			console.log('data : ' + $gatewayId, $Gateway);
			leadserach = false;

			//fetching the hub data and storing it in the store....
			// let hubDataReq = new homeStructures.com.keus.hub.GetHubData();
			// let res = await getHubData(hubDataReq, $Gateway);
			// $hubData = res;
			// end of fetching the hub data....
			await goto('/gateways');
		} else {
			foundFlag = 1;
			foundMsg = `Couldn't search home`;
		}
	}

	async function logOut() {
		await BLE.closeBle();
		await BLE.initializeBle();
	}

	// $:console.log("hub data",$hubData);
</script>

<div class="theme-page" style="max-height: 100vh;">
	<!-- {#if qr}
		<Qr
			on:msg={async (e) => {
				let value = $gatewayData.find((obj) => obj.gatewayId == e.detail);
				qr = false;
				$gatewayId = value.gatewayId;
				$Gateway = $gatewayId + '-HUB-REQ-MANAGER-BINARY-RPC';
				console.log('data : ' + $gatewayId, $Gateway);
				if (value) {
					await goto('/gateways');
				}
			}}
		/>
	{/if} -->
	{#if leadserach}
		<Modal bind:isOpen={leadserach} title="Search by lead ID" style="height:fit-content;">
			<div style="margin:16px;">
				<Inputfield
					placeholder="Enter lead id"
					style="display:flex;justify-content:center;"
					borderclr={foundFlag == 1 ? '1px solid red' : '1px solid #185EAF'}
					bind:inputValue
				/>
				<div style="padding-top:{foundMsg ? '16' : ''}px;padding-bottom:{foundMsg ? '16' : ''}px">
					<div style="display:flex;align-items:center;">
						{#if foundFlag == 2}
							<span class="icon-check-circle fsipx-22" style="color:#21CB6F;" />&nbsp;&nbsp;
							<span style="color:#21CB6F">{foundMsg}</span>
						{:else if foundMsg.length > 0}
							<img src="/images/error.svg" alt="" />&nbsp;&nbsp;
							<span style="color:#BD0F15;">{foundMsg}</span>
						{/if}
					</div>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<p
						class="float-end proceed"
						class:active
						on:click={() => {
							search(inputValue);
						}}
					>
						Proceed
					</p>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
					<p
						class="float-end"
						style="color:black;font-weight:550;margin:16px;"
						on:click={() => {
							leadserach = false;
						}}
					>
						Cancel
					</p>
				</div>
			</div>
		</Modal>
	{/if}
	<div class="header bottom-shadow">
		<p class="title-large" style="padding-left: 8px;">Search a home</p>
	</div>
	<div class="content">
		<div class="d-flex align-items-center justify-content-center mt-4">
			<Button size="md" on:click={() => (leadserach = !leadserach)} style="">
				<span class="icon-search-1 fsipx-24 btn-left-icon" />
				Enter lead ID
			</Button>
		</div>
		<div class="d-flex align-items-center justify-content-center mt-3">
			<Button disabled={!$bleInitialize} on:click={BleSkip}>
				{#if $bleInitialize}
					Jump to Bluetooth page
				{:else}
					<Loader color="text-light" />
				{/if}
			</Button>
		</div>
		<!-- <h4
          class="d-flex align-items-center justify-content-center mt-4"
          style="font-weight: 400;"
        >
          OR
        </h4>
        <div class="d-flex align-items-center justify-content-center mt-4">
          <Button
            size="md"
            outlined
            style="width:170px;height:48px;"
            on:click={() => (qr = !qr)}
          >
            <span class="icon-qrcode fsipx-24 btn-left-icon" />
            Enter QR</Button
          >
        </div> -->
	</div>
	<Button
		size="md"
		style="position:absolute;bottom:16px;left:16px;"
		outlined
		on:click={async () => await logOut()}
	>
		Logout</Button
	>
</div>

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
	}
	.proceed {
		color: grey;
		font-weight: 550;
		margin: 16px;
		margin-bottom: 32px;
	}
	.active {
		color: #185eaf;
	}
	.theme-page {
		height: 100vh;
	}
</style>
