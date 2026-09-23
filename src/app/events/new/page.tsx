import Link from 'next/link';
import { getCategories } from '@/services/categories.service';
import EventForm from '@/components/EventForm';

export default async function NewEventPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-10 md:py-16 selection:bg-purple-500/30 selection:text-purple-200">
      {/* Luces y auras de fondo con animaciones de respiración/pulso */}
      <div className="absolute -top-24 left-1/4 w-[600px] h-[450px] bg-gradient-to-tr from-purple-600/20 to-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[400px] bg-gradient-to-bl from-violet-700/20 to-indigo-700/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse [animation-duration:10s]" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Botón de retorno interactivo */}
        <Link
          href="/events"
          className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#161622]/60 hover:bg-[#1f1f2e] border border-purple-500/20 hover:border-purple-500/50 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-xl mb-8 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:-translate-x-1"
        >
          <span className="text-purple-400 transition-transform duration-300 group-hover:-translate-x-1 font-bold">
            &larr;
          </span>
          <span>Volver al listado</span>
        </Link>

        {/* Encabezado con badge luminoso */}
        <header className="mb-8 border-b border-purple-500/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono font-medium text-purple-300 mb-3 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <span className="tracking-wider">NUEVO REGISTRO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Crear Nuevo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-indigo-300">
              Evento
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
            Completa la información del evento para que la comunidad de PlanCity pueda descubrirlo y sumarlo a su agenda.
          </p>
        </header>

        {/* Formulario modular */}
        <EventForm categories={categories} />
      </div>
    </main>
  );
}