import React, { useEffect, useState } from 'react'

const noticiasLinks = [
    'https://www.instagram.com/reel/DWHrdkTCmmQ/?igsh=MXRmM2ZvempqOG9jNQ==',
    'https://www.instagram.com/p/DWDCDK2EbaH/?igsh=MW44OTA2eDlyc3h3bw==',
]

const fetchOembed = async (url) => {
    try {
        const res = await fetch(`https://api.instagram.com/oembed?url=${encodeURIComponent(url)}`)
        if (!res.ok) return null
        const json = await res.json()
        return json
    } catch (err) {
        console.warn('oEmbed fetch error for', url, err)
        return null
    }
}

const NoticiasPage = ({ embedded = false }) => {
    const [items, setItems] = useState([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        let mounted = true
        const load = async () => {
            const results = []
            for (const link of noticiasLinks) {
                const o = await fetchOembed(link)
                results.push({ link, oembed: o })
            }
            if (!mounted) return
            setItems(results)
        }
        load()
        return () => { mounted = false }
    }, [])

    const hasItems = items.length > 0
    const canNavigate = items.length > 1

    const prev = () => {
        if (!canNavigate) return
        setIndex((i) => (i - 1 + items.length) % items.length)
    }

    const next = () => {
        if (!canNavigate) return
        setIndex((i) => (i + 1) % items.length)
    }

    const currentItem = hasItems ? items[index] : null
    const nextItem = hasItems && items.length > 1 ? items[(index + 1) % items.length] : null

    const carousel = (
        <div className="overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7faf6_100%)] shadow-[0_28px_60px_-38px_rgba(3,42,32,0.28)]">
            <div className="flex items-center justify-between gap-4 border-b border-emerald-900/8 px-5 py-4 md:px-7">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-emerald-700">Noticias destacadas</p>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <button
                        onClick={prev}
                        disabled={!canNavigate}
                        className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-[0_12px_24px_-16px_rgba(3,42,32,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Noticia anterior"
                    >
                        <svg className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        disabled={!canNavigate}
                        className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white shadow-[0_12px_24px_-16px_rgba(6,78,59,0.5)] transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Siguiente noticia"
                    >
                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="grid gap-4 p-4 md:grid-cols-[1.45fr_0.85fr] md:gap-5 md:p-6">
                <div className="relative overflow-hidden rounded-[1.8rem] border border-emerald-900/10 bg-slate-100 min-h-[22rem] shadow-[0_20px_40px_-30px_rgba(3,42,32,0.45)]">
                    {currentItem ? (() => {
                        const urlObj = new URL(currentItem.link)
                        const embedPath = `${urlObj.pathname.replace(/\/$/, '')}/embed`
                        const embedUrl = `${urlObj.origin}${embedPath}`

                        return (
                            <a href={currentItem.link} target="_blank" rel="noreferrer noopener" className="group block h-full">
                                <div className="absolute inset-0">
                                    {currentItem.oembed?.thumbnail_url ? (
                                        <img
                                            src={currentItem.oembed.thumbnail_url}
                                            alt={currentItem.oembed.title || 'Noticia'}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <iframe
                                            src={embedUrl}
                                            title={`embed-${index}`}
                                            className="h-full w-full border-0"
                                            loading="lazy"
                                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,42,32,0.08)_0%,rgba(3,42,32,0.24)_40%,rgba(3,42,32,0.88)_100%)]" />
                                </div>

                                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-100/80">
                                        {currentItem.oembed?.author_name || 'Instagram'}
                                    </p>
                                    <h4 className="font-heading text-2xl leading-tight text-white md:text-3xl line-clamp-2">
                                        {currentItem.oembed?.title || 'Ver publicación'}
                                    </h4>
                                </div>
                            </a>
                        )
                    })() : (
                        <div className="flex h-full items-center justify-center px-6 py-10 text-center text-slate-600">
                            <div>
                                <div className="mx-auto mb-4 h-14 w-14 rounded-full border border-emerald-900/10 bg-white shadow-[0_12px_24px_-18px_rgba(3,42,32,0.4)]" />
                                <p className="font-semibold text-emerald-950">Cargando noticias...</p>
                                <p className="mt-1 text-sm text-slate-600">Estamos preparando los contenidos más recientes.</p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid gap-4 md:grid-rows-2">
                    {hasItems ? items.map((it, idx) => {
                        const isActive = idx === index
                        const urlObj = new URL(it.link)
                        const embedPath = `${urlObj.pathname.replace(/\/$/, '')}/embed`
                        const embedUrl = `${urlObj.origin}${embedPath}`

                        return (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => setIndex(idx)}
                                className={`group flex overflow-hidden rounded-[1.4rem] border bg-white text-left shadow-[0_16px_36px_-30px_rgba(3,42,32,0.45)] transition duration-300 hover:-translate-y-0.5 ${isActive ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-emerald-900/10 hover:border-emerald-500/40'}`}
                                aria-pressed={isActive}
                            >
                                <div className="relative w-28 shrink-0 md:w-32">
                                    {it.oembed?.thumbnail_url ? (
                                        <img
                                            src={it.oembed.thumbnail_url}
                                            alt={it.oembed.title || 'Noticia'}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <iframe
                                            src={embedUrl}
                                            title={`mini-embed-${idx}`}
                                            className="h-full w-full border-0"
                                            loading="lazy"
                                            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                                        />
                                    )}
                                    <div className={`absolute inset-0 transition ${isActive ? 'bg-emerald-950/18' : 'bg-emerald-950/34 group-hover:bg-emerald-950/22'}`} />
                                </div>

                                <div className="min-w-0 flex-1 p-4 md:p-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
                                                {isActive ? 'Actual' : 'Siguiente'}
                                            </p>
                                            <h5 className="mt-1 font-heading text-lg leading-snug text-emerald-950 line-clamp-2">
                                                {it.oembed?.title || 'Ver publicación'}
                                            </h5>
                                        </div>
                                        <span className={`mt-1 inline-flex h-3 w-3 shrink-0 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-emerald-200'}`} />
                                    </div>

                                    <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                                        Contenido actualizado y de interés para el sector.
                                    </p>

                                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                        <span>Ver detalle</span>
                                        <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        )
                    }) : (
                        <div className="flex h-full items-center justify-center rounded-[1.4rem] border border-dashed border-emerald-900/15 bg-white p-6 text-center text-slate-600">
                            <div>
                                <p className="font-semibold text-emerald-950">Cargando noticias...</p>
                                <p className="mt-1 text-sm text-slate-600">En breve aparecerán las publicaciones recientes.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 border-t border-emerald-900/8 px-5 py-4 md:flex-row md:justify-between md:px-7">
                <div className="flex items-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-emerald-700' : 'w-2.5 bg-emerald-200 hover:bg-emerald-300'}`}
                            aria-label={`Ir a noticia ${i + 1}`}
                        />
                    ))}
                </div>

                <div className="flex items-center gap-2 md:hidden">
                    <button
                        onClick={prev}
                        disabled={!canNavigate}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-[0_12px_24px_-16px_rgba(3,42,32,0.35)] transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Noticia anterior"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        disabled={!canNavigate}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white shadow-[0_12px_24px_-16px_rgba(6,78,59,0.5)] transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label="Siguiente noticia"
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )

    if (embedded) {
        return carousel
    }

    return (
        <div className="min-h-screen bg-[#f4f5ef] pt-32 pb-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h1 className="font-heading mb-6 text-5xl leading-tight text-emerald-950 md:text-6xl">
                        <span className="mt-2 block text-emerald-600">NOTICIAS</span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-slate-700">Manténgase informado sobre las últimas novedades, eventos y noticias relevantes del sector de combustibles y estaciones de servicio en Nariño.</p>
                </div>

                {carousel}
            </div>
        </div>
    )
}

export default NoticiasPage
