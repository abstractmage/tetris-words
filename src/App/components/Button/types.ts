import { ReactNode } from 'react';

export type ButtonType = 'continue' | 'break' | 'default';

export type ButtonProps = {
  type?: ButtonType;
  children?: ReactNode;
  className?: string;
  onClick: () => void;
};