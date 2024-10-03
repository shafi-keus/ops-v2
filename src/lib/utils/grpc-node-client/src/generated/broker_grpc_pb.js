// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var broker_pb = require('./broker_pb.js');
var google_protobuf_any_pb = require('google-protobuf/google/protobuf/any_pb.js');

function serialize_com_keus_broker_ChannelRequest(arg) {
  if (!(arg instanceof broker_pb.ChannelRequest)) {
    throw new Error('Expected argument of type com.keus.broker.ChannelRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_ChannelRequest(buffer_arg) {
  return broker_pb.ChannelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_ChannelResponse(arg) {
  if (!(arg instanceof broker_pb.ChannelResponse)) {
    throw new Error('Expected argument of type com.keus.broker.ChannelResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_ChannelResponse(buffer_arg) {
  return broker_pb.ChannelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_DefaultServiceResponse(arg) {
  if (!(arg instanceof broker_pb.DefaultServiceResponse)) {
    throw new Error('Expected argument of type com.keus.broker.DefaultServiceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_DefaultServiceResponse(buffer_arg) {
  return broker_pb.DefaultServiceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_PingAck(arg) {
  if (!(arg instanceof broker_pb.PingAck)) {
    throw new Error('Expected argument of type com.keus.broker.PingAck');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_PingAck(buffer_arg) {
  return broker_pb.PingAck.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_PingData(arg) {
  if (!(arg instanceof broker_pb.PingData)) {
    throw new Error('Expected argument of type com.keus.broker.PingData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_PingData(buffer_arg) {
  return broker_pb.PingData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_PublishAck(arg) {
  if (!(arg instanceof broker_pb.PublishAck)) {
    throw new Error('Expected argument of type com.keus.broker.PublishAck');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_PublishAck(buffer_arg) {
  return broker_pb.PublishAck.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_PublishData(arg) {
  if (!(arg instanceof broker_pb.PublishData)) {
    throw new Error('Expected argument of type com.keus.broker.PublishData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_PublishData(buffer_arg) {
  return broker_pb.PublishData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_RemoveDefaultServiceRequest(arg) {
  if (!(arg instanceof broker_pb.RemoveDefaultServiceRequest)) {
    throw new Error('Expected argument of type com.keus.broker.RemoveDefaultServiceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_RemoveDefaultServiceRequest(buffer_arg) {
  return broker_pb.RemoveDefaultServiceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_RequestData(arg) {
  if (!(arg instanceof broker_pb.RequestData)) {
    throw new Error('Expected argument of type com.keus.broker.RequestData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_RequestData(buffer_arg) {
  return broker_pb.RequestData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_ResponseAck(arg) {
  if (!(arg instanceof broker_pb.ResponseAck)) {
    throw new Error('Expected argument of type com.keus.broker.ResponseAck');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_ResponseAck(buffer_arg) {
  return broker_pb.ResponseAck.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_ResponseData(arg) {
  if (!(arg instanceof broker_pb.ResponseData)) {
    throw new Error('Expected argument of type com.keus.broker.ResponseData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_ResponseData(buffer_arg) {
  return broker_pb.ResponseData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_ServiceAck(arg) {
  if (!(arg instanceof broker_pb.ServiceAck)) {
    throw new Error('Expected argument of type com.keus.broker.ServiceAck');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_ServiceAck(buffer_arg) {
  return broker_pb.ServiceAck.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_ServiceData(arg) {
  if (!(arg instanceof broker_pb.ServiceData)) {
    throw new Error('Expected argument of type com.keus.broker.ServiceData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_ServiceData(buffer_arg) {
  return broker_pb.ServiceData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_SubscribeAck(arg) {
  if (!(arg instanceof broker_pb.SubscribeAck)) {
    throw new Error('Expected argument of type com.keus.broker.SubscribeAck');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_SubscribeAck(buffer_arg) {
  return broker_pb.SubscribeAck.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_com_keus_broker_SubscribeData(arg) {
  if (!(arg instanceof broker_pb.SubscribeData)) {
    throw new Error('Expected argument of type com.keus.broker.SubscribeData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_com_keus_broker_SubscribeData(buffer_arg) {
  return broker_pb.SubscribeData.deserializeBinary(new Uint8Array(buffer_arg));
}


var CommunicationBrokerService = exports.CommunicationBrokerService = {
  openChannel: {
    path: '/com.keus.broker.CommunicationBroker/OpenChannel',
    requestStream: true,
    responseStream: true,
    requestType: broker_pb.ChannelRequest,
    responseType: broker_pb.ChannelResponse,
    requestSerialize: serialize_com_keus_broker_ChannelRequest,
    requestDeserialize: deserialize_com_keus_broker_ChannelRequest,
    responseSerialize: serialize_com_keus_broker_ChannelResponse,
    responseDeserialize: deserialize_com_keus_broker_ChannelResponse,
  },
  registerService: {
    path: '/com.keus.broker.CommunicationBroker/RegisterService',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.ServiceData,
    responseType: broker_pb.ServiceAck,
    requestSerialize: serialize_com_keus_broker_ServiceData,
    requestDeserialize: deserialize_com_keus_broker_ServiceData,
    responseSerialize: serialize_com_keus_broker_ServiceAck,
    responseDeserialize: deserialize_com_keus_broker_ServiceAck,
  },
  unregisterService: {
    path: '/com.keus.broker.CommunicationBroker/UnregisterService',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.ServiceData,
    responseType: broker_pb.ServiceAck,
    requestSerialize: serialize_com_keus_broker_ServiceData,
    requestDeserialize: deserialize_com_keus_broker_ServiceData,
    responseSerialize: serialize_com_keus_broker_ServiceAck,
    responseDeserialize: deserialize_com_keus_broker_ServiceAck,
  },
  unregisterDefaultService: {
    path: '/com.keus.broker.CommunicationBroker/UnregisterDefaultService',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.RemoveDefaultServiceRequest,
    responseType: broker_pb.DefaultServiceResponse,
    requestSerialize: serialize_com_keus_broker_RemoveDefaultServiceRequest,
    requestDeserialize: deserialize_com_keus_broker_RemoveDefaultServiceRequest,
    responseSerialize: serialize_com_keus_broker_DefaultServiceResponse,
    responseDeserialize: deserialize_com_keus_broker_DefaultServiceResponse,
  },
  forwardRequest: {
    path: '/com.keus.broker.CommunicationBroker/ForwardRequest',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.RequestData,
    responseType: broker_pb.ResponseData,
    requestSerialize: serialize_com_keus_broker_RequestData,
    requestDeserialize: deserialize_com_keus_broker_RequestData,
    responseSerialize: serialize_com_keus_broker_ResponseData,
    responseDeserialize: deserialize_com_keus_broker_ResponseData,
  },
  forwardResponse: {
    path: '/com.keus.broker.CommunicationBroker/ForwardResponse',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.ResponseData,
    responseType: broker_pb.ResponseAck,
    requestSerialize: serialize_com_keus_broker_ResponseData,
    requestDeserialize: deserialize_com_keus_broker_ResponseData,
    responseSerialize: serialize_com_keus_broker_ResponseAck,
    responseDeserialize: deserialize_com_keus_broker_ResponseAck,
  },
  subscribe: {
    path: '/com.keus.broker.CommunicationBroker/Subscribe',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.SubscribeData,
    responseType: broker_pb.SubscribeAck,
    requestSerialize: serialize_com_keus_broker_SubscribeData,
    requestDeserialize: deserialize_com_keus_broker_SubscribeData,
    responseSerialize: serialize_com_keus_broker_SubscribeAck,
    responseDeserialize: deserialize_com_keus_broker_SubscribeAck,
  },
  unSubscribe: {
    path: '/com.keus.broker.CommunicationBroker/UnSubscribe',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.SubscribeData,
    responseType: broker_pb.SubscribeAck,
    requestSerialize: serialize_com_keus_broker_SubscribeData,
    requestDeserialize: deserialize_com_keus_broker_SubscribeData,
    responseSerialize: serialize_com_keus_broker_SubscribeAck,
    responseDeserialize: deserialize_com_keus_broker_SubscribeAck,
  },
  publish: {
    path: '/com.keus.broker.CommunicationBroker/Publish',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.PublishData,
    responseType: broker_pb.PublishAck,
    requestSerialize: serialize_com_keus_broker_PublishData,
    requestDeserialize: deserialize_com_keus_broker_PublishData,
    responseSerialize: serialize_com_keus_broker_PublishAck,
    responseDeserialize: deserialize_com_keus_broker_PublishAck,
  },
  ping: {
    path: '/com.keus.broker.CommunicationBroker/Ping',
    requestStream: false,
    responseStream: false,
    requestType: broker_pb.PingData,
    responseType: broker_pb.PingAck,
    requestSerialize: serialize_com_keus_broker_PingData,
    requestDeserialize: deserialize_com_keus_broker_PingData,
    responseSerialize: serialize_com_keus_broker_PingAck,
    responseDeserialize: deserialize_com_keus_broker_PingAck,
  },
};

exports.CommunicationBrokerClient = grpc.makeGenericClientConstructor(CommunicationBrokerService);
