import React from 'react';

export type TapeProps = React.HTMLAttributes<HTMLDivElement>;

type Block = {
  color: string;
  letter: string;
}

export interface FigureType {
  blocks: Block[];
  type: number;
}
