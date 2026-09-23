'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { AppEvent } from '@/types/event.types';
import { AuthUser } from '@/types/auth.types';
import FavoriteButton from './FavoriteButton';

interface EventInfoProps {
  event: AppEvent;
}

export default function EventInfo({ event }: EventInfoProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Inicialización limpia de sesión sin provocar re-renders en cascada
  const [user] = useState<AuthUser | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('user');
    if (!saved) return null;
    try {
      return JSON.parse(saved) as AuthUser;
    } catch {
      return null;
    }
  });

  const handleDelete = async () => {
    if (!window.confirm('¿Seguro que deseas eliminar este evento?')) return;

    setIsDeleting(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      await axios.delete(`${backendUrl}/events/${event.id}`, { withCredentials: true });
      router.push('/events');
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || 'Error al eliminar el evento');
      } else {
        alert('Error inesperado al intentar eliminar');
      }
      setIsDeleting(false);
    }
  };

  // Manejo seguro por si el backend anida la categoría o no
  const categoryName = (event as { category?: { name?: string } }).category?.name || 'Categoría General';

  return (
    <article className="bg-[#161622]/80 backdrop-blur-2xl border border-purple-500/20 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/40 relative overflow-hidden">
      
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Cabecera superior con categoría y acciones */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-purple-500/15 pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono font-medium text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          <span className="uppercase tracking-wider">{categoryName}</span>
        </div>

        <div className="flex items-center gap-3">
          <FavoriteButton eventId={event.id} />

          {user?.role === 'admin' && (
            <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
              <Link
                href={`/events/${event.id}/edit`}
                className="px-3.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-medium transition-all"
              >
                ✏️ Editar
              </Link>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-400 text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
              >
                {isDeleting ? 'Borrando...' : '🗑️ Eliminar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Título */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-8">
        {event.name}
      </h1>

      {/* Grilla de Métricas estilo HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-[#0d0d12]/70 border border-slate-800/80 shadow-inner">
          <span className="text-slate-500 uppercase tracking-wider block mb-1.5">🗓️ Fecha & Hora</span>
          <span className="text-slate-200 font-medium leading-relaxed block">
            {event.date
              ? new Date(event.date).toLocaleDateString('es-CO', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Por definir'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d0d12]/70 border border-slate-800/80 shadow-inner">
          <span className="text-slate-500 uppercase tracking-wider block mb-1.5">📍 Ubicación</span>
          <span className="text-slate-200 font-medium truncate block">
            {event.location || 'No especificada'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0d0d12]/70 border border-slate-800/80 shadow-inner">
          <span className="text-slate-500 uppercase tracking-wider block mb-1.5">👥 Aforo</span>
          <span className="text-slate-200 font-medium block">
            {event.capacity ? `${Number(event.capacity).toLocaleString()} personas` : 'Ilimitado'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-950/30 to-[#0d0d12]/90 border border-purple-500/30 shadow-inner">
          <span className="text-purple-400 uppercase tracking-wider block mb-1.5">🎟️ Valor Entrada</span>
          <span className="text-purple-300 font-bold text-base block font-mono">
            {event.price && Number(event.price) > 0
              ? `$${Number(event.price).toLocaleString('es-CO')} COP`
              : 'Entrada Libre'}
          </span>
        </div>
      </div>

      {/* Sección descriptiva */}
      <div className="border-t border-purple-500/10 pt-8">
        <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
          <span>Acerca de la experiencia</span>
          <span className="h-px bg-slate-800 flex-1" />
        </h2>
        <div className="text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line max-w-none">
          {event.description || 'No hay descripción detallada disponible para este evento.'}
        </div>
      </div>
    </article>
  );
}