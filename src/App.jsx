import { useEffect, useRef, useState } from 'react'
import almacenIcon from './logos/almacen.png'
import serviciosIcon from './logos/servicios.png'
import pagosIcon from './logos/pagos.png'
import { categories } from './data/categories'
import CategoryPage from './components/CategoryPage'
import CentroSolucionesPage from './components/CentroSolucionesPage'
import AlmacenPage from './components/AlmacenPage'
import TecnicalServicesPage from './components/TecnicalServicesPage'
import PolizasPage from './components/PolizasPage'
import AsesoriaPage from './components/AsesoriaPage'
import TramitesPage from './components/TramitesPage'
import PrensaPage from './components/PrensaPage'
import ComunicadosPage from './components/ComunicadosPage'
import Footer from './components/Footer'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre nosotros', href: '#sobre-nosotros' },
  { label: 'Centro de soluciones', href: '#almacen' },
  { label: 'Pagos', href: '#pagos' },
  { label: 'Contacto', href: '#contacto' },
]

const centroSolucionesItems = [
  { label: 'Almacén', desc: 'Control de inventario y suministros', href: '#almacen-page' },
  { label: 'Servicios técnicos', desc: 'Mantenimiento y soporte especializado', href: '#servicios-tecnicos-page' },
  { label: 'Gestión de Pólizas y aseguramiento', desc: 'Asesoría y trámite de seguros', href: '#polizas-page' },
  { label: 'Asesoría jurídica', desc: 'Consultoría legal para tu organización', href: '#asesoria-page' },
  { label: 'Trámites ante entidades', desc: 'Gestiones administrativas y operativas', href: '#tramites-page' },
  { label: 'Aliados corporativos', desc: 'Red de partners estratégicos', href: '#centro-soluciones-page' },
]

const prensaItems = [
  { label: 'Boletines', href: '#prensa-page' },
  { label: 'Comunicados', href: '#comunicados-page' },
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
    href: '#almacen-page',
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
    texto:
      'Fortalecer la representación y defensa gremial de las estaciones de servicio.',
  },
  {
    texto:
      'Brindar soluciones técnicas y operativas especializadas.',
  },
  {
    texto:
      'Promover el cumplimiento normativo y la seguridad operativa.',
  },
  {
    texto:
      'Generar alianzas estratégicas que aporten valor al sector.',
  },
  {
    texto:
      'Impulsar el crecimiento sostenible y competitivo de las estaciones de servicio.',
  },
]

const lineasServicio = [
  {
    code: 'S01',
    title: 'Servicios técnicos para EDS',
    copy: 'Atención especializada para garantizar el correcto funcionamiento de equipos, infraestructura y tecnología de su estación.',
  },
  {
    code: 'S02',
    title: 'Accesorios y suministros especializados',
    copy: 'Catálogo completo de repuestos, consumibles y componentes para sostener la operación diaria de su estación.',
  },
  {
    code: 'S03',
    title: 'Gestión de pólizas y aseguramiento',
    copy: 'Protección integral con acompañamiento experto para cubrir los frentes de riesgo de su operación.',
  },
  {
    code: 'S04',
    title: 'Asesoría jurídica, HSE y ambiental',
    copy: 'Respaldo legal, técnico y ambiental enfocado en cumplimiento, seguridad y gestión responsable.',
  },
  {
    code: 'S05',
    title: 'Trámites ante entidades gubernamentales',
    copy: 'Gestión eficiente ante autoridades y organismos para asegurar procesos sin trabas y con soporte continuo.',
  },
  {
    code: 'S06',
    title: 'Aforo y pruebas técnicas',
    copy: 'Verificación, medición y pruebas especializadas para validar la operación y el estado de sus sistemas.',
  },
  {
    code: 'S07',
    title: 'Construcción y remodelación para EDS',
    copy: 'Diseño, adecuación y modernización de espacios e infraestructura para mejorar la funcionalidad de su estación.',
  },
  {
    code: 'S08',
    title: 'Aliados corporativos y convenios estratégicos',
    copy: 'Conexión con partners estratégicos para sumar valor, eficiencia y oportunidades comerciales a su estación.',
  },
]

