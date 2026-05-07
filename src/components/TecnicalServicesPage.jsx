import { useState } from 'react';

const TecnicalServicesPage = () => {
  const [hoveredService, setHoveredService] = useState(null);

  const services = [
    { icon: '🏗️', title: 'Construcción y remodelación para EDS' },
    { icon: '💧', title: 'Lavado de tanques' },
    { icon: '🔧', title: 'Mantenimiento a EDS' },
    { icon: '⚖️', title: 'Calibración de serafín' },
    { icon: '🔩', title: 'Kingpin y quinta rueda' },
    { icon: '📏', title: 'Aforo de tanques de almacenamiento' },
    { icon: '🚛', title: 'Aforo de carrotanques' },
    { icon: '🛡️', title: 'Pruebas de hermeticidad' },
    { icon: '🔒', title: 'Pruebas de estanqueidad' },
    { icon: '⚡', title: 'Pruebas de conductividad' },
    { icon: '🔌', title: 'Instalación y mantenimiento de tubo de desfogue' },
  ];

  const benefits = [
    { title: 'Mayor continuidad operativa', icon: '📈' },
    { title: 'Reducción de riesgos técnicos', icon: '✅' },
    { title: 'Cumplimiento normativo', icon: '📋' },
    { title: 'Optimización de equipos e infraestructura', icon: '⚙️' },
    { title: 'Acompañamiento especializado para EDS', icon: '👥' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f4f5ef] to-white pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Header Hero */}
        <div className="mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-sm font-semibold">
              Centro de Soluciones
            </span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-6 leading-tight">
            Servicios Técnicos
            <span className="block text-emerald-600 mt-2">Especializados</span>
          </h1>
          
          <p className="text-xl text-emerald-900 font-semibold mb-4">
            Operación segura, eficiente y especializada.
          </p>
        </div>

        {/* Descripción Principal */}
        <div className="mb-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-emerald-900/85 leading-relaxed text-lg">
                Brindamos servicios técnicos especializados para estaciones de servicio, enfocados en garantizar el correcto funcionamiento de la infraestructura, equipos y sistemas operativos de las EDS.
              </p>
              <p className="text-emerald-900/85 leading-relaxed text-lg">
                Contamos con acompañamiento técnico para mantenimiento, adecuaciones, pruebas y verificación de sistemas, cumpliendo con estándares de seguridad, operación y normativa aplicable al sector de combustibles.
              </p>
              <p className="text-emerald-900/85 leading-relaxed text-lg">
                Nuestro objetivo es ayudar a que las estaciones operen de manera segura, continua y eficiente, minimizando riesgos y mejorando el desempeño operativo.
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex">
            <div className="relative w-full h-80 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-3xl border-2 border-emerald-200/40 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent"></div>
              <div className="text-6xl opacity-30">🔧</div>
            </div>
          </div>
        </div>

        {/* Servicios Incluidos */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-2">Servicios Incluidos</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer overflow-hidden
                  ${hoveredService === idx
                    ? 'border-emerald-500 bg-emerald-50 shadow-lg -translate-y-1'
                    : 'border-emerald-900/10 bg-white shadow-sm hover:shadow-md'
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 group-hover:from-emerald-500/5 group-hover:to-emerald-600/10 transition-all duration-300"></div>
                
                <div className="relative flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </span>
                  <p className="font-heading text-lg text-emerald-950 leading-tight pt-1">
                    {service.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-16 bg-gradient-to-r from-emerald-950/5 to-emerald-600/5 rounded-3xl p-8 md:p-12 border border-emerald-200/30">
          <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-8 text-center">
            Beneficios
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-900/10 hover:border-emerald-500/40 text-center"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {benefit.icon}
                </div>
                <p className="font-heading text-emerald-950 font-semibold group-hover:text-emerald-600 transition-colors">
                  {benefit.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-950 to-emerald-900 rounded-3xl p-8 md:p-12 text-white text-center overflow-hidden relative">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative">
            <h3 className="font-heading text-3xl md:text-4xl mb-4">
              ¿Necesita soporte técnico especializado?
            </h3>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Contáctenos para conocer cómo podemos optimizar la operación de su estación de servicio.
            </p>
            <button className="px-8 py-3 bg-white text-emerald-950 font-heading font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
              Solicitar Asesoría
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TecnicalServicesPage;
