import { action, computed, makeObservable, observable } from 'mobx';
import { Nullable } from 'src/App/types';
import { DragItem } from '../DragItem';
import { Callbacks, Options } from './types';

export class Slot extends DragItem {
  elementSelector: Nullable<string>;

  intersectionSelector: Nullable<string>;

  callbacks?: Callbacks;

  get intersectionElement() {
    if (!this.intersectionSelector) return this.element;

    const intersectionElement = this.element?.querySelector(this.intersectionSelector);

    if (!intersectionElement) return this.element;

    return intersectionElement as HTMLElement;
  }

  get currentElement() {
    if (!this.elementSelector) return this.element;

    const element = this.element?.querySelector(this.elementSelector);

    if (!element) return element;

    return element as HTMLElement;
  }

  constructor(options: Options) {
    super(options);

    makeObservable(this, {
      callbacks: observable,
      intersectionElement: computed,
      currentElement: computed,
      setCallbacks: action.bound,
    });

    this.elementSelector = options.elementSelector ?? null;
    this.intersectionSelector = options.intersectionSelector ?? null;
    this.callbacks = options.callbacks;
  }

  setCallbacks(callbacks: Callbacks) {
    this.callbacks = callbacks;
  }
}
