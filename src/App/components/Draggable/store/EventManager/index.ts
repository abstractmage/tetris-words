import { makeAutoObservable } from 'mobx';
import { DraggableEvent } from 'react-draggable';
import { Nullable } from 'src/App/types';
import { minOffset } from '../../constants';
import { getPointByDraggableEvent } from '../../helpers';
import { DraggableData, DragType } from '../../types';
import { Options, Callbacks, EventType, EventListener } from './types';

export class EventManager {
  private callbacks: Callbacks = {};

  private element: HTMLElement;

  private elementCaptured = false;

  private startEvent: Nullable<DraggableEvent> = null;

  private prevMoveEvent: Nullable<DraggableEvent> = null;

  private moveEvent: Nullable<DraggableEvent> = null;

  type: Nullable<DragType> = null;

  private get draggableData(): Nullable<DraggableData> {
    if (!this.startEvent) return null;

    const startPoint = getPointByDraggableEvent(this.startEvent);
    const prevMovePoint = this.prevMoveEvent
      ? getPointByDraggableEvent(this.prevMoveEvent)
      : startPoint;
    const movePoint = this.moveEvent ? getPointByDraggableEvent(this.moveEvent) : startPoint;

    return {
      type: this.type,
      element: this.element,
      point: movePoint,
      deltaPoint: {
        x: movePoint.x - prevMovePoint.x,
        y: movePoint.y - prevMovePoint.y,
      },
      offsetPoint: {
        x: movePoint.x - startPoint.x,
        y: movePoint.y - startPoint.y,
      },
    };
  }

  private get deviceIsTouch() {
    return document.body.classList.contains('touch');
  }

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.element = options.element;
    this.callbacks = options;

    this.initListeners();
  }

  private initListeners() {
    EventManager.addListener('mousedown', this.handleMouseDown);
    EventManager.addListener('mousemove', this.handleMouseMove);
    EventManager.addListener('mouseup', this.handleMouseUp);
    EventManager.addListener('touchstart', this.handleTouchStart);
    EventManager.addListener('touchmove', this.handleTouchMove);
    EventManager.addListener('touchend', this.handleTouchEnd);
  }

  private static addListener(eventType: EventType, listener: EventListener) {
    document.addEventListener(eventType, listener);
  }

  private static removeListener(eventType: EventType, listener: EventListener) {
    document.removeEventListener(eventType, listener);
  }

  private isOffsetSmall() {
    if (!this.startEvent || !this.moveEvent) {
      return true;
    }

    const mouseDownPoint = getPointByDraggableEvent(this.startEvent);
    const mouseMovePoint = getPointByDraggableEvent(this.moveEvent);
    const diffX = Math.abs(mouseDownPoint.x - mouseMovePoint.x);
    const diffY = Math.abs(mouseDownPoint.y - mouseMovePoint.y);
    const result = diffX < minOffset.x && diffY < minOffset.y;
    return result;
  }

  private setMoveEvent(event: Nullable<DraggableEvent>) {
    this.prevMoveEvent = this.moveEvent;
    this.moveEvent = event;
  }

  private clearSavedEvents() {
    this.startEvent = null;
    this.prevMoveEvent = null;
    this.moveEvent = null;
  }

  private handleMouseDown(event: DraggableEvent) {
    if (this.deviceIsTouch) return;

    if (!(event.target instanceof Node && this.element.contains(event.target))) {
      return;
    }

    if (this.type !== null) {
      this.type = null;
      this.elementCaptured = false;
      this.callbacks.onFinishDrag?.(event, this.draggableData!);
      this.clearSavedEvents();
      return;
    }

    if (this.type === null) {
      this.type = 'drag-and-drop';
      this.startEvent = event;
      this.elementCaptured = true;
      this.callbacks.onStartDrag?.(event, this.draggableData!);
    }
  }

  private handleMouseMove(event: DraggableEvent) {
    if (this.deviceIsTouch) return;

    if (this.elementCaptured) {
      this.setMoveEvent(event);
      this.callbacks.onMoveDrag?.(event, this.draggableData!);
    }
  }

  private handleMouseUp(event: DraggableEvent) {
    if (this.deviceIsTouch) return;

    if (!this.elementCaptured) {
      return;
    }

    if (this.isOffsetSmall()) {
      this.type = 'click-and-click';
    } else {
      this.type = null;
      this.elementCaptured = false;
      this.callbacks.onFinishDrag?.(event, this.draggableData!);
      this.clearSavedEvents();
    }
  }

  private handleTouchStart(event: DraggableEvent) {
    if (event.target instanceof Node && this.element.contains(event.target)) {
      this.startEvent = event;
      this.type = 'drag-and-drop';
      this.elementCaptured = true;
      this.callbacks.onStartDrag?.(event, this.draggableData!);
    }
  }

  private handleTouchMove(event: DraggableEvent) {
    if (this.elementCaptured) {
      this.setMoveEvent(event);
      this.callbacks.onMoveDrag?.(event, this.draggableData!);
    }
  }

  private handleTouchEnd(event: DraggableEvent) {
    if (this.elementCaptured) {
      this.elementCaptured = false;
      this.callbacks.onFinishDrag?.(event, this.draggableData!);
      this.type = null;
      this.clearSavedEvents();
    }
  }

  updateElement(element: HTMLElement) {
    this.element = element;
  }

  clear() {
    EventManager.removeListener('mousedown', this.handleMouseDown);
    EventManager.removeListener('mousemove', this.handleMouseMove);
    EventManager.removeListener('mouseup', this.handleMouseUp);
    EventManager.removeListener('touchstart', this.handleTouchStart);
    EventManager.removeListener('touchmove', this.handleTouchMove);
    EventManager.removeListener('touchend', this.handleTouchEnd);
  }
}
