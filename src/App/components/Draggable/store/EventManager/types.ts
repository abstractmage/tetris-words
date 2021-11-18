import { DraggableEvent } from 'react-draggable';
import { DraggableData } from '../../types';

export type Callbacks = {
  onStartDrag?: (event: DraggableEvent, data: DraggableData) => void;
  onMoveDrag?: (event: DraggableEvent, data: DraggableData) => void;
  onFinishDrag?: (event: DraggableEvent, data: DraggableData) => void;
};

export type Options = {
  element: HTMLElement;
} & Callbacks;

export type EventType =
  | 'mousedown'
  | 'mousemove'
  | 'mouseup'
  | 'touchstart'
  | 'touchmove'
  | 'touchend';

export type EventListener = (event: DraggableEvent) => void;
