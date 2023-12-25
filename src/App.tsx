import { useState } from 'react';
import Locale, { handlePrint } from './locale.ts';
const Hello = () => {
  const { t, setLang, lang } = Locale.useLang();

  return (
    <div>
      <button onClick={() => Locale.setLang('en')}>EN</button>
      <button onClick={() => setLang('zh')}>ZH</button>
      <div>{t('hello')}</div>
    </div>
  );
};

function App() {
  const { t, setLang, lang } = Locale.useLang();
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(!show)}> hiden Hello?</button>
      <button onClick={handlePrint}>nodeenv</button>
      <p>
        current lang:{lang}
        locale: {Locale.getLang()}
      </p>
      <button onClick={() => Locale.setLang('en')}>EN</button>
      <button onClick={() => setLang('zh')}>ZH</button>
      {show && <Hello />}
      <div>{Locale.translate('info.welcome', { name: 'Bob' })}</div>
    </>
  );
}

export default App;
