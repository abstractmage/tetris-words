import { observer } from 'mobx-react';
import { useAppContext } from '../../shared/useAppContext';
import styles from './index.module.scss';

export const StartPage = observer(function StartPage() {
  const {
    handleGameStartClick,
  } = useAppContext();

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>StartPage</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.playButton} onClick={handleGameStartClick}>Start game</div>
      </div>
    </div>
  );
});