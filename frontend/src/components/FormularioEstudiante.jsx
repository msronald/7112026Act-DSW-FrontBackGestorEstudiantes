import { useEffect, useState } from 'react';

const VACIO = { nombre: '', apellido: '', email: '', carrera: '', edad: '' };

function validar(datos) {
  const errores = {};
  if (!datos.nombre.trim()) errores.nombre = 'Escribe el nombre.';
  if (!datos.apellido.trim()) errores.apellido = 'Escribe el apellido.';
  if (!datos.email.trim()) errores.email = 'Escribe el correo.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim()))
    errores.email = 'Usa un correo con formato nombre@dominio.com.';
  if (!datos.carrera.trim()) errores.carrera = 'Escribe la carrera.';
  const edad = Number(datos.edad);
  if (datos.edad === '') errores.edad = 'Escribe la edad.';
  else if (!Number.isInteger(edad) || edad < 15 || edad > 100)
    errores.edad = 'La edad debe ser un número entre 15 y 100.';
  return errores;
}

export default function FormularioEstudiante({ estudianteEditando, onGuardar, onCancelar, guardando }) {
  // Formulario controlado: cada campo vive en el estado
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const editando = Boolean(estudianteEditando);

  // Al elegir un estudiante para editar, se rellenan los campos
  useEffect(() => {
    if (estudianteEditando) {
      const { nombre, apellido, email, carrera, edad } = estudianteEditando;
      setDatos({ nombre, apellido, email, carrera, edad: String(edad) });
    } else {
      setDatos(VACIO);
    }
    setErrores({});
  }, [estudianteEditando]);

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setDatos((previo) => ({ ...previo, [name]: value }));
    if (errores[name]) setErrores((previo) => ({ ...previo, [name]: undefined }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    const encontrados = validar(datos);
    if (Object.keys(encontrados).length > 0) {
      setErrores(encontrados);
      return;
    }
    const ok = await onGuardar({
      nombre: datos.nombre.trim(),
      apellido: datos.apellido.trim(),
      email: datos.email.trim(),
      carrera: datos.carrera.trim(),
      edad: Number(datos.edad),
    });
    if (ok && !editando) setDatos(VACIO);
  }

  const campo = (name, etiqueta, tipo = 'text', extra = {}) => (
    <div className={`campo${errores[name] ? ' campo--error' : ''}`}>
      <label htmlFor={name}>{etiqueta}</label>
      <input
        id={name}
        name={name}
        type={tipo}
        value={datos[name]}
        onChange={manejarCambio}
        aria-invalid={Boolean(errores[name])}
        aria-describedby={errores[name] ? `${name}-error` : undefined}
        {...extra}
      />
      {errores[name] && (
        <span id={`${name}-error`} className="campo__error">{errores[name]}</span>
      )}
    </div>
  );

  return (
    <form onSubmit={manejarEnvio} noValidate className={editando ? 'formulario formulario--edicion' : 'formulario'}>
      <h2 id="titulo-formulario">
        {editando ? `Editar a ${estudianteEditando.nombre}` : 'Nuevo estudiante'}
      </h2>

      <div className="formulario__fila">
        {campo('nombre', 'Nombre', 'text', { autoComplete: 'given-name' })}
        {campo('apellido', 'Apellido', 'text', { autoComplete: 'family-name' })}
      </div>
      {campo('email', 'Correo', 'email', { autoComplete: 'email' })}
      <div className="formulario__fila">
        {campo('carrera', 'Carrera')}
        {campo('edad', 'Edad', 'number', { min: 15, max: 100, inputMode: 'numeric' })}
      </div>

      <div className="formulario__acciones">
        <button type="submit" className="boton boton--principal" disabled={guardando}>
          {guardando ? 'Guardando…' : editando ? 'Guardar cambios' : 'Registrar estudiante'}
        </button>
        {editando && (
          <button type="button" className="boton boton--secundario" onClick={onCancelar} disabled={guardando}>
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}
