import React from 'react';
import { DraggableEvent } from 'react-draggable';
import { Point } from 'src/App/types';

export const isMouseEvent = (
  event: DraggableEvent,
): event is React.MouseEvent<HTMLElement | SVGElement> | MouseEvent =>
  ['mousedown', 'mousemove', 'mouseup'].includes(event.type);

export const getPointByDraggableEvent = (event: DraggableEvent): Point => {
  if (isMouseEvent(event)) {
    const mouseEvent = event;
    return { x: mouseEvent.pageX, y: mouseEvent.pageY };
  }

  const touchEvent = event;
  return { x: touchEvent.changedTouches[0].pageX, y: touchEvent.changedTouches[0].pageY };
};
