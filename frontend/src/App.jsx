import { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import * as api from './api/estudiantesApi';
import { ACCIONES, estudiantesReducer } from './reducers/estudiantesReducer';
import FormularioEstudiante from './components/FormularioEstudiante';
import ListaEstudiantes from './components/ListaEstudiantes';
import Buscador from './components/Buscador';
import Contador from './components/Contador';
import EstadoSolicitud from './components/EstadoSolicitud';

export default function App() {
  // Lista de estudiantes: agregar, editar y eliminar pasan por el reducer
  const [estudiantes, dispatch] = useReducer(estudiantesReducer, []);

  // Estados de la interfaz
  const [busqueda, setBusqueda] = useState('');
  const [estudianteEditando, setEstudianteEditando] = useState(null);

  // Estados de las solicitudes HTTP
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

  const cargarEstudiantes = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await api.obtenerEstudiantes();
      dispatch({ type: ACCIONES.CARGAR, payload: datos });
    } catch (e) {
      setError(e.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarEstudiantes();
  }, [cargarEstudiantes]);

  // El mensaje de éxito desaparece solo después de unos segundos
  useEffect(() => {
    if (!exito) return;
    const temporizador = setTimeout(() => setExito(null), 3000);
    return () => clearTimeout(temporizador);
  }, [exito]);

  // Envuelve cualquier operación con el manejo de carga, error y éxito
  async function ejecutar(operacion, mensajeExito) {
    setGuardando(true);
    setError(null);
    setExito(null);
    try {
      await operacion();
      setExito(mensajeExito);
      return true;
    } catch (e) {
      setError(e.message);
      return false;
    } finally {
      setGuardando(false);
    }
  }

  function manejarGuardar(datos) {
    if (estudianteEditando) {
      return ejecutar(async () => {
        const actualizado = await api.actualizarEstudiante(estudianteEditando.id, datos);
        dispatch({ type: ACCIONES.ACTUALIZAR, payload: actualizado });
        setEstudianteEditando(null);
      }, 'Estudiante actualizado.');
    }
    return ejecutar(async () => {
      const nuevo = await api.crearEstudiante(datos);
      dispatch({ type: ACCIONES.AGREGAR, payload: nuevo });
    }, 'Estudiante registrado.');
  }

  function manejarEliminar(estudiante) {
    const confirmado = window.confirm(
      `¿Eliminar a ${estudiante.nombre} ${estudiante.apellido}? Esta acción no se puede deshacer.`
    );
    if (!confirmado) return;
    ejecutar(async () => {
      await api.eliminarEstudiante(estudiante.id);
      dispatch({ type: ACCIONES.ELIMINAR, payload: estudiante.id });
      if (estudianteEditando?.id === estudiante.id) setEstudianteEditando(null);
    }, 'Estudiante eliminado.');
  }

  // Buscador dinámico: filtra mientras se escribe
  const estudiantesFiltrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return estudiantes;
    return estudiantes.filter((e) =>
      `${e.nombre} ${e.apellido}`.toLowerCase().includes(texto)
    );
  }, [estudiantes, busqueda]);

  return (
    <div className="app">
      <header className="cabecera">
        <div>
          <h1>Registro de estudiantes</h1>
          <p className="cabecera__texto">Registra, busca, edita y retira estudiantes del curso.</p>
        </div>
        <Contador total={estudiantes.length} visibles={estudiantesFiltrados.length} filtrando={busqueda.trim() !== ''} />
      </header>

      <EstadoSolicitud
        error={error}
        exito={exito}
        onReintentar={estudiantes.length === 0 ? cargarEstudiantes : null}
        onCerrarError={() => setError(null)}
      />

      <main className="contenido">
        <section className="panel panel--formulario" aria-labelledby="titulo-formulario">
          <FormularioEstudiante
            estudianteEditando={estudianteEditando}
            onGuardar={manejarGuardar}
            onCancelar={() => setEstudianteEditando(null)}
            guardando={guardando}
          />
        </section>

        <section className="panel panel--lista" aria-labelledby="titulo-lista">
          <h2 id="titulo-lista">Estudiantes</h2>
          <Buscador valor={busqueda} onCambiar={setBusqueda} />
          <ListaEstudiantes
            estudiantes={estudiantesFiltrados}
            hayRegistros={estudiantes.length > 0}
            busqueda={busqueda}
            cargando={cargando}
            guardando={guardando}
            idEditando={estudianteEditando?.id}
            onEditar={setEstudianteEditando}
            onEliminar={manejarEliminar}
          />
        </section>
      </main>
    </div>
  );
}
