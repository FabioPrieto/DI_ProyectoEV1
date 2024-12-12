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
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

const mostrarProductos = (productos) => {
  contenedorProductos.innerHTML = productos
    .map(
      (producto) => `
        <div class="producto">
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

cargarProductos();
