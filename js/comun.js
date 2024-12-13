const openMenuBtn = document.getElementById("open-menu");
const closeMenuBtn = document.getElementById("close-menu");
const aside = document.querySelector("aside");
const overlay = document.getElementById("overlay");
const body = document.body;

// Mostrar el menú al hacer clic en el botón "open-menu"
openMenuBtn.addEventListener("click", () => {
  aside.classList.add("aside-visible");
  overlay.classList.add("visible");
  body.classList.add("no-scroll");
});

// Ocultar el menú al hacer clic en el botón "close-menu"
const closeMenu = () => {
  aside.classList.remove("aside-visible");
  overlay.classList.remove("visible");
  body.classList.remove("no-scroll"); // Habilitar el scroll
};

closeMenuBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);