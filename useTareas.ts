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
  // FUNCIÓN DESARROLLADA POR: Sofia
  // ==========================================================
  /**
   * Editar Tarea
   * Desarrollado por: Sofia
   * Descripción: Busca la tarea por su ID y le cambia el título por el
   * nuevo texto, usando .map() para no modificar el resto de tareas.
   * Devuelve false si el nuevo título está vacío (no se guarda el cambio).
   */
  function editarTarea(id: string, nuevoTitulo: string): boolean {
    const titulo = nuevoTitulo.trim();

    if (!titulo) {
      return false;
    }

    setTareas((anteriores) =>
      anteriores.map((tarea) =>
        tarea.id === id ? { ...tarea, titulo } : tarea
      )
    );
    return true;
  }

   // FUNCIÓN DESARROLLADA POR ISABELLA/////

  function editarTarea(id: string, nuevoTitulo: string): boolean {
  const titulo = nuevoTitulo.trim();

  if (!titulo) {
    return false;
  }

  setTareas((anteriores) =>
    anteriores.map((tarea) =>
      tarea.id === id ? { ...tarea, titulo } : tarea
    )
  );

  return true;
}
// FUNCIÓN DESARROLLADA POR ISABELLA/////
// Vaciar toda la lista de tareas///
function vaciarLista() {
  setTareas([]);
}

 // FUNCION DESARROLLADA POR CARLOS ANDRES////

 function calificarTarea(id: string, nota: number) {
  if (nota < 0 || nota > 5) return false;
  setTareas((anteriores) =>
    anteriores.map((t) => (t.id === id ? { ...t, calificacion: nota } : t))
  );
  return true;
} // ==========================================================
  // FUNCION DESARROLLADA POR CARLOS ANDRES////
  // Calificar la tarea///
 

  
  return {
    tareas,
    agregarTarea,
    alternarTarea,
    eliminarTarea, // Función de Duber Monsalve
    editarTarea, // Función de Sofia ALzate 
    vaciarLista,
    calificarTarea, // Función de Isabella
  };
}
