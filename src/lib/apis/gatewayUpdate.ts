import { APIServerBaseAddr } from "../constants/global";
import axios from 'axios';

interface Schema {
    gatewayId: String;
    token: String;
    miniGatewayId?: String;
    version: String;
}

export default async function (data: Schema): Promise<any> {
    try {
        let updateRes = await axios.post(`${APIServerBaseAddr}/gatewayUpdate`, data, { timeout: 10000 });
        return updateRes;
    } catch (e) {
        return e.response
    }
}