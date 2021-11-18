import { uniqueId } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { EventEmitter } from 'src/App/shared/EventEmitter';
import { eventNames } from './constants';
import { EventTypeMap } from './types';

export class Coin {
  anchor: HTMLElement;

  uid = uniqueId();

  private eventEmitter = new EventEmitter<EventTypeMap>();
  
  constructor(options: { anchor: HTMLElement }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this.anchor = options.anchor;
  }

  on<T extends keyof EventTypeMap>(eventType: T, handler: EventTypeMap[T]) {
    this.eventEmitter.on(eventType, handler);
  }

  once<T extends keyof EventTypeMap>(eventType: T, handler: EventTypeMap[T]) {
    this.eventEmitter.on(eventType, handler);
  }

  off<T extends keyof EventTypeMap>(eventType: T, handler: EventTypeMap[T]) {
    this.eventEmitter.off(eventType, handler);
  }

  removeAllListeners<T extends keyof EventTypeMap>(eventType?: T) {
    this.eventEmitter.removeAllListeners(eventType);
  }

  setAnchor(anchor: HTMLElement) {
    this.anchor = anchor;
  }

  handleMovingEnd() {
    this.eventEmitter.emit(eventNames.movingEnd);
  }
}
