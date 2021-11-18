import { makeAutoObservable } from 'mobx';
import { Collection } from '../Collection';
import { DragOperator } from '../DragOperator';
import { Plate } from '../Plate';
import { Slot } from '../Slot';

export class DraggerStore {
  plates = new Collection<Plate>();

  slots = new Collection<Slot>();

  operator = new DragOperator({
    plates: this.plates,
    slots: this.slots,
  });

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}
