console.log("WHAT!!!!!!!");

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

//-- Crear los objetos de los switches
let switches = [];

//-- Crear los objetos de los pulsadores
let pushbtns = [];

for (let item of switches_el) {
  let sw = new Switch(item, toggle)
  switches.push(sw);
}

for (let item of pushbtns_el) {
  let pb = new PushButton(item, toggle)
  pushbtns.push(pb);
}

//-- Leer los identificadores de los switches
//-- y colocarlos en las etiquetas encima de ellos
for (let sw of switches) {
  let sw_label = sw.element.previousElementSibling;
  sw_label.innerHTML = "<b>" + sw.varid + "</b>"
}

for (let pb of pushbtns) {
  let pb_label = pb.element.previousElementSibling;
  pb_label.innerHTML = "<b>" + pb.varid + "</b>"
}

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

  //-- Cambiar el estado de los pulsadores a enable
  for (let pb of pushbtns) {

    //-- Cambiar el estado de los swtiches a enable
    pb.enable()

    //-- Al arrancar enviamos el estado 0 a todos
    pb.off();
  }

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

  for (let pb of pushbtns) {
    //-- Apagar el switch, para que el hardware vaya
    //-- acorde
    pb.off();

    //-- Deshabilitar el switch. El usuario ya no puede
    //-- cambiarlo
    pb.disable();
  }

}

//-- Funcion de retrollama del boton de RESET
butReset.onclick = ()=> {
  //-- Poner todos los switches a cero
  for (let sw of switches) {
    sw.off();
  }

  //-- Poner todos los switches a cero
  for (let pb of pushbtns) {
    pb.off();
  }

}

//-- Función de retrollamada del botón de Sync
butSync.onclick = () => {
  //-- Enviar el estado actual al hardware

  for (let sw of switches) {
    sw.callback();
  }

  for (let pb of pushbtns) {
    pb.callback();
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
  //-- Activar el switch correspondiente segun la tecla
  //-- pulsada
  for (let sw of switches) {
    if (e.key == sw.varid)
      sw.toggle();
  }

  for (let pb of pushbtns) {
    if (e.key == pb.varid) {
      //-- Solo se activa el pulsador
      //-- si no estaba activado previamente
      //-- Es para evitar el efecto de tecla multiple
      //-- cuando se deja apretada una tecla
      if (pb.get() == "0") {
        pb.on();
      }
    }
  }
}

//-- Retrollamada de cuando las teclas se sueltan
window.onkeyup = (e) => {

  //-- Comprobar los pulsadores
  for (let pb of pushbtns) {
    if (e.key == pb.varid) {
      pb.off();
    }
  }

}

//-- Debug...
console.log("Listo!!!!");
