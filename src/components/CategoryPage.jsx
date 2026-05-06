import { catalogo } from '../data/catalogo';

function keywordNormalizer(kw) {
  return kw.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default function CategoryPage({ category }) {
  const products = catalogo.filter(item => {
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
            <div className="w-full h-48 bg-slate-100/50 rounded-xl mb-4 border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm font-medium">
              [ Imagen ]
            </div>
            {item.descCorta && <p className="text-sm text-emerald-900 font-semibold mb-2">{item.descCorta}</p>}
            <p className="text-sm text-slate-600 leading-relaxed flex-1">{item.desc}</p>
          </div>
        ))}
      </div>
      {products.length === 0 && <p className="text-center text-slate-500 mt-10">No se encontraron productos en esta categoría.</p>}
    </div>
  );
}
