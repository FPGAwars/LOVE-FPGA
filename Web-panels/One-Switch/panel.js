//-- Variable controlada por el switch
const SW_VAR = "a"


//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
const sp = new SerialPanel('msg_serial', 'butSerial')

//-- Crear el objeto switch
sw = new Switch("sw", toggle, "click");

//-- Establecer la funcion de retrollamada cuando
//-- el puerto serie se ha abierto
sp.onconnect = () => {
  console.log("Debug: Panel: Conectados!!");

  //-- Cambiar el estado del switch a enable
  sw.enable()
}

sp.ondisconnect = () => {
  console.log("Debug: Panel: Desconectar...")

  //-- Apagar el switch, para que el hardware vaya
  //-- acorde
  sw.off();

  //-- Deshabilitar el switch. El usuario ya no puede
  //-- cambiarlo
  sw.disable();
}

//-- Función de retrollamada del switch
function toggle(s)
{
  //-- Debug
  console.log("Toggle!!!!: " + s);

  //-- Enviar comando
  sp.write(SW_VAR + s + "\n");
}
