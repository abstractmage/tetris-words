import React from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { useCombinedRefs } from 'src/App/shared/useCombinedRefs';
import { DraggableStore } from './store/DraggableStore';
import { DraggableProps } from './types';

export const Draggable = observer(
  React.forwardRef(function Draggable<P extends Object>(
    props: DraggableProps<P>,
    ref: React.Ref<HTMLElement>,
  ) {
    const innerRef = useCombinedRefs(ref);
    const draggableStore = useLocalObservable(() => new DraggableStore({ props, element: null }));
    const { Component } = props;

    const setRef = React.useCallback(
      (element: HTMLElement | null) => {
        if (element) {
          innerRef.current = element;
          draggableStore.setElement(innerRef.current);
        }
      },
      [draggableStore, innerRef],
    );

    React.useEffect(() => draggableStore.setProps(props), [draggableStore, props]);

    React.useEffect(() => () => draggableStore.clear(), [draggableStore]);

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...((draggableStore.draggableProps as any) as P)}
        ref={setRef}
      />
    );
  }),
);
