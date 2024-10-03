/// <reference path="../generated/broker_pb.d.ts" />

import { Any } from 'google-protobuf/google/protobuf/any_pb';
import * as errors from '../errors/errors';

export interface Event {
  eventName: string;
  callback: (arg: Any) => void;
}

export class EventsMap {
  private events: Map<string, Event>;

  constructor() {
    this.events = new Map();
  }

  getEvent(eventName: string): Event {
    const eventData = this.events.get(eventName);
    return eventData;
  }

  getAllEvents(): Array<Event> {
    const eventArray: Array<Event> = [];
    this.events.forEach((value: Event, key: string) => {
      eventArray.push(value);
    });
    return eventArray;
  }

  addEvent(eventName: string, callback: (arg: Any) => void, forceAdd: boolean = true): void {
    if (this.getEvent(eventName) && !forceAdd) {
      throw new errors.EventRegistrationError(
        errors.EventRegistrationErrorTypes.EventAlreadyRegisteredLocally.message,
        errors.EventRegistrationErrorTypes.EventAlreadyRegisteredLocally.code
      );
    }
    this.events.set(eventName, {
      eventName,
      callback,
    });
  }

  removeEvent(eventName: string): void {
    this.events.delete(eventName);
  }

  removeEvents(eventList: string[]) {
    eventList.forEach((eventName) => {
      try {
        this.removeEvent(eventName);
      } catch (error) {
        console.log(error);
      }
    });
  }
}
