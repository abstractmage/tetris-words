import classes from "./index.module.scss";
import { PopupProps } from "./types";
import cn from "classnames";
import { ContentContinueGame } from "./ContentContinueGame";
import { ContentResultGame } from "./ContentResultGame";

const collectedWords = [
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
  "казак",
];

export const Popup = (props: PopupProps) => {
  const { text, type = "continueGame" } = props;
  return (
    <div className={classes.wrap}>
      <div className={classes.overlay}></div>
      <div className={cn(classes.popup, classes[`popup_${type}`])}>
        {type === "continueGame" ? (
          <ContentContinueGame
            text={text}
            onClickBreak={() => console.log("click break")}
            onClickContinue={() => console.log("click continue")}
          />
        ) : (
          <ContentResultGame
            scores={100}
            words={collectedWords}
            onClickBreak={() => console.log("click break")}
          />
        )}
      </div>
    </div>
  );
};
