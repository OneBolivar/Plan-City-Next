'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Category } from '@/types/category.types';

interface EventFormProps {
  categories: Category[];
}

export default function EventForm({ categories }: EventFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    location: '',
    price: '',
    capacity: '',
    categoryId: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        `${backendUrl}/events`,
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

      router.push('/events');
      router.refresh();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const message = err.response?.data?.message;
        setError(typeof message === 'string' ? message : 'Error al registrar el evento');
      } else {
        setError('Ocurrió un error inesperado al registrar el evento');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-[#161622]/85 backdrop-blur-2xl border border-purple-500/20 p-6 sm:p-10 rounded-3xl shadow-2xl shadow-purple-950/40 relative overflow-hidden transition-all duration-300 hover:border-purple-500/40"
    >
      <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
          <span className="text-base">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Nombre */}
      <div className="group">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
          Nombre del Evento <span className="text-purple-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Ej: Concierto de Jazz en Vivo"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300"
        />
      </div>

      {/* Categoría */}
      <div className="group">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
          Categoría <span className="text-purple-400">*</span>
        </label>
        <div className="relative">
          <select
            name="categoryId"
            required
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300 appearance-none cursor-pointer"
          >
            <option value="" className="bg-[#0d0d12] text-slate-500">
              Selecciona una categoría...
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-[#161622] text-slate-200">
                {cat.name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-purple-400 text-xs">
            ▼
          </div>
        </div>
      </div>

      {/* Fecha y Hora */}
      <div className="group">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
          Fecha y Hora <span className="text-purple-400">*</span>
        </label>
        <input
          type="datetime-local"
          name="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300 [color-scheme:dark]"
        />
      </div>

      {/* Precio y Capacidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="group">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
            Precio (COP) <span className="text-purple-400">*</span>
          </label>
          <input
            type="number"
            name="price"
            min="0"
            required
            placeholder="0 si es libre"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300"
          />
        </div>

        <div className="group">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
            Aforo / Capacidad <span className="text-purple-400">*</span>
          </label>
          <input
            type="number"
            name="capacity"
            min="1"
            required
            placeholder="Ej: 150"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300"
          />
        </div>
      </div>

      {/* Ubicación */}
      <div className="group">
        <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2 group-focus-within:text-purple-400 transition-colors">
          Ubicación <span className="text-purple-400">*</span>
        </label>
        <input
          type="text"
          name="location"
          required
          placeholder="Ej: Gran Malecón del Río"
          value={formData.location}
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
          rows={4}
          placeholder="Describe los detalles, recomendaciones o invitados del evento..."
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-[#0d0d12]/90 border border-slate-700/60 rounded-xl text-slate-100 text-sm placeholder:text-slate-600 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/15 transition-all duration-300 resize-none"
        />
      </div>

      {/* Botón de acción */}
      <div className="pt-4 border-t border-purple-500/10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-[0_0_25px_rgba(168,85,247,0.35)] hover:shadow-[0_0_35px_rgba(168,85,247,0.55)] transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Publicando...</span>
            </>
          ) : (
            'Publicar Evento'
          )}
        </button>
      </div>
    </form>
  );
}