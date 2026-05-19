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
    } catch (e) {
        return null
    }
}

const NoticiasPage = () => {
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

    const prev = () => setIndex((i) => (i - 1 + items.length) % items.length)
    const next = () => setIndex((i) => (i + 1) % items.length)

    return (
        <div className="min-h-screen bg-[#f4f5ef] pt-32 pb-20">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="mb-16 text-center">
                    <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-6 leading-tight">
                        <span className="block text-emerald-600 mt-2">NOTICIAS</span>
                    </h1>
                    <p className="text-slate-700 max-w-2xl mx-auto text-lg">Manténgase informado sobre las últimas novedades, eventos y noticias relevantes del sector de combustibles y estaciones de servicio en Nariño.</p>
                </div>

                <div className="mb-8 flex items-center gap-4">
                    <button onClick={prev} className="w-12 h-12 rounded-full bg-emerald-600 text-white hidden md:flex items-center justify-center">◀</button>

                    <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {items.length === 0 && (
                                <div className="col-span-3 text-center text-slate-600">Cargando noticias...</div>
                            )}

                            {items.map((it, idx) => {
                                const urlObj = new URL(it.link)
                                // construir url de embed: /p/..../embed o /reel/..../embed
                                const embedPath = `${urlObj.pathname.replace(/\/$/, '')}/embed`
                                const embedUrl = `${urlObj.origin}${embedPath}`

                                return (
                                    <div key={idx} className={`rounded-2xl overflow-hidden shadow-lg bg-white border border-emerald-900/10 transform transition ${idx === index ? 'scale-100' : 'opacity-60 scale-95'}`}>
                                        <a href={it.link} target="_blank" rel="noreferrer noopener">
                                            <div className="relative w-full h-48 md:h-56 lg:h-64">
                                                {it.oembed?.thumbnail_url ? (
                                                    <img
                                                        src={it.oembed.thumbnail_url}
                                                        alt={it.oembed.title || 'Noticia'}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <iframe
                                                        src={embedUrl}
                                                        title={`embed-${idx}`}
                                                        className="w-full h-full border-0"
                                                        loading="lazy"
                                                        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                                                    />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 to-transparent" />
                                            </div>
                                            <div className="p-4">
                                                <p className="text-xs text-amber-400 mb-2">{it.oembed?.author_name || 'Instagram'}</p>
                                                <h3 className="font-heading text-lg text-emerald-950 mb-2 line-clamp-2">{it.oembed?.title || 'Ver publicación'}</h3>
                                                <p className="text-slate-700 text-sm line-clamp-3">Fuente: <span className="text-emerald-600">Instagram</span></p>
                                            </div>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <button onClick={next} className="w-12 h-12 rounded-full bg-emerald-600 text-white hidden md:flex items-center justify-center">▶</button>
                </div>

                <div className="flex justify-center gap-2">
                    {items.map((_, i) => (
                        <button key={i} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? 'w-8 bg-emerald-600' : 'w-2 bg-emerald-200'}`} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default NoticiasPage
