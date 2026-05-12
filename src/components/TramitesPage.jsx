import React from 'react'

const TramitesPage = () => {
  const tramites = [
    { icon: '🗂️', title: 'Trámites Ministeriales', desc: 'Radicaciones y solicitudes ante ministerios y entidades nacionales.' },
    { icon: '🏛️', title: 'Corporaciones Ambientales', desc: 'Gestión y permisos ante Corporaciones Autónomas Regionales.' },
    { icon: '📄', title: 'Gestión Documental', desc: 'Preparación, radicación y seguimiento de expedientes.' },
    { icon: '🔎', title: 'Seguimiento', desc: 'Monitoreo continuo de estados y respuestas de entidades.' },
    { icon: '🛂', title: 'Permisos Municipales', desc: 'Coordinación con autoridades locales y departamentales.' },
    { icon: '⚖️', title: 'Asesoría Legal', desc: 'Apoyo en requisitos jurídicos y cumplimiento normativo.' },
  ]

  const benefits = [
    { icon: '⏱️', title: 'Ahorro de tiempo' },
    { icon: '✔️', title: 'Reducción de errores' },
    { icon: '📋', title: 'Cumplimiento normativo' },
    { icon: '🤝', title: 'Acompañamiento especializado' },
    { icon: '🧾', title: 'Gestión documental integral' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f4f5ef] to-white pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Hero */}
        <div className="mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-sm font-semibold">Centro de Soluciones</span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-4 leading-tight">
            Trámites ante entidades
            <span className="block text-emerald-600 mt-2">Gestión y acompañamiento especializado</span>
          </h1>

          <p className="text-xl text-emerald-900 font-semibold mb-6">Simplificamos procesos administrativos y garantizamos cumplimiento normativo para su estación de servicio.</p>
        </div>

        {/* Descripción + Imagen */}
        <div className="mb-12 grid md:grid-cols-2 gap-12 ">
          <div className="space-y-6">
            <p className="text-emerald-900/85 leading-relaxed text-lg">
              Facilitamos la realización de trámites y procesos administrativos relacionados con la operación de estaciones de servicio, apoyando en la gestión documental, radicación y cumplimiento de requisitos ante entidades públicas y organismos de control.
            </p>
            <p className="text-emerald-900/85 leading-relaxed text-lg">
              Nuestro equipo coordina con Corporaciones Autónomas Regionales, Ministerios, Superintendencias y autoridades locales para reducir tiempos y mitigar riesgos administrativos.
            </p>
          </div>

          <div className="hidden md:flex">
            <div className="relative w-full h-80 rounded-3xl overflow-hidden flex items-center justify-center border border-emerald-100 shadow-lg">
              <img src="https://images.unsplash.com/photo-1581091870627-3a3b1b7a0e4f?q=80&w=1200&auto=format&fit=crop&crop=faces" alt="Trámites" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Trámites incluidos - tarjetas */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="font-heading text-3xl text-emerald-950 mb-2">Trámites incluidos</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tramites.map((t, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-900/10">
                <div className="text-4xl mb-4">{t.icon}</div>
                <h3 className="font-heading text-emerald-950 font-semibold mb-2">{t.title}</h3>
                <p className="text-emerald-900/80">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-16 bg-gradient-to-r from-emerald-950/5 to-emerald-600/5 rounded-3xl p-8 md:p-12 border border-emerald-200/30">
          <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-8 text-center">Beneficios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-900/10 hover:border-emerald-500/40 text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{b.icon}</div>
                <p className="font-heading text-emerald-950 font-semibold group-hover:text-emerald-600 transition-colors">{b.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <h3 className="font-heading text-3xl md:text-4xl mb-4">¿Necesita acompañamiento para trámites?</h3>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">Contáctenos y coordinamos la gestión documental, radicación y seguimiento ante las entidades correspondientes.</p>
            <a href="#contacto" className="px-8 py-3 bg-white text-emerald-950 font-heading font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">Contactar</a>
          </div>
        </div>
      </div>

      <style>{`\n        @keyframes fade-in {\n          from {\n            opacity: 0;\n            transform: translateY(20px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n        \n        .animate-fade-in {\n          animation: fade-in 0.8s ease-out;\n        }\n      `}</style>
    </div>
  )
}

export default TramitesPage
