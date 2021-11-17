import { MainProps } from './types';
import styles from './index.module.scss';

export function Main(props: MainProps) {
  const { children } = props;

  return (
    <div className={styles.main}>
      <div className={styles.content}>{children}</div>
    </div>
  );
};