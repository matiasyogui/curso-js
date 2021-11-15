// MASCOTA OBJETO
class Mascota {
  constructor(nombre, tipo, sexo, raza, color, descripcion) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.sexo = sexo;
    this.raza = raza;
    this.color = color;
    this.descripcion = descripcion;
  }

  cambiarNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }
}

// ARRAY INICIAL
const mascotasEnAdopcion = [
  new Mascota(
    "richard",
    "gato",
    "macho",
    "indefinido",
    "marron",
    "gato gris grande :)"
  ),
  new Mascota(
    "reina",
    "gato",
    "hembra",
    "siames",
    "blanco",
    "gata marron grande :)"
  ),
  new Mascota(
    "lupe",
    "perro",
    "hembra",
    "caniche",
    "blanco",
    "perra marron grande :)"
  ),
  new Mascota(
    "mar",
    "perro",
    "hembra",
    "indefinido",
    "marron",
    "perra marro grande :)"
  ),
  new Mascota(
    "piolin",
    "pajaro",
    "macho",
    "canario",
    "amarillo",
    "pajaro chiquito amarillo :)"
  ),
  new Mascota(
    "donald",
    "pajaro",
    "macho",
    "pato",
    "blanco",
    "pajaro blanco grande :)"
  ),
];

// FUNCIONES
const crearMascota = function () {
  let nombre = prompt("Ingrese el nombre de la mascota: ");
  let tipo = prompt("Ingrese el tipo de la mascota: ");
  let sexo = prompt("Ingrese el sexo de la mascota: ");
  let raza = prompt("Ingrese la raza de la mascota: ");
  let color = prompt("Ingrese el color de la mascota: ");
  let descripcion = prompt("Ingrese una breve descripcion de la mascota: ");

  let mascotaNueva = new Mascota(nombre, tipo, sexo, raza, color, descripcion);
  agregarMascotaDOM(mascotaNueva);
  return mascotaNueva;
};

const cantidadDeMascotasEnAdopcion = () => mascotasEnAdopcion.length;
const agregarMascotaEnAdopcion = () => {
  mascotasEnAdopcion.push(crearMascota());
};
const filtrarPorTipo = (tipo) =>
  mascotasEnAdopcion.filter((mascota) => mascota.tipo === tipo);

const buscarMascotaPorNombre = (nombre) =>
  mascotasEnAdopcion.find((mascota) => mascota.nombre === nombre);

const eliminarMascota = function (mascota) {
  const index = mascotasEnAdopcion.indexOf(mascota);
  if (index > -1) {
    mascotasEnAdopcion.splice(index, 1);
    sacarMascotaDelDOM(index);
  }

  localStorage.removeItem(mascota.nombre);
};

/* DOM */
const $menu = document.querySelector("#menu");
const $mascotasTotales = document.querySelector(".mascotas-totales");
const $formMascotas = document.querySelector(".form-poner-en-adopcion");

const crearCardsMascotas = function () {
  if (localStorage.length === 0) {
    for (let mascota of mascotasEnAdopcion) {
      agregarMascotaDOM(mascota);
    }
  } else {
    Object.keys(localStorage).forEach(function (key) {
      let mascota = JSON.parse(localStorage.getItem(key));
      crearCardMascotaParticular(mascota);
    });
  }
};

const sacarMascotaDelDOM = function (indexMascota) {
  $mascotasTotales.removeChild($mascotasTotales.childNodes[indexMascota]);
  console.log($mascotasTotales.childNodes[indexMascota]);
};

const crearCardMascotaParticular = (mascota) => {
  let card = document.createElement("div");
  card.innerHTML = `<div
    class="card col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    style="width: 18rem"
  >
    <div class="card-body">
      <h5 class="card-title">${mascota.nombre}</h5>
      <p class="card-text">${mascota.descripcion}</p>
      <button type="submit" class="btn btn-primary ${mascota.nombre}"
        >ADOPTAR</button
      >
    </div>
  </div>`;

  $mascotasTotales.appendChild(card);

  const $botonAdoptar = document.querySelector(`.${mascota.nombre}`);
  $botonAdoptar.addEventListener("click", () => {
    eliminarMascota(mascota);
  });
};

const agregarMascotaDOM = function (mascota) {
  crearCardMascotaParticular(mascota);
  localStorage.setItem(`${mascota.nombre}`, JSON.stringify(mascota));
};

const $botonSubmit = document.querySelector(".enviar-form");
$botonSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  let nombre = document.querySelector(".nombre").value;
  let tipo = document.querySelector(".tipo").value;
  let sexo = document.querySelector(".sexo").value;
  let raza = document.querySelector(".raza").value;
  let color = document.querySelector(".color").value;
  let descripcion = document.querySelector(".descripcion").value;

  agregarMascotaDOM(new Mascota(nombre, tipo, sexo, raza, color, descripcion));
});

// FUNCIONES BOTONES MENU
const cambiarVentanas = () => {
  $mascotasTotales.classList.toggle("oculto");
  $formMascotas.classList.toggle("oculto");
};

let $botonMostrarMascotas = document.querySelector("#mostrar-mascotas");
let $botonFormAdoptar = document.querySelector("#poner-adopcion-mascota");

$botonMostrarMascotas.addEventListener("click", cambiarVentanas);
$botonFormAdoptar.addEventListener("click", cambiarVentanas);

// MAIN
crearCardsMascotas();
