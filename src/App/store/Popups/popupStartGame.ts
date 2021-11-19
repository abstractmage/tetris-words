import { Popup } from "./popup";
import { ConstructorPopupStartGame } from "./types";

export class PopupStartGame extends Popup {
  onClickSinglePlay: () => void;

  onClickMultiplePlay: () => void;

  constructor({
    isDisableClickOutside,
    onClickSinglePlay,
    onClickMultiplePlay,
    onClickOutside
  }: ConstructorPopupStartGame) {
    super({ isDisableClickOutside, onClickOutside });

    this.onClickSinglePlay = () => {
      this.hide();
      onClickSinglePlay();
    };

    this.onClickMultiplePlay = () => {
      this.hide();
      onClickMultiplePlay();
    };
  }
}
