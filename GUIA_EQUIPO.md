# Guía del Proyecto: Aula de Tareas (React Native + Expo)

> **Materia:** Programación Móvil - Tarea #1  
> **Institución:** IUSH  
> **Integrantes:** Duber Monsalve, Carlos, Sofia, Isabel  
> **Tema visual:** Claro (Light theme)  

---

## 1. ¿De qué trata este proyecto?
Es una aplicación móvil desarrollada en **React Native** con el framework **Expo** y **TypeScript**. Su objetivo es gestionar una lista de tareas de clase y calificaciones, aplicando arquitectura limpia: separando la **lógica** (en un Hook personalizado) de la **interfaz gráfica** (en la vista).

---

## 2. Paso a paso: ¿Cómo se creó el proyecto? (Para principiantes)

Para crear este proyecto desde cero en la terminal, se ejecutaron los siguientes pasos técnicos:

```bash
# 1. Crear el proyecto base con Expo y la plantilla de TypeScript
npx create-expo-app@latest aula-tareas --template blank-typescript --yes

# 2. Entrar a la carpeta del proyecto
cd aula-tareas

# 3. Instalar librerías de soporte web y manejo de áreas seguras en pantalla
npx expo install react-dom react-native-web @expo/metro-runtime react-native-safe-area-context

# 4. Iniciar el servidor de desarrollo
npx expo start
```

---

## 3. Glosario para principiantes: ¿Qué es cada cosa?

### `node_modules`
* **¿Qué es?** Es una carpeta que contiene todas las librerías externas y paquetes que React Native y Expo necesitan para funcionar.
* **¿Por qué pesa tanto?** Puede pesar cientos de megabytes porque incluye miles de archivos de código escrito por otros desarrolladores.
* **¿Por qué NUNCA se sube a GitHub?** Sería muy pesado e ineficiente. En su lugar, el archivo `.gitignore` le dice a Git que ignore esta carpeta. Cualquier compañero que clone el repositorio solo tiene que ejecutar `npm install` en su computadora y la carpeta se descargará automáticamente.

### `package.json`
* Es la "cédula de identidad" del proyecto.
* Contiene el nombre del proyecto, la versión y la lista de dependencias (librerías instaladas) con sus versiones exactas.

### `.gitignore`
* Es un archivo de texto plano donde anotamos los nombres de archivos y carpetas que **no queremos** que Git suba a la nube (como `node_modules/` o archivos temporales).

---

## 4. Los 2 archivos nuevos creados y qué función cumplen

Para no mezclar todo el código en una sola pantalla gigante, separamos el proyecto de forma profesional:

### 1. `types.ts` (El Molde de Datos)
* **Función:** Define la estructura o "contrato" de TypeScript que debe cumplir cada tarea.
* **Código:**
```typescript
export type Tarea = {
  id: string;             // Identificador único (ej: "1", "2")
  titulo: string;         // Nombre o descripción de la tarea
  completada: boolean;    // true si ya se hizo, false si está pendiente
  calificacion?: number;  // (Opcional) Nota de 0.0 a 5.0
};
```
* **¿Por qué sirve?** Evita errores tipográficos al programar. Si intentas guardar algo que no coincide con este molde, TypeScript te avisará antes de que la aplicación falle.

### 2. `useTareas.ts` (La Lógica o "Hook Personalizado")
* **Función:** Contiene el "cerebro" de la aplicación. Aquí residen:
  * El estado `useState<Tarea[]>`: la lista de tareas en memoria.
  * La referencia `useRef`: contador para generar los IDs.
  * Todas las funciones que modifican las tareas (agregar, alternar, eliminar, calificar, etc.).
* **¿Por qué sirve?** `App.tsx` solo se preocupa por pintar botones y textos; no necesita saber *cómo* se filtran o calculan las cosas por dentro.

---

## 5. Función Desarrollada por Duber Monsalve

Duber implementó la función de **Eliminar Tarea**:

```typescript
function eliminarTarea(id: string) {
  setTareas((anteriores) => anteriores.filter((tarea) => tarea.id !== id));
}
```

### ¿Cómo funciona paso a paso?
1. Recibe el `id` de la tarea que se desea borrar.
2. Usa `setTareas` para actualizar el estado.
3. El método `.filter()` recorre todas las tareas anteriores y se queda únicamente con las tareas cuyo `id` sea diferente al que queremos borrar.
4. La tarea seleccionada desaparece de la pantalla al instante.

---

## 6. Ideas para los demás integrantes (Carlos, Sofia e Isabel)

Cada integrante puede elegir **1 idea** de su sección para implementarla en `useTareas.ts` y conectarla en `App.tsx`:

---

### Opciones para CARLOS

#### Opción C1: Calificar Tarea (Asignar nota de 0.0 a 5.0)
* **Qué hace:** Permite que el usuario le ponga una calificación a una tarea específica.
* **Código para `useTareas.ts`:**
```typescript
function calificarTarea(id: string, nota: number) {
  if (nota < 0 || nota > 5) return false;
  setTareas((anteriores) =>
    anteriores.map((t) => (t.id === id ? { ...t, calificacion: nota } : t))
  );
  return true;
}
```

