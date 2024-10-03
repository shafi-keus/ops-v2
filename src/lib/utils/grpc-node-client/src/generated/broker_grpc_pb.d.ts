// package: com.keus.broker
// file: broker.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as broker_pb from "./broker_pb";
import * as google_protobuf_any_pb from "google-protobuf/google/protobuf/any_pb";

interface ICommunicationBrokerService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    openChannel: ICommunicationBrokerService_IOpenChannel;
    registerService: ICommunicationBrokerService_IRegisterService;
    unregisterService: ICommunicationBrokerService_IUnregisterService;
    unregisterDefaultService: ICommunicationBrokerService_IUnregisterDefaultService;
    forwardRequest: ICommunicationBrokerService_IForwardRequest;
    forwardResponse: ICommunicationBrokerService_IForwardResponse;
    subscribe: ICommunicationBrokerService_ISubscribe;
    unSubscribe: ICommunicationBrokerService_IUnSubscribe;
    publish: ICommunicationBrokerService_IPublish;
    ping: ICommunicationBrokerService_IPing;
}

interface ICommunicationBrokerService_IOpenChannel extends grpc.MethodDefinition<broker_pb.ChannelRequest, broker_pb.ChannelResponse> {
    path: string; // "/com.keus.broker.CommunicationBroker/OpenChannel"
    requestStream: boolean; // true
    responseStream: boolean; // true
    requestSerialize: grpc.serialize<broker_pb.ChannelRequest>;
    requestDeserialize: grpc.deserialize<broker_pb.ChannelRequest>;
    responseSerialize: grpc.serialize<broker_pb.ChannelResponse>;
    responseDeserialize: grpc.deserialize<broker_pb.ChannelResponse>;
}
interface ICommunicationBrokerService_IRegisterService extends grpc.MethodDefinition<broker_pb.ServiceData, broker_pb.ServiceAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/RegisterService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.ServiceData>;
    requestDeserialize: grpc.deserialize<broker_pb.ServiceData>;
    responseSerialize: grpc.serialize<broker_pb.ServiceAck>;
    responseDeserialize: grpc.deserialize<broker_pb.ServiceAck>;
}
interface ICommunicationBrokerService_IUnregisterService extends grpc.MethodDefinition<broker_pb.ServiceData, broker_pb.ServiceAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/UnregisterService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.ServiceData>;
    requestDeserialize: grpc.deserialize<broker_pb.ServiceData>;
    responseSerialize: grpc.serialize<broker_pb.ServiceAck>;
    responseDeserialize: grpc.deserialize<broker_pb.ServiceAck>;
}
interface ICommunicationBrokerService_IUnregisterDefaultService extends grpc.MethodDefinition<broker_pb.RemoveDefaultServiceRequest, broker_pb.DefaultServiceResponse> {
    path: string; // "/com.keus.broker.CommunicationBroker/UnregisterDefaultService"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.RemoveDefaultServiceRequest>;
    requestDeserialize: grpc.deserialize<broker_pb.RemoveDefaultServiceRequest>;
    responseSerialize: grpc.serialize<broker_pb.DefaultServiceResponse>;
    responseDeserialize: grpc.deserialize<broker_pb.DefaultServiceResponse>;
}
interface ICommunicationBrokerService_IForwardRequest extends grpc.MethodDefinition<broker_pb.RequestData, broker_pb.ResponseData> {
    path: string; // "/com.keus.broker.CommunicationBroker/ForwardRequest"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.RequestData>;
    requestDeserialize: grpc.deserialize<broker_pb.RequestData>;
    responseSerialize: grpc.serialize<broker_pb.ResponseData>;
    responseDeserialize: grpc.deserialize<broker_pb.ResponseData>;
}
interface ICommunicationBrokerService_IForwardResponse extends grpc.MethodDefinition<broker_pb.ResponseData, broker_pb.ResponseAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/ForwardResponse"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.ResponseData>;
    requestDeserialize: grpc.deserialize<broker_pb.ResponseData>;
    responseSerialize: grpc.serialize<broker_pb.ResponseAck>;
    responseDeserialize: grpc.deserialize<broker_pb.ResponseAck>;
}
interface ICommunicationBrokerService_ISubscribe extends grpc.MethodDefinition<broker_pb.SubscribeData, broker_pb.SubscribeAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/Subscribe"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.SubscribeData>;
    requestDeserialize: grpc.deserialize<broker_pb.SubscribeData>;
    responseSerialize: grpc.serialize<broker_pb.SubscribeAck>;
    responseDeserialize: grpc.deserialize<broker_pb.SubscribeAck>;
}
interface ICommunicationBrokerService_IUnSubscribe extends grpc.MethodDefinition<broker_pb.SubscribeData, broker_pb.SubscribeAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/UnSubscribe"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.SubscribeData>;
    requestDeserialize: grpc.deserialize<broker_pb.SubscribeData>;
    responseSerialize: grpc.serialize<broker_pb.SubscribeAck>;
    responseDeserialize: grpc.deserialize<broker_pb.SubscribeAck>;
}
interface ICommunicationBrokerService_IPublish extends grpc.MethodDefinition<broker_pb.PublishData, broker_pb.PublishAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/Publish"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.PublishData>;
    requestDeserialize: grpc.deserialize<broker_pb.PublishData>;
    responseSerialize: grpc.serialize<broker_pb.PublishAck>;
    responseDeserialize: grpc.deserialize<broker_pb.PublishAck>;
}
interface ICommunicationBrokerService_IPing extends grpc.MethodDefinition<broker_pb.PingData, broker_pb.PingAck> {
    path: string; // "/com.keus.broker.CommunicationBroker/Ping"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<broker_pb.PingData>;
    requestDeserialize: grpc.deserialize<broker_pb.PingData>;
    responseSerialize: grpc.serialize<broker_pb.PingAck>;
    responseDeserialize: grpc.deserialize<broker_pb.PingAck>;
}

