import { categories } from '../data/categories'

const categorySummaries = {
  'sistemas-descarga': 'Componentes para descarga segura, tanques y control de nivel.',
  conduccion: 'Líneas, sellantes, mangueras y conexiones para transporte de combustible.',
  despacho: 'Soluciones de despacho para operación, flujo y seguridad en surtidores.',
  equipos: 'Equipos principales para bombeo, medición y distribución.',
  control: 'Instrumentos para lectura, verificación y control volumétrico.',
  infraestructura: 'Elementos de protección, acceso y seguridad para la estación.',
}

function AlmacenPage({ onNavigate }) {
  const almacenFaqs = [
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
  ]

  return (
    <div className="min-h-screen bg-[#f4f5ef] pt-32 pb-16">
      <section className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="overflow-hidden rounded-[2.4rem] border border-emerald-900/10 bg-white shadow-[0_28px_48px_-34px_rgba(3,42,32,0.18)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[32rem] bg-emerald-950 p-8 text-emerald-50 md:p-10 lg:min-h-[42rem]">
              <img
                src="https://thumbs.dreamstime.com/b/vertical-del-almac%C3%A9n-2803985.jpg"
                alt="Almacén técnico para estaciones de servicio"
                className="absolute inset-0 h-full w-full object-cover brightness-[0.42]"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/96 via-emerald-950/86 to-emerald-900/70" />

              <div className="relative flex h-full flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100/75">Almacén especializado</p>
                  <h1 className="font-heading mt-4 max-w-[12ch] text-4xl leading-[0.94] tracking-[-0.03em] text-white md:text-6xl">
                    La puerta de entrada a su catálogo técnico.
                  </h1>
                  <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-emerald-50/85 md:text-lg">
                    Este espacio reúne los suministros y equipos que respaldan la operación de estaciones de servicio. Antes de ver los productos, aquí encontrará una visión clara de las categorías, el alcance del catálogo y la lógica de organización del almacén.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-2xl font-semibold text-white">6</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-emerald-100/70">líneas del almacén</p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-2xl font-semibold text-white">+40</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-emerald-100/70">referencias técnicas</p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                      <p className="text-2xl font-semibold text-white">24/7</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-emerald-100/70">disponibilidad</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button
                      type="button"
                      onClick={(event) => onNavigate(event, '#categoria/sistemas-descarga')}
                      className="cta-pulse inline-flex rounded-full bg-amber-300 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:-translate-y-0.5 hover:bg-amber-200"
                    >
                      Ver productos
                    </button>
                    <button
                      type="button"
                      onClick={(event) => onNavigate(event, '#centro-soluciones-page')}
                      className="inline-flex rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
                    >
                      Ir al Centro de Soluciones
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 bg-[#f7f8f4] p-6 md:p-8 lg:p-10 text-center">
              <div className="rounded-[1.8rem] border border-emerald-900/10 bg-white p-6 shadow-[0_24px_40px_-30px_rgba(3,42,32,0.12)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">¿Cómo estamos organizados?</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  El almacén está estructurado en líneas especializadas para facilitar la consulta, priorizar necesidades críticas y llevar al usuario directamente al tipo de producto que necesita.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-emerald-900/10 bg-white p-6 shadow-[0_24px_40px_-30px_rgba(3,42,32,0.12)] text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Marcas y líneas destacadas</p>
                <div className="mt-4 flex flex-wrap gap-3 text-center justify-center">
                  {['AILE', 'EMCO', 'HUSKY', 'RED JACKET', 'WAYNE', 'MAIDE', 'OPW'].map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center rounded-full border border-emerald-900/10 bg-emerald-950 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">
                  ADICONAR fortalece la operación de EDS con marcas reconocidas en el sector combustible, criterios de calidad técnica y orientación para seleccionar productos según el tipo de estación de servicio.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={(event) => onNavigate(event, `#categoria/${category.id}`)}
                    className="rounded-[1.6rem] border border-emerald-900/12 bg-[#edf0e3] p-5 text-left transition duration-300 hover:-translate-y-1 hover:border-emerald-900/30"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-900/70">{category.sub[0]}</p>
                    <h2 className="font-heading mt-3 text-xl tracking-[-0.02em] text-emerald-950">{category.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">{categorySummaries[category.id]}</p>
                    <span className="mt-4 inline-flex text-sm font-semibold text-emerald-900">Explorar productos →</span>
                  </button>
                ))}
              </div>

              <div className="rounded-[1.8rem] border border-emerald-900/10 bg-white p-6 shadow-[0_24px_40px_-30px_rgba(3,42,32,0.12)]">
                <h2 className="font-heading text-2xl tracking-[-0.02em] text-emerald-950">Productos ADICONAR para EDS en Pasto, Nariño y Colombia</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  El almacén ADICONAR está diseñado para responder a necesidades reales de estaciones de servicio y empresas del sector combustibles. Cada categoría concentra soluciones orientadas a seguridad operativa, continuidad del despacho y cumplimiento técnico.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                  Desde componentes de descarga hasta infraestructura y control, la organización por líneas facilita que cada EDS encuentre productos compatibles con su operación y soporte especializado para decidir con mayor precisión.
                </p>
              </div>

              <div className="rounded-[1.8rem] border border-emerald-900/10 bg-[#edf0e3] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-900/70">Preguntas frecuentes del almacén</p>
                <div className="mt-4 grid gap-3">
                  {almacenFaqs.map((item) => (
                    <article key={item.question} className="rounded-2xl border border-emerald-900/10 bg-white p-4">
                      <h3 className="font-heading text-lg tracking-[-0.01em] text-emerald-950">{item.question}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AlmacenPage