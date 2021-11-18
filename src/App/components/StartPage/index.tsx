import { observer } from 'mobx-react';
import { useAppContext } from '../../shared/useAppContext';
import styles from './index.module.scss';
import {useNavigate } from 'react-router-dom'
import { useCallback } from 'react';

export const StartPage = observer(function StartPage() {
  const {
    handleGameStartClick,
  } = useAppContext();
  const navigate = useNavigate();

  const onClickStart = useCallback(()=>{
    handleGameStartClick();
    navigate('game');
  },[handleGameStartClick, navigate])

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>StartPage</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.playButton} onClick={onClickStart}>Start game</div>
      </div>
    </div>
  );
});