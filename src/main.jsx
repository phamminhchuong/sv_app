import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CharityProvider } from './context/CharityContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CharityProvider>
      <App />
    </CharityProvider>
  </React.StrictMode>
)
