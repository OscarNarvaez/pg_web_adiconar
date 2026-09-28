-- ADICONAR · parche de endurecimiento post-auditoría de seguridad
-- Cómo usarlo: pega este archivo completo en Supabase → SQL Editor → Run.
-- Es incremental sobre supabase/schema.sql (que ya corriste) y también
-- es idempotente (usa "if not exists" / "drop ... if exists") por lo que
-- se puede volver a ejecutar sin problema.

-- ── 1. Defensa en profundidad: bloquear esquemas peligrosos en "enlace" ──
-- El campo `noticias.enlace` se renderiza como href público. Ya se valida
-- en el formulario del panel (solo http/https), pero cualquiera con el
-- anon key podría insertar directo vía API si esa cuenta admin se
-- comprometiera — esta constraint lo bloquea también a nivel de base de
-- datos (defensa en profundidad, no depende solo del cliente).
alter table public.noticias drop constraint if exists noticias_enlace_http_check;
alter table public.noticias
  add constraint noticias_enlace_http_check
  check (enlace like 'http://%' or enlace like 'https://%');

-- ── 2. Endurecer buckets de Storage: tipo MIME y tamaño máximo ──────────
-- Hoy cualquier tipo de archivo y cualquier tamaño son aceptados por el
-- bucket en sí (solo el formulario del panel valida esto, y eso es
-- evitable llamando la API directo). Esto lo fuerza también del lado del
-- servidor. Excluye explícitamente SVG de "admin-images": un SVG puede
-- llevar <script> incrustado (XSS si alguna vez se abre/enlaza directo).
update storage.buckets
set
  allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  file_size_limit = 5242880 -- 5 MB, igual al límite del formulario
where id = 'admin-images';

update storage.buckets
set
  allowed_mime_types = array['application/pdf'],
  file_size_limit = 15728640 -- 15 MB, igual al límite del formulario
where id = 'admin-pdfs';

-- ── Verificación rápida (opcional, solo lectura) ────────────────────────
-- select id, public, allowed_mime_types, file_size_limit from storage.buckets;
-- select conname from pg_constraint where conname = 'noticias_enlace_http_check';
