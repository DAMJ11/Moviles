import { useRef, useState } from 'react';
import type { Tarea } from './types';

export function useTareas() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const siguienteId = useRef(1);

  // ==========================================================
  // FUNCIONES BASE (Iniciales del proyecto)
  // ==========================================================

  // 1. Agregar una nueva tarea a la lista
  function agregarTarea(texto: string): boolean {
    const titulo = texto.trim();

    if (!titulo) {
      return false;
    }

    const nuevaTarea: Tarea = {
      id: String(siguienteId.current++),
      titulo,
      completada: false,
    };

    setTareas((anteriores) => [...anteriores, nuevaTarea]);
    return true;
  }

  // 2. Alternar estado (completada o pendiente)
  function alternarTarea(id: string) {
    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id
          ? { ...tarea, completada: !tarea.completada }
          : tarea
      )
    );
  }

  // ==========================================================
  // FUNCIÓN DESARROLLADA POR: Duber Monsalve
  // ==========================================================
  /**
   * Eliminar Tarea
   * Desarrollado por: Duber Monsalve
   * Descripción: Busca la tarea por su ID y la elimina del estado actual
   * utilizando el método .filter() de JavaScript.
   */
  function eliminarTarea(id: string) {
    setTareas((anteriores) => anteriores.filter((tarea) => tarea.id !== id));
  }

  // ==========================================================
  // ESPACIO PARA LOS DEMÁS INTEGRANTES:
  // - Carlos: (Ver ideas en GUIA_EQUIPO.md)
  // - Sofia:  (Ver ideas en GUIA_EQUIPO.md)
  // - Isabel: (Ver ideas en GUIA_EQUIPO.md)
  // ==========================================================

  return {
    tareas,
    agregarTarea,
    alternarTarea,
    eliminarTarea, // Función de Duber Monsalve
  };
}
