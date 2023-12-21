import React, { ReactNode, useContext, useMemo, useState } from 'react';

type FlatObject = {
  [key: string]: string | number | FlatObject;
};

type FlattenKeys<T> = T extends object
  ? { [K in keyof T & string]: T[K] extends object ? `${K & string}.${FlattenKeys<T[K]>}` : `${K & string}` }[keyof T &
      string]
  : '';

interface Options<T> {
  resources: T;
  lang: keyof T;
}

function flattenObject(obj: Record<string, any>, parentKey = ''): FlatObject {
  return Object.keys(obj).reduce((result: FlatObject, key: string) => {
    const fullKey = parentKey ? `${parentKey}.${key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null) {
      const flattened = flattenObject(obj[key], fullKey);
      Object.assign(result, flattened);
    } else {
      result[fullKey] = obj[key];
    }

    return result;
  }, {});
}

export function init<T extends Record<string, any>>(options: Options<T>) {
  const { lang, resources } = options;

  const text = resources[lang];
  type TextKeys = FlattenKeys<typeof text>;

  const assets = Object.keys(resources).reduce((res, key: keyof T) => {
    res[key] = flattenObject(options.resources[key]) as Record<string, string | number>;
    return res;
  }, {} as Record<keyof T, Record<TextKeys, string | number>>);

  const Context = React.createContext({ lang, assets });

  const useLang = () => {
    const context = useContext(Context);
    const [lang, setLang] = useState(context.lang);

    const Texts = useMemo(() => {
      return context.assets[lang];
    }, [lang]);

    type TextKeys = keyof typeof Texts;

    const t = (key: TextKeys) => {
      return context.assets[lang][key];
    };

    return {
      lang,
      t,
      setLang
    };
  };

  return {
    Provider: ({ children }: { children?: ReactNode }) => (
      <Context.Provider value={{ lang, assets }}>{children}</Context.Provider>
    ),
    useLang
  };
}
