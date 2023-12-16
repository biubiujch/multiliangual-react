import { ReactNode } from 'react';
import MultilingualReact from './core';

export const MultilingualProvider = ({ children }: { children?: ReactNode }) => {
  if (MultilingualReact.Context && MultilingualReact.options) {
    return (
      <MultilingualReact.Context.Provider value={MultilingualReact.options}>
        {children}
      </MultilingualReact.Context.Provider>
    );
  } else {
    return children;
  }
};
