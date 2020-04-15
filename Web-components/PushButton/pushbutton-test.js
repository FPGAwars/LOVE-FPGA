console.log("Ejecutando JS...");

const btn = new PushButton("pba", change);
const led = new Led("led");

//-- Funcion de retrollamada del Boton
function change(varid, bitvalue)
{
  //-- Debug
  console.log("Cambio!: " + varid + " " + bitvalue);

  //-- Establecer el estado del led
  led.set(bitvalue)
}
