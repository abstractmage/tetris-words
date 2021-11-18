import { makeAutoObservable, observable } from 'mobx';
import { omit } from 'lodash';
import { Plate as PlateModel } from '../../../../store/Plate';
import { DefaultPlateComponentProps, PlateProps } from '../../types';
import { Params } from './types';
import { Reaction } from 'src/App/shared/Reaction';
import { DraggerStore } from 'src/App/components/Dragger/store/DraggerStore';
import { Nullable } from 'src/App/types';
import { DraggableEventHandler } from 'src/App/components/Draggable/types';

export class PlateStore<P extends DefaultPlateComponentProps> {
  private props!: PlateProps<P>;

  private reactions = {
    slotId: new Reaction({
      expression: () => this.props.slotId,
      handler: (slotId) => this.model.setSlotId(slotId),
    }),
    callbacks: new Reaction({
      expression: () => {
        const { props } = this;
        return {
          onAfterDragMoving: props.onAfterDragMoving,
          onAfterDragMovingEnd: props.onAfterDragMovingEnd,
          onStartDrag: props.onStartDrag,
          onMoveDrag: props.onMoveDrag,
          onFinishDrag: props.onFinishDrag,
          onIntersectionIn: props.onIntersectionIn,
          onIntersectionOut: props.onIntersectionOut,
        };
      },
      handler: (callbacks) => {
        this.model.setCallbacks(callbacks);
      },
    }),
  };

  dragger: DraggerStore;

  element: Nullable<HTMLElement> = null;

  get model() {
    return this.dragger.plates.findById(this.props.id)!;
  }

  get slot() {
    return this.dragger.slots.findById(this.model.slotId);
  }

  get draggableProps() {
    const onStartDrag: DraggableEventHandler = (event, data) => {
      this.dragger.operator.startDrag({ event, data });
    };

    const onMoveDrag: DraggableEventHandler = (event, data) => {
      this.dragger.operator.moveDrag({ event, data });
    };

    const onFinishDrag: DraggableEventHandler = (event, data) => {
      this.dragger.operator.finishDrag({ event, data });
    };

    return {
      onStartDrag,
      onMoveDrag,
      onFinishDrag,
    };
  }

  get elementMoverProps() {
    return {
      Component: this.props.Component,
      anchor: this.slot?.currentElement,
      translate: this.model.translate,
      bounded: this.props.state === 'default' ? !this.model.inDrag : this.props.state === 'bounded',
      duration: this.props.afterDragMovingDuration ?? 500,
      withAnimation: this.props.withMovingAfterDrag ?? true,
      easing: this.props.afterDragMovingEasing ?? 'easeInOutQuad',
      calculationHelper: this.props.afterDragMovingPositionCalculationHelper,
      onMoving: this.props.onAfterDragMoving,
      onMovingEnd: this.props.onAfterDragMovingEnd,
      ...omit(this.props, [
        'style',
        'Component',
        'id',
        'slotId',
        'withMovingAfterDrag',
        'afterDragMovingDuration',
        'afterDragMovingEasing',
        'afterDragMovingPositionCalculationHelper',
        'onAfterDragMoving',
        'onAfterDragMovingEnd',
        'onStartDrag',
        'onMoveDrag',
        'onFinishDrag',
        'onIntersectionIn',
        'onIntersectionOut',
      ]),
    };
  }

  constructor(params: Params<P>) {
    makeAutoObservable<PlateStore<P>, 'props'>(
      this,
      { props: observable.shallow },
      { autoBind: true },
    );

    this.initReactions();

    this.setProps(params.props);
    this.element = params.element;
    this.dragger = params.dragger;

    this.dragger.plates.add(
      new PlateModel({
        id: this.props.id,
        slotId: this.props.slotId,
        centered: this.props.centered,
        group: this.props.group,
        intersectionSelector: this.props.intersectionSelector,
        callbacks: {
          onAfterDragMoving: this.props.onAfterDragMoving,
          onAfterDragMovingEnd: this.props.onAfterDragMovingEnd,
          onStartDrag: (e, data) => {
            if (this.props.disabled) return;
            this.props.onStartDrag?.(e, data);
          },
          onMoveDrag: this.props.onMoveDrag,
          onFinishDrag: this.props.onFinishDrag,
          onIntersectionIn: this.props.onIntersectionIn,
          onIntersectionOut: this.props.onIntersectionOut,
        },
      }),
    );
  }

  private initReactions() {
    Object.values(this.reactions).forEach((reaction) => reaction.init());
  }

  setProps(props: PlateProps<P>) {
    this.props = props;
    this.props.state = this.props.state ?? 'default';
    this.props.disabled = this.props.disabled ?? false;
  }

  setElement(element: HTMLElement) {
    this.element = element;
    this.model.setElement(element);
  }

  clear() {
    Object.values(this.reactions).forEach((reaction) => reaction.dispose());
  }
}
