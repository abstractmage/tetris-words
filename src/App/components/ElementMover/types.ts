import React from 'react';
import { EasingOptions } from 'animejs';
import { Point } from 'src/App/types';

export type DefaultComponentProps = {
  style?: React.CSSProperties;
};

export type CustomEasingFunction = (
  el: HTMLElement,
  index: number,
  length: number,
) => (time: number) => number;

export type CalculationHelper = (data: {
  startTranslate: Point;
  finishTranslate: Point;
  currentTranslate: Point;
}) => Point;

export type MovingHandler = (point: Point) => void;

export type MovingEndHandler = MovingHandler;

export type ElementMoverProps<P extends DefaultComponentProps> = {
  anchor: HTMLElement;
  Component: React.ForwardRefExoticComponent<P>;
  duration?: number;
  easing?: EasingOptions | string | CustomEasingFunction | ((el: HTMLElement) => string);
  bounded?: boolean;
  translate?: Point;
  withAnimation?: boolean;
  reparentableContainerStyle?: React.CSSProperties;
  calculationHelper?: CalculationHelper;
  onMoving?: MovingHandler;
  onMovingEnd?: MovingEndHandler;
} & P & { children?: React.ReactNode };
