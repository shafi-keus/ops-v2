// package: com.keus.broker
// file: broker.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

export class PingData extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingData.AsObject;
    static toObject(includeInstance: boolean, msg: PingData): PingData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingData;
    static deserializeBinaryFromReader(message: PingData, reader: jspb.BinaryReader): PingData;
}

export namespace PingData {
    export type AsObject = {
    }
}

export class PingAck extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PingAck.AsObject;
    static toObject(includeInstance: boolean, msg: PingAck): PingAck.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PingAck, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PingAck;
    static deserializeBinaryFromReader(message: PingAck, reader: jspb.BinaryReader): PingAck;
}

export namespace PingAck {
    export type AsObject = {
    }
}

export class ChannelRequest extends jspb.Message { 

    hasBeat(): boolean;
    clearBeat(): void;
    getBeat(): HeartBeat | undefined;
    setBeat(value?: HeartBeat): void;


    hasValidationRequest(): boolean;
    clearValidationRequest(): void;
    getValidationRequest(): ValidationRequest | undefined;
    setValidationRequest(value?: ValidationRequest): void;


    hasDefaultServiceRequest(): boolean;
    clearDefaultServiceRequest(): void;
    getDefaultServiceRequest(): DefaultServiceRequest | undefined;
    setDefaultServiceRequest(value?: DefaultServiceRequest): void;


    getDataCase(): ChannelRequest.DataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChannelRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ChannelRequest): ChannelRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChannelRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChannelRequest;
    static deserializeBinaryFromReader(message: ChannelRequest, reader: jspb.BinaryReader): ChannelRequest;
}

export namespace ChannelRequest {
    export type AsObject = {
        beat?: HeartBeat.AsObject,
        validationRequest?: ValidationRequest.AsObject,
        defaultServiceRequest?: DefaultServiceRequest.AsObject,
    }

    export enum DataCase {
        DATA_NOT_SET = 0,
    
    BEAT = 1,

    VALIDATION_REQUEST = 2,

    DEFAULT_SERVICE_REQUEST = 3,

    }

}

export class ValidationRequest extends jspb.Message { 
    getJsonBody(): string;
    setJsonBody(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ValidationRequest): ValidationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidationRequest;
    static deserializeBinaryFromReader(message: ValidationRequest, reader: jspb.BinaryReader): ValidationRequest;
}

export namespace ValidationRequest {
    export type AsObject = {
        jsonBody: string,
    }
}

export class ValidationResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getErrorCode(): number;
    setErrorCode(value: number): void;

    getErrorReason(): string;
    setErrorReason(value: string): void;


    hasClientData(): boolean;
    clearClientData(): void;
    getClientData(): ClientData | undefined;
    setClientData(value?: ClientData): void;

    clearAccessServicesList(): void;
    getAccessServicesList(): Array<string>;
    setAccessServicesList(value: Array<string>): void;
    addAccessServices(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ValidationResponse): ValidationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidationResponse;
    static deserializeBinaryFromReader(message: ValidationResponse, reader: jspb.BinaryReader): ValidationResponse;
}

export namespace ValidationResponse {
    export type AsObject = {
        success: boolean,
        errorCode: number,
        errorReason: string,
        clientData?: ClientData.AsObject,
        accessServicesList: Array<string>,
    }
}

export class DefaultServiceRequest extends jspb.Message { 
    getServicePassword(): string;
    setServicePassword(value: string): void;

    getDefaultServiceName(): string;
    setDefaultServiceName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DefaultServiceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DefaultServiceRequest): DefaultServiceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DefaultServiceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DefaultServiceRequest;
    static deserializeBinaryFromReader(message: DefaultServiceRequest, reader: jspb.BinaryReader): DefaultServiceRequest;
}

export namespace DefaultServiceRequest {
    export type AsObject = {
        servicePassword: string,
        defaultServiceName: string,
    }
}

