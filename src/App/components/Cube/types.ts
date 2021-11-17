import React from 'react';

export type CubeProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string;
  disabled?: boolean;
  selected?: boolean;
  hovered?: boolean;
};
