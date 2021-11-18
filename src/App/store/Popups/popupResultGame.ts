import { Popup } from "./popup";
import { ConstructorPopupResultGame } from "./types";

export class PopupResultGame extends Popup {
  onClickEndGame: () => void;

  constructor({
    isDisableClickOutside,
    onClickEndGame,
  }: ConstructorPopupResultGame) {
    super({ isDisableClickOutside });

    this.onClickEndGame = ()=>{
      this.hide();
      onClickEndGame();
    };
  }
}
