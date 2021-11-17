import React from 'react';

export type ShowingEndHandler = (shown: boolean) => void;

export type FadeProps = {
  shown?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  withUnmount?: boolean;
  onShowingEnd?: ShowingEndHandler;
  positonAbsolute?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;