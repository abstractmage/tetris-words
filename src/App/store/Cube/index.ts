import { makeAutoObservable } from 'mobx';
import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Nullable } from 'src/App/types';
import { defaultColor, eventNames } from './constants';
import { EventTypeMap, Options } from './types';

export class Cube {
  private eventEmitter = new EventEmitter<EventTypeMap>();
  
  private _letter: string;

  private _color: string;

  private _hovered = false;

  private _selected = false;

  private _disabled = false;

  private _element: Nullable<HTMLElement> = null;

  private _slot: Nullable<HTMLElement> = null;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });
    this._letter = options.letter;
    this._color = options.color ?? defaultColor;
  }

  get letter() {
    return this._letter;
  }

  get color() {
    return this._color;
  }

  get element() {
    return this._element;
  }

  get hovered() {
    return this._hovered;
  }

  get slot() {
    return this._slot;
  }

  get selected() {
    return this._selected;
  }

  get disabled() {
    return this._disabled;
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
  
  loadElement(element: HTMLElement) {
    this._element = element;
  }

  setHovered(hovered: boolean) {
    this._hovered = hovered;
  }

  setSlot(slot: HTMLElement) {
    this._slot = slot;
  }

  setSelected(selected: boolean) {
    this._selected = selected;
  }

  setDisabled(disabled: boolean) {
    this._disabled = disabled;
  }

  handleMouseDown() {
    this.eventEmitter.emit(eventNames.mousedown);
  }

  handleMouseEnter() {
    this.eventEmitter.emit(eventNames.mouseenter);
  }
}
