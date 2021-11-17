import { makeAutoObservable } from 'mobx';
import { TapeViewModel } from '../components/Tape/TapeViewModel';

export class AppStore {
  tape = new TapeViewModel();

  constructor() {
    makeAutoObservable(this);
  }

  handleGameStartClick = () => {
    console.log('handleGameStartClick');
  };
}