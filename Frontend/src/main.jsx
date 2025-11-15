import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShowProvider from './context/showContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ShowProvider>
      <App />
    </ShowProvider>
  </BrowserRouter>
)
