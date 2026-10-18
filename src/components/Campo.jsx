// Envoltorio reutilizable para cada campo: etiqueta, control, ayuda y mensaje de error.
function Campo({ id, etiqueta, error, ayuda, className = '', children }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="form-label">
        {etiqueta} <span className="obligatorio" aria-hidden="true">*</span>
      </label>
      {children}
      {ayuda && (
        <div id={`${id}-ayuda`} className="form-text">
          {ayuda}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} className="invalid-feedback d-block">
          <i className="bi bi-exclamation-circle me-1" aria-hidden="true" />
          {error}
        </div>
      )}
    </div>
  )
}

export default Campo
