import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LazyAdminApp from './admin/LazyAdminApp.jsx'

// El panel de administración vive completamente aparte del sitio público:
// no pasa por App.jsx, por seo.js (routePaths/sitemap) ni por el prerender.
// Se carga en un chunk separado (ver LazyAdminApp.jsx) para no engordar
// el bundle que descarga todo visitante público.
const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/'
const isAdminRoute = normalizedPath === '/admin'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {isAdminRoute ? (
      <Suspense fallback={<div style={{ padding: 24 }}>Cargando…</div>}>
        <LazyAdminApp />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
