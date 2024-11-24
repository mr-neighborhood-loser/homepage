import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // スタイルを適用する場合

// React 18 以降の新しいレンダリングAPIを使用
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
