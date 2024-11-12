import { ProtoPackageName } from "$lib/constants/gateway/system-contants";
import { nc } from "$lib/stores";
import { natsTypeConversionUtils } from "$lib/utils/bufferUtil";
import type * as hubStructureType from "../generated/hub/home/home_structures";


export const getHubData = async (hubdata: hubStructureType.com.keus.hub.GetHubData,gateway:string) => {
    try {
        const res = await nc.binaryCallRPC(
            // "Keus-6f3e9155-512e-4ff4-890c-a557e254773a-HUB-REQ-MANAGER-BINARY-RPC",
            gateway,
            natsTypeConversionUtils.packAnyToBuffer(
                hubdata,
                ProtoPackageName + ".GetHubData"
            )
        );
        
        const protoResp = natsTypeConversionUtils.unpackBufferToAny(res?.data);
        const finalObj = protoResp.toObject();
        return finalObj;
    } catch (e) {
        console.log(e);
        return e;
    }
}