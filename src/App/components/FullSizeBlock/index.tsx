import React from 'react';
import cn from 'classnames';
import { FullSizeBlockProps } from './types';
import style from './index.module.scss';

export const FullSizeBlock = React.forwardRef<HTMLDivElement, FullSizeBlockProps>(function FullSizeBlock(
  props,
  ref,
) {
  const { className, absolute = false, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cn(style.main, absolute && style.main_absolute, className)}
    />
  );
});