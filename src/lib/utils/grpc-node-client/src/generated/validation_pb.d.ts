// package: com.keus.broker
// file: validation.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ClientValidationRequest extends jspb.Message { 
    getDeviceKey(): string;
    setDeviceKey(value: string): void;

    getSecretKey(): string;
    setSecretKey(value: string): void;

    getRemember(): boolean;
    setRemember(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ClientValidationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ClientValidationRequest): ClientValidationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ClientValidationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ClientValidationRequest;
    static deserializeBinaryFromReader(message: ClientValidationRequest, reader: jspb.BinaryReader): ClientValidationRequest;
}

export namespace ClientValidationRequest {
    export type AsObject = {
        deviceKey: string,
        secretKey: string,
        remember: boolean,
    }
}

export class GatewayValidationRequest extends jspb.Message { 
    getGatewayId(): string;
    setGatewayId(value: string): void;

    getGatewayKey(): string;
    setGatewayKey(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GatewayValidationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GatewayValidationRequest): GatewayValidationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GatewayValidationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GatewayValidationRequest;
    static deserializeBinaryFromReader(message: GatewayValidationRequest, reader: jspb.BinaryReader): GatewayValidationRequest;
}

export namespace GatewayValidationRequest {
    export type AsObject = {
        gatewayId: string,
        gatewayKey: string,
    }
}

export class CloudValidationRequest extends jspb.Message { 
    getCloudId(): string;
    setCloudId(value: string): void;

    getCloudKey(): string;
    setCloudKey(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CloudValidationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CloudValidationRequest): CloudValidationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CloudValidationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CloudValidationRequest;
    static deserializeBinaryFromReader(message: CloudValidationRequest, reader: jspb.BinaryReader): CloudValidationRequest;
}

export namespace CloudValidationRequest {
    export type AsObject = {
        cloudId: string,
        cloudKey: string,
    }
}