const dependenciasContacto = {
  secretaria: {
    label: 'Secretaria',
    contacto: 'Adriana Andrade',
    telefono: '3185896142',
    email: 'contacto@adiconar.co',
  },
  tesoreria: {
    label: 'Tesoreria',
    contacto: 'Bernarda Meneses',
    telefono: '3183123261',
    email: 'tesoreria@adiconar.co',
  },
  tecnico: {
    label: 'Técnico',
    contacto: 'Juan Carlos Flórez',
    telefono: '3176919910',
    email: 'serviciotecnico@adiconar.co',
  },
  asesoriaJuridica: {
    label: 'Asesora Jurídica',
    contacto: 'Karen Rivera Andrade',
    telefono: '3145640709',
    email: 'juridica@adiconar.co',
  },
  directorEjecutivo: {
    label: 'Director Ejecutivo',
    contacto: 'Rodrigo Yepes',
    telefono: '3164215844',
    email: 'direccion@adiconar.co',
  },
}

function App() {
  const currentYear = new Date().getFullYear()
  const headerRef = useRef(null)

  const [currentView, setCurrentView] = useState('home')
  const [currentCategory, setCurrentCategory] = useState(null)
  const [objetivoActivo, setObjetivoActivo] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showAllServiceLines, setShowAllServiceLines] = useState(false)

  const [activeSection, setActiveSection] = useState('#inicio')
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    participacion: '',
    mensaje: '',
  })
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })
  const [showNotificationPopup, setShowNotificationPopup] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')

  const totalObjetivos = objetivosCarousel.length
  const objetivoActual = objetivosCarousel[objetivoActivo]
  const visibleLineasServicio = showAllServiceLines ? lineasServicio : lineasServicio.slice(0, 4)

  const irObjetivoAnterior = () => {
    setObjetivoActivo((prev) => (prev - 1 + totalObjetivos) % totalObjetivos)
  }

  const irObjetivoSiguiente = () => {
    setObjetivoActivo((prev) => (prev + 1) % totalObjetivos)
  }

  const navegarASeccion = (event, href, closeMobileMenu = false) => {
    event.preventDefault()

    if (href === '#almacen-page') {
      setCurrentView('almacen')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#servicios-tecnicos-page') {
      setCurrentView('servicios-tecnicos')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#centro-soluciones-page') {
      setCurrentView('centro-soluciones')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#tramites-page') {
      setCurrentView('tramites')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#polizas-page') {
      setCurrentView('polizas')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#asesoria-page') {
      setCurrentView('asesoria')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#prensa-page') {
      setCurrentView('prensa')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveSection(href)
      if (closeMobileMenu) setMobileMenuOpen(false)
      return
    }

    if (href === '#comunicados-page') {
      setCurrentView('comunicados')
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

    if (id === 'dependencia') {
      const dependencia = dependenciasContacto[value]
      const mensajePrellenado = dependencia
        ? `Hola, mi nombre es _____ y me gustaria comunicarme con la dependencia de ${dependencia.label} para: ______`
        : ''

      setFormData((prev) => ({
        ...prev,
        participacion: value,
        mensaje: mensajePrellenado,
      }))

      if (formStatus.type !== 'idle') {
        setFormStatus({ type: 'idle', message: '' })
      }

      return
    }

    setFormData((prev) => ({ ...prev, [id]: value }))

    if (formStatus.type !== 'idle') {
      setFormStatus({ type: 'idle', message: '' })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const dependencia = dependenciasContacto[formData.participacion]
    const mensaje = formData.mensaje.trim()

    if (!dependencia || !mensaje) {
      setFormStatus({
        type: 'error',
        message: 'Selecciona una dependencia para continuar con el contacto por WhatsApp.',
      })
      return
    }

    const whatsappUrl = `https://wa.me/57${dependencia.telefono}?text=${encodeURIComponent(mensaje)}`
    window.location.href = whatsappUrl
  }

  const handleSolicitarAsesoria = (dependenciaKey) => {
    const dependencia = dependenciasContacto[dependenciaKey]
    if (!dependencia) return

    // Actualizar formData con la dependencia
    const mensajePrellenado = `Hola, mi nombre es _____ y me gustaria comunicarme con la dependencia de ${dependencia.label} para: ______`
    setFormData((prev) => ({
      ...prev,
      participacion: dependenciaKey,
      mensaje: mensajePrellenado,
    }))

    // Mostrar notificación popup
    setNotificationMessage(
      `Se ha asignado la dependencia: ${dependencia.label} (${dependencia.contacto}). Te estamos redirigiendo a la sección de contacto.`
    )
    setShowNotificationPopup(true)

    // Navegar a contacto después de un pequeño delay
    setTimeout(() => {
      setCurrentView('home')
      setTimeout(() => {
        const contactoSection = document.getElementById('contacto')
        if (contactoSection) {
          const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0
          const sectionTop = window.scrollY + contactoSection.getBoundingClientRect().top - headerHeight - 8
          window.scrollTo({
            top: Math.max(sectionTop, 0),
            behavior: 'smooth',
          })
          setActiveSection('#contacto')
        }
      }, 100)

      // Cerrar popup después de 3 segundos
      setTimeout(() => {
        setShowNotificationPopup(false)
      }, 3000)
    }, 500)
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
              <img src="./logoNavBar.png" alt="Logo de ADICONAR" className="h-9 w-9 object-contain" />
            </div>
            <div>
              <p className="font-heading text-lg leading-none tracking-tight text-emerald-950">ADICONAR</p>
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
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(event) => navegarASeccion(event, item.href)}
                    className="mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-emerald-950 hover:bg-emerald-50 transition last:mb-0"
                  >
                    <span>{item.label}</span>
                  </a>
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
          <div className="relative ml-auto h-full w-[min(88vw,24rem)] bg-[#f4f5ef] p-6 shadow-[-30px_0_60px_-32px_rgba(2,44,34,0.85)] overflow-y-auto">
            <div className="flex items-center justify-between sticky top-0 bg-[#f4f5ef] pb-4 z-10">
              <p className="font-heading text-xl tracking-tight text-emerald-950">Navegacion</p>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border border-emerald-900/25 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900"
              >
                Cerrar
              </button>
            </div>

            <nav className="mt-2 space-y-2">
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
                      <div className="grid gap-2 pl-3">
                        {centroSolucionesItems.map((sol) => {
                          if (sol.label === 'Almacén') {
                            return (
                              <div key={sol.label} className="space-y-1 mt-1 mb-1 border-t border-b border-emerald-900/10 py-1">
                                <a
                                  href={sol.href}
                                  onClick={(event) => navegarASeccion(event, sol.href, true)}
                                  className="block rounded-xl px-3 py-2 text-xs font-semibold transition bg-emerald-900/5 text-emerald-950"
                                >
                                  {sol.label}
                                </a>
                                <div className="grid gap-1 pl-2 mt-1">
                                  {categories.map((cat) => (
                                    <a
                                      key={`mobile-cat-${cat.id}`}
                                      href={`#categoria/${cat.id}`}
                                      onClick={(event) => navegarASeccion(event, `#categoria/${cat.id}`, true)}
                                      className={`block rounded-lg px-3 py-1 text-[10px] font-medium transition ${activeSection === `#categoria/${cat.id}`
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
                              className={`block rounded-xl px-3 py-2 text-xs font-medium transition ${activeSection === sol.href
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
                    className={`rise-in block rounded-2xl border px-3 py-2 text-sm font-semibold transition ${activeSection === item.href && currentView === 'home'
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

            <div className="mt-4 rounded-2xl border border-emerald-900/15 bg-white p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-900">Prensa</p>
              <div className="mt-3 space-y-2">
                {prensaItems.map((item) => (
                  <a
                    key={`mobile-${item.label}`}
                    href={item.href}
                    onClick={(event) => navegarASeccion(event, item.href, true)}
                    className="rounded-xl border border-emerald-900/20 px-3 py-2 text-xs text-emerald-950 hover:bg-emerald-50 transition block"
                  >
                    {item.label}
                  </a>
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
                src="/imagenesCentroSoluciones/principalAdiconar.png"
                alt="Comunidad en territorio"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/88 via-emerald-950/74 to-emerald-900/58" />
              <div className="pointer-events-none absolute -left-28 top-24 h-80 w-80 rounded-full bg-amber-300/25 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 bottom-16 h-72 w-72 rounded-full bg-emerald-300/18 blur-3xl" />

              <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 pb-16 pt-24 md:px-8 md:pb-20 md:pt-32 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rise-in space-y-7">
                  <p className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.19em] text-emerald-50">
                    ADICONAR
                  </p>
                  <h1 className="font-heading max-w-[15ch] text-4xl leading-[0.95] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
                    Centro integral de soluciones para estaciones de servicio.
                  </h1>
                  <p className="max-w-[60ch] text-base leading-relaxed text-emerald-50/90 md:text-lg">
                    Brindamos respaldo técnico, jurídico, operativo y comercial especializado para estaciones de servicio, integrando soluciones que fortalecen la operación, el cumplimiento normativo y el crecimiento del sector de combustibles.
                  </p>
                </div>
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
                      Asociación de Distribuidores Minoristas de Combustible de Nariño
                    </h2>
                    <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-slate-700">
                      Somos una organización gremial comprometida con el fortalecimiento de las estaciones de servicio y el sector de combustibles, brindando acompañamiento técnico, jurídico, operativo y comercial a sus afiliados y aliados.
                    </p>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-[1.5rem] border border-emerald-900/12 bg-white p-6 shadow-[0_18px_38px_-32px_rgba(3,42,32,0.9)]">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-900/70">Mision</p>
                      <h3 className="font-heading mt-3 text-2xl tracking-[-0.02em] text-emerald-950">COMPROMISO CON EL SECTOR DE COMBUSTIBLES.</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        Trabajamos para fortalecer y respaldar a las estaciones de servicio mediante soluciones integrales, asesoría especializada y servicios confiables que contribuyan al crecimiento, cumplimiento normativo y desarrollo sostenible del sector.
                      </p>
                    </article>
                    <article className="rounded-[1.5rem] border border-emerald-900/12 bg-[#e9efe1] p-6">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-900/70">Vision</p>
                      <h3 className="font-heading mt-3 text-2xl tracking-[-0.02em] text-emerald-950">LIDERAZGO Y RESPALDO PARA LAS EDS.</h3>
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        Ser el principal referente gremial y centro integral de soluciones para estaciones de servicio en el suroccidente colombiano, reconocido por su liderazgo, innovación y compromiso con el fortalecimiento del sector de combustibles.
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
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/80">Objetivo {objetivoActivo + 1}</p>
                    <p className="mt-3 text-base leading-relaxed text-emerald-50 md:text-lg">{objetivoActual.texto}</p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {objetivosCarousel.map((objetivo, index) => (
                      <button
                        key={index}
                        type="button"
                        aria-label={`Ver objetivo ${index + 1}`}
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
              <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 md:px-8 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="sticky top-24 self-start">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Centro de Soluciones</p>
                  <h2 className="font-heading mt-4 max-w-[14ch] text-4xl leading-[1] tracking-[-0.03em] text-emerald-950 md:text-5xl">
                    Gestionamos las soluciones que necesita su EDS.
                  </h2>
                  <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-slate-700">
                    Integramos servicios técnicos, jurídicos, normativos, comerciales y de infraestructura para facilitar la operación, optimizar recursos y brindarle tranquilidad en cada frente de su negocio.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {visibleLineasServicio.map((item) => (
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

                  {lineasServicio.length > 4 && (
                    <div className="md:col-span-2 flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={() => setShowAllServiceLines((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-900/20 bg-emerald-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-900"
                      >
                        {showAllServiceLines ? 'Mostrar menos' : 'Mostrar más'}
                        <span className="text-[10px]">{showAllServiceLines ? '▲' : '▼'}</span>
                      </button>
                    </div>
                  )}
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
                    Contamos con un almacén especializado en accesorios, consumibles y equipos para estaciones de servicio, ofreciendo productos confiables, respaldo técnico y disponibilidad para apoyar la operación continua de las EDS.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={(event) => navegarASeccion(event, '#almacen-page')}
                      className="inline-flex items-center justify-center rounded-full border border-amber-300 bg-amber-300 px-6 py-3 text-sm font-semibold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-amber-200"
                    >
                      Ver productos
                    </button>
                    <button
                      type="button"
                      onClick={(event) => navegarASeccion(event, '#centro-soluciones-page')}
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      Ir al Centro de Soluciones
                    </button>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[2rem] border border-emerald-100/20">
                  <img
                    src="https://www.mygestion.com/wp-content/uploads/almacen.jpg"
                    alt="Centro logistico de almacen especializado"
                    className="h-80 w-full object-cover sm:h-[26rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/35 to-transparent" />
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

            <section id="contacto" className="py-16 md:py-10">
              <div className="mx-auto grid w-full max-w-[92rem] place-items-center gap-8 px-4 md:px-8 ">
                <article className="rounded-[4rem] border border-emerald-900/15 bg-emerald-950 p-6 text-emerald-50 md:p-10 lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.20em] text-emerald-100/80 text-center">Contacto</p>
                  <h2 className="font-heading mt-4  text-4xl leading-[1.2] tracking-[-0.02em] text-white md:text-5xl text-center">
                    Respaldamos su Estación de Servicio.
                  </h2>

                  <div className="mt-8 space-y-4 text-sm md:text-base text-center">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100/70">Dependencias disponibles</p>
                      <div className="mt-3 space-y-2 text-emerald-50/90">
                        <p><span className="font-semibold text-white">Asesora Jurídica: </span> Karen Rivera Andrade</p>
                        <p><span className="font-semibold text-white">Director Ejecutivo: </span> Rodrigo Yepes</p>
                        <p><span className="font-semibold text-white">Tesoreria: </span> Bernarda Meneses</p>
                        <p><span className="font-semibold text-white">Secretaria: </span> Adriana Andrade</p>
                        <p><span className="font-semibold text-white">Técnico: </span> Juan Carlos Flórez</p>
                      </div>
                    </div>
                  </div>
                  <br />
                  <article className="rounded-[4rem] border border-emerald-900/15 bg-white p-6 shadow-[0_24px_40px_-30px_rgba(3,42,32,0.85)] md:p-10 lg:p-12 text-center">
                    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                      <div className="rounded-2xl border border-emerald-900/10 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 text-center">
                        Cada una de nuestras dependencias esta disponible para atender sus necesidades.
                      </div>
                      <div className="space-y-2 text-center">
                        <select
                          id="dependencia"
                          value={formData.participacion}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 text-center focus:border-emerald-900 focus:ring-emerald-900/10 transition"
                        >
                          <option className='text-center' value="">Seleccione una dependencia</option>
                          <option value="directorEjecutivo">Dirección Ejecutiva</option>
                          <option value="tecnico">Dirección Técnica</option>
                          <option value="asesoriaJuridica">Asesoria Jurídica</option>
                          <option value="secretaria">Secretaria</option>
                          <option value="tesoreria">Tesoreria</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        className="inline-flex min-w-[11.5rem] items-center justify-center rounded-full bg-emerald-900 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-emerald-800 active:translate-y-[1px]"
                      >
                        CONTACTAR
                      </button>

                      {formStatus.type === 'error' && (
                        <p className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                          {formStatus.message}
                        </p>
                      )}
                    </form>
                  </article>
                </article>
              </div>
            </section>
          </>
        ) : currentView === 'category' ? (
          <CategoryPage category={currentCategory} />
        ) : currentView === 'almacen' ? (
          <AlmacenPage onNavigate={navegarASeccion} />
        ) : currentView === 'servicios-tecnicos' ? (
          <TecnicalServicesPage onSolicitarAsesoria={handleSolicitarAsesoria} />
        ) : currentView === 'polizas' ? (
          <PolizasPage onSolicitarAsesoria={handleSolicitarAsesoria} />
        ) : currentView === 'asesoria' ? (
          <AsesoriaPage onSolicitarAsesoria={handleSolicitarAsesoria} />
        ) : currentView === 'centro-soluciones' ? (
          <CentroSolucionesPage onNavigate={navegarASeccion} />
        ) : currentView === 'tramites' ? (
          <TramitesPage onSolicitarAsesoria={handleSolicitarAsesoria} />
        ) : currentView === 'prensa' ? (
          <PrensaPage />
        ) : currentView === 'comunicados' ? (
          <ComunicadosPage />
        ) : null}
      </main>

      <a
        href="https://wa.me/573128471928?text=Hola%2C%20quiero%20mas%20informacion%20sobre%20ADICONAR"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Abrir chat de WhatsApp"
        title="Hablar por WhatsApp"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/500px-WhatsApp_icon.png"
          alt="WhatsApp"
          className="whatsapp-fab__icon"
          loading="lazy"
        />
      </a>

      {showNotificationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="mx-4 rounded-2xl bg-white p-8 shadow-2xl animate-pulse-in max-w-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <svg className="h-8 w-8 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="mb-2 text-center font-heading text-xl text-emerald-950">
              ¡Dependencia Asignada!
            </h3>
            <p className="text-center text-slate-700">
              {notificationMessage}
            </p>
          </div>
        </div>
      )}

      <Footer navItems={navItems} currentYear={currentYear} navegarASeccion={navegarASeccion} />
    </div>
  )
}

export default App
