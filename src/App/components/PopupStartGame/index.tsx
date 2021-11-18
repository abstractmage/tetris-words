import classes from "./index.module.scss";
import { PopupStartGameProps } from "./types";
import cn from "classnames";
import { Button } from "../Button";
import { useCallback } from "react";
import { useNavigate } from "react-router";

export const PopupStartGame = (props: PopupStartGameProps) => {
  const { onClickOutside, onClickSinglePlay, onClickMultiplPlay } = props;
  const navigate= useNavigate();

  const handleClickSinglePlay = useCallback(()=>{
    onClickSinglePlay();
    navigate('/game');
  },[navigate, onClickSinglePlay])


  const handleClickMultiplPlay = useCallback(()=>{
    onClickMultiplPlay();

  },[onClickMultiplPlay])

  return (
    <div className={classes.wrap}>
      <div className={classes.overlay} onClick={onClickOutside}></div>
      <div className={cn(classes.popup, classes.popup_startGame)}>
        <div className={classes.buttonsWrap}>
          <Button className={classes.btn} onClick={handleClickSinglePlay}>
            Играть одному
          </Button>
          <Button className={classes.btn} onClick={handleClickMultiplPlay}>
            Играть с соперником
          </Button>
        </div>
      </div>
    </div>
  );
};
