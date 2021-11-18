import React from 'react';
import { Transition } from 'react-transition-group';
import { reflowElement } from 'src/App/shared/helpers/reflowElement';
import { useCombinedRefs } from 'src/App/shared/useCombinedRefs';
import { FullSizeBlock } from '../FullSizeBlock';
import { FadeProps } from './types';

export const Fade = React.forwardRef(function Fade(
  props: FadeProps,
  forwardedRef: React.Ref<HTMLDivElement>,
) {
  const {
    className,
    style,
    shown = true,
    duration = 500,
    delay = 0,
    easing = 'ease-in',
    withUnmount = true,
    children,
    onShowingEnd,
    ...otherProps
  } = props;

  const ref = useCombinedRefs(forwardedRef);

  const styleMap = React.useMemo(
    () => ({
      entered: {
        opacity: 1,
      },
      entering: {
        transition: `opacity ${duration}ms ${delay}ms ${easing}`,
        opacity: 1,
      },
      exiting: {
        transition: `opacity ${duration}ms ${delay}ms ${easing}`,
        opacity: 0,
      },
      exited: {
        opacity: 0,
      },
    }),
    [delay, duration, easing],
  );

  const handleShowingStart = React.useCallback(() => {
    ref.current && reflowElement(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowingEnd = React.useCallback(() => {
    onShowingEnd?.(shown);
  }, [onShowingEnd, shown]);

  return (
    <Transition
      nodeRef={ref}
      in={shown}
      timeout={duration + delay}
      mountOnEnter={withUnmount}
      unmountOnExit={withUnmount}
      onEnter={handleShowingStart}
      onEntered={handleShowingEnd}
      onExited={handleShowingEnd}
    >
      {(state) => (
        <FullSizeBlock
          {...otherProps}
          ref={ref}
          style={state !== 'unmounted' ? { ...style, ...styleMap[state] } : { ...style }}
          className={className}
        >
          {children}
        </FullSizeBlock>
      )}
    </Transition>
  );
});