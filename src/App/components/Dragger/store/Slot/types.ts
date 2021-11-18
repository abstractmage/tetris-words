import { IntersectionInHandler, IntersectionOutHandler } from '../../components/Plate/types';
import { Options as DragItemOptions } from '../DragItem/types';

export type Callbacks = {
  onIntersectionIn?: IntersectionInHandler;
  onIntersectionOut?: IntersectionOutHandler;
};

export type Options = DragItemOptions & {
  elementSelector?: string;
  intersectionSelector?: string;
  callbacks?: Callbacks;
};
