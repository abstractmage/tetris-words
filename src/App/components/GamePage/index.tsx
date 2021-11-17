import { observer } from "mobx-react";
// import { useAppContext } from '../../shared/useAppContext';
import styles from "./index.module.scss";
import { Field } from "../Field";
import { Cell } from "../Cell";

export const GamePage = observer(function GamePage() {
  // const {} = useAppContext();

  return (
    <div className={styles.main}>
      <div className={styles.progressContainer}>
        ProgressContainer
      </div>
      <div className={styles.fieldContainer}>
        <Field>
          {Array.from(Array(100).keys()).map(() => {
            return <Cell isFilled={false} isHovered={false} />;
          })}
        </Field>
      </div>
      <div className={styles.tapeContainer}>tapeContainer</div>
    </div>
  );
});
