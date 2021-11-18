import { Popup } from "./popup";
import { ConstructorPopupStartGame } from "./types";

export class PopupStartGame extends Popup {
  onClickSinglePlay: () => void;

  onClickMultiplePlay: () => void;

  constructor({
    isDisableClickOutside,
    onClickSinglePlay,
    onClickMultiplePlay,
  }: ConstructorPopupStartGame) {
    super({ isDisableClickOutside });

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
