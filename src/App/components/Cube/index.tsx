import React from 'react';
import cn from 'classnames';
import { useCombinedRefs } from 'src/App/shared/useCombinedRefs';
import { Nullable } from 'src/App/types';
import { FullSizeBlock } from '../FullSizeBlock';
import { defaultWidth, defaultFontSize, defaultProps } from './constants';
import { CubeProps } from './types';
import styles from './index.module.scss';

export const Cube = React.forwardRef<HTMLDivElement, CubeProps>(function Cube(props, ref) {
  const {
    color,
    children,
    className,
    disabled,
    selected,
    hovered,
    hoverable,
    style: styleProp,
    ...otherProps
  } = {
    ...defaultProps,
    ...props,
  };

  const combinedRef = useCombinedRefs(ref);
  const [width, setWidth] = React.useState<Nullable<number>>(null);
  const scaling = width ? width / defaultWidth : 1;
  const style: React.CSSProperties = React.useMemo(() => ({
    ...styleProp,
    fontSize: `${scaling * defaultFontSize}px`,
  }), [scaling, styleProp]);

  React.useEffect(() => {
    const element = combinedRef.current!;
    const calcWidth = () => setWidth(element.offsetWidth);
    calcWidth();
    window.addEventListener('resize', calcWidth);
    return () => window.removeEventListener('resize', calcWidth);
  }, [combinedRef]);

  return (
    <FullSizeBlock
      {...otherProps}
      ref={combinedRef}
      style={style}
      className={cn(
        styles.main,
        selected && styles.main_selected,
        hoverable && styles.main_hoverable,
        hovered && styles.main_hovered,
        disabled && styles.main_disabled,
        className,
      )}
    >
      <FullSizeBlock className={styles.scaleWrap}>
        <FullSizeBlock
          className={styles.background}
          style={{
            backgroundColor: color,
            boxShadow: `${scaling * 2}px ${scaling * 2}px ${scaling * 2}px rgba(34, 0, 135, 0.25)`,
          }}
          absolute
        />
        <FullSizeBlock
          className={styles.content}
          absolute
        >
          {children}
        </FullSizeBlock>
      </FullSizeBlock>
    </FullSizeBlock>
  );
});
