import { useContext } from 'react';
import { AppStore } from '../store';
import { AppContext } from '../store/context';

export const useAppContext = (): AppStore => {
  const context = useContext(AppContext);
  if (context === null) {
    throw new Error('Hook must be called inside AppStore.Provider');
  }
  return context;
};