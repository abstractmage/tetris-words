import { makeAutoObservable } from 'mobx';
import { FigureType } from './types';

export class TapeViewModel {
  figures: FigureType[] = [
    {
      blocks: [
        { color: '#FF7B1C', letter: 'А' },
      ],
      type: 1,
    },
    {
      blocks: [
        { color: '#A258FF', letter: 'Ж' },
        { color: '#FF7B1C', letter: 'А' },
      ],
      type: 2,
    },
    {
      blocks: [
        { color: '#FF7B1C', letter: 'Р' },
      ],
      type: 1,
    },
    {
      blocks: [
        { color: '#FF7B1C', letter: 'А' },
        { color: '#FF7B1C', letter: 'С' },
      ],
      type: 3,
    },
    {
      blocks: [
        { color: '#0ABA9A', letter: 'А' },
      ],
      type: 1,
    },
    {
      blocks: [
        { color: '#D73A8F', letter: 'Ф' },
      ],
      type: 1,
    },
  ];

  constructor() {
    makeAutoObservable(this);
  }

  setFigures = (figures: FigureType[]) => {
    this.figures = figures;
  }
}