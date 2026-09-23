'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FavoriteItem } from '@/types/favorite.types';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

async function loadFavorites() {
      try {
        // Consultamos la ruta interna de Next.js (sin problemas de CORS)
        const res = await axios.get<FavoriteItem[]>('/api/favorites');

        if (isMounted) {
          setFavorites(res.data ?? []);
          setLoading(false);
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (axios.isAxiosError(err)) {
            if (err.response?.status === 401) {
              setError('Debes iniciar sesión para consultar tus eventos favoritos.');
            } else {
              const message = err.response?.data?.message;
              setError(typeof message === 'string' ? message : 'Error al cargar tus favoritos.');
            }
          } else {
            setError('Ocurrió un error inesperado al consultar favoritos.');
          }
          setLoading(false);
        }
      }
    }

    void loadFavorites();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleRemoveFavorite = async (favoriteId: string | number) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
      await axios.delete(`${backendUrl}/favorites/${favoriteId}`, {
        withCredentials: true,
      });
      setFavorites((prev) => prev.filter((item) => item.id !== favoriteId));
    } catch {
      alert('No se pudo remover el evento de favoritos.');
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-12 md:py-16">
      {/* Luces y auras ambientales de fondo */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Cabecera */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 border-b border-purple-500/15 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-semibold text-purple-300 mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              <span>COLECCIÓN PERSONAL</span>
              <span className="text-slate-500">•</span>
              <span>{favorites.length} guardados</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Mis{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-300">
                Favoritos
              </span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl leading-relaxed">
              Eventos que has marcado para seguir de cerca y no perderte en tu agenda.
            </p>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#161622]/80 hover:bg-[#1f1f2e] border border-purple-500/30 hover:border-purple-500/60 text-slate-200 hover:text-white font-medium rounded-xl text-sm transition-all"
          >
            <span>Explorar más eventos</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {/* Estado de carga */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
            <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-xs font-mono">Cargando tus favoritos...</p>
          </div>
        )}

        {/* Error o no autenticado */}
        {!loading && error && (
          <div className="max-w-md mx-auto text-center py-16 px-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-xl mb-4">
              🔒
            </div>
            <h3 className="text-base font-bold text-white mb-2">{error}</h3>
            <Link
              href="/login"
              className="inline-block mt-4 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-purple-950/40"
            >
              Iniciar sesión
            </Link>
          </div>
        )}

        {/* Lista de favoritos */}
        {!loading && !error && favorites.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => {
              const evt = fav.event;
              return (
                <article
                  key={fav.id}
                  className="group relative bg-[#161622]/70 hover:bg-[#1b1b2a]/90 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/50 rounded-2xl p-6 shadow-xl shadow-purple-950/20 hover:shadow-purple-900/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {evt?.category ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-medium rounded-lg uppercase tracking-wider">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                          {evt.category.name}
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          General
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => handleRemoveFavorite(fav.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"
                        title="Quitar de favoritos"
                      >
                        ✕
                      </button>
                    </div>

                    <h2 className="text-xl font-bold text-slate-100 group-hover:text-purple-300 transition-colors tracking-tight line-clamp-1">
                      {evt?.name ?? evt?.title ?? 'Evento sin título'}
                    </h2>
                    <p className="text-sm text-slate-400 mt-2.5 line-clamp-2 leading-relaxed">
                      {evt?.description || 'Sin descripción detallada.'}
                    </p>

                    <div className="mt-4 space-y-1 text-xs text-slate-400">
                      <p>📍 {evt?.location || 'Ubicación pendiente'}</p>
                      {evt?.date && (
                        <p className="font-mono text-slate-500">
                          🗓️ {new Date(evt.date).toLocaleDateString('es-CO', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-purple-500/10 flex items-center justify-between text-xs">
                    <span className="text-purple-400 font-semibold font-mono text-sm">
                      {evt?.price ? `$${Number(evt.price).toLocaleString('es-CO')}` : 'Libre'}
                    </span>

                    <Link
                      href={`/events/${evt?.id ?? fav.eventId}`}
                      className="inline-flex items-center gap-1.5 font-medium text-purple-400 hover:text-purple-300 transition-colors group/link"
                    >
                      <span>Ver evento</span>
                      <span className="transition-transform duration-200 group-hover/link:translate-x-1">
                        &rarr;
                      </span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Sin favoritos guardados */}
        {!loading && !error && favorites.length === 0 && (
          <div className="text-center py-20 px-6 rounded-2xl border border-dashed border-purple-500/20 bg-[#161622]/40 backdrop-blur-md">
            <div className="w-12 h-12 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 text-xl mb-4">
              ⭐
            </div>
            <h3 className="text-lg font-bold text-slate-200">No tienes favoritos aún</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
              Explora los eventos de la ciudad y marca los que más te interesen para verlos aquí.
            </p>
            <Link
              href="/events"
              className="inline-block mt-6 px-5 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-medium rounded-xl text-xs transition-all shadow-lg shadow-purple-950/40"
            >
              Explorar eventos
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}