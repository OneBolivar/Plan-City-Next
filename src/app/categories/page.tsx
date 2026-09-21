import Link from 'next/link';
import { getCategories } from '@/services/categories.service';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-12 md:py-16">
      {/* Luces y auras de fondo (Glow ambiental) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-purple-500/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-semibold text-purple-300 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span>EXPLORADOR</span>
              <span className="text-slate-500">•</span>
              <span>{categories?.length ?? 0} disponibles</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Explorar{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                Categorías
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Encuentra y gestiona los sectores temáticos que dan vida a los eventos en PlanCity.
            </p>
          </div>

          <Link
            href="/categories/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium rounded-xl text-sm shadow-lg shadow-purple-900/40 hover:shadow-purple-700/50 transition-all duration-300 transform hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <span className="text-base leading-none font-bold">+</span>
            <span>Nueva Categoría</span>
          </Link>
        </div>

        {/* Listado de tarjetas (Grid) */}
        {categories && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <article
                key={category.id}
                className="group relative bg-[#161622]/70 hover:bg-[#1b1b2a]/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 rounded-2xl p-6 shadow-xl shadow-purple-950/20 hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-medium rounded-lg uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      Categoría
                    </span>
                    <span className="text-slate-600 group-hover:text-purple-400 transition-colors text-xs font-mono">
                      #{category.id.toString().slice(-4)}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-purple-300 transition-colors tracking-tight">
                    {category.name}
                  </h2>
                  <p className="text-sm text-slate-400 mt-2.5 line-clamp-3 leading-relaxed">
                    {category.description || 'Sin descripción disponible para esta categoría.'}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-purple-500/10 flex items-center justify-between text-xs">
                  <Link
                    href={`/categories/${category.id}`}
                    className="inline-flex items-center gap-1.5 font-medium text-purple-400 hover:text-purple-300 transition-colors group/link"
                  >
                    <span>Ver eventos</span>
                    <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                      &rarr;
                    </span>
                  </Link>

                  <Link
                    href={`/categories/${category.id}/edit`}
                    className="text-slate-400 hover:text-slate-200 px-2.5 py-1 rounded-md hover:bg-white/5 transition-all"
                  >
                    Editar
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Estado vacío si no hay datos */
          <div className="text-center py-20 px-6 rounded-2xl border border-dashed border-purple-500/20 bg-[#161622]/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl mb-4">
              🏷️
            </div>
            <h3 className="text-lg font-bold text-slate-200">No hay categorías disponibles</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              Sé el primero en organizar la ciudad creando una nueva temática de eventos.
            </p>
            <Link
              href="/categories/new"
              className="inline-block mt-6 px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl text-xs transition-all"
            >
              Crear primera categoría
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}