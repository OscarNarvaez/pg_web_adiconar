import { useState } from 'react';
import { catalogo } from '../data/catalogo';

function keywordNormalizer(kw) {
  return kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const productosPorCategoria = {
  'sistemas-descarga': [
    'ADAPTADOR BOQUEREL DE BRONCE 4” (AILE)',
    'ECUALIZADOR DE 1” UL (AILE)',
    'ECUALIZADOR DE 3/4” UL (AILE)',
    'TEE 4x4x2x2 CON ADAPTADOR PARA VALVULA DE SOBRELLENADO (AILE)',
    'VALVULA DE SOBRELLENADO DE BOLA 2” x 130 mm (AILE)',
    'VALVULA DE SOBRELLENADO TIPO LENGUETA (AILE)',
    'ADAPTADOR BOQUEREL CON SWIVEL 4” (EMCO)',
    'ADAPTADOR RISER PARA VALVULA DE LENGUETA (EMCO)',
    'ECUALIZADOR DE 1” (EMCO)',
    'ECUALIZADOR DE 3/4” (EMCO)',
    'SPILL DE 5 GALONES DOBLE CONTENCION (EMCO)',
    'TAPON / VALVULA DE PURGA PARA SPILL (EMCO)',
    'VALVULA DE PRESION Y VACIO 2” (EMCO)',
    'VALVULA DE SOBRELLENADO TIPO LENGUETA CON PUERTO DE TESTEO (EMCO)',
  ],
  conduccion: [
    'SELLANTE GASOILA 1/2 PINTA (SUAVE)',
    'SELLANTE GASOILA 1 PINTA E-85',
    'SELLANTE GASOILA 1 PINTA (SUAVE)',
    'SELLANTE GASOILA 1/2 PINTA E-85',
    'SELLANTE GASOILA TUBO 2 OZ',
    'MANGUERA 1” x 0.25 CON ACOPLE REUSABLE',
    'MANGUERA 1” x 5 METROS',
    'MANGUERA 1” x 6 METROS',
    'MANGUERA 3/4” x 0.12',
    'MANGUERA 3/4” x 4 METROS UL',
    'MANGUERA 3/4” x 4 METROS PERMANENTE',
    'MANGUERA 3/4” x 4 METROS COLORES',
    'MANGUERA 3/4” x 5 METROS UL',
    'CONECTOR FLEXO 1 1/2” x 12”',
    'CONECTOR FLEXO 1 1/2” x 18”',
    'CONECTOR FLEXO 1 1/2” x 24”',
    'CONECTOR FLEXO 2” x 18”',
    'CONECTOR FLEXO 2” x 24”',
    'TUBERIA DOBLE CONTENCION',
  ],
  despacho: [
    'ACOPLE DE ROMPIMIENTO DE 1” (EMCO)',
    'ACOPLE DE ROMPIMIENTO DE 3/4” (EMCO)',
    'PISTOLA 11B 3/4” AMARILLA (HUSKY)',
    'PISTOLA 11B 3/4” ROJA (HUSKY)',
    'PISTOLA 1” ALTO FLUJO (HUSKY)',
    'PISTOLA 11B (MAIDE)',
    'ACOPLE DE ROMPIMIENTO 3/4” (HUSKY)',
    'ECUALIZADOR MULTIPLANE (SWIVEL)',
  ],
  equipos: [
    'BOMBA SUMERGIBLE 1.5 HP (RED JACKET)',
    'MOTOR UMP DE 1 1/2 HP RED JACKET',
    'DISPENSADOR WAYNE',
  ],
  control: [
    'POMADA KOLOR KUT',
    'SERAFIN',
    'VARA MILIMETRICA',
  ],
  infraestructura: [
    'MANHOLE',
    'SELLO ELECTRICO',
  ],
};

export default function CategoryPage({ category }) {
  const listaManual = productosPorCategoria[category.id];
  const [imageErrors, setImageErrors] = useState({});

  const products = listaManual
    ? (() => {
        const catalogoMap = new Map(
          catalogo.map((item) => [keywordNormalizer(item.name), item])
        );

        return listaManual
          .map((name) => catalogoMap.get(keywordNormalizer(name)))
          .filter(Boolean);
      })()
    : catalogo.filter(item => {
        const text = (item.name + ' ' + (item.descCorta || '') + ' ' + (item.desc || '')).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        return category.keywords.some(kw => text.includes(keywordNormalizer(kw)));
      });

  return (
    <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="font-heading text-4xl text-emerald-950 mb-10 text-center">{category.title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item, idx) => (
          <div key={idx} className="flex flex-col rounded-2xl border border-emerald-900/15 bg-white p-6 shadow-sm hover:-translate-y-1 transition duration-300">
            <h2 className="font-heading text-lg text-emerald-950 mb-4">{item.name}</h2>
            {item.image && !imageErrors[item.name] ? (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="w-full h-48 rounded-xl mb-4 border border-emerald-900/10 object-contain bg-white"
                onError={() => {
                  setImageErrors((prev) => ({ ...prev, [item.name]: true }));
                }}
              />
            ) : (
              <div className="w-full h-48 bg-slate-100/50 rounded-xl mb-4 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium">
                Imagen no disponible
              </div>
            )}
            {item.descCorta && <p className="text-sm text-emerald-900 font-semibold mb-2">{item.descCorta}</p>}
            <p className="text-sm text-slate-600 leading-relaxed flex-1">{item.desc}</p>
          </div>
        ))}
      </div>
      {products.length === 0 && <p className="text-center text-slate-500 mt-10">No se encontraron productos en esta categoría.</p>}
    </div>
  );
}
