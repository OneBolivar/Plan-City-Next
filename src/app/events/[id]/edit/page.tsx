import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventId } from '@/services/events.service';
import EventInfo from '@/components/EventInfo';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEventId(id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-10 md:py-16">
      {/* Luces y auras de fondo (Glow ambiental) */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Botón de retorno interactivo */}
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161622]/60 hover:bg-[#1f1f2e] border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-md mb-8 transition-all duration-200"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-1">&larr;</span>
          <span>Volver a la lista de eventos</span>
        </Link>

        {/* Componente que renderiza el contenido del evento */}
        <EventInfo event={event} />
      </div>
    </main>
  );
}