import cn from "classnames";
import { useState } from "react";
import classes from "./index.module.scss";
import { Button } from "../../Button";
import { ContentResultGameProps } from "./types";
import { TableLetterScore } from "./TableLetterScore";
import { TableResult } from "./TableResult";

export const ContentResultGame = (props: ContentResultGameProps) => {
  const { onClickBreak, words, scores } = props;
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
              Результат игры
            </div>
            <div
              className={cn(classes.tab, !isVisibleResult && classes.tabActive)}
              onClick={() => {
                setVisibleResult(false);
              }}
            >
              Таблица стоимости букв
            </div>
          </div>
          {!isVisibleResult && <TableLetterScore />}
          {isVisibleResult && <TableResult words={words} scores={scores} />}
        </div>
      </div>
      <div className={classes.buttonsWrap}>
        <Button type={"break"} className={classes.btn} onClick={onClickBreak} />
      </div>
    </div>
  );
};
