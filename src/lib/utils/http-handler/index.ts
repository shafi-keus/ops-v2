
import axios from "axios";
import { APIBaseAddress } from "./constants";

type Options = {
    timeout: number
}

export class HttpHandler {

    static async PostCaller(name: string, data?: any, options: Options = { timeout: 10000 }): Promise<any> {
        const response = await axios.post(`${APIBaseAddress}/${name}`, data, { timeout: options.timeout });
        return response;
    }

    static async GetCaller(name: string, options: Options = { timeout: 10000 }): Promise<any> {
        const response = await axios.get(`${APIBaseAddress}/${name}`, { timeout: options.timeout });
        return response;
    }

}
