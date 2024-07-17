import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './auth/context/AuthProvider'
import './styles.css'
import { OPFormsApp } from './OPFormsApp'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OPFormsApp />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
