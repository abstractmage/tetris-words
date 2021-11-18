import { Nullable } from 'src/App/types';
import { DraggableProps } from '../../types';

export type Params<P extends Object> = {
  props: DraggableProps<P>;
  element: Nullable<HTMLElement>;
};
