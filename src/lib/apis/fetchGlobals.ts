import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

interface Schema {
    branch? : string;
    token:String;
}

export default async function (data: Schema) : Promise<any> {
    try {
        let response = await axios.post(`${APIServerBaseAddr}/getFwDeviceMap`, data, {timeout: 10000});  //100.81.175.52
        console.log(response);
        return response;
    } catch (e) {
        return e.response
    }
}