import { DraggableEvent } from 'react-draggable';
import { DraggableData } from 'src/App/components/Draggable/types';
import { Collection } from '../Collection';
import { Plate } from '../Plate';
import { Slot } from '../Slot';

export type Options = {
  plates: Collection<Plate>;
  slots: Collection<Slot>;
};

export type DragHandlerParams = {
  event: DraggableEvent;
  data: DraggableData;
};
