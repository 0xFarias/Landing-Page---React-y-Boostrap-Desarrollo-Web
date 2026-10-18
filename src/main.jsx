import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap y sus íconos se instalan con npm y se importan una sola vez aquí.
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import '@fontsource/atkinson-hyperlegible/400.css'
import '@fontsource/atkinson-hyperlegible/700.css'
// Estilos propios: tema de colores sobre Bootstrap.
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
