import { APIServerBaseAddr } from "../constants/global"
import axios from 'axios';

interface IgetGatewayInfoRequest {
    gatewayId: string;
    token: string;
}

export default async function (data: IgetGatewayInfoRequest): Promise<any> {
    try {
        let gatewayInfo = await axios.post(`${APIServerBaseAddr}/getGatewayData`, data, { timeout: 10000 });
        return gatewayInfo.data;
    } catch (e) {
        return e.response
    }
}