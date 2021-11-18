import { makeAutoObservable } from 'mobx';
import { TapeViewModel } from '../components/Tape/TapeViewModel';
import { ProgressController } from './ProgressController';

export class AppStore {
  tape = new TapeViewModel();
  progressController = new ProgressController();
  isVisibleGamePage = false;

  constructor() {
    makeAutoObservable(this);
  }

  handleGameStartClick = () => {
    this.isVisibleGamePage = true;
    console.log('handleGameStartClick');
  };
}