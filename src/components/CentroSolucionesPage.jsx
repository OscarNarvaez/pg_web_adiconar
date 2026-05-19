const CentroSolucionesPage = ({ onNavigate }) => (
    <div className="min-h-screen bg-[#f4f5ef] pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <h1 className="font-heading text-4xl text-emerald-950 mb-6 border-b border-emerald-900/10 pb-4">
          Centro de Soluciones para Estaciones de Servicio
        </h1>
        
        <div className="space-y-6 text-emerald-950/80 md:text-lg">
          <p className="text-xl font-medium text-emerald-900">
            Todo lo que su estación necesita, en un solo lugar.
          </p>
          <p>
            Nuestro Centro de Soluciones está diseñado para facilitar la operación, optimizar recursos y brindarle tranquilidad en cada frente de su negocio. Sabemos que administrar una estación de servicio implica múltiples retos técnicos, normativos y operativos, por eso integramos servicios clave para que usted no tenga que buscarlos por separado.
          </p>
          <p>
            Somos su aliado estratégico, con soluciones ágiles, confiables y especializadas que le permiten enfocarse en crecer, mientras nosotros nos encargamos del respaldo que su operación exige.
          </p>

          <div className="mt-8">
            <p className="font-semibold text-emerald-900 mb-4">Ponemos a su disposición:</p>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>Accesorios y suministros (almacén):</strong> todo lo que necesita para la operación diaria, con calidad y disponibilidad.</li>
              <li><strong>Servicios técnicos:</strong> soporte especializado para garantizar el correcto funcionamiento de sus equipos e infraestructura.</li>
              <li><strong>Gestión de pólizas y aseguramiento:</strong> protección integral para su estación, con acompañamiento experto.</li>
              <li><strong>Asesoría jurídica:</strong> respaldo legal enfocado en el sector de combustibles.</li>
              <li><strong>Trámites ante entidades:</strong> gestión eficiente para cumplir con la normativa sin complicaciones.</li>
            </ul>
          </div>

          <p className="pt-6 font-medium text-emerald-900">
            Con nuestro Centro de Soluciones, su estación no solo opera: funciona mejor, con respaldo, orden y visión de crecimiento.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Servicios técnicos', desc: 'Mantenimiento y soporte especializado', href: '#servicios-tecnicos-page' },
              { title: 'Gestión de Pólizas y aseguramiento', desc: 'Asesoría y trámite de seguros', href: '#polizas-page' },
              { title: 'Asesoría jurídica', desc: 'Consultoría legal para tu organización', href: '#asesoria-page' },
              { title: 'Trámites ante entidades', desc: 'Gestiones administrativas y operativas', href: '#tramites-page' },
              { title: 'Aliados corporativos', desc: 'Red de partners estratégicos', href: '#aliados-page', disabled: false }
            ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  onClick={(event) => {
                    if (!item.disabled && onNavigate) {
                      onNavigate(event, item.href);
                    } else if (item.disabled) {
                      event.preventDefault();
                    }
                  }}
                  className={`group rounded-2xl border border-emerald-900/15 p-6 shadow-sm transition duration-300 ${
                    item.disabled
                      ? 'cursor-not-allowed bg-slate-100/50 opacity-70'
                      : 'bg-white hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1 cursor-pointer'
                  }`}
                >
                    <h3 className="font-heading text-xl text-emerald-950 mb-2 group-hover:text-emerald-600 transition">{item.title}</h3>
                    <p className={`transition ${item.disabled ? 'text-slate-500' : 'text-emerald-900/70 group-hover:text-emerald-900'}`}>{item.desc}</p>
                    {!item.disabled && <p className="mt-4 text-sm font-semibold text-emerald-600 group-hover:translate-x-1 transition">Ir a {item.title} →</p>}
                    {item.disabled && <p className="mt-4 text-xs font-semibold text-slate-500">Proximamente</p>}
                </a>
            ))}
        </div>
      </div>
    </div>
)

export default CentroSolucionesPage
