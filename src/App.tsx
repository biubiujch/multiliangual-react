import { useLang } from './locale.ts';

function App() {
  const { t, setLang } = useLang();
  return (
    <>
      <button onClick={() => setLang('en')}>EN</button>
      <button onClick={() => setLang('zh')}>ZH</button>
      <div>{t('hello')}</div>
      <div>{t('world')}</div>
    </>
  );
}

export default App;
