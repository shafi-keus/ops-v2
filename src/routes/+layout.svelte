<script lang="ts">
	import {
		bleInitialize,
		connectedDevices,
		delay,
		extendedScanData,
		otaFlag,
		scanningFlag,
		themeType,
		type OtaData,
		type scandata
	} from '$lib/stores';
	import { BLE } from 'capacitor-bluetooth';
	import { onMount } from 'svelte';
	import { scanningData } from '$lib/stores';
	import '$lib/theme/kiotp-theme/generated/colors.module.css';
	import '$lib/theme/kiotp-theme/generated/theme.css';
	import '$lib/theme/kiotp-theme/generated/theme.dark.css';
	import '$lib/theme/kiotp-theme/generated/theme.light.css';
	import '$lib/theme/kiotp-theme/generated/tokens.css';
	import '$lib/theme/kiotp-theme/generated/typography.module.css';
	import {
		connectedDevicesStore,
		deviceCategoryMap,
		globalDeviceMap,
		nc,
		otaProgressStore,
		type DeviceObject
	} from '$lib/stores';
	import { natsTypeConversionUtils } from '$lib/utils/bufferUtil';
	import { token } from '$lib/constants/global';
	import fetchGlobals from '$lib/apis/fetchGlobals';
	type EventData = {
		type: number;
		data: any;
	};

	interface scanResult {
		devices: scandata[];
	}

	interface Connection {
		success: boolean;
		deviceId?: string;
	}

	interface Characteristic {
		success: boolean;
		deviceId?: string;
		characteristic: string;
		value?: any;
	}

	enum Events {
		//RESPONSES
		INITIALIZE_BLE_RESPONSE = 51,
		DEINITIALIZE_BLE_RESPONSE = 52,
		STARTSCAN_RESPONSE = 53,
		STOPSCAN_RESPONSE = 54,
		LISTDEVICE_RESPONSE = 55,
		CONNECT_RESPONSE = 56,
		DISCONNECT_RESPONSE = 57,
		WRITE_CHARACTERISTIC_RESPONSE = 58,
		READ_CHARACTERISTIC_RESPONSE = 59,
		NOTIFY_CHARACTERISTIC_RESPONSE = 60,
		NOTIFY_CHARACTERISTIC_UPDATE_RESPONSE = 61,
		SET_PRIORITY_RESPONSE = 62,
		SET_MTU_RESPONSE = 63,
		SET_PHY_RESPONSE = 63,
		OTAINFO = 65,
		DISCOVER_SERVICE_RESPONSE = 66,
		ADVT_RESP = 67,
		SETTINGSINFO = 108,
		//ERROR RESPONSE
		BLE_NOT_ENABLE = 100,
		BLE_NOT_INITIALIZED = 101,
		BLE_NO_SCANNING_DATA = 102,
		BLE_ADDRESS_NOT_FOUND = 103,
		BLE_CHARACTER_NOT_FOUND = 104
	}

	async function initialize(data: any) {
		if (data?.success) {
			$bleInitialize = true;
			if (!$otaFlag) await BLE.startScan();
			await BLE.getDevices();
		} else await BLE.initializeBle();
	}

	function closeBle(data: any) {
		console.log('event data of closeBle : ', JSON.stringify(data));
	}

	async function startScan(isStarted: boolean) {
		console.log('start scan response : ', JSON.stringify(isStarted));
		if (isStarted) $scanningFlag = true;
		else await BLE.startScan();
	}

	function stopScan(isStopped: boolean) {
		console.log('stop scan response : ', JSON.stringify(isStopped));
		if (isStopped) {
			$scanningFlag = false;
		}
	}

	async function getDevices(data: scanResult) {
		console.log('event data of getDevices : ', JSON.stringify(data));
		let devices = data?.devices;
		if (devices && devices.length > 0) $scanningData = devices;

		await delay(1000, async () => {
			await BLE.getDevices();
		});
	}

	function getSettingsInfo(Data: any) {
		throw new Error('Function not implemented.');
	}

	async function processOtaInfo(Data: any) {
		console.log('progress of ota ', JSON.stringify(Data));
		if (!$otaFlag) $otaFlag = true;

		let deviceId = Data?.bleAddress;

		if (!$connectedDevicesStore[deviceId]) {
			$connectedDevicesStore[deviceId] = {
				connection: true,
				state: -1,
				channel: -1,
				zigbeeId: 'unknown',
				isOta: true,
				device: null
			};
			// channel
			await BLE.readCharacteristic({
				deviceId: deviceId,
				characteristic: 'f000a005-0451-4000-b000-000000000000'
			});
			// state
			await BLE.readCharacteristic({
				deviceId: deviceId,
				characteristic: 'f000a001-0451-4000-b000-000000000000'
			});
			// IEEE
			await BLE.readCharacteristic({
				deviceId: deviceId,
				characteristic: 'f0000007-0451-4000-b000-000000000000'
			});
		}

		$otaProgressStore[deviceId] = {
			inOta: true,
			progress: Data.progress,
			bleAddress: deviceId
		};

		if (Data.progress == 100) {
			delete $otaProgressStore[deviceId];
			$otaFlag = false;
		}
	}

	async function connect(Data: Connection) {
		if (Data?.success && Data?.deviceId) {
			await BLE.stopScan();
			const deviceId = Data?.deviceId;
			if (!$connectedDevicesStore[deviceId]) {
				$connectedDevicesStore[deviceId] = {
					connection: true,
					state: -1,
					channel: -1,
					zigbeeId: 'unknown',
					isOta: false,
					device: null
				};
			} else {
				console.warn(`Device ${Data?.deviceId} is already connected`);
				return;
			}
			// discover services
			await BLE.requestServiceDiscover({
				deviceId: deviceId
			});
			// set the mtu for the connected device
			await BLE.setMtu({
				deviceId: deviceId,
				mtu: 256
			});
		}
	}

	async function serviceDiscovery(Data: any) {
		// After service discovery read the characterstics
		if (Data.success) {
			const deviceId = Data.deviceId;
			// channel
			await BLE.readCharacteristic({
				deviceId: deviceId,
				characteristic: 'f000a005-0451-4000-b000-000000000000'
			});
			// state
			await BLE.readCharacteristic({
				deviceId: deviceId,
				characteristic: 'f000a001-0451-4000-b000-000000000000'
			});
			// IEEE
			await BLE.readCharacteristic({
				deviceId: deviceId,
				characteristic: 'f0000007-0451-4000-b000-000000000000'
			});
			// notify state of the deviceID
			await BLE.notifyCharacteristic({
				deviceId: deviceId,
				characteristic: 'f000a001-0451-4000-b000-000000000000'
			});
		}
	}

	async function disconnet(Data: Connection) {
		if (Data.success && Data.deviceId) {
			if ($connectedDevicesStore[Data?.deviceId]) delete $connectedDevicesStore[Data.deviceId];
			if ($otaProgressStore[Data?.deviceId]) delete $otaProgressStore[Data.deviceId];
			if ($extendedScanData[Data?.deviceId]) delete $extendedScanData[Data?.deviceId];
			console.log('device is disconnected ');
			await BLE.startScan();
		}
	}

	function write(Data: any) {
		console.log('WRITE RESPONSE : ', JSON.stringify(Data));
	}

	function parseIEEEAddress(uint8ArrayData: Uint8Array) {
		if (uint8ArrayData.length !== 8) {
			console.log('Invalid IEEE address data. It should be 8 bytes (64 bits) long.');
			return;
		}

		const uint8ToHex = (value: number) => {
			if (value < 0) value = value + 256;
			return value.toString(16).padStart(2, '0');
		};

		const fullAddress = Array.from(uint8ArrayData)
			.map((byte) => uint8ToHex(byte))
			.join('');

		return `0x${fullAddress}`;
	}

	function read(Data: Characteristic) {
		console.log('READ RESPONSE : ', JSON.stringify(Data));
		if (Data.success && Data.deviceId && Data.characteristic) {
			if ($connectedDevicesStore[Data?.deviceId]) {
				switch (Data.characteristic) {
					case 'f000a005-0451-4000-b000-000000000000': {
						$connectedDevicesStore[Data.deviceId].channel = Data.value[0];
						break;
					}
					case 'f000a001-0451-4000-b000-000000000000': {
						$connectedDevicesStore[Data.deviceId].state = Data.value[0];
						break;
					}
					case 'f0000007-0451-4000-b000-000000000000': {
						$connectedDevicesStore[Data.deviceId].zigbeeId = parseIEEEAddress(Data.value);
						break;
					}
				}
			}
		}
	}

	function advtResp(Data: any) {
		console.log('advt resp : ', JSON.stringify(Data));
	}

	function notify(Data: any) {
		console.log('NOTIFY RESPONSE : ', JSON.stringify(Data));
	}

	function setPriority(Data: any) {
		console.log('connection priority response : ', JSON.stringify(Data));
	}

	function setMtu(Data: any) {
		console.log('mtu set response', JSON.stringify(Data));
	}

	function bleNotEnable(Data: any) {
		console.log('ble not enabled', JSON.stringify(Data));
	}

	function bleNotInitialized(Data: any) {
		console.log('ble not initialized', JSON.stringify(Data));
	}

	function noScanningData(Data: any) {
		console.log('no scanning data', JSON.stringify(Data));
	}

	function addressNotFound(Data: any) {
		console.log('address not found', JSON.stringify(Data));
	}

	function charactersticNotFound(Data: any) {
		console.log('characterstic not found', JSON.stringify(Data));
	}

	async function processRespEvent(eventData: EventData) {
		console.log('Received Event From Plugin : ', JSON.stringify(eventData));
		switch (eventData.type) {
			// positive response
			case Events.INITIALIZE_BLE_RESPONSE: {
				initialize(eventData.data);
				break;
			}
			case Events.DEINITIALIZE_BLE_RESPONSE: {
				closeBle(eventData.data);
				break;
			}
			case Events.STARTSCAN_RESPONSE: {
				startScan(eventData.data);
				break;
			}
			case Events.STOPSCAN_RESPONSE: {
				stopScan(eventData.data);
				break;
			}
			case Events.LISTDEVICE_RESPONSE: {
				getDevices(eventData.data);
				break;
			}
			case Events.CONNECT_RESPONSE: {
				connect(eventData.data);
				break;
			}
			case Events.DISCONNECT_RESPONSE: {
				disconnet(eventData.data);
				break;
			}
			case Events.WRITE_CHARACTERISTIC_RESPONSE: {
				write(eventData.data);
				break;
			}
			case Events.READ_CHARACTERISTIC_RESPONSE: {
				read(eventData.data);
				break;
			}
			case Events.NOTIFY_CHARACTERISTIC_RESPONSE: {
				notify(eventData.data);
				break;
			}
			case Events.NOTIFY_CHARACTERISTIC_UPDATE_RESPONSE: {
				notifyUpdate(eventData.data);
				break;
			}
			case Events.SET_PRIORITY_RESPONSE: {
				setPriority(eventData.data);
				break;
			}
			case Events.SET_MTU_RESPONSE: {
				setMtu(eventData.data);
				break;
			}
			case Events.SETTINGSINFO: {
				getSettingsInfo(eventData.data);
				break;
			}
			case Events.DISCOVER_SERVICE_RESPONSE: {
				serviceDiscovery(eventData.data);
				break;
			}
			case Events.OTAINFO: {
				processOtaInfo(eventData.data);
				break;
			}
			case Events.ADVT_RESP: {
				advtResp(eventData.data);
				break;
			}
			// Error cases
			case Events.BLE_NOT_ENABLE: {
				bleNotEnable(eventData.data);
				break;
			}
			case Events.BLE_NOT_INITIALIZED: {
				bleNotInitialized(eventData.data);
				break;
			}
			case Events.BLE_NO_SCANNING_DATA: {
				noScanningData(eventData.data);
				break;
			}
			case Events.BLE_ADDRESS_NOT_FOUND: {
				addressNotFound(eventData.data);
				break;
			}
			case Events.BLE_CHARACTER_NOT_FOUND: {
				charactersticNotFound(eventData.data);
				break;
			}
		}
	}

	function notifyUpdate(Data: any) {
		if (Data.characteristic == 'f000a001-0451-4000-b000-000000000000') {
			let deviceId = Data.deviceId;
			$connectedDevicesStore[deviceId].state = Data.value[0];
		}
	}

	async function initApp() {
		try {
			// FETCHING THE DEVICEMAP FROM CLOUD
			let data = await fetchGlobals({
				token: token
			});
			let res = [];
			if (data?.data?.success) res = data?.data?.data;
			//device map
			res.forEach((device: DeviceObject) => {
				if (
					device?.categoryDisplayName &&
					device?.isOtaUpgradeable &&
					!$deviceCategoryMap.hasOwnProperty(device?.deviceCategory)
				)
					$deviceCategoryMap[device?.categoryDisplayName] = [];
				$globalDeviceMap[device?.bleDeviceName] = device;
			});
			//category map
			res.forEach((device: DeviceObject) => {
				if (device?.categoryDisplayName && device?.bleDeviceName && device?.isOtaUpgradeable)
					$deviceCategoryMap[device?.categoryDisplayName].push(device?.bleDeviceName);
			});
			console.log('device map : ' + $globalDeviceMap);
			console.log('category map : ' + JSON.stringify(Object.keys($deviceCategoryMap)));
		} catch (error) {
			console.error('error while fetching the deviceMap for app');
		}
	}
	async function initRequest() {
		await BLE.requestLocationEnable();
		await BLE.requestBle();
		await BLE.initializeBle();
	}

	onMount(async () => {
		try {
			let metaData = {
				phone: '+919999999999',
				deviceType: 'android'
			};
			nc.setMetaData(JSON.stringify(metaData));
			let conRes = await nc.connect();
			console.log('NATS CONNECTION- ', conRes);
			natsTypeConversionUtils.registerTypes();
			await BLE.addListener('pluginEvent', (eventData) => processRespEvent(eventData?.data));
			await initApp();
			await initRequest();
		} catch (error) {
			console.log('found error while fetching event data...', error);
		}
	});
</script>

<slot />

{#if $themeType == 'light'}
	<style lang="scss">
		@import '../lib/theme/kiotp-theme/src/light/index.scss';
	</style>
{:else}
	<style lang="scss">
		@import '../lib/theme/kiotp-theme/src/dark/index.scss';
	</style>
{/if}

<style lang="scss">
	:global(
			.title-large,
			.title-medium,
			.title-small,
			.body-large,
			.body-medium,
			.body-small,
			.label-large,
			.label-medium,
			.label-small
		) {
		font-family: 'Poppins';
	}
	:global(.back) {
		position: fixed;
		bottom: 16px;
		left: 16px;
	}
</style>
