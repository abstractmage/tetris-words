import React from 'react';
import cn from 'classnames';
import { Nullable } from 'src/App/types';
import { FullSizeBlock } from '../FullSizeBlock';
import { ReactComponent as Sprite } from './images/sprite.svg';
import { defaultFontSize, defaultProps, defaultWidth } from './constants';
import { ScoreCounterProps } from './types';
import styles from './index.module.scss';

export const ScoreCounter = (props: ScoreCounterProps) => {
  const { className, scores, ...otherProps } = { ...defaultProps, ...props };
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<Nullable<number>>(null);
  const scaling = width ? width / defaultWidth : 1;
  const scoresStyle = React.useMemo(() => ({
    fontSize: `${scaling * defaultFontSize}px`,
  }), [scaling]);

  React.useEffect(() => {
    const element = ref.current!;
    const calcWidth = () => setWidth(element.offsetWidth);
    calcWidth();
    window.addEventListener('resize', calcWidth);
    return () => window.removeEventListener('resize', calcWidth);
  }, []);

  return (
    <FullSizeBlock {...otherProps} ref={ref} className={cn(styles.main)}>
      <FullSizeBlock absolute>
        <Sprite />
      </FullSizeBlock>
      <div style={scoresStyle} className={styles.scores}>{scores}</div>
    </FullSizeBlock>
  );
};
