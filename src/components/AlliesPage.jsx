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

    return (
        <div className="min-h-screen bg-[#f4f5ef] pt-28 pb-16">
            <br />
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
                    <div className="inline-block mb-4 text-center w-full">
                        <span className="px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-900 text-sm font-semibold">
                            ALIADOS
                        </span>
                    </div>

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
                            animation: marquee 42s linear infinite;
                        }

                        .carousel-track:hover {
                            animation-play-state: paused;
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

                        @media (max-width: 640px) {
                            .carousel-track { animation-duration: 56s; }
                        }
                    `}</style>
                </section>
            </div>
        </div>
    )
}

export default AlliesPage
