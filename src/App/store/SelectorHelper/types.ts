import { Cube } from '../Cube';

export type SelectedCubesUpdateHandler = (data: { selectedCubes: Cube[] }) => void;

export type EventTypeMap = {
  selectedCubesUpdated: SelectedCubesUpdateHandler;
};

export type EventType = keyof EventTypeMap;
