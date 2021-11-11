const cantPersonas = prompt("Ingrese la cantidad de personas: ");

const pedirDatos = function (cantidad) {
  let total = 0;
  for (let i = 0; i < cantidad; i++) {
    total += parseInt(prompt(`Ingrese la edad de la persona numero ${i + 1}`));
  }
  return total;
};

const promedio = (total, cantidad) => total / cantidad;

const datosTotales = pedirDatos(cantPersonas);
alert(
  `El promedio de edades entre ${cantPersonas} es de ${promedio(
    datosTotales,
    cantPersonas
  )} años.`
);
