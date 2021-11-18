import React from 'react';
import styles from './index.module.scss';

export const Tape: React.FC = ({ children }) => {
  return (
    <div className={styles.main}>
      <div className={styles.slotsContainer}>
        {children}
      </div>
    </div>
  );
};