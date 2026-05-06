import React from 'react';

const CentroSolucionesPage = () => {
  return (
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
                { title: 'Servicios técnicos', desc: 'Mantenimiento y soporte especializado' },
                { title: 'Gestión de Pólizas y aseguramiento', desc: 'Asesoría y trámite de seguros' },
                { title: 'Asesoría jurídica', desc: 'Consultoría legal para tu organización' },
                { title: 'Trámites ante entidades', desc: 'Gestiones administrativas y operativas' },
                { title: 'Aliados corporativos', desc: 'Red de partners estratégicos' }
            ].map((item, idx) => (
                <div key={idx} className="rounded-2xl border border-emerald-900/15 bg-white p-6 shadow-sm">
                    <h3 className="font-heading text-xl text-emerald-950 mb-2">{item.title}</h3>
                    <p className="text-emerald-900/70">{item.desc}</p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CentroSolucionesPage;
