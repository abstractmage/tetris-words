import { letterScoreDistributions } from "src/App/store/ProgressController/constants";
import classes from "./index.module.scss";

const getWordScore = (score: number) => {
  let word = "очков";
  switch (score) {
    case 1: {
      word = "очко";
      break;
    }
    case 2: {
      word = "очка";
      break;
    }
    case 3: {
      word = "очка";
      break;
    }
    case 4: {
      word = "очка";
      break;
    }
    default:
      break;
  }
  return word;
};

export const TableLetterScore = () => {
  return (
    <div className={classes.table}>
      {letterScoreDistributions["rus"].map(({ letter, score }, idx) => {
        return (
          <p key={`letter_${letter}_${idx}`}>
            <span className={classes.letter}>
              {letter}
              {" — "}
            </span>
            <span className={classes.letterScore}>{score}</span>{" "}
            {getWordScore(score)}
          </p>
        );
      })}
    </div>
  );
};
