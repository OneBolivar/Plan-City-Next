import Link from 'next/link';
import { getEvents } from '@/services/events.service';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <main className="max-w-6xl mx-auto p-6 md:p-12">
      
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Próximos Eventos
          </h1>
          <p className="text-slate-600 mt-1">
            Agenda tu asistencia y no te pierdas la actividad cultural y deportiva de la ciudad.
          </p>
        </div>

        <Link
          href="/events/new"
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm"
        >
          + Publicar Evento
        </Link>
      </div>

      {/* Grid de eventos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <article
            key={event.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-100">
                  {event.categoryName}
                </span>
                <span className="text-xs font-bold text-slate-700">
                  {event.price === 0 ? 'Gratis' : `$${event.price.toLocaleString('es-CO')}`}
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {event.title}
              </h2>

              <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                {event.description}
              </p>

              <div className="space-y-1 text-xs text-slate-500">
                <p>📍 {event.location}</p>
                <p>📅 {new Date(event.date).toLocaleDateString('es-CO', { dateStyle: 'long' })}</p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm">
              <Link
                href={`/events/${event.id}`}
                className="font-medium text-purple-600 hover:text-purple-800"
              >
                Ver detalles &rarr;
              </Link>

              <Link
                href={`/events/${event.id}/edit`}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                Editar
              </Link>
            </div>
          </article>
        ))}
      </div>

    </main>
  );
}