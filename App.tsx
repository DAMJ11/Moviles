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
  } = useTareas();

  const [textoNuevaTarea, setTextoNuevaTarea] = useState('');

  const handleAgregar = () => {
    if (!textoNuevaTarea.trim()) {
      return;
    }
    const agregada = agregarTarea(textoNuevaTarea);
    if (agregada) {
      setTextoNuevaTarea('');
    }
  };

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

                {/* FUNCION DUBER MONSALVE: Boton Eliminar */}
                <TouchableOpacity
                  onPress={() => eliminarTarea(tarea.id)}
                  style={styles.btnEliminar}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Text style={styles.btnEliminarText}>Eliminar</Text>
                </TouchableOpacity>
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

            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>3. Sofia</Text>
                <Text style={styles.memberStatusPending}>Pendiente de elegir función</Text>
              </View>
              <View style={styles.badgePending}>
                <Text style={styles.badgePendingText}>Por hacer</Text>
              </View>
            </View>

            <View style={styles.memberRow}>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>4. Isabel</Text>
                <Text style={styles.memberStatusPending}>Pendiente de elegir función</Text>
              </View>
              <View style={styles.badgePending}>
                <Text style={styles.badgePendingText}>Por hacer</Text>
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
