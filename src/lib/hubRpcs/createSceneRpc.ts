import { ProtoPackageName } from "$lib/constants/gateway/system-contants";
import { Buffer } from "../constants/index"
import { Gateway, nc } from "$lib/stores";
import { natsTypeConversionUtils } from "$lib/utils/bufferUtil";
import { get } from "svelte/store";
import type * as sceneStructureType from "../generated/hub/scenes/scene_structures";


export const createSceneRpc = async (createScene: sceneStructureType.com.keus.hub.CreateScene) => {
    try {

        let res = await nc.binaryCallRPC(
            get(Gateway),
            natsTypeConversionUtils.packAnyToBuffer(
                createScene,
                ProtoPackageName + ".CreateScene"
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