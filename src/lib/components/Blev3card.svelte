<script lang="ts">
	import Fetcher from './Fetcher.svelte';
	import Button from '$lib/components/Button.svelte';
	// import type { scandata } from '$lib';
	import Card from '$lib/components/Card.svelte';
	import {
		Gateway,
		connectedDevicesStore,
		globalDeviceMap,
		otaProgressStore,
		selectedGateway as GATEWAY,
		selectedGateway,
		staticToken,
		prevId,
		pairingLoader
	} from '$lib/stores';
	import { createEventDispatcher, onMount } from 'svelte';
	// import Loader from '$lib/components/Loader.svelte';
	import { goto } from '$app/navigation';
	import { BLE } from 'capacitor-bluetooth';
	import Loader from './Loader.svelte';
	import * as pairStructure from '$lib/generated/hub/devices/device';
	import { pairDevice } from '$lib/hubRpcs/pairRpc.js';
	import { Toast } from '@capacitor/toast';
	import {
		delay,
		type scandata,
		deviceConnected,
		type ExtendedScan,
		extendedScanData
	} from '$lib/stores';
	import addVirtualDevice from '$lib/apis/addVirtualDevice';
	import { pairAdvtData } from '$lib/peripheral';
	export let device: scandata = {
		rssi: -100,
		address: 'keusBleId',
		name: 'KZBLE V4',
		isConnected: false,
		manufacturingData: new Uint8Array()
	};
	// $connectedDevicesStore['keusBleId'].connection = true;
	// $connectedDevicesStore['keusBleId'].state = -1;
	let deviceName: string = device.name.split(' ')[0] || '';
	let deviceVersion: string = device.name.split(' ')[1] || 'unknown';

	let connectingFlag = false;
	let disConnectingFlag = false;
	let pairingFlag = false;
	let resetFlag = false;
	let iflag = false;
	$: isUpdating = $otaProgressStore[device.address]?.inOta;
	$: if ($connectedDevicesStore[device?.address]?.connection) connectingFlag = false;

	async function connectDevice(device: scandata) {
		if ($deviceConnected) return;

		try {
			connectingFlag = true;
			$deviceConnected = true;
			if ($connectedDevicesStore[device?.address]?.connection || device.isConnected) {
				// Read channel
				await BLE.readCharacteristic({
					deviceId: device?.address,
					characteristic: 'f000a005-0451-4000-b000-000000000000'
				});
				// Read state
				await BLE.readCharacteristic({
					deviceId: device?.address,
					characteristic: 'f000a001-0451-4000-b000-000000000000'
				});
				// read zigbeeid
				await BLE.readCharacteristic({
					deviceId: device?.address,
					characteristic: 'f0000007-0451-4000-b000-000000000000'
				});
			} else {
				if (Object?.keys($connectedDevicesStore).length > 0) {
					alert('Only one device can connect at one time');
					connectingFlag = false;
				} else {
					await BLE.connect({
						deviceId: device?.address
					});
				}
			}

			// AFTER 3 SECONDS MAKE THE CONNECTING FLAG FALSE
			await delay(3000, async () => {
				$deviceConnected = false;
				connectingFlag = false;
			});
		} catch (error) {
			$deviceConnected = false;

			connectingFlag = false;
		}
	}

	async function writeIdentify(value: [string]) {
		await BLE.writeCharacteristic({
			deviceId: device?.address,
			characteristic: 'f000a004-0451-4000-b000-000000000000',
			value: value
		});
	}

	async function identifyUtility(device: scandata) {
		// 4 PORT
		if (
			device?.name?.toLocaleLowerCase().startsWith('kzes04') ||
			device?.name?.toLocaleLowerCase().startsWith('kzesm4')
		) {
			// turn on
			await writeIdentify(['11']);
			await writeIdentify(['21']);
			await writeIdentify(['31']);
			await writeIdentify(['41']);
			// turn off
			await delay(1000, async () => {
				await writeIdentify(['10']);
				await writeIdentify(['20']);
				await writeIdentify(['30']);
				await writeIdentify(['40']);
			});
			return;
			// 2 PORT
		} else if (
			device.name?.toLowerCase().startsWith('kzes02') ||
			device.name?.toLowerCase().startsWith('kzesm2')
		) {
			// turn on
			await writeIdentify(['11']);
			await writeIdentify(['21']);
			// turn off
			await delay(1000, async () => {
				await writeIdentify(['10']);
				await writeIdentify(['20']);
			});
			return;
		}
		//rest of the devices
		let isRgb = false;
		let rgb = ['KZLD', 'KZELD', 'KZILD', 'KZCV', 'KZRGB'];
		if (rgb.some((str) => device?.name?.includes(str))) isRgb = true;

		await writeIdentify(isRgb ? ['FF'] : ['01']);
		await delay(1000, async () => {
			await writeIdentify(isRgb ? ['F0'] : ['00']);
		});
	}

	async function turn_device(device: scandata) {
		try {
			iflag = true;
			await identifyUtility(device);
			await delay(1500, async () => {
				iflag = false;
			});
		} catch (error) {
			iflag = false;
		}
	}

	async function disConnectDevice(device: scandata) {
		{
			try {
				disConnectingFlag = true;
				device.isConnected = false;
				delete $connectedDevicesStore[device?.address];
				await BLE.disconnect({
					deviceId: device?.address
				});
				await delay(2000, async () => {
					disConnectingFlag = false;
				});
			} catch (error) {
				disConnectingFlag = false;
				console.log('failed to disconnect', error);
			}
		}
	}

	async function resetDevice(device: scandata) {
		try {
			if (device.isConnected && $connectedDevicesStore[device.address]?.connection) {
				await BLE.writeCharacteristic({
					deviceId: device?.address,
					characteristic: 'f000a003-0451-4000-b000-000000000000',
					value: [1]
				});
				alert('Device has been reset successfully');
			} else {
				//todo: connect to device and trigger reset for device
				alert('device is not connected');
			}
		} catch (error) {
			alert('Oops!! failed to reset device' + device.name);
		}
	}
	async function device_pair(device: scandata) {
		try {
			pairingFlag = true;
			let gatewayId = ''; //Main gateway
			let skipGateway = false; //for OTA and not for pairing
			let res = {
				success: false,
				ops_message: ''
			};
			if (Object?.keys($GATEWAY)?.length == 0) skipGateway = true;
			if (!skipGateway) {
				if ($GATEWAY.type == 'mini') gatewayId = $selectedGateway.gatewayId;
			}
			let pairReq = new pairStructure.com.keus.hub.EnterPairMode({
				duration: 45,
				gatewayId: ''
			});
			//test gateway ==> $Gateway : "Keus-6f3e9155-512e-4ff4-890c-a557e254773a-HUB-REQ-MANAGER-BINARY-RPC" --> QAtest
			res = await pairDevice(pairReq, $Gateway);
			console.log('pair response : ', JSON.stringify(res));
			await Toast.show({
				text: res['ops_message']
			});

			if (res?.success == true || skipGateway) {
				await BLE.writeCharacteristic({
					deviceId: device?.address,
					characteristic: 'f000a002-0451-4000-b000-000000000000',
					value: [1]
				});
				await delay(5000, async () => {
					let state = $connectedDevicesStore[device?.address].state;
					if (!(state == 7 || state == 6)) {
						pairingFlag = false;
						await Toast.show({
							text:
								'Try again..' + '\nMake sure that device channel should be same as gateway channel'
						});
					}
					pairingFlag = false;
				});
			} else {
				pairingFlag = false;
				await Toast.show({
					text: 'Failed to pair' + JSON.stringify(res)
				});
				return;
			}
		} catch (error) {
			pairingFlag = false;
			await Toast.show({
				text: 'Failed to discover devices..'
			});
		}
	}

	async function advertiseData(data: any, time: number = 10000) {
		await BLE.sendAdvertisement({
			data,
			time
		});
		console.log(`Advertisement sent from app with data : ${data} for duration of ${time}`);
	}

	async function offlinePair(device: ExtendedScan) {
		if (!$selectedGateway?.gatewayId) {
			alert('Gateway is not selected');
			return;
		}
		$pairingLoader[device.ieeeAdrs] = true;
		// get the deviceInfo from addVirtual api
		let deviceInfoReq = {
			deviceCategory: device.deviceCategory,
			deviceType: device.deviceType,
			gatewayId: $selectedGateway.gatewayId,
			ieeeAddr: device.ieeeAdrs,
			protocol: 'ZD',
			token: $staticToken
		};
		let resp = await addVirtualDevice(deviceInfoReq);
		console.log('resp of addVirtualDevice : ', JSON.stringify(resp));
		if (resp) {
			console.log('resp from addVirtualDevice : ', JSON.stringify(resp));
			// call pairAdvtData from peripheral utility
			let advtData = pairAdvtData(resp?.data?.data?.data, $GATEWAY.channel);
			console.log('resp from PairAdvt : ', advtData);
			// advertise
			await advertiseData(advtData, 2000);
		} else $pairingLoader[device.ieeeAdrs] = false;
	}
	// when ever the RSSI changes dynamically change the imgSrc of rssi
	$: imgSrc =
		device.rssi >= -50
			? '/images/highstrength.svg'
			: device.rssi >= -85 && device.rssi <= -51
				? '/images/medstrength.svg'
				: '/images/lowstrength.svg';
