import { Popup } from "./popup";
import { ConstructorPopupResultGame } from "./types";

export class PopupResultGame extends Popup {
  onClickNewGame: () => void;

  constructor({
    isDisableClickOutside,
    onClickNewGame,
  }: ConstructorPopupResultGame) {
    super({ isDisableClickOutside });

    this.onClickNewGame = ()=>{
      this.hide();
      onClickNewGame();
    };
  }
}
