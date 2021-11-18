import { makeAutoObservable, runInAction } from 'mobx';
import { DragItem } from '../DragItem';

export class Collection<T extends DragItem = DragItem> {
  items: T[] = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  findById(id: string | number) {
    const item = this.items.find((_item) => _item.id === id);
    return item;
  }

  findByElement(element: HTMLElement) {
    const item = this.items.find((_item) => _item.element === element);
    return item;
  }

  add(item: T) {
    runInAction(() => {
      this.items = this.items.concat(item);
    });

    return item;
  }
}