export const CommunicationBrokerService: ICommunicationBrokerService;

export interface ICommunicationBrokerServer {
    openChannel: grpc.handleBidiStreamingCall<broker_pb.ChannelRequest, broker_pb.ChannelResponse>;
    registerService: grpc.handleUnaryCall<broker_pb.ServiceData, broker_pb.ServiceAck>;
    unregisterService: grpc.handleUnaryCall<broker_pb.ServiceData, broker_pb.ServiceAck>;
    unregisterDefaultService: grpc.handleUnaryCall<broker_pb.RemoveDefaultServiceRequest, broker_pb.DefaultServiceResponse>;
    forwardRequest: grpc.handleUnaryCall<broker_pb.RequestData, broker_pb.ResponseData>;
    forwardResponse: grpc.handleUnaryCall<broker_pb.ResponseData, broker_pb.ResponseAck>;
    subscribe: grpc.handleUnaryCall<broker_pb.SubscribeData, broker_pb.SubscribeAck>;
    unSubscribe: grpc.handleUnaryCall<broker_pb.SubscribeData, broker_pb.SubscribeAck>;
    publish: grpc.handleUnaryCall<broker_pb.PublishData, broker_pb.PublishAck>;
    ping: grpc.handleUnaryCall<broker_pb.PingData, broker_pb.PingAck>;
}

export interface ICommunicationBrokerClient {
    openChannel(): grpc.ClientDuplexStream<broker_pb.ChannelRequest, broker_pb.ChannelResponse>;
    openChannel(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ChannelRequest, broker_pb.ChannelResponse>;
    openChannel(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ChannelRequest, broker_pb.ChannelResponse>;
    registerService(request: broker_pb.ServiceData, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    registerService(request: broker_pb.ServiceData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    registerService(request: broker_pb.ServiceData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    unregisterService(request: broker_pb.ServiceData, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    unregisterService(request: broker_pb.ServiceData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    unregisterService(request: broker_pb.ServiceData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    unregisterDefaultService(request: broker_pb.RemoveDefaultServiceRequest, callback: (error: grpc.ServiceError | null, response: broker_pb.DefaultServiceResponse) => void): grpc.ClientUnaryCall;
    unregisterDefaultService(request: broker_pb.RemoveDefaultServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.DefaultServiceResponse) => void): grpc.ClientUnaryCall;
    unregisterDefaultService(request: broker_pb.RemoveDefaultServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.DefaultServiceResponse) => void): grpc.ClientUnaryCall;
    forwardRequest(request: broker_pb.RequestData, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseData) => void): grpc.ClientUnaryCall;
    forwardRequest(request: broker_pb.RequestData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseData) => void): grpc.ClientUnaryCall;
    forwardRequest(request: broker_pb.RequestData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseData) => void): grpc.ClientUnaryCall;
    forwardResponse(request: broker_pb.ResponseData, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseAck) => void): grpc.ClientUnaryCall;
    forwardResponse(request: broker_pb.ResponseData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseAck) => void): grpc.ClientUnaryCall;
    forwardResponse(request: broker_pb.ResponseData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseAck) => void): grpc.ClientUnaryCall;
    subscribe(request: broker_pb.SubscribeData, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    subscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    subscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    unSubscribe(request: broker_pb.SubscribeData, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    unSubscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    unSubscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    publish(request: broker_pb.PublishData, callback: (error: grpc.ServiceError | null, response: broker_pb.PublishAck) => void): grpc.ClientUnaryCall;
    publish(request: broker_pb.PublishData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.PublishAck) => void): grpc.ClientUnaryCall;
    publish(request: broker_pb.PublishData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.PublishAck) => void): grpc.ClientUnaryCall;
    ping(request: broker_pb.PingData, callback: (error: grpc.ServiceError | null, response: broker_pb.PingAck) => void): grpc.ClientUnaryCall;
    ping(request: broker_pb.PingData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.PingAck) => void): grpc.ClientUnaryCall;
    ping(request: broker_pb.PingData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.PingAck) => void): grpc.ClientUnaryCall;
}