export class DefaultServiceResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getErrorCode(): number;
    setErrorCode(value: number): void;

    getErrorReason(): string;
    setErrorReason(value: string): void;


    hasClientData(): boolean;
    clearClientData(): void;
    getClientData(): ClientData | undefined;
    setClientData(value?: ClientData): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DefaultServiceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DefaultServiceResponse): DefaultServiceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DefaultServiceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DefaultServiceResponse;
    static deserializeBinaryFromReader(message: DefaultServiceResponse, reader: jspb.BinaryReader): DefaultServiceResponse;
}

export namespace DefaultServiceResponse {
    export type AsObject = {
        success: boolean,
        errorCode: number,
        errorReason: string,
        clientData?: ClientData.AsObject,
    }
}

export class RemoveDefaultServiceRequest extends jspb.Message { 
    getDefaultServiceName(): string;
    setDefaultServiceName(value: string): void;

    getServicePassword(): string;
    setServicePassword(value: string): void;


    hasClientData(): boolean;
    clearClientData(): void;
    getClientData(): ClientData | undefined;
    setClientData(value?: ClientData): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveDefaultServiceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveDefaultServiceRequest): RemoveDefaultServiceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveDefaultServiceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveDefaultServiceRequest;
    static deserializeBinaryFromReader(message: RemoveDefaultServiceRequest, reader: jspb.BinaryReader): RemoveDefaultServiceRequest;
}

export namespace RemoveDefaultServiceRequest {
    export type AsObject = {
        defaultServiceName: string,
        servicePassword: string,
        clientData?: ClientData.AsObject,
    }
}

export class ChannelResponse extends jspb.Message { 

    hasBeat(): boolean;
    clearBeat(): void;
    getBeat(): HeartBeat | undefined;
    setBeat(value?: HeartBeat): void;


    hasServiceMessage(): boolean;
    clearServiceMessage(): void;
    getServiceMessage(): ServiceMessage | undefined;
    setServiceMessage(value?: ServiceMessage): void;


    hasEventMessage(): boolean;
    clearEventMessage(): void;
    getEventMessage(): EventMessage | undefined;
    setEventMessage(value?: EventMessage): void;


    hasValidationResponse(): boolean;
    clearValidationResponse(): void;
    getValidationResponse(): ValidationResponse | undefined;
    setValidationResponse(value?: ValidationResponse): void;


    hasDefaultServiceResponse(): boolean;
    clearDefaultServiceResponse(): void;
    getDefaultServiceResponse(): DefaultServiceResponse | undefined;
    setDefaultServiceResponse(value?: DefaultServiceResponse): void;


    getDataCase(): ChannelResponse.DataCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChannelResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ChannelResponse): ChannelResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChannelResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChannelResponse;
    static deserializeBinaryFromReader(message: ChannelResponse, reader: jspb.BinaryReader): ChannelResponse;
}

export namespace ChannelResponse {
    export type AsObject = {
        beat?: HeartBeat.AsObject,
        serviceMessage?: ServiceMessage.AsObject,
        eventMessage?: EventMessage.AsObject,
        validationResponse?: ValidationResponse.AsObject,
        defaultServiceResponse?: DefaultServiceResponse.AsObject,
    }

    export enum DataCase {
        DATA_NOT_SET = 0,
    
    BEAT = 2,

    SERVICE_MESSAGE = 3,

    EVENT_MESSAGE = 4,

    VALIDATION_RESPONSE = 5,

    DEFAULT_SERVICE_RESPONSE = 6,

    }

}

export class HeartBeat extends jspb.Message { 
    getBeat(): boolean;
    setBeat(value: boolean): void;

    getInterval(): number;
    setInterval(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HeartBeat.AsObject;
    static toObject(includeInstance: boolean, msg: HeartBeat): HeartBeat.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HeartBeat, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HeartBeat;
    static deserializeBinaryFromReader(message: HeartBeat, reader: jspb.BinaryReader): HeartBeat;
}

export namespace HeartBeat {
    export type AsObject = {
        beat: boolean,
        interval: number,
    }
}

export class ServiceMessage extends jspb.Message { 
    getRequestId(): string;
    setRequestId(value: string): void;

