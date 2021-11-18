import { action, makeObservable, observable, when } from "mobx";
import { ConstructorPopup } from "./types";

export class Popup {
  isVisible = false;

  isDisableClickOutside = false;

  isVisibleTransition = false;

  constructor({ isDisableClickOutside }: ConstructorPopup = {}) {
    makeObservable<Popup>(this, {
      isVisible: observable,
      isVisibleTransition: observable,

      show: action,
      hide: action,
      handleTransitionEnd: action,
    });

    this.isDisableClickOutside =
      isDisableClickOutside === undefined ? false : isDisableClickOutside;
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.onClickOutside=this.onClickOutside.bind(this);
  }

  async show() {
    this.isVisible = true;
    this.isVisibleTransition = true;
    await when(() => !this.isVisibleTransition);
  }

  async hide() {
    this.isVisible = false;
    this.isVisibleTransition = true;
    await when(() => !this.isVisibleTransition);
  }

  handleTransitionEnd() {
    this.isVisibleTransition = false;
  }

  onClickOutside() {
    if (this.isDisableClickOutside) return;
    this.isVisible = false;
  }
}
