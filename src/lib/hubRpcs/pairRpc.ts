import { ProtoPackageName } from "$lib/constants/gateway/system-contants";
import { Buffer } from "../constants/index"
import { Gateway, nc } from "$lib/stores";
import { natsTypeConversionUtils } from "$lib/utils/bufferUtil";
import { get } from "svelte/store";
import type * as pairStructure from "../generated/hub/devices/device";


export const pairDevice = async (pairDevice: pairStructure.com.keus.hub.EnterPairMode,gateway:string) => {
    try {
        
        let res = await nc.binaryCallRPC(
            gateway,
            // "Keus-6f3e9155-512e-4ff4-890c-a557e254773a-HUB-REQ-MANAGER-BINARY-RPC",
            natsTypeConversionUtils.packAnyToBuffer(
                pairDevice,
                ProtoPackageName + ".EnterPairMode"
            )
        );
        let resData = res?.data?.toString() || "NA";
        let protoResp = natsTypeConversionUtils.unpackBufferToAny(Buffer.from(resData));
        let finalObj = protoResp.toObject();
        return finalObj;

    } catch (e) {

        return e;

    }
}