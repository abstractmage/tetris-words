export type PopupType = 'continueGame' | 'resultGame';

export type PopupResultGameProps = {
  words: string[];
  scores: number;
  onClickEndGame:()=>void;
  onClickOutside: ()=> void;
};
