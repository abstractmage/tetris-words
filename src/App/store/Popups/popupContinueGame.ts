import { Popup } from "./popup";
import { ConstructorPopupContinueGame } from "./types";

export class PopupContinueGame extends Popup {
  onClickContinue: () => void;
  
  onClickBreak: () => void;

  constructor({
    isDisableClickOutside,
    onClickBreak,
    onClickContinue,
    onClickOutside,
  }: ConstructorPopupContinueGame) {
    super({ isDisableClickOutside, onClickOutside });

    this.onClickBreak = onClickBreak;
    this.onClickContinue = ()=>{
      this.hide();
      onClickContinue();
    };
  }
}
