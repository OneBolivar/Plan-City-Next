import Link from 'next/link';
import { getCategories } from '@/services/categories.service';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Explorar Categorías
            </h1>
            <p className="text-slate-600 mt-1">
              Descubre eventos en PlanCity organizados por tu temática favorita.
            </p>
          </div>

          <Link
            href="/categories/new"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm"
          >
            + Nueva Categoría
          </Link>
        </div>

        {/* Listado de tarjetas (Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <article
              key={category.id}
              className="bg-white border border-slate-200 hover:border-purple-300 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="inline-block px-2.5 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md mb-3 border border-purple-100">
                  Categoría
                </span>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  {category.name}
                </h2>
                <p className="text-sm text-slate-600 mt-2 line-clamp-3">
                  {category.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                <Link
                  href={`/categories/${category.id}`}
                  className="font-medium text-purple-600 hover:text-purple-800"
                >
                  Ver eventos &rarr;
                </Link>

                <Link
                  href={`/categories/${category.id}/edit`}
                  className="text-slate-500 hover:text-slate-800 text-xs"
                >
                  Editar
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </main>
  );
}



