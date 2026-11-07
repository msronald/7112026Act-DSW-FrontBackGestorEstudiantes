// Reducer que centraliza las operaciones sobre la lista de estudiantes
export const ACCIONES = {
  CARGAR: 'CARGAR',
  AGREGAR: 'AGREGAR',
  ACTUALIZAR: 'ACTUALIZAR',
  ELIMINAR: 'ELIMINAR',
};

export function estudiantesReducer(estado, accion) {
  switch (accion.type) {
    case ACCIONES.CARGAR:
      return accion.payload;
    case ACCIONES.AGREGAR:
      return [...estado, accion.payload];
    case ACCIONES.ACTUALIZAR:
      return estado.map((e) => (e.id === accion.payload.id ? accion.payload : e));
    case ACCIONES.ELIMINAR:
      return estado.filter((e) => e.id !== accion.payload);
    default:
      throw new Error(`Acción desconocida: ${accion.type}`);
  }
}
