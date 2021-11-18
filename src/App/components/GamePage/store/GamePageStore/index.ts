import { makeAutoObservable } from 'mobx';
import { chunk, compact, flatten, range, sample, uniq, uniqueId } from 'lodash';
import { Cube } from 'src/App/store/Cube';
import { Field } from 'src/App/store/Field';
import { russianAlphabet } from 'src/App/store/ProgressController/constants';
import { eventNames as cubeEventNames } from 'src/App/store/Cube/constants';

export class GamePageStore {
  private _tapeSlots = range(20).map(() => ({
    uid: uniqueId(),
  }));

  private _cubes: Cube[] = flatten([
    this.generateFigureCubes(0),
    this.generateFigureCubes(1),
    this.generateFigureCubes(2),
    this.generateFigureCubes(3),
  ]);

  private _field = new Field();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._cubes.forEach((cube) => this.startDragListeners(cube));
  }

  get tapeSlots() {
    return this._tapeSlots;
  }

  get field() {
    return this._field;
  }

  get cubes() {
    return this._cubes;
  }

  private generateFigureCubes(targetTapeSlotChunkIndex: number) {
    const type = sample([1, 2, 3]);
    const length = type === 1 ? 1 : 2;
    const letters = range(length).map(() => sample(russianAlphabet)!.toUpperCase());
    const targetTapeSlotChunk = chunk(this.tapeSlots, 5)[targetTapeSlotChunkIndex];
    const figureGroup = uniqueId();

    let targetTapeSlots = [targetTapeSlotChunk[0]];
    if (type === 2) targetTapeSlots = [targetTapeSlotChunk[1], targetTapeSlotChunk[2]];
    if (type === 3) targetTapeSlots = [targetTapeSlotChunk[3], targetTapeSlotChunk[4]];

    const cubes = letters.map((letter, i) => {
      const cube = new Cube({ letter, slotId: targetTapeSlots[i].uid, group: figureGroup });
      return cube;
    });

    return cubes;
  }

  private startDragListeners(cube: Cube) {
    const groupCubes = this._cubes.filter((_cube) => _cube.group === cube.group);

    cube.setDragListening(true);
    
    cube.on(cubeEventNames.intersectionIn, (data) => {
      cube.setIntersectedSlotId(data.slotId);
      const intersectedEmptyCells = uniq(compact(groupCubes.map((cube) => this.field.cells.find((cell) => cell.uid === cube.intersectedSlotId && cell.cubeId === null))));

      if (intersectedEmptyCells.length === groupCubes.length) {
        intersectedEmptyCells.forEach((cell) => cell.setHovered(true));
      } else {
        intersectedEmptyCells.forEach((cell) => cell.setHovered(false));
      }
    });

    cube.on(cubeEventNames.intersectionOut, () => {
      groupCubes.forEach((cube) => {
        const intersectedCell = this.field.cells.find((cell) => cell.uid === cube.intersectedSlotId);
        intersectedCell?.setHovered(false);
      });
      cube.setIntersectedSlotId(null);
    });

    cube.on(cubeEventNames.finishDrag, () => {
      const intersectedCells = uniq(compact(groupCubes.map((cube) => {
        const cell = this.field.cells.find((cell) => cell.uid === cube.intersectedSlotId);
        return cell;
      })));
      const allIntersectedCellsAreEmpty = intersectedCells.every((cell) => cell.cubeId === null);

      if (intersectedCells.length === groupCubes.length && allIntersectedCellsAreEmpty) {
        groupCubes.forEach((cube, i) => {
          intersectedCells[i]?.setCubeId(cube.uid);
          cube.setSlotId(cube.intersectedSlotId!);
          cube.setIntersectedSlotId(null);
          this.stopDragListeners(cube);
        });
      } else {
        groupCubes.forEach((cube, i) => {
          intersectedCells[i]?.setCubeId(null);
          cube.setIntersectedSlotId(null);
        })
      }
    });
  }

  private stopDragListeners(cube: Cube) {
    cube.setDragListening(false);
    cube.removeAllListeners(cubeEventNames.intersectionIn);
    cube.removeAllListeners(cubeEventNames.intersectionOut);
    cube.removeAllListeners(cubeEventNames.finishDrag);
  }
}
