<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import { globalDeviceMap, staticToken } from '$lib/stores/index';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { App } from '@capacitor/app';
	import { range } from '$lib/components/range.js';
	import Button from '$lib/components/Button.svelte';
	import {
		otaStore,
		otaProgressStore,
		connectedDevicesStore,
		channel as ch
	} from '$lib/stores/index';
	import FirmwareVersions from './firmwareVersions.svelte';
	import Modal from '$lib/components/modal.svelte';
	import { onDestroy, onMount } from 'svelte';
	import PopUp from '$lib/components/PopUp.svelte';
	import { delay } from '$lib/stores';
	import type { scandata } from '$lib/stores';
	import type { PluginListenerHandle } from '@capacitor/core';
	import Loader from '$lib/components/Loader.svelte';
	import { BLE } from 'capacitor-bluetooth';

	let DEVICE: scandata;
	let room_name = '';
	let slices: number;
	let floor_name = '';
	let otaModal = false;
	let version = '';
	let selectedBranch = 'main';
	let updateModal: boolean = false;
	let channelModal = false;
	let selectChannel: number;
	// let selectActive = false;
	let channel: number;
	let address: string;
	let deviceData: string;
	let resetConfirm = false;
	let msg = '';

	let listner: PluginListenerHandle;

	async function reset(device: scandata) {
		try {
			if (device.isConnected && $connectedDevicesStore[device.address]?.connection) {
				// f000a003-0451-4000-b000-000000000000 --> characterstic value
				await BLE.writeCharacteristic({
					deviceId: device?.address,
					characteristic: 'f000a003-0451-4000-b000-000000000000',
					value: [1]
				});
				alert('Device has been reset successfully');
				await goto('devices');
			} else {
				//todo: connect to device and trigger reset for device (HOLD)
				alert('device is not connected');
			}
		} catch (error) {
			alert('Oops!! failed to reset device' + DEVICE.name);
		}
	}
	async function channelSelection(device: scandata, channel: number) {
		let flag = false;
		flag = $connectedDevicesStore[device?.address]?.connection;
		if (flag) {
			await BLE.writeCharacteristic({
				deviceId: device?.address,
				characteristic: 'f000a005-0451-4000-b000-000000000000',
				value: [channel]
			});
			$ch = channel;
		} else {
			//note: connect to device and set channel (HOLD)
			// await BleController.connectToDevice(device);
			// await BleController.setChannel(device, channel);
			$ch = channel;
		}
	}

	function checkOtaStore(device: scandata) {
		const exists =
			$otaStore &&
			$otaStore.some((otaDevice) => {
				return otaDevice?.address === device?.address;
			});
		return exists;
	}
	//read the channel of device
	onMount(async () => {
		if ($page.url.searchParams.get('device'))
			deviceData = $page.url.searchParams.get('device') || '';
		DEVICE = JSON.parse(deviceData);
		address = DEVICE?.address || '';
		// Listner for back navigation
		listner = await App.addListener('backButton', async () => {
			await goto('devices');
			return;
		});
		selectChannel = $ch;
		let netstate = $connectedDevicesStore[DEVICE?.address].state;
		if (netstate == 6 || netstate == 7) {
			channel = $ch;
			selectChannel = $ch;
		} else {
			channel = $connectedDevicesStore[DEVICE?.address].channel;
			selectChannel = channel;
		}
	});
	onDestroy(async () => {
		try {
			await listner?.remove();
		} catch (error) {
			console.error('failed to remove the listner');
		}
	});
	async function ota(device: scandata, selectedVersion: string, branch: string) {
		//check if device exist in ota store if not then only start the ota....
		let flag = checkOtaStore(device);

		if ($otaStore.length == 0 && !flag) {
			let reqData = {
				deviceId: DEVICE?.address,
				category: $globalDeviceMap[device?.name?.split(' ')[0] || '']?.deviceCategory,
				type: $globalDeviceMap[device?.name?.split(' ')[0] || '']?.deviceType,
				token: $staticToken,
				version: selectedVersion,
				branch: 'main'
			};
			if (branch == 'dev') reqData.branch = 'dev';

			await BLE.doOta(reqData);
			delay(7000, async () => {
				await BLE.setConnectionPriority({
					deviceId: DEVICE?.address,
					priority: 1
				});
			});
		} else if (flag) {
			alert('OTA is already running!!');
			return;
		} else {
			alert('OTA limit exceeds!! (Only 1 device can update at a time)');
			return;
		}
	}
</script>

