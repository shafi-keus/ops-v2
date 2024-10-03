import * as grpc from 'grpc';
import { Service, ServicesMap } from './data/ServicesMap';
import { Event, EventsMap } from './data/EventsMap';
import { CommunicationBrokerClient } from './generated/broker_grpc_pb';
import {
  ChannelRequest,
  ChannelResponse,
  ServiceData,
  ServiceAck,
  RequestData,
  ResponseData,
  ServiceMessage,
  ResponseAck,
  ValidationRequest,
  ValidationResponse,
  DefaultServiceRequest,
  DefaultServiceResponse,
  HeartBeat,
  PingData,
  RemoveDefaultServiceRequest,
  ClientData,
  SubscribeData,
  SubscribeAck,
  EventMessage,
  PublishData,
  PublishAck,
} from './generated/broker_pb';
import { Any } from 'google-protobuf/google/protobuf/any_pb';
import { ConnectionStatus } from './constants/connection-status';
import * as errors from './errors/errors';
import { RPCUtils } from './utils/RPCUtils';
import { TypeConversionUtils, MessageInfo } from './utils/TypeConversionUtils';
import { EventEmitter } from 'events';

export { MessageInfo };
export { TypeConversionUtils };
export { ResponseData };
export { Any };

const ConnectionEvents = {
  CONNECT: 'CN',
  DISCONNECT: 'DCN',
  END: 'END',
  VALIDATIONRESPONSE: 'VDE',
  DEFAULTSERVICERESPONSE: 'DSE',
  BEATRESPONSE: 'BTE',
};

const EstablishConnectionTypes = {
  DEFAULTSERVICE: 'DFS',
  VALIDATION: 'VLD',
  RECONNECTION: 'RCN',
};

export interface ClientOptions {
  reconnectOnFailure: boolean;
  reconnectionInterval: number;
  pingInterval: number;
}

export default class Client {
  //Connection info
  private host: string;
  private port: number;
  private communicationStub: CommunicationBrokerClient;
  private options: ClientOptions;
  private clientId: string;
  private serverChannel: grpc.ClientDuplexStream<ChannelRequest, ChannelResponse>;
  private connectionLock: boolean;

  //Default Service Info
  private defaultServiceRequest: DefaultServiceRequest;
  private hasDefaultService: boolean;
  private defaultService: Service;

  //Validation Info
  private connectionStatus: ConnectionStatus;
  private validationInfo: ValidationRequest;
  private isAuthenticated: boolean;
  private accessServicesList: Array<string>;

  //Client services & events Info
  private serviceMap: ServicesMap;
  private eventMap: EventsMap;

  //Establish connection info
  private eventEmitter: NodeJS.EventEmitter;
  private establishConnectionTimeout: number = 10000;
  private establishConnectionTimer: NodeJS.Timeout;

  //Heartbeat info
  private heartBeatInterval = 10000;
  private beatResponseTimeout = 8000;
  private heartBeatTimer: NodeJS.Timeout;
  private heartBeatResponseTimer: NodeJS.Timeout;
  private missedHeartbeats: number;
  private maxMissedHeartbeats: number = 5;

  constructor(host: string, port: number, options?: ClientOptions) {
    this.host = host;
    this.port = port;
    this.options = options
      ? options
      : {
          reconnectOnFailure: true,
          reconnectionInterval: 20000,
          pingInterval: 3000,
        };
    this.clientId = null;
    this.isAuthenticated = false;
    this.hasDefaultService = false;
    this.serviceMap = new ServicesMap();
    this.eventMap = new EventsMap();
    this.connectionLock = false;
    this.connectionStatus = ConnectionStatus.NotConnected;
    this.communicationStub = new CommunicationBrokerClient(
      this.host + ':' + this.port,
      grpc.credentials.createInsecure()
    );
    this.eventEmitter = new EventEmitter();
    this.missedHeartbeats = 0;
  }

