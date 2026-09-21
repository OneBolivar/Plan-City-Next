import { EventInfoProps } from '@/types/event-info.types';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';

export default function EventInfo({ event }: EventInfoProps) {
  return (
    <article className="bg-[#161622]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/30 transition-all">
      
      {/* Encabezado con categoría y precio */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium rounded-lg uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {event.categoryName}
        </span>

        <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
          {event.price === 0 ? 'Entrada Libre' : `$${event.price.toLocaleString('es-CO')}`}
        </span>
      </div>

      {/* Título */}
      <h1 className="text-2xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight leading-snug">
        {event.title}
      </h1>

      {/* Descripción */}
      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
        {event.description}
      </p>

      {/* Metadatos (Fecha y Lugar) en micro-tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#0d0d12]/60 border border-purple-500/15 mb-8 text-sm">
        <div className="flex items-center gap-2.5">
          <span className="text-base">📍</span>
          <div>
            <span className="block text-[11px] font-mono uppercase text-slate-500">Ubicación</span>
            <span className="font-semibold text-slate-200">{event.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-base">📅</span>
          <div>
            <span className="block text-[11px] font-mono uppercase text-slate-500">Fecha</span>
            <span className="font-semibold text-slate-200 capitalize">
              {new Date(event.date).toLocaleDateString('es-CO', { dateStyle: 'full' })}
            </span>
          </div>
        </div>
      </div>

      {/* Botones de acción (Favorito y Compartir) */}
      <div className="flex items-center gap-4 pt-4 border-t border-purple-500/10">
        <FavoriteButton eventId={event.id} />
        <ShareButton />
      </div>

    </article>
  );
}