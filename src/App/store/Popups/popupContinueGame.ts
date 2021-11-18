import { Popup } from "./popup";
import { ConstructorPopupContinueGame } from "./types";

export class PopupContinueGame extends Popup {
  onClickContinue: () => void;
  
  onClickBreak: () => void;

  constructor({
    isDisableClickOutside,
    onClickBreak,
    onClickContinue,
  }: ConstructorPopupContinueGame) {
    super({ isDisableClickOutside });

    this.onClickBreak = onClickBreak;
    this.onClickContinue = ()=>{
      this.hide();
      onClickContinue();
    };
  }
}
