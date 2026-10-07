export type Tarea = {
  id: string;
  titulo: string;
  completada: boolean;
  calificacion?: number; // Calificación de la tarea (ej: 0.0 a 5.0)
};
