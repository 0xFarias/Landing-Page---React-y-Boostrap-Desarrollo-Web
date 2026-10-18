// Diccionario en memoria con los últimos datos válidos del formulario.
let datosFormulario = {};

const formulario = document.querySelector("#registro-form");
const campos = [...formulario.querySelectorAll("input, select")];
const mensajeFormulario = document.querySelector("#form-feedback");
const camposTocados = new Set();

function obtenerMensajeError(campo) {
  const valor = campo.value.trim();

  if (campo.validity.valueMissing) return "Este campo es obligatorio.";

  switch (campo.name) {
    case "nombre":
      if (valor.length < 2) return "Escribe al menos 2 caracteres.";
      if (campo.validity.tooLong) return "El nombre no puede superar 60 caracteres.";
      break;
    case "correo":
      if (campo.validity.typeMismatch) return "Escribe un correo con un formato válido.";
      break;
    case "contrasena":
      if (campo.validity.tooShort || valor.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
      break;
    case "edad":
      if (campo.validity.badInput || !Number.isFinite(campo.valueAsNumber)) return "Escribe una edad numérica válida.";
      if (campo.validity.rangeUnderflow || campo.valueAsNumber < 1) return "La edad mínima es 1.";
      if (campo.validity.rangeOverflow || campo.valueAsNumber > 120) return "La edad máxima es 120.";
      if (campo.validity.stepMismatch || !Number.isInteger(campo.valueAsNumber)) return "La edad debe ser un número entero.";
      break;
    case "telefono": {
      const cantidadDigitos = valor.replace(/\D/g, "").length;
      if (campo.validity.patternMismatch) {
        return "Revisa el formato. Usa dígitos, espacios, paréntesis, puntos o guiones; el signo + va al inicio.";
      }
      if (cantidadDigitos < 7 || cantidadDigitos > 15) {
        return "Escribe un teléfono con entre 7 y 15 dígitos.";
      }
      break;
    }
    case "perfil":
      break;
    default:
      if (!campo.validity.valid) return "Revisa este dato.";
  }

  return "";
}

function validarCampo(campo) {
  const error = obtenerMensajeError(campo);
  const salidaError = document.querySelector("#" + campo.id + "-error");

  salidaError.textContent = error;
  campo.setAttribute("aria-invalid", String(Boolean(error)));
  return !error;
}

function mostrarEstado(texto, tipo = "") {
  mensajeFormulario.textContent = texto;
  mensajeFormulario.className = "form-feedback" + (tipo ? " is-" + tipo : "");
}

campos.forEach((campo) => {
  campo.addEventListener("input", () => {
    if (camposTocados.has(campo)) validarCampo(campo);
    mostrarEstado("");
  });

  campo.addEventListener("blur", () => {
    camposTocados.add(campo);
    validarCampo(campo);
  });
});

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  campos.forEach((campo) => camposTocados.add(campo));

  const formularioValido = campos.map(validarCampo).every(Boolean);
  if (!formularioValido) {
    mostrarEstado("Revisa los campos marcados antes de continuar.", "error");
    formulario.querySelector('[aria-invalid="true"]')?.focus();
    return;
  }

  // FormData convierte las entradas en pares clave/valor; Object.fromEntries crea el diccionario.
  datosFormulario = Object.fromEntries(new FormData(formulario).entries());
  datosFormulario.nombre = datosFormulario.nombre.trim();
  datosFormulario.correo = datosFormulario.correo.trim();
  datosFormulario.telefono = datosFormulario.telefono.trim();

  mostrarEstado("Formulario válido. Los datos están disponibles en datosFormulario durante esta sesión.", "success");
  console.info("Diccionario de datos del formulario disponible en memoria.");
});
