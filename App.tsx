import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useTareas } from './useTareas';

export default function App() {
  const {
    tareas,
    agregarTarea,
    alternarTarea,
    eliminarTarea, // Función de Duber Monsalve
    // ===== SOFIA: DESDE AQUÍ =====
    editarTarea, // Función de Sofia
    // ===== SOFIA: HASTA AQUÍ =====
    vaciarLista, // Función de Isabella
  } = useTareas();

  const [textoNuevaTarea, setTextoNuevaTarea] = useState('');

  // ===== SOFIA: DESDE AQUÍ ===== (estados del modo edición)
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [textoEditado, setTextoEditado] = useState('');
  const [errorEdicion, setErrorEdicion] = useState(false);
  // ===== SOFIA: HASTA AQUÍ =====

  const handleAgregar = () => {
    if (!textoNuevaTarea.trim()) {
      return;
    }
    const agregada = agregarTarea(textoNuevaTarea);
    if (agregada) {
      setTextoNuevaTarea('');
    }
  };

  // ===== SOFIA: DESDE AQUÍ ===== (funciones de editar)
  // Al tocar "Editar": activa el modo edición con el título actual
  const empezarEdicion = (id: string, tituloActual: string) => {
    setEditandoId(id);
    setTextoEditado(tituloActual);
    setErrorEdicion(false);
  };

  // Al tocar "Guardar": llama a editarTarea del hook
  const guardarEdicion = () => {
    if (editandoId && editarTarea(editandoId, textoEditado)) {
      setEditandoId(null);
      setTextoEditado('');
      setErrorEdicion(false);
    } else {
      setErrorEdicion(true);
    }
  };

  // Al tocar "Cancelar": sale del modo edición sin cambiar nada
  const cancelarEdicion = () => {
    setEditandoId(null);
    setTextoEditado('');
    setErrorEdicion(false);
  };
  // ===== SOFIA: HASTA AQUÍ =====

  const tareasCompletadas = tareas.filter((t) => t.completada).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
        <ScrollView contentContainerStyle={styles.container}>
          {/* ENCABEZADO */}
          <View style={styles.header}>
            <Text style={styles.headerBadge}>IUSH - MOVILES - TAREA #1</Text>
            <Text style={styles.headerTitle}>Aula de Tareas</Text>
            <Text style={styles.headerDescription}>
              Gestor de Tareas y Calificaciones en React Native
            </Text>
          </View>

          {/* PANEL RESUMEN RÁPIDO (TEMA CLARO) */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{tareas.length}</Text>
              <Text style={styles.summaryLabel}>Total Tareas</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#16a34a' }]}>
                {tareasCompletadas}
              </Text>
              <Text style={styles.summaryLabel}>Completadas</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#ea580c' }]}>
                {tareas.length - tareasCompletadas}
              </Text>
              <Text style={styles.summaryLabel}>Pendientes</Text>
            </View>
          </View>

          {/* FORMULARIO AGREGAR TAREA */}
          <View style={styles.inputCard}>
            <TextInput
              style={styles.textInput}
              placeholder="Escribe el nombre de la tarea..."
              placeholderTextColor="#94a3b8"
              value={textoNuevaTarea}
              onChangeText={setTextoNuevaTarea}
            />
            <TouchableOpacity
              style={styles.btnAgregar}
              onPress={handleAgregar}
              activeOpacity={0.8}
            >
              <Text style={styles.btnAgregarText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          {/* FUNCIÓN ISABELLA: Vaciar lista */}
            <TouchableOpacity
            style={styles.btnVaciar}
            onPress={vaciarLista}
            activeOpacity={0.8}
          >
            <Text style={styles.btnVaciarText}>Vaciar lista</Text>
            </TouchableOpacity>

          {/* LISTADO DE TAREAS */}
          <Text style={styles.sectionTitle}>Listado de Tareas ({tareas.length})</Text>

          {tareas.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No hay tareas registradas</Text>
              <Text style={styles.emptySubText}>
                Escribe una tarea arriba y presiona "Agregar".
              </Text>
            </View>
          ) : (
            tareas.map((tarea) => (
              <View key={tarea.id} style={styles.taskCard}>
                {/* ===== SOFIA: DESDE AQUÍ ===== (condición modo edición / modo normal) */}
                {editandoId === tarea.id ? (
                  /* MODO EDICIÓN (Sofia) */
                  <View style={styles.editContainer}>
                    <TextInput
                      style={styles.editInput}
                      value={textoEditado}
                      onChangeText={(t) => {
                        setTextoEditado(t);
                        setErrorEdicion(false);
                      }}
                      autoFocus
                      onSubmitEditing={guardarEdicion}
                      placeholder="Nuevo título..."
                      placeholderTextColor="#94a3b8"
                    />
                    {errorEdicion && (
                      <Text style={styles.editError}>
                        El título no puede estar vacío
                      </Text>
                    )}
                    <View style={styles.editButtonsRow}>
                      <TouchableOpacity
                        style={styles.btnGuardar}
                        onPress={guardarEdicion}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.btnGuardarText}>Guardar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnCancelar}
                        onPress={cancelarEdicion}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.btnCancelarText}>Cancelar</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  /* MODO NORMAL */
                  <>
                    {/* ===== SOFIA: HASTA AQUÍ ===== (el modo normal sigue abajo) */}
                    <TouchableOpacity
                      style={[styles.checkbox, tarea.completada && styles.checkboxActive]}
                      onPress={() => alternarTarea(tarea.id)}
                      activeOpacity={0.7}
                    >
                      {tarea.completada && <Text style={styles.checkmark}>X</Text>}
                    </TouchableOpacity>

                    <Text
                      style={[
                        styles.taskTitle,
                        tarea.completada && styles.taskTitleCompleted,
                      ]}
                    >
                      {tarea.titulo}
                    </Text>

                    {/* ===== SOFIA: DESDE AQUÍ ===== (botón Editar) */}
                    <TouchableOpacity
                      onPress={() => empezarEdicion(tarea.id, tarea.titulo)}
                      style={styles.btnEditar}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.btnEditarText}>Editar</Text>
                    </TouchableOpacity>
                    {/* ===== SOFIA: HASTA AQUÍ ===== */}

                    {/* FUNCION DUBER MONSALVE: Boton Eliminar */}
                    <TouchableOpacity
                      onPress={() => eliminarTarea(tarea.id)}
                      style={styles.btnEliminar}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <Text style={styles.btnEliminarText}>Eliminar</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            ))
          )}

          {/* TARJETA DE EQUIPO / PARTICIPANTES */}
          <View style={styles.teamCard}>
            <Text style={styles.teamTitle}>Equipo de Trabajo (4 Integrantes)</Text>

            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>1. Duber Monsalve</Text>
                <Text style={styles.memberStatusDone}>Funcion: eliminarTarea(id)</Text>
              </View>
              <View style={styles.badgeDone}>
                <Text style={styles.badgeDoneText}>Lista</Text>
              </View>
            </View>

            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>2. Carlos</Text>
                <Text style={styles.memberStatusPending}>Pendiente de elegir función</Text>
              </View>
              <View style={styles.badgePending}>
                <Text style={styles.badgePendingText}>Por hacer</Text>
              </View>
            </View>

            {/* ===== SOFIA: DESDE AQUÍ ===== (mi fila en la tarjeta del equipo) */}
            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>3. Sofia</Text>
                <Text style={styles.memberStatusDone}>
                  Funcion: editarTarea(id, nuevoTitulo)
                </Text>
              </View>
              <View style={styles.badgeDone}>
                <Text style={styles.badgeDoneText}>Lista</Text>
              </View>
            </View>
            {/* ===== SOFIA: HASTA AQUÍ ===== */}

            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>4. Isabella</Text>
                <Text style={styles.memberStatusDone}>
                Función: vaciarLista()
                </Text>
              </View>
              <View style={styles.badgeDone}>
                <Text style={styles.badgeDoneText}>Lista</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 18,
  },
  headerBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6366f1',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  headerDescription: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  summaryCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
  },
  summaryDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#e2e8f0',
  },
  inputCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 6,
    alignItems: 'center',
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    elevation: 1,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#0f172a',
  },
  btnAgregar: {
    backgroundColor: '#4f46e5',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnAgregarText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#475569',
  },
  emptySubText: {
    fontSize: 13,
    color: '#94a3b8',
    marginTop: 4,
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#94a3b8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    color: '#1e293b',
    fontWeight: '600',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  btnEliminar: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  btnEliminarText: {
    color: '#dc2626',
    fontWeight: '600',
    fontSize: 12,
  },
///ISABELLA///
btnVaciar: {
  backgroundColor: '#fee2e2',
  paddingVertical: 10,
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: 18,
},

btnVaciarText: {
  color: '#dc2626',
  fontWeight: '700',
  fontSize: 13,
},
  // ===== SOFIA: DESDE AQUÍ ===== (estilos de editar)
  btnEditar: {
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  btnEditarText: {
    color: '#4f46e5',
    fontWeight: '600',
    fontSize: 12,
  },
  editContainer: {
    flex: 1,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#a5b4fc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },
  editError: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  editButtonsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  btnGuardar: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
  },
  btnGuardarText: {
    color: '#16a34a',
    fontWeight: '700',
    fontSize: 13,
  },
  btnCancelar: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  btnCancelarText: {
    color: '#64748b',
    fontWeight: '700',
    fontSize: 13,
  },
  // ===== SOFIA: HASTA AQUÍ =====

  teamCard: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  teamTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 12,
  },
  memberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
  },
  memberStatusDone: {
    fontSize: 12,
    color: '#16a34a',
    marginTop: 2,
    fontWeight: '500',
  },
  memberStatusPending: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 2,
  },
  badgeDone: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeDoneText: {
    color: '#16a34a',
    fontSize: 11,
    fontWeight: '700',
  },
  badgePending: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgePendingText: {
    color: '#64748b',
    fontSize: 11,
    fontWeight: '600',
  },
});

