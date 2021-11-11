let nombre = prompt("Buen dia, ingrese su nombre:");
let apellido = prompt("Ahora ingrese su apellido");
let edad = prompt("Y por ultimo ingrese su edad:");

if (edad < 16) {
  alert(
    `Hola ${nombre} ${apellido}, esta noche los menores a 16 años no tienen permitido entrar a la fiesta. Lo siento :(`
  );
} else if (edad < 18) {
  alert(
    `Hola ${nombre} ${apellido}, los menores no puede comprar bebidas con alcohol. Disfrute de la fiesta! :)`
  );
} else {
  alert(
    `Hola ${nombre} ${apellido}, tiene una consumicion gratis. Disfrute de la fiesta! :)`
  );
}
