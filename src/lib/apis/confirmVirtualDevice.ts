import { APIServerBaseAddr,testingserver } from "../constants/global";
import axios from 'axios';

interface IreleaseTypeRequest {
    gatewayId : string,
    ieeeAddr : string,
    protocol : string,
    token : string
}

export default async function (data: IreleaseTypeRequest): Promise<any> {
    try {
        const confirmDevice = await axios.post(`${testingserver}/confirmVirtualDevice`, data, { timeout: 10000 });
        return confirmDevice;
    } catch (e) {
        return e.response;
    }
}