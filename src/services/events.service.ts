import { AppEvent } from '@/types/event.types';

const MOCK_EVENTS: AppEvent[] = [
  {
    id: 'evt-101',
    title: 'Festival de Jazz al Parque',
    description: 'Noche de improvisación, saxofón y ensambles acústicos bajo las estrellas.',
    date: '2026-10-15T19:00:00',
    location: 'Parque Central',
    price: 0,
    categoryId: '1',
    categoryName: 'Música y Festivales',
  },
  {
    id: 'evt-102',
    title: 'Carrera Nocturna 10K',
    description: 'Recorrido urbano iluminado con estaciones de hidratación y medalla conmemorativa.',
    date: '2026-10-22T20:00:00',
    location: 'Malecón Turístico',
    price: 45000,
    categoryId: '2',
    categoryName: 'Deportes y Bienestar',
  },
  {
    id: 'evt-103',
    title: 'Hackathon PlanCity Tech',
    description: '24 horas seguidas construyendo soluciones para el transporte y cultura ciudadana.',
    date: '2026-11-05T08:00:00',
    location: 'Campus de Innovación',
    price: 0,
    categoryId: '4',
    categoryName: 'Tecnología e Innovación',
  },
];

export async function getEvents(): Promise<AppEvent[]> {
  // Simulamos la latencia de la consulta
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_EVENTS;
}