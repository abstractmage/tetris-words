import { observer } from "mobx-react";
// import { useAppContext } from '../../shared/useAppContext';
import { Field } from "../Field";
import { Cell } from "../Cell";
import { Tape } from '../Tape';
import styles from './index.module.scss';

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
      <Tape />
    </div>
  );
});
