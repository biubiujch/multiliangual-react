## install

```bash
 npm install multilingual-react
```

## useage

```typescript
const zh = {
  hello: '你好',
  login: {
    login: '登录',
    welcome: '欢迎，{name}',
    level: 'Level{level}'
  },
  error: '网络连接异常',
  ok: '查询成功'
};
const en = {
  hello: 'hello',
  login: {
    login: 'Login',
    welcome: 'Welcome,{name}',
    level: 'Level{level}'
  },
  error: 'Network connection abnormality',
  ok: 'OK'
};
```

```typescript
import { init } from 'multilingual-react';
// your resource json file path
import zh from '/path';
import en from './path';

export const { setLang, getLang, translate, useLang } = init({
  resources: { zh, en },
  lang: 'zh'
});
```

```typescript
// ...
const lang = getLang();
setLang(lang === 'zh' ? 'en' : 'zh');

fetch().then((data) => {
 console.log(translate('ok');)
}).catch((e)=>{
   console.error(translate('error');)
});
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
      <div>{t('welcome',{name:"Bob"})}</div>
    </>
  );
}

```
