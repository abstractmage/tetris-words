import { makeAutoObservable } from "mobx";
import { TapeViewModel } from "../components/Tape/TapeViewModel";
import { PopupStartGame } from "./Popups";
import { ProgressController } from "./ProgressController";

export class AppStore {
  tape = new TapeViewModel();
  progressController = new ProgressController();
  isVisibleGamePage = false;
  popupStartGame = new PopupStartGame({
    isDisableClickOutside: true,
    onClickMultiplePlay: () => {
      console.log("multiple play");
    },
    onClickSinglePlay: () => this.handleGameStartClick,
  });

  constructor() {
    makeAutoObservable(this);
  }

  handleGameStartClick = () => {
    this.isVisibleGamePage = true;
    console.log("handleGameStartClick");
  };
}