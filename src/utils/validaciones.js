// Reglas de validación del formulario de inscripción.
// Parten de las validaciones de la Guía 1 y agregan mejoras (marcadas con "Mejora").

export const CAMPOS_INICIALES = {
  nombre: '',
  correo: '',
  contrasena: '',
  edad: '',
  telefono: '',
  perfil: '',
}

// Orden en que aparecen los campos; sirve para enfocar el primer campo con error.
export const ORDEN_CAMPOS = Object.keys(CAMPOS_INICIALES)

export const LIMITES = {
  nombreMin: 2,
  nombreMax: 60,
  contrasenaMin: 8,
  edadMin: 1,
  edadMax: 120,
  telefonoMinDigitos: 7,
  telefonoMaxDigitos: 15,
}

// Mejora: solo letras (con tildes y ñ) separadas por un espacio, apóstrofo o guion.
const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ '-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/
// Mejora: exige un dominio con extensión (nombre@dominio.com), no solo "a@b".
const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/
// Igual que la Guía 1: dígitos, espacios, paréntesis, puntos o guiones; el + solo al inicio.
const REGEX_TELEFONO = /^\+?[0-9\s().-]+$/

export function normalizarEspacios(texto) {
  return texto.trim().replace(/\s+/g, ' ')
}

function validarNombre(valor) {
  const nombre = normalizarEspacios(valor)
  if (!nombre) return 'Escribe tu nombre completo.'
  if (nombre.length < LIMITES.nombreMin) return `Escribe al menos ${LIMITES.nombreMin} caracteres.`
  if (nombre.length > LIMITES.nombreMax) return `El nombre no puede superar ${LIMITES.nombreMax} caracteres.`
  if (!REGEX_NOMBRE.test(nombre)) return 'Usa solo letras y espacios. Se permiten tildes, ñ, apóstrofos y guiones.'
  return ''
}

function validarCorreo(valor, registros) {
  const correo = valor.trim().toLowerCase()
  if (!correo) return 'Escribe tu correo electrónico.'
  if (!REGEX_CORREO.test(correo)) return 'Escribe un correo válido, por ejemplo nombre@dominio.com.'
  // Mejora: evita inscripciones repetidas durante la sesión.
  if (registros.some((registro) => registro.correo === correo)) {
    return 'Este correo ya tiene una inscripción en esta sesión.'
  }
  return ''
}

function validarContrasena(valor) {
  if (!valor) return 'Crea una contraseña.'
  if (valor.length < LIMITES.contrasenaMin) {
    return `La contraseña debe tener al menos ${LIMITES.contrasenaMin} caracteres.`
  }
  // Mejora: la contraseña debe combinar letras y números.
  if (!/[A-Za-z]/.test(valor) || !/\d/.test(valor)) return 'Combina letras y números en la contraseña.'
  return ''
}

function validarEdad(valor) {
  const edad = String(valor).trim()
  if (!edad) return 'Escribe tu edad.'
  if (!/^\d+$/.test(edad)) return 'Escribe la edad en números enteros, sin decimales ni signos.'
  const numero = Number(edad)
  if (numero < LIMITES.edadMin) return `La edad mínima es ${LIMITES.edadMin}.`
  if (numero > LIMITES.edadMax) return `La edad máxima es ${LIMITES.edadMax}.`
  return ''
}

function validarTelefono(valor) {
  const telefono = valor.trim()
  if (!telefono) return 'Escribe un número de teléfono.'
  if (!REGEX_TELEFONO.test(telefono)) {
    return 'Revisa el formato. Usa dígitos, espacios, paréntesis, puntos o guiones; el signo + va al inicio.'
  }
  const digitos = telefono.replace(/\D/g, '').length
  if (digitos < LIMITES.telefonoMinDigitos || digitos > LIMITES.telefonoMaxDigitos) {
    return `Escribe un teléfono con entre ${LIMITES.telefonoMinDigitos} y ${LIMITES.telefonoMaxDigitos} dígitos.`
  }
  return ''
}

function validarPerfil(valor) {
  return valor ? '' : 'Selecciona tu perfil.'
}

// Devuelve el mensaje de error del campo, o "" si es válido.
export function validarCampo(campo, valor, registros = []) {
  switch (campo) {
    case 'nombre':
      return validarNombre(valor)
    case 'correo':
      return validarCorreo(valor, registros)
    case 'contrasena':
      return validarContrasena(valor)
    case 'edad':
      return validarEdad(valor)
    case 'telefono':
      return validarTelefono(valor)
    case 'perfil':
      return validarPerfil(valor)
    default:
      return ''
  }
}

// Valida todos los campos y devuelve un objeto { campo: mensaje }.
export function validarFormulario(datos, registros = []) {
  return Object.fromEntries(ORDEN_CAMPOS.map((campo) => [campo, validarCampo(campo, datos[campo], registros)]))
}

// Mejora: indicador de seguridad de la contraseña.
export function evaluarContrasena(valor) {
  const cumpleMinimo = valor.length >= LIMITES.contrasenaMin && /[A-Za-z]/.test(valor) && /\d/.test(valor)
  if (!cumpleMinimo) return { etiqueta: 'Débil', porcentaje: 33, clase: 'bg-danger' }

  const extras = [valor.length >= 12, /[a-z]/.test(valor) && /[A-Z]/.test(valor), /[^A-Za-z0-9]/.test(valor)]
  const puntos = extras.filter(Boolean).length
  if (puntos >= 2) return { etiqueta: 'Fuerte', porcentaje: 100, clase: 'bg-success' }
  return { etiqueta: 'Media', porcentaje: 66, clase: 'bg-warning' }
}

// Crea el registro que se guarda en el estado. La contraseña no se conserva.
export function crearRegistro(datos) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    nombre: normalizarEspacios(datos.nombre),
    correo: datos.correo.trim().toLowerCase(),
    edad: Number(datos.edad),
    telefono: normalizarEspacios(datos.telefono),
    perfil: datos.perfil,
  }
}
