const formulario = document.getElementById("formulario");
const inputs = {
  nombre: document.getElementById("nombre"),
  password: document.getElementById("password"),
};
const errores = {
  nombre: document.getElementById("error-nombre"),
  password: document.getElementById("error-password"),
};

const regexNombreApellido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ¨üÜ\s]{1,20}$/;
const regexPassword = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9·$%&/().]{8,16}$/;

const validarCampoTexto = (valor, campo) => {
  valor = valor.trim();
  if (!valor) return `El ${campo} es obligatorio.`;
  if (valor.length > 20) {
    return `El ${campo} no puede tener más de 20 caracteres.`;
  }
  if (!regexNombreApellido.test(valor)) {
    return `${campo} inválido.`;
  }
  return "";
};

const validarPassword = () => {
  const valor = inputs.password.value.trim();
  if (!valor) return "La contraseña es obligatoria.";
  if (!regexPassword.test(valor)) return "La contraseña debe tener entre 8 y 16 caracteres y solo puede contener letras, números y los caracteres ·$%&/().";
  return "";
};


const validaciones = {
  nombre: () => validarCampoTexto(inputs.nombre.value, "nombre"),
  password: validarPassword,
};

const mostrarError = (campo, mensaje) => {
  errores[campo].textContent = mensaje;
  errores[campo].style.display = "block";
};

const validarCampo = (campo) => {
  const mensajeError = validaciones[campo]();
  mostrarError(campo, mensajeError);
  return !mensajeError;
};

const validarFormulario = () => {
  let esValido = true;
  for (let campo in validaciones) {
    if (!validarCampo(campo)) esValido = false;
  }
  return esValido;
};

for (let campo in inputs) {
  inputs[campo].addEventListener("blur", () => validarCampo(campo));
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validarFormulario()) {
    location.assign("./main.html")
  } else {
    alert("Por favor, corrige los errores antes de enviar.");
  }
});

document.getElementById("limpiar").addEventListener("click", () => {
    formulario.reset();
    for (let campo in errores) {
      mostrarError(campo, "");
    }
  });