    getServiceName(): string;
    setServiceName(value: string): void;

    getCallerMetadata(): string;
    setCallerMetadata(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): google_protobuf_any_pb.Any | undefined;
    setData(value?: google_protobuf_any_pb.Any): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServiceMessage.AsObject;
    static toObject(includeInstance: boolean, msg: ServiceMessage): ServiceMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServiceMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServiceMessage;
    static deserializeBinaryFromReader(message: ServiceMessage, reader: jspb.BinaryReader): ServiceMessage;
}

export namespace ServiceMessage {
    export type AsObject = {
        requestId: string,
        serviceName: string,
        callerMetadata: string,
        data?: google_protobuf_any_pb.Any.AsObject,
    }
}

export class EventMessage extends jspb.Message { 
    getEventName(): string;
    setEventName(value: string): void;


    hasEventData(): boolean;
    clearEventData(): void;
    getEventData(): google_protobuf_any_pb.Any | undefined;
    setEventData(value?: google_protobuf_any_pb.Any): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventMessage.AsObject;
    static toObject(includeInstance: boolean, msg: EventMessage): EventMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventMessage;
    static deserializeBinaryFromReader(message: EventMessage, reader: jspb.BinaryReader): EventMessage;
}

export namespace EventMessage {
    export type AsObject = {
        eventName: string,
        eventData?: google_protobuf_any_pb.Any.AsObject,
    }
}

export class ClientData extends jspb.Message { 
    getClientId(): string;
    setClientId(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientData.AsObject;
    static toObject(includeInstance: boolean, msg: ClientData): ClientData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClientData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientData;
    static deserializeBinaryFromReader(message: ClientData, reader: jspb.BinaryReader): ClientData;
}

export namespace ClientData {
    export type AsObject = {
        clientId: string,
    }
}

export class ServiceData extends jspb.Message { 
    getClientId(): string;
    setClientId(value: string): void;

    getServiceName(): string;
    setServiceName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServiceData.AsObject;
    static toObject(includeInstance: boolean, msg: ServiceData): ServiceData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServiceData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServiceData;
    static deserializeBinaryFromReader(message: ServiceData, reader: jspb.BinaryReader): ServiceData;
}

export namespace ServiceData {
    export type AsObject = {
        clientId: string,
        serviceName: string,
    }
}

export class ServiceAck extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getError(): string;
    setError(value: string): void;

    getCode(): number;
    setCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServiceAck.AsObject;
    static toObject(includeInstance: boolean, msg: ServiceAck): ServiceAck.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServiceAck, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServiceAck;
    static deserializeBinaryFromReader(message: ServiceAck, reader: jspb.BinaryReader): ServiceAck;
}

export namespace ServiceAck {
    export type AsObject = {
        success: boolean,
        error: string,
        code: number,
    }
}

export class RequestData extends jspb.Message { 
    getClientId(): string;
    setClientId(value: string): void;

    getServiceName(): string;
    setServiceName(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): google_protobuf_any_pb.Any | undefined;
    setData(value?: google_protobuf_any_pb.Any): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RequestData.AsObject;
    static toObject(includeInstance: boolean, msg: RequestData): RequestData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RequestData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RequestData;
    static deserializeBinaryFromReader(message: RequestData, reader: jspb.BinaryReader): RequestData;
}

export namespace RequestData {
    export type AsObject = {
        clientId: string,
        serviceName: string,
        data?: google_protobuf_any_pb.Any.AsObject,
    }
}

export class ResponseData extends jspb.Message { 
    getClientId(): string;
    setClientId(value: string): void;

    getRequestId(): string;
    setRequestId(value: string): void;

    getServiceName(): string;
    setServiceName(value: string): void;


