import { useState, useEffect } from 'react';

const PolizasPage = ({ onSolicitarAsesoria }) => {
  const [hoveredService, setHoveredService] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  // Auto-scroll del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % polizas.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [polizas.length]);

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev - 1 + polizas.length) % polizas.length);
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % polizas.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f4f5ef] to-white pt-32 pb-20">
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

        <div className="hidden md:flex justify-center">
          <div className="relative w-full h-90 rounded-3xl overflow-hidden flex items-center justify-center border border-emerald-100 shadow-lg">
            <img
              src="./imagenesCentroSoluciones/polizasAseguramiento.jpeg"
              alt="Logo Gestión de Pólizas"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Descripción Principal */}
          <div className="space-y-4 text-center md:text-left">
            <p className="text-emerald-900/85 leading-relaxed text-lg">
              <br />
              <br />
            </p>
          </div>



        {/* Líneas de Pólizas - Carrusel Coverflow */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="font-heading text-3xl md:text-4xl text-emerald-950 mb-2">Líneas de Pólizas</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"></div>
          </div>

          <div className="relative">
            {/* Carrusel Container */}
            <div className="overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-50/50 to-white">
              <div className="relative h-96 md:h-[450px] flex items-center justify-center"
                style={{ perspective: '1200px' }}>

                {/* Fade overlay izquierdo */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none rounded-l-3xl"></div>

                {/* Fade overlay derecho */}
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none rounded-r-3xl"></div>

                {/* Botón Anterior */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-emerald-900/10 hover:border-emerald-500 flex items-center justify-center text-emerald-950 hover:text-emerald-600 transition-all duration-300 group"
                  aria-label="Póliza anterior"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">←</span>
                </button>

                {/* Carrusel items con efecto Coverflow */}
                <div className="flex justify-center items-center gap-4 md:gap-6 px-12 md:px-20 w-full h-full"
                  style={{ perspective: '1500px' }}>

                  {/* Item Izquierdo */}
                  <div
                    className="flex-shrink-0 w-1/3 h-full flex items-center justify-center"
                    style={{
                      transform: `rotateY(35deg) translateZ(-100px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div
                      className="w-full h-72 md:h-80 transform transition-all duration-500 ease-out"
                      onMouseEnter={() => setHoveredService(`carousel-${(carouselIndex - 1 + polizas.length) % polizas.length}`)}
                      onMouseLeave={() => setHoveredService(null)}
                      onClick={() => setCarouselIndex((carouselIndex - 1 + polizas.length) % polizas.length)}
                    >
                      <div className={`group relative p-6 md:p-8 rounded-2xl border-2 h-full flex flex-col justify-center cursor-pointer overflow-hidden
                        ${hoveredService === `carousel-${(carouselIndex - 1 + polizas.length) % polizas.length}`
                          ? 'border-emerald-500 shadow-lg'
                          : 'border-emerald-900/10 shadow-sm'
                        }`}
                        style={{
                          backgroundImage: `url('${polizas[(carouselIndex - 1 + polizas.length) % polizas.length].image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/45 rounded-2xl"></div>

                        <div className="relative flex flex-col items-center text-center">
                          <p className="font-heading text-sm md:text-base text-white leading-tight">
                            {polizas[(carouselIndex - 1 + polizas.length) % polizas.length].title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Item Central (Prominente) */}
                  <div
                    className="flex-shrink-0 w-1/3 h-full flex items-center justify-center z-20"
                    style={{
                      transform: `rotateY(0deg) translateZ(100px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div
                      className="w-full h-80 md:h-96 transform transition-all duration-500 ease-out"
                      onMouseEnter={() => setHoveredService(`carousel-${carouselIndex}`)}
                      onMouseLeave={() => setHoveredService(null)}
                    >
                      <div className={`group relative p-8 md:p-10 rounded-2xl border-2 h-full flex flex-col justify-center transition-all duration-300 cursor-pointer overflow-hidden
                        ${hoveredService === `carousel-${carouselIndex}`
                          ? 'border-emerald-500 shadow-2xl'
                          : 'border-emerald-500/30 shadow-xl'
                        }`}
                        style={{
                          backgroundImage: `url('${polizas[carouselIndex].image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>

                        <div className="relative flex flex-col items-center text-center">
                          <p className="font-heading text-xl md:text-2xl text-white leading-tight font-bold">
                            {polizas[carouselIndex].title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Item Derecho */}
                  <div
                    className="flex-shrink-0 w-1/3 h-full flex items-center justify-center"
                    style={{
                      transform: `rotateY(-35deg) translateZ(-100px)`,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div
                      className="w-full h-72 md:h-80 transform transition-all duration-500 ease-out"
                      onMouseEnter={() => setHoveredService(`carousel-${(carouselIndex + 1) % polizas.length}`)}
                      onMouseLeave={() => setHoveredService(null)}
                      onClick={() => setCarouselIndex((carouselIndex + 1) % polizas.length)}
                    >
                      <div className={`group relative p-6 md:p-8 rounded-2xl border-2 h-full flex flex-col justify-center cursor-pointer overflow-hidden
                        ${hoveredService === `carousel-${(carouselIndex + 1) % polizas.length}`
                          ? 'border-emerald-500 shadow-lg'
                          : 'border-emerald-900/10 shadow-sm'
                        }`}
                        style={{
                          backgroundImage: `url('${polizas[(carouselIndex + 1) % polizas.length].image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        <div className="absolute inset-0 bg-black/45 rounded-2xl"></div>

                        <div className="relative flex flex-col items-center text-center">
                          <p className="font-heading text-sm md:text-base text-white leading-tight">
                            {polizas[(carouselIndex + 1) % polizas.length].title}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón Siguiente */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl border-2 border-emerald-900/10 hover:border-emerald-500 flex items-center justify-center text-emerald-950 hover:text-emerald-600 transition-all duration-300 group"
                  aria-label="Siguiente póliza"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">→</span>
                </button>
              </div>
            </div>

            {/* Indicadores de posición */}
            <div className="mt-6 flex justify-center gap-2">
              {polizas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === carouselIndex
                    ? 'bg-emerald-600 w-8'
                    : 'bg-emerald-900/20 hover:bg-emerald-900/40'
                    }`}
                  aria-label={`Ir a la póliza ${idx + 1}`}
                />
              ))}
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
              ¿Necesita protección y aseguramiento?
            </h3>
            <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
              Contáctenos para conocer nuestras soluciones de pólizas y coberturas adaptadas a su estación de servicio.
            </p>
            <button 
              onClick={() => onSolicitarAsesoria('secretaria')}
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
