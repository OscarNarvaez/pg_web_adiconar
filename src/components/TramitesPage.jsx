import React from 'react'

const TramitesPage = ({ onSolicitarAsesoria }) => {
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
        <div className="min-h-screen bg-[#f4f5ef] pt-32 pb-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                {/* Hero */}
                <div className="mb-16 animate-fade-in text-center">
                    <div className="inline-block mb-4">
                        <span className="px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-sm font-semibold">Centro de Soluciones</span>
                    </div>

                    <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-4 leading-tight">
                        Trámites ante entidades
                        <span className="block text-emerald-600 mt-2">Gestión y acompañamiento especializado</span>
                    </h1>

                    <p className="text-xl text-emerald-900 font-semibold mb-6">Simplificamos procesos administrativos y garantizamos cumplimiento normativo para su estación de servicio.</p>
                </div>

                <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1fr] items-start">
                    <div className="space-y-6 rounded-[2rem] border border-emerald-900/8 bg-white p-6 md:p-8 shadow-lg">
                        <div>
                            <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-3">Gestión integral de trámites</h2>
                            <p className="text-emerald-900/85 leading-relaxed text-lg">
                                Gestionamos y acompañamos los trámites y permisos requeridos para la operación de su estación de servicio ante las diferentes entidades gubernamentales, garantizando cumplimiento y agilidad en cada proceso.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-lg border-l-4 border-emerald-600 bg-emerald-50/60">
                                <p className="font-semibold text-emerald-900">Gestión integral de trámites</p>
                                <p className="text-emerald-900/80 mt-1">Nos encargamos de los trámites y permisos necesarios para la operación legal y segura de su estación de servicio.</p>
                            </div>

                            <div className="p-4 rounded-lg border-l-4 border-emerald-600 bg-emerald-50/60">
                                <p className="font-semibold text-emerald-900">Acompañamiento personalizado</p>
                                <p className="text-emerald-900/80 mt-1">Asesoría y seguimiento durante todo el proceso ante las entidades correspondientes.</p>
                            </div>

                            <div className="p-4 rounded-lg border-l-4 border-emerald-600 bg-emerald-50/60">
                                <p className="font-semibold text-emerald-900">Agilidad y cumplimiento</p>
                                <p className="text-emerald-900/80 mt-1">Optimizamos tiempos y aseguramos el cumplimiento normativo en cada trámite.</p>
                            </div>

                            <div className="p-4 rounded-lg border-l-4 border-emerald-600 bg-emerald-50/60">
                                <p className="font-semibold text-emerald-900">Tranquilidad y respaldo</p>
                                <p className="text-emerald-900/80 mt-1">Usted se enfoca en su operación, nosotros nos encargamos de la gestión.</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(6,95,70,0.12)]">
                            <img
                                src="/imagenesCentroSoluciones/tramitesEntidades.jpeg"
                                alt="Trámites ante entidades"
                                className="w-full h-[47.5rem] object-cover"
                            />
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
                        <button
                            onClick={() => onSolicitarAsesoria('secretaria')}
                            className="px-8 py-3 bg-white text-emerald-950 font-heading font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                        >
                            Solicitar Asesoría
                        </button>
                    </div>
                </div>
            </div>

            <style>{`\n        @keyframes fade-in {\n          from {\n            opacity: 0;\n            transform: translateY(20px);\n          }\n          to {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n        \n        .animate-fade-in {\n          animation: fade-in 0.8s ease-out;\n        }\n      `}</style>
        </div>
    )
}

export default TramitesPage
