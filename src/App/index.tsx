import { useLocalObservable } from 'mobx-react';
import { AppStore } from './store';
import { AppContext } from './store/context';
import { Main } from './components/Main';
import { StartPage } from './components/StartPage';
import './index.scss';
import './shared/styles/index.scss';

const { Provider } = AppContext;

export function App() {
  const appStore = useLocalObservable(() => new AppStore());
  return (
    <Provider value={appStore}>
      <Main>
        <StartPage />
      </Main>
    </Provider>
  );
};
