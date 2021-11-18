import React from 'react';
import { observer, useLocalObservable } from "mobx-react";
import { chunk } from 'lodash';
import cn from 'classnames';
import { Field } from "../Field";
import { Cell } from "../Cell";
import { Tape } from "../Tape";
import styles from "./index.module.scss";
import { ScoreCounter } from "../ScoreCounter";
import { BackButton } from "../BackButton";
import { Cube } from '../Cube';
import { Div } from '../Div';
import { Dragger } from '../Dragger';
import { Slot as DraggerSlot } from '../Dragger/components/Slot';
import { Plate as DraggerPlate } from '../Dragger/components/Plate';
import { GamePageStore } from './store/GamePageStore';
import { Fade } from '../Fade';
import { FullSizeBlock } from '../FullSizeBlock';

export const GamePage = observer(function GamePage() {
  const store = useLocalObservable(() => new GamePageStore());
  const tapeSlots = React.useMemo(() => chunk(store.tapeSlots, 5), [store.tapeSlots]);

  return (
    <Dragger>
      <div className={styles.main}>
        <div className={styles.progressContainer}>
          <div className={styles.scoreCounterContainer}>
            <ScoreCounter scores={store.progressController.scores}/>
          </div>
        </div>
        <div className={styles.backButtonContainer}>
          <BackButton />
          </div>
        <div className={styles.fieldContainer}>
          <Field onMouseUp={store.field.handleMouseUp}>
            {store.field.cells.map((cell) => {
              return <DraggerSlot key={cell.uid} id={cell.uid} Component={Cell} isHovered={cell.hovered}>
              </DraggerSlot>;
            })}
          </Field>
        </div>
        <Tape>
          {tapeSlots.map((tapeSlots, i) => (
            <div key={i} className={styles.tapeSlotsWrap}>
              {tapeSlots.map((tapeSlot, i) => (
                <DraggerSlot
                  key={tapeSlot.uid}
                  id={tapeSlot.uid}
                  Component={Div}
                  className={cn(styles.tapeSlot, styles[`tapeSlot_position_${i + 1}`])}
                />
              ))}
            </div>
          ))}
          {store.cubes.map((cube) => (
            <DraggerPlate
              key={cube.uid}
              id={cube.uid}
              disabled={!cube.dragListening}
              slotId={cube.slotId}
              group={cube.group}
              Component={FullSizeBlock}
              afterDragMovingDuration={200}
              componentProps={{
                className: styles.cube,
                children: (
                  <Fade
                    duration={200}
                    shown={cube.fade.shown}
                    onShowingEnd={cube.fade.finishShownAnimating}
                  >
                    <Cube
                      color={cube.color}
                      selected={cube.selected}
                      children={cube.letter}
                      onMouseDown={cube.handleMouseDown}
                      onMouseEnter={cube.handleMouseEnter}
                      onMouseUp={cube.handleMouseUp}
                    />
                  </Fade>
                ),
              }}
              onIntersectionIn={cube.handleIntersectionIn}
              onIntersectionOut={cube.handleIntersectionOut}
              onFinishDrag={cube.handleFinishDrag}
            />
          ))}
        </Tape>
      </div>
    </Dragger>
  );
});
