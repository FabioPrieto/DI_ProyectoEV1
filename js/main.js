const contenedorProductos = document.getElementById("contenedor-productos");
const botonesCategoria = document.querySelectorAll(".boton-categoria");

const cargarProductos = async () => {
  try {
    const respuesta = await fetch("./js/productos.json");
    if (!respuesta.ok) {
      throw new Error("Error al cargar el archivo JSON");
    }
    const productos = await respuesta.json();
    mostrarProductos(productos);

    botonesCategoria.forEach((boton) => {
      boton.addEventListener("click", () => {
        filtrarProductos(productos, boton.id);
        activarBoton(boton);
      });
    });

    document.querySelectorAll(".producto-agregar").forEach((button) => {
      button.addEventListener("click", function (e) {
        const producto = e.target.closest(".producto");

        const productoId = producto.getAttribute("id");
        const productoTitulo = producto.querySelector(".producto-titulo").textContent;
        const productoPrecio = parseFloat(
          producto
            .querySelector(".producto-precio")
            .textContent.replace("$", "")
            .trim()
        );
        const productoImagen = producto.querySelector(".producto-imagen").src

        let numerito = document.getElementById("numerito");
        numerito.textContent = parseInt(numerito.textContent) + 1;

        const productoCarrito = {
          id: productoId,
          cant: 1,
          precio: productoPrecio,
          nombre: productoTitulo,
          imagen: productoImagen,
        };

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        const index = carrito.findIndex((item) => item.id === productoId);
        if (index !== -1) {
          carrito[index].cant += 1;
        } else {
          carrito.push(productoCarrito);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
      });
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const mostrarProductos = (productos) => {
  contenedorProductos.innerHTML = productos
    .map(
      (producto) => `
        <div class="producto" id="${producto.id}">
          <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
          <div class="producto-detalles">
            <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar">Agregar</button>
          </div>
        </div>
      `
    )
    .join("");
};

const filtrarProductos = (productos, categoriaId) => {
  if (categoriaId === "todos") {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(
      (producto) => producto.categoria.id === categoriaId
    );
    mostrarProductos(productosFiltrados);
  }
};

const activarBoton = (botonActivo) => {
  botonesCategoria.forEach((boton) => boton.classList.remove("active"));
  botonActivo.classList.add("active");
};

// Para Comun.js
function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Calcular la cantidad total de productos (sumando las cantidades de cada producto)
  const totalProductos = carrito.reduce((total, item) => total + item.cant, 0);

  const numerito = document.getElementById("numerito");
  numerito.textContent = totalProductos;
}

cargarProductos();

actualizarContadorCarrito();
