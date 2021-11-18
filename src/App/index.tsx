import { observer, useLocalObservable } from "mobx-react";
import { AppStore } from "./store";
import { AppContext } from "./store/context";
import { GamePage } from "./components/GamePage";
import { StartPage } from "./components/StartPage";
import "./index.scss";
import "./shared/styles/index.scss";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Main } from "./components/Main";

const { Provider } = AppContext;

export const App = observer(function App() {
  const appStore = useLocalObservable(() => new AppStore());
  return (
    <Provider value={appStore}>
      <BrowserRouter basename={"/tetris-words"}>
        <Main>
          <Routes>
            <Route path="/" element={<StartPage />} />
            {appStore.isVisibleGamePage && (
              <Route path="/game" element={<GamePage />} />
            )}
            <Route path="/game" element={<Navigate to="/" />} />
          </Routes>
        </Main>
      </BrowserRouter>
    </Provider>
  );
});
