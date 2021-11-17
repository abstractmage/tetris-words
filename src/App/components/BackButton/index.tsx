import React from 'react';
import cn from 'classnames';
import { FullSizeBlock } from '../FullSizeBlock';
import { ReactComponent as Sprite } from './images/sprite.svg';
import { BackButtonProps } from './types';
import styles from './index.module.scss';

export const BackButton = ({ className, disabled, ...otherProps }: BackButtonProps) => {
  return (
    <FullSizeBlock
      {...otherProps}
      className={cn(styles.main, disabled && styles.main_disabled, className)}
    >
      <Sprite />
    </FullSizeBlock>
  );
};
