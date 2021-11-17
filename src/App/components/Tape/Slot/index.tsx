import React from 'react';
import cn from 'classnames';
import { SlotProps } from './types';
import styles from './index.module.scss';

export const Slot = React.forwardRef<HTMLDivElement, SlotProps>(function Slot(props: SlotProps, ref) {
  const { children, type } = props;

  return (
    <div className={cn(styles.main, styles[`main_type_${type}`])} ref={ref}>
      {children}
    </div>
  );
});