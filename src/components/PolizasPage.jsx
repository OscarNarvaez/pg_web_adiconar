import { useState } from 'react';

const PolizasPage = ({ onSolicitarAsesoria }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [startX, setStartX] = useState(0);

  const polizas = [
    { image: 'https://d9b6rardqz97a.cloudfront.net/wp-content/uploads/2019/10/20214019/33-SEGURO_PARA_INDUSTRIA_DE_HIDROCARBUROS-482x390.jpg', title: 'Pólizas de hidrocarburos' },
    { image: 'https://www.elasegurador.com.mx/wp-content/uploads/2018/10/py2.jpg', title: 'Pólizas Pyme' },
    { image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiLJXr5lWfZ6XzAMEmK3MXyVByYjDdoUBrObGrP7A8KPunjLoWRaJM7hUSBU55geLrghcpL3vp9ivKxLu8H5TmGJdS2geYXeEVwsdJBWGpjV1UmajO9Tk73HxSVierGLsTgt-RNz_Gnyns/s1600/El++seguro+de+transporte+de+mercanc%25C3%25ADas+%252B+C%25C3%25B3mo+contratarlo+%252B+Qu%25C3%25A9+acciones+tomar+en+caso+de+un+siniestro.jpg', title: 'Pólizas de mercancía' },
    { image: 'https://blog.coomeva.com.co/uploads/66797f330e8fe.webp', title: 'Pólizas todo riesgo' },
  ];

  const benefits = [
    { title: 'Protección integral', icon: '🛡️' },
    { title: 'Acompañamiento especializado', icon: '👥' },
    { title: 'Gestión centralizada', icon: '📋' },
    { title: 'Coberturas adaptadas al sector', icon: '⚙️' },
    { title: 'Mayor tranquilidad operativa', icon: '✨' },
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
        <div className="mb-16 animate-fade-in">
          <div className="inline-block mb-4 text-center w-full">
            <span className="px-4 py-2 rounded-full bg-emerald-100/60 text-emerald-700 text-sm font-semibold">
              Centro de Soluciones
            </span>
          </div>

          <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-6 leading-tight text-center">
            Gestión de Pólizas
            <span className="block text-emerald-600 mt-2">y Aseguramiento</span>
          </h1>

          <p className="text-xl text-emerald-900 font-semibold mb-4 text-center">
            Protección y respaldo para su operación.
          </p>
        </div>

        {/* Mobile: solo la imagen, sin bordes ni animaciones */}
        <div className="sm:hidden mb-4">
          <img
            src="./imagenesCentroSoluciones/polizasPageALARGADA.jpeg"
            alt="Gestión de Pólizas y Aseguramiento"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Desktop/tablet: versión estilizada con profundidad y difuminados */}
        <div className="hidden sm:block relative overflow-hidden rounded-[2rem] border border-emerald-900/10 bg-gradient-to-br from-white via-emerald-50/70 to-emerald-100/60 p-4 md:p-6 shadow-[0_25px_80px_rgba(6,95,70,0.12)]">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(16,185,129,0.14),transparent_42%),radial-gradient(circle_at_15%_50%,rgba(6,95,70,0.08),transparent_24%),radial-gradient(circle_at_85%_50%,rgba(6,95,70,0.08),transparent_24%)]" />
          <div className="absolute inset-y-0 left-0 w-24 md:w-32 pointer-events-none bg-gradient-to-r from-[#f4f5ef] via-[#f4f5ef]/85 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-32 pointer-events-none bg-gradient-to-l from-[#f4f5ef] via-[#f4f5ef]/85 to-transparent z-10" />

          <div className="relative overflow-hidden rounded-[1.6rem] bg-white/45 backdrop-blur-sm">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#f4f5ef] via-transparent to-[#f4f5ef] opacity-60" />

            <div className="relative flex items-center justify-center min-h-[28rem] sm:min-h-[34rem] md:min-h-[10rem] lg:min-h-[48rem] px-4 sm:px-8 py-6">
              <div className="absolute inset-x-6 top-6 h-28 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

              <img
                src="./imagenesCentroSoluciones/polizasPageALARGADA.jpeg"
                alt="Gestión de Pólizas y Aseguramiento"
                className="relative z-20 w-full max-w-6xl h-auto object-contain drop-shadow-[0_30px_45px_rgba(15,23,42,0.20)] animate-floatWave"
              />
            </div>
          </div>
        </div>

        {/* Descripción Principal */}
        <div className="space-y-4 text-center md:text-left">
          <p className="text-emerald-900/85 leading-relaxed text-lg">
            <br />
            <br />
          </p>
        </div>



        {/* Líneas de Pólizas - Carrusel Infinite Scrolling */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-2">Líneas de Pólizas</h2>
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
                {polizas.map((poliza, idx) => (
                  <div key={`carousel-1-${idx}`} className="flex-shrink-0 w-48 md:w-56 h-64 md:h-72">
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-900/10 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group"
                      style={{
                        backgroundImage: `url('${poliza.image}')`,
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
                          {poliza.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Segunda iteración para efecto infinito */}
                {polizas.map((poliza, idx) => (
                  <div key={`carousel-2-${idx}`} className="flex-shrink-0 w-48 md:w-56 h-64 md:h-72">
                    <div
                      className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-emerald-900/10 shadow-lg hover:shadow-xl hover:border-emerald-500 transition-all duration-300 cursor-pointer group"
                      style={{
                        backgroundImage: `url('${poliza.image}')`,
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
                          {poliza.title}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
            `}</style>
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
              ¿Necesita protección y aseguramiento?
            </h3>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Contáctenos para conocer nuestras soluciones de pólizas y coberturas adaptadas a su estación de servicio.
            </p>
            <button
              onClick={() => onSolicitarAsesoria('asesoriaJuridica')}
              className="px-8 py-3 bg-white text-emerald-950 font-heading font-bold rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
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

export default PolizasPage;
