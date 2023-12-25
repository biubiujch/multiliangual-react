import { useCallback, useEffect, useMemo, useState } from 'react';

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
  const value = { lang, assets };

  const callbacks: Set<(lang: keyof T, ...args: any[]) => void> = new Set();

  const sub = (fn: (lang: keyof T, ...args: any[]) => void) => {
    callbacks.add(fn);
  };

  const remove = (fn: (lang: keyof T, ...args: any[]) => void) => {
    callbacks.delete(fn);
  };

  const setLang = (lang: keyof T) => {
    value.lang = lang;
    callbacks.forEach((fn) => fn(lang));
  };

  const getLang = () => value.lang;

  const translate = (key: TextKeys, replace?: Record<string, string | number>) => {
    if (!value.assets[getLang()]) return key;
    if (value.assets[getLang()][key] === undefined || value.assets[getLang()][key] === null) return key;
    if (replace) {
      const text = value.assets[getLang()][key];
      if (text && typeof text === 'string') {
        return text.replace(/\{(\w+)\}/g, (match: string, replaceKey: string) => {
          const value = replace[replaceKey] as string;
          return value !== undefined ? value : match;
        });
      }
    } else {
      return value.assets[getLang()][key];
    }
  };

  const useLang = () => {
    const [lang, setL] = useState(value.lang);

    useEffect(() => {
      sub(setL);
      return () => remove(setL);
    }, []);

    const Texts = useMemo(() => {
      return value.assets[lang];
    }, [lang]);

    type TextKeys = keyof typeof Texts;

    const t = useCallback(
      (key: TextKeys, replace?: Record<string, string | number>) => {
        if (!value.assets[lang]) return key;
        if (value.assets[lang][key] === undefined || value.assets[lang][key] === null) return key;
        if (replace) {
          const text = value.assets[lang][key];
          if (text && typeof text === 'string') {
            return text.replace(/\{(\w+)\}/g, (match: string, replaceKey: string) => {
              const value = replace[replaceKey] as string;
              return value !== undefined ? value : match;
            });
          }
        } else {
          return value.assets[lang][key];
        }
      },
      [lang]
    );

    return {
      lang,
      t,
      setLang: (lang: keyof T) => {
        setL(lang);
        value.lang = lang;
      }
    };
  };

  return {
    useLang,
    setLang,
    getLang,
    translate
  };
}
