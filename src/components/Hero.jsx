// Componentes que forman esta página; se muestran en el bloque de código del hero.
const ESTRUCTURA = ['Navbar', 'Hero', 'Servicios', 'Formulario', 'Footer']

function Hero() {
  return (
    <section id="inicio" className="hero" aria-labelledby="hero-titulo">
      <div className="container">
        <div className="row align-items-center gy-5 gx-lg-5">
          <div className="col-lg-7">
            <p className="hero-kicker">Taller de desarrollo web</p>
            <h1 id="hero-titulo" className="hero-titulo">
              De HTML a React en cuatro sesiones
            </h1>
            <p className="hero-descripcion">
              Un taller práctico para estudiantes y docentes: estructura con HTML5, da estilo con CSS y
              Bootstrap, agrega lógica con JavaScript y organiza todo en componentes de React.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <a href="#registro" className="btn btn-taller btn-lg">
                Inscribirme
              </a>
              <a href="#servicios" className="btn btn-outline-light btn-lg">
                Ver las sesiones
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <figure className="codigo-tile mb-0">
              <pre className="codigo" aria-label="Código JSX del componente App">
                <code>
                  <span className="codigo-etiqueta">&lt;App&gt;</span>
                  {'\n'}
                  {ESTRUCTURA.map((componente) => (
                    <span key={componente}>
                      {'  '}
                      <span className="codigo-etiqueta">&lt;{componente} /&gt;</span>
                      {'\n'}
                    </span>
                  ))}
                  <span className="codigo-etiqueta">&lt;/App&gt;</span>
                </code>
              </pre>
              <figcaption>Así está construida esta misma página: un componente de React por sección.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
