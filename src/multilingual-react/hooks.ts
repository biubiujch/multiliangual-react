import { useCallback, useContext, useState } from 'react';
import MultiliangualReact from './core';

export const useLang = () => {
  const context = useContext(MultiliangualReact.Context);

  const [lang, setLang] = useState(context.lang);

  const t = useCallback(
    (key: string) => {
      try {
        return context.resources[lang][key];
      } catch (e) {
        return key;
      }
    },
    [lang]
  );

  return {
    lang,
    setLang,
    t
  };
};
