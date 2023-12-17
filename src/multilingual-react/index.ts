import React, { useContext, useState } from 'react';
import zh from '../assets/zh.json';
import en from '../assets/en.json';

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

interface Context<T, K extends string> {
  resources: T;
  assets: Record<keyof T, Record<K, string | number>>;
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
  const assets = Object.keys(options.resources).reduce((res, key: keyof T) => {
    res[key] = flattenObject(options.resources[key]) as Record<string, string | number>;
    return res;
  }, {} as Record<keyof T, Record<string, string | number>>);

  return React.createContext({ ...options, assets });
}

const Context = init({
  resources: {
    zh,
    en
  },
  lang: 'zh'
});

const useLang = () => {
  const context = useContext(Context);
  const [lang, setLang] = useState(context.lang);

  const t = (key: string) => {
    return context.assets[lang];
  };

  return {
    lang,
    t,
    setLang
  };
};
