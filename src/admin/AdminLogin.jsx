import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    setSubmitting(false)

    if (signInError) {
      setError('Credenciales incorrectas o cuenta no habilitada.')
    }
    // Si no hay error, AdminApp reacciona solo vía onAuthStateChange.
  }

  return (
    <div className="grid min-h-screen place-items-center bg-[#0f322b] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[1.75rem] border border-emerald-100/15 bg-white p-8 shadow-[0_28px_60px_-32px_rgba(3,42,32,0.9)]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">ADICONAR</p>
        <h1 className="font-heading mt-2 text-2xl text-emerald-950">Panel de administración</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label htmlFor="admin-email" className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-900/70">
              Correo
            </label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-emerald-900 focus:ring-emerald-900/10"
            />
          </div>

          <div>
            <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-900/70">
              Contraseña
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:border-emerald-900 focus:ring-emerald-900/10"
            />
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
