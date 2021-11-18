import React from 'react';
import { DraggableEvent } from 'react-draggable';
import { Nullable, Point } from 'src/App/types';

export type DragType = 'drag-and-drop' | 'click-and-click';

export type DraggableData = {
  type: Nullable<DragType>;
  element: HTMLElement;
  point: Point;
  offsetPoint: Point;
  deltaPoint: Point;
};

export type DraggableEventHandler = (event: DraggableEvent, data: DraggableData) => void;

export type DraggableProps<P extends Object> = {
  Component: React.ForwardRefExoticComponent<P>;
  onStartDrag?: DraggableEventHandler;
  onMoveDrag?: DraggableEventHandler;
  onFinishDrag?: DraggableEventHandler;
} & P;
