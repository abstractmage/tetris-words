import cn from "classnames";
import { memo, useState } from "react";
import classes from "./index.module.scss";
import { Button } from "../../Button";
import { ContentResultGameProps } from "./types";
import { TableLetterScore } from "./TableLetterScore";
import { TableResult } from "./TableResult";

export const ContentResultGame = memo((props: ContentResultGameProps) => {
  const { onClickBreak, onClickContinue, words, scores } = props;
  const [isVisibleResult, setVisibleResult] = useState(true);

  return (
    <div className={classes.popupContent}>
      <div className={classes.textWrap}>
        <div
          className={cn(
            classes.container,
            classes[`container_${isVisibleResult ? "result" : "table"}`]
          )}
        >
          <div className={classes.tabs}>
            <div
              className={cn(classes.tab, isVisibleResult && classes.tabActive)}
              onClick={() => {
                setVisibleResult(true);
              }}
            >
              Собранные слова
            </div>
            <div
              className={cn(classes.tab, !isVisibleResult && classes.tabActive)}
              onClick={() => {
                setVisibleResult(false);
              }}
            >
              Стоимость букв
            </div>
          </div>
          {!isVisibleResult && <TableLetterScore />}
          {isVisibleResult && <TableResult words={words} scores={scores} />}
        </div>
      </div>
      <div className={classes.buttonsWrap}>
        <Button type={"continue"} className={classes.btn} onClick={onClickContinue}>Вернуться</Button>
        <Button className={classes.btn} onClick={onClickBreak}>Закончить игру</Button>
      </div>
    </div>
  );
});
