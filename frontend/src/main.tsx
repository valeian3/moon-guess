import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'index.css'

import AppRoutes from 'routes/AppRoutes'

// contexts
import { QueryProvider } from 'contexts/QueryProvider'
import { AuthProvider } from 'contexts/AuthProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </QueryProvider>
    </BrowserRouter>
  </StrictMode>
)
