// Capa de acceso a la API REST de Spring Boot
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api/estudiantes';

async function solicitud(url, opciones = {}) {
  let respuesta;
  try {
    respuesta = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...opciones,
    });
  } catch {
    throw new Error(
      'No se pudo conectar con el servidor. Comprueba que la API de Spring Boot esté en ejecución en el puerto 8080.'
    );
  }

  if (!respuesta.ok) {
    let mensaje = `El servidor respondió con un error (${respuesta.status}).`;
    try {
      const cuerpo = await respuesta.json();
      if (cuerpo.mensaje) mensaje = cuerpo.mensaje;
      if (cuerpo.errores) mensaje += ': ' + Object.values(cuerpo.errores).join(', ');
    } catch {
      // La respuesta no traía JSON; se mantiene el mensaje genérico
    }
    throw new Error(mensaje);
  }

  // 204 No Content (por ejemplo, al eliminar)
  if (respuesta.status === 204) return null;
  return respuesta.json();
}

export const obtenerEstudiantes = () => solicitud(BASE_URL);

export const crearEstudiante = (estudiante) =>
  solicitud(BASE_URL, { method: 'POST', body: JSON.stringify(estudiante) });

export const actualizarEstudiante = (id, estudiante) =>
  solicitud(`${BASE_URL}/${id}`, { method: 'PUT', body: JSON.stringify(estudiante) });

export const eliminarEstudiante = (id) =>
  solicitud(`${BASE_URL}/${id}`, { method: 'DELETE' });
