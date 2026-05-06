import { useEffect, useRef, useState } from 'react'
import almacenIcon from './logos/almacen.png'
import serviciosIcon from './logos/servicios.png'
import pagosIcon from './logos/pagos.png'
import { categories } from './data/categories'
import CategoryPage from './components/CategoryPage'
import CentroSolucionesPage from './components/CentroSolucionesPage'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Centro de soluciones', href: '#centro-soluciones-page' },
  { label: 'Pagos', href: '#pagos' },
  { label: 'Contacto', href: '#contacto' },
]

const centroSolucionesItems = [
  { label: 'Almacén', desc: 'Control de inventario y suministros', href: '#almacen' },
  { label: 'Servicios técnicos', desc: 'Mantenimiento y soporte especializado', href: '#centro-soluciones-page' },
  { label: 'Gestión de Pólizas y aseguramiento', desc: 'Asesoría y trámite de seguros', href: '#centro-soluciones-page' },
  { label: 'Asesoría jurídica', desc: 'Consultoría legal para tu organización', href: '#centro-soluciones-page' },
  { label: 'Trámites ante entidades', desc: 'Gestiones administrativas y operativas', href: '#centro-soluciones-page' },
  { label: 'Aliados corporativos', desc: 'Red de partners estratégicos', href: '#centro-soluciones-page' },
]

const prensaItems = [
  { label: 'Noticias', status: 'Proximamente' },
  { label: 'Comunicados', status: 'Proximamente' },
  { label: 'Boletines', status: 'Proximamente' },
]

const accesos = [
  {
    title: 'Centro de Soluciones',
    href: '#centro-soluciones-page',
    copy: 'Integramos soporte tecnico, polizas, asesoria juridica y tramites normativos en un solo lugar para su estacion.',
    icon: serviciosIcon,
    size: 'large',
  },
  {
    title: 'Almacen Especializado',
    href: '#almacen',
    copy: 'Catalogo completo de repuestos, equipos y consumibles con disponibilidad 24/7.',
    icon: almacenIcon,
    size: 'small',
  },
  {
    title: 'Pagos y Facturacion',
    href: '#pagos',
    copy: 'Plataforma segura y agil para transacciones, pagos de servicios y facturacion electronica.',
    icon: pagosIcon,
    size: 'small',
  },
]

const objetivosCarousel = [
  {
    id: '001',
    texto:
      'Contribuir de manera efectiva al cumplimiento de los Objetivos de Desarrollo Sostenible y la Agenda 2030.',
  },
  {
    id: '002',
    texto:
      'Fortalecer capacidades locales para la gestion comunitaria con enfoque de derechos y participacion ciudadana.',
  },
  {
    id: '003',
    texto:
      'Impulsar procesos de formacion para lideres sociales, mujeres y jovenes en territorios priorizados.',
  },
  {
    id: '004',
    texto:
      'Promover redes de colaboracion institucional para ampliar el impacto social de los programas de ADICONAR.',
  },
  {
    id: '005',
    texto:
      'Acompanhar iniciativas sostenibles que mejoren la calidad de vida y el desarrollo integral de las comunidades.',
  },
]

const lineasServicio = [
  {
    code: 'S01',
    title: 'Soporte y Mantenimiento Tecnico',
    copy: 'Atencion especializada para garantizar el correcto funcionamiento de equipos, infraestructura y tecnologia de su estacion.',
  },
  {
    code: 'S02',
    title: 'Gestion de Polizas y Aseguramiento',
    copy: 'Proteccion integral y acompanamiento experto para cubrir todos los frentes de riesgo de su operacion.',
  },
  {
    code: 'S03',
    title: 'Asesoria Juridica Especializada',
    copy: 'Respaldo legal estrategico, enfocado exclusivamente en la regulacion y desafios del sector de combustibles.',
  },
  {
    code: 'S04',
    title: 'Tramites y Cumplimiento Normativo',
    copy: 'Gestion eficiente ante entidades gubernamentales para asegurar el cumplimiento operativo sin trabas burocraticas.',
  },
  {
    code: 'S05',
    title: 'Red de Aliados Corporativos',
    copy: 'Conexion con partners estrategicos que suman valor, eficiencia y oportunidades comerciales a su estacion.',
  },
]

