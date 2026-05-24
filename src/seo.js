import { categories } from './data/categories.js'
import { noticias } from './data/noticias.js'

export const SITE_URL = 'https://adiconar.co'

export const absoluteUrl = (pathname = '/') => new URL(pathname, SITE_URL).toString()

export const routePaths = {
  home: '/',
  centroSoluciones: '/centro-de-soluciones',
  almacen: '/almacen',
  serviciosTecnicos: '/servicios-tecnicos',
  polizas: '/polizas-y-seguros',
  asesoria: '/asesoria-juridica',
  tramites: '/tramites',
  prensa: '/prensa',
  noticias: '/noticias',
  comunicados: '/comunicados',
  aliados: '/aliados',
}

export const viewToPath = {
  home: routePaths.home,
  'centro-soluciones': routePaths.centroSoluciones,
  almacen: routePaths.almacen,
  'servicios-tecnicos': routePaths.serviciosTecnicos,
  polizas: routePaths.polizas,
  asesoria: routePaths.asesoria,
  tramites: routePaths.tramites,
  prensa: routePaths.prensa,
  noticias: routePaths.noticias,
  comunicados: routePaths.comunicados,
  aliados: routePaths.aliados,
}

export const pathToView = Object.fromEntries(Object.entries(viewToPath).map(([view, path]) => [path, view]))

const routeMeta = {
  home: {
    title: 'ADICONAR | Servicios para estaciones de servicio en Pasto, Nariño',
    description:
      'ADICONAR impulsa estaciones de servicio en Pasto y Nariño con representación gremial, servicios técnicos, asesoría jurídica, pólizas, trámites y almacén especializado.',
  },
  'centro-soluciones': {
    title: 'Centro de soluciones para estaciones de servicio en Nariño | ADICONAR',
    description:
      'Centro de soluciones ADICONAR para estaciones de servicio: soporte técnico, pólizas, asesoría jurídica, trámites y acompañamiento operativo en Pasto y Nariño.',
  },
  almacen: {
    title: 'Almacén especializado para estaciones de servicio | ADICONAR',
    description:
      'Almacén especializado ADICONAR con repuestos, equipos y consumibles para estaciones de servicio en Pasto, Nariño y su área de influencia.',
  },
  'servicios-tecnicos': {
    title: 'Servicios técnicos para estaciones de servicio | ADICONAR',
    description:
      'Servicios técnicos para estaciones de servicio en Nariño: mantenimiento, soporte especializado, pruebas y acompañamiento operativo con ADICONAR.',
  },
  polizas: {
    title: 'Pólizas y aseguramiento para estaciones de servicio | ADICONAR',
    description:
      'Asesoría en pólizas y aseguramiento para estaciones de servicio en Pasto y Nariño, con acompañamiento profesional de ADICONAR.',
  },
  asesoria: {
    title: 'Asesoría jurídica para estaciones de servicio | ADICONAR',
    description:
      'Asesoría jurídica para estaciones de servicio en Nariño: cumplimiento, gestión documental y respaldo legal con el equipo de ADICONAR.',
  },
  tramites: {
    title: 'Trámites para estaciones de servicio en Nariño | ADICONAR',
    description:
      'Gestión de trámites ante entidades para estaciones de servicio en Pasto y Nariño, con soporte administrativo y operativo de ADICONAR.',
  },
  prensa: {
    title: 'Boletines y prensa ADICONAR | Noticias del sector en Nariño',
    description:
      'Boletines, novedades y contenidos de prensa de ADICONAR sobre estaciones de servicio, gremio y gestión sectorial en Nariño.',
  },
  noticias: {
    title: 'Noticias ADICONAR | Novedades del sector en Nariño',
    description:
      'Noticias y publicaciones de ADICONAR con información relevante para estaciones de servicio, aliados y actualidad del sector en Nariño.',
  },
  comunicados: {
    title: 'Comunicados ADICONAR | Información oficial del gremio',
    description:
      'Comunicados oficiales de ADICONAR para estaciones de servicio, aliados y miembros del gremio en Pasto, Nariño y Colombia.',
  },
  aliados: {
    title: 'Aliados estratégicos ADICONAR | Red de apoyo para EDS',
    description:
      'Red de aliados estratégicos ADICONAR para estaciones de servicio, con convenios, soporte y oportunidades en Pasto y Nariño.',
  },
}

export const seoBase = {
  image: '/LogoAdiconarInicio.webp',
  imageUrl: absoluteUrl('/LogoAdiconarInicio.webp'),
  siteName: 'ADICONAR',
  locale: 'es_CO',
  description:
    'ADICONAR impulsa estaciones de servicio en Pasto y Nariño con representación gremial, servicios técnicos, asesoría jurídica, pólizas, trámites y almacén especializado.',
}

const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: seoBase.siteName,
  url: SITE_URL,
  logo: seoBase.imageUrl,
  image: seoBase.imageUrl,
  description: seoBase.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 21 #16 - 44 Navarrete',
    addressLocality: 'Pasto',
    addressRegion: 'Nariño',
    addressCountry: 'CO',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+57 318 589 6142',
      email: 'contacto@adiconar.co',
      areaServed: 'CO',
      availableLanguage: 'es',
    },
  ],
  sameAs: [
    'https://www.facebook.com/share/17mGRkHmjR/?mibextid=wwXIfr',
    'https://www.instagram.com/adiconarnarino?igsh=a3Z6anF0bDFjbTJz&utm_source=qr',
  ],
})

const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: seoBase.siteName,
  url: SITE_URL,
  inLanguage: 'es-CO',
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/noticias?query={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
})

