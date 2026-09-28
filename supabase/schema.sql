-- ADICONAR · esquema de Supabase para el panel de administración
-- Cómo usarlo: pega este archivo completo en Supabase → SQL Editor → Run.
-- Es idempotente (usa "if not exists" / "on conflict do nothing") por lo que
-- se puede volver a ejecutar sin duplicar nada si algo falla a mitad de camino.

-- ── Extensiones ──────────────────────────────────────────────────────────
create extension if not exists "pgcrypto"; -- gen_random_uuid()

-- ── Helper: actualizar updated_at automáticamente ───────────────────────
-- search_path fijo en '' (en vez de dejarlo mutable) para que las
-- referencias sin calificar no puedan resolver a un objeto inesperado
-- creado en otro esquema.
create or replace function public.set_updated_at()
returns trigger
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ── Tabla 1: publicaciones de redes sociales (carrusel "Prensa") ───────
create table if not exists public.noticias (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  titulo       text not null,
  descripcion  text not null default '',
  enlace       text not null,
  fuente       text not null default 'Otro'
               check (fuente in ('Instagram','YouTube','Facebook','Otro')),
  etiqueta     text not null default '',
  fecha        date not null default current_date,
  imagen       text,        -- URL pública de la miniatura subida (NULL = usar fallback automático)
  imagen_path  text,        -- ruta del archivo en Storage, para poder borrarlo
  constraint noticias_enlace_http_check check (enlace like 'http://%' or enlace like 'https://%')
);

drop trigger if exists trg_noticias_updated_at on public.noticias;
create trigger trg_noticias_updated_at
  before update on public.noticias
  for each row execute function public.set_updated_at();

alter table public.noticias enable row level security;

drop policy if exists "public_read_noticias" on public.noticias;
create policy "public_read_noticias" on public.noticias
  for select using (true);

drop policy if exists "auth_insert_noticias" on public.noticias;
create policy "auth_insert_noticias" on public.noticias
  for insert to authenticated with check (true);

drop policy if exists "auth_update_noticias" on public.noticias;
create policy "auth_update_noticias" on public.noticias
  for update to authenticated using (true) with check (true);

drop policy if exists "auth_delete_noticias" on public.noticias;
create policy "auth_delete_noticias" on public.noticias
  for delete to authenticated using (true);

-- ── Tabla 2: publicaciones en PDF (Boletines + Comunicados) ─────────────
-- Una sola tabla con "tipo" como discriminador: ambas páginas públicas solo
-- filtran por tipo, así que no hace falta duplicar el esquema.
create table if not exists public.publicaciones (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  tipo         text not null check (tipo in ('boletin','comunicado')),
  titulo       text not null,
  descripcion  text not null default '',
  fecha        date not null default current_date,
  imagen       text not null,      -- URL pública de la miniatura
  imagen_path  text not null,      -- ruta del archivo de miniatura en Storage
  pdf_url      text not null,      -- URL pública del PDF
  pdf_path     text not null       -- ruta del archivo PDF en Storage
);

create index if not exists publicaciones_tipo_fecha_idx
  on public.publicaciones (tipo, fecha desc, created_at desc);

drop trigger if exists trg_publicaciones_updated_at on public.publicaciones;
create trigger trg_publicaciones_updated_at
  before update on public.publicaciones
  for each row execute function public.set_updated_at();

alter table public.publicaciones enable row level security;

drop policy if exists "public_read_publicaciones" on public.publicaciones;
create policy "public_read_publicaciones" on public.publicaciones
  for select using (true);

drop policy if exists "auth_insert_publicaciones" on public.publicaciones;
create policy "auth_insert_publicaciones" on public.publicaciones
  for insert to authenticated with check (true);

drop policy if exists "auth_update_publicaciones" on public.publicaciones;
create policy "auth_update_publicaciones" on public.publicaciones
  for update to authenticated using (true) with check (true);

drop policy if exists "auth_delete_publicaciones" on public.publicaciones;
create policy "auth_delete_publicaciones" on public.publicaciones
  for delete to authenticated using (true);

