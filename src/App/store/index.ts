import { makeAutoObservable } from 'mobx';

export class AppStore {
  constructor() {
    makeAutoObservable(this);
  }

  handleGameStartClick = () => {
    console.log('handleGameStartClick');
  };
}