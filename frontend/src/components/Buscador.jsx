export default function Buscador({ valor, onCambiar }) {
  return (
    <div className="buscador">
      <label htmlFor="busqueda" className="visualmente-oculto">Buscar por nombre</label>
      <input
        id="busqueda"
        type="search"
        placeholder="Buscar por nombre o apellido"
        value={valor}
        onChange={(e) => onCambiar(e.target.value)}
      />
      {valor && (
        <button type="button" className="buscador__limpiar" onClick={() => onCambiar('')}>
          Limpiar
        </button>
      )}
    </div>
  );
}
