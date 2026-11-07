# Gestión de estudiantes: React + Spring Boot

## Integrantes

- Astuhuaman Vega Max Steven
- Levis Escobedo Eduardo Valentin
- Rouillon Haro Favio
- Tataje Guzman Kenner Alison
- Guzmán Romero Diego Alonso
- Munayco Sirlopu Ronald Alfredo

## Requisitos
- Java 17 o superior y Maven 3.9+
- Node.js 18 o superior

## 1. Levantar la API (backend)
```bash
cd backend
mvn spring-boot:run
```
La API queda en http://localhost:8080/api/estudiantes con tres estudiantes de ejemplo.
Usa una base de datos H2 en memoria (consola en http://localhost:8080/h2-console,
JDBC URL `jdbc:h2:mem:estudiantesdb`, usuario `sa`, sin contraseña).

| Método | Ruta                          | Acción                              |
|--------|-------------------------------|-------------------------------------|
| GET    | /api/estudiantes              | Listar (opcional `?nombre=texto`)   |
| GET    | /api/estudiantes/{id}         | Obtener uno                         |
| POST   | /api/estudiantes              | Crear                               |
| PUT    | /api/estudiantes/{id}         | Actualizar                          |
| DELETE | /api/estudiantes/{id}         | Eliminar                            |

## 2. Levantar el frontend
```bash
cd frontend
npm install
npm run dev
```
Abre http://localhost:5173. La URL de la API para desarrollo está en `frontend/.env.development`.

## Cómo se cumple cada actividad
1. **useState**: búsqueda, estudiante en edición y estados de la solicitud (`App.jsx`);
   la lista de estudiantes se guarda con useReducer (ver punto 5).
2. **Formularios controlados**: `FormularioEstudiante.jsx` guarda cada campo y sus errores en estado.
3. **Props**: `App` comparte datos y funciones con Formulario, Lista, Buscador, Contador y EstadoSolicitud.
4. **Buscador dinámico**: `Buscador.jsx` + `useMemo` en `App.jsx` filtra mientras se escribe.
5. **useReducer**: `reducers/estudiantesReducer.js` (CARGAR, AGREGAR, ACTUALIZAR, ELIMINAR).
6. **API REST**: `api/estudiantesApi.js` consume el backend de Spring Boot.
7. **Carga / error / éxito**: estados `cargando`, `guardando`, `error`, `exito` y el componente `EstadoSolicitud.jsx`.

## Estructura
```
backend/   Spring Boot (controller, service, repository, model, exception, config)
frontend/  React + Vite (components, reducers, api)
```

## Despliegue en Render

### 1. Backend (Web Service)
- New → Web Service → conecta el repositorio.
- Root Directory: `backend` · Language/Runtime: **Docker** · Instance type: **Free**.
- Variable de entorno `CORS_ORIGEN`: la URL del frontend (se completa en el paso 3).
- Prueba: `https://TU-BACKEND.onrender.com/api/estudiantes` debe devolver JSON.

### 2. Frontend (Static Site)
- New → Static Site → mismo repositorio.
- Root Directory: `frontend`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Variable de entorno `VITE_API_URL`: `https://TU-BACKEND.onrender.com/api/estudiantes`

### 3. Conectar ambos
En el backend, define `CORS_ORIGEN` con la URL del Static Site
(por ejemplo `https://TU-FRONTEND.onrender.com`, sin barra final) y guarda; Render redespliega solo.

Nota: el backend gratuito se apaga tras 15 minutos sin uso y tarda cerca de un minuto en despertar.
Los datos de H2 se reinician en cada arranque.
