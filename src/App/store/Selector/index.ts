import { last } from 'lodash';
import { EventEmitter } from 'src/App/shared/EventEmitter';
import { Cell } from '../Cell';
import { Cube } from '../Cube';
import { eventNames as cubeEventNames } from '../Cube/constants';
import { eventNames } from './constants';
import { EventTypeMap } from './types';

export class Selector {
  private eventEmitter = new EventEmitter<EventTypeMap>();
  
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

  setCells(cells: Cell[]) {
    this.cells = cells;
  }

  startListening(cubes: Cube[], cells: Cell[]) {
    this.cubes = cubes;

    this.cubes.forEach((cube) => {
      cube.on(cubeEventNames.mousedown, () => {
        this.setSelectedCubes([...this.selectedCubes, cube]);
        this.removeCubeMouseDownListeners();
        this.startCubeMouseEnterListeners();
      });

      cube.on(cubeEventNames.mouseup, () => {
        this.setSelectedCubes([]);
        this.stopCubeMouseEnterListeners();
      });
    });
  }

  stopListening() {

  }

  private removeCubeMouseDownListeners() {
    this.cubes.forEach((cube) => cube.removeAllListeners(cubeEventNames.mousedown));
  }

  private startCubeMouseEnterListeners() {
    this.cubes.forEach((cube) => {
      cube.on(cubeEventNames.mouseenter, () => {
        const prevCube = this.selectedCubes.slice(-2)[0];
        const lastCube = last(this.selectedCubes)!;
        const prevCell = this.cells.find((_cell) => _cell.element === prevCube?.slot)
        const lastCell = this.cells.find((_cell) => _cell.element === lastCube.slot)!;
        const neighborCells = this.getNeighborCells(lastCell);
        const nextNeighborCell = neighborCells.find((cell) => cell === lastCell);

        if (!nextNeighborCell) return;

        if (nextNeighborCell === prevCell) {
          this.setSelectedCubes(this.selectedCubes.filter((cube) => cube !== lastCube));
        } else {
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
    this._selectedCubes.splice(0, 0, ...cubes);
    this.eventEmitter.emit(eventNames.selectedCubesUpdated, {
      selectedCubes: this.selectedCubes,
    });
  }
}
