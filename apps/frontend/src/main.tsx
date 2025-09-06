import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import './index.css'
import { OverlayProvider } from 'overlay-kit'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <App />
      </OverlayProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
