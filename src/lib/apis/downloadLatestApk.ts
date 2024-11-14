import {APIServerBaseAddr, testingserver} from "../constants/global";
import axios from 'axios';

interface Schema {
    token:string;
    branch:string;
    version:string;
}

export default async function (data: Schema) : Promise<any> {
    try {
        const response = await axios.post(`${APIServerBaseAddr}/getApkFileDownload`, data, {timeout: 10000});  //100.81.175.52
        return response;
    } catch (e) {
        return e.response
    }
}