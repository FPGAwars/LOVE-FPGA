//-- Variable controlada por el switch
const SW_VAR = "a"

//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
const sp = new SerialPanel('msg_serial', 'butSerial')

//-- Obtener los botones de Reset y Sync
const butReset = document.getElementById("butReset");
const butSync = document.getElementById("butSync");


//-- Crear el objeto switch
sw = new Switch("sw", toggle, "click");

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
  toggle(sw.get())
}

//-- Función de retrollamada del switch
function toggle(s)
{
  //-- Debug
  console.log("Toggle!!!!: " + s);

  //-- Enviar comando
  sp.write(SW_VAR + s + "\n");
}

//-- Debug...
console.log("Listo!!!!");
