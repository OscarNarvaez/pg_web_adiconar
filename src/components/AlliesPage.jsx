import React from 'react'
import { aliadosInfo, aliadosList } from '../data/aliados'

const AlliesPage = () => {
    return (
        <div className="min-h-screen bg-[#f4f5ef] pt-28 pb-16">
            <div className="mx-auto max-w-5xl px-4 md:px-8">
                <h1 className="font-heading text-3xl text-emerald-950 mb-4">{aliadosInfo.title}</h1>

                <p className="text-slate-700 mb-6 whitespace-pre-line">{aliadosInfo.description}</p>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <h3 className="font-semibold text-emerald-900 mb-3">¿Qué nos permiten nuestros aliados?</h3>
                        <ul className="list-disc pl-5 text-slate-700 space-y-2">
                            {aliadosInfo.quePermiten.map((it, idx) => (
                                <li key={idx}>{it}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-emerald-900 mb-3">Beneficios</h3>
                        <ul className="list-disc pl-5 text-slate-700 space-y-2">
                            {aliadosInfo.beneficios.map((b, idx) => (
                                <li key={idx}>{b}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlliesPage
