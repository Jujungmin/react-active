import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 렌더링이 두 번 발생하는 이유 : React.StrictMode때문.
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);