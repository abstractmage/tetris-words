import { makeAutoObservable } from 'mobx';
import { getOffset } from 'src/App/shared/getOffset';
import { Collection } from '../Collection';
import { Plate } from '../Plate';
import { Slot } from '../Slot';
import { IntersectionCalculator } from './IntersectionCalculator';
import { DragHandlerParams, Options } from './types';

export class DragOperator {
  private intersectionCalculators: IntersectionCalculator[] = [];

  plates: Collection<Plate>;

  slots: Collection<Slot>;

  get platesInDrag() {
    const plate = this.plates.items.filter((item) => item.inDrag);
    return plate;
  }

  get inDrag() {
    return !!this.platesInDrag;
  }

  constructor(options: Options) {
    makeAutoObservable(this, {}, { autoBind: true });

    this.plates = options.plates;
    this.slots = options.slots;
  }

  private assertDragStarted() {
    if (!this.inDrag) {
      throw new Error(`${this.constructor.name}: drag was not started`);
    }
  }

  startDrag({ event, data }: DragHandlerParams) {
    const currentPlate = this.plates.findByElement(data.element)!;
    const currentSlot = this.slots.findById(currentPlate.slotId)!;
    const offset = getOffset(currentSlot.element!, currentPlate.element!);

    const draggingPlates = currentPlate.group ? this.plates.items.filter((plate) => plate.group === currentPlate.group) : [currentPlate];

    draggingPlates.forEach((draggingPlate) => {
      this.intersectionCalculators.push(new IntersectionCalculator());
      const translate = { x: offset.left, y: offset.top };
      if (draggingPlate.centered) {
        const plateCoordinates = data.element.getBoundingClientRect();
        translate.x = data.point.x - plateCoordinates.x - plateCoordinates.width / 2;
        translate.y = data.point.y - plateCoordinates.y - plateCoordinates.height / 2;
      }
      draggingPlate.startDrag();
      draggingPlate.setTranslate(translate);
      draggingPlate.callbacks?.onStartDrag?.(event, data);
    });
  }

  moveDrag({ event, data }: DragHandlerParams) {
    this.assertDragStarted();

    this.platesInDrag.forEach((plateInDrag, i) => {
      plateInDrag.setTranslate({
        x: plateInDrag.translate.x + data.deltaPoint.x,
        y: plateInDrag.translate.y + data.deltaPoint.y,
      });
  
      plateInDrag.callbacks?.onMoveDrag?.(event, data);
  
      const { prev, current } = this.intersectionCalculators[i].calculateIntersectedElements(
        plateInDrag.intersectionElement!,
        this.slots.items.map((slot) => slot.intersectionElement!),
      );
  
      const intersectedSlot = current ? this.slots.items[current.index] : null;
      const prevIntersectedSlot = prev ? this.slots.items[prev.index] : null;
  
      if (!intersectedSlot && prevIntersectedSlot) {
        const intersectionData = {
          plateId: plateInDrag.id,
          slotId: prevIntersectedSlot.id,
        };
  
        plateInDrag.callbacks?.onIntersectionOut?.(intersectionData);
        prevIntersectedSlot.callbacks?.onIntersectionOut?.(intersectionData);
      } else if (intersectedSlot && !prevIntersectedSlot) {
        const intersectionData = {
          plateId: plateInDrag.id,
          slotId: intersectedSlot.id,
        };
  
        plateInDrag.callbacks?.onIntersectionIn?.(intersectionData);
        intersectedSlot.callbacks?.onIntersectionIn?.(intersectionData);
      } else if (
        intersectedSlot &&
        prevIntersectedSlot &&
        intersectedSlot.id !== prevIntersectedSlot.id
      ) {
        plateInDrag.callbacks?.onIntersectionOut?.({
          plateId: plateInDrag.id,
          slotId: prevIntersectedSlot.id,
        });
        prevIntersectedSlot.callbacks?.onIntersectionOut?.({
          plateId: plateInDrag.id,
          slotId: prevIntersectedSlot.id,
        });
  
        plateInDrag.callbacks?.onIntersectionIn?.({
          plateId: plateInDrag.id,
          slotId: intersectedSlot.id,
        });
        intersectedSlot.callbacks?.onIntersectionIn?.({
          plateId: plateInDrag.id,
          slotId: intersectedSlot.id,
        });
      }
    });
  }

  finishDrag({ event, data }: DragHandlerParams) {
    this.assertDragStarted();
    this.intersectionCalculators = [];
    this.platesInDrag.forEach((plateInDrag) => {
      plateInDrag.finishDrag();
      plateInDrag.callbacks?.onFinishDrag?.(event, data);
    });
  }
}
