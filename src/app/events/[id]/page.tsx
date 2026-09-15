import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventById } from '@/services/events.service';
import EventInfo from '@/components/EventInfo';

interface EventDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12">
      <Link
        href="/events"
        className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-800 mb-6 transition-colors"
      >
        &larr; Volver a la lista de eventos
      </Link>

      <EventInfo event={event} />
    </main>
  );
}