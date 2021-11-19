export type ConstructorPopup = {
  isDisableClickOutside?: boolean;
  onClickOutside?: () => void;
};

export type ConstructorPopupContinueGame = {
  onClickContinue: () => void;
  onClickBreak: () => void;
} & ConstructorPopup;

export type ConstructorPopupResultGame = {
    onClickEndGame: () => void;
  } & ConstructorPopup;


export type ConstructorPopupStartGame = {
  onClickSinglePlay: () => void;
  onClickMultiplePlay: () => void;
} & ConstructorPopup;