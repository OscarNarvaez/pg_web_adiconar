import { lazy } from 'react'

// Vive en su propio archivo (con export) a propósito: así main.jsx solo
// hace un import normal, igual que con App.jsx, y el código del panel
// (y @supabase/supabase-js) queda en un chunk aparte que el público que
// nunca visita /admin no descarga.
const LazyAdminApp = lazy(() => import('./AdminApp.jsx'))

export default LazyAdminApp
