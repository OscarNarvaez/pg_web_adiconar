import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const MissingConfig = () => (
  <div className="grid min-h-screen place-items-center bg-[#0f322b] px-4 text-center text-emerald-50">
    <div className="max-w-md rounded-2xl border border-emerald-100/15 bg-white/5 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/70">Panel de administración</p>
      <h1 className="font-heading mt-3 text-2xl text-white">Falta configurar Supabase</h1>
      <p className="mt-3 text-sm leading-relaxed text-emerald-50/80">
        No se encontraron las variables VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Revisa el archivo
        .env.local (desarrollo) o los secrets del despliegue (producción). Consulta .env.example.
      </p>
    </div>
  </div>
)

const AdminApp = () => {
  const [session, setSession] = useState(undefined) // undefined = cargando, null = sin sesión

  useEffect(() => {
    if (!supabase) return undefined

    supabase.auth.getSession().then(({ data }) => setSession(data.session))

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => {
      subscription.subscription.unsubscribe()
    }
  }, [])

  if (!supabase) return <MissingConfig />

  if (session === undefined) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0f322b] text-emerald-50">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100/70">Cargando…</p>
      </div>
    )
  }

  if (!session) return <AdminLogin />

  return <AdminDashboard userEmail={session.user.email} onLogout={() => supabase.auth.signOut()} />
}

export default AdminApp
