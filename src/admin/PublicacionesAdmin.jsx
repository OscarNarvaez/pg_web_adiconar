import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { formatFechaEs, todayIso } from '../lib/formatFecha'
import {
  removePublicFile,
  uploadPublicFile,
  validateImageFile,
  validatePdfFile,
} from '../lib/storage'

const tipos = [
  { value: 'boletin', label: 'Boletín informativo' },
  { value: 'comunicado', label: 'Comunicado' },
]

const emptyForm = {
  tipo: 'boletin',
  titulo: '',
  descripcion: '',
  fecha: todayIso(),
}

const filtros = [
  { value: 'todos', label: 'Todos' },
  { value: 'boletin', label: 'Boletines' },
  { value: 'comunicado', label: 'Comunicados' },
]

const PublicacionesAdmin = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('todos')
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const loadItems = () =>
    supabase
      .from('publicaciones')
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

    if (!form.titulo.trim() || !form.descripcion.trim()) {
      setError('Completa el título y la descripción.')
      return
    }

    const imageError = validateImageFile(imageFile)
    if (imageError) {
      setError(imageError)
      return
    }

    const pdfError = validatePdfFile(pdfFile)
    if (pdfError) {
      setError(pdfError)
      return
    }

    setSubmitting(true)

    try {
      const [uploadedImage, uploadedPdf] = await Promise.all([
        uploadPublicFile('admin-images', 'publicaciones', imageFile),
        uploadPublicFile('admin-pdfs', 'publicaciones', pdfFile),
      ])

      const { error: insertError } = await supabase.from('publicaciones').insert({
        tipo: form.tipo,
        titulo: form.titulo.trim(),
        descripcion: form.descripcion.trim(),
        fecha: form.fecha || todayIso(),
        imagen: uploadedImage.url,
        imagen_path: uploadedImage.path,
        pdf_url: uploadedPdf.url,
        pdf_path: uploadedPdf.path,
      })

      if (insertError) throw insertError

      setForm(emptyForm)
      setImageFile(null)
      setPdfFile(null)
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

    const { error: deleteError } = await supabase.from('publicaciones').delete().eq('id', item.id)
    if (deleteError) {
      setError(deleteError.message)
      return
    }

    await Promise.all([
      removePublicFile('admin-images', item.imagen_path),
      removePublicFile('admin-pdfs', item.pdf_path),
    ])
    setItems((prev) => prev.filter((row) => row.id !== item.id))
  }

  const visibleItems = filtro === 'todos' ? items : items.filter((item) => item.tipo === filtro)

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm">
        <h2 className="font-heading text-xl text-emerald-950">Agregar boletín o comunicado</h2>
        <p className="mt-1 text-sm text-slate-600">
          Los boletines aparecen en /prensa y los comunicados en /comunicados.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">Tipo *</span>
            <div className="mt-2 flex gap-3">
              {tipos.map((tipo) => (
                <label
                  key={tipo.value}
                  className={`flex-1 cursor-pointer rounded-xl border px-4 py-2.5 text-center text-sm font-semibold transition ${
                    form.tipo === tipo.value
                      ? 'border-emerald-900 bg-emerald-900 text-white'
                      : 'border-slate-300 text-slate-700 hover:border-emerald-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipo"
                    value={tipo.value}
                    checked={form.tipo === tipo.value}
                    onChange={handleChange}
                    id="tipo"
                    className="sr-only"
                  />
                  {tipo.label}
                </label>
              ))}
            </div>
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
              Imagen de miniatura *
            </label>
            <input
              id="imagen"
              type="file"
              accept="image/*"
              onChange={(event) => setImageFile(event.target.files?.[0] ?? null)}
              className="mt-1 w-full text-sm text-slate-600"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="pdf" className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-900/70">
              Archivo PDF *
            </label>
            <input
              id="pdf"
              type="file"
              accept="application/pdf,.pdf"
              onChange={(event) => setPdfFile(event.target.files?.[0] ?? null)}
              className="mt-1 w-full text-sm text-slate-600"
            />
          </div>
        </div>

        {error && <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 inline-flex items-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Subiendo…' : 'Subir archivo'}
        </button>
      </form>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-xl text-emerald-950">Publicaciones existentes</h2>
          <div className="flex gap-2">
            {filtros.map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setFiltro(item.value)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  filtro === item.value ? 'bg-emerald-900 text-white' : 'bg-emerald-900/5 text-emerald-900 hover:bg-emerald-900/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="mt-3 text-sm text-slate-600">Cargando…</p>
        ) : visibleItems.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">No hay publicaciones para este filtro.</p>
        ) : (
          <div className="mt-4 grid gap-3">
            {visibleItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-emerald-900/10 bg-white p-4">
                <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img src={item.imagen} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-emerald-950">{item.titulo}</p>
                  <p className="text-xs text-slate-500">
                    {item.tipo === 'boletin' ? 'Boletín' : 'Comunicado'} · {formatFechaEs(item.fecha)}
                  </p>
                </div>
                <a
                  href={item.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  Ver PDF
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

export default PublicacionesAdmin
