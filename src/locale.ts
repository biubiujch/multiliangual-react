import { init } from './multilingual-react';
import zh from './assets/zh.json';
import en from './assets/en.json';

export const { Provider, useLang } = init({
  resources: { zh, en },
  lang: 'zh'
});
