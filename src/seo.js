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
    title: 'ADICONAR Pasto Nariño | Empresa de servicios para EDS en Colombia',
    description:
      'ADICONAR es la empresa y gremio de referencia para EDS en Pasto, Nariño y Colombia. Integramos productos, servicios técnicos, asesoría jurídica, pólizas, trámites y actualidad sectorial.',
  },
  'centro-soluciones': {
    title: 'Centro de soluciones ADICONAR para EDS en Pasto, Nariño y Colombia',
    description:
      'Centro de soluciones ADICONAR para estaciones de servicio y EDS en Pasto, Nariño y Colombia: soporte técnico, pólizas, asesoría jurídica, trámites y acompañamiento operativo.',
  },
  almacen: {
    title: 'Productos ADICONAR para EDS | Almacén especializado en Pasto, Nariño',
    description:
      'Almacén ADICONAR con productos, repuestos, equipos y consumibles para EDS en Pasto, Nariño y Colombia. Soluciones para operación segura y continuidad del servicio.',
  },
  'servicios-tecnicos': {
    title: 'Servicios técnicos ADICONAR para EDS en Pasto, Nariño y Colombia',
    description:
      'Servicios técnicos ADICONAR para estaciones de servicio y EDS: mantenimiento, pruebas, aforos, hermeticidad y acompañamiento operativo en Pasto, Nariño y Colombia.',
  },
  polizas: {
    title: 'Pólizas y seguros ADICONAR para EDS | Pasto, Nariño, Colombia',
    description:
      'Gestión de pólizas y aseguramiento para estaciones de servicio y EDS con ADICONAR. Acompañamiento profesional en Pasto, Nariño y cobertura nacional en Colombia.',
  },
  asesoria: {
    title: 'Asesoría jurídica ADICONAR para EDS y empresas del sector combustible',
    description:
      'Asesoría jurídica ADICONAR para estaciones de servicio, EDS y empresas del sector combustible: cumplimiento, gestión documental y respaldo legal en Pasto, Nariño y Colombia.',
  },
  tramites: {
    title: 'Trámites ADICONAR para EDS ante entidades en Pasto, Nariño y Colombia',
    description:
      'Gestión de trámites ADICONAR para estaciones de servicio y EDS ante entidades públicas y privadas. Soporte administrativo y operativo en Pasto, Nariño y Colombia.',
  },
  prensa: {
    title: 'Prensa ADICONAR | Boletines del sector EDS en Pasto, Nariño y Colombia',
    description:
      'Boletines y contenidos de prensa ADICONAR sobre EDS, empresa, gremio y temas sectoriales en Pasto, Nariño y Colombia, incluyendo actualidad de Fendipetroleo.',
  },
  noticias: {
    title: 'Noticias ADICONAR | Actualidad EDS en Pasto, Nariño y Colombia',
    description:
      'Noticias ADICONAR con información para EDS, aliados y empresas del sector combustible en Pasto, Nariño y Colombia, con seguimiento a agenda gremial y Fendipetroleo.',
  },
  comunicados: {
    title: 'Comunicados oficiales ADICONAR | Gremio EDS en Pasto, Nariño y Colombia',
    description:
      'Comunicados oficiales ADICONAR para estaciones de servicio, aliados y gremio EDS en Pasto, Nariño y Colombia. Información institucional y sectorial actualizada.',
  },
  aliados: {
    title: 'Aliados estratégicos ADICONAR | Red para EDS en Pasto, Nariño y Colombia',
    description:
      'Red de aliados estratégicos ADICONAR para estaciones de servicio y EDS, con convenios, soporte técnico y oportunidades empresariales en Pasto, Nariño y Colombia.',
  },
}

