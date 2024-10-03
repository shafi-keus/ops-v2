import { APIServerBaseAddr,testingserver } from "../constants/global";
import axios from 'axios';

interface IreleaseTypeRequest {
    deviceCategory : number,
    deviceType : number,
    gatewayId : string,
    ieeeAddr : string,
    miniGatewayName? : string,
    protocol : string,
    token : string

}

export default async function (data: IreleaseTypeRequest): Promise<any> {
    try {
        const addDevice = await axios.post(`${testingserver}/addVirtualDevice`, data, { timeout: 10000 });
        return addDevice;
    } catch (e) {
        return e.response;
    }
}