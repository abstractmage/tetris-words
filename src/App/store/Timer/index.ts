import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Nullable } from 'src/App/types';
import { eventNames } from './constants';
import { EventTypeMap } from './types';

export class Timer {
  private eventEmitter = new EventEmitter<EventTypeMap>();

  private intervalId: Nullable<number> = null;

  start(ms: number) {
    this.stop();

    let value = 0;
    this.intervalId = window.setInterval(() => {
      value += ms;
      this.eventEmitter.emit(eventNames.tick, { value });
    }, ms);
  }

  stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
  }
}
