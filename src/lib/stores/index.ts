import { readable, writable, type Writable } from "svelte/store";
import { KeusRealtimeCommunication } from "@keus-automation/kiotp-realtime-js-web";
// import * as Appliance_types from "$lib/generated/hub/gateway-models/appliances/appliance_constants";
// import * as GROUP_TYPES from "$lib/generated/hub/groups/group_structures";

type themeType = "dark" | "light";
export const themeType: Writable<themeType> = writable("light");

export const nc = new KeusRealtimeCommunication({
  host: "ws://kioti-nats-1.keus.in",
  port: 443,
  token: "keus-ops-nats",
})
// export const Gateway: Writable<string> = writable("Keus-6f3e9155-512e-4ff4-890c-a557e254773a-HUB-REQ-MANAGER-BINARY-RPC");
export const Gateway: Writable<string> = writable("");
export const gatewayId: Writable<string> = writable("");
// export const hubData = writable(null);
export const selectedGateway: Writable<SelectedGatewayType> = writable();
// export const appliance_types = readable(Appliance_types.com.keus.gateway.APPLIANCE_ICONS);
// export const group_types = readable(GROUP_TYPES.com.keus.hub.GROUP_TYPES)


const otaDevices: scandata[] = [];
export const otaStore = writable(otaDevices);
type connectedDeviceStoreType = {
  [key: string]: {
    connection: boolean
    state: number,
    channel: number,
    zigbeeId: string | undefined,
    isOta: boolean,
    device: scandata | null
  };
};
type SelectedGatewayType = {
  type: "main" | "mini",
  gatewayId: string,
  channel: number,
  ip: string
}
type otaProgressStoreType = {
  [key: string]: {
    inOta: boolean,
    status?: 'Success' | 'Fail' | 'Progress',
    errorMsg?: string
    progress: number,
    bleAddress: string
  }
};
export const connectedDevicesStore: Writable<connectedDeviceStoreType> = writable({});
export const otaProgressStore: Writable<otaProgressStoreType> = writable({});
export const staticToken = readable('ba0b606a-2c2a-4831-aa9b-7501cb9de4e6')
export const gatewayData = writable([]);
export const channel: Writable<number> = writable(26);
export const leadId: Writable<string> = writable("");
export const deviceState = writable({});

export const gateways = writable([]);



export const filterStore: Writable<string[]> = writable([]);



type deviceType = {
  [key: string]: DeviceObject
};
export type DeviceObject = {
  deviceType: string;
  deviceCategory: string;
  dmDeviceCategory: number;
  dmDeviceType: number;
  bleDeviceName: string;
  categoryDisplayName: string;
  typeDisplayName: string;
  isOtaUpgradeable: boolean;
  isFlashable: boolean;
  chipType: string;
};

type deviceCategoryMapType = {
  [key: string]: string[]
}
export const globalDeviceMap: Writable<deviceType> = writable({});
export const deviceCategoryMap: Writable<deviceCategoryMapType> = writable({});
export const natsConnection: Writable<boolean> = writable(false);
export const advtMsgId: Writable<number> = writable(0);
export const prevId: Writable<number> = writable(1);

export type scandata = {
  name: string;
  address: string;
  rssi: number;
  isConnected: boolean;
  manufacturingData?: Uint8Array;
}

export interface OtaData {
  deviceId: string;
  deviceName: string;
  version: string;
  updatingVersion: string;
  progress: number;
  errorMsg?: string;
  opsMsg?: string;
}

export interface ExtendedScan {
  deviceCategory: number,
  deviceType: number,
  ieeeAdrs: string,
  state: number
}

export type extendedScanType = {
  [deviceId: string]: ExtendedScan
}
export type PairLoader = {
  [deviceId: string]: boolean
}
export const scanningData: Writable<scandata[]> = writable([]);
export const extendedScanData: Writable<extendedScanType> = writable({});
export const pairingLoader: Writable<PairLoader> = writable({})
export const otaData: Writable<OtaData[]> = writable([]);            // OTA LIMIT = 1
export const connectedDevices: Writable<scandata[]> = writable([]);  //CONNECTION LIMIT = 1

export function delay(time: number, func: () => Promise<void>) {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await func();
      resolve(null);
    }, time);
  });
}
export const scanningFlag: Writable<boolean> = writable(false)
export const otaFlag: Writable<boolean> = writable(false)
export const bleInitialize: Writable<boolean> = writable(false)
export const deviceConnected: Writable<boolean> = writable(false)


// store to save all the gateway data required for node reg
type GatewayDetailInfo = {
  siteId: string,
  masterKey: string,
  serviceUser: string,
  serviceUserPassword: string,
  nodeInfo: {
    brokerIp: string,
    autoDiscoveryOfBrokerIp: boolean
  }
}

export const gatewayDetailInfo: Writable<GatewayDetailInfo> = writable({
  siteId: '',
  masterKey: '',
  serviceUser: '',
  serviceUserPassword: '',
  nodeInfo: {
    autoDiscoveryOfBrokerIp: false,
    brokerIp: ''
  }
})