function App() {
  const currentYear = new Date().getFullYear()
  const headerRef = useRef(null)

  const [currentView, setCurrentView] = useState('home')
  const [currentCategory, setCurrentCategory] = useState(null)
  const [objetivoActivo, setObjetivoActivo] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [activeSection, setActiveSection] = useState('#inicio')
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    participacion: '',
    mensaje: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })

  const totalObjetivos = objetivosCarousel.length
  const objetivoActual = objetivosCarousel[objetivoActivo]

  const irObjetivoAnterior = () => {
    setObjetivoActivo((prev) => (prev - 1 + totalObjetivos) % totalObjetivos)
  }

  const irObjetivoSiguiente = () => {
    setObjetivoActivo((prev) => (prev + 1) % totalObjetivos)
  }

  const navegarASeccion = (event, href, closeMobileMenu = false) => {
    event.preventDefault()

    if (href === '#centro-soluciones-page') {
      setCurrentView('centro-soluciones')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href.startsWith('#categoria/')) {
      const catId = href.split('/')[1]
      const category = categories.find(c => c.id === catId)
      if (category) {
        setCurrentView('category')
        setCurrentCategory(category)
        setActiveSection(href)
        if (closeMobileMenu) setMobileMenuOpen(false)

        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (currentView !== 'home') {
      setCurrentView('home')
      setTimeout(() => {
        scrollToSection(href, closeMobileMenu)
      }, 100)
    } else {
      scrollToSection(href, closeMobileMenu)
    }
  }

  const scrollToSection = (href, closeMobileMenu) => {
    const section = document.querySelector(href)
    if (!section) {
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0
    const sectionTop = window.scrollY + section.getBoundingClientRect().top - headerHeight - 8

    window.scrollTo({
      top: Math.max(sectionTop, 0),
      behavior: 'smooth',
    })

    setActiveSection(href)
    if (closeMobileMenu) setMobileMenuOpen(false)
  }

  const handleFormChange = (event) => {
    const { id, value } = event.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    if (formStatus.type !== 'idle') {
      setFormStatus({ type: 'idle', message: '' })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nombre = formData.nombre.trim()
    const correo = formData.correo.trim()
    const participacion = formData.participacion.trim()
    const mensaje = formData.mensaje.trim()
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)

    if (!nombre || !correo || !participacion || !mensaje) {
      setFormStatus({
        type: 'error',
        message: 'Completa todos los campos antes de enviar el formulario.',
      })
      return
    }

    if (!emailValido) {
      setFormStatus({
        type: 'error',
        message: 'El correo electronico no tiene un formato valido.',
      })
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => {
      setTimeout(resolve, 950)
    })

    setIsSubmitting(false)
    setFormStatus({
      type: 'success',
      message: 'Mensaje enviado. Te contactaremos en menos de 24 horas habiles.',
    })

    setFormData({
      nombre: '',
      correo: '',
      participacion: '',
      mensaje: '',
    })
  }

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href)

    const updateActiveSection = () => {
      if (currentView !== 'home') return;
      const offset = (headerRef.current?.getBoundingClientRect().height ?? 0) + 60
      let currentSection = sectionIds[0]

      sectionIds.forEach((href) => {
        const section = document.querySelector(href)
        if (!section) return

        const sectionTop = section.getBoundingClientRect().top
        if (sectionTop <= offset) {
          currentSection = href
        }
      })

      setActiveSection(currentSection)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateActiveSection)
    }
  }, [currentView])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f4f5ef] text-slate-900">
      <a href="#contenido-principal" className="skip-link">
        Saltar al contenido
      </a>

      <div className="grain-layer pointer-events-none fixed inset-0 z-0" aria-hidden="true" />

      <header
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-40 border-b border-white/25 bg-white/10 backdrop-blur-xl"
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a
            href="#inicio"
            onClick={(event) => navegarASeccion(event, '#inicio')}
            className="group inline-flex items-center gap-3"
          >
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-900/20 bg-white shadow-[0_16px_35px_-24px_rgba(20,83,45,0.9)] transition duration-300 group-hover:-translate-y-0.5">
              <img src="/logoNavBar.png" alt="Logo de ADICONAR" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <p className="font-heading text-lg leading-none tracking-tight text-emerald-950">ADICONAR</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-800/70">
                Gestion social
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navItems.map((item) => {
              if (item.label === 'Centro de soluciones') {
                return (
                  <div
                    key={item.label}
                    className="group relative"
                  >
                    <button
                      type="button"
                      onClick={(event) => navegarASeccion(event, item.href)}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold tracking-[0.01em] transition duration-300 ${activeSection === item.href
                          ? 'bg-emerald-900 text-white shadow-[0_12px_20px_-14px_rgba(6,78,59,0.95)]'
                          : 'text-emerald-950 hover:bg-emerald-950/10'
                        }`}
                      aria-haspopup="true"
                    >
                      CENTRO DE SOLUCIONES
                      <span className="text-[10px] ml-1">▼</span>
                    </button>

                    <div
                      className="absolute -left-16 top-full pt-2 w-[550px] pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100 transition-opacity duration-200"
                    >
                      <div className="grid grid-cols-2 gap-2 rounded-2xl border border-emerald-900/15 bg-white/95 p-4 shadow-[0_28px_48px_-28px_rgba(6,78,59,0.7)] translate-y-1 group-hover:translate-y-0 transition duration-200">
                        {centroSolucionesItems.map((sol) => {
                          if (sol.label === 'Almacén') {
                            return (
                              <div key={sol.label} className="group/almacen relative">
                                <a
                                  href={sol.href}
                                  onClick={(event) => navegarASeccion(event, sol.href)}
                                  className="flex flex-col rounded-xl px-4 py-3 text-left transition hover:bg-emerald-50 h-full"
                                >
                                  <div className="flex justify-between items-center w-full">
                                    <span className="font-heading text-sm text-emerald-950 tracking-tight">{sol.label}</span>
                                    <span className="text-[10px] text-emerald-950">▶</span>
                                  </div>
                                  <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">{sol.desc}</span>
                                </a>
                                
                                <div className="absolute left-[95%] top-0 ml-1 w-[400px] pointer-events-none opacity-0 group-hover/almacen:pointer-events-auto group-hover/almacen:opacity-100 group-focus-within/almacen:pointer-events-auto group-focus-within/almacen:opacity-100 transition-opacity duration-200">
                                  <div className="grid gap-1 rounded-2xl border border-emerald-900/15 bg-white/95 p-3 shadow-[0_28px_48px_-28px_rgba(6,78,59,0.7)] translate-x-1 group-hover/almacen:translate-x-0 transition duration-200">
                                    {categories.map((cat) => (
                                      <a
                                        key={cat.id}
                                        href={`#categoria/${cat.id}`}
                                        onClick={(event) => navegarASeccion(event, `#categoria/${cat.id}`)}
                                        className="flex flex-col rounded-xl px-4 py-2.5 text-left transition hover:bg-emerald-50"
                                      >
                                        <span className="font-heading text-sm text-emerald-950 tracking-tight">{cat.title}</span>
                                        <span className="text-xs text-slate-500 mt-0.5 line-clamp-1">{cat.sub.join(', ')}</span>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return (
                            <a
                              key={sol.label}
                              href={sol.href}
                              onClick={(event) => navegarASeccion(event, sol.href)}
                              className="flex flex-col rounded-xl px-4 py-3 text-left transition hover:bg-emerald-50"
                            >
                              <span className="font-heading text-sm text-emerald-950 tracking-tight">{sol.label}</span>
                              <span className="text-[11px] text-slate-500 mt-1 line-clamp-1">{sol.desc}</span>
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(event) => navegarASeccion(event, item.href)}
                  aria-current={activeSection === item.href ? 'page' : undefined}
                  className={`rounded-full px-3 py-2 text-sm font-semibold tracking-[0.01em] transition duration-300 ${activeSection === item.href && currentView === 'home'
                      ? 'bg-emerald-900 text-white shadow-[0_12px_20px_-14px_rgba(6,78,59,0.95)]'
                      : 'text-emerald-950 hover:bg-emerald-950/10'
                    }`}
                >
                  {item.label}
                </a>
              )
            })}

            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-950/15 bg-white/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900"
                aria-haspopup="true"
              >
                Prensa
                <span className="text-[10px]">▼</span>
              </button>

              <div className="pointer-events-none absolute right-0 top-[calc(100%+0.55rem)] w-56 translate-y-1 rounded-2xl border border-emerald-900/15 bg-white/95 p-2 opacity-0 shadow-[0_28px_48px_-28px_rgba(6,78,59,0.7)] transition duration-200 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {prensaItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    disabled
                    className="mb-1 flex w-full cursor-not-allowed items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-emerald-950/70 last:mb-0"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.12em] text-emerald-800/60">
                      {item.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="grid h-11 w-11 place-items-center rounded-full border border-emerald-900/20 bg-white/80 text-emerald-950 transition duration-300 hover:-translate-y-0.5 lg:hidden"
            aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="relative h-5 w-5">
              <span
                className={`absolute left-0 top-1 h-0.5 w-5 bg-current transition ${mobileMenuOpen ? 'translate-y-1.5 rotate-45' : ''
                  }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-5 bg-current transition ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
              />
              <span
                className={`absolute left-0 top-4 h-0.5 w-5 bg-current transition ${mobileMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
                  }`}
              />
            </span>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-emerald-950/60 backdrop-blur-sm" />
          <div className="relative ml-auto h-full w-[min(88vw,24rem)] bg-[#f4f5ef] p-6 shadow-[-30px_0_60px_-32px_rgba(2,44,34,0.85)]">
            <div className="flex items-center justify-between">
              <p className="font-heading text-xl tracking-tight text-emerald-950">Navegacion</p>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border border-emerald-900/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900"
              >
                Cerrar
              </button>
            </div>

            <nav className="mt-8 space-y-3">
              {navItems.map((item, index) => {
                if (item.label === 'Centro de soluciones') {
                  return (
                    <div key={item.label} className="space-y-2">
                      <button
                        type="button"
                        onClick={(event) => navegarASeccion(event, item.href, true)}
                        className="flex w-full items-center justify-between px-4 py-2 font-semibold uppercase tracking-[0.15em] text-emerald-900 border-b border-emerald-900/10 text-xs"
                      >
                        CENTRO DE SOLUCIONES
                      </button>
                      <div className="grid gap-2 pl-4">
                        {centroSolucionesItems.map((sol) => {
                          if (sol.label === 'Almacén') {
                            return (
                              <div key={sol.label} className="space-y-1 mt-2 mb-2 border-t border-b border-emerald-900/10 py-2">
                                <a
                                  href={sol.href}
                                  onClick={(event) => navegarASeccion(event, sol.href, true)}
                                  className="block rounded-xl px-4 py-2.5 text-sm font-semibold transition bg-emerald-900/5 text-emerald-950"
                                >
                                  {sol.label}
                                </a>
                                <div className="grid gap-1 pl-4 mt-2">
                                  {categories.map((cat) => (
                                    <a
                                      key={`mobile-cat-${cat.id}`}
                                      href={`#categoria/${cat.id}`}
                                      onClick={(event) => navegarASeccion(event, `#categoria/${cat.id}`, true)}
                                      className={`block rounded-xl px-4 py-2 text-xs font-medium transition ${activeSection === `#categoria/${cat.id}`
                                          ? 'bg-emerald-900 text-white'
                                          : 'bg-white/40 text-emerald-950 hover:bg-white'
                                        }`}
                                    >
                                      • {cat.title}
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )
                          }
                          return (
                            <a
                              key={`mobile-sol-${sol.label}`}
                              href={sol.href}
                              onClick={(event) => navegarASeccion(event, sol.href, true)}
                              className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${activeSection === sol.href
                                  ? 'bg-emerald-900 text-white'
                                  : 'bg-white/50 text-emerald-950 hover:bg-white'
                                }`}
                            >
                              {sol.label}
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  )
                }

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(event) => navegarASeccion(event, item.href, true)}
                    className={`rise-in block rounded-2xl border px-4 py-3 text-base font-semibold transition ${activeSection === item.href && currentView === 'home'
                        ? 'border-emerald-900 bg-emerald-900 text-white'
                        : 'border-emerald-900/20 bg-white text-emerald-950 hover:border-emerald-900/50'
                      }`}
                    style={{ animationDelay: `${80 + index * 45}ms` }}
                  >
                    {item.label}
                  </a>
                )
              })}
            </nav>

            <div className="mt-8 rounded-2xl border border-emerald-900/15 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900">Prensa</p>
              <div className="mt-3 space-y-2">
                {prensaItems.map((item) => (
                  <p
                    key={`mobile-${item.label}`}
                    className="rounded-xl border border-dashed border-emerald-900/20 px-3 py-2 text-sm text-emerald-950/70"
                  >
                    {item.label} - {item.status.toLowerCase()}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <main id="contenido-principal" className="relative z-10">
        {currentView === 'home' ? (
          <>
            <section id="inicio" className="relative isolate min-h-[100dvh] overflow-hidden border-b border-emerald-950/10 bg-[#e9f0e5] pt-16 md:pt-24">
              <img
                src="https://situr.narino.gov.co/storage/Clientes/situr_narino/principal/imagenes/contenidos/12127-7_berruecos.jpg"
                alt="Comunidad en territorio"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/88 via-emerald-950/74 to-emerald-900/58" />
              <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-emerald-300/18 blur-3xl" />

              <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rise-in space-y-7">
                  <p className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.19em] text-emerald-50">
                    ONG ADICONAR
                  </p>
                  <h1 className="font-heading max-w-[15ch] text-4xl leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                    Construimos confianza para transformar territorio.
                  </h1>
                  <p className="max-w-[60ch] text-base leading-relaxed text-emerald-50/90 md:text-lg">
                    Disenamos procesos comunitarios con enfoque humano, soporte tecnico y alianzas que sostienen resultados reales en campo.
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#contacto"
                      onClick={(event) => navegarASeccion(event, '#contacto')}
                      className="rounded-full border border-emerald-200/50 bg-white px-6 py-3 text-sm font-semibold text-emerald-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100 active:translate-y-[1px]"
                    >
                      Sumar una alianza
                    </a>
                    <a
                      href="#pagos"
                      onClick={(event) => navegarASeccion(event, '#pagos')}
                      className="rounded-full border border-white/45 bg-transparent px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-white/10 active:translate-y-[1px]"
                    >
                      Realizar aporte
                    </a>
                  </div>
                </div>

                <aside className="rise-in self-end rounded-[1.8rem] border border-white/20 bg-white/10 p-5 text-white backdrop-blur-md shadow-[0_24px_44px_-28px_rgba(0,0,0,0.9)]" style={{ animationDelay: '140ms' }}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-50/90">
                    Prioridades 2026
                  </p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-white/15 bg-black/10 p-4">
                      <p className="text-3xl font-semibold tracking-tight">47.2%</p>
                      <p className="mt-1 text-sm text-emerald-50/85">Cobertura de programas en zonas rurales de Narino.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/15 bg-black/10 p-4">
                        <p className="text-2xl font-semibold tracking-tight">312</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.11em] text-emerald-50/80">hogares acompanados</p>
                      </div>
                      <div className="rounded-2xl border border-white/15 bg-black/10 p-4">
                        <p className="text-2xl font-semibold tracking-tight">18</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.11em] text-emerald-50/80">alianzas activas</p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            <section id="acceso-rapido" className="border-b border-emerald-950/10 py-16 md:py-24">
              <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Acceso rapido</p>
                <div className="mt-7 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
                  <a
                    href={accesos[0].href}
                    onClick={(event) => navegarASeccion(event, accesos[0].href)}
                    className="group rounded-[1.9rem] border border-emerald-900/12 bg-white p-7 shadow-[0_28px_40px_-34px_rgba(3,42,32,0.85)] transition duration-300 hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-900/8">
                      <img src={accesos[0].icon} alt={`Icono de ${accesos[0].title}`} className="h-9 w-9 object-contain" />
                    </div>
                    <h2 className="font-heading mt-5 max-w-[18ch] text-3xl leading-tight tracking-[-0.02em] text-emerald-950">
                      {accesos[0].title}
                    </h2>
                    <p className="mt-3 max-w-[48ch] text-base leading-relaxed text-slate-700">{accesos[0].copy}</p>
                    <p className="mt-6 text-sm font-semibold text-emerald-900 transition group-hover:translate-x-1">Conocer mas -&gt;</p>
                  </a>

                  <div className="grid gap-5">
                    {accesos.slice(1).map((item, index) => (
                      <a
                        key={item.title}
                        href={item.href}
                        onClick={(event) => navegarASeccion(event, item.href)}
                        className="group rounded-[1.5rem] border border-emerald-900/12 bg-[#edf0e3] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-900/30"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="font-heading text-2xl tracking-[-0.02em] text-emerald-950">{item.title}</h3>
                          <img src={item.icon} alt={`Icono de ${item.title}`} className="h-10 w-10 object-contain" />
                        </div>
                        <p className="mt-3 max-w-[43ch] text-sm leading-relaxed text-slate-700">{item.copy}</p>
                        <div className="mt-4 h-1 w-20 rounded-full bg-emerald-900/20 transition group-hover:w-28 group-hover:bg-emerald-800" style={{ transitionDelay: `${index * 50}ms` }} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="sobre-nosotros" className="border-b border-emerald-950/10 py-16 md:py-24">
              <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
                <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Sobre nosotros</p>
                    <h2 className="font-heading mt-4 max-w-[15ch] text-4xl leading-[1] tracking-[-0.03em] text-emerald-950 md:text-5xl">
                      Organizamos capacidades locales con enfoque de derechos.
                    </h2>
                    <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-slate-700">
                      ADICONAR es una organizacion social que integra formacion, gestion y acompanamiento para fortalecer tejido comunitario y generar resultados medibles.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-[1.5rem] border border-emerald-900/12 bg-white p-6 shadow-[0_18px_38px_-32px_rgba(3,42,32,0.9)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-900/70">Mision</p>
                      <h3 className="font-heading mt-3 text-2xl tracking-[-0.02em] text-emerald-950">Desarrollo comunitario sostenible</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        Impulsamos procesos de liderazgo social, inclusion y defensa de derechos para construir paz con justicia territorial.
                      </p>
                    </article>
                    <article className="rounded-[1.5rem] border border-emerald-900/12 bg-[#e9efe1] p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-900/70">Vision</p>
                      <h3 className="font-heading mt-3 text-2xl tracking-[-0.02em] text-emerald-950">Incidencia con alianzas reales</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        Queremos ser una referencia por la calidad del acompanamiento a comunidades, mujeres, ninos y lideres sociales.
                      </p>
                    </article>
                  </div>
                </div>

                <div className="mt-10 rounded-[2rem] border border-emerald-900/12 bg-emerald-950 p-6 text-emerald-50 md:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/85">Objetivos estrategicos</p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="grid h-10 w-10 place-items-center rounded-full border border-emerald-100/35 bg-emerald-100/10 text-lg transition hover:bg-emerald-100/20 active:translate-y-[1px]"
                        aria-label="Objetivo anterior"
                        onClick={irObjetivoAnterior}
                      >
                        &lt;
                      </button>
                      <button
                        type="button"
                        className="grid h-10 w-10 place-items-center rounded-full border border-emerald-100/35 bg-emerald-100/10 text-lg transition hover:bg-emerald-100/20 active:translate-y-[1px]"
                        aria-label="Objetivo siguiente"
                        onClick={irObjetivoSiguiente}
                      >
                        &gt;
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[1.4rem] border border-emerald-100/20 bg-black/15 p-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/80">Objetivo {objetivoActual.id}</p>
                    <p className="mt-3 text-base leading-relaxed text-emerald-50 md:text-lg">{objetivoActual.texto}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {objetivosCarousel.map((objetivo, index) => (
                      <button
                        key={objetivo.id}
                        type="button"
                        aria-label={`Ver objetivo ${objetivo.id}`}
                        onClick={() => setObjetivoActivo(index)}
                        className={`h-2.5 rounded-full transition-all ${index === objetivoActivo
                            ? 'w-10 bg-amber-300'
                            : 'w-6 bg-emerald-100/30 hover:bg-emerald-100/45'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section id="servicios" className="border-b border-emerald-950/10 py-16 md:py-24">
              <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="sticky top-24 self-start">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Centro de Soluciones</p>
                  <h2 className="font-heading mt-4 max-w-[14ch] text-4xl leading-[1] tracking-[-0.03em] text-emerald-950 md:text-5xl">
                    Todo lo que su estacion necesita, en un solo lugar.
                  </h2>
                  <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-slate-700">
                    Integramos servicios clave para facilitar su operacion, optimizar recursos y brindarle tranquilidad en cada frente normativo y operativo de su negocio.
                  </p>
                  <a
                    href="#centro-soluciones-page"
                    onClick={(event) => navegarASeccion(event, '#centro-soluciones-page')}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-emerald-900 bg-emerald-900 px-6 py-3 text-sm font-semibold tracking-[0.01em] text-white transition hover:-translate-y-0.5 hover:bg-emerald-800"
                  >
                    Conocer mas detalles
                    <span className="text-[10px]">▼</span>
                  </a>
                </div>

                <div className="grid gap-4">
                  {lineasServicio.map((item) => (
                    <article
                      key={item.code}
                      className="group rounded-[1.4rem] border border-emerald-900/12 bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-900/30"
                    >
                      <div className="flex items-start gap-4">
                        <div className="rounded-xl border border-emerald-900/20 bg-emerald-900/5 px-3 py-2 text-xs font-semibold tracking-[0.14em] text-emerald-900">
                          {item.code}
                        </div>
                        <div>
                          <h3 className="font-heading text-2xl tracking-[-0.02em] text-emerald-950">{item.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.copy}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="almacen" className="border-b border-emerald-950/10 bg-[#0f322b] py-16 md:py-24">
              <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/80">Almacen especializado</p>
                  <h2 className="font-heading mt-4 max-w-[14ch] text-4xl leading-[1] tracking-[-0.03em] text-white md:text-5xl">
                    Suministros y equipos de alta calidad para su estacion.
                  </h2>
                  <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-emerald-50/85">
                    Garantice la operacion continua de su negocio con nuestro completo catalogo de repuestos, sistemas de descarga, medicion y equipos principales. Todo con respaldo y disponibilidad garantizada.
                  </p>

                  <div className="mt-7 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-100/20 bg-emerald-100/10 p-4">
                      <p className="text-2xl font-semibold text-emerald-50">+250</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-emerald-50/80">referencias</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100/20 bg-emerald-100/10 p-4">
                      <p className="text-2xl font-semibold text-emerald-50">6</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-emerald-50/80">lineas de producto</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-100/20 bg-emerald-100/10 p-4">
                      <p className="text-2xl font-semibold text-emerald-50">24/7</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-emerald-50/80">disponibilidad</p>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100/20">
                  <img
                    src="https://img.freepik.com/vector-gratis/almacen-interior-logistica-entrega-carga_107791-1777.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Centro logistico de almacen especializado"
                    className="h-80 w-full object-cover sm:h-[26rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-emerald-100/25 bg-emerald-950/65 p-4 text-emerald-50 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-100/85">Catalogo organizado</p>
                    <p className="mt-2 text-sm leading-relaxed">
                      Sistemas de descarga, conduccion, despacho, control y seguridad organizados para facilitar sus pedidos.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="pagos" className="border-b border-emerald-950/10 py-16 md:py-24">
              <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Pagos</p>
                  <h2 className="font-heading mt-4 max-w-[14ch] text-4xl leading-[1] tracking-[-0.03em] text-emerald-950 md:text-5xl">
                    Aportes seguros con confirmacion y seguimiento.
                  </h2>
                  <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-slate-700">
                    Cada contribucion activa una ruta transparente: validacion, confirmacion y reporte para fortalecer la confianza de donantes y aliados.
                  </p>

                  <div className="mt-6 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-emerald-900/15 bg-white p-4">
                      <p className="text-2xl font-semibold tracking-tight text-emerald-950">SSL</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-emerald-900/70">cifrado activo</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-900/15 bg-white p-4">
                      <p className="text-2xl font-semibold tracking-tight text-emerald-950">24/7</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-emerald-900/70">disponibilidad</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-900/15 bg-white p-4">
                      <p className="text-2xl font-semibold tracking-tight text-emerald-950">100%</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-emerald-900/70">trazabilidad</p>
                    </div>
                  </div>

                  <a
                    href="#contacto"
                    onClick={(event) => navegarASeccion(event, '#contacto')}
                    className="mt-7 inline-flex rounded-full border border-emerald-900/20 bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-800 active:translate-y-[1px]"
                  >
                    Quiero contribuir
                  </a>
                </div>

                <aside className="rounded-[2rem] border border-emerald-900/15 bg-[#ecf2e5] p-6 md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-900/70">Ruta de aportes</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-2xl border border-emerald-900/15 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-emerald-900/70">Paso 1</p>
                      <p className="mt-2 text-sm text-slate-700">Registro del aporte y validacion automatica de datos.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-900/15 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-emerald-900/70">Paso 2</p>
                      <p className="mt-2 text-sm text-slate-700">Confirmacion segura y notificacion por correo al instante.</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-900/15 bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-emerald-900/70">Paso 3</p>
                      <p className="mt-2 text-sm text-slate-700">Reporte de uso y seguimiento del impacto asociado al programa.</p>
                    </div>
                  </div>
                </aside>
              </div>
            </section>

            <section id="contacto" className="py-16 md:py-24">
              <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
                <article className="rounded-[2rem] border border-emerald-900/15 bg-emerald-950 p-6 text-emerald-50 md:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/80">Contacto</p>
                  <h2 className="font-heading mt-4 max-w-[12ch] text-4xl leading-[1] tracking-[-0.03em] text-white md:text-5xl">
                    Hablemos de la proxima alianza.
                  </h2>
                  <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-emerald-50/85 md:text-base">
                    Si quieres apoyar programas sociales, voluntariado o articulacion institucional, comparte tus datos y te escribimos pronto.
                  </p>

                  <div className="mt-8 space-y-3 text-sm md:text-base">
                    <p><span className="font-semibold text-white">Correo:</span> nadiconar@gmail.com</p>
                    <p><span className="font-semibold text-white">Telefono:</span> +57 312 847 1928</p>
                    <p><span className="font-semibold text-white">Direccion:</span> Pasto - Narino, Colombia</p>
                  </div>
                </article>

                <article className="rounded-[2rem] border border-emerald-900/15 bg-white p-6 shadow-[0_24px_40px_-30px_rgba(3,42,32,0.85)] md:p-8">
                  <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="block text-sm font-semibold text-slate-900">
                        Nombre completo
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        value={formData.nombre}
                        onChange={handleFormChange}
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="correo" className="block text-sm font-semibold text-slate-900">
                        Correo electronico
                      </label>
                      <input
                        id="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleFormChange}
                        placeholder="tucorreo@ejemplo.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="participacion" className="block text-sm font-semibold text-slate-900">
                        Como quieres participar?
                      </label>
                      <select
                        id="participacion"
                        value={formData.participacion}
                        onChange={handleFormChange}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800"
                      >
                        <option value="">Selecciona una opcion</option>
                        <option value="donacion">Donacion</option>
                        <option value="voluntariado">Voluntariado</option>
                        <option value="alianza">Alianza institucional</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mensaje" className="block text-sm font-semibold text-slate-900">
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        rows="5"
                        value={formData.mensaje}
                        onChange={handleFormChange}
                        placeholder="Cuentanos como te gustaria participar"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-w-[11.5rem] items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                    </button>

                    {formStatus.type === 'error' && (
                      <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {formStatus.message}
                      </p>
                    )}

                    {formStatus.type === 'success' && (
                      <p className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                        {formStatus.message}
                      </p>
                    )}
                  </form>
                </article>
              </div>
            </section>
          </>
        ) : currentView === 'category' ? (
          <CategoryPage category={currentCategory} />
        ) : currentView === 'centro-soluciones' ? (
          <CentroSolucionesPage />
        ) : null}
      </main>

      <footer className="relative z-10 border-t border-emerald-950/15 bg-[#0d2721] text-emerald-50">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-12 px-4 py-12 text-center md:px-8">
          <div className="flex flex-col items-center">
            <p className="font-heading text-3xl tracking-tight text-white">ADICONAR</p>
            <p className="mt-3 max-w-[48ch] text-sm leading-relaxed text-emerald-100/85">
              Impulsamos desarrollo comunitario con metodo, alianzas y gestion transparente para sostener resultados de largo plazo.
            </p>
            <a
              href="#pagos"
              onClick={(event) => navegarASeccion(event, '#pagos')}
              className="mt-5 inline-flex rounded-full border border-amber-300/50 bg-amber-300 px-5 py-2.5 text-sm font-semibold text-emerald-950 transition duration-300 hover:-translate-y-0.5 hover:bg-amber-200"
            >
              Realizar un aporte
            </a>
          </div>

          <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Navegacion</p>
              <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
                {navItems.map((item) => (
                  <a
                    key={`footer-${item.href}`}
                    href={item.href}
                    onClick={(event) => navegarASeccion(event, item.href)}
                    className="block transition hover:text-amber-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Contacto</p>
              <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
                <p>nadiconar@gmail.com</p>
                <p>+57 312 847 1928</p>
                <p>Pasto, Colombia</p>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-100/65">Legal</p>
              <div className="mt-4 space-y-2 text-sm text-emerald-100/85">
                <a
                  href="mailto:nadiconar@gmail.com?subject=Solicitud%20politica%20de%20privacidad"
                  className="block transition hover:text-amber-200"
                >
                  Politica de privacidad
                </a>
                <a
                  href="mailto:nadiconar@gmail.com?subject=Solicitud%20terminos%20de%20servicio"
                  className="block transition hover:text-amber-200"
                >
                  Terminos de servicio
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-100/10 bg-black/20">
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 text-center text-xs text-emerald-100/70 md:px-8">
            <p>© {currentYear} ADICONAR ONG. Todos los derechos reservados.</p>
            <p>
              Diseñado por{' '}
              <a
                href="https://www.linkedin.com/in/oscar-julian-narvaez-5b144120b/"
                className="text-emerald-100/70 transition hover:text-amber-200"
              >
                ZOKY
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
