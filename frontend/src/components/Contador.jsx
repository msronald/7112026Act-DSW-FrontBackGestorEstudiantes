export default function Contador({ total, visibles, filtrando }) {
  return (
    <div className="contador" aria-live="polite">
      <span className="contador__numero">{total}</span>
      <span className="contador__texto">
        {total === 1 ? 'estudiante registrado' : 'estudiantes registrados'}
        {filtrando && (
          <span className="contador__filtro">
            {visibles} {visibles === 1 ? 'coincide' : 'coinciden'} con la búsqueda
          </span>
        )}
      </span>
    </div>
  );
}
