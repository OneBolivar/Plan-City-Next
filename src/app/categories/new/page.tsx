'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

export default function NewCategoryPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

      await axios.post(
        `${backendUrl}/categories`,
        {
          name: formData.name,
          description: formData.description,
        },
        { withCredentials: true }
      );

      router.push('/categories');
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setError(typeof message === 'string' ? message : 'Error al crear la categoría');
      } else {
        setError('Ocurrió un error inesperado');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-12 md:py-16 flex items-center justify-center">
      {/* Luces y auras de fondo */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse [animation-duration:8s]" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-lg w-full relative z-10">
        
        {/* Retorno */}
        <Link
          href="/categories"
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161622]/60 hover:bg-[#1f1f2e] border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-md mb-6 transition-all"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>Volver a Categorías</span>
        </Link>

        {/* Tarjeta del formulario */}
        <div className="bg-[#161622]/85 backdrop-blur-2xl border border-purple-500/20 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-purple-950/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-[70px] pointer-events-none -z-10" />

          {/* Encabezado */}
          <div className="text-center mb-8">
            <span className="inline-block px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-[11px] font-mono font-medium text-purple-300 uppercase tracking-widest mb-3 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              ADMINISTRACIÓN
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Nueva{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
                Categoría
              </span>
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div className="group">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
                Nombre <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ej: Festivales, Talleres, Deportes"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300"
              />
            </div>

            {/* Descripción */}
            <div className="group">
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
                Descripción (Opcional)
              </label>
              <textarea
                name="description"
                rows={3}
                placeholder="Breve descripción de la categoría..."
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300 resize-none"
              />
            </div>

            {/* Acciones */}
            <div className="flex items-center gap-3 pt-4 border-t border-purple-500/10">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 text-white font-medium rounded-xl text-xs shadow-lg shadow-purple-950/40 hover:shadow-purple-900/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  'Crear Categoría'
                )}
              </button>

              <Link
                href="/categories"
                className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/5 border border-transparent hover:border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all text-center"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}