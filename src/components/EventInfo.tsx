import { EventInfoProps } from '@/types/event-info.types';
import FavoriteButton from '@/components/FavoriteButton';
import ShareButton from '@/components/ShareButton';

export default function EventInfo({ event }: EventInfoProps) {
  return (
    <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
      
      {/* Encabezado con categoría y precio */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-100 uppercase tracking-wide">
          {event.categoryName}
        </span>
        <span className="text-lg font-bold text-slate-900">
          {event.price === 0 ? 'Entrada Libre' : `$${event.price.toLocaleString('es-CO')}`}
        </span>
      </div>

      {/* Título y descripción */}
      <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
        {event.title}
      </h1>
      <p className="text-slate-600 text-base leading-relaxed mb-6">
        {event.description}
      </p>

      {/* Metadatos (Fecha y Lugar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 border-y border-slate-100 text-sm text-slate-600 mb-6">
        <div>📍 <strong className="text-slate-800">Lugar:</strong> {event.location}</div>
        <div>📅 <strong className="text-slate-800">Fecha:</strong> {new Date(event.date).toLocaleDateString('es-CO', { dateStyle: 'full' })}</div>
      </div>

      <div className="flex items-center gap-3">
        <FavoriteButton eventId={event.id} />
        <ShareButton />
      </div>

    </article>
  );
}