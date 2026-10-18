import { PERFILES } from '../data/contenido'

const ETIQUETA_PERFIL = Object.fromEntries(PERFILES.map((perfil) => [perfil.valor, perfil.etiqueta]))

function TablaRegistros({ registros, onEliminar }) {
  return (
    <div className="tabla-registros">
      <div className="d-flex align-items-center gap-2 mb-3">
        <h3 id="registros-titulo" className="subtitulo-seccion mb-0">
          Inscripciones de esta sesión
        </h3>
        <span className="badge rounded-pill text-bg-primary" aria-label={`${registros.length} inscripciones`}>
          {registros.length}
        </span>
      </div>

      {registros.length === 0 ? (
        <p className="text-body-secondary mb-0">
          Todavía no hay inscripciones. Cuando completes el formulario, la primera aparecerá aquí.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0" aria-labelledby="registros-titulo">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Edad</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Perfil</th>
                <th scope="col">
                  <span className="visually-hidden">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, indice) => (
                <tr key={registro.id}>
                  <td>{indice + 1}</td>
                  <td className="fw-bold">{registro.nombre}</td>
                  <td>{registro.correo}</td>
                  <td>{registro.edad}</td>
                  <td className="text-nowrap">{registro.telefono}</td>
                  <td>{ETIQUETA_PERFIL[registro.perfil]}</td>
                  <td className="text-end">
                    <button
                      type="button"
                      className="btn btn-sm btn-quitar"
                      onClick={() => onEliminar(registro.id)}
                      aria-label={`Quitar la inscripción de ${registro.nombre}`}
                    >
                      <i className="bi bi-trash3 me-1" aria-hidden="true" />
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TablaRegistros
