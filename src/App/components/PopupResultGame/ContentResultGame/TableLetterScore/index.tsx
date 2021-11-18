
import { letterScoreDistributions } from "src/App/store/ProgressController/constants";
import classes from "./index.module.scss";

const getScores = () => {
  const uniqScores: number[] = [];
  letterScoreDistributions["rus"].forEach((curItem) => {
    if (!uniqScores.includes(curItem.score)) {
      uniqScores.push(curItem.score);
    }
  });
  const lettersArrays = uniqScores
    .sort((a, b) => {
      return a - b;
    })
    .map((score) => {
      let letters:string[]= [];
      letterScoreDistributions["rus"].forEach((curItem) => {
        if (curItem.score === score) {
          letters.push(curItem.letter);
        }
      });
      return letters
    });

  return { uniqScores, lettersArrays };
};

export const TableLetterScore = () => {
  const { uniqScores, lettersArrays } = getScores();
  console.log(uniqScores, lettersArrays);
  return (
    <div className={classes.table}>

      {uniqScores.map((score, idx) => {
        return (
          <p key={`score_${score}`}>
            <span className={classes.letterScore}>
              {score}
              {" — "}
            </span>
            <span className={classes.letter}>{lettersArrays[idx].join(', ')}</span>
          </p>
        );
      })}
    </div>
  );
};
