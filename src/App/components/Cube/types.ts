import React from 'react';

export type CubeProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: string;
  clickable?: boolean;
};
