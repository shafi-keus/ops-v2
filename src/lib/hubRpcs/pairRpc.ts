import { ProtoPackageName } from "$lib/constants/gateway/system-contants";
import { Buffer } from "../constants/index"
import { nc } from "$lib/stores";
import { natsTypeConversionUtils } from "$lib/utils/bufferUtil";
import type * as pairStructure from "../generated/hub/devices/device";


export const pairDevice = async (pairDevice: pairStructure.com.keus.hub.EnterPairMode, gateway: string) => {
    try {

        const res = await nc.binaryCallRPC(
            gateway,
            // "Keus-6f3e9155-512e-4ff4-890c-a557e254773a-HUB-REQ-MANAGER-BINARY-RPC",
            natsTypeConversionUtils.packAnyToBuffer(
                pairDevice,
                ProtoPackageName + ".EnterPairMode"
            )
        );
        const resData = res?.data?.toString() || "NA";
        const protoResp = natsTypeConversionUtils.unpackBufferToAny(Buffer.from(resData));
        const finalObj = protoResp.toObject();
        return finalObj;

    } catch (e) {

        return e;

    }
}