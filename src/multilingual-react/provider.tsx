import React, { ReactNode } from 'react';

interface Resources {
  [k: string]: number | string | Resources;
}

type Options<T extends Record<string, Resources>> = {
  resources: T;
  fallback?: keyof T;
};

interface MultilingualReact {
  options: Options<Record<string, Resources>>;
  init: <T extends Record<string, Resources>>(options: Options<T>) => JSX.Element;
  useLang: () => void;
}

export const MultilingualReact = {
  options: null,
  init<T extends Record<string, Resources>>(options: Options<T>) {
    const Multilang = React.createContext(options);
    return ({ children }: { children?: ReactNode }) => (
      <Multilang.Provider value={options}>{children}</Multilang.Provider>
    );
  }
};
