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

-- ── 3. Fijar search_path de la función del trigger ──────────────────────
-- Sin esto, el Security Advisor de Supabase marca la función como
-- "search path mutable": en teoría, si alguien lograra crear objetos en
-- otro esquema que quede antes en el search_path del rol que ejecuta la
-- función, podría hacer que referencias sin calificar resuelvan a algo
-- distinto de lo esperado. Fijar el search_path lo elimina.
alter function public.set_updated_at() set search_path = '';

-- ── 4. Quitar el permiso de "listar" objetos en los buckets públicos ────
-- Los buckets ya son públicos (public = true), así que cualquiera puede
-- descargar un archivo por su URL sin necesitar esta política — eso no
-- depende de RLS. Pero la política de SELECT que dejamos en storage.objects
-- SÍ permite además *listar* todos los archivos del bucket (nombres,
-- fechas) vía la API, algo que nuestra app nunca usa (solo hace upload /
-- getPublicUrl / remove, nunca list). La restringimos a "authenticated"
-- para cerrar esa enumeración innecesaria sin afectar la descarga pública.
drop policy if exists "public_read_admin_images" on storage.objects;
drop policy if exists "authenticated_read_admin_images" on storage.objects;
create policy "authenticated_read_admin_images" on storage.objects
  for select to authenticated using (bucket_id = 'admin-images');

drop policy if exists "public_read_admin_pdfs" on storage.objects;
drop policy if exists "authenticated_read_admin_pdfs" on storage.objects;
create policy "authenticated_read_admin_pdfs" on storage.objects
  for select to authenticated using (bucket_id = 'admin-pdfs');

-- ── Verificación rápida (opcional, solo lectura) ────────────────────────
-- select id, public, allowed_mime_types, file_size_limit from storage.buckets;
-- select conname from pg_constraint where conname = 'noticias_enlace_http_check';
-- select proname, proconfig from pg_proc where proname = 'set_updated_at';

-- ── Esto no se puede hacer por SQL, hazlo desde el dashboard ────────────
-- Authentication → Policies (o Auth → Settings) → activa "Leaked password
-- protection" (revisa la contraseña del admin contra HaveIBeenPwned).
--
-- Nota sobre los 6 warnings "rls_policy_always_true" del Security Advisor:
-- son intencionales, no se tocan aquí. Hay un solo usuario admin
-- compartido y sin registro público, así que "authenticated" equivale en
-- la práctica a "el admin". Ver la nota completa al final de schema.sql.
