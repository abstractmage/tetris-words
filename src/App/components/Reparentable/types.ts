import React from 'react';

export type ReparentableProps = React.PropsWithChildren<{
  className?: string;
  parent: HTMLElement;
  containerStyle?: React.CSSProperties;
}>;
