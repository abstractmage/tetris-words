import { uniqueId } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { Nullable, Point } from 'src/App/types';

export class Cell {
  private _uid = uniqueId();
  
  private _point: Point;
  
  private _hovered = false;

  private _element: Nullable<HTMLElement> = null;

  private _cubeId: Nullable<string | number> = null;

  constructor(options: { point: Point }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this._point = options.point;
  }

  get uid() {
    return this._uid;
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

  get cubeId() {
    return this._cubeId;
  }

  loadElement(element: HTMLElement) {
    this._element = element;
  }

  setHovered(hovered: boolean) {
    this._hovered = hovered
  }

  setCubeId(cubeId: Nullable<string | number>) {
    this._cubeId = cubeId;
  }
}
