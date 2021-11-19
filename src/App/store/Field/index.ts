import { range } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Cell } from '../Cell';
import { defaultCellsCount, eventNames } from './constants';
import { EventTypeMap } from './types';

export class Field {
  private eventEmitter = new EventEmitter<EventTypeMap>();
  
  private _cells = range(defaultCellsCount).map((i) => {
    const fieldSideLength = Math.sqrt(defaultCellsCount);

    return new Cell({
      point: { x: i % fieldSideLength, y: Math.floor(i / fieldSideLength) },
    });
  })

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get cells() {
    return this._cells;
  }

  getCountFilledCells() {
    const count = this._cells.filter(cell => cell.cubeId);
    return count.length
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

  handleMouseUp() {
    this.eventEmitter.emit(eventNames.mouseup);
  }
}
