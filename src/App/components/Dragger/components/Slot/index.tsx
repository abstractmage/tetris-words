/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { observer } from 'mobx-react';
import { useDraggerStoreContext } from '../../context';
import { Slot as SlotModel } from '../../store/Slot';
import { SlotProps } from './types';

export const Slot = observer(function Slot<P extends Object>(props: SlotProps<P>) {
  const {
    Component,
    id,
    intersectionSelector,
    elementSelector,
    onIntersectionIn,
    onIntersectionOut,
    ...otherProps
  } = props;

  const ref = React.useRef<HTMLElement>(null);
  const dragger = useDraggerStoreContext();

  const slot = React.useMemo(
    () =>
      dragger.slots.add(
        new SlotModel({
          id,
          intersectionSelector,
          elementSelector,
          callbacks: {
            onIntersectionIn,
            onIntersectionOut,
          },
        }),
      ),
    [dragger.slots, elementSelector, id, intersectionSelector, onIntersectionIn, onIntersectionOut],
  );

  React.useEffect(() => {
    slot.setElement(ref.current!);
  }, [slot]);

  React.useEffect(() => {
    slot.setCallbacks({
      onIntersectionIn,
      onIntersectionOut,
    });
  }, [onIntersectionIn, onIntersectionOut, slot]);

  return <Component {...((otherProps as any) as P)} ref={ref} />;
});
