"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { eventSchema, EventFormData } from "@/types/event.schema";
import { createEvent } from "@/services/events.service";
import { Category } from "@/types/category.types";

interface EventFormProps {
  categories: Category[];
}

export default function EventForm({ categories }: EventFormProps) {
  const router = useRouter();

  // Estado que guarda los valores ingresados en los inputs
  // Iniciamos price y capacity como string vacío para evitar que aparezca un 0 fijo que bloquee el borrado
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
    price: "",
    capacity: "",
    categoryId: "",
  });

  // Diccionario para guardar los errores por campo: { name: 'mensaje', price: 'mensaje' }
  const [errors, setErrors] = useState<
    Partial<Record<keyof EventFormData, string>>
  >({});

  // Estado para bloquear el botón mientras se procesa la petición en red
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Maneja los cambios en cualquier input, textarea o select
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      // Si el input es type="number" y el usuario borra todo, dejamos el string vacío en vez de forzar un 0
      [name]: type === "number" ? (value === "" ? "" : Number(value)) : value,
    }));

    // Si el usuario empieza a corregir el campo, limpiamos su error visual
    if (errors[name as keyof EventFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Inspección segura: 'safeParse' evalúa los datos sin lanzar excepciones
    const validationResult = eventSchema.safeParse(formData);

    // Si la aduana de Zod rechaza los datos:
    if (!validationResult.success) {
      const formattedErrors: Partial<Record<keyof EventFormData, string>> = {};

      // Recorremos los fallos detectados por Zod
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof EventFormData;
        if (!formattedErrors[fieldName]) {
          formattedErrors[fieldName] = issue.message;
        }
      }

      setErrors(formattedErrors);
      setIsSubmitting(false);
      return; // Detenemos el flujo aquí
    }

    // Si validationResult.success es true, validationResult.data contiene los datos garantizados
    try {
      const newEvent = await createEvent(validationResult.data);
      if (newEvent) {
        router.push("/events"); // Redirige al catálogo general
        router.refresh(); // Solicita a Next.js refrescar datos del servidor
      }
    } catch (err) {
      console.error("Error al registrar el evento en el backend:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 sm:p-8 border border-slate-200 rounded-2xl shadow-sm"
    >
      {/* Campo: Nombre */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          Nombre del Evento
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ej: Concierto de Jazz en Vivo"
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
            errors.name
              ? "border-red-500 bg-red-50/20"
              : "border-slate-300 focus:border-purple-600"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      {/* Campo: Categoría */}
      <div>
        <label
          htmlFor="categoryId"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          Categoría
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
            errors.categoryId
              ? "border-red-500 bg-red-50/20"
              : "border-slate-300 focus:border-purple-600"
          }`}
        >
          <option value="">Selecciona una categoría...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.categoryId && (
          <p className="text-red-500 text-xs mt-1">{errors.categoryId}</p>
        )}
      </div>

      {/* Campo: Fecha y Hora */}
      <div>
        <label
          htmlFor="date"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          Fecha y Hora
        </label>
        <input
          id="date"
          name="date"
          type="datetime-local"
          value={formData.date}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
            errors.date
              ? "border-red-500 bg-red-50/20"
              : "border-slate-300 focus:border-purple-600"
          }`}
        />
        {errors.date && (
          <p className="text-red-500 text-xs mt-1">{errors.date}</p>
        )}
      </div>

      {/* Fila doble: Precio y Aforo / Capacidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Subcampo: Precio */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Precio (COP)
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            placeholder="Ej: 50000"
            value={formData.price}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
              errors.price
                ? "border-red-500 bg-red-50/20"
                : "border-slate-300 focus:border-purple-600"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price}</p>
          )}
        </div>

        {/* Subcampo: Capacidad / Aforo */}
        <div>
          <label
            htmlFor="capacity"
            className="block text-sm font-semibold text-slate-700 mb-1"
          >
            Aforo / Capacidad
          </label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            placeholder="Ej: 150"
            value={formData.capacity}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
              errors.capacity
                ? "border-red-500 bg-red-50/20"
                : "border-slate-300 focus:border-purple-600"
            }`}
          />
          {errors.capacity && (
            <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>
          )}
        </div>
      </div>

      {/* Campo: Ubicación */}
      <div>
        <label
          htmlFor="location"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          Ubicación
        </label>
        <input
          id="location"
          name="location"
          type="text"
          value={formData.location}
          onChange={handleChange}
          placeholder="Ej: Gran Malecón del Río"
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors ${
            errors.location
              ? "border-red-500 bg-red-50/20"
              : "border-slate-300 focus:border-purple-600"
          }`}
        />
        {errors.location && (
          <p className="text-red-500 text-xs mt-1">{errors.location}</p>
        )}
      </div>

      {/* Campo: Descripción */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-slate-700 mb-1"
        >
          Descripción (Opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe los detalles, recomendaciones o invitados del evento..."
          className={`w-full px-4 py-2 border rounded-lg text-sm outline-none transition-colors resize-none ${
            errors.description
              ? "border-red-500 bg-red-50/20"
              : "border-slate-300 focus:border-purple-600"
          }`}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description}</p>
        )}
      </div>

      {/* Botón de envío con estado de carga */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm"
      >
        {isSubmitting ? "Validando y Publicando..." : "Publicar Evento"}
      </button>
    </form>
  );
}