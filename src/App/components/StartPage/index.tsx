import { observer } from "mobx-react";
import { useAppContext } from "../../shared/useAppContext";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { PopupStartGame } from "src/App/components/PopupStartGame";

export const StartPage = observer(function StartPage() {
  const { handleGameStartClick, popupStartGame } = useAppContext();
  const navigate = useNavigate();

  const onClickStart = useCallback(() => {
    handleGameStartClick();
    navigate("game");
  }, [handleGameStartClick, navigate]);

  return (
    <div className={styles.main}>
      <PopupStartGame
        onClickSinglePlay={onClickStart}
        onClickMultiplPlay={popupStartGame.onClickMultiplePlay}
        onClickOutside={popupStartGame.onClickOutside}
      />
    </div>
  );
});