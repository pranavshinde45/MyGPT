import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter } from 'react-router-dom'
import  Routes  from "./Routes.jsx"
import { AuthProvider } from './authContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
     <StrictMode>
      <Routes />
    </StrictMode>
  </AuthProvider>
  </BrowserRouter>
)