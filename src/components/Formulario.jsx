import { useRef, useState } from 'react'
import Campo from './Campo'
import TablaRegistros from './TablaRegistros'
import { PERFILES } from '../data/contenido'
import {
  CAMPOS_INICIALES,
  LIMITES,
  ORDEN_CAMPOS,
  crearRegistro,
  evaluarContrasena,
  validarCampo,
  validarFormulario,
} from '../utils/validaciones'

const AYUDAS = {
  contrasena: 'Mínimo 8 caracteres, combinando letras y números.',
  telefono: 'Entre 7 y 15 dígitos. Puedes usar un + inicial, espacios, paréntesis, puntos o guiones.',
}

const ESTADO_VACIO = { tipo: '', mensaje: '' }

// Construye aria-describedby solo con los textos de ayuda/error que existen.
function describirCampo(id, ayuda, error) {
  const ids = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean)
  return ids.length ? ids.join(' ') : undefined
}

function Formulario({ registros, onRegistrar, onEliminar }) {
  // useState: datos del formulario, errores por campo, campos visitados y mensaje general.
  const [datos, setDatos] = useState(CAMPOS_INICIALES)
  const [errores, setErrores] = useState({})
  const [tocados, setTocados] = useState({})
  const [estado, setEstado] = useState(ESTADO_VACIO)
  const [verContrasena, setVerContrasena] = useState(false)
  const formularioRef = useRef(null)

  const seguridad = datos.contrasena ? evaluarContrasena(datos.contrasena) : null
  const ayudaNombre = `${datos.nombre.length}/${LIMITES.nombreMax} caracteres.`

  // Evento onChange: actualiza el estado y revalida si el campo ya fue visitado.
  const manejarCambio = (evento) => {
    const { name, value, tagName } = evento.target
    setDatos((anteriores) => ({ ...anteriores, [name]: value }))

    if (tocados[name] || tagName === 'SELECT') {
      setTocados((anteriores) => ({ ...anteriores, [name]: true }))
      setErrores((anteriores) => ({ ...anteriores, [name]: validarCampo(name, value, registros) }))
    }
    if (estado.mensaje) setEstado(ESTADO_VACIO)
  }

  // Evento onBlur: al salir de un campo se marca como visitado y se valida.
  const manejarSalida = (evento) => {
    const { name, value } = evento.target
    setTocados((anteriores) => ({ ...anteriores, [name]: true }))
    setErrores((anteriores) => ({ ...anteriores, [name]: validarCampo(name, value, registros) }))
  }

  const reiniciarCampos = () => {
    setDatos(CAMPOS_INICIALES)
    setErrores({})
    setTocados({})
    setVerContrasena(false)
  }

  // Evento onSubmit: valida todo, muestra el resultado y guarda la inscripción.
  const manejarEnvio = (evento) => {
    evento.preventDefault()

    const nuevosErrores = validarFormulario(datos, registros)
    const camposConError = ORDEN_CAMPOS.filter((campo) => nuevosErrores[campo])
    setErrores(nuevosErrores)
    setTocados(Object.fromEntries(ORDEN_CAMPOS.map((campo) => [campo, true])))

    if (camposConError.length > 0) {
      const cantidad = camposConError.length
      setEstado({
        tipo: 'error',
        mensaje:
          cantidad === 1
            ? 'Revisa el campo marcado antes de enviar la inscripción.'
            : `Revisa los ${cantidad} campos marcados antes de enviar la inscripción.`,
      })
      formularioRef.current.elements.namedItem(camposConError[0])?.focus()
      return
    }

    const registro = crearRegistro(datos)
    onRegistrar(registro)
    setEstado({
      tipo: 'exito',
      mensaje: `Listo, ${registro.nombre.split(' ')[0]}: tu inscripción quedó registrada. La verás en la tabla de inscripciones de esta sesión.`,
    })
    reiniciarCampos()
  }

  // Evento onClick del botón "Limpiar formulario".
  const manejarLimpiar = () => {
    reiniciarCampos()
    setEstado(ESTADO_VACIO)
  }

  // Clases de Bootstrap según el estado del campo: is-invalid o is-valid.
  const claseControl = (campo, base = 'form-control') => {
    if (!tocados[campo]) return base
    if (errores[campo]) return `${base} is-invalid`
    return datos[campo] !== '' ? `${base} is-valid` : base
  }

  // Propiedades comunes de cada control.
  const propsControl = (campo, ayuda) => ({
    id: campo,
    name: campo,
    value: datos[campo],
    onChange: manejarCambio,
    onBlur: manejarSalida,
    required: true,
    'aria-invalid': tocados[campo] && errores[campo] ? true : undefined,
    'aria-describedby': describirCampo(campo, ayuda, tocados[campo] && errores[campo]),
  })

  const errorDe = (campo) => (tocados[campo] ? errores[campo] : '')

  return (
    <section id="registro" className="seccion seccion-registro" aria-labelledby="registro-titulo">
      <div className="container">
        <div className="row gy-5 gx-lg-5">
          <div className="col-lg-4">
            <h2 id="registro-titulo" className="titulo-seccion">
              Reserva tu cupo
            </h2>
            <p className="texto-seccion">
              Completa el formulario para inscribirte en el taller. Te pedimos solo lo necesario para organizar
              los grupos de trabajo.
            </p>
            <p className="nota-privacidad">
              <i className="bi bi-shield-lock" aria-hidden="true" />
              <span>
                Los datos solo existen en la memoria de esta página: no se envían a un servidor y se borran al
                recargarla. Usa datos de prueba.
              </span>
            </p>
          </div>

          <div className="col-lg-8">
            <div className="panel-formulario">
              <div className="encabezado-formulario">
                <h3 className="subtitulo-seccion mb-0">Datos del participante</h3>
                <p className="mb-0 small text-body-secondary">
                  <span className="obligatorio" aria-hidden="true">*</span> Campo obligatorio
                </p>
              </div>

              <form ref={formularioRef} onSubmit={manejarEnvio} noValidate>
                <div className="row g-3 g-md-4">
                  <Campo id="nombre" etiqueta="Nombre completo" ayuda={ayudaNombre} error={errorDe('nombre')} className="col-md-6">
                    <input
                      {...propsControl('nombre', ayudaNombre)}
                      type="text"
                      className={claseControl('nombre')}
                      autoComplete="name"
                      placeholder="Ej.: Alex Rivera"
                      maxLength={LIMITES.nombreMax}
                    />
                  </Campo>

                  <Campo id="correo" etiqueta="Correo electrónico" error={errorDe('correo')} className="col-md-6">
                    <input
                      {...propsControl('correo')}
                      type="email"
                      className={claseControl('correo')}
                      autoComplete="email"
                      inputMode="email"
                      placeholder="nombre@ejemplo.com"
                    />
                  </Campo>

                  <Campo id="contrasena" etiqueta="Contraseña" ayuda={AYUDAS.contrasena} error={errorDe('contrasena')} className="col-md-6">
                    <div className="input-group">
                      <input
                        {...propsControl('contrasena', AYUDAS.contrasena)}
                        type={verContrasena ? 'text' : 'password'}
                        className={claseControl('contrasena')}
                        autoComplete="new-password"
                        placeholder="Mínimo 8 caracteres"
                      />
                      <button
                        type="button"
                        className="btn btn-ver-contrasena"
                        onClick={() => setVerContrasena((visible) => !visible)}
                        aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        aria-pressed={verContrasena}
                      >
                        <i className={`bi ${verContrasena ? 'bi-eye-slash' : 'bi-eye'}`} aria-hidden="true" />
                      </button>
                    </div>
                    {seguridad && (
                      <div className="seguridad mt-2" aria-live="polite">
                        <div
                          className="progress"
                          role="progressbar"
                          aria-label="Seguridad de la contraseña"
                          aria-valuenow={seguridad.porcentaje}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div className={`progress-bar ${seguridad.clase}`} style={{ width: `${seguridad.porcentaje}%` }} />
                        </div>
                        <span className="small">Seguridad: {seguridad.etiqueta}</span>
                      </div>
                    )}
                  </Campo>

                  <Campo id="edad" etiqueta="Edad" error={errorDe('edad')} className="col-md-6">
                    <input
                      {...propsControl('edad')}
                      type="number"
                      className={claseControl('edad')}
                      inputMode="numeric"
                      placeholder="Ej.: 20"
                      min={LIMITES.edadMin}
                      max={LIMITES.edadMax}
                      step="1"
                    />
                  </Campo>

                  <Campo id="telefono" etiqueta="Teléfono" ayuda={AYUDAS.telefono} error={errorDe('telefono')} className="col-md-6">
                    <input
                      {...propsControl('telefono', AYUDAS.telefono)}
                      type="tel"
                      className={claseControl('telefono')}
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Ej.: 099 123 4567"
                    />
                  </Campo>

                  <Campo id="perfil" etiqueta="Perfil" error={errorDe('perfil')} className="col-md-6">
                    <select {...propsControl('perfil')} className={claseControl('perfil', 'form-select')}>
                      <option value="" disabled>
                        Selecciona una opción
                      </option>
                      {PERFILES.map((perfil) => (
                        <option key={perfil.valor} value={perfil.valor}>
                          {perfil.etiqueta}
                        </option>
                      ))}
                    </select>
                  </Campo>
                </div>

                {/* Mensajes dinámicos de error o éxito */}
                <div aria-live="polite" className="mt-4">
                  {estado.mensaje && (
                    <div
                      className={`alert ${estado.tipo === 'exito' ? 'alert-success' : 'alert-danger'} d-flex align-items-start gap-2 mb-0`}
                      role={estado.tipo === 'exito' ? 'status' : 'alert'}
                    >
                      <i
                        className={`bi ${estado.tipo === 'exito' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} mt-1`}
                        aria-hidden="true"
                      />
                      <span className="flex-grow-1">{estado.mensaje}</span>
                      <button
                        type="button"
                        className="btn-close"
                        aria-label="Cerrar mensaje"
                        onClick={() => setEstado(ESTADO_VACIO)}
                      />
                    </div>
                  )}
                </div>

                <div className="pie-formulario">
                  <button type="button" className="btn btn-outline-taller" onClick={manejarLimpiar}>
                    Limpiar formulario
                  </button>
                  <button type="submit" className="btn btn-taller">
                    Inscribirme
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <TablaRegistros registros={registros} onEliminar={onEliminar} />
      </div>
    </section>
  )
}

export default Formulario
