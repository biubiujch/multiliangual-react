import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import zh from './assets/zh.json';
import en from './assets/en.json';
import multilingual from './multilingual-react/core.ts';
import { MultilingualProvider } from './multilingual-react/provider.tsx';

multilingual.init({
  resources: {
    zh,
    en
  },
  lang: 'zh'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MultilingualProvider>
    <App />
  </MultilingualProvider>
);
