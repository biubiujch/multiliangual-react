import { useLang } from './locale.ts';

function App() {
  const { t, setLang, lang } = useLang();

  return (
    <>
      <p>current lang:{lang}</p>
      <button onClick={() => setLang('en')}>EN</button>
      <button onClick={() => setLang('zh')}>ZH</button>
      <div>{t('hello')}</div>
      <div>{t('world')}</div>
      <div>{t('info.welcome', { name: '张三' })}</div>
    </>
  );
}

export default App;
