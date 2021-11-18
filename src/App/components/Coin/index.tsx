import React from 'react';
import cn from 'classnames';
import { ReactComponent as Sprite } from './images/sprite.svg';
import { CoinProps } from './types';
import styles from './index.module.scss';

export const Coin = React.forwardRef<HTMLDivElement, CoinProps>(function Coin(props, ref) {
  const { className, ...otherProps } = props;
  
  return (
    <div {...otherProps} ref={ref} className={cn(styles.main, className)}>
      <Sprite />
    </div>
  );
});