  async delay(waitTime: number) {
    await new Promise<void>(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, waitTime);
    });
    return;
  }

  //Random reconnection delay time between 1 and 10
  getRandomReconnectionDelay() {
    return Math.floor(Math.random() * 10 + 1) * 1000;
  }

  setHeartBeatTimer() {
    const _this = this;
    this.heartBeatTimer = setInterval(function () {
      if (_this.serverChannel) {
        _this.eventEmitter.removeAllListeners(ConnectionEvents.BEATRESPONSE);
        _this.eventEmitter.once(ConnectionEvents.BEATRESPONSE, function (...args) {
          const beatResp = <any>args[0];
          if (beatResp.hasBeat) {
            _this.missedHeartbeats = 0;
          } else {
            console.log('This is missed heartbeat count: ', _this.missedHeartbeats, beatResp);
            _this.missedHeartbeats++;
            if (_this.missedHeartbeats > _this.maxMissedHeartbeats) {
              try {
                _this.serverChannel.destroy();
              } catch (e) {}
              _this.serverChannel = null;
              _this.runConnection(EstablishConnectionTypes.RECONNECTION, 1);
            }
          }
        });
        const beat = new HeartBeat();
        beat.setBeat(true);
        const channelReq = new ChannelRequest();
        channelReq.setBeat(beat);
        _this.serverChannel.write(channelReq);
        _this.heartBeatResponseTimer = setTimeout(function () {
          _this.timeoutBeat();
        }, _this.beatResponseTimeout);
      }
    }, this.heartBeatInterval);
  }

  clearHeartBeatTimer() {
    console.log('Clear HeartbeatTimer Called');
    const _this = this;
    this.missedHeartbeats = 0;
    if (this.heartBeatTimer) {
      console.log('Clearing HeartbeatTimer');
      clearInterval(this.heartBeatTimer);
      this.heartBeatTimer = null;
    }
    if (this.heartBeatResponseTimer) {
      console.log('Clearing HeartbeatResponseTimer');
      clearTimeout(this.heartBeatResponseTimer);
      this.heartBeatResponseTimer = null;
    }
  }

  cleanConnection() {
    console.log('Cleaning Connection');
    try {
      if (this.serverChannel) {
        this.serverChannel.destroy();
      }
    } catch (e) {
      console.log('Failed to destroy server channel');
    }

    this.clearHeartBeatTimer();
    this.clientId = null;
    this.serverChannel = null;
    this.connectionStatus = ConnectionStatus.NotConnected;
    this.isAuthenticated = false;
    this.accessServicesList = [];
    this.hasDefaultService = false;
  }

  handleValidationResponse(validationResp: ValidationResponse) {
    const _this = this;
    console.log('Got Validation Response: ', validationResp.getSuccess(), validationResp.getErrorReason());
    try {
      var resp: any;
      if (!_this.establishConnectionTimer) {
        throw new Error('Response received after connection timeout. Retry will happen automatically');
      } else {
        if (validationResp.getSuccess()) {
          _this.connectionStatus = ConnectionStatus.Authenticated;
          _this.isAuthenticated = true;
          _this.clientId = validationResp.getClientData().getClientId();
          _this.accessServicesList = validationResp.getAccessServicesList();
        }
        resp = {
          success: validationResp.getSuccess(),
          code: validationResp.getErrorCode(),
          message: validationResp.getErrorReason(),
          clientID: _this.clientId,
          accessServicesList: _this.accessServicesList,
        };
        clearTimeout(_this.establishConnectionTimer);
        _this.establishConnectionTimer = null;
        return resp;
      }
    } catch (e) {
      console.log('Validation Response Error: ', e);
      return {
        success: false,
        code: 500,
        message: 'Validation Failed',
      };
    }
  }

  handleDefaultServiceResponse(defaultServiceResp: DefaultServiceResponse) {
    const _this = this;
    console.log('Got Default Service Response: ', defaultServiceResp.getSuccess(), defaultServiceResp.getErrorReason());
    try {
      var resp: any;
      if (!_this.establishConnectionTimer) {
        throw new Error('Response received after connection timeout. Retry will happen automatically');
      } else {
        if (defaultServiceResp.getSuccess()) {
          _this.connectionStatus =
            _this.connectionStatus == ConnectionStatus.Authenticated
              ? _this.connectionStatus
              : ConnectionStatus.NotAuthenticated;
          _this.clientId = defaultServiceResp.getClientData().getClientId();
          if (_this.serviceMap.getService(_this.defaultService.serviceName)) {
            _this.serviceMap.removeService(_this.defaultService.serviceName);
          }
          _this.serviceMap.addService(_this.defaultService.serviceName, _this.defaultService.callback, true);
          _this.hasDefaultService = true;
        }
        resp = {
          success: defaultServiceResp.getSuccess(),
          code: defaultServiceResp.getErrorCode(),
          message: defaultServiceResp.getErrorReason(),
          clientID: _this.clientId,
          accessServicesList: _this.accessServicesList,
        };
        clearTimeout(_this.establishConnectionTimer);
        _this.establishConnectionTimer = null;
        return resp;
      }
    } catch (e) {
      console.log('Default Service Response Error: ', e);
      return {
        success: false,
        code: 500,
        message: 'Default Service Registration Failed',
      };
    }
  }

  handleBeatResponse(beatResp: HeartBeat) {
    const _this = this;
    try {
      var resp: any;
      if (!_this.heartBeatResponseTimer) {
        throw new Error('Response received after beat timeout. Beat missed');
      } else {
        resp = {
          success: true,
          hasBeat: true,
        };
        clearTimeout(_this.heartBeatResponseTimer);
        _this.heartBeatResponseTimer = null;
        return resp;
      }
    } catch (e) {
      console.log('Beat Response Error: ', e);
      return {
        success: false,
        hasBeat: false,
      };
    }
  }

  async initializeOpenChannel() {
    const _this = this;
    console.log('Initializing Channel');
    _this.cleanConnection();
    try {
      _this.serverChannel = _this.communicationStub.openChannel();

      //ServiceMsg, OnEventMsg, HeartBeat
      _this.serverChannel.on('data', (msg: ChannelResponse): void => {
        //Handle Validation Response
        if (msg.hasValidationResponse()) {
          _this.eventEmitter.emit(
            ConnectionEvents.VALIDATIONRESPONSE,
            _this.handleValidationResponse(msg.getValidationResponse())
          );
        }
        //Handle Default Service Response
        else if (msg.hasDefaultServiceResponse()) {
          _this.eventEmitter.emit(
            ConnectionEvents.DEFAULTSERVICERESPONSE,
            _this.handleDefaultServiceResponse(msg.getDefaultServiceResponse())
          );
        } else if (msg.hasServiceMessage()) {
          console.log('GOT SERVICE MESSAGE');
          _this.serviceRPC(msg.getServiceMessage());
        } else if (msg.hasEventMessage()) {
          console.log('GOT EVENT MESSAGE');
          _this.handleEvent(msg.getEventMessage());
        } else if (msg.hasBeat()) {
          _this.eventEmitter.emit(ConnectionEvents.BEATRESPONSE, _this.handleBeatResponse(msg.getBeat()));
        }
      });

      _this.serverChannel.on('error', (err: Error): void => {
        console.error('Keus Transport Client Error: ', err);
        try {
          _this.serverChannel.destroy();
        } catch (e) {}
        _this.serverChannel = null;
        _this.runConnection(EstablishConnectionTypes.RECONNECTION, 2);
      });

      _this.serverChannel.on('end', (): void => {
        // Set closed status - Handle reconnection
        console.error('Keus Transport Client Error: CHANNEL END');
        try {
          _this.serverChannel.destroy();
        } catch (e) {}
        _this.serverChannel = null;
        _this.runConnection(EstablishConnectionTypes.RECONNECTION, 3);
      });
      _this.setHeartBeatTimer();
      return;
    } catch (e) {
      console.log('Error initializing channel:', e);
      throw e;
    }
  }

  async runConnection(connectionType: string, a: number) {
    const _this = this;
    console.log('Running connection: ', a);
    try {
      if (_this.connectionLock) {
        console.log('Connection already in progess');
        return {
          success: false,
          code: 500,
          message: 'Connection already in progess',
        };
      } else {
        _this.connectionLock = true;
        if (!_this.serverChannel) {
          await _this.initializeOpenChannel();
        }
        if (connectionType == EstablishConnectionTypes.VALIDATION) {
          await _this.authenticateClient();
        } else if (connectionType == EstablishConnectionTypes.DEFAULTSERVICE) {
          await _this.registerDefaultService();
        } else if (connectionType == EstablishConnectionTypes.RECONNECTION) {
          if (_this.validationInfo) {
            await _this.authenticateClient();
            const serviceList = _this.serviceMap.getAllServices();
            const eventList = _this.eventMap.getAllEvents();
            //Re-add all services
            for (var i = 0; i < serviceList.length; i++) {
              try {
                if (!serviceList[i].isDefaultService) {
                  const serviceData = new ServiceData();
                  serviceData.setServiceName(serviceList[i].serviceName);
                  serviceData.setClientId(_this.clientId);
                  const registerResp = await new Promise(function (resolve, reject) {
                    _this.communicationStub.registerService(serviceData, function (err, resp) {
                      if (err) {
                        reject(err);
                      } else {
                        resolve(resp);
                      }
                    });
                  });
                  console.log('Register Service Resp: ', serviceList[i].serviceName, ': ', registerResp);
                }
              } catch (e) {
                console.log('Register Service Err: ', serviceList[i].serviceName, ': ', e);
              }
            }

            //Re-add all events
            for (var i = 0; i < eventList.length; i++) {
              try {
                const subReq = new SubscribeData();
                subReq.setClientId(_this.clientId);
                subReq.setEventName(eventList[i].eventName);
                const subscribeResp = await new Promise(function (resolve, reject) {
                  _this.communicationStub.subscribe(subReq, function (err, resp) {
                    if (err) {
                      reject(err);
                    } else {
                      resolve(resp);
                    }
                  });
                });
                console.log('Subscribe to Event Resp: ', eventList[i].eventName, ': ', subscribeResp);
              } catch (e) {
                console.log('Subscribe to Event Err: ', eventList[i].eventName, ': ', e);
              }
            }
          }
          if (_this.defaultServiceRequest) {
            await _this.registerDefaultService();
          }
        }
        _this.connectionLock = false;
        return {
          success: true,
          code: 200,
          message: 'Connection Established Successfully',
          clientId: _this.clientId,
          accessServicesList: _this.accessServicesList,
        };
      }
    } catch (e) {
      console.log('Error in Run Connection: ', e);
      console.log('Trying reconnection');
      console.log('Before Delay Time', new Date());
      await _this.delay(_this.options.reconnectionInterval + _this.getRandomReconnectionDelay());
      console.log('After Delay Time', new Date());
      _this.connectionLock = false;
      _this.runConnection(EstablishConnectionTypes.RECONNECTION, 4);
      return {
        success: false,
        code: 400,
        message: 'Failed to establish connection. Reconnecting',
        clientId: _this.clientId,
        accessServicesList: _this.accessServicesList,
      };
    }
  }

  timeoutBeat() {
    const _this = this;
    if (this.heartBeatResponseTimer) {
      _this.heartBeatResponseTimer = null;
      var resp = {
        success: false,
        hasBeat: false,
      };
      _this.eventEmitter.emit(ConnectionEvents.BEATRESPONSE, resp);
    } else {
      console.log('Hitting timeout beat block without timer enabled');
    }
  }

  timeoutValidationRequest() {
    const _this = this;
    if (this.establishConnectionTimer) {
      _this.establishConnectionTimer = null;
      var resp = {
        success: false,
        code: 408,
        message: 'Validation Timed out',
      };
      _this.eventEmitter.emit(ConnectionEvents.VALIDATIONRESPONSE, resp);
    } else {
      console.log('Hitting timeout validation block without timer enabled');
    }
  }

  timeoutDefaultServiceRequest() {
    const _this = this;
    if (this.establishConnectionTimer) {
      _this.establishConnectionTimer = null;
      var resp = {
        success: false,
        code: 408,
        message: 'Default Service Registration Timed out',
      };
      _this.eventEmitter.emit(ConnectionEvents.DEFAULTSERVICERESPONSE, resp);
    } else {
      console.log('Hitting timeout default service block without timer enabled');
    }
  }

  async startLogin(validationReq: ValidationRequest) {
    this.validationInfo = validationReq;
    const resp = await this.runConnection(EstablishConnectionTypes.VALIDATION, 5);
    return resp;
  }

  async startLoginWithService(
    validationReq: ValidationRequest,
    serviceName: string,
    serviceCb: (args: Any, callerMetadata: object) => Promise<Any>
  ) {
    this.validationInfo = validationReq;
    const resp = await this.runConnection(EstablishConnectionTypes.VALIDATION, 6);
    if (resp.success) {
      await this.registerService(serviceName, serviceCb);
    } else {
      this.serviceMap.addService(serviceName, serviceCb, false);
    }
    return resp;
  }

  async startDefaultServiceRegistration(
    defaultServiceData: DefaultServiceRequest,
    serviceCallBack: (args: Any, clientMetadata: object) => Promise<Any>
  ) {
    this.defaultServiceRequest = defaultServiceData;
    this.defaultService = {
      serviceName: defaultServiceData.getDefaultServiceName(),
      callback: serviceCallBack,
      isDefaultService: true,
    };
    console.log('Default Service Registration Request Captured');
    const resp = await this.runConnection(EstablishConnectionTypes.DEFAULTSERVICE, 7);
    console.log('Got Default Service Registration Resp', resp);
    return resp;
  }

  async authenticateClient() {
    const _this = this;
    var resp: any;
    try {
      if (_this.isAuthenticated && _this.clientId && _this.serverChannel) {
        resp = {
          success: true,
          clientID: _this.clientId,
          accessServicesList: _this.accessServicesList,
          message: 'Client already authenticated',
        };
        return resp;
      } else {
        resp = await new Promise<any>(function (resolve, reject) {
          _this.eventEmitter.removeAllListeners(ConnectionEvents.VALIDATIONRESPONSE);
          _this.eventEmitter.once(ConnectionEvents.VALIDATIONRESPONSE, function (...args) {
            const validationResp = <any>args[0];
            if (validationResp.success) {
              resolve(validationResp);
            } else {
              reject(validationResp.message);
            }
          });
          const channelReq = new ChannelRequest();
          channelReq.setValidationRequest(_this.validationInfo);
          _this.serverChannel.write(channelReq);
          _this.establishConnectionTimer = setTimeout(function () {
            _this.timeoutValidationRequest();
          }, _this.establishConnectionTimeout);
        });
        return resp;
      }
    } catch (e) {
      console.log('Authenticate Client Error: ', e);
      throw e;
    }
  }

  //Register the default service - If the client is not already connected, first open dual stream and then send message
  async registerDefaultService() {
    console.log('Registering Default Service');
    const _this = this;
    var resp: any;
    try {
      resp = await new Promise<any>(function (resolve, reject) {
        _this.eventEmitter.removeAllListeners(ConnectionEvents.DEFAULTSERVICERESPONSE);
        _this.eventEmitter.once(ConnectionEvents.DEFAULTSERVICERESPONSE, function (...args) {
          const defaultServiceResp = <any>args[0];
          if (defaultServiceResp.success) {
            resolve(defaultServiceResp);
          } else {
            reject(defaultServiceResp.message);
          }
        });
        const channelReq = new ChannelRequest();
        channelReq.setDefaultServiceRequest(_this.defaultServiceRequest);
        _this.serverChannel.write(channelReq);
        _this.establishConnectionTimer = setTimeout(function () {
          _this.timeoutDefaultServiceRequest();
        }, _this.establishConnectionTimeout);
      });
      return resp;
    } catch (e) {
      console.log('Register Default Service Error: ', e);
      throw e;
    }
  }

  async unregisterDefaultService(): Promise<void> {
    const _this = this;
    return new Promise(function (resolve, reject) {
      try {
        if (!(_this.clientId && _this.serverChannel)) {
          throw new errors.GenericError('Client Not Connected');
        } else if (!_this.defaultService) {
          throw new errors.GenericError('Default Service Not Set');
        } else {
          const clientData = new ClientData();
          clientData.setClientId(_this.clientId);

          const unregisterDSReq = new RemoveDefaultServiceRequest();
          unregisterDSReq.setClientData(clientData);
          unregisterDSReq.setDefaultServiceName(_this.defaultService.serviceName);
          unregisterDSReq.setServicePassword(_this.defaultServiceRequest.getServicePassword());
          _this.communicationStub.unregisterDefaultService(
            unregisterDSReq,
            (err: Error | null, resp: DefaultServiceResponse): void => {
              if (err) {
                console.log('Failed to remove default service');
                reject(err);
              } else {
                if (resp.getSuccess()) {
                  if (_this.serviceMap.getService(_this.defaultService.serviceName)) {
                    _this.serviceMap.removeService(_this.defaultService.serviceName);
                  }
                  _this.defaultService = null;
                  _this.defaultServiceRequest = null;
                  resolve();
                } else {
                  reject(new errors.GenericError(resp.getErrorReason()));
                }
              }
            }
          );
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  registerService(serviceName: string, callback: (args: Any, callerMetadata: object) => Promise<Any>): Promise<void> {
    const _this = this;
    return new Promise(function (resolve, reject) {
      try {
        if (_this.connectionStatus !== ConnectionStatus.Authenticated) {
          throw new errors.NotAuthenticatedError();
        } else {
          const serviceReq: ServiceData = new ServiceData();
          serviceReq.setClientId(_this.clientId);
          serviceReq.setServiceName(serviceName);

          _this.communicationStub.registerService(serviceReq, (err: Error | null, resp: ServiceAck): void => {
            if (err) {
              _this.serviceMap.removeService(serviceName);
              console.log('Failed to Add Service', serviceName);
              throw err;
            } else {
              if (resp.getSuccess()) {
                _this.serviceMap.addService(serviceName, callback);
                console.log('Service Added Successfully', serviceName);
                resolve();
              } else {
                switch (resp.getCode()) {
                  case errors.ServiceRegistrationErrorTypes.ServiceAlreadyRegisteredOnCloud.code:
                    _this.serviceMap.addService(serviceName, callback);
                    console.log('Service Added Successfully', serviceName);
                    resolve();
                    break;
                  case errors.ServiceRegistrationErrorTypes.ServiceRegisteredByAnotherClient.code:
                  default:
                    _this.serviceMap.removeService(serviceName);
                    console.log('Failed to Add Service', serviceName);
                    throw new errors.ServiceRegistrationError(resp.getError(), resp.getCode());
                }
              }
            }
          });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  unregisterService(serviceName: string): void {
    if (this.connectionStatus !== ConnectionStatus.Authenticated) {
      throw new errors.NotAuthenticatedError();
    } else {
      const req: ServiceData = new ServiceData();
      req.setClientId(this.clientId);
      req.setServiceName(serviceName);
      this.communicationStub.unregisterService(req, (err: Error | null, resp: ServiceAck): void => {
        if (err) {
          console.log('Failed to Remove Service', serviceName);
          throw err;
        } else {
          if (resp.getSuccess()) {
            this.serviceMap.removeService(serviceName);
            console.log('Service Removed Successfully', serviceName);
          } else {
            switch (resp.getCode()) {
              case errors.ServiceUnregistrationErrorTypes.ServiceNotRegisteredOnCloud.code:
              case errors.ServiceUnregistrationErrorTypes.ServiceRegisteredByAnotherClient.code:
                this.serviceMap.removeService(serviceName);
                console.log('Service Removed Successfully', serviceName);
                break;
              default:
                throw new errors.ServiceUnregistrationError(resp.getError(), resp.getCode());
            }
          }
        }
      });
    }
  }

  makeRPC(serviceName: string, arg: Any, cb: (err: Error | null, res: Any) => void): void {
    if (this.connectionStatus !== ConnectionStatus.Authenticated) {
      throw new errors.NotAuthenticatedError();
    }
    const req = new RequestData();
    req.setServiceName(serviceName);
    req.setClientId(this.clientId);
    req.setData(arg);
    this.communicationStub.forwardRequest(req, (remoteErr: Error | null, resp: ResponseData): void => {
      if (remoteErr) {
        cb(remoteErr, new Any());
      } else {
        const rpcResp = RPCUtils.cleanResponseData(resp);
        cb(null, rpcResp);
      }
    });
  }

  async serviceRPC(serviceMsg: ServiceMessage): Promise<void> {
    try {
      if (serviceMsg) {
        const serviceName = serviceMsg.getServiceName();
        if (serviceName) {
          const serviceHandler = this.serviceMap.getService(serviceName);
          if (serviceHandler) {
            const msgData = serviceMsg.getData();
            const clientMetadata = JSON.parse(serviceMsg.getCallerMetadata());
            const resp = await serviceHandler.callback(msgData ? msgData : new Any(), clientMetadata);
            const rpcResp = RPCUtils.getRPCResponseMessage(serviceMsg.getRequestId(), serviceName, this.clientId, resp);
            this.communicationStub.forwardResponse(rpcResp, (err: Error | null, responseAck: ResponseAck): void => {
              if (err) {
                throw new errors.MakeRPCError();
              } else {
                console.log(responseAck.getSuccess(), responseAck.getCode(), responseAck.getError());
              }
            });
          } else {
            throw new errors.UndefinedService();
          }
        } else {
          throw new errors.UndefinedService();
        }
      } else {
        throw new errors.UndefinedServiceMessage();
      }
    } catch (e) {
      throw e;
    }
  }

  async subscribeToEvent(eventName: string, cb: (arg: Any) => void): Promise<void> {
    const _this = this;
    return new Promise(function (resolve, reject) {
      try {
        if (_this.connectionStatus !== ConnectionStatus.Authenticated) {
          throw new errors.NotAuthenticatedError();
        } else {
          const eventReq: SubscribeData = new SubscribeData();
          eventReq.setClientId(_this.clientId);
          eventReq.setEventName(eventName);

          _this.communicationStub.subscribe(eventReq, (err: Error | null, resp: SubscribeAck): void => {
            if (err) {
              _this.eventMap.removeEvent(eventName);
              console.log('Failed to Add Event', eventName);
            } else {
              if (resp.getSuccess()) {
                _this.eventMap.addEvent(eventName, cb);
                console.log('Event Added Successfully', eventName);
                resolve();
              } else {
                switch (resp.getCode()) {
                  case errors.EventRegistrationErrorTypes.EventAlreadyRegisteredOnCloud.code:
                    _this.eventMap.addEvent(eventName, cb);
                    console.log('Event Added Successfully', eventName);
                    resolve();
                    break;
                  case errors.EventRegistrationErrorTypes.EventRegisteredByAnotherClient.code:
                  default:
                    _this.eventMap.removeEvent(eventName);
                    console.log('Failed to Add Event', eventName);
                    throw new errors.EventRegistrationError(resp.getError(), resp.getCode());
                }
              }
            }
          });
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  unsubscribeFromEvent(eventName: string) {
    if (this.connectionStatus !== ConnectionStatus.Authenticated) {
      throw new errors.NotAuthenticatedError();
    } else {
      const req: SubscribeData = new SubscribeData();
      req.setClientId(this.clientId);
      req.setEventName(eventName);
      this.communicationStub.unSubscribe(req, (err: Error | null, resp: SubscribeAck): void => {
        if (err) {
          console.log('Failed to Remove Event', eventName);
          throw err;
        } else {
          if (resp.getSuccess()) {
            this.eventMap.removeEvent(eventName);
            console.log('Event Removed Successfully', eventName);
          } else {
            switch (resp.getCode()) {
              case errors.EventUnregistrationErrorTypes.EventNotRegisteredOnCloud.code:
              case errors.EventUnregistrationErrorTypes.EventRegisteredByAnotherClient.code:
                this.eventMap.removeEvent(eventName);
                console.log('Event Removed Successfully', eventName);
                break;
              default:
                throw new errors.EventUnregistrationError(resp.getError(), resp.getCode());
            }
          }
        }
      });
    }
  }

  handleEvent(eventMessage: EventMessage) {
    try {
      if (eventMessage) {
        const eventName = eventMessage.getEventName();
        const event = this.eventMap.getEvent(eventName);
        if (event) {
          event.callback(eventMessage.getEventData());
        } else {
          console.log('Event not registered locally');
        }
      }
    } catch (e) {
      console.log('Error Handling event');
    }
  }

  async publish(eventName: string, eventData: Any) {
    console.log('Publishing Event', eventName);
    const _this = this;
    return new Promise(function (resolve, reject) {
      if (_this.connectionStatus !== ConnectionStatus.Authenticated) {
        reject(new errors.NotAuthenticatedError());
      }
      const req = new PublishData();
      req.setEventName(eventName);
      req.setData(eventData);
      req.setClientId(_this.clientId);

      _this.communicationStub.publish(req, (remoteErr: Error | null, resp: PublishAck): void => {
        if (remoteErr) {
          reject(remoteErr);
        } else {
          resolve(resp);
        }
      });
    });
  }
}
