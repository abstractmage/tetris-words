import { action, makeObservable, observable } from 'mobx';
import { Nullable } from 'src/App/types';
import { Options } from './types';

export class DragItem {
  id: string | number;

  element: Nullable<HTMLElement> = null;

  constructor(options: Options) {
    makeObservable(this, {
      element: observable,
      setElement: action.bound,
    });

    this.id = options.id;
  }

  setElement(element: HTMLElement) {
    this.element = element;
  }
}
