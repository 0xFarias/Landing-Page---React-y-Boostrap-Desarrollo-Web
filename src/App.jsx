import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Formulario from './components/Formulario'
import Footer from './components/Footer'

function App() {
  // Inscripciones guardadas en memoria durante la sesión (se pierden al recargar).
  const [registros, setRegistros] = useState([])

  const agregarRegistro = (registro) => {
    setRegistros((anteriores) => [...anteriores, registro])
  }

  const eliminarRegistro = (id) => {
    setRegistros((anteriores) => anteriores.filter((registro) => registro.id !== id))
  }

  return (
    <>
      <a className="visually-hidden-focusable enlace-saltar" href="#contenido">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Servicios />
        <Formulario registros={registros} onRegistrar={agregarRegistro} onEliminar={eliminarRegistro} />
      </main>
      <Footer />
    </>
  )
}

export default App
