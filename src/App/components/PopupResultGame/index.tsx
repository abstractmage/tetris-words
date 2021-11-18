import classes from "./index.module.scss";
import { PopupResultGameProps } from "./types";
import cn from "classnames";
import { ContentResultGame } from "./ContentResultGame";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

export const PopupResultGame = (props: PopupResultGameProps) => {
  const {words, scores, onClickOutside, onClickEndGame } = props;
  const navigate = useNavigate();

  const onClick = useCallback(()=>{
    onClickEndGame();
    navigate('/');
  },[onClickEndGame, navigate])

  return (
    <div className={classes.wrap}>
      <div className={classes.overlay} onClick={onClickOutside}></div>
      <div className={cn(classes.popup, classes.popup_resultGame)}>
          <ContentResultGame
            scores={scores}
            words={words}
            onClickBreak={onClick}
            onClickContinue={onClickOutside}
          />
        
      </div>
    </div>
  );
};
