import { makeAutoObservable } from 'mobx';
import { Nullable } from 'src/App/types';
import { defaultColor } from './constants';

export class Cube {
  private _letter: string;

  private _color: string;

  private _hovered = false;

  private _selected = false;

  private _element: Nullable<HTMLElement> = null;

  private _slot: Nullable<HTMLElement> = null;

  constructor(options: { letter: string; color?: string }) {
    makeAutoObservable(this, {}, { autoBind: true });
    this._letter = options.letter;
    this._color = options.color ?? defaultColor;
  }

  get letter() {
    return this._letter;
  }

  get color() {
    return this._color;
  }

  get element() {
    return this._element;
  }

  get hovered() {
    return this._hovered;
  }

  get slot() {
    return this._slot;
  }

  get selected() {
    return this._selected;
  }

  loadElement(element: HTMLElement) {
    this._element = element;
  }

  setHovered(hovered: boolean) {
    this._hovered = hovered;
  }

  setSlot(slot: HTMLElement) {
    this._slot = slot;
  }

  setSelected(selected: boolean) {
    this._selected = selected;
  }
}
