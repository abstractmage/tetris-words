import { DraggerStore } from 'src/App/components/Dragger/store/DraggerStore';
import { Nullable } from 'src/App/types';
import { PlateProps } from '../../types';

export type Params<P extends Object> = {
  props: PlateProps<P>;
  dragger: DraggerStore;
  element: Nullable<HTMLElement>;
};
