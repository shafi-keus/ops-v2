

// type CallerRequest<Data = any> = {
// 	serviceName: string;
// 	versionNo: string;
// 	actionName: string;
// 	actionData?: Data;
// 	timeout?: number;
// 	retries?: number;
// };

import { nc } from "$lib/stores";



export const getNodes = async(gatewayId : string) => {
    let resp= null;
    const callerRes = await nc.jsonCallRPC(
        `${gatewayId}-KIOTP`,
        {
            serviceName: 'site_manager',
            versionNo: 'v1',
            actionName: 'GetNodes',
            actionData:  {},
            timeout:  30000,
            retries: 1
        }
    );

    console.log("get nodes data : ",callerRes);

    if (
        callerRes.success &&
        callerRes.data &&
        callerRes.data.success &&
        callerRes.data.actionResponseData?.nodesInfo
    ) {
        resp = callerRes.data.actionResponseData.nodesInfo;
    }

    return resp;
    
}


// export const pairDevice = async (pairDevice: pairStructure.com.keus.hub.EnterPairMode,gateway:string) => {
//     try {
        
//         let res = await nc.jsonCallRPC(
//             "Keus-6f3e9155-512e-4ff4-890c-a557e254773a-kiotp",
//             // natsTypeConversionUtils.packAnyToBuffer(
//             //     pairDevice,
//             //     ProtoPackageName + ".EnterPairMode"
//             // )
//         );
//         let resData = res?.data?.toString() || "NA";
//         let protoResp = natsTypeConversionUtils.unpackBufferToAny(Buffer.from(resData));
//         let finalObj = protoResp.toObject();
//         return finalObj;

//     } catch (e) {

//         return e;

//     }
// }