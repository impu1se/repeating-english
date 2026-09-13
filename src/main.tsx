import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

// registerType: 'prompt' без баннера: новый воркер ждёт полного закрытия
// приложения и встаёт на следующем холодном запуске, не обрывая тренировку.
registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
