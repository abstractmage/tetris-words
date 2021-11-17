import { makeAutoObservable } from 'mobx';
import { TapeViewModel } from '../components/Tape/TapeViewModel';
import { ProgressController } from './ProgressController';

export class AppStore {
  tape = new TapeViewModel();
  progressController = new ProgressController();

  constructor() {
    makeAutoObservable(this);
  }

  handleGameStartClick = () => {
    console.log('handleGameStartClick');
  };
}