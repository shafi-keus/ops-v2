import { get } from "svelte/store";
import { prevId } from "../stores/index"
type VirtualResp = {
    deviceId: string,
    nwkAddr: number,
    linkKey: {
        type: string,
        data: number[]
    },
    deviceTypeId: number,
    panId: number,
    extPanId: number[],
    networkKey: number[]
};
type DeviceData = {
    // deviceCategory: number,
    // deviceType: number,
    ieeeAddress: string,
    networkState: number
};

/*
msgId : [0-255]

array format : 

arr[msgid(start with 0 previous id +1 ),
msgType( default : 2),
channel,
panId,panId,
extPanId,extPanId,extPanId,extPanId,extPanId,extPanId,extPanId,extPanId,
nwkAddr,nwkAddr,
networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,networkkey,
linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey,linkKey]

*/


export const generateMsgId = () => {
    const id = get(prevId)
    if (id == 256)
        prevId.set(1)
    else prevId.set(id + 1)
    const updatedId = get(prevId);
    return updatedId
}
export const pairAdvtData = (resp: VirtualResp, channel: number): number[] => {
    const msgType = 2;
    const msgId = generateMsgId();

    const panIdHigh = (resp.panId >> 8) & 0xFF;
    const panIdLow = resp.panId & 0xFF;
    const nwkAddrHigh = (resp.nwkAddr >> 8) & 0xFF;
    const nwkAddrLow = resp.nwkAddr & 0xFF;

    const extPanId = resp.extPanId.slice(0, 8).concat(Array(8).fill(0)).slice(0, 8);
    const networkKey = resp.networkKey.slice(0, 16).concat(Array(16).fill(0)).slice(0, 16);
    const linkKey = resp.linkKey.data.slice(0, 16).concat(Array(16).fill(0)).slice(0, 16);

    const arr: number[] = [
        msgId, msgType, channel, panIdHigh, panIdLow,
        ...extPanId,
        nwkAddrHigh, nwkAddrLow,
        ...networkKey,
        ...linkKey
    ];

    return arr;
}

/*
    ADVT DATA
    1 byte device category
    1 byte device type
    8 bytes ieee address
    1 byte network state  [1 : default ,5 : request sent , 7 : paired ]
*/

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

export const processDataFromPlugin = (buffer: Uint8Array): DeviceData => {


    if (buffer.length !== 9) {
        throw new Error('Invalid data length. Expected 9 bytes.');
    }

    // const deviceCategory = buffer[0];
    // const deviceType = buffer[1];

    const ieeeAddressArray = buffer.slice(0, 8).reverse();
    const ieeeAddress = parseIEEEAddress(ieeeAddressArray)

    const networkState = buffer[8];

    return {
        // deviceCategory,
        // deviceType,
        ieeeAddress: `${ieeeAddress}`,
        networkState
    };

}

export const pairAdvt = () => {

}