import { DraggableEventHandler } from 'src/App/components/Draggable/types';
import { MovingEndHandler, MovingHandler } from 'src/App/components/ElementMover/types';
import { IntersectionInHandler, IntersectionOutHandler } from '../../components/Plate/types';
import { Options as DragItemOptions } from '../DragItem/types';

export type Callbacks = {
  onAfterDragMoving?: MovingHandler;
  onAfterDragMovingEnd?: MovingEndHandler;
  onStartDrag?: DraggableEventHandler;
  onMoveDrag?: DraggableEventHandler;
  onFinishDrag?: DraggableEventHandler;
  onIntersectionIn?: IntersectionInHandler;
  onIntersectionOut?: IntersectionOutHandler;
};

export type Options = DragItemOptions & {
  slotId: string | number;
  centered?: boolean;
  intersectionSelector?: string;
  disabled?: boolean;
  group?: string | number;
  callbacks?: Callbacks;
};
