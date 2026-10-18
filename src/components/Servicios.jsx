import { SESIONES } from '../data/contenido'

function Servicios() {
  return (
    <section id="servicios" className="seccion seccion-clara" aria-labelledby="servicios-titulo">
      <div className="container">
        <div className="row mb-4 mb-lg-5">
          <div className="col-lg-8">
            <h2 id="servicios-titulo" className="titulo-seccion">
              Qué aprenderás en cada sesión
            </h2>
            <p className="texto-seccion">
              Cada sesión suma una capa al mismo proyecto: empiezas con la estructura de la página y terminas
              con una landing page completa y responsiva.
            </p>
          </div>
        </div>

        <ol className="row g-4 list-unstyled mb-0">
          {SESIONES.map((sesion) => (
            <li className="col-md-6 col-xl-3" key={sesion.numero}>
              <article className="sesion h-100">
                <div className="d-flex align-items-start justify-content-between mb-3">
                  <span className="sesion-numero">
                    <span className="visually-hidden">Sesión </span>
                    {sesion.numero}
                  </span>
                  <i className={`bi ${sesion.icono} sesion-icono`} aria-hidden="true" />
                </div>
                <h3 className="sesion-titulo">{sesion.titulo}</h3>
                <p>{sesion.descripcion}</p>
                <ul className="list-unstyled d-flex flex-wrap gap-2 mb-0" aria-label="Temas">
                  {sesion.temas.map((tema) => (
                    <li key={tema} className="badge badge-tema">
                      {tema}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Servicios
