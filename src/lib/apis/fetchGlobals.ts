import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

interface Schema {
    branch? : string;
    token:string;
}

export default async function (data: Schema) : Promise<any> {
    try {
        const response = await axios.post(`${APIServerBaseAddr}/getFwDeviceMap`, data, {timeout: 10000});
        return response;
    } catch (e) {
        console.error(`failed to fetch the devices json file ${e}`)
    }
}