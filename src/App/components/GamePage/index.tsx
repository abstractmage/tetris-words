import { observer } from "mobx-react";
// import { useAppContext } from '../../shared/useAppContext';
import { Field } from "../Field";
import { Cell } from "../Cell";
import { Tape } from "../Tape";
import styles from "./index.module.scss";
// import { Popup } from "../Popup";
// import { Fade } from "../Fade";
import { ScoreCounter } from "../ScoreCounter";
import { BackButton } from "../BackButton";

export const GamePage = observer(function GamePage() {
  // const {} = useAppContext();

  return (
    <div className={styles.main}>
      <div className={styles.progressContainer}>
        <div className={styles.scoreCounterContainer}>
          <ScoreCounter scores={0}/>
        </div>
      </div>
      <div className={styles.backButtonContainer}>
        <BackButton />
        </div>
      <div className={styles.fieldContainer}>
        <Field>
          {Array.from(Array(100).keys()).map((idx) => {
            return <Cell key={idx} isFilled={false} isHovered={false} />;
          })}
        </Field>
      </div>
      <Tape />
      {/* <Fade shown={isVisiblePopup} positonAbsolute>
        <Popup />
      </Fade> */}
    </div>
  );
});
