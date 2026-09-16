import { z } from 'zod';

export const categorySchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(50, { message: 'El nombre no puede superar los 50 caracteres' }),
  description: z
    .string()
    .max(250, { message: 'La descripción no puede superar los 250 caracteres' })
    .optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;