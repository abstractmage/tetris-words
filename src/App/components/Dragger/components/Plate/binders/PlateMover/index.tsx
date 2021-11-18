import React from 'react';
import { observer } from 'mobx-react';
import { usePlateStoreContext } from '../../context';
import { ElementMover } from 'src/App/components/ElementMover';

export const PlateMover = observer(
  React.forwardRef(function PlateMover<P extends Object>(props: P, ref: React.Ref<HTMLElement>) {
    const plateStore = usePlateStoreContext();
    const {
      Component,
      anchor,
      translate,
      bounded,
      duration,
      withAnimation,
      easing,
      calculationHelper,
      onMoving,
      onMovingEnd,
      componentProps,
      ...otherProps
    } = plateStore.elementMoverProps;

    return (
      <ElementMover
        {...(props as any)}
        {...(otherProps as any)}
        {...componentProps}
        ref={ref}
        Component={Component}
        anchor={anchor}
        translate={translate}
        bounded={bounded}
        duration={duration}
        withAnimation={withAnimation}
        easing={easing}
        calculationHelper={calculationHelper}
        onMoving={onMoving}
        onMovingEnd={onMovingEnd}
      />
    );
  }),
);
