import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

interface Schema {
    deviceCategory:String;
    deviceType:String;
    token:String;
    version:String;
    branch?:string;
}

export default async function (data) : Promise<any> {
    try {
        let downloadRes = await axios.post(`${APIServerBaseAddr}/getOtaBinFile`, data);
        console.log("file",JSON.stringify(downloadRes));
        return downloadRes;
    } catch (e) {
        return e.response;
    }
}
