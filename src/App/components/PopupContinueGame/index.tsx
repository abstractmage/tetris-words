import classes from "./index.module.scss";
import { PopupContinueGameProps } from "./types";
import cn from "classnames";
import { ContentContinueGame } from "./ContentContinueGame";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";


export const PopupContinueGame = (props: PopupContinueGameProps) => {
  const { text, onClickOutside, onClickBreak, onClickContinue } = props;
  const navigate = useNavigate();

  const onClick = useCallback(()=>{
    onClickBreak();
    navigate('/');
  },[onClickBreak, navigate])
  
  return (
    <div className={classes.wrap}>
      <div className={classes.overlay} onClick={onClickOutside}></div>
      <div className={cn(classes.popup, classes.popup_continueGame)}>
          <ContentContinueGame
            text={text}
            onClickBreak={onClick}
            onClickContinue={onClickContinue}
          />
      </div>
    </div>
  );
};
