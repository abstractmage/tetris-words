import React from 'react';
import { PlateStore } from './store/PlateStore';

export const PlateStoreContext = React.createContext<PlateStore<any> | null>(null);

export const usePlateStoreContext = <P extends Object>() => {
  const plateStore = React.useContext(PlateStoreContext);

  if (!plateStore) {
    throw new Error('PlateStoreContext values was not provided');
  }

  return plateStore as PlateStore<P>;
};
