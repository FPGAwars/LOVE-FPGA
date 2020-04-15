//-- Obtener el panel serie
//-- Se le pasa la funcion de retrollamada nula:
//-- en este ejemplo no se recibe nada
const sp = new SerialPanel(()=>{})

//-- Obtener los botones de Reset y Sync
const butReset = document.getElementById("butReset");
const butSync = document.getElementById("butSync");

//-- Obtener todos los switches
const switches_el = document.getElementsByClassName("Switch");

//-- Obtener todos los pulsadores
const pushbtns_el = document.getElementsByClassName("Pushbutton");

//-- Dispositivos de entrada: Switches y pulsadores
let inputbits = [];

//-- Añadir los switches
for (let item of switches_el) {
  let sw = new Switch(item, toggle);
  inputbits.push(sw);
}

//-- Añadir los pulsadores
for (let item of pushbtns_el) {
  let pb = new PushButton(item, toggle);
  inputbits.push(pb);
}

//-- Leer los identificadores de los elementos
//-- de entrada y colocarlos en las etiquetas
//-- encima de ellos
for (let sw of inputbits) {
  let sw_label = sw.element.previousElementSibling;
  sw_label.innerHTML = "<b>" + sw.varid + "</b>"
}

//-- Establecer la funcion de retrollamada cuando
//-- el puerto serie se ha abierto
sp.onconnect = () => {
  console.log("Debug: Panel: Conectados!!");

  //-- Activar los botones de Reset y Sync
  butReset.disabled = false;
  butSync.disabled = false;

  //-- Cambiar el estado de los elementos de entrada a enable
  for (let sw of inputbits) {

    sw.enable()

    //-- Al arrancar enviamos el estado 0 a todos
    sw.off();
  }

  //-- Llevar el foco al boton de reset
  butReset.focus();
}

sp.ondisconnect = () => {
  console.log("Debug: Panel: Desconectar...")

  //-- Deshabilitar Los botones de Reset y Sync
  butReset.disabled = true;
  butSync.disabled = true;

  //-- Al desconectar, se ponen a cero todos los elementos
  //-- de entrada y se deshabilitan
  for (let sw of inputbits) {
    sw.off();
    sw.disable();
  }

}

//-- Funcion de retrollama del boton de RESET
butReset.onclick = ()=> {
  //-- Poner todos los elementos de entrada a 0
  for (let sw of inputbits) {
    sw.off();
  }
}

//-- Función de retrollamada del botón de Sync
butSync.onclick = () => {

  //-- Enviar el estado actual al hardware
  for (let sw of inputbits) {
    sw.callback();
  }
}

//-- Función de retrollamada de los elementos de entrada
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
  //-- Activar el elemento de entrada correspondiente segun
  //-- la tecla pulsada
  for (let sw of inputbits) {

    //-- Si la tecla coincide con la variable del
    //-- elemento de entrada y está habilitado:
    if (e.key == sw.varid && !sw.disabled())

      //-- En los switches se cambia su posición
      if (sw.constructor.name == "Switch")
        sw.toggle();

      //-- Activar el pulsador
      else if (sw.constructor.name == "PushButton")
        //-- Solo se activa el pulsador
        //-- si no estaba activado previamente
        //-- Es para evitar el efecto de tecla multiple
        //-- cuando se deja apretada una tecla
        if (sw.get() == "0") {
          sw.on();
        }
  }

}

//-- Retrollamada de cuando las teclas se sueltan
window.onkeyup = (e) => {

  //-- Comprobar los pulsadores
  for (let sw of inputbits) {

    //-- Comprobar solo los pulsadores
    if (sw.constructor.name == "PushButton")
      if (e.key == sw.varid && !sw.disabled()) {
        sw.off();
      }
  }

}

//-- Debug...
console.log("Listo!!!!");
