import './style.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/app.component';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);
