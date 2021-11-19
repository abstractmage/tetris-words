import { Popup } from "./popup";
import { ConstructorPopupResultGame } from "./types";

export class PopupResultGame extends Popup {
  onClickEndGame: () => void;

  constructor({
    isDisableClickOutside,
    onClickEndGame,
    onClickOutside
  }: ConstructorPopupResultGame) {
    super({ isDisableClickOutside, onClickOutside });

    this.onClickEndGame = ()=>{
      this.hide();
      onClickEndGame();
    };
  }
}
