/// <reference path="../generated/broker_pb.d.ts" />

import { Any } from 'google-protobuf/google/protobuf/any_pb';
import * as errors from '../errors/errors';

export interface Service {
  serviceName: string;
  isDefaultService: boolean;
  callback: (arg: Any, clientMetadata: object) => Promise<Any>;
}

export class ServicesMap {
  private services: Map<string, Service>;

  constructor() {
    this.services = new Map();
  }

  getService(serviceName: string): Service {
    const providerData = this.services.get(serviceName);
    return providerData;
  }

  getAllServices(): Array<Service> {
    const serviceArray: Array<Service> = [];
    this.services.forEach((value: Service, key: string) => {
      serviceArray.push(value);
    });
    return serviceArray;
  }

  addService(
    serviceName: string,
    callback: (arg: Any, clientMetadata: object) => Promise<Any>,
    isDefaultService: boolean = false
  ): void {
    if (this.getService(serviceName)) {
      throw new errors.ServiceRegistrationError(
        errors.ServiceRegistrationErrorTypes.ServiceAlreadyRegisteredLocally.message,
        errors.ServiceRegistrationErrorTypes.ServiceAlreadyRegisteredLocally.code
      );
    }
    this.services.set(serviceName, {
      serviceName,
      callback,
      isDefaultService,
    });
  }

  removeService(serviceName: string): void {
    this.services.delete(serviceName);
  }

  removeServices(serviceList: string[]) {
    serviceList.forEach((serviceName) => {
      try {
        this.removeService(serviceName);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
