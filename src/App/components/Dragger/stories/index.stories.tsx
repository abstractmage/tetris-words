import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Observer, useLocalObservable } from 'mobx-react';
import cn from 'classnames';
import { Plate } from '../components/Plate';
import { Slot } from '../components/Slot';
import { DefaultPlateComponentProps } from '../components/Plate/types';
import { Dragger } from '..';
import style from './index.module.scss';
import { DefaultDraggerStore } from './store/DefaultDraggerStore';
import { useEffectOnUpdate } from 'src/App/shared/useEffectOnUpdate';

const PlateView = React.forwardRef(function PlateView(
  props: DefaultPlateComponentProps & { inDrag?: boolean },
  ref: React.Ref<HTMLDivElement>,
) {
  const { style: styleProp, inDrag = false } = props;

  return (
    <div ref={ref} style={styleProp} className={cn(style.plate, inDrag && style.plate_inDrag)} />
  );
});

const SlotView: React.ForwardRefExoticComponent<{
  children?: React.ReactElement;
}> = React.forwardRef(function SlotView(props, ref: React.Ref<HTMLDivElement>) {
  const { children } = props;

  return (
    <div ref={ref} className={style.slot}>
      {children}
    </div>
  );
});

type Props = {
  plateSlots: { [key: number]: number };
};

export const DefaultDragger: Story<Props> = ({ plateSlots }) => {
  const defaultDraggerStore = useLocalObservable(() => new DefaultDraggerStore());

  useEffectOnUpdate(() => defaultDraggerStore.setPlateSlots(plateSlots), [
    defaultDraggerStore,
    plateSlots,
  ]);

  return (
    <Observer>
      {() => (
        <div className={style.wrapper}>
          <Dragger>
            <div className={style.innerWrapper}>
              {defaultDraggerStore.platePropsList.map((plateProps, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Slot key={i + 1} id={i + 1} Component={SlotView}>
                  <Plate
                    id={plateProps.id}
                    slotId={plateProps.slotId}
                    Component={PlateView}
                    onStartDrag={plateProps.onStartDrag}
                    onFinishDrag={plateProps.onFinishDrag}
                    onIntersectionIn={plateProps.onIntersectionIn}
                  />
                </Slot>
              ))}
            </div>
            <div className={style.innerWrapperSecond}>
              <Slot id={4} Component={SlotView} />
              <Slot id={5} Component={SlotView} />
              <Slot id={6} Component={SlotView} />
            </div>
          </Dragger>
        </div>
      )}
    </Observer>
  );
};

DefaultDragger.args = {
  plateSlots: {
    1: 1,
    2: 2,
    3: 3,
  },
};

export default {
  title: 'Components/Dragger Examples',
  component: DefaultDragger,
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;
