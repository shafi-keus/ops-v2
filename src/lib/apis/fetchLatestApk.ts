import {APIServerBaseAddr, testingserver} from "../constants/global";
import axios from 'axios';

interface Schema {
    token:string;
    branch : string;
}

export default async function (data: Schema) : Promise<any> {
    try {
        const response = await axios.post(`${APIServerBaseAddr}/getApkFile`, data, {timeout: 10000});  //100.81.175.52
        return response;
    } catch (e) {
        return e.response
    }
}