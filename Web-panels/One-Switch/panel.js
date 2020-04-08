//-- Variable controlada por el switch
const SW_VAR = "a"


//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
const sp = new SerialPanel('msg_serial', 'butSerial')

//-- Crear el objeto switch
sw = new Switch("sw", toggle, "click");

//-- Función de retrollamada del switch
function toggle(s)
{
  //-- Debug
  //console.log("Toggle!!!!: " + s);

  //-- Enviar comando
  sp.write(SW_VAR + s + "\n");
}
