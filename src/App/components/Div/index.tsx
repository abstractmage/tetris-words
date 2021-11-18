import React from 'react';
import { DivProps } from './types';

export const Div = React.forwardRef<HTMLDivElement, DivProps>(function Div(props, ref) {
  return <div ref={ref} {...props} />;
});
