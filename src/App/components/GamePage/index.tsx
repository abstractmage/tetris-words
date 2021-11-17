import { observer } from "mobx-react";
// import { useAppContext } from '../../shared/useAppContext';
import styles from "./index.module.scss";
import { Field } from "../Field";
import { Cell } from "../Cell";
// import { Popup } from "../Popup";
// import { Fade } from "../Fade";


export const GamePage = observer(function GamePage() {
  // const {} = useAppContext();


  return (
    <div className={styles.main}>
      <div className={styles.progressContainer}>ProgressContainer</div>
      <div className={styles.fieldContainer}>
        <Field>
          {Array.from(Array(100).keys()).map((idx) => {
            return <Cell key={idx} isFilled={false} isHovered={false} />;
          })}
        </Field>
      </div>
      <div className={styles.tapeContainer}>tapeContainer</div>

      {/* <Fade shown={isVisiblePopup} positonAbsolute>
        <Popup />
      </Fade> */}
    </div>
  );
});
