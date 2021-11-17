import React from 'react';
import cn from 'classnames';
import { FullSizeBlock } from '../FullSizeBlock';
import { defaultProps } from './constants';
import { FigureProps } from './types';
import styles from './index.module.scss';

export const Figure = React.forwardRef<HTMLDivElement, FigureProps>(function Figure(props, ref) {
  const { type, ...otherProps } = { ...defaultProps, ...props };

  return (
    <FullSizeBlock
      {...otherProps}
      ref={ref}
      className={cn(styles.main, styles[`main_type_${type}`])}
    />
  );
});
