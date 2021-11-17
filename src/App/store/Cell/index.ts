import { makeAutoObservable } from 'mobx';
import { Nullable, Point } from 'src/App/types';

export class Cell {
  private _point: Point;
  
  private _hovered = false;

  private _element: Nullable<HTMLElement> = null;

  constructor(options: { point: Point }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this._point = options.point;
  }

  get element() {
    return this._element;
  }

  get hovered() {
    return this._hovered;
  }

  get point() {
    return this._point;
  }

  loadElement(element: HTMLElement) {
    this._element = element;
  }

  setHovered(hovered: boolean) {
    this._hovered = hovered
  }
}
