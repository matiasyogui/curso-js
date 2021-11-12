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
};

/* DOM */
const $menu = document.querySelector("#menu");
const $container = document.querySelector(".container");

const crearEsqueletoHTML = function () {
  let contenedor = document.createElement("div");
  contenedor.innerHTML = `<h1>MASCOTAS EN ADOPCION</h1>`;
  $menu.appendChild(contenedor);
};

const crearCardsMascotas = function () {
  for (let mascota of mascotasEnAdopcion) {
    agregarMascotaDOM(mascota);
  }
};

const sacarMascotaDelDOM = function (indexMascota) {
  $container.removeChild($container.childNodes[indexMascota]);
  console.log($container.childNodes[indexMascota]);
};

const agregarMascotaDOM = function (mascota) {
  let card = document.createElement("div");
  card.innerHTML = `<div
    class="card col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4"
    style="width: 18rem"
  >
    <div class="card-body">
      <h5 class="card-title">${mascota.nombre}</h5>
      <p class="card-text">${mascota.descripcion}</p>
      <a href="./adoptarMascotaParticular.html" class="btn btn-primary"
        >Mas informacion</a
      >
    </div>
  </div>`;

  $container.appendChild(card);
};

crearEsqueletoHTML();
crearCardsMascotas();

// SIMULADOR REFUGIO DE MASCOTAS
let opcion = 999;
do {
  opcion = prompt(
    "¿Que desea hacer?: 1-Adoptar mascota. 2-Poner en adopcion mascota. 3-Saber la cantidad de mascotas en adopcion. 0-Salir. "
  );
  switch (opcion) {
    case "1":
      let tipo = prompt("¿Que tipo de mascota desea adoptar?");
      let mascotasFiltradas = filtrarPorTipo(tipo);

      console.log(mascotasFiltradas);

      for (const mascota of mascotasFiltradas) {
        alert(
          `${mascota.nombre} es un ${mascota.tipo} ${mascota.sexo} de color ${mascota.color}`
        );
      }

      let nombre = prompt(
        "Indique el nombre de la mascota que quiere adoptar."
      );

      let mascotaAAdoptar = buscarMascotaPorNombre(nombre);
      alert(`Se adopto a ${mascotaAAdoptar.nombre} correcamente.`);

      eliminarMascota(mascotaAAdoptar);
      sacarMascotaDelDOM(mascotaAAdoptar);
      break;

    case "2":
      agregarMascotaEnAdopcion();
      alert("Mascota agregada correctamente");
      break;
    case "3":
      alert(
        `La cantiadad total de mascotas es de ${cantidadDeMascotasEnAdopcion()}.`
      );
      console.log(mascotasEnAdopcion);
      break;
    case "0":
      alert("OK GOODBYE :)");
  }
} while (opcion != 0);
