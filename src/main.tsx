import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { MultilingualReact } from './multilingual-react/provider';
import zh from './assets/zh.json';
import en from './assets/en.json';

const Provider = MultilingualReact.init({
  resources: {
    zh,
    en
  },
  fallback: 'zh'
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider>
    <App />
  </Provider>
);
