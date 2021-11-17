import { observer } from 'mobx-react';
import { useAppContext } from '../../shared/useAppContext';
import { Cube } from '../Cube';
import { Figure } from '../Figure'
import styles from './index.module.scss';
import { Slot } from './Slot';


export const Tape = observer(function Tape() {
  const { tape: { figures } } = useAppContext();

  return (
    <div className={styles.main}>
      <div className={styles.slotsContainer}>
        {figures.map(({ blocks, type }, i) => (
          <Slot key={i} type={type}>
            <Figure type={type}>
              {blocks.map(({ color, letter }, i) => <Cube key={i} color={color}>{letter}</Cube>)}
            </Figure>
          </Slot>
        ))}
      </div>
    </div>
  );
});