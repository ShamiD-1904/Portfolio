import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Suppress known harmless console warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  const message = args[0];
  // Suppress GLTFLoader extension warning (harmless - model uses older spec)
  if (typeof message === 'string' && message.includes('KHR_materials_pbrSpecularGlossiness')) {
    return;
  }
  originalWarn.apply(console, args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
