/// <reference path="../generated/broker_pb.d.ts" />

import { ResponseData } from '../generated/broker_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';

export class RPCUtils {
  static cleanResponseData(resp: ResponseData): Any {
    const data = resp.getData();
    return data ? data : new Any();
  }

  static getRPCResponseMessage(
    requestId: string,
    serviceName: string,
    clientId: string,
    data: Any
  ): ResponseData {
    const respData = new ResponseData();
    respData.setRequestId(requestId);
    respData.setServiceName(serviceName);
    respData.setClientId(clientId);
    respData.setData(data);
    return respData;
  }
}
