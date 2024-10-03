import {APIServerBaseAddr} from "../constants/global";
import {CapacitorHttp, type HttpResponse} from "@capacitor/core";
interface type {
        token: string;
    }
export default async function(data:type):Promise<any>{
    const options = {
      url: `${APIServerBaseAddr}/gatewayFetchAll`,
      headers:{
        "content-type": "application/json"
      },
      data: data,
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    if(response){
        return {
            success : true,
            data : response.data.data,
        }
    }
    else {
        return {
            success : false,
        }
    }
};

// import {APIServerBaseAddr} from "../constants/global";
// import axios from 'axios';

// interface IgetAllGatewaysRequest {
//     token: string;
//     search?: string
// }

// export default async function (data) : Promise<any> {
//     try {
//         console.log(`get detailed info`,JSON.stringify(`${APIServerBaseAddr}/gatewayFetchAll`));
//         let dynamoData = await axios.post(`${APIServerBaseAddr}/gatewayFetchAll`, data, {timeout: 10000});
//         console.log("RESP))))),",JSON.stringify(dynamoData))
//         return dynamoData;
//     } catch (e) {
//         return e.response
//     }
// }
