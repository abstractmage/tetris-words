import { action, computed, makeObservable, observable } from 'mobx';
import { Nullable, Point } from 'src/App/types';
import { DragItem } from '../DragItem';
import { Callbacks, Options } from './types';

export class Plate extends DragItem {
  translate: Point = { x: 0, y: 0 };

  slotId: string | number;

  inDrag = false;

  centered?: boolean;

  group?: string | number;

  intersectionSelector: Nullable<string>;

  callbacks?: Callbacks;

  get intersectionElement() {
    if (!this.intersectionSelector) return this.element;

    const intersectionElement = this.element?.querySelector(this.intersectionSelector);

    if (!intersectionElement) return this.element;

    return intersectionElement as HTMLElement;
  }

  constructor(options: Options) {
    super(options);

    makeObservable(this, {
      translate: observable,
      slotId: observable,
      inDrag: observable,
      group: observable,
      intersectionElement: computed,
      startDrag: action.bound,
      finishDrag: action.bound,
      setTranslate: action.bound,
      setSlotId: action.bound,
    });

    this.slotId = options.slotId;
    this.group = options.group;
    this.centered = options.centered;
    this.intersectionSelector = options.intersectionSelector ?? null;
    this.callbacks = options.callbacks;
  }

  setCallbacks(callbacks: Callbacks) {
    this.callbacks = callbacks;
  }

  startDrag() {
    this.inDrag = true;
  }

  finishDrag() {
    this.inDrag = false;
  }

  setTranslate(translate: Point) {
    this.translate = translate;
  }

  setSlotId(slotId: string | number) {
    this.slotId = slotId;
  }
}
