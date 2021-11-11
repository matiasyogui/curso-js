class Mascota {
  constructor(nombre, tipo, sexo, raza, color) {
    this.nombre = nombre;
    this.tipo = tipo;
    this.sexo = sexo;
    this.raza = raza;
    this.color = color;
  }

  cambiarNombre(nuevoNombre) {
    this.nombre = nuevoNombre;
  }
}

const mascotasEnAdopcion = [
  new Mascota("richard", "gato", "macho", "indefinido", "marron"),
  new Mascota("reina", "gato", "hembra", "siames", "blanco"),
  new Mascota("lupe", "perro", "hembra", "caniche", "blanco"),
  new Mascota("mar", "perro", "hembra", "indefinido", "marron"),
  new Mascota("piolin", "pajaro", "macho", "canario", "amarillo"),
  new Mascota("donald", "pajaro", "macho", "pato", "blanco"),
];

const crearMascota = function () {
  let nombre = prompt("Ingrese el nombre de la mascota: ");
  let tipo = prompt("Ingrese el tipo de la mascota: ");
  let sexo = prompt("Ingrese el sexo de la mascota: ");
  let raza = prompt("Ingrese la raza de la mascota: ");
  let color = prompt("Ingrese el color de la mascota: ");

  return new Mascota(nombre, tipo, sexo, raza, color);
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
  }
};

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
