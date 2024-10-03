import {APIServerBaseAddr} from "../constants/global";
import axios from 'axios';

interface IgetDynamoDataRequest {
    token: string;
    gatewayId: string;
}

export default async function (data: IgetDynamoDataRequest) : Promise<any> {
    try {
        let dynamoData = await axios.post(`${APIServerBaseAddr}/gatewayDetailedInfo`, data, {timeout: 10000});
        return dynamoData;
    } catch (e) {
        return e.response
    }
}
