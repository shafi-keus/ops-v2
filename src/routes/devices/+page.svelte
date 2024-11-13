<script lang="ts">
	import {
		connectedDevicesStore,
		extendedScanData,
		otaFlag,
		pairingLoader,
		scanningData,
		scanningFlag,
		selectedGateway,
		staticToken,
		type scandata
	} from '$lib/stores';
	import { BLE } from 'capacitor-bluetooth';
	import { App } from '@capacitor/app';
	import { onDestroy, onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { deviceCategoryMap, filterStore, globalDeviceMap } from '$lib/stores';
	import Button from '$lib/components/Button.svelte';
	import Blev3card from '$lib/components/Blev3card.svelte';
	import Filter from '$lib/components/filter.svelte';
	import { Toast } from '@capacitor/toast';
	import Loader from '$lib/components/Loader.svelte';
	import { Icon } from '@sveltestrap/sveltestrap';
	import { processDataFromPlugin } from '$lib/peripheral';
	import Fuse, { type FuseResult } from 'fuse.js';
	import confirmVirtualDevice from '$lib/apis/confirmVirtualDevice';
	import deviceFirmwareVersion from '$lib/apis/deviceFirmwareVersion';
	let deviceList: scandata[] = [];
	let searchText = '';
	const unsubscribe = scanningData.subscribe((value) => {
		if (deviceList?.length > 0) updateDeviceList(value);
		else {
			deviceList = value;
			sortDevices(deviceList);
		}
	});
	let deviceSearch = false;
	let filterModal = false;
	let searchFlag = false;
	let searchedCategories: string[] = [];
	let searchedDevices: scandata[] = [];
	let filters: string[] = [];
	let filteredDevices: scandata[] = [];
	let listner = App.addListener('backButton', async () => {
		if (searchFlag) searchFlag = false;
		else if (filterModal) filterModal = false;
		else {
			$filterStore = [];
			await goto('/');
		}
	});
	async function advertiseOnline() {
		console.log('Online advt triggered');
		await BLE.sendAdvertisement({
			data: [1, 2],
			time: 2000
		});
	}
	function removeDevice(deviceId: string) {
		const index = deviceList?.findIndex((d) => d?.address == deviceId);
		if (index !== -1) deviceList.splice(index, 1);
	}

	async function processManfData(device: scandata) {
		if (device?.manufacturingData && device?.manufacturingData?.length > 0) {
			console.log('manf data : ', JSON.stringify(device?.manufacturingData));
			try {
				let data = processDataFromPlugin(device?.manufacturingData);
				let deviceName = device?.name?.split(' ')[0] || '';
				let deviceCategory = $globalDeviceMap[deviceName]?.dmDeviceCategory;
				let deviceType = $globalDeviceMap[deviceName]?.dmDeviceType;
				let state = data?.networkState;
				let ieeeAdrs = data?.ieeeAddress;
				if (!$extendedScanData[device.address]) {
					$extendedScanData[device.address] = {
						deviceCategory,
						deviceType,
						ieeeAdrs,
						state
					};
				} else {
					// Initially if it's 1 and if get updated to 7 call confirmVirtualDevice
					if ($extendedScanData[device?.address].state == 1) {
						if (state == 7) {
							// send confirm device
							let resp = await confirmVirtualDevice({
								gatewayId: $selectedGateway.gatewayId,
								ieeeAddr: $extendedScanData[device.address].ieeeAdrs,
								protocol: 'ZD',
								token: $staticToken
							});
							console.log('resp from confirm device : ', JSON.stringify(resp));
							$pairingLoader[$extendedScanData[device.address].ieeeAdrs] = false;
						}
					}
					$extendedScanData[device?.address].state = state;
				}

				console.log(
					'manf data after processing: ',
					JSON.stringify($extendedScanData[device.address])
				);
			} catch (error) {
				console.error('failed to process the manf data', error);
			}
		}
	}

	// sort the device list based on connection
	function sortDevices(devices: scandata[]) {
		if (devices.length > 0)
			devices?.sort((a, b) => {
				if (a?.isConnected && !b?.isConnected) return -1;
				if (!a?.isConnected && b?.isConnected) return 1;
				return 0;
			});
	}

	function updateDeviceList(devices: scandata[]) {
		devices?.forEach((device) => {
			const index = deviceList?.findIndex((d) => d?.address == device?.address);
			if (index > -1) {
				// update the existing device..
				deviceList[index].isConnected = device.isConnected;
				deviceList[index].rssi = device.rssi;
				deviceList[index].name = device.name;
				deviceList[index].manufacturingData = device.manufacturingData;
			} else deviceList?.push(device);

			// process the manfData
			processManfData(device);
		});

		// remove non-existing devices in device store from deviceList
		deviceList.forEach((device) => {
			const index = devices?.findIndex((d) => d?.address == device?.address);
			if (index == -1) removeDevice(device?.address);
		});
		// sort the device list based on connection
		sortDevices(deviceList);
		// trigger update filters and search devices
		if (filters?.length > 0) updateFilters();
		if (searchText.length > 0) searchDevice();
	}

	onMount(async () => {
		filters = $filterStore;
		if (filters?.length > 0) updateFilters();
	});
	onDestroy(async () => {
		try {
			await BLE.stopScan();
			unsubscribe();
			(await listner).remove();
		} catch (error) {
			console.error('error : ', error);
		}
	});

	function handleRemove(filter: string) {
		filters = filters.filter((str) => str !== filter);
		$filterStore = filters;
		searchedCategories = searchedCategories.filter((device) => {
			!$deviceCategoryMap[filter].includes(device);
		});
		updateFilters();
	}

	async function sortDevicesByRssi() {
		if (searchedDevices?.length > 0) {
			searchedDevices.sort((a, b) => b.rssi - a.rssi);
			await Toast.show({
				text: 'Devices sorted',
				duration: 'short',
				position: 'top'
			});
			return;
		}
		deviceList.sort((a, b) => b.rssi - a.rssi);
		await Toast.show({
			text: 'Devices sorted',
			duration: 'short',
			position: 'top'
		});
	}

	function searchDevice() {
		if (searchText?.length == 0) {
			if (filteredDevices?.length == 0) searchedDevices = [];
			else searchedDevices = filteredDevices;
			return;
		}
		searchedDevices = [];
		let searchResult: FuseResult<scandata>[] = [];
		let fuse = new Fuse(filters?.length > 0 ? filteredDevices : deviceList, {
			keys: ['name'],
			distance: 0,
			threshold: 0.0
		});
		searchResult = fuse.search(searchText);
		console.log('search result : ', JSON.stringify(searchResult));
		if (searchResult?.length > 0) {
			let fuseResults = Object?.values(searchResult);
			for (const device in fuseResults) {
				searchedDevices.push(fuseResults[device].item);
			}
		}
	}

	function updateFilters() {
		searchedCategories = [];
		if (filters?.length == 0) {
			filteredDevices = [];
			if (searchText?.length == 0) searchedDevices = [];
			return;
		}
		// push all the category devices
		for (const filter in filters) {
			if ($deviceCategoryMap[filters[filter]])
				searchedCategories.push(...$deviceCategoryMap[filters[filter]]);
		}
		console.log('searched category devices : ', searchedCategories);
		let filterResult = deviceList.filter((device) => {
			const deviceName = device.name || '';
			return searchedCategories.some((category) => deviceName.startsWith(category));
		});
		console.log('filter result : ', filterResult);
		if (filterResult?.length > 0) {
			filteredDevices = filterResult;
			searchDevice();
		}
	}
	$: if (!$otaFlag && !$scanningFlag && Object.keys($connectedDevicesStore)?.length == 0) {
		(async () => {
			await BLE.startScan();
			Toast.show({
				text: 'Scanning nearby devices',
				duration: 'short',
				position: 'top'
			});
		})();
	}
	$: if (filters.length > 0 || searchText.length > 0) deviceSearch = true;
	else deviceSearch = false;
</script>

{#if filterModal}
	<Filter
		{filters}
		on:applied={(event) => {
			filters = event.detail;
			$filterStore = filters;
			filterModal = false;
			updateFilters();
		}}
		on:cancled={() => (filterModal = false)}
	/>
{/if}

<div class="main theme-page" class:d-none={filterModal}>
	<div class="header bottom-shadow" style="padding:{searchFlag ? 8 : 16}px">
		<!-- Search text for searching the devices with ble name -->
		<div class:d-none={!searchFlag} style="position:relative;width:100%;z-index:999;height:3rem;">
			<input
				class="px-3"
				type="text"
				bind:value={searchText}
				on:input={searchDevice}
				placeholder="  search for device eg: KZSC4C   "
				style="width:100%;height:100%;border-radius:2rem;border-style:none;"
			/>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				style="padding:.3rem;background-color:rgba(220,220,220,.5);position:absolute;z-index:1000;top:.6rem;right:1rem;border-radius:50%;display:flex;align-items:center;"
				on:click={() => {
					searchText = '';
					searchFlag = false;
				}}
			>
				<span class="icon-close fsipx-20" />
			</div>
		</div>
		<p class="title-large" style="display: inline-block;" class:d-none={searchFlag}>Devices</p>
		<div
			style="display:inline-flex;gap:8px;align-items:center;position:absolute;right:16px"
			class:d-none={searchFlag}
		>
			<Button outlined size="sm" color="black" on:click={sortDevicesByRssi}
				><Icon name="sort-down" /></Button
			>
			<Button outlined size="sm" color="black" on:click={() => (searchFlag = true)}
				><Icon name="search" /></Button
			>
		</div>
	</div>
	<div class="filter">
		<Button
			class="filter_ele"
			outlined
			size="md"
			style="border-color: rgba(0,0,0,0.35);padding:6px 16px;"
			on:click={async () => {
				filterModal = true;
			}}
		>
			<span class=""><img src="/images/filter.svg" alt="filter" height="18px" width="18px" /></span>

			<span class="d-inline-block" style="color: black;"> Filter </span>
		</Button>
		{#each filters as filter, i}
			<Button
				outlined
				size="md"
				style="min-width:fit-content;height:min-content;border-color:rgba(0,0,0,0.35);padding:6px 16px;"
				><span style="color:black">{filter}</span>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					class="icon-close fsipx-20 btn-right-icon"
					style="color: black;"
					on:click={() => {
						handleRemove(filter);
					}}
				/></Button
			>
		{/each}
	</div>
	<div class="content">
		{#if deviceSearch}
			{#each searchedDevices as device, index (device?.address)}
				<div class="blecard"><Blev3card {device} /></div>
			{:else}
				<p class="p-2" style="text-align: center;">
					<span>No devices found!</span> <br />
					<span>searching devices..</span><Loader style="scale:.7" />
				</p>
			{/each}
		{:else}
			{#each deviceList as device, index (device?.address)}
				<div class="blecard"><Blev3card {device} /></div>
			{:else}
				<p class="p-2" style="text-align: center;">
					<span>searching devices..</span><Loader style="scale:.7" />
				</p>
			{/each}
		{/if}
	</div>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	.main {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.header {
		width: 100%;
	}
	.blecard {
		margin-bottom: 16px;
	}
	.content {
		width: 100%;
		padding: 16px;
		margin-bottom: 16px;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.filter {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
		padding: 16px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.09);
	}
</style>
