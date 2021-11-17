import { makeAutoObservable } from 'mobx';
import { Nullable } from 'src/App/types';

export class Cell {
  private _hovered = false;

  private _element: Nullable<HTMLElement> = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get element() {
    return this._element;
  }

  get hovered() {
    return this._hovered;
  }

  loadElement(element: HTMLElement) {
    this._element = element;
  }

  setHovered(hovered: boolean) {
    this._hovered = hovered
  }
}
