'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { categorySchema, CategoryFormData } from '@/types/category.schema';
import { createCategory } from '@/services/categories.service';

export default function NewCategoryPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CategoryFormData, string>>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof CategoryFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    const validationResult = categorySchema.safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors: Partial<Record<keyof CategoryFormData, string>> = {};
      for (const issue of validationResult.error.issues) {
        const field = issue.path[0] as keyof CategoryFormData;
        if (!formattedErrors[field]) {
          formattedErrors[field] = issue.message;
        }
      }
      setErrors(formattedErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await createCategory({
        name: validationResult.data.name.trim(),
        description: validationResult.data.description?.trim() || undefined,
      });

      router.push('/categories');
      router.refresh();
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Error al registrar la categoría en el backend.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-purple-950/5 border border-purple-100 p-8">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold uppercase mb-2">
            Administración
          </span>
          <h2 className="text-2xl font-bold text-gray-900">
            Nueva Categoría
          </h2>
        </div>

        {errorMessage && (
          <div
            role="alert"
            className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-sm font-medium"
          >
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="category-name"
              className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
            >
              Nombre *
            </label>
            <input
              id="category-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Festivales, Talleres, Deportes"
              className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm outline-none transition-all ${
                errors.name
                  ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                  : 'border-gray-200 focus:ring-2 focus:ring-purple-500'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="category-description"
              className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1"
            >
              Descripción (opcional)
            </label>
            <textarea
              id="category-description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
              placeholder="Breve descripción de la categoría..."
              className={`w-full px-4 py-2.5 bg-white border rounded-xl text-sm outline-none resize-none transition-all ${
                errors.description
                  ? 'border-red-500 bg-red-50/20 focus:ring-2 focus:ring-red-400'
                  : 'border-gray-200 focus:ring-2 focus:ring-purple-500'
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="pt-3 flex items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition-all shadow-md shadow-purple-600/20 active:scale-[0.98] disabled:opacity-50 text-sm"
            >
              {isSubmitting ? 'Guardando...' : 'Crear Categoría'}
            </button>
            <Link
              href="/categories"
              className="px-5 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}