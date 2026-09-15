import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        
        {/* Badge superior */}
        <div className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider rounded-full border border-purple-100 mb-4">
          Código 404
        </div>

        {/* Ilustración / Emoji con efecto sutil */}
        <div className="text-6xl mb-4 select-none animate-bounce">
          🗺️📍
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          ¡Te perdiste en el mapa!
        </h1>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Parece que este evento terminó antes de tiempo o nunca existió en la agenda de la ciudad. Ni con GPS lo encontramos.
        </p>

        {/* Acciones de rescate */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/events"
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm rounded-lg transition-colors shadow-sm"
          >
            Explorar Eventos
          </Link>
          <Link
            href="/categories"
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg transition-colors"
          >
            Ver Categorías
          </Link>
        </div>

      </div>
    </main>
  );
}