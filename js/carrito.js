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
var compra;
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const carritoProductos = document.getElementById("carrito-productos");
  carritoProductos.innerHTML = "";

  let total = 0;
  console.log(compra)
  if ((carrito.length === 0) && compra) {
    mensajeCarritoComprado.style.display = "block";
    document.getElementById("Total").textContent = `0`;
    compra = false
  }else if (carrito.length === 0) {
    // Si el carrito está vacío, mostramos el mensaje correspondiente
    mensajeCarritoVacio.style.display = "block";
    document.getElementById("Total").textContent = `0`;
    compra = false
  }else {
    // Si hay productos, los mostramos en el carrito
    let total = 0;

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

    // Mostrar el total
    document.getElementById("Total").textContent = `$${total}`;
    compra = false

    const botonesComprar = document.querySelectorAll(".carrito-producto-anhadir");
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");

    botonesComprar.forEach((boton) =>
      boton.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        comprarProducto(index);
      })
    );
    botonesEliminar.forEach((boton) =>
      boton.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        eliminarProducto(index);
      })
    );
  }
}

// Vaciar carrito
if (vaciarCarritoBtn) {
  vaciarCarritoBtn.addEventListener("click", function () {
    // Mostrar cuadro de confirmación
    const confirmar = confirm("¿Estás seguro de que deseas vaciar el carrito?");

    if (confirmar) {
      // Vaciar el localStorage
      localStorage.removeItem("carrito");

      // Mostrar mensaje de carrito vacío
      mensajeCarritoVacio.style.display = "block";

      // Ocultar el contenedor de productos del carrito
      document.getElementById("carrito-productos").style.display = "none";

      // También actualizamos el contador del carrito
      actualizarContadorCarrito();
      document.getElementById("Total").textContent = `0`;

      alert("El carrito se ha vaciado.");
    } else {
      // Si el usuario cancela, no se hace nada
      console.log("El usuario canceló la acción de vaciar el carrito.");
    }
  });
}

// Comprar ahora
if (comprarAhoraBtn) {
  comprarAhoraBtn.addEventListener("click", function () {
    // Mostrar cuadro de confirmación
    const confirmar = confirm(
      "¿Estás seguro de que deseas realizar la compra?"
    );

    if (confirmar) {
      // Vaciar el localStorage
      localStorage.removeItem("carrito");

      // Mostrar mensaje de compra realizada
      mensajeCarritoComprado.style.display = "block";

      // Ocultar el contenedor de productos del carrito
      document.getElementById("carrito-productos").style.display = "none";

      // También actualizamos el contador del carrito
      actualizarContadorCarrito();
      document.getElementById("Total").textContent = `0`;

      alert("¡Gracias por tu compra! El carrito ha sido vaciado.");
    } else {
      // Si el usuario cancela, no se hace nada
      console.log("El usuario canceló la acción de comprar.");
    }
  });
}

// Función para manejar la compra de un producto
function comprarProducto(index) {
  const confirmacion = confirm("¿Estás seguro de que quieres comprar este producto?");
  if (confirmacion) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    compra = true
    carrito.splice(index, 1); // Elimina el producto del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el localStorage
    mostrarCarrito(); // Vuelve a renderizar el carrito
    actualizarContadorCarrito();
  }
}

// Función para manejar la eliminación de un producto
function eliminarProducto(index) {
  const confirmacion = confirm("¿Estás seguro de que quieres eliminar este producto?");
  if (confirmacion) {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1); // Elimina el producto del carrito
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualiza el localStorage
    mostrarCarrito(); // Vuelve a renderizar el carrito
    actualizarContadorCarrito();
  }
}


mostrarCarrito();

actualizarContadorCarrito();

if (typeof closeMenu === "function") {
  closeMenu(); // Llama a la función cuando lo necesites
}
