// Para Comun.js
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Calcular la cantidad total de productos (sumando las cantidades de cada producto)
  const totalProductos = carrito.reduce((total, item) => total + item.cant, 0);

  const numerito = document.getElementById("numerito");
  numerito.textContent = totalProductos;
}

const vaciarCarritoBtn = document.querySelector(".carrito-acciones-vaciar");
const mensajeCarritoVacio = document.getElementById("carrito-vacio");
const mensajeCarritoComprado = document.getElementById("carrito-comprado");
const comprarAhoraBtn = document.querySelector(".carrito-acciones-comprar");

function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoProductos = document.getElementById("carrito-productos");
  carritoProductos.innerHTML = "";

  let total = 0;

  console.log(!carrito.producto)
  if (carrito.producto) {
    mensajeCarritoVacio.style.display = "block";
  }
  carrito.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("carrito-producto");

    divProducto.innerHTML = `
        <img class="carrito-producto-imagen" src="${
          producto.imagen
        }" alt="Imagen producto">
        <div class="carrito-producto-titulo">
          <small>Título</small>
          <h3>${producto.nombre}</h3>
        </div>
        <div class="carrito-producto-cantidad">
          <small>Cantidad</small>
          <p>${producto.cant}</p>
        </div>
        <div class="carrito-producto-precio">
          <small>Precio</small>
          <p>$${producto.precio}</p>
        </div>
        <div class="carrito-producto-subtotal">
          <small>Subtotal</small>
          <p>$${producto.precio * producto.cant}</p>
        </div>
        <div class="carrito-producto-anhadir">
          <p>Comprar</p>
        </div>
        <div class="carrito-producto-eliminar">
          <p>Eliminar</p>
        </div>
      `;

    carritoProductos.appendChild(divProducto);

    total += producto.precio * producto.cant;
  });

  document.getElementById("Total").textContent = `$${total}`;
}

// Vaciar carrito
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", function () {
    // Vaciar el localStorage
    localStorage.removeItem("carrito");

    // Mostrar mensaje de carrito vacío
    mensajeCarritoVacio.style.display = "block";

    // Ocultar el contenedor de productos del carrito
    document.getElementById("carrito-productos").style.display = "none";

    // También actualizamos el contador del carrito
    actualizarContadorCarrito();
    document.getElementById("Total").textContent = `0`;
  });
}

// Comprar ahora
if (comprarAhoraBtn) {
  comprarAhoraBtn.addEventListener("click", function () {
    // Vaciar el localStorage
    localStorage.removeItem("carrito");

    // Mostrar mensaje de compra realizada
    mensajeCarritoComprado.style.display = "block";

    // Ocultar el contenedor de productos del carrito
    document.getElementById("carrito-productos").style.display = "none";

    // También actualizamos el contador del carrito
    actualizarContadorCarrito();
    document.getElementById("Total").textContent = `0`;
  });
}

mostrarCarrito();

actualizarContadorCarrito();
