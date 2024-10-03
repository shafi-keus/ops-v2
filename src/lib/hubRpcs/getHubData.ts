import { ProtoPackageName } from "$lib/constants/gateway/system-contants";
import { nc, Gateway } from "$lib/stores";
import { Buffer } from "../constants/index"
import { natsTypeConversionUtils } from "$lib/utils/bufferUtil";
import type * as hubStructureType from "../generated/hub/home/home_structures";
import { get } from "svelte/store";

export const getHubData = async (hubdata: hubStructureType.com.keus.hub.GetHubData,gateway:string) => {
    try {
        let res = await nc.binaryCallRPC(
            // "Keus-6f3e9155-512e-4ff4-890c-a557e254773a-HUB-REQ-MANAGER-BINARY-RPC",
            gateway,
            natsTypeConversionUtils.packAnyToBuffer(
                hubdata,
                ProtoPackageName + ".GetHubData"
            )
        );
        let resData = res?.data?.toString() || "NA";
        // console.log("rpc response: " + res);
        let protoResp = natsTypeConversionUtils.unpackBufferToAny(res?.data);
        let finalObj = protoResp.toObject();
        return finalObj;
    } catch (e) {
        console.log(e);
        return e;
    }
}