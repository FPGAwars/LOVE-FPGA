
//-- Crear el switch a partir de su identificador
//-- Esta asociado a la variable a
sw = new Switch("swa", toggle);

//-- Crear un LED
led = new Led("led");

//-- Funcion de retrollamada del switch
function toggle(varid, bitvalue)
{
  //-- Debug
  console.log("Toggle: " + varid + " " + bitvalue);

  //-- Establecer el estado del led
  led.set(bitvalue)
}
