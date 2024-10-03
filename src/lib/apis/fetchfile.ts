import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

export default async function (data) : Promise<any> {
    try {
        let downloadRes = await axios.get(data);
        console.log("resp type : ",typeof downloadRes)
        return downloadRes;
    } catch (e) {
        return e.response
    }
}