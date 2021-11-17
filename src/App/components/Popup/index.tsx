import classes from "./index.module.scss";
import { Button } from "../Button";
import { PopupProps } from "./types";

const txt = `Хочешь закончить игру\r\nили продолжить?`;

export const Popup = (props: PopupProps) => {
  const { text } = props;
  return (
    <div className={classes.wrap}>
      <div className={classes.overlay}></div>
      <div className={classes.popup}>
        <div className={classes.popupContent}>
          <div className={classes.textWrap}>
            <div className={classes.text}>{text ? text : txt}</div>
          </div>
          <div className={classes.buttonsWrap}>
            <Button
              type={"continue"}
              className={classes.btn}
              onClick={() => console.log("click continue")}
            />
            <Button
              type={"break"}
              className={classes.btn}
              onClick={() => console.log("click break")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
