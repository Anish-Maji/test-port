import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import EdgeRulers from './components/EdgeRulers.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <EdgeRulers />
    <Analytics />
  </StrictMode>,
)
