import { useState } from 'react'
import NoticiasAdmin from './NoticiasAdmin'
import PublicacionesAdmin from './PublicacionesAdmin'

const tabs = [
  { id: 'noticias', label: 'Redes sociales (Prensa)' },
  { id: 'publicaciones', label: 'Boletines y Comunicados' },
]

const AdminDashboard = ({ userEmail, onLogout }) => {
  const [activeTab, setActiveTab] = useState('noticias')

  return (
    <div className="min-h-screen bg-[#f4f5ef]">
      <header className="border-b border-emerald-950/10 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/60">ADICONAR · Admin</p>
            <p className="text-sm text-slate-600">{userEmail}</p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-full border border-emerald-900/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-900 transition hover:bg-emerald-50"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="mx-auto flex max-w-5xl gap-2 px-4 pb-3 md:px-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === tab.id ? 'bg-emerald-900 text-white' : 'bg-emerald-900/5 text-emerald-900 hover:bg-emerald-900/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-8">
        {activeTab === 'noticias' ? <NoticiasAdmin /> : <PublicacionesAdmin />}
      </main>
    </div>
  )
}

export default AdminDashboard
