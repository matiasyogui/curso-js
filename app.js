let id = 0;
// MASCOTA OBJETO
class Mascota {
  constructor(nombre, tipo, sexo, raza, color, descripcion) {
    this.id = id++;
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
let mascotasEnAdopcion = [];
$(() => {
  const urlArrayInicial = "./src/array-inicial.json";
  $.getJSON(urlArrayInicial, function (res, req) {
    if (req === "success") {
      console.log(res);
      mascotasEnAdopcion = res;

      crearCardsMascotas();
    }
  });
});

// FUNCIONES
const crearMascota = function () {
  id++;
  let nombre = prompt("Ingrese el nombre de la mascota: ");
  let tipo = prompt("Ingrese el tipo de la mascota: ");
  let sexo = prompt("Ingrese el sexo de la mascota: ");
  let raza = prompt("Ingrese la raza de la mascota: ");
  let color = prompt("Ingrese el color de la mascota: ");
  let descripcion = prompt("Ingrese una breve descripcion de la mascota: ");

  let mascotaNueva = new Mascota(
    id,
    nombre,
    tipo,
    sexo,
    raza,
    color,
    descripcion
  );
  agregarMascotaDOM(mascotaNueva);
  return mascotaNueva;
};

console.log(JSON.stringify(mascotasEnAdopcion));

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
  console.log("eliminarMascota " + index + mascota.id);

  if (index > -1) {
    mascotasEnAdopcion.splice(index, 1);
    sacarMascotaDelDOM(index);
    localStorage.removeItem(mascota.id);
  }
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
    mascotasEnAdopcion = [];
    Object.keys(localStorage).forEach(function (key) {
      let mascota = JSON.parse(localStorage.getItem(key));
      mascotasEnAdopcion.push(mascota);
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
    style="width: 18rem"
    class="card-mascota"
  >
    <div class="card-body">
      <h5 class="card-title">${mascota.nombre}</h5>
      <p class="card-text">${mascota.descripcion}</p>
      <button type="submit" class="btn btn-primary ${mascota.id}"
        >ADOPTAR</button
      >
    </div>
  </div>`;

  $(".mascotas-totales").append(card);

  $(`.${mascota.id}`).click(() => {
    eliminarMascota(mascota);
  });
};

const agregarMascotaDOM = function (mascota) {
  crearCardMascotaParticular(mascota);
  localStorage.setItem(`${mascota.id}`, JSON.stringify(mascota));
};

const $botonSubmit = $(".formulario-adopcion");
$botonSubmit.submit(function (e) {
  e.preventDefault();
  let hijos = $(e.target).children();

  console.log(hijos);

  let nuevaMascota = new Mascota(
    hijos[1].value,
    hijos[4].value,
    hijos[7].value,
    hijos[10].value,
    hijos[13].value,
    hijos[16].value
  );

  agregarMascotaDOM(nuevaMascota);
  mascotasEnAdopcion.push(nuevaMascota);
});

// FUNCIONES BOTONES MENU
$("#mostrar-mascotas").click(() => {
  $(".mascotas-totales").toggle("slow");
});

$("#poner-adopcion-mascota").click(() => {
  $(".form-poner-en-adopcion").toggle("fast");
});