{#if otaModal}
	<FirmwareVersions
		on:cancled={() => (otaModal = false)}
		on:update={async (event) => {
			console.log('event', event?.detail);
			version = event.detail.version;
			if (event?.detail?.branch == 'dev') selectedBranch = 'dev';
			otaModal = false;
			await ota(DEVICE, version, selectedBranch);
		}}
		device={DEVICE}
	/>
{:else}
	<!-- popup for reset -->
	<PopUp bind:isOpen={resetConfirm} style="min-height:16vh;padding:14px;">
		<div class="p-2">
			<div style="font-weight:600;margin-bottom:1%;font-size:large;">Reset Device</div>
			<span style="font-weight:400;"> All the data will be erased permanently </span>
			<div class="mt-4" style="display: flex;justify-content:space-between;">
				<Button
					outlined
					style="width:auto;height:40px;margin-right:10px;"
					size="md"
					on:click={() => {
						resetConfirm = false;
					}}><span class="icon-close-1 fsipx-24 btn-left-icon" /> Cancel</Button
				>
				<Button
					size="md"
					style="width:auto;height:40px;"
					on:click={async () => {
						resetConfirm = false;
						await reset(DEVICE);
					}}>Reset</Button
				>
			</div>
		</div>
	</PopUp>
	<!-- Channel Modal -->
	<Modal title="Select channel" bind:isOpen={channelModal} style="height:fit-content">
		<div style="padding:16px;">
			<div
				style="display: grid;grid-row-gap:30px;grid-column-gap:10px;grid-template-columns: auto auto auto auto auto;"
			>
				{#each range(11, 27, 1) as i}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-no-static-element-interactions -->
					<div
						class="d-flex align-items-center justify-content-center"
						class:active={selectChannel == i}
						class:shadow-inward={selectChannel == i}
						class:shadow-normal={selectChannel != i}
						style="width:56px;height:56px;border-radius:16px;padding:8px;border: 1px solid #E3E2E6"
						on:click={() => {
							selectChannel = i;
						}}
					>
						{i}
					</div>
				{/each}
			</div>
		</div>
		<div class="d-flex align-items-center justify-content-between top-shadow" style="padding:16px">
			<Button
				outlined
				style=""
				on:click={async () => {
					channelModal = false;
				}}
			>
				<span class="icon-close-1 fsipx-24 btn-left-icon" /> Cancel</Button
			>
			<Button
				style=""
				on:click={async () => {
					channelModal = false;
					channel = selectChannel;
					await channelSelection(DEVICE, channel);
				}}>Select</Button
			>
		</div>
	</Modal>
	<div class="ota theme-page">
		<div class="otaHead bottom-shadow">
			<p class="title-large">{DEVICE?.name}</p>
		</div>
		<div class="main">
			<div class="mb-3">
				<Card
					on:click={() => {
						otaModal = !otaModal;
					}}
					>Firmware Version
					<span style="float: right;font-size:smaller;font-weight:600;color:rgba(117, 117, 117, 1)"
						>{DEVICE?.name?.slice(-4)}</span
					>
					{#if $otaProgressStore[DEVICE?.address]}
						<div class="mt-2" style="height:min-content;">
							{#if $otaProgressStore[DEVICE?.address] && $otaProgressStore[DEVICE?.address]?.progress > 0}
								<p style="font-size:12px;font-weight:400;margin-bottom:2px;">
									Firmware is being updated.. <span style="font-weight: bold;">
										{$otaProgressStore[DEVICE?.address]?.progress}%</span
									>
								</p>
								<div class="progress" style="height: 6px;width:100%;">
									<div
										class="progress-bar progress-bar-striped progress-bar-animated"
										role="progressbar"
										aria-valuemin={0}
										aria-valuemax={100}
										style="width: {$otaProgressStore[DEVICE?.address]?.progress}%"
									/>
								</div>
							{:else}
								<p style="font-size:12px;font-weight:400;margin-bottom:2px;">
									<span>Firmware update in progress..</span>
								</p>
							{/if}
						</div>
					{/if}
				</Card>
			</div>
			<div class="mb-5">
				<Card
					on:click={() => {
						channelModal = true;
					}}
					>Channel
					<span style="float: right;font-size:smaller;font-weight:600;color:rgba(117, 117, 117, 1)">
						{#if channel >= 0}
							{channel}
						{:else}
							<Loader />
						{/if}
					</span></Card
				>
			</div>
			<div style="display:flex;align-items:center;justify-content:center;">
				<Button
					color="red"
					outlined
					block
					style="width:fit-content;padding:.6rem"
					on:click={async () => {
						resetConfirm = true;
					}}>Reset device</Button
				>
			</div>
			<Button
				size="md"
				outlined
				class="back"
				on:click={async () =>
					// goto(`pair_new_device?room_id=${$page.url.searchParams.get("roomId")}`)
					await goto('devices')}
			>
				<span class="icon-back-1 fsipx-24 btn-left-icon" />
				Back</Button
			>
		</div>
	</div>
{/if}

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
	}
	.ota {
		width: 100vw;
		height: 100vh;
	}
	.otaHead {
		font-size: 18px;
		font-weight: 400;
		padding: 16px;
	}
	.context {
		margin-top: 1rem;
		font-size: 14px;
		font-weight: 600;
		height: 5vh;
		border-bottom: 1.5px solid rgba(0, 0, 0, 0.09);
		text-align: center;
	}
	.main {
		padding: 16px;
	}
	:global(.back) {
		position: fixed;
		bottom: 16px;
		left: 16px;
	}
	.active {
		background-color: rgb(39, 103, 185);
		color: white;
		font-weight: 400;
	}
</style>
