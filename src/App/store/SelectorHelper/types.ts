import { Cube } from '../Cube';

export type SelectedCubesUpdateHandler = (data: { selectedCubes: Cube[] }) => void;
export type SelectionEndHandler = (data: { selectedCubes: Cube[] }) => void;

export type EventTypeMap = {
  'selectedCubesUpdated': SelectedCubesUpdateHandler;
  'selectionEnd': SelectionEndHandler;
};

export type EventType = keyof EventTypeMap;
