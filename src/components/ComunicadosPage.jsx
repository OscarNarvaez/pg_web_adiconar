import React, { useState } from 'react'
import { comunicadosItems } from '../data/comunicados-items'

const ComunicadosPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState('next')

  const goToPrevious = () => {
    setDirection('prev')
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? comunicadosItems.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setDirection('next')
    setCurrentIndex((prevIndex) => 
      prevIndex === comunicadosItems.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 'next' : 'prev')
    setCurrentIndex(index)
  }

  const current = comunicadosItems[currentIndex]
  const visibleSlides = 3
  const slides = []
  
  for (let i = 0; i < visibleSlides; i++) {
    slides.push(comunicadosItems[(currentIndex + i) % comunicadosItems.length])
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#f4f5ef] to-white pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        {/* Título */}
        <div className="mb-16 text-center">
          <h1 className="font-heading text-5xl md:text-6xl text-emerald-950 mb-4 leading-tight">
            COMUNICADOS
          </h1>
          <p className="text-lg text-emerald-900/70">
            Todos nuestros comunicados oficiales.
          </p>
        </div>

        {/* Carrusel Principal */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 md:gap-6">
            {/* Botón Anterior */}
            <button
              onClick={goToPrevious}
              className="hidden md:flex w-12 h-12 md:w-14 md:h-14 bg-emerald-600 hover:bg-emerald-700 rounded-full items-center justify-center shadow-[0_12px_20px_-14px_rgba(6,78,59,0.95)] transform transition hover:scale-110 active:scale-95 flex-shrink-0"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Carrusel */}
            <div className="relative flex-1">
              <div className="flex gap-4 md:gap-6">
                {/* Slide Principal (Izquierda) */}
                <div className="flex-1 order-2 md:order-1">
                  <div 
                    className="relative w-full rounded-3xl overflow-hidden shadow-[0_28px_40px_-34px_rgba(3,42,32,0.85)] group cursor-pointer transform transition-all duration-500 border border-emerald-900/12"
                    onClick={() => window.open(current.link, '_blank')}
                  >
                    <img 
                      src={current.imagen} 
                      alt={current.titulo}
                      className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {current.videoThumbnail && (
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-950/40 group-hover:bg-emerald-950/20 transition">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition">
                          <svg className="w-8 h-8 text-emerald-950 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-950 to-transparent p-6 md:p-8">
                      <p className="text-amber-400 text-sm font-semibold mb-2">
                        {current.fecha}
                      </p>
                      <h2 className="text-white font-heading text-2xl md:text-3xl mb-3 line-clamp-2">
                        {current.titulo}
                      </h2>
                      <p className="text-emerald-50/85 text-sm md:text-base line-clamp-2">
                        {current.descripcion}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Slides Secundarios (Derecha) */}
                <div className="hidden md:flex flex-col gap-4 order-1 md:order-2 w-full md:w-1/3">
                  {slides.slice(1).map((slide, idx) => (
                    <div 
                      key={slide.id}
                      onClick={() => goToSlide((currentIndex + idx + 1) % comunicadosItems.length)}
                      className={`rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-300 group border border-emerald-900/12 ${
                        idx === 0 
                          ? 'ring-2 ring-emerald-500 scale-100' 
                          : 'opacity-60 hover:opacity-100 scale-95'
                      }`}
                    >
                      <div className="relative w-full h-32">
                        <img 
                          src={slide.imagen} 
                          alt={slide.titulo}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-emerald-950/40 group-hover:bg-emerald-950/20 transition" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-emerald-950 to-transparent p-3">
                          <p className="text-white text-xs font-semibold line-clamp-1">
                            {slide.titulo}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicador de posición */}
              <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 text-emerald-950 text-sm font-semibold bg-white/80 px-4 py-2 rounded-full border border-emerald-900/15">
                {String(currentIndex + 1).padStart(2, '0')} / {String(comunicadosItems.length).padStart(2, '0')}
              </div>
            </div>

            {/* Botón Siguiente */}
            <button
              onClick={goToNext}
              className="hidden md:flex w-12 h-12 md:w-14 md:h-14 bg-emerald-600 hover:bg-emerald-700 rounded-full items-center justify-center shadow-[0_12px_20px_-14px_rgba(6,78,59,0.95)] transform transition hover:scale-110 active:scale-95 flex-shrink-0"
              aria-label="Siguiente"
            >
              <svg className="w-6 h-6 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Botones para Mobile */}
          <div className="md:hidden flex gap-3 justify-center mt-6">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-[0_12px_20px_-14px_rgba(6,78,59,0.95)] transform transition hover:scale-110 active:scale-95"
              aria-label="Anterior"
            >
              <svg className="w-6 h-6 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 rounded-full flex items-center justify-center shadow-[0_12px_20px_-14px_rgba(6,78,59,0.95)] transform transition hover:scale-110 active:scale-95"
              aria-label="Siguiente"
            >
              <svg className="w-6 h-6 text-white mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Puntos de navegación */}
        <div className="flex justify-center gap-2 md:gap-3 flex-wrap">
          {comunicadosItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 md:h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? 'bg-emerald-600 w-8 md:w-10' 
                  : 'bg-emerald-200 hover:bg-emerald-300 w-2 md:w-3'
              }`}
              aria-label={`Ir a comunicado ${idx + 1}`}
            />
          ))}
        </div>

        {/* Grid de todos los comunicados */}
        <div className="mt-20">
          <h2 className="font-heading text-3xl text-emerald-950 mb-8">
            Todos los comunicados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comunicadosItems.map((comunicado) => (
              <a
                key={comunicado.id}
                href={comunicado.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl overflow-hidden border border-emerald-900/15 hover:border-emerald-500 shadow-[0_18px_38px_-32px_rgba(3,42,32,0.9)] hover:shadow-lg transform transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white"
              >
                <div className="relative w-full h-48">
                  <img 
                    src={comunicado.imagen} 
                    alt={comunicado.titulo}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent" />
                </div>
                <div className="p-5 md:p-6">
                  <p className="text-amber-600 text-xs md:text-sm font-semibold mb-2">
                    {comunicado.fecha}
                  </p>
                  <h3 className="text-emerald-950 font-heading text-lg md:text-xl mb-3 line-clamp-2 group-hover:text-emerald-600 transition">
                    {comunicado.titulo}
                  </h3>
                  <p className="text-slate-700 text-sm line-clamp-2">
                    {comunicado.descripcion}
                  </p>
                  <div className="mt-4 flex items-center text-emerald-600 text-sm font-semibold group-hover:gap-2 transition">
                    Ver comunicado
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComunicadosPage
