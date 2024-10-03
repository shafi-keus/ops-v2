import {Client as WebSocket} from "rpc-websockets";

export namespace RpcCalls{
    export namespace ChangeGatewayMode{
        export const name = "CHANGE_GATEWAY_MODE";

        export enum Mode{
            MAIN_GATEWAY,
            MINI_GATEWAY
        }

        export interface Request{
            mode: Mode
        }

        export interface Response{
            success: boolean;
            error?: string;
        }
    }

    export namespace GetGatewayMode{
        export const name = "GET_GATEWAY_MODE";

        export interface ResponseGetGatewayMode {
            success: boolean;
            mode?: number;
            error?: string;
        }
    }
}

export class GatewayCommunicator{
    static ws:WebSocket;

    static async initialize(ip:string,onConnectionOpen?:(e:Event)=>void,onConnectionClose?:(e:CloseEvent)=>void,onError?:(e:Event)=>void){
        this.ws = new WebSocket(`ws://${ip}:9091`,{
            autoconnect: true,
            reconnect: true,
            handshakeTimeout: 10000,
            reconnect_interval: 5000,
            max_reconnects: 0
        });

        this.ws.on("open",async e=>{
            console.log("websocket connection opened for-",ip);

            if(onConnectionOpen) onConnectionOpen(e);
        });

        this.ws.on("close",e=>{
            console.log("closed websocket for-",ip);

            if(onConnectionClose) onConnectionClose(e);
        });

        this.ws.on("error",(e)=>{
            console.log("Error from WebSocket-",ip);

            if(onError) onError(e);
        });

    }

    static async convertGatewayMode(data:RpcCalls.ChangeGatewayMode.Request):Promise<RpcCalls.ChangeGatewayMode.Response>{
        return  <RpcCalls.ChangeGatewayMode.Response>await this.ws.call(RpcCalls.ChangeGatewayMode.name,data);
    }

    static async getGatewayMode():Promise<RpcCalls.GetGatewayMode.ResponseGetGatewayMode>{
        return <RpcCalls.ChangeGatewayMode.Response>await this.ws.call(RpcCalls.GetGatewayMode.name,{});
    }
}