export class CommunicationBrokerClient extends grpc.Client implements ICommunicationBrokerClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public openChannel(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ChannelRequest, broker_pb.ChannelResponse>;
    public openChannel(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<broker_pb.ChannelRequest, broker_pb.ChannelResponse>;
    public registerService(request: broker_pb.ServiceData, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    public registerService(request: broker_pb.ServiceData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    public registerService(request: broker_pb.ServiceData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    public unregisterService(request: broker_pb.ServiceData, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    public unregisterService(request: broker_pb.ServiceData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    public unregisterService(request: broker_pb.ServiceData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ServiceAck) => void): grpc.ClientUnaryCall;
    public unregisterDefaultService(request: broker_pb.RemoveDefaultServiceRequest, callback: (error: grpc.ServiceError | null, response: broker_pb.DefaultServiceResponse) => void): grpc.ClientUnaryCall;
    public unregisterDefaultService(request: broker_pb.RemoveDefaultServiceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.DefaultServiceResponse) => void): grpc.ClientUnaryCall;
    public unregisterDefaultService(request: broker_pb.RemoveDefaultServiceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.DefaultServiceResponse) => void): grpc.ClientUnaryCall;
    public forwardRequest(request: broker_pb.RequestData, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseData) => void): grpc.ClientUnaryCall;
    public forwardRequest(request: broker_pb.RequestData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseData) => void): grpc.ClientUnaryCall;
    public forwardRequest(request: broker_pb.RequestData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseData) => void): grpc.ClientUnaryCall;
    public forwardResponse(request: broker_pb.ResponseData, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseAck) => void): grpc.ClientUnaryCall;
    public forwardResponse(request: broker_pb.ResponseData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseAck) => void): grpc.ClientUnaryCall;
    public forwardResponse(request: broker_pb.ResponseData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.ResponseAck) => void): grpc.ClientUnaryCall;
    public subscribe(request: broker_pb.SubscribeData, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    public subscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    public subscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    public unSubscribe(request: broker_pb.SubscribeData, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    public unSubscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    public unSubscribe(request: broker_pb.SubscribeData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.SubscribeAck) => void): grpc.ClientUnaryCall;
    public publish(request: broker_pb.PublishData, callback: (error: grpc.ServiceError | null, response: broker_pb.PublishAck) => void): grpc.ClientUnaryCall;
    public publish(request: broker_pb.PublishData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.PublishAck) => void): grpc.ClientUnaryCall;
    public publish(request: broker_pb.PublishData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.PublishAck) => void): grpc.ClientUnaryCall;
    public ping(request: broker_pb.PingData, callback: (error: grpc.ServiceError | null, response: broker_pb.PingAck) => void): grpc.ClientUnaryCall;
    public ping(request: broker_pb.PingData, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broker_pb.PingAck) => void): grpc.ClientUnaryCall;
    public ping(request: broker_pb.PingData, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broker_pb.PingAck) => void): grpc.ClientUnaryCall;
}
