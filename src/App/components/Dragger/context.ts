import React from 'react';
import { DraggerStore } from './store/DraggerStore';

export const DraggerStoreContext = React.createContext<DraggerStore | null>(null);

export const useDraggerStoreContext = () => {
  const draggerStore = React.useContext(DraggerStoreContext);

  if (!draggerStore) {
    throw new Error('DraggerStoreContext value was not provided');
  }

  return draggerStore;
};
