import Link from 'next/link';
import { notFound } from 'next/navigation';
import axios from 'axios';
import { Category } from '@/types/category.types';
import { CategoryEventSummary, CategoryDetailPageProps } from '@/types/category-detail.types';

export default async function CategoryDetailPage({ params }: CategoryDetailPageProps) {
  const { id } = await params;
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

  let category: Category | null = null;
  let categoryEvents: CategoryEventSummary[] = [];

  try {
    const [catRes, eventsRes] = await Promise.all([
      axios.get<Category>(`${backendUrl}/categories/${id}`),
      axios.get<CategoryEventSummary[]>(`${backendUrl}/events?categoryId=${id}`).catch(() => ({
        data: [] as CategoryEventSummary[],
      })),
    ]);

    category = catRes.data;
    categoryEvents = eventsRes.data ?? [];
  } catch {
    notFound();
  }

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-10 md:py-16">
      {/* Luces de fondo */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Retorno */}
        <Link
          href="/categories"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161622]/60 hover:bg-[#1f1f2e] border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-md mb-8 transition-all"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>Volver a categorías</span>
        </Link>

        {/* Ficha de la categoría */}
        <header className="bg-[#161622]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/30 mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium rounded-lg uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              Categoría
            </span>

            <Link
              href={`/categories/${id}/edit`}
              className="px-4 py-1.5 rounded-xl bg-[#0d0d12]/80 hover:bg-[#1a1a26] border border-purple-500/30 text-purple-300 hover:text-white text-xs font-medium transition-all"
            >
              Editar Categoría
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {category.name}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            {category.description || 'Sin descripción detallada para esta temática.'}
          </p>
        </header>

        {/* Listado de eventos de la categoría */}
        <div>
          <div className="flex items-center justify-between mb-6 border-b border-purple-500/15 pb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Eventos en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                {category.name}
              </span>
            </h2>
            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-lg">
              {categoryEvents.length} resultados
            </span>
          </div>

          {categoryEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryEvents.map((evt) => (
                <article
                  key={evt.id}
                  className="group bg-[#161622]/60 hover:bg-[#1b1b2a]/90 backdrop-blur-xl border border-purple-500/15 hover:border-purple-500/40 rounded-2xl p-5 shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-100 group-hover:text-purple-300 transition-colors line-clamp-1">
                      {evt.name ?? evt.title}
                    </h3>
                    <p className="text-slate-400 text-xs mt-2 line-clamp-2">
                      {evt.description}
                    </p>
                    <p className="text-slate-500 text-xs mt-3">
                      📍 {evt.location}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs">
                    <span className="text-purple-400 font-semibold font-mono">
                      {evt.price ? `$${Number(evt.price).toLocaleString('es-CO')}` : 'Libre'}
                    </span>
                    <Link
                      href={`/events/${evt.id}`}
                      className="text-slate-300 hover:text-white font-medium group/link flex items-center gap-1"
                    >
                      <span>Ver</span>
                      <span className="transition-transform group-hover/link:translate-x-1">&rarr;</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-6 rounded-2xl border border-dashed border-purple-500/20 bg-[#161622]/40 backdrop-blur-md">
              <p className="text-sm text-slate-400">
                Aún no hay eventos registrados bajo esta temática.
              </p>
              <Link
                href="/events/new"
                className="inline-block mt-4 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                + Crear el primer evento aquí
              </Link>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}