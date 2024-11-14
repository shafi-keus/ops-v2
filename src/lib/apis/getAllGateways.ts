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