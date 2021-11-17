import { makeAutoObservable } from 'mobx';
import { FigureType } from './types';

export class TapeViewModel {
  figures: FigureType[] = [
    { letters: ['А'], type: 1 },
    { letters: ['Ж', 'А'], type: 2 },
    { letters: ['Р'], type: 1 },
    { letters: ['А', 'С'], type: 3 },
    { letters: ['Я'], type: 1 },
    { letters: ['Ф'], type: 1 },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setFigures = (figures: FigureType[]) => {
    this.figures = figures;
  }
}