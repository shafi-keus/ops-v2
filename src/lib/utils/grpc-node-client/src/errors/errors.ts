export const ServiceRegistrationErrorTypes = {
  ServiceAlreadyRegisteredLocally: {
    message: 'Service Already Registered Locally',
    code: 801,
  },
  ServiceAlreadyRegisteredOnCloud: {
    message: 'Service Already Registered On Cloud',
    code: 802,
  },
  ServiceRegisteredByAnotherClient: {
    message: 'Service Registered On Cloud By Another Client',
    code: 803,
  },
};

export const ServiceUnregistrationErrorTypes = {
  ServiceNotRegisteredOnCloud: {
    message: 'Service Not Registered On Cloud',
    code: 804,
  },
  ServiceRegisteredByAnotherClient: {
    message: 'Service Registered On Cloud By Another Client',
    code: 805,
  },
};

export const EventRegistrationErrorTypes = {
  EventAlreadyRegisteredLocally: {
    message: 'Event Already Registered Locally',
    code: 801,
  },
  EventAlreadyRegisteredOnCloud: {
    message: 'Event Already Registered On Cloud',
    code: 802,
  },
  EventRegisteredByAnotherClient: {
    message: 'Event Registered On Cloud By Another Client',
    code: 803,
  },
};

export const EventUnregistrationErrorTypes = {
  EventNotRegisteredOnCloud: {
    message: 'Event Not Registered On Cloud',
    code: 804,
  },
  EventRegisteredByAnotherClient: {
    message: 'Event Registered On Cloud By Another Client',
    code: 805,
  },
};

export class ValidationError extends Error {
  constructor() {
    super();
    this.name = 'ValidationError';
    this.message = 'Error on validation';
  }
}

export class NotAuthenticatedError extends Error {
  constructor() {
    super();
    this.name = 'NotAuthenticatedError';
    this.message = 'Client not authenticated';
  }
}

export class ServiceRegistrationError extends Error {
  constructor(msg: string, public code: number) {
    super();
    this.name = 'ServiceRegistrationError';
    this.message = msg;
  }
}

export class ServiceUnregistrationError extends Error {
  constructor(msg: string, public code: number) {
    super();
    this.name = 'ServiceUnregistrationError';
    this.message = msg;
  }
}

export class EventRegistrationError extends Error {
  constructor(msg: string, public code: number) {
    super();
    this.name = 'EventRegistrationError';
    this.message = msg;
  }
}

export class EventUnregistrationError extends Error {
  constructor(msg: string, public code: number) {
    super();
    this.name = 'EventUnregistrationError';
    this.message = msg;
  }
}

export class MakeRPCError extends Error {
  constructor(msg?: string) {
    super();
    this.name = 'MakeRPCError';
    this.message = msg ? msg : 'Make Rpc Error';
  }
}

export class UndefinedServiceMessage extends Error {
  constructor() {
    super();
    this.name = 'UndefinedServiceMessage';
    this.message = 'Service message not defined';
  }
}

export class GenericError extends Error {
  constructor(msg: string) {
    super();
    this.name = 'GenericError';
    this.message = msg;
  }
}
export class UndefinedService extends Error {
  constructor() {
    super();
    this.name = 'UndefinedService';
    this.message = 'Service not defined';
  }
}

export class NoTypeDeclaration extends Error {
  constructor() {
    super();
    this.name = 'InvalidParameterType';
    this.message = 'ParameterType not detected';
  }
}
