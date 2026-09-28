import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { formatFechaEs } from '../lib/formatFecha'

const getYouTubeThumbnail = (url) => {
    try {
        const parsed = new URL(url)
        const videoId = parsed.searchParams.get('v')
        if (!videoId) return null
        return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    } catch {
        return null
    }
}

const getInstagramMediaUrl = (url) => {
    try {
        const parsed = new URL(url)
        const segments = parsed.pathname.split('/').filter(Boolean)
        const postType = segments[0]
        const shortcode = segments[1]

        if (!shortcode || !['p', 'reel', 'tv'].includes(postType)) return null

        return `https://www.instagram.com/${postType}/${shortcode}/media/?size=l`
    } catch {
        return null
    }
}

const getFallbackPreviewImage = (url) => getInstagramMediaUrl(url) || getYouTubeThumbnail(url) || null

const getPreviewImageFromResponse = (payload) => {
    return payload?.data?.image?.url || payload?.data?.screenshot?.url || payload?.data?.logo?.url || null
}

const resolveLinkPreviewImage = async (url) => {
    const fallbackPreview = getFallbackPreviewImage(url)

    try {
        const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`)

        if (!response.ok) return fallbackPreview

        const payload = await response.json()
        return getPreviewImageFromResponse(payload) || fallbackPreview
    } catch {
        return fallbackPreview
    }
}

const NoticiasPage = ({ embedded = false }) => {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [previewImages, setPreviewImages] = useState({})
    const [index, setIndex] = useState(0)
    const trackRef = useRef(null)
    const itemRefs = useRef([])

    useEffect(() => {
        let cancelled = false

        const query = supabase
            ? supabase
                  .from('noticias')
                  .select('*')
                  .order('fecha', { ascending: false })
                  .order('created_at', { ascending: false })
            : Promise.resolve({ data: [], error: null })

        query.then(({ data, error }) => {
            if (cancelled) return
            setItems(error ? [] : (data ?? []).map((row) => ({ ...row, fecha: formatFechaEs(row.fecha) })))
            setLoading(false)
        })

        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        let cancelled = false

        const loadPreviews = async () => {
            const results = await Promise.all(
                items.map(async (item) => {
                    if (item.imagen) {
                        return [item.id, item.imagen]
                    }

                    const previewImage = await resolveLinkPreviewImage(item.enlace)
                    return [item.id, previewImage]
                })
            )

            if (cancelled) return

            setPreviewImages(Object.fromEntries(results))
        }

        loadPreviews()

        return () => {
            cancelled = true
        }
    }, [items])

    const resolvedItems = items.map((item) => ({
        ...item,
        imagen: item.imagen || previewImages[item.id] || getFallbackPreviewImage(item.enlace) || null,
    }))

    const hasItems = resolvedItems.length > 0
    const canNavigate = resolvedItems.length > 1

    const prev = () => {
        if (!canNavigate) return
        setIndex((i) => (i - 1 + items.length) % items.length)
    }

    const next = () => {
        if (!canNavigate) return
        setIndex((i) => (i + 1) % items.length)
    }

    useEffect(() => {
        const current = itemRefs.current[index]
        if (!current) return

        if (embedded) {
            const track = trackRef.current
            if (!track) return

            const targetLeft = current.offsetLeft - (track.clientWidth - current.clientWidth) / 2
            track.scrollTo({
                left: Math.max(0, targetLeft),
                behavior: 'smooth',
            })
            return
        }

        current.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest',
        })
    }, [embedded, index])

    const getSlideStyle = (slideIndex) => {
        if (!hasItems) return { transform: 'translateY(0px) scale(1)', opacity: 1 }

        const total = items.length
        const rawOffset = slideIndex - index
        const wrappedOffset = ((rawOffset % total) + total) % total
        const centeredOffset = wrappedOffset > total / 2 ? wrappedOffset - total : wrappedOffset
        const distance = Math.min(Math.abs(centeredOffset), 3)

        const translateY = distance === 0 ? 0 : 14 + distance * 14
        const scale = distance === 0 ? 1 : Math.max(0.82, 1 - distance * 0.08)

        return {
            transform: `translateY(${translateY}px) scale(${scale})`,
            opacity: distance === 0 ? 1 : Math.max(0.55, 1 - distance * 0.12),
            zIndex: 100 - distance,
        }
    }

    const carousel = (
        <section className="section" id="noticias">

            <div className="news-slider relative rounded-[2rem] border border-emerald-900/10 bg-[linear-gradient(180deg,#ffffff_0%,#f7faf6_100%)] shadow-[0_28px_60px_-38px_rgba(3,42,32,0.28)]">
                <div className="relative overflow-hidden px-4 py-6 md:px-8 md:py-8" aria-label="Carrusel de noticias">
                    <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-20 bg-gradient-to-r from-white via-white/80 to-transparent md:block" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-20 bg-gradient-to-l from-white via-white/80 to-transparent md:block" />

                    <div ref={trackRef} className="relative z-0 flex items-end gap-4 overflow-x-auto pb-4 pl-1 pr-1 md:gap-6 md:pb-6 md:pl-0 md:pr-0 snap-x snap-mandatory scrollbar-none">
                        {hasItems ? resolvedItems.map((item, itemIndex) => {
                            const isActive = itemIndex === index
                            const isTall = itemIndex % 2 === 0
                            const slideStyle = getSlideStyle(itemIndex)
                            const anchorProps = {
                                href: item.enlace,
                                target: '_blank',
                                rel: 'noreferrer noopener',
                            }

                            return (
                                <article
                                    key={item.id}
                                    ref={(node) => { itemRefs.current[itemIndex] = node }}
                                    className={`news-card snap-center shrink-0 w-[82vw] sm:w-[26rem] md:w-[28rem] lg:w-[30rem] transition-all duration-500 ${isActive ? 'pointer-events-auto' : 'pointer-events-auto'}`}
                                    style={slideStyle}
                                >
                                    <a {...anchorProps} className={`group block overflow-hidden rounded-[1.75rem] border border-emerald-900/12 bg-white shadow-[0_18px_38px_-32px_rgba(3,42,32,0.9)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-34px_rgba(3,42,32,0.55)] ${isActive ? 'ring-2 ring-emerald-500/25' : ''}`}>
                                        <div className={`news-media relative overflow-hidden bg-slate-100 ${isTall ? 'aspect-[16/11]' : 'aspect-[16/10]'}`}>
                                            {item.imagen ? (
                                                <img
                                                    src={item.imagen}
                                                    alt={item.titulo}
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                                    loading="lazy"
                                                    decoding="async"
                                                    referrerPolicy="no-referrer"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center bg-emerald-950 text-white">
                                                    <span className="text-sm font-semibold">Cargando miniatura</span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,42,32,0)_0%,rgba(3,42,32,0.08)_45%,rgba(3,42,32,0.78)_100%)]" />
                                            <div className="absolute left-4 top-4 inline-flex items-center rounded-full border border-white/18 bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                                                {item.etiqueta || 'Noticias'}
                                            </div>
                                            <div className="absolute right-4 top-4 inline-flex items-center rounded-full bg-emerald-950/68 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                                                {item.fuente || 'Editorial'}
                                            </div>
                                        </div>

                                        <div className="news-body p-5 md:p-6">
                                            <time className="block text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                                {item.fecha}
                                            </time>
                                            <h3 className="mt-3 font-heading text-2xl leading-tight tracking-[-0.02em] text-emerald-950 line-clamp-2 md:text-[1.6rem]">
                                                {item.titulo}
                                            </h3>
                                            <p className="mt-3 text-sm leading-6 text-slate-700 line-clamp-3 md:text-[0.98rem]">
                                                {item.descripcion}
                                            </p>

                                            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                                                <span>Ver {item.fuente || 'publicación'}</span>
                                                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </a>
                                </article>
                            )
                        }) : (
                            <div className="flex min-h-[26rem] items-center justify-center px-6 text-center text-slate-600 md:min-h-[30rem]">
                                <div className="rounded-[1.75rem] border border-dashed border-emerald-900/15 bg-white p-8">
                                    <p className="font-semibold text-emerald-950">
                                        {loading ? 'Cargando noticias...' : 'Aún no hay publicaciones.'}
                                    </p>
                                    <p className="mt-1 text-sm text-slate-600">
                                        {loading
                                            ? 'En breve aparecerán las publicaciones recientes.'
                                            : 'Cuando se agreguen desde el panel de administración, aparecerán aquí automáticamente.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="news-controls relative z-30 flex flex-col gap-4 border-t border-emerald-900/8 bg-[linear-gradient(180deg,#f7faf6_0%,#f7faf6_100%)] px-5 py-4 md:flex-row md:items-center md:justify-between md:px-6">
                    <div className="flex items-center justify-center gap-2">
                        {items.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setIndex(i)}
                                className={`h-2.5 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-emerald-700' : 'w-2.5 bg-emerald-200 hover:bg-emerald-300'}`}
                                aria-label={`Ir a noticia ${i + 1}`}
                            />
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={prev}
                            disabled={!canNavigate}
                            className="news-btn prev inline-flex h-11 w-11 items-center justify-center rounded-full border border-emerald-900/10 bg-white text-emerald-950 shadow-[0_12px_24px_-16px_rgba(3,42,32,0.35)] transition hover:-translate-y-0.5 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Noticias anteriores"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={next}
                            disabled={!canNavigate}
                            className="news-btn next inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-white shadow-[0_12px_24px_-16px_rgba(6,78,59,0.5)] transition hover:-translate-y-0.5 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Noticias siguientes"
                        >
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                <style>{`
                    .scrollbar-none {
                        scrollbar-width: none;
                        -ms-overflow-style: none;
                    }

                    .scrollbar-none::-webkit-scrollbar {
                        display: none;
                    }

                    .news-card {
                        scroll-snap-align: center;
                    }

                    @media (max-width: 767px) {
                        .news-slider {
                            border-radius: 1.5rem;
                        }

                        .news-controls {
                            gap: 1rem;
                        }

                        .news-card {
                            width: 80vw;
                        }
                    }
                `}</style>
            </div>
        </section>
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
