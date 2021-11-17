import React from 'react';

export type ScoreCounterProps = React.HTMLAttributes<HTMLDivElement> & {
  scores?: number;
};
