import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

interface Schema {
    deviceCategory:string;
    deviceType:string;
    token:string;
    branch?:string;
}

export default async function (data: Schema) : Promise<any> {
    try {
        let otaVersionRes = await axios.post(`${APIServerBaseAddr}/getOtaVersionListV2`, data, {timeout: 5000});
        return otaVersionRes;
    } catch (e) {
        return e.response
    }
}