#### Opción C2: Editar el Título de una Tarea
* **Qué hace:** Permite corregir o cambiar el nombre de una tarea ya existente.
* **Código para `useTareas.ts`:**
```typescript
function editarTitulo(id: string, nuevoTitulo: string) {
  const limpio = nuevoTitulo.trim();
  if (!limpio) return false;
  setTareas((anteriores) =>
    anteriores.map((t) => (t.id === id ? { ...t, titulo: limpio } : t))
  );
  return true;
}
```

#### Opción C3: Asignar Nivel de Prioridad (Alta / Media / Baja)
* **Qué hace:** Agrega un campo de prioridad a la tarea para destacar las más urgentes.
* **Código para `useTareas.ts`:**
```typescript
function cambiarPrioridad(id: string, prioridad: 'Alta' | 'Media' | 'Baja') {
  setTareas((anteriores) =>
    anteriores.map((t) => (t.id === id ? { ...t, prioridad } : t))
  );
}
```

---

### Opciones para SOFIA

#### Opción S1: Calcular el Promedio General de Notas
* **Qué hace:** Suma las calificaciones existentes y devuelve el promedio general del curso.
* **Código para `useTareas.ts`:**
```typescript
function calcularPromedio(): number {
  const calificadas = tareas.filter((t) => t.calificacion !== undefined);
  if (calificadas.length === 0) return 0;
  const suma = calificadas.reduce((acum, t) => acum + (t.calificacion ?? 0), 0);
  return Number((suma / calificadas.length).toFixed(2));
}
```

#### Opción S2: Limpiar Tareas Completadas (Borrado Masivo)
* **Qué hace:** Un botón que elimina de un solo toque todas las tareas que ya están marcadas como `completada: true`.
* **Código para `useTareas.ts`:**
```typescript
function limpiarCompletadas() {
  setTareas((anteriores) => anteriores.filter((t) => !t.completada));
}
```

#### Opción S3: Marcar Todas las Tareas como Completadas
* **Qué hace:** Un botón rápido que pone `completada: true` a todas las tareas existentes.
* **Código para `useTareas.ts`:**
```typescript
function completarTodas() {
  setTareas((anteriores) =>
    anteriores.map((t) => ({ ...t, completada: true }))
  );
}
```

---

### Opciones para ISABEL

#### Opción I1: Estadísticas de Aprobados y Reprobados
* **Qué hace:** Cuenta cuántas tareas tienen nota aprobatoria (>= 3.0) y cuántas reprobadas (< 3.0).
* **Código para `useTareas.ts`:**
```typescript
function obtenerReporteNotas() {
  const aprobadas = tareas.filter((t) => (t.calificacion ?? 0) >= 3.0 && t.calificacion !== undefined).length;
  const reprobadas = tareas.filter((t) => (t.calificacion ?? 0) < 3.0 && t.calificacion !== undefined).length;
  const pendientes = tareas.filter((t) => t.calificacion === undefined).length;
  return { aprobadas, reprobadas, pendientes };
}
```

#### Opción I2: Vaciar Lista Completa (Reset de Tareas)
* **Qué hace:** Botón de reinicio que borra todas las tareas registradas de una sola vez.
* **Código para `useTareas.ts`:**
```typescript
function vaciarLista() {
  setTareas([]);
}
```

#### Opción I3: Duplicar / Clonar una Tarea
* **Qué hace:** Crea una copia de una tarea existente con un nuevo ID único.
* **Código para `useTareas.ts`:**
```typescript
function duplicarTarea(id: string) {
  const original = tareas.find((t) => t.id === id);
  if (!original) return;
  const copia: Tarea = {
    id: String(siguienteId.current++),
    titulo: `${original.titulo} (Copia)`,
    completada: false,
    calificacion: original.calificacion,
  };
  setTareas((anteriores) => [...anteriores, copia]);
}
```

---

## 7. ¿Cómo ejecutar y probar el proyecto en tu máquina?

1. Abre la terminal en la carpeta `aula-tareas`:
   ```bash
   cd aula-tareas
   ```
2. Instala dependencias (si acabas de clonar el repo):
   ```bash
   npm install
   ```
3. Ejecuta el servidor Expo:
   ```bash
   npx expo start
   ```
4. Para verla:
   * **En la web:** Presiona la tecla `w` en la consola.
   * **En tu celular:** Abre la app **Expo Go** y escanea el código QR que se muestra en la terminal.

---

## 8. Cómo subir el proyecto a GitHub (Paso a paso)

1. En GitHub, crea un nuevo repositorio llamado `aula-tareas` (déjalo público y sin README).
2. En la terminal dentro de `aula-tareas`, ejecuta:

```bash
git add .
git commit -m "feat: Proyecto aula-tareas con función de Duber y guía para el equipo"
git branch -M main
git remote add origin https://github.com/TU_USUARIO_GITHUB/aula-tareas.git
git push -u origin main
```
