'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { getEventId } from '@/services/events.service';
import { getCategories } from '@/services/categories.service';
import { Category } from '@/types/category.types';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    price: '',
    capacity: '',
    categoryId: '',
  });

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [eventData, categoriesData] = await Promise.all([
          getEventId(id),
          getCategories(),
        ]);

        if (categoriesData) {
          setCategories(categoriesData);
        }

        if (eventData) {
          setFormData({
            name: eventData.name || eventData.title || '',
            description: eventData.description || '',
            date: eventData.date
              ? new Date(eventData.date).toISOString().slice(0, 16)
              : '',
            location: eventData.location || '',
            price: eventData.price?.toString() || '',
            capacity: eventData.capacity?.toString() || '',
            categoryId: eventData.categoryId?.toString() || '',
          });
        }
      } catch (err) {
        setError('No se pudo cargar la información del evento');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const backendUrl =
        process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

      await axios.patch(
        `${backendUrl}/events/${id}`,
        {
          name: formData.name,
          description: formData.description,
          date: formData.date,
          location: formData.location,
          price: Number(formData.price),
          capacity: Number(formData.capacity),
          categoryId: formData.categoryId,
        },
        { withCredentials: true }
      );

      router.push(`/events/${id}`);
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al actualizar el evento');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0d0d12] flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
          <span className="text-sm font-mono">Cargando datos del evento...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#0d0d12] text-slate-100 px-6 py-10 md:py-16">
      {/* Luces y auras de fondo */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[350px] bg-violet-800/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Retorno */}
        <Link
          href={`/events/${id}`}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161622]/60 hover:bg-[#1f1f2e] border border-purple-500/20 hover:border-purple-500/40 text-xs font-medium text-slate-300 hover:text-white backdrop-blur-md mb-8 transition-all"
        >
          <span className="transition-transform group-hover:-translate-x-1">&larr;</span>
          <span>Volver al evento</span>
        </Link>

        {/* Encabezado */}
        <div className="mb-8 border-b border-purple-500/15 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs font-mono font-medium text-purple-300 mb-3">
            <span>MODO EDICIÓN</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Editar{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-300">
              Evento
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Actualiza los datos del evento y guarda los cambios para que se reflejen de inmediato.
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-[#161622]/80 backdrop-blur-xl border border-purple-500/20 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-purple-950/30"
        >
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Nombre del Evento
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Categoría
            </label>
            <div className="relative">
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#0d0d12] text-slate-400">
                  Selecciona una categoría...
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-[#161622] text-slate-100">
                    {cat.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          </div>

          {/* Fecha y Hora */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Fecha y Hora
            </label>
            <input
              type="datetime-local"
              name="date"
              required
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all [color-scheme:dark]"
            />
          </div>

          {/* Precio y Capacidad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Precio (COP)
              </label>
              <input
                type="number"
                name="price"
                min="0"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                Aforo / Capacidad
              </label>
              <input
                type="number"
                name="capacity"
                min="1"
                required
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Ubicación
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Descripción
            </label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#0d0d12]/80 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-purple-500/10">
            <Link
              href={`/events/${id}`}
              className="px-5 py-2.5 rounded-xl bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 disabled:opacity-50 text-white font-medium rounded-xl text-xs shadow-lg shadow-purple-950/50 hover:shadow-purple-900/50 transition-all flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Actualizando...</span>
                </>
              ) : (
                'Actualizar Evento'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}