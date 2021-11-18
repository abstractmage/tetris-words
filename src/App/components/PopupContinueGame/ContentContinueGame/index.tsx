import { ContentContinueGameProps } from "./types";
import classes from './index.module.scss';
import { Button } from "../../Button";

const txt = `Хочешь закончить игру\r\nили продолжить?`;

export const ContentContinueGame = (props: ContentContinueGameProps)=>{
    const {text, onClickBreak, onClickContinue} = props
  return(
    <div className={classes.popupContent}>
    <div className={classes.textWrap}>
      <div className={classes.text}>{text ? text : txt}</div>
    </div>
    <div className={classes.buttonsWrap}>
      <Button
        type={"continue"}
        className={classes.btn}
        onClick={onClickContinue}
      />
      <Button
        type={"break"}
        className={classes.btn}
        onClick={onClickBreak}
      />
    </div>
  </div>
  );
}