    hasData(): boolean;
    clearData(): void;
    getData(): google_protobuf_any_pb.Any | undefined;
    setData(value?: google_protobuf_any_pb.Any): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResponseData.AsObject;
    static toObject(includeInstance: boolean, msg: ResponseData): ResponseData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResponseData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResponseData;
    static deserializeBinaryFromReader(message: ResponseData, reader: jspb.BinaryReader): ResponseData;
}

export namespace ResponseData {
    export type AsObject = {
        clientId: string,
        requestId: string,
        serviceName: string,
        data?: google_protobuf_any_pb.Any.AsObject,
    }
}

export class ResponseAck extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getError(): string;
    setError(value: string): void;

    getCode(): number;
    setCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResponseAck.AsObject;
    static toObject(includeInstance: boolean, msg: ResponseAck): ResponseAck.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResponseAck, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResponseAck;
    static deserializeBinaryFromReader(message: ResponseAck, reader: jspb.BinaryReader): ResponseAck;
}

export namespace ResponseAck {
    export type AsObject = {
        success: boolean,
        error: string,
        code: number,
    }
}

export class ServerError extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getError(): string;
    setError(value: string): void;

    getCode(): number;
    setCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ServerError.AsObject;
    static toObject(includeInstance: boolean, msg: ServerError): ServerError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ServerError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ServerError;
    static deserializeBinaryFromReader(message: ServerError, reader: jspb.BinaryReader): ServerError;
}

export namespace ServerError {
    export type AsObject = {
        success: boolean,
        error: string,
        code: number,
    }
}

export class SubscribeData extends jspb.Message { 
    getClientId(): string;
    setClientId(value: string): void;

    getEventName(): string;
    setEventName(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeData.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeData): SubscribeData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeData;
    static deserializeBinaryFromReader(message: SubscribeData, reader: jspb.BinaryReader): SubscribeData;
}

export namespace SubscribeData {
    export type AsObject = {
        clientId: string,
        eventName: string,
    }
}

export class SubscribeAck extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getError(): string;
    setError(value: string): void;

    getCode(): number;
    setCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeAck.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeAck): SubscribeAck.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeAck, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeAck;
    static deserializeBinaryFromReader(message: SubscribeAck, reader: jspb.BinaryReader): SubscribeAck;
}

export namespace SubscribeAck {
    export type AsObject = {
        success: boolean,
        error: string,
        code: number,
    }
}

export class PublishData extends jspb.Message { 
    getClientId(): string;
    setClientId(value: string): void;

    getEventName(): string;
    setEventName(value: string): void;

    getRole(): number;
    setRole(value: number): void;


    hasData(): boolean;
    clearData(): void;
    getData(): google_protobuf_any_pb.Any | undefined;
    setData(value?: google_protobuf_any_pb.Any): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PublishData.AsObject;
    static toObject(includeInstance: boolean, msg: PublishData): PublishData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PublishData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PublishData;
    static deserializeBinaryFromReader(message: PublishData, reader: jspb.BinaryReader): PublishData;
}

export namespace PublishData {
    export type AsObject = {
        clientId: string,
        eventName: string,
        role: number,
        data?: google_protobuf_any_pb.Any.AsObject,
    }
}

export class PublishAck extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): void;

    getError(): string;
    setError(value: string): void;

    getCode(): number;
    setCode(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PublishAck.AsObject;
    static toObject(includeInstance: boolean, msg: PublishAck): PublishAck.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PublishAck, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PublishAck;
    static deserializeBinaryFromReader(message: PublishAck, reader: jspb.BinaryReader): PublishAck;
}

export namespace PublishAck {
    export type AsObject = {
        success: boolean,
        error: string,
        code: number,
    }
}

export enum CONNECTION_STATE {
    CONNECTION_UNKNOWN = 0,
    CONNECTION_ERROR = 1,
    CONNECTION_ACCEPT = 2,
    CONNECTION_CHALLENGING = 3,
    CONNECTION_REJECT = 4,
    CONNECTION_RETRYING = 5,
    CONNECTION_CLOSING = 6,
    CONNECTION_CLOSED = 7,
}

export enum CONNECTION_STATUS {
    NOT_CONNECTED = 0,
    NOT_AUTHENTICATED = 1,
    AUTHENTICATED = 2,
    CONNECTING = 3,
}
