import React from 'react';
import { createRoot } from 'react-dom/client';
import Page1 from './Page1.jsx';
import './page1-styles.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Page1 />
  </React.StrictMode>
);

