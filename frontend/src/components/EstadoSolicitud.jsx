export default function EstadoSolicitud({ error, exito, onReintentar, onCerrarError }) {
  if (!error && !exito) return null;

  if (error) {
    return (
      <div className="aviso aviso--error" role="alert">
        <p>{error}</p>
        <div className="aviso__acciones">
          {onReintentar && (
            <button type="button" className="boton boton--texto" onClick={onReintentar}>Reintentar</button>
          )}
          <button type="button" className="boton boton--texto" onClick={onCerrarError}>Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="aviso aviso--exito" role="status">
      <p>{exito}</p>
    </div>
  );
}
