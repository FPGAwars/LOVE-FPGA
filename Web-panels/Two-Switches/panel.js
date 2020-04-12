
//-- Obtener el panel serie
//-- Se le pasa la funcion de retrollamada nula:
//-- en este ejemplo no se recibe nada
const sp = new SerialPanel(()=>{})

//-- Obtener los botones de Reset y Sync
const butReset = document.getElementById("butReset");
const butSync = document.getElementById("butSync");

//-- Obtener el switch del html
//-- En este panel solo se usa un switch. Obtener el primero que haya
const sw_els = document.getElementsByClassName("Switch");
//let sw_el = (sw_els.length >= 1) ? sw_els[0] : null;

const sw_el0 = sw_els[0];
const sw_el1 = sw_els[1];

//-- Crear los objetos de los switches
sw0 = new Switch(sw_el0, toggle0);
sw1 = new Switch(sw_el1, toggle1);

//-- El elemento previo al switch es la etiqueta
//-- situada encima. Ponemos el nombre de la variable que acciona el switch
const sw_label0 = sw_el0.previousElementSibling;
sw_label0.innerHTML = "<b>" + sw0.varid + "</b>"

const sw_label1 = sw_el1.previousElementSibling;
sw_label1.innerHTML = "<b>" + sw1.varid + "</b>"

//-- Establecer la funcion de retrollamada cuando
//-- el puerto serie se ha abierto
sp.onconnect = () => {
  console.log("Debug: Panel: Conectados!!");

  //-- Activar los botones de Reset y Sync
  butReset.disabled = false;
  butSync.disabled = false;

  //-- Cambiar el estado del switch a enable
  sw0.enable()
  sw1.enable()

  //-- Al arrancar enviamos el estado a 0
  sw0.off();
  sw1.off();

  //-- Llevar el foco al boton de reset
  butReset.focus();
}

sp.ondisconnect = () => {
  console.log("Debug: Panel: Desconectar...")

  //-- Deshabilitar Los botones de Reset y Sync
  butReset.disabled = true;
  butSync.disabled = true;

  //-- Apagar el switch, para que el hardware vaya
  //-- acorde
  sw0.off();
  sw1.off();

  //-- Deshabilitar el switch. El usuario ya no puede
  //-- cambiarlo
  sw0.disable();
  sw1.disable();

}

//-- Funcion de retrollama del boton de RESET
butReset.onclick = ()=> {
  //-- Poner el switch a cero
  sw0.off();
  sw1.off();
}

//-- Función de retrollamada del botón de Sync
butSync.onclick = () => {
  //-- Enviar el estado actual al hardware
  sw0.callback()
  sw1.callback()
}

//-- Función de retrollamada del switch
//-- Parametros:
//--   * identificador de la variables
//--   * valor binario
function toggle0(varid, bitvalue)
{
  //-- Debug
  console.log("Toggle: " + varid + " " + bitvalue);

  //-- Enviar comando al Hardware
  //-- La trama esta formada por el nombre de la variable
  //-- su valor en  binario y un salto de linea (3 bytes)
  sp.write(varid + bitvalue + "\n");
}

function toggle1(varid, bitvalue)
{
  //-- Debug
  console.log("Toggle: " + varid + " " + bitvalue);

  //-- Enviar comando al Hardware
  //-- La trama esta formada por el nombre de la variable
  //-- su valor en  binario y un salto de linea (3 bytes)
  sp.write(varid + bitvalue + "\n");
}

//-- Retrollamada de las teclas
window.onkeydown = (e) => {
  console.log("Tecla!")
  if (e.key == sw0.varid)
    sw0.toggle();

  if (e.key == sw1.varid)
    sw1.toggle();
}

//-- Debug...
console.log("Listo!!!!");
