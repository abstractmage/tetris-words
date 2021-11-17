import React from 'react';
import { Transition } from 'react-transition-group';
import cn from 'classnames';
import { reflowElement } from '../../shared/helpers/reflowElement';
import { FadeProps } from './types';
import classes from './index.module.scss';

const Fade = function Fade(props: FadeProps) {
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
    positonAbsolute = false,
    ...otherProps
  } = props;

  const ref = React.useRef<HTMLDivElement>(null);

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
    // eslint-disable-next-line no-unused-expressions
    ref.current && reflowElement(ref.current);
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
      {(state) => {
        return (
          <div
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
            ref={ref}
            style={state !== 'unmounted' ? { ...style, ...styleMap[state] } : { ...style }}
            className={cn(classes.main, positonAbsolute && classes.main_absolute, className)}
          >
            {children}
          </div>
        );
      }}
    </Transition>
  );
};

export { Fade };