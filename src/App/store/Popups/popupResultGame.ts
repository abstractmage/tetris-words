import { Popup } from "./popup";
import { ConstructorPopupResultGame } from "./types";

export class PopupResultGame extends Popup {
  onClickBreak: () => void;

  constructor({
    isDisableClickOutside,
    onClickBreak,
  }: ConstructorPopupResultGame) {
    super({ isDisableClickOutside });

    this.onClickBreak = ()=>{
      this.hide();
      onClickBreak();
    };
  }
}
