import { makeAutoObservable } from 'mobx';
import { letterScoreDistributions } from "./constants";

export class ProgressController {
  private _words: string[] = [];

  private _scores = 0;

  constructor(){
    makeAutoObservable(this, {}, { autoBind: true });
  }

  collectWord(word: string){
    this._words.push(word);
    const wordScores = this._getWordScores(word);
    if (wordScores){
        this._scores += wordScores;
    }
  }

  private _getWordScores(word: string) {
    try {
      const chars = word.split("");
      const wordScores = chars.reduce((acc, curItem, index, array) => {
        const charScore = letterScoreDistributions["rus"].find(
          ({ letter }) => letter === curItem
        )?.score;
        if (!charScore)
          throw new Error(
            `в слове ${word} для буквы ${curItem} не указаны очки в letterDistributions`
          );
        acc = acc + charScore;
        return acc;
      }, 0);
      return wordScores;
    } catch (error) {
        console.warn(error)
    }
  }

  get words(){
      return this._words;
  }

  get scores(){
      return this._scores;
  }
}