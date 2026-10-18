import { useEffect, useState } from 'react'

const ENLACES = [
  { id: 'servicios', texto: 'Sesiones' },
  { id: 'registro', texto: 'Inscripción' },
]

function Navbar() {
  // Estado del menú en móviles: React controla la clase "show" del collapse de Bootstrap.
  const [menuAbierto, setMenuAbierto] = useState(false)
  // Sección visible en pantalla, para resaltar el enlace activo.
  const [seccionActiva, setSeccionActiva] = useState('inicio')

  useEffect(() => {
    const secciones = ['inicio', ...ENLACES.map((enlace) => enlace.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setSeccionActiva(entrada.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    secciones.forEach((seccion) => observador.observe(seccion))
    return () => observador.disconnect()
  }, [])

  const alternarMenu = () => setMenuAbierto((abierto) => !abierto)
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-taller sticky-top" aria-label="Navegación principal">
      <div className="container">
        <a className="navbar-brand marca" href="#inicio" onClick={cerrarMenu}>
          <span className="marca-simbolo" aria-hidden="true">&lt;/&gt;</span>
          Taller Web
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="menu-principal"
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={alternarMenu}
        >
          <i className={`bi ${menuAbierto ? 'bi-x-lg' : 'bi-list'}`} aria-hidden="true" />
        </button>

        <div id="menu-principal" className={`collapse navbar-collapse${menuAbierto ? ' show' : ''}`}>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {ENLACES.map((enlace) => {
              const activo = seccionActiva === enlace.id
              return (
                <li className="nav-item" key={enlace.id}>
                  <a
                    className={`nav-link${activo ? ' active' : ''}`}
                    aria-current={activo ? 'location' : undefined}
                    href={`#${enlace.id}`}
                    onClick={cerrarMenu}
                  >
                    {enlace.texto}
                  </a>
                </li>
              )
            })}
            <li className="nav-item mt-2 mb-3 my-lg-0 ms-lg-3">
              <a className="btn btn-taller" href="#registro" onClick={cerrarMenu}>
                Inscribirme
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
