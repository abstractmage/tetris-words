import React from 'react';
import { DraggableEventHandler } from '../../../Draggable/types';
import {
  CalculationHelper,
  CustomEasingFunction,
  DefaultComponentProps,
  MovingEndHandler,
  MovingHandler,
} from '../../../ElementMover/types';

export type DefaultPlateComponentProps = DefaultComponentProps;

export type IntersectionParams = {
  plateId: string | number;
  slotId: string | number;
};

export type State = 'default' | 'bounded' | 'unbounded';

export type IntersectionInHandler = (params: IntersectionParams) => void;

export type IntersectionOutHandler = IntersectionInHandler;

export type PlateProps<P extends DefaultPlateComponentProps> = {
  Component: React.ForwardRefExoticComponent<P>;
  componentProps?: P;
  id: number | string;
  slotId: number | string;
  disabled?: boolean;
  state?: State;
  centered?: boolean;
  withMovingAfterDrag?: boolean;
  intersectionSelector?: string;
  group?: number | string;
  afterDragMovingDuration?: number;
  afterDragMovingEasing?: string | CustomEasingFunction | ((el: HTMLElement) => string);
  afterDragMovingPositionCalculationHelper?: CalculationHelper;
  onAfterDragMoving?: MovingHandler;
  onAfterDragMovingEnd?: MovingEndHandler;
  onStartDrag?: DraggableEventHandler;
  onMoveDrag?: DraggableEventHandler;
  onFinishDrag?: DraggableEventHandler;
  onIntersectionIn?: IntersectionInHandler;
  onIntersectionOut?: IntersectionOutHandler;
};
