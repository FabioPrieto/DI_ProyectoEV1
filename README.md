# Proyecto de Desenvolvemento de Interfaces: CarbaShop

## Descripción General
Este proyecto utiliza únicamente HTML, CSS y JavaScript, sin dependencias externas. El proyecto permite a los usuarios:

- Iniciar sesión.
- Navegar y filtrar productos por categorías.
- Agregar productos al carrito de compras.
- Gestionar el carrito y "realizar" compras.

## Estructura del Proyecto

### Carpetas y Archivos Principales

1. **HTML**:
   - `index.html`: Página de inicio de sesión.
   - `main.html`: Página principal que muestra los productos.
   - `carrito.html`: Página para gestionar los productos en el carrito.

2. **CSS**:
   - `css/index.css`: Estilo específico para la página de inicio.
   - `css/main.css`: Estilo para la página de productos.
   - `css/carrito.css`: Estilo para la página del carrito.
   - `css/comun.css`: Estilo compartido entre todas las páginas.

3. **JavaScript**:
   - `js/index.js`: Validación de inicio de sesión.
   - `js/main.js`: Gestión de productos y carrito desde la página principal.
   - `js/carrito.js`: Gestión avanzada del carrito de compras.
   - `js/comun.js`: Funciones comunes como el control del menú.
   - `js/productos.json`: Datos de los productos.

4. **Recursos adicionales**:
   - Imágenes organizadas en carpetas por categorías (`img/moviles`, `img/portatiles`, `img/televisiones`).

---

## Relación entre los Archivos

- **HTML y CSS**: Cada archivo HTML incluye los estilos específicos de su página y los estilos compartidos desde `comun.css`.
- **HTML y JavaScript**:
  - `index.html` carga `index.js` para manejar la validación del formulario de inicio de sesión.
  - `main.html` carga `main.js` para cargar los productos desde el archivo JSON y gestionar interacciones de usuario.
  - `carrito.html` carga `carrito.js` para mostrar y manipular el contenido del carrito.

---

## Autor
Fabio Prieto Álvarez, 2024.

