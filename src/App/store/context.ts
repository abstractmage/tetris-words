import { createContext } from 'react';
import { AppStore } from '.';

export const AppContext = createContext<AppStore | null>(null);
AppContext.displayName = 'AppContext';