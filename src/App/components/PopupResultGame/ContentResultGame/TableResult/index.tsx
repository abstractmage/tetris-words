import { TableResultGameProps } from "../types";
import classes from "./index.module.scss";
import cn from "classnames";

export const TableResult = (props: TableResultGameProps) => {
  const { scores, words } = props;
  return (
    <>
      <div className={cn(classes.scores)}>{`Твой счет: ${scores}`}</div>
      <div className={classes.words}>
        {words.map((word, idx) => {
          return <p key={`word_${word}_${idx}`}>{word}</p>;
        })}
      </div>
    </>
  );
};
