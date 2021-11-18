import React from 'react';
import { useLocalObservable } from 'mobx-react';
import { DraggerStoreContext } from './context';
import { DraggerStore } from './store/DraggerStore';

export const Dragger: React.FC = (props) => {
  const { children } = props;
  const dragger = useLocalObservable(() => new DraggerStore());

  return <DraggerStoreContext.Provider value={dragger}>{children}</DraggerStoreContext.Provider>;
};