export const seoBase = {
  image: '/LogoAdiconarInicio.webp',
  imageUrl: absoluteUrl('/LogoAdiconarInicio.webp'),
  siteName: 'ADICONAR',
  locale: 'es_CO',
  description:
    'ADICONAR es empresa y gremio de apoyo para EDS en Pasto, Nariño y Colombia, con productos, servicios técnicos, asesoría jurídica, pólizas, trámites y acompañamiento sectorial.',
}

const faqByView = {
  home: [
    {
      question: '¿Qué es ADICONAR y a quién acompaña?',
      answer:
        'ADICONAR es una organización empresarial y gremial que acompaña estaciones de servicio (EDS) con soluciones técnicas, jurídicas, operativas y de abastecimiento en Pasto, Nariño y Colombia.',
    },
    {
      question: '¿ADICONAR atiende únicamente en Pasto?',
      answer:
        'ADICONAR tiene base en Pasto y cobertura en Nariño, con acompañamiento a empresas y EDS del suroccidente y soporte para necesidades a nivel Colombia según el servicio.',
    },
    {
      question: '¿Qué servicios ofrece ADICONAR para EDS?',
      answer:
        'ADICONAR ofrece centro de soluciones con servicios técnicos, asesoría jurídica, gestión de pólizas, trámites ante entidades y almacén de productos especializados para estaciones de servicio.',
    },
  ],
  almacen: [
    {
      question: '¿Qué productos maneja el almacén de ADICONAR?',
      answer:
        'El almacén ADICONAR reúne repuestos, equipos, accesorios y consumibles para operación de EDS, organizados en líneas técnicas especializadas para facilitar la búsqueda y compra.',
    },
    {
      question: '¿Los productos ADICONAR están disponibles para EDS en Nariño?',
      answer:
        'Sí. ADICONAR atiende requerimientos del sector en Pasto y Nariño, y según el tipo de producto puede gestionar solicitudes para otras zonas de Colombia.',
    },
  ],
  'servicios-tecnicos': [
    {
      question: '¿Qué incluyen los servicios técnicos de ADICONAR?',
      answer:
        'Incluyen mantenimiento, aforos, pruebas de hermeticidad y estanqueidad, soporte especializado en infraestructura y acompañamiento para continuidad operativa de EDS.',
    },
    {
      question: '¿ADICONAR presta servicios técnicos para cumplimiento normativo?',
      answer:
        'Sí. El enfoque técnico de ADICONAR ayuda a las estaciones de servicio a mantener operación segura y alineada con exigencias normativas del sector combustibles.',
    },
  ],
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

const buildLocalBusinessSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: seoBase.siteName,
  url: SITE_URL,
  image: seoBase.imageUrl,
  logo: seoBase.imageUrl,
  description: seoBase.description,
  telephone: '+57 318 589 6142',
  email: 'contacto@adiconar.co',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle 21 #16 - 44 Navarrete',
    addressLocality: 'Pasto',
    addressRegion: 'Nariño',
    addressCountry: 'CO',
  },
  areaServed: [
    'Pasto',
    'Nariño',
    'Colombia',
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

const buildFaqSchema = (view) => {
  const items = faqByView[view] ?? []
  if (items.length === 0) {
    return null
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

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
    const title = `${currentCategory.title} ADICONAR | Productos para EDS en Pasto, Nariño y Colombia`
    const description = `Catálogo ADICONAR de ${currentCategory.title} para estaciones de servicio y EDS en Pasto, Nariño y Colombia. Productos, repuestos y soporte especializado.`
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

  if (view === 'home') {
    schema.unshift(buildLocalBusinessSchema(), buildOrganizationSchema(), buildWebSiteSchema())
  }

  if (breadcrumbTrail.length > 0) {
    schema.push(buildBreadcrumbSchema(breadcrumbTrail))
  }

  if (view === 'noticias' || view === 'prensa') {
    schema.push(buildNewsCollectionSchema({ ...meta, canonical }))
  }

  const faqSchema = buildFaqSchema(view)
  if (faqSchema) {
    schema.push(faqSchema)
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
