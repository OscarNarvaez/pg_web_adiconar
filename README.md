# ADICONAR - Sitio Base

Proyecto base del sitio web de la ADICONAR, construido con React + Vite + Tailwind CSS.

La estructura inicial replica el estilo general de la web de AWALA (home con navbar, hero, secciones institucionales y footer) para continuar agregando contenido real en siguientes iteraciones.

## Stack

- React
- Vite
- Tailwind CSS

## Requisitos

- Node.js 20.x
- npm 10+

## Scripts

- `npm run dev`: inicia servidor de desarrollo.
- `npm run build`: genera build de produccion.
- `npm run preview`: previsualiza el build.
- `npm run lint`: ejecuta ESLint.

## Estado actual

- Home base creada.
- Navbar base creado.
- Secciones iniciales: inicio, quienes somos, objetivos, noticias y contacto.
- Listo para reemplazar textos, imagenes y enlaces finales de ADICONAR.

## Guia rapida de contraste (AA)

Sin cambiar el color de fondo de secciones, usa esta regla para texto legible:

- Fondos claros (`#ffffff`, `#d8d8d8`): usar texto `slate-700` o mas oscuro (`slate-800`, `emerald-900`) para parrafos y etiquetas.
- Fondos oscuros o imagen con overlay: usar texto `white` o `emerald-50`, preferiblemente sobre una superficie interna oscura semitransparente.
- Texto pequeno (`text-xs`, `text-sm`): evitar tonos medios (`slate-500`, `emerald-400`) y usar tonos de alto contraste.
- Inputs y placeholders: mantener valor en `slate-800` y placeholder al menos en `slate-500`.
- Componentes sobre imagen: agregar apoyo visual con `text-shadow` suave (`.text-aa-shadow`) o caja oscura translúcida.

Referencia minima: para texto normal, buscar contraste de al menos 4.5:1 (WCAG AA).
