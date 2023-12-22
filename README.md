## install

```bash
 pnmp install multilingual-react
```

## useage

```typescript
const zh = {
  hello: '你好',
  login: {
    login: '登录',
    welcome: '欢迎，{name}用户',
    level: 'Level{level}'
  }
};
const en = {
  hello: 'hello',
  login: {
    login: 'Login',
    welcome: 'Welcome,{name}用户',
    level: 'Level{level}'
  }
};
```

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
  const { t, setLang ,lang} = useLang();
  return (
    <>
      <div>current language: {lang}</div>
      <button onClick={()=>{setLang('zh')}}>zh</ button>
      <button onClick={()=>{setLang('en')}}>en</ button>
      <div>{t('hello')}</div>
    </>
  );
}

```
