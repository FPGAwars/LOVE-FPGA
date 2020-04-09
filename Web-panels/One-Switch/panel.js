
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
let sw_el = (sw_els.length >= 1) ? sw_els[0] : null;

//-- Crear el objeto switch
sw = new Switch(sw_el, toggle);

//-- El elemento previo al switch es la etiqueta
//-- situada encima. Ponemos el nombre de la variable que acciona el switch
const sw_label = sw_el.previousElementSibling;
sw_label.innerHTML = "<b>" + sw.varid + "</b>"

//-- Establecer la funcion de retrollamada cuando
//-- el puerto serie se ha abierto
sp.onconnect = () => {
  console.log("Debug: Panel: Conectados!!");

  //-- Activar los botones de Reset y Sync
  butReset.disabled = false;
  butSync.disabled = false;

  //-- Cambiar el estado del switch a enable
  sw.enable()

  //-- Al arrancar enviamos el estado a 0
  sw.off();

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
  sw.off();

  //-- Deshabilitar el switch. El usuario ya no puede
  //-- cambiarlo
  sw.disable();

}

//-- Funcion de retrollama del boton de RESET
butReset.onclick = ()=> {
  //-- Poner el switch a cero
  sw.off();
}

//-- Función de retrollamada del botón de Sync
butSync.onclick = () => {
  //-- Enviar el estado actual al hardware
  sw.callback()
}

//-- Función de retrollamada del switch
//-- Parametros:
//--   * identificador de la variables
//--   * valor binario
function toggle(varid, bitvalue)
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
  if (e.key == sw.varid)
    sw.toggle();
}

//-- Debug...
console.log("Listo!!!!");
