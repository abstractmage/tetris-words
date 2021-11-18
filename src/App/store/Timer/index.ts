import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Nullable } from 'src/App/types';
import { eventNames } from './constants';
import { EventTypeMap } from './types';

export class Timer {
  private eventEmitter = new EventEmitter<EventTypeMap>();

  private intervalId: Nullable<number> = null;

  private value = 0;

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

  start(ms: number) {
    if (this.intervalId !== null) return;

    this.intervalId = window.setInterval(() => {
      this.value += ms;
      this.eventEmitter.emit(eventNames.tick, { value: this.value });
    }, ms);
  }

  stop() {
    this.value = 0;
    this.pause();
  }

  pause() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
