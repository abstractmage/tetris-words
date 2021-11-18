import React from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { useDraggerStoreContext } from '../../context';
import { DefaultPlateComponentProps, PlateProps } from './types';
import { PlateStore } from './store/PlateStore';
import { PlateStoreContext } from './context';
import { PlateMover } from './binders/PlateMover';
import { Draggable } from 'src/App/components/Draggable';
import { omit } from 'lodash';

export const Plate = observer(function Plate<P extends DefaultPlateComponentProps>(
  props: PlateProps<P>,
) {
  const ref = React.useRef<HTMLElement | null>(null);
  const dragger = useDraggerStoreContext();
  const plateStore = useLocalObservable(
    () => new PlateStore<P>({ props, dragger, element: null }),
  );

  const { onStartDrag, onMoveDrag, onFinishDrag } = plateStore.draggableProps;
  const { Component, anchor, componentProps } = plateStore.elementMoverProps;

  const plateModel = plateStore.model;

  const setRef = React.useCallback(
    (elem: HTMLElement | null) => {
      if (elem !== null) {
        plateStore.setElement(elem);
        ref.current = elem;
      }
    },
    [plateStore],
  );

  React.useEffect(() => plateStore.setElement(ref.current!), [plateModel, plateStore]);

  React.useEffect(() => plateStore.setProps(props), [plateStore, props]);

  return (
    <PlateStoreContext.Provider value={plateStore}>
      {anchor ? (
        <Draggable
          ref={setRef}
          Component={PlateMover}
          onStartDrag={onStartDrag}
          onMoveDrag={onMoveDrag}
          onFinishDrag={onFinishDrag}
        />
      ) : (
        <Component {...((omit(componentProps, 'bounded', 'withAnimation', 'calculationHelper', 'onMoving', 'onMovingEnd', 'componentProps') as any) as P)} ref={ref} />
      )}
    </PlateStoreContext.Provider>
  );
});
