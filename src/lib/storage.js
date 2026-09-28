import { supabase } from './supabaseClient'

const sanitizeFileName = (name) =>
  name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-')

const randomId = () =>
  (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`)

export const MAX_IMAGE_BYTES = 5 * 1024 * 1024 // 5 MB
export const MAX_PDF_BYTES = 15 * 1024 * 1024 // 15 MB

export const validateImageFile = (file) => {
  if (!file) return 'Selecciona una imagen.'
  if (!file.type.startsWith('image/')) return 'El archivo de miniatura debe ser una imagen.'
  if (file.size > MAX_IMAGE_BYTES) return 'La imagen no debe superar 5 MB.'
  return null
}

export const validatePdfFile = (file) => {
  if (!file) return 'Selecciona un archivo PDF.'
  const looksLikePdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
  if (!looksLikePdf) return 'El archivo debe ser un PDF.'
  if (file.size > MAX_PDF_BYTES) return 'El PDF no debe superar 15 MB.'
  return null
}

// Sube `file` al bucket/carpeta indicados y devuelve { path, url } (URL pública).
export const uploadPublicFile = async (bucket, folder, file) => {
  if (!supabase) throw new Error('Supabase no está configurado.')

  const path = `${folder}/${randomId()}-${sanitizeFileName(file.name)}`
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) throw error

  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return { path, url: data.publicUrl }
}

// Borrado best-effort: si falla (permisos, archivo ya no existe, etc.) no
// interrumpe el flujo — la fila en la base de datos es la fuente de verdad
// de qué está "publicado".
export const removePublicFile = async (bucket, path) => {
  if (!supabase || !path) return

  try {
    await supabase.storage.from(bucket).remove([path])
  } catch {
    // ignorar: limpieza best-effort
  }
}
