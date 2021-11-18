import { makeAutoObservable } from 'mobx';
import { uniqueId } from 'lodash';
import { DraggableEvent } from 'react-draggable';
import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Nullable } from 'src/App/types';
import { IntersectionParams } from 'src/App/components/Dragger/components/Plate/types';
import { defaultColor, eventNames } from './constants';
import { EventTypeMap, Options } from './types';
import { DraggableData } from 'src/App/components/Draggable/types';
import { Fade } from 'src/App/shared/Fade';

export class Cube {
  fade = new Fade();
  
  private eventEmitter = new EventEmitter<EventTypeMap>();

  private _uid = uniqueId();
  
  private _letter: string;

  private _color: string;

  private _hovered = false;

  private _selected = false;

  private _disabled = false;

  private _dragListening = false;

  private _element: Nullable<HTMLElement> = null;
  
  private _slotId: string | number;

  private _intersectedSlotId: Nullable<string | number> = null;

  private _group: string | number;

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });
    this._letter = options.letter;
    this._color = options.color ?? defaultColor;
    this._slotId = options.slotId;
    this._group = options.group ?? uniqueId();

  }

  get uid() {
    return this._uid;
  }

  get group() {
    return this._group;
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

  get slotId() {
    return this._slotId;
  }

  get selected() {
    return this._selected;
  }

  get disabled() {
    return this._disabled;
  }

  get intersectedSlotId() {
    return this._intersectedSlotId;
  }

  get dragListening() {
    return this._dragListening;
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

  setSlotId(slotId: string | number) {
    this._slotId = slotId;
  }

  setSelected(selected: boolean) {
    this._selected = selected;
  }

  setDisabled(disabled: boolean) {
    this._disabled = disabled;
  }

  setGroup(group: string | number) {
    this._group = group;
  }

  setIntersectedSlotId(intersectedSlotId: Nullable<string | number>) {
    this._intersectedSlotId = intersectedSlotId;
  }

  setDragListening(dragListening: boolean) {
    this._dragListening = dragListening;
  }

  handleMouseDown() {
    this.eventEmitter.emit(eventNames.mousedown);
  }

  handleMouseEnter() {
    this.eventEmitter.emit(eventNames.mouseenter);
  }

  handleMouseUp() {
    this.eventEmitter.emit(eventNames.mouseup);
  }
  
  handleIntersectionIn(data: IntersectionParams) {
    this.eventEmitter.emit(eventNames.intersectionIn, data);
  }

  handleIntersectionOut(data: IntersectionParams) {
    this.eventEmitter.emit(eventNames.intersectionOut, data);
  }

  handleFinishDrag(event: DraggableEvent, data: DraggableData) {
    this.eventEmitter.emit(eventNames.finishDrag, event, data);
  }
}
