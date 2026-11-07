export default function ItemEstudiante({ estudiante, seleccionado, deshabilitado, onEditar, onEliminar }) {
  const { nombre, apellido, email, carrera, edad } = estudiante;
  const iniciales = `${nombre[0] ?? ''}${apellido[0] ?? ''}`.toUpperCase();

  return (
    <li className={seleccionado ? 'item item--seleccionado' : 'item'}>
      <span className="item__iniciales" aria-hidden="true">{iniciales}</span>
      <div className="item__datos">
        <p className="item__nombre">{nombre} {apellido}</p>
        <p className="item__detalle">{carrera}, {edad} años</p>
        <p className="item__correo">{email}</p>
      </div>
      <div className="item__acciones">
        <button type="button" className="boton boton--texto" onClick={() => onEditar(estudiante)} disabled={deshabilitado}>
          Editar
        </button>
        <button type="button" className="boton boton--peligro" onClick={() => onEliminar(estudiante)} disabled={deshabilitado}>
          Eliminar
        </button>
      </div>
    </li>
  );
}
