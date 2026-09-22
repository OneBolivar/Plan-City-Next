import Link from 'next/link';
import { getCategories } from '@/services/categories.service';
import EventForm from '@/components/EventForm';

export default async function NewEventPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-10 md:py-16">
      {/* Luces de fondo (Glow ambiental) */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Botón de retorno */}
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161622]/60 hover:bg-[#1f1f2e] border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-md mb-8 transition-all duration-200"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>Volver al listado</span>
        </Link>

        {/* Encabezado */}
        <div className="mb-8 border-b border-purple-500/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono font-medium text-purple-300 mb-3">
            <span>NUEVO REGISTRO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Crear Nuevo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
              Evento
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Completa la información del evento para que la comunidad de PlanCity pueda descubrirlo.
          </p>
        </div>

        {/* Formulario modular */}
        <EventForm categories={categories} />

      </div>
    </main>
  );
}