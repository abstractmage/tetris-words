export type PopupType = 'continueGame' | 'resultGame';

export type PopupResultGameProps = {
  words: string[];
  scores: number;
  onClickNewGame:()=>void;
  onClickOutside: ()=> void;
};
