import { omit } from 'lodash';
import { makeAutoObservable } from 'mobx';
import { DraggableEvent } from 'react-draggable';
import { Nullable } from 'src/App/types';
import { DraggableData, DraggableProps } from '../../types';
import { EventManager } from '../EventManager';
import { Params } from './types';

export class DraggableStore<P> {
  private props!: DraggableProps<P>;

  private element: Nullable<HTMLElement> = null;

  private eventManager: Nullable<EventManager> = null;

  get draggableProps() {
    return {
      ...omit(this.props, ['Component', 'onStartDrag', 'onMoveDrag', 'onFinishDrag']),
    };
  }

  constructor(params: Params<P>) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.setProps(params.props);
  }

  private handleStartDrag(event: DraggableEvent, data: DraggableData) {
    this.props.onStartDrag?.(event, data);
  }

  private handleMoveDrag(event: DraggableEvent, data: DraggableData) {
    this.props.onMoveDrag?.(event, data);
  }

  private handleFinishDrag(event: DraggableEvent, data: DraggableData) {
    this.props.onFinishDrag?.(event, data);
  }

  setElement(element: HTMLElement) {
    this.element = element;

    if (this.eventManager) {
      this.eventManager.updateElement(element);
    } else {
      this.eventManager = new EventManager({
        element,
        onStartDrag: this.handleStartDrag,
        onMoveDrag: this.handleMoveDrag,
        onFinishDrag: this.handleFinishDrag,
      });
    }
  }

  setProps(props: DraggableProps<P>) {
    this.props = props;
  }

  clear() {
    this.eventManager?.clear();
  }
}
