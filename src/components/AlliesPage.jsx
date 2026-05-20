import React from 'react'
import { aliadosInfo } from '../data/aliados'

const logoFiles = [
    'logo1(1).png',
    'logo2.png',
    'logo3.png',
    'logo4.jpeg',
    'logo5.png',
    'logo8.png',
    'logo9.png',
]

const AlliesPage = () => {
    const logoGroups = [logoFiles, logoFiles]
    const soldicomWhatsappUrl = 'https://wa.me/573116082041'

    return (
        <div className="min-h-screen bg-[#f4f5ef] pt-28 pb-16">
            <div className="mx-auto max-w-5xl px-4 md:px-8">
                <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-6 leading-tight text-center">
                    Nuestros
                    <span className="block text-emerald-600 mt-2"> Aliados Estrategicos</span>
                </h1>
                <br />
                <h1 className="font-heading text-3xl text-emerald-950 mb-4 text-center">{aliadosInfo.title}</h1>

                <p className="text-slate-700 mb-6 whitespace-pre-line text-center">{aliadosInfo.description}</p>
                <div className="grid gap-6 md:grid-cols-2">
                </div>

                <section className="mt-10">
                    <div className="relative w-screen overflow-hidden carousel-mask left-1/2 right-1/2 -mx-[50vw]">
                        <div className="carousel-track">
                            {logoGroups.map((group, groupIdx) => (
                                <div className="carousel-group" key={groupIdx} aria-hidden={groupIdx === 1}>
                                    {group.map((name, idx) => (
                                        <div className="flex-shrink-0 flex items-center" key={`${groupIdx}-${idx}`}>
                                            <img
                                                src={`/logosAliados/${name}`}
                                                alt={name}
                                                className="h-24 md:h-28 object-contain transition-transform duration-300 hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>

                    <style>{`
                        .carousel-track {
                            display: flex;
                            align-items: center;
                            width: max-content;
                            /* velocidad constante del carrusel */
                            animation: marquee 30s linear infinite;
                        }

                        .carousel-group {
                            display: flex;
                            align-items: center;
                            gap: 2rem;
                            flex-shrink: 0;
                        }

                        .carousel-mask {
                            position: relative;
                            overflow: hidden;
                        }

                        .carousel-mask::before,
                        .carousel-mask::after {
                            content: '';
                            position: absolute;
                            top: 0;
                            bottom: 0;
                            width: 12%;
                            pointer-events: none;
                            z-index: 10;
                        }

                        .carousel-mask::before {
                            left: 0;
                            background: linear-gradient(to right, #f4f5ef 0%, rgba(244,245,239,0) 100%);
                        }

                        .carousel-mask::after {
                            right: 0;
                            background: linear-gradient(to left, #f4f5ef 0%, rgba(244,245,239,0) 100%);
                        }

                        @keyframes marquee {
                            0% { transform: translateX(0); }
                            100% { transform: translateX(-50%); }
                        }

                        @keyframes soldicomPulse {
                            0%, 100% { box-shadow: 0 20px 50px -28px rgba(6,78,59,0.45), 0 0 0 0 rgba(16,185,129,0.12); }
                            50% { box-shadow: 0 28px 70px -30px rgba(6,78,59,0.55), 0 0 0 10px rgba(16,185,129,0.04); }
                        }

                        @keyframes soldicomFloat {
                            0%, 100% { transform: translateY(0) scale(1); }
                            50% { transform: translateY(-4px) scale(1.02); }
                        }

                        @keyframes soldicomShine {
                            0% { transform: translateX(-120%) skewX(-18deg); opacity: 0; }
                            25% { opacity: 0.6; }
                            50% { opacity: 0.12; }
                            100% { transform: translateX(220%) skewX(-18deg); opacity: 0; }
                        }

                        .soldicom-cta {
                            position: relative;
                            animation: soldicomPulse 4.6s ease-in-out infinite;
                        }

                        .soldicom-cta::before {
                            content: '';
                            position: absolute;
                            inset: 0;
                            background: linear-gradient(115deg, rgba(255,255,255,0) 35%, rgba(255,255,255,0.75) 48%, rgba(255,255,255,0) 60%);
                            opacity: 0;
                            pointer-events: none;
                            transform: translateX(-120%) skewX(-18deg);
                        }

                        .soldicom-cta:hover::before {
                            animation: soldicomShine 1.15s ease forwards;
                        }

                        .soldicom-logo-wrap {
                            animation: soldicomFloat 3.8s ease-in-out infinite;
                        }

                        .soldicom-logo {
                            animation: soldicomFloat 4.4s ease-in-out infinite reverse;
                        }

                        .soldicom-cta:hover .soldicom-logo-wrap,
                        .soldicom-cta:hover .soldicom-logo {
                            animation-play-state: paused;
                        }

                        /* velocidad constante en todos los tamaños; sin overrides por hover */
                    `}</style>
                </section>

                <section className="mt-8 flex justify-center">
                    <a
                        href={soldicomWhatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="soldicom-cta group w-full max-w-3xl overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-white/85 p-4 shadow-[0_20px_50px_-28px_rgba(6,78,59,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-30px_rgba(6,78,59,0.55)] sm:p-5"
                        aria-label="Abrir WhatsApp para comunicarte con el Fondo de Protección Solidaria SOLDICOM"
                    >
                        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                            <div className="soldicom-logo-wrap flex h-28 w-28 flex-none items-center justify-center rounded-full bg-white p-0 shadow-[0_12px_28px_-14px_rgba(6,78,59,0.35)] sm:h-32 sm:w-32">
                                <img
                                    src="/logosAliados/logo10.png"
                                    alt="Fondo de Protección Solidaria SOLDICOM"
                                    className="soldicom-logo h-full w-full object-contain"
                                />
                            </div>

                            <div className="max-w-xl text-center">
                                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-emerald-700/80">
                                    Contacto
                                </p>
                                <h2 className="mt-2 text-xl font-semibold text-emerald-950 sm:text-2xl">
                                    !! Aqui tienes un enlace de comunicacion directo con SOLDICOM ¡¡
                                </h2>
                            </div>
                        </div>
                    </a>
                </section>
            </div>
        </div>
    )
}

export default AlliesPage
