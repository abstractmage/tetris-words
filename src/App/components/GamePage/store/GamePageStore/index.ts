import { makeAutoObservable } from 'mobx';
import { chunk, compact, difference, flatten, range, sample, uniq, uniqueId } from 'lodash';
import { Cube } from 'src/App/store/Cube';
import { Field } from 'src/App/store/Field';
import { letterScoreDistributions } from 'src/App/store/ProgressController/constants';
import { eventNames as cubeEventNames } from 'src/App/store/Cube/constants';
import { SelectorHelper } from 'src/App/store/SelectorHelper';
import { eventNames as selectorHelperEventNames } from 'src/App/store/SelectorHelper/constants';
import { ProgressController } from 'src/App/store/ProgressController';
import { russianWords } from 'src/App/constants';
import { colors } from 'src/App/components/Cube/constants';

export class GamePageStore {
  progressController = new ProgressController();

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

  private selectorHelper = new SelectorHelper();

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this._cubes.forEach((cube) => this.startDragListeners(cube));
    this.selectorHelper.on(
      selectorHelperEventNames.selectedCubesUpdated,
      ({ selectedCubes }) => {
        this._cubes.forEach((cube) => cube.setSelected(false));
        selectedCubes.forEach((cube) => cube.setSelected(true));
      },
    );
    this.selectorHelper.on(selectorHelperEventNames.selectionEnd, ({ selectedCubes }) => {
      const word = selectedCubes.map((cube) => cube.letter).join('').toLowerCase();
      const found = russianWords.find((w) => w === word);

      if (found) {
        this.progressController.collectWord(word);
        Promise.all(selectedCubes.map((cube) => cube.fade.hide())).then(() => {
          const selectedCells = compact(selectedCubes.map((cube) => this.field.cells.find((cell) => cell.uid === cube.slotId)));
          selectedCells.forEach((cell) => cell.setCubeId(null));
          this.setCubes(difference(this._cubes, selectedCubes));
        });
      } else {
        selectedCubes.forEach((cube) => cube.setSelected(false));
      }
    });
    console.log(this);
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

  private getTapeSlotChunkIndexByTapeSlotUid(tapeSlotUid: string | number ) {
    return chunk(this.tapeSlots, 5).findIndex((chunk) => chunk.find((tapeSlot) => tapeSlot.uid === tapeSlotUid));
  }

  private generateFigureCubes(targetTapeSlotChunkIndex: number) {
    const type = sample([1, 2, 3]);
    const length = type === 1 ? 1 : 2;
    const lettersData = range(length).map(() => sample(letterScoreDistributions.rus)!);
    const targetTapeSlotChunk = chunk(this.tapeSlots, 5)[targetTapeSlotChunkIndex];
    const figureGroup = uniqueId();

    let targetTapeSlots = [targetTapeSlotChunk[0]];
    if (type === 2) targetTapeSlots = [targetTapeSlotChunk[1], targetTapeSlotChunk[2]];
    if (type === 3) targetTapeSlots = [targetTapeSlotChunk[3], targetTapeSlotChunk[4]];

    const cubes = lettersData.map((letterData, i) => {
      let color = colors['#FF7B1C'];

      if (letterData.score === 2) color = colors['#545AEF'];
      if (letterData.score === 3) color = colors['#0ABA9A'];
      if (letterData.score === 4) color = colors['#FFDC27'];
      if (letterData.score === 5) color = colors['#A258FF'];
      if (letterData.score === 8) color = colors['#18C2E8'];
      if (letterData.score === 10) color = colors['#D73A8F'];
      
      return new Cube({
        letter: letterData.letter.toUpperCase(),
        slotId:
        targetTapeSlots[i].uid,
        group: figureGroup,
        color,
      });
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
        const tapeSlotChunkIndex = this.getTapeSlotChunkIndexByTapeSlotUid(cube.slotId);

        groupCubes.forEach((cube, i) => {
          intersectedCells[i]?.setCubeId(cube.uid);
          intersectedCells[i]?.setHovered(false);
          cube.setSlotId(cube.intersectedSlotId!);
          cube.setIntersectedSlotId(null);
          this.stopDragListeners(cube);
        });

        this.selectorHelper.startListening({
          cubes: this._cubes.filter((cube) => !cube.dragListening),
          field: this._field,
        });

        const newCubes = this.generateFigureCubes(tapeSlotChunkIndex);
        newCubes.forEach((cube) => cube.fade.hideInstantly());
        this._cubes = [...this._cubes, ...newCubes];
        newCubes.forEach((newCube) => this.startDragListeners(newCube));
        Promise.resolve().then(() => newCubes.forEach((cube) => cube.fade.show()));
      } else {
        groupCubes.forEach((cube, i) => {
          intersectedCells[i]?.setCubeId(null);
          cube.setIntersectedSlotId(null);
        });
      }
    });
  }

  private stopDragListeners(cube: Cube) {
    cube.setDragListening(false);
    cube.removeAllListeners(cubeEventNames.intersectionIn);
    cube.removeAllListeners(cubeEventNames.intersectionOut);
    cube.removeAllListeners(cubeEventNames.finishDrag);
  }

  private setCubes(cubes: Cube[]) {
    this._cubes = cubes;
  }
}
