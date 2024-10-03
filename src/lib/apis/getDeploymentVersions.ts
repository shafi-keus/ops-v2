import { APIServerBaseAddr } from "../constants/global";
import axios from 'axios';

interface Schema {
    branchName: String;
    token: String;
}

export default async function (data: Schema): Promise<any> {
    try {
        let verRes = await axios.post(`${APIServerBaseAddr}/getDeployVersionList`, data, { timeout: 10000 });
        return verRes;
    } catch (e) {
        return e.response
    }
}