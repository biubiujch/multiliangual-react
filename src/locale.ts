import { init } from './multilingual-react';
import zh from './assets/zh.json';
import en from './assets/en.json';

const locale = init({
  resources: { zh, en },
  lang: 'zh'
});

export default locale;

export const handlePrint = () => {
  console.log(locale.translate('hello'));
  setTimeout(() => locale.setLang(locale.getLang() === 'en' ? 'zh' : 'en'), 3000);
};
