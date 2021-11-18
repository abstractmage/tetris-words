import { DraggableEventHandler } from 'src/App/components/Draggable/types';
import { IntersectionInHandler, IntersectionOutHandler } from 'src/App/components/Dragger/components/Plate/types';

export type MouseDownHandler = () => void;
export type MouseEnterHandler = () => void;

export type EventTypeMap = {
  'mousedown': MouseDownHandler;
  'mouseenter': MouseEnterHandler;
  'intersectionIn': IntersectionInHandler;
  'intersectionOut': IntersectionOutHandler;
  'finishDrag': DraggableEventHandler;
};

export type EventType = keyof EventTypeMap;

export type Options = {
  letter: string;
  slotId: string | number;
  group?: string | number;
  color?: string;
};
