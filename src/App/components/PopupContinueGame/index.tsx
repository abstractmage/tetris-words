import classes from "./index.module.scss";
import { PopupContinueGameProps } from "./types";
import cn from "classnames";
import { ContentContinueGame } from "./ContentContinueGame";


export const PopupContinueGame = (props: PopupContinueGameProps) => {
  const { text, onClickOutside, onClickBreak, onClickContinue } = props;
  return (
    <div className={classes.wrap}>
      <div className={classes.overlay} onClick={onClickOutside}></div>
      <div className={cn(classes.popup, classes.popup_continueGame)}>
          <ContentContinueGame
            text={text}
            onClickBreak={onClickBreak}
            onClickContinue={onClickContinue}
          />
      </div>
    </div>
  );
};
