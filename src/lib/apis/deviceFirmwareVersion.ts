import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

interface IreleaseTypeRequest {
    deviceId:String;
    gatewayId:String;
    token: String;
    miniGatewayId?:String;
}

export default async function (data: IreleaseTypeRequest) : Promise<any> {
    try {
        let fwRes = await axios.post(`${APIServerBaseAddr}/deviceFirmwareVersion`, data, {timeout: 10000});
        return fwRes;
    } catch (e) {
        return e.response
    }
}