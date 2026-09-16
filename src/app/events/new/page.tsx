import Link from 'next/link';
import EventForm from '@/components/EventForm';
import { getCategories } from '@/services/categories.service';

// Server Component: busca datos en el backend antes de renderizar el HTML
export default async function NewEventPage() {
  const categories = await getCategories();

  return (
    <main className="max-w-2xl mx-auto p-6 md:p-12">
      <Link
        href="/events"
        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-6 transition-colors"
      >
        &larr; Volver a Eventos
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Publicar Nuevo Evento
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Completa los campos obligatorios para registrar una nueva actividad en PlanCity.
        </p>
      </div>

      {/* Le entregamos la lista de categorías al Client Component */}
      <EventForm categories={categories} />
    </main>
  );
}