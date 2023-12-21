## install

```bash
 pnmp install multilingual-react
```

## useage

```typescript
import { init } from 'multilingual-react';
// your resource json file path
import zh from '/path';
import en from './path';

export const { Provider, useLang } = init({
  resources: { zh, en },
  lang: 'zh'
});
```

```JSX

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
);

```

```JSX

function App() {
  const { t, setLang } = useLang();
  return (
    <>
      <div>{t('hello')}</div>
    </>
  );
}

```