const buildWebPageSchema = (config) => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: config.title,
  description: config.description,
  url: config.canonical,
  inLanguage: 'es-CO',
  isPartOf: {
    '@type': 'WebSite',
    name: seoBase.siteName,
    url: SITE_URL,
  },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: seoBase.imageUrl,
  },
})

const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
})

const buildNewsCollectionSchema = (config) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: config.title,
  description: config.description,
  url: config.canonical,
  inLanguage: 'es-CO',
  isPartOf: {
    '@type': 'WebSite',
    name: seoBase.siteName,
    url: SITE_URL,
  },
  mainEntity: {
    '@type': 'ItemList',
    name: config.title,
    numberOfItems: noticias.length,
    itemListElement: noticias.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: item.enlace,
      name: item.titulo,
      description: item.descripcion,
      datePublished: item.fechaISO,
    })),
  },
})

const buildBreadcrumbTrail = (view, currentCategory) => {
  if (view === 'home') {
    return []
  }

  if (view === 'category' && currentCategory) {
    return [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
      { name: 'Almacén', path: routePaths.almacen },
      { name: currentCategory.title, path: `/categoria/${currentCategory.id}` },
    ]
  }

  const breadcrumbMap = {
    'centro-soluciones': [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
    ],
    almacen: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
      { name: 'Almacén', path: routePaths.almacen },
    ],
    'servicios-tecnicos': [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
      { name: 'Servicios técnicos', path: routePaths.serviciosTecnicos },
    ],
    polizas: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
      { name: 'Pólizas y seguros', path: routePaths.polizas },
    ],
    asesoria: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
      { name: 'Asesoría jurídica', path: routePaths.asesoria },
    ],
    tramites: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Centro de soluciones', path: routePaths.centroSoluciones },
      { name: 'Trámites', path: routePaths.tramites },
    ],
    prensa: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Prensa', path: routePaths.prensa },
    ],
    noticias: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Prensa', path: routePaths.prensa },
      { name: 'Noticias', path: routePaths.noticias },
    ],
    comunicados: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Prensa', path: routePaths.prensa },
      { name: 'Comunicados', path: routePaths.comunicados },
    ],
    aliados: [
      { name: 'Inicio', path: routePaths.home },
      { name: 'Aliados', path: routePaths.aliados },
    ],
  }

  return breadcrumbMap[view] ?? [
    { name: 'Inicio', path: routePaths.home },
    { name: 'ADICONAR', path: routePaths.home },
  ]
}

export const getSeoConfig = (view, currentCategory) => {
  if (view === 'category' && currentCategory) {
    const title = `${currentCategory.title} | Catálogo para estaciones de servicio | ADICONAR`
    const description = `Catálogo de ${currentCategory.title} para estaciones de servicio en Nariño. Soluciones, repuestos y soporte especializado con ADICONAR.`
    const canonical = absoluteUrl(`/categoria/${currentCategory.id}`)

    return {
      title,
      description,
      canonical,
      type: 'website',
      image: seoBase.imageUrl,
      schema: [
        buildWebPageSchema({ title, description, canonical }),
        buildBreadcrumbSchema(buildBreadcrumbTrail(view, currentCategory)),
      ],
    }
  }

  const meta = routeMeta[view] ?? routeMeta.home
  const canonicalPath = viewToPath[view] ?? routePaths.home
  const canonical = absoluteUrl(canonicalPath)
  const breadcrumbTrail = buildBreadcrumbTrail(view, currentCategory)
  const schema = [buildWebPageSchema({ ...meta, canonical })]

  if (breadcrumbTrail.length > 0) {
    schema.push(buildBreadcrumbSchema(breadcrumbTrail))
  }

  if (view === 'noticias' || view === 'prensa') {
    schema.push(buildNewsCollectionSchema({ ...meta, canonical }))
  }

  return {
    ...meta,
    canonical,
    image: seoBase.imageUrl,
    type: 'website',
    schema,
  }
}

export const getInitialRouteState = (locationOverride = null) => {
  if (typeof window === 'undefined') {
    const prerenderPath = locationOverride?.pathname ?? globalThis.__ADICONAR_PRERENDER_PATH__ ?? '/'

    if (prerenderPath.startsWith('/categoria/')) {
      const categoryId = prerenderPath.split('/').pop()
      const currentCategory = categories.find((item) => item.id === categoryId) ?? null

      return {
        currentView: currentCategory ? 'category' : 'home',
        currentCategory,
        activeSection: currentCategory ? `#categoria/${currentCategory.id}` : '#inicio',
      }
    }

    const currentView = pathToView[prerenderPath] ?? 'home'

    return {
      currentView,
      currentCategory: null,
      activeSection: currentView === 'home' ? '#inicio' : `#${currentView}`,
    }
  }

  const normalizedPath = (locationOverride?.pathname ?? window.location.pathname).replace(/\/$/, '') || '/'

  if (normalizedPath.startsWith('/categoria/')) {
    const categoryId = normalizedPath.split('/').pop()
    const currentCategory = categories.find((item) => item.id === categoryId) ?? null

    return {
      currentView: currentCategory ? 'category' : 'home',
      currentCategory,
      activeSection: currentCategory ? `#categoria/${currentCategory.id}` : '#inicio',
    }
  }

  const currentView = pathToView[normalizedPath] ?? 'home'

  return {
    currentView,
    currentCategory: null,
    activeSection:
      currentView === 'home'
        ? ((locationOverride?.hash ?? window.location.hash) || '#inicio')
        : `#${currentView}`,
  }
}