-- ── Buckets de Storage ───────────────────────────────────────────────────
-- allowed_mime_types/file_size_limit del lado del servidor: el formulario
-- del panel ya valida esto, pero eso es evitable llamando la API directo,
-- así que también se fuerza aquí. Se excluye SVG a propósito (puede llevar
-- <script> incrustado).
insert into storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
values ('admin-images', 'admin-images', true, array['image/png', 'image/jpeg', 'image/webp', 'image/gif'], 5242880)
on conflict (id) do update set
  allowed_mime_types = excluded.allowed_mime_types,
  file_size_limit = excluded.file_size_limit;

insert into storage.buckets (id, name, public, allowed_mime_types, file_size_limit)
values ('admin-pdfs', 'admin-pdfs', true, array['application/pdf'], 15728640)
on conflict (id) do update set
  allowed_mime_types = excluded.allowed_mime_types,
  file_size_limit = excluded.file_size_limit;

-- ── Políticas de Storage (storage.objects) ──────────────────────────────
-- Los buckets ya son públicos (public = true arriba), así que la descarga
-- por URL directa no depende de estas políticas. SELECT queda limitado a
-- "authenticated" para no permitir que cualquiera *liste* todos los
-- archivos del bucket vía la API (la app nunca usa list(), solo upload/
-- getPublicUrl/remove).
drop policy if exists "public_read_admin_images" on storage.objects;
drop policy if exists "authenticated_read_admin_images" on storage.objects;
create policy "authenticated_read_admin_images" on storage.objects
  for select to authenticated using (bucket_id = 'admin-images');

drop policy if exists "auth_insert_admin_images" on storage.objects;
create policy "auth_insert_admin_images" on storage.objects
  for insert to authenticated with check (bucket_id = 'admin-images');

drop policy if exists "auth_update_admin_images" on storage.objects;
create policy "auth_update_admin_images" on storage.objects
  for update to authenticated using (bucket_id = 'admin-images');

drop policy if exists "auth_delete_admin_images" on storage.objects;
create policy "auth_delete_admin_images" on storage.objects
  for delete to authenticated using (bucket_id = 'admin-images');

drop policy if exists "public_read_admin_pdfs" on storage.objects;
drop policy if exists "authenticated_read_admin_pdfs" on storage.objects;
create policy "authenticated_read_admin_pdfs" on storage.objects
  for select to authenticated using (bucket_id = 'admin-pdfs');

drop policy if exists "auth_insert_admin_pdfs" on storage.objects;
create policy "auth_insert_admin_pdfs" on storage.objects
  for insert to authenticated with check (bucket_id = 'admin-pdfs');

drop policy if exists "auth_update_admin_pdfs" on storage.objects;
create policy "auth_update_admin_pdfs" on storage.objects
  for update to authenticated using (bucket_id = 'admin-pdfs');

drop policy if exists "auth_delete_admin_pdfs" on storage.objects;
create policy "auth_delete_admin_pdfs" on storage.objects
  for delete to authenticated using (bucket_id = 'admin-pdfs');

-- ── Después de correr esto ───────────────────────────────────────────────
-- 1. Ve a Storage y confirma que "admin-images" y "admin-pdfs" existan y
--    tengan el toggle "Public bucket" activado (si el insert de arriba no
--    tomó efecto, créalos a mano con esos nombres exactos).
-- 2. Ve a Authentication → Users → Add user y crea el único usuario admin
--    (marca "Auto Confirm User").
-- 3. Ve a Authentication → Providers → Email y desactiva "Allow new users
--    to sign up" (no hay pantalla de registro, pero cierra igual esa vía).
-- 4. Ve a Authentication → Policies (o Auth → Settings, según la versión
--    del dashboard) y activa "Leaked password protection" — no se puede
--    activar por SQL, solo desde el dashboard.
--
-- Nota sobre el Security Advisor de Supabase: vas a ver 6 warnings
-- "rls_policy_always_true" (INSERT/UPDATE/DELETE con USING/WITH CHECK
-- true para el rol authenticated). Es intencional: hay un solo usuario
-- admin compartido y sin registro público (ver punto 3), así que
-- "authenticated" equivale en la práctica a "el admin". Si en el futuro
-- se crean varias cuentas y se quiere que cada quien solo pueda
-- editar/borrar lo suyo, ahí sí habría que agregar una columna de
-- "creado_por" y acotar las políticas a auth.uid() = creado_por.
