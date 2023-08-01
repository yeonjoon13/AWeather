import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
    <App />
  </React.StrictMode>
);

