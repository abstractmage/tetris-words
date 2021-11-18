import React from 'react';
import cn from 'classnames';
import { SlotProps } from './types';
import styles from './index.module.scss';

export const Slot = React.forwardRef<HTMLDivElement, SlotProps>(function Slot(props: SlotProps, ref) {
  const { children } = props;

  return (
    <div className={cn(styles.main,)} ref={ref}>
      {children}
    </div>
  );
});