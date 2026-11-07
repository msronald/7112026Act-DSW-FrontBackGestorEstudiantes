import ItemEstudiante from './ItemEstudiante';

export default function ListaEstudiantes({
  estudiantes, hayRegistros, busqueda, cargando, guardando, idEditando, onEditar, onEliminar,
}) {
  if (cargando) {
    return <p className="lista__vacia" role="status">
        Cargando estudiantes… Si el servidor estaba inactivo, puede tardar hasta un minuto en responder.
      </p>;
  }
  if (!hayRegistros) {
    return <p className="lista__vacia">Todavía no hay estudiantes. Registra el primero con el formulario.</p>;
  }
  if (estudiantes.length === 0) {
    return <p className="lista__vacia">Ningún estudiante coincide con “{busqueda}”. Prueba con otro nombre.</p>;
  }

  return (
    <ul className="lista">
      {estudiantes.map((estudiante) => (
        <ItemEstudiante
          key={estudiante.id}
          estudiante={estudiante}
          seleccionado={estudiante.id === idEditando}
          deshabilitado={guardando}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      ))}
    </ul>
  );
}
