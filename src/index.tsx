import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import Notes from './pages/Notes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Notes />
  </React.StrictMode>
);
