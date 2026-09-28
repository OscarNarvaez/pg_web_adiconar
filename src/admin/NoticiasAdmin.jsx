import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { formatFechaEs, todayIso } from '../lib/formatFecha'
import { MAX_IMAGE_BYTES, removePublicFile, uploadPublicFile, validateImageFile } from '../lib/storage'

const fuentes = ['Instagram', 'YouTube', 'Facebook', 'Otro']

// Evita esquemas peligrosos (javascript:, data:, etc.) en un campo que se
// renderiza como href público — solo se permite http(s). Defensa en
// profundidad además del check en la base de datos (ver supabase/schema.sql).
const isSafeHttpUrl = (value) => {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const emptyForm = {
  enlace: '',
  fuente: 'Instagram',
  etiqueta: '',
  titulo: '',
  descripcion: '',
  fecha: todayIso(),
}

const NoticiasAdmin = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const loadItems = () =>
    supabase
      .from('noticias')
      .select('*')
      .order('fecha', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data, error: fetchError }) => {
        setItems(fetchError ? [] : data ?? [])
        setLoading(false)
      })

  useEffect(() => {
    loadItems()
  }, [])

  const handleChange = (event) => {
    const { id, value } = event.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (!form.enlace.trim() || !form.titulo.trim() || !form.descripcion.trim()) {
      setError('Completa al menos el enlace, el título y la descripción.')
      return
    }

    if (!isSafeHttpUrl(form.enlace.trim())) {
      setError('El enlace debe ser una URL http:// o https:// válida.')
      return
    }

    if (imageFile) {
      const imageError = validateImageFile(imageFile)
      if (imageError) {
        setError(imageError)
        return
      }
    }

    setSubmitting(true)

    try {
      let imagen = null
      let imagenPath = null

      if (imageFile) {
        const uploaded = await uploadPublicFile('admin-images', 'noticias', imageFile)
        imagen = uploaded.url
        imagenPath = uploaded.path
      }

      const { error: insertError } = await supabase.from('noticias').insert({
        enlace: form.enlace.trim(),
        fuente: form.fuente,
        etiqueta: form.etiqueta.trim(),
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        fecha: form.fecha || todayIso(),
        imagen,
        imagen_path: imagenPath,
      })

      if (insertError) throw insertError

      setForm(emptyForm)
      setImageFile(null)
      event.target.reset?.()
      await loadItems()
    } catch (err) {
      setError(err.message || 'No se pudo guardar la publicación.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`¿Eliminar "${item.titulo}"?`)) return

    const { error: deleteError } = await supabase.from('noticias').delete().eq('id', item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    await removePublicFile('admin-images', item.imagen_path)
    setItems((prev) => prev.filter((row) => row.id !== item.id))
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-xl text-emerald-950">Agregar publicación de redes sociales</h2>
        <p className="mt-1 text-sm text-slate-600">
          Aparecerá en el carrusel de Prensa de la página de inicio y en /noticias.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="enlace" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Enlace de la publicación *
            </label>
            <input
              id="enlace"
              type="url"
              required
              placeholder="https://www.instagram.com/p/..."
              value={form.enlace}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800"
            />
          </div>

          <div>
            <label htmlFor="fuente" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Red social
            </label>
            <select
              id="fuente"
              value={form.fuente}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800"
            >
              {fuentes.map((fuente) => (
                <option key={fuente} value={fuente}>
                  {fuente}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="etiqueta" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Etiqueta (ej. Video, Prensa)
            </label>
            <input
              id="etiqueta"
              type="text"
              value={form.etiqueta}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="titulo" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Título *
            </label>
            <input
              id="titulo"
              type="text"
              required
              value={form.titulo}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="descripcion" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Descripción *
            </label>
            <textarea
              id="descripcion"
              required
              rows={3}
              value={form.descripcion}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800"
            />
          </div>

          <div>
            <label htmlFor="fecha" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Fecha
            </label>
            <input
              id="fecha"
              type="date"
              value={form.fecha}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800"
            />
          </div>

          <div>
            <label htmlFor="imagen" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Miniatura (opcional)
            </label>
            <input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="mt-1 w-full text-sm text-slate-600"
            />
            <p className="mt-1 text-xs text-slate-500">
              Si no subes una imagen, el sitio intenta obtener una miniatura automáticamente (Instagram/YouTube) al mostrarla.
            </p>
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex items-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Guardando…' : 'Publicar'}
        </button>
      </form>

      <div>
        <h2 className="font-heading text-xl text-emerald-950">Publicaciones existentes</h2>

        {loading ? (
          <p className="mt-3 text-sm text-slate-600">Cargando…</p>
        ) : items.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">Aún no hay publicaciones.</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-emerald-900/10 bg-white p-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  {item.imagen && <img src={item.imagen} alt="" className="h-full w-full object-cover" />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-emerald-950">{item.titulo}</p>
                  <p className="text-xs text-slate-500">
                    {item.fuente} · {formatFechaEs(item.fecha)}
                  </p>
                </div>
                <a
                  href={item.enlace}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Ver enlace
                </a>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  className="rounded-full border border-rose-200 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default NoticiasAdmin
