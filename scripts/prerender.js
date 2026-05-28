import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { categories } from '../src/data/categories.js'
import { SITE_URL, getSeoConfig, routePaths, seoBase } from '../src/seo.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

const staticRoutes = [
  { path: routePaths.home, view: 'home' },
  { path: routePaths.centroSoluciones, view: 'centro-soluciones' },
  { path: routePaths.almacen, view: 'almacen' },
  { path: routePaths.serviciosTecnicos, view: 'servicios-tecnicos' },
  { path: routePaths.polizas, view: 'polizas' },
  { path: routePaths.asesoria, view: 'asesoria' },
  { path: routePaths.tramites, view: 'tramites' },
  { path: routePaths.prensa, view: 'prensa' },
  { path: routePaths.noticias, view: 'noticias' },
  { path: routePaths.comunicados, view: 'comunicados' },
  { path: routePaths.aliados, view: 'aliados' },
]

const routes = [
  ...staticRoutes,
  ...categories.map((category) => ({ path: `/categoria/${category.id}`, view: 'category', category })),
]

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const replaceOrInsert = (html, pattern, replacement) => {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement)
  }

  return html.replace('</head>', `  ${replacement}\n</head>`)
}

const buildSchemaScript = (schema) => `<script type="application/ld+json" data-seo-schema="adiconar">${JSON.stringify(schema ?? []).replace(/</g, '\u003c')}</script>`

const injectSeo = (template, config) => {
  let html = template
  html = replaceOrInsert(html, /<title>.*?<\/title>/is, `<title>${escapeHtml(config.title)}</title>`)
  html = replaceOrInsert(html, /<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${escapeHtml(config.canonical)}" />`)
  html = replaceOrInsert(
    html,
    /<link\s+rel="alternate"\s+hreflang="es-CO"[^>]*>/i,
    `<link rel="alternate" hreflang="es-CO" href="${escapeHtml(config.canonical)}" />`
  )
  html = replaceOrInsert(
    html,
    /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*>/i,
    `<link rel="alternate" hreflang="x-default" href="${escapeHtml(config.canonical)}" />`
  )
  html = replaceOrInsert(html, /<meta\s+name="description"[^>]*>/i, `<meta name="description" content="${escapeHtml(config.description)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:title"[^>]*>/i, `<meta property="og:title" content="${escapeHtml(config.title)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:description"[^>]*>/i, `<meta property="og:description" content="${escapeHtml(config.description)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:type"[^>]*>/i, `<meta property="og:type" content="${escapeHtml(config.type)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:url"[^>]*>/i, `<meta property="og:url" content="${escapeHtml(config.canonical)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:site_name"[^>]*>/i, `<meta property="og:site_name" content="${escapeHtml(seoBase.siteName)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:image"[^>]*>/i, `<meta property="og:image" content="${escapeHtml(config.image ?? seoBase.imageUrl)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:image:alt"[^>]*>/i, `<meta property="og:image:alt" content="${escapeHtml(seoBase.siteName)}" />`)
  html = replaceOrInsert(html, /<meta\s+property="og:locale"[^>]*>/i, `<meta property="og:locale" content="${seoBase.locale}" />`)
  html = replaceOrInsert(html, /<meta\s+name="twitter:card"[^>]*>/i, `<meta name="twitter:card" content="summary_large_image" />`)
  html = replaceOrInsert(html, /<meta\s+name="twitter:site"[^>]*>/i, `<meta name="twitter:site" content="${escapeHtml(seoBase.siteName)}" />`)
  html = replaceOrInsert(html, /<meta\s+name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${escapeHtml(config.title)}" />`)
  html = replaceOrInsert(html, /<meta\s+name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${escapeHtml(config.description)}" />`)
  html = replaceOrInsert(html, /<meta\s+name="twitter:image"[^>]*>/i, `<meta name="twitter:image" content="${escapeHtml(config.image ?? seoBase.imageUrl)}" />`)
  html = replaceOrInsert(html, /<meta\s+name="application-name"[^>]*>/i, `<meta name="application-name" content="${escapeHtml(seoBase.siteName)}" />`)
  html = replaceOrInsert(html, /<meta\s+name="author"[^>]*>/i, `<meta name="author" content="${escapeHtml(seoBase.siteName)}" />`)

  html = html.replace(
    /<script type="application\/ld\+json" data-seo-schema="adiconar">[\s\S]*?<\/script>/i,
    buildSchemaScript(config.schema)
  )

  if (!html.includes('data-seo-schema="adiconar"')) {
    html = html.replace('</head>', `  ${buildSchemaScript(config.schema)}\n</head>`)
  }

  return html
}

const injectAppHtml = (template, appHtml) =>
  template.replace(/<div id="root">\s*<\/div>/i, `<div id="root">${appHtml}</div>`)

const routeToOutputPath = (routePath) => {
  if (routePath === '/') {
    return path.join(distDir, 'index.html')
  }

  return path.join(distDir, routePath.slice(1), 'index.html')
}

const buildSitemap = () => {
  const today = new Date().toISOString().slice(0, 10)

  const entries = routes
    .map((route) => {
      const priority = route.path === '/' ? '1.0' : route.view === 'category' ? '0.8' : '0.7'
      return `  <url><loc>${SITE_URL}${route.path}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`
}

const main = async () => {
  const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8')
  const vite = await createServer({
    root: rootDir,
    appType: 'custom',
    logLevel: 'error',
    server: {
      middlewareMode: true,
    },
  })

  try {
    const { default: App } = await vite.ssrLoadModule('/src/App.jsx')

    for (const route of routes) {
      globalThis.__ADICONAR_PRERENDER_PATH__ = route.path
      const appHtml = renderToString(React.createElement(App))
      delete globalThis.__ADICONAR_PRERENDER_PATH__

      const seoConfig = getSeoConfig(route.view, route.category ?? null)
      const htmlWithApp = injectAppHtml(template, appHtml)
      const finalHtml = injectSeo(htmlWithApp, seoConfig)
      const outputPath = routeToOutputPath(route.path)

      await fs.mkdir(path.dirname(outputPath), { recursive: true })
      await fs.writeFile(outputPath, finalHtml, 'utf8')
    }

    await fs.writeFile(path.join(distDir, 'sitemap.xml'), buildSitemap(), 'utf8')
  } finally {
    await vite.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
