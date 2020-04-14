console.log("WHAT!!!!!!!");

//-- Obtener el panel serie
//-- Se le pasa la funcion de retrollamada nula:
//-- en este ejemplo no se recibe nada
const sp = new SerialPanel(()=>{})

//-- Obtener los botones de Reset y Sync
const butReset = document.getElementById("butReset");
const butSync = document.getElementById("butSync");

const btn = new PushButton("pbb", toggle);

//-- Obtener todos los switches
const switches_el = document.getElementsByClassName("Switch");

//-- Crear los objetos de los switches
let switches = [];

for (let item of switches_el) {
  let sw = new Switch(item, toggle)
  switches.push(sw);
}

//-- Leer los identificadores de los switches
//-- y colocarlos en las etiquetas encima de ellos
for (let sw of switches) {
  let sw_label = sw.element.previousElementSibling;
  sw_label.innerHTML = "<b>" + sw.varid + "</b>"
}

let btn_label = btn.element.previousElementSibling;
btn_label.innerHTML = "<b>" + btn.varid + "</b>"

//-- Establecer la funcion de retrollamada cuando
//-- el puerto serie se ha abierto
sp.onconnect = () => {
  console.log("Debug: Panel: Conectados!!");

  //-- Activar los botones de Reset y Sync
  butReset.disabled = false;
  butSync.disabled = false;

  //-- Cambiar el estado de los swtiches a enable
  for (let sw of switches) {

    //-- Cambiar el estado de los swtiches a enable
    sw.enable()

    //-- Al arrancar enviamos el estado 0 a todos
    sw.off();
  }

  //-- Cambiar estado del pushbutton a enable
  btn.enable();

  //-- Llevar el foco al boton de reset
  butReset.focus();
}

sp.ondisconnect = () => {
  console.log("Debug: Panel: Desconectar...")

  //-- Deshabilitar Los botones de Reset y Sync
  butReset.disabled = true;
  butSync.disabled = true;

  for (let sw of switches) {
    //-- Apagar el switch, para que el hardware vaya
    //-- acorde
    sw.off();

    //-- Deshabilitar el switch. El usuario ya no puede
    //-- cambiarlo
    sw.disable();
  }

  //-- Cambiar estado del pushbutton a disable
  btn.disable();

}

//-- Funcion de retrollama del boton de RESET
butReset.onclick = ()=> {
  //-- Poner todos los switches a cero
  for (let sw of switches) {
    sw.off();
  }
}

//-- Función de retrollamada del botón de Sync
butSync.onclick = () => {
  //-- Enviar el estado actual al hardware

  for (let sw of switches) {
    sw.callback()
  }
}

//-- Función de retrollamada del switch
//-- Parametros:
//--   * identificador de la variables
//--   * valor binario
function toggle(varid, bitvalue)
{

  console.log("Hola????")
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

  //-- Activar el switch correspondiente segun la tecla
  //-- pulsada
  for (let sw of switches) {
    if (e.key == sw.varid)
      sw.toggle();
  }
}

//-- Debug...
console.log("Listo!!!!");
