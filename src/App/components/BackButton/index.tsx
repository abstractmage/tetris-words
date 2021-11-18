import React from 'react';
import cn from 'classnames';
import { Nullable } from 'src/App/types';
import { FullSizeBlock } from '../FullSizeBlock';
import { ReactComponent as Sprite } from './images/sprite.svg';
import { defaultBorderWidth, defaultWidth } from './constants';
import { BackButtonProps } from './types';
import styles from './index.module.scss';

export const BackButton = ({ className, disabled, style: styleProp, onClick, ...otherProps }: BackButtonProps) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState<Nullable<number>>(null);
  const scaling = width ? width / defaultWidth : 1;
  const style = React.useMemo(() => ({
    ...styleProp,
    borderWidth: `${scaling * defaultBorderWidth}px`,
  }), [scaling, styleProp]);

  React.useEffect(() => {
    const element = ref.current!;
    const calcWidth = () => setWidth(element.offsetWidth);
    calcWidth();
    window.addEventListener('resize', calcWidth);
    return () => window.removeEventListener('resize', calcWidth);
  }, []);

  return (
    <FullSizeBlock
      {...otherProps}
      ref={ref}
      style={style}
      className={cn(styles.main, disabled && styles.main_disabled, className)}
      onClick={onClick}
    >
      <Sprite />
    </FullSizeBlock>
  );
};
