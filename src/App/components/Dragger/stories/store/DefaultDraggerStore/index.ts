import { makeAutoObservable } from 'mobx';
import { IntersectionParams } from '../../../components/Plate/types';

export type Plate = {
  id: number;
  slotId: number | string;
  inDrag: boolean;
  intersectedSlotId: number | string;
};

export class DefaultDraggerStore {
  plates: Plate[] = [
    { id: 1, slotId: 1, inDrag: false, intersectedSlotId: 1 },
    { id: 2, slotId: 2, inDrag: false, intersectedSlotId: 2 },
    { id: 3, slotId: 3, inDrag: false, intersectedSlotId: 3 },
  ];

  get platePropsList() {
    return this.plates.map((plate) => ({
      id: plate.id,
      slotId: plate.slotId,
      onStartDrag: () => {
        plate.inDrag = true;
      },
      onIntersectionIn: ({ slotId }: IntersectionParams) => {
        plate.intersectedSlotId = slotId;
      },
      onFinishDrag: () => {
        plate.slotId = plate.intersectedSlotId;
        plate.inDrag = false;
      },
    }));
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPlateSlots(plateSlots: { [key: number]: number }) {
    this.plates.forEach((plate) => {
      plate.slotId = plateSlots[plate.id];
    });
  }
}
