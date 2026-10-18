// Se calcula una vez al cargar el módulo, fuera del render.
const ANIO_ACTUAL = new Date().getFullYear()

function Footer() {
  return (
    <footer className="footer-taller">
      <div className="container">
        <div className="row gy-4 align-items-start">
          <div className="col-md-7">
            <a className="marca marca-footer" href="#inicio">
              <span className="marca-simbolo" aria-hidden="true">&lt;/&gt;</span>
              Taller Web
            </a>
            <p className="mt-3 mb-0 footer-texto">
              Proyecto académico de la asignatura Desarrollo Web. Los datos del formulario no salen de tu
              navegador.
            </p>
          </div>
          <nav className="col-md-5" aria-label="Enlaces del pie de página">
            <ul className="list-unstyled d-flex flex-wrap gap-3 justify-content-md-end mb-0">
              <li><a href="#servicios">Sesiones</a></li>
              <li><a href="#registro">Inscripción</a></li>
            </ul>
          </nav>
        </div>
        <p className="footer-legal mb-0">© {ANIO_ACTUAL} Taller de desarrollo web. Hecho con React y Bootstrap.</p>
      </div>
    </footer>
  )
}

export default Footer
