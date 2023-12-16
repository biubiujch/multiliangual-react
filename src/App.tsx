import { useLang } from './multilingual-react/hooks';

function App() {
  const { t, lang, setLang } = useLang();

  return (
    <>
      <button onClick={() => setLang('zh')}>EN</button>
      <button onClick={() => setLang('en')}>ZH</button>
      <p>current:{lang}</p>
      <div>{t('hello')}</div>
    </>
  );
}

export default App;
