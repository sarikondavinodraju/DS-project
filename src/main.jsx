import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './context/Store'
import './index.css'
createRoot(document.getElementById('app')).render(
  // basename keeps the router working when the app is served from a sub-path
  // (e.g. https://<user>.github.io/DS-project/) - it is "/" for local builds.
  <React.StrictMode><BrowserRouter basename={import.meta.env.BASE_URL}><StoreProvider><App /></StoreProvider></BrowserRouter></React.StrictMode>
)
