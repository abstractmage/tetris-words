export type ConstructorPopup = {
  isDisableClickOutside?: boolean;
};

export type ConstructorPopupContinueGame = {
  onClickContinue: () => void;
  onClickBreak: () => void;
} & ConstructorPopup;

export type ConstructorPopupResultGame = {
    onClickBreak: () => void;
  } & ConstructorPopup;
