import z from "zod";

export const eventSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 letras" })
    .max(80, { message: "El nombre no puede superar los 80 caracteres" }),
  description: z
    .string()
    .min(10, { message: "La discripcion debe tener al menos 10 caracteres" })
    .max(500, {
      message: "La descripcion no puede superar los 500 caracteres",
    }),
  date: z
    .string()
    .refine((fechaIngresada) => !isNaN(Date.parse(fechaIngresada)), {
      message: "Debe ingresar una fecha y una hora valida",
    })
    .refine((fechaIngresada) => new Date(fechaIngresada) > new Date(), {
      message: "La fecha del evento debe ser en el futuro",
    }),
  location: z
    .string()
    .min(3, { message: "La ubicacion es obligatoria (minimo 3 caracteres)" }),
  price: z.coerce
    .number({ message: "El precio debe ser un numero valido" })
    .min(0, { message: "El precio no puede ser negativo" }),
  capacity: z.coerce
    .number({ message: "El aforo debe ser un número válido" })
    .int({ message: "La capacidad debe ser un número entero" })
    .min(1, { message: "El aforo mínimo debe ser de al menos 1 persona" }),
  categoryId: z.string().min(1, { message: "Debes seleccionar una categoria" }),
});

export type EventFormData = z.infer<typeof eventSchema>;
