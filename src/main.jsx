import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '../vendor/fontawesome/css/all.min.css';
import '../vendor/fontawesome/js/all.min.js';


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
