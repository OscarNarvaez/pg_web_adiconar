import { useState } from 'react';

const TecnicalServicesPage = ({ onSolicitarAsesoria }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);

  const services = [
    { image: 'https://www.banoh.co/images/arreglos-locativos-estaciones-de-servicio/remodelacion-estaciones-gasolina-2.jpg', title: 'Construcción y remodelación para EDS' },
    { image: 'https://www.apc-industries.com/images/gestion-de-tanques/limpieza-lavado-tanques3.jpg', title: 'Lavado de tanques' },
    { image: 'https://fenixgroupcolombia.com/images/mantenimiento-reparacion-canopy-eds/mantenimiento-reparacion-canopy-eds-6.jpg', title: 'Mantenimiento a EDS' },
    { image: 'https://static.wixstatic.com/media/a73dca_579e70019a4e49bc9757ef5dcdd67b7c~mv2_d_1824_2208_s_2.jpg/v1/fill/w_165,h_200,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/a73dca_579e70019a4e49bc9757ef5dcdd67b7c~mv2_d_1824_2208_s_2.jpg', title: 'Calibración de serafín' },
    { image: 'https://tecniserviciosend.com/wp-content/uploads/inspeccion-quinta-rueda.jpg', title: 'Kingpin y quinta rueda' },
    { image: 'https://epsicol.com/wp-content/uploads/2023/09/20230815_173316-scaled.jpg', title: 'Aforo de tanques de almacenamiento' },
    { image: 'https://www.serpetcol.com/images/Servicios/servicio-de-cargue-de-hidrocarburos.jpg', title: 'Aforo de carrotanques' },
    { image: 'https://semmaq.com/wp-content/uploads/2022/01/Que-tipos-de-pruebas-hermeticas-existen.jpg', title: 'Pruebas de hermeticidad' },
    { image: 'https://www.apc-industries.com/images/gestion-de-tanques/hermeticidad-de-tanques4.jpg', title: 'Pruebas de estanqueidad' },
    { image: 'https://www.fitacol.com/wp-content/uploads/2025/02/conductividad-prueba.jpg', title: 'Pruebas de conductividad' },
    { image: 'https://hidrocarburos.com.co/wp-content/uploads/2024/06/proteccion-catodica-4.jpg', title: 'Instalación y mantenimiento de tubo de desfogue' },
  ];

  const benefits = [
    { title: 'Mayor continuidad operativa', icon: '📈' },
    { title: 'Reducción de riesgos técnicos', icon: '✅' },
    { title: 'Cumplimiento normativo', icon: '📋' },
    { title: 'Optimización de equipos e infraestructura', icon: '⚙️' },
    { title: 'Acompañamiento especializado para EDS', icon: '👥' },
  ];

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.type.includes('touch') ? e.touches[0].clientX : e.clientX);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOffset(0);
    setStartX(0);
  };

  return (
    <div className="min-h-screen bg-[#f4f5ef] pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">

        {/* Header Hero */}
        <div className="mb-16 animate-fade-in text-center">
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
        {/* Descripción Principal 
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
          */}

        <div className="flex">
          <div className="relative w-full h-96 sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden flex items-center justify-center">
            <img
              src="./imagenesCentroSoluciones/serviciosTecnicos.jpeg"
              alt="Logo Servicio Técnico EDS"
              className="w-full h-full object-contain animate-floatWave"
            />
          </div>
        </div>
        
        <br />
        <br />

        {/* Servicios Incluidos - Carrusel Infinite Scrolling */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-2">Servicios Incluidos</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"></div>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-50/50 to-white p-8">
            {/* Fade overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-r from-emerald-50 via-emerald-50/40 to-transparent z-20 pointer-events-none rounded-l-3xl"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-l from-emerald-50 via-emerald-50/40 to-transparent z-20 pointer-events-none rounded-r-3xl"></div>

            {/* Carrusel infinito con soporte drag */}
            <div 
              className="overflow-hidden cursor-grab active:cursor-grabbing"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div 
                className="flex gap-6"
                style={{
                  animation: isDragging ? 'none' : 'scroll 30s linear infinite',
                  transform: isDragging ? `translateX(${dragOffset}px)` : 'translateX(0)',
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
              >
                {/* Primera iteración */}
                {services.map((service, idx) => (
                  <div key={`carousel-1-${idx}`} className="flex-shrink-0 w-48 md:w-56 h-64 md:h-72">
                    <div 
                      className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-900/10 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group"
                      style={{
                        backgroundImage: `url('${service.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Fade effect en bordes de imagen */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent pointer-events-none"></div>
                      {/* Overlay oscuro */}
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>
                      {/* Texto centrado */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="font-heading text-sm md:text-base text-white text-center font-bold line-clamp-3">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Segunda iteración para efecto infinito */}
                {services.map((service, idx) => (
                  <div key={`carousel-2-${idx}`} className="flex-shrink-0 w-48 md:w-56 h-64 md:h-72">
                    <div 
                      className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-900/10 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group"
                      style={{
                        backgroundImage: `url('${service.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      {/* Fade effect en bordes de imagen */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent pointer-events-none"></div>
                      {/* Overlay oscuro */}
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300"></div>
                      {/* Texto centrado */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <p className="font-heading text-sm md:text-base text-white text-center font-bold line-clamp-3">
                          {service.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
            <button 
              onClick={() => onSolicitarAsesoria('tecnico')}
              className="px-8 py-3 bg-white text-emerald-950 font-heading font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              Solicitar Asesoría
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }

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
