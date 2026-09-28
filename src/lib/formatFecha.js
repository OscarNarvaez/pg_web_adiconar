// Formatea una fecha "YYYY-MM-DD" (columna `date` de Postgres) al estilo
// usado en el resto del sitio, p. ej. "20 mar 2026".
export const formatFechaEs = (isoDate) => {
  if (!isoDate) return ''

  const date = new Date(`${isoDate}T00:00:00`)
  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(date)
    .replace('.', '')
}

// Fecha de hoy en formato "YYYY-MM-DD", para precargar inputs type="date".
export const todayIso = () => new Date().toISOString().slice(0, 10)
