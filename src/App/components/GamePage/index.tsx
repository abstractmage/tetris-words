import { observer } from 'mobx-react';
// import { useAppContext } from '../../shared/useAppContext';
import styles from './index.module.scss';

export const GamePage = observer(function GamePage() {
  // const {} = useAppContext();

  return (
    <div className={styles.main}>
      <div className={styles.fieldContainer}>
        fieldContainer
      </div>
      <div className={styles.tapeContainer}>
        tapeContainer
      </div>
    </div>
  );
});