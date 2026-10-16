import React from 'react';
import ReactDOM from 'react-dom/client';
import './src/index.css';
import AppV2 from './AppV2';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppV2 />
  </React.StrictMode>
);
