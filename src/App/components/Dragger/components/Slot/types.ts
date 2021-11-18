import React from 'react';
import { IntersectionInHandler, IntersectionOutHandler } from '../Plate/types';

export type SlotProps<P extends Object> = {
  Component: React.ForwardRefExoticComponent<P>;
  id: string | number;
  elementSelector?: string;
  intersectionSelector?: string;
  onIntersectionIn?: IntersectionInHandler;
  onIntersectionOut?: IntersectionOutHandler;
} & P;
