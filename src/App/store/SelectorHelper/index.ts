import { last } from 'lodash';
import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Nullable } from 'src/App/types';
import { Cell } from '../Cell';
import { Cube } from '../Cube';
import { eventNames as cubeEventNames } from '../Cube/constants';
import { Field } from '../Field';
import { eventNames as fieldEventNames } from '../Field/constants';
import { eventNames } from './constants';
import { EventTypeMap } from './types';

export class SelectorHelper {
  private eventEmitter = new EventEmitter<EventTypeMap>();

  private field: Nullable<Field> = null;
  
  private cells: Cell[] = [];
  
  private cubes: Cube[] = [];

  private _selectedCubes: Cube[] = [];

  get selectedCubes() {
    return this._selectedCubes;
  }

  on<T extends keyof EventTypeMap>(eventType: T, handler: EventTypeMap[T]) {
    this.eventEmitter.on(eventType, handler);
  }

  once<T extends keyof EventTypeMap>(eventType: T, handler: EventTypeMap[T]) {
    this.eventEmitter.on(eventType, handler);
  }

  off<T extends keyof EventTypeMap>(eventType: T, handler: EventTypeMap[T]) {
    this.eventEmitter.off(eventType, handler);
  }

  removeAllListeners<T extends keyof EventTypeMap>(eventType?: T) {
    this.eventEmitter.removeAllListeners(eventType);
  }

  startListening(options: {
    cubes: Cube[];
    cells: Cell[];
    field: Field;
  }) {
    this.cubes = options.cubes;
    this.cells = options.cells;
    this.field = options.field;
    this.startCubeMouseDownListeners();
  }

  stopListening() {
    this.stopCubeMouseDownListeners();
    this.stopCubeMouseEnterListeners();
    this.stopFieldMouseUpListener();
  }

  private startCubeMouseDownListeners() {
    this.cubes.forEach((cube) => {
      cube.on(cubeEventNames.mousedown, () => {
        this.setSelectedCubes([cube]);
        this.stopCubeMouseDownListeners();
        this.startCubeMouseEnterListeners();
        this.startFieldMouseUpListener();
      });
    });
  }

  private stopCubeMouseDownListeners() {
    this.cubes.forEach((cube) => cube.removeAllListeners(cubeEventNames.mousedown));
  }

  private startFieldMouseUpListener() {
    if (this.field) {
      this.field.on(fieldEventNames.mouseup, () => {
        this.stopCubeMouseEnterListeners();
        this.stopFieldMouseUpListener();
        this.startCubeMouseDownListeners();
      });
    }
  }

  private stopFieldMouseUpListener() {
    if (this.field) {
      this.field.removeAllListeners(fieldEventNames.mouseup);
    }
  }

  private startCubeMouseEnterListeners() {
    this.cubes.forEach((cube) => {
      cube.on(cubeEventNames.mouseenter, () => {
        const currentCell = this.cells.find((cell) => cell.uid === cube.slotId)!;
        const prevCube = this.selectedCubes.slice(-2)[0];
        const lastCube = last(this.selectedCubes)!;
        const prevCell = this.cells.find((_cell) => _cell.uid === prevCube?.slotId)
        const lastCell = this.cells.find((_cell) => _cell.uid === lastCube.slotId)!;
        const neighborCells = this.getNeighborCells(lastCell);
        const nextNeighborCell = neighborCells.find((cell) => cell === currentCell);


        if (!nextNeighborCell) return;

        if (nextNeighborCell === prevCell) {
          console.log(1);
          this.setSelectedCubes(this.selectedCubes.filter((cube) => cube !== lastCube));
        } else {
          console.log(this.selectedCubes, cube);
          this.setSelectedCubes([...this.selectedCubes, cube]);
        }
      });
    });
  }

  private stopCubeMouseEnterListeners() {
    this.cubes.forEach((cube) => {
      cube.removeAllListeners(cubeEventNames.mouseenter);
    });
  }

  private getNeighborCells(cell: Cell) {
    return this.cells.filter((_cell) =>
      (_cell.point.x === cell.point.x - 1 && _cell.point.y === cell.point.y) ||
      (_cell.point.x === cell.point.x && _cell.point.y === cell.point.y - 1) ||
      (_cell.point.x === cell.point.x + 1 && _cell.point.y === cell.point.y) ||
      (_cell.point.x === cell.point.x && _cell.point.y === cell.point.y + 1)
    );
  }

  private setSelectedCubes(cubes: Cube[]) {
    this._selectedCubes = cubes;
    this.eventEmitter.emit(eventNames.selectedCubesUpdated, {
      selectedCubes: this.selectedCubes,
    });
  }
}
