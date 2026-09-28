import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY: el contenido en vivo (Prensa, Boletines, Comunicados) y /admin no funcionarán hasta configurarlas. Ver .env.example.'
  )
}

// `supabase` es `null` cuando no hay configuración: el resto del código lo
// comprueba antes de usarlo para no romper el build ni el prerender.
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null