</script>

<div>
	<Card class="cardlayout" style="border-color:{device.rssi <= -75 ? 'red' : ''}">
		<div class="card_header">
			<div style="display:flex;gap:16px;max-width:40%">
				<!-- STRENGTH -->
				<div class="d-flex flex-column align-items-center">
					<img src={imgSrc} height="16px" width="16px" alt="" />
					<span style="font-size: 12px;">{device.rssi}</span>
				</div>
				<!-- NAME -->
				<div style="display: flex;flex-direction:column;">
					<div style="font-size:16px;font-weight:bold;">
						{#if $globalDeviceMap[deviceName] && $globalDeviceMap[deviceName]['typeDisplayName']}
							{$globalDeviceMap[deviceName]['typeDisplayName']}
						{:else}
							BLE DEVICE
						{/if}
					</div>
					<p style="font-size:12px;font-weight:300">
						{deviceName}&nbsp;{deviceVersion}
					</p>
				</div>
			</div>

			<div class="connection">
				<Button
					disabled={connectingFlag || device.rssi <= -75}
					color={device?.isConnected && $connectedDevicesStore[device.address]?.connection
						? 'white'
						: 'blue'}
					outlined
					size="sm"
					style="background-color:{device?.isConnected &&
					$connectedDevicesStore[device.address]?.connection
						? 'green'
						: 'white'};font-weight:bold;"
					on:click={async () => await connectDevice(device)}
				>
					{#if connectingFlag}
						Connecting
					{:else if isUpdating}
						Updating&nbsp;{$otaProgressStore[device.address]?.progress
							? $otaProgressStore[device.address]?.progress
							: 0}%
					{:else if device?.isConnected && $connectedDevicesStore[device.address]?.connection}
						Refresh
					{:else}
						Connect
					{/if}
				</Button>
			</div>

			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span
				class:d-none={iflag}
				class="icon-power fsipx-24 btn-right-icon"
				style="color:rgba(0,0,0,0.7);width:10%;text-align:center;"
				on:click={async () => {
					if (!device?.isConnected) await connectDevice(device);
					await turn_device(device);
				}}
			/>
			<span style="width:10%;" class:d-none={!iflag} class="btn-right-icon"
				><Loader style="" /></span
			>
		</div>
		<div class="main m-2">
			<p>Ble ID : {device?.address}</p>
			{#if $connectedDevicesStore[device?.address]?.connection}
				<p>
					zigbee Id : {#if $connectedDevicesStore[device?.address]?.zigbeeId == 'unknown'}
						<span style="display:inline-block"><Fetcher /></span>
					{:else}
						{$connectedDevicesStore[device?.address]?.zigbeeId}
					{/if}
				</p>
				<p>
					channel : {#if $connectedDevicesStore[device?.address]?.channel == -1}
						<span style="display:inline-block"><Fetcher /></span>
					{:else}
						{$connectedDevicesStore[device?.address]?.channel}
					{/if}
				</p>
				<p>
					state : {#if $connectedDevicesStore[device?.address]?.state == -1}
						<span style="display:inline-block"><Fetcher /></span>
					{:else}
						{$connectedDevicesStore[device?.address]?.state}
					{/if}
				</p>
			{/if}
		</div>
		<div class="footer">
			<!-- PAIR OPTION -->
			{#if device?.name?.toLowerCase().includes('v4') && !device.isConnected}
				<Button
					block
					on:click={async () => {
						if (
							$extendedScanData[device?.address] &&
							$extendedScanData[device.address]?.state != 7
						) {
							await offlinePair($extendedScanData[device.address]);
							await Toast.show({
								text: 'Initiated Connectionless pair',
								position: 'top'
							});
						}
					}}
				>
					{$extendedScanData[device.address]?.state == 1 &&
					!$pairingLoader[$extendedScanData[device.address].ieeeAdrs]
						? 'Connectionless pair'
						: $extendedScanData[device.address]?.state == 7
							? 'Paired'
							: 'Pairing'}
					<span
						style="display:inline-block"
						class:d-none={!$pairingLoader[$extendedScanData[device?.address]?.ieeeAdrs]}
						><Fetcher /></span
					>
				</Button>
			{/if}
			{#if !pairingFlag && !resetFlag && $connectedDevicesStore[device?.address]?.connection && $connectedDevicesStore[device?.address]?.state == 0}
				<Button
					block
					on:click={async () => {
						await device_pair(device);
					}}>Pair device</Button
				>
			{/if}
			<!-- PROGRESSING THE PAIRING OR RESETTING -->
			{#if $connectedDevicesStore[device?.address]?.connection && (pairingFlag || resetFlag || $connectedDevicesStore[device?.address]?.state == 3 || $connectedDevicesStore[device?.address]?.state == 5)}
				<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
					<div
						class="progressbar"
						style="width:100%;border-radius:16px;background-color:	rgba(220,220,220,0.85);height:2.6rem;display:flex;flex-direction:column;align-items:center;justify-content:center;"
					>
						<div class="mb-1 text-center" style="font-weight: bolder;color:	rgb(105,105,105);">
							Device is being {pairingFlag ||
							$connectedDevicesStore[device?.address]?.state == 3 ||
							$connectedDevicesStore[device?.address]?.state == 5
								? 'paired'
								: 'reset'}...
						</div>
					</div>
				</div>
				<!-- DEVICE IS PAIRED -->
			{:else if device?.isConnected && ($connectedDevicesStore[device?.address]?.state == 7 || $connectedDevicesStore[device?.address]?.state == 6)}
				<p class="title-medium" style="text-align: center;color:green;font-weight:bold;">
					device has paired!!
				</p>
			{:else if $connectedDevicesStore[device.address] && $connectedDevicesStore[device?.address]?.state == 2}
				<Button
					block
					outlined
					style="height:48px;font-size:14px;"
					on:click={async () => await resetDevice(device)}>Reset device</Button
				>
			{/if}
			{#if device?.isConnected && $connectedDevicesStore[device.address]?.connection}
				<Button
					disabled={disConnectingFlag || connectingFlag || iflag || pairingFlag || resetFlag}
					block
					on:click={async () => disConnectDevice(device)}
				>
					{disConnectingFlag ? 'Disconnecting...' : 'Disconnect'}
				</Button>
			{/if}
			<Button
				disabled={disConnectingFlag}
				outlined
				block
				on:click={async () => {
					if (!device?.isConnected) await connectDevice(device);
					await goto(`device-ota?device=${JSON.stringify(device)}`);
				}}
				><span style="font-size: 14px;">Firmware, Channel, Reset</span>
				<span class="icon-chevron-right-1 fsipx-24 btn-right-icon" />
			</Button>
		</div>
	</Card>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.card_header {
		display: flex;
		justify-content: space-between;
	}
	.footer {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
