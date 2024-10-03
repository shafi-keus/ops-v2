import { APIServerBaseAddr } from "../constants/global";
import axios from 'axios';

interface IreleaseTypeRequest {
    ip: string;
    token: string;
    gatewayId : string;
    miniGatewayId? : string;
}

export default async function (data: IreleaseTypeRequest): Promise<any> {
    try {
        let pingGateway = await axios.post(`${APIServerBaseAddr}/gatewayIpPing`, data, { timeout: 10000 });
        return pingGateway;
    } catch (e) {
        return e.response;
    }
}