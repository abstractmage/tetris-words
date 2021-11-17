import React from 'react';
import { useCombinedRefs } from 'src/App/shared/useCombinedRefs';
import { Nullable } from 'src/App/types';
import { FullSizeBlock } from '../FullSizeBlock';
import { defaultWidth, defaultFontSize } from './constants';
import { CubeProps } from './types';
import styles from './index.module.scss';

export const Cube = React.forwardRef<HTMLDivElement, CubeProps>(function Cube(props, ref) {
  const { color, style: styleProp, ...otherProps } = props;
  const combinedRef = useCombinedRefs(ref);
  const [width, setWidth] = React.useState<Nullable<number>>(null);
  const scaling = width ? width / defaultWidth : 1;
  const style: React.CSSProperties = React.useMemo(() => ({
    ...styleProp,
    fontSize: `${scaling * defaultFontSize}px`,
    boxShadow: `${scaling * 2}px ${scaling * 2}px ${scaling * 2}px rgba(34, 0, 135, 0.25)`,
    backgroundColor: color,
  }), [color, scaling, styleProp]);

  React.useEffect(() => {
    const element = combinedRef.current!;
    const calcWidth = () => setWidth(element.offsetWidth);
    calcWidth();
    window.addEventListener('resize', calcWidth);
    return () => window.removeEventListener('resize', calcWidth);
  }, [combinedRef]);

  return (
    <FullSizeBlock {...otherProps} ref={combinedRef} style={style} className={styles.main} />
  );
});
