//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
//-- El último es la función de retrollamada de cuando se recibe un
//-- comando
const sp = new SerialPanel('msg_serial', 'butSerial', serial_cmd)


sw = new Switch("sw", toggle);

function toggle(s)
{
  console.log("Toggle!!!!: " + s);
  sp.write("a" + s + "\n");
}

//-- Funcion para procesar los comandos recibidos
//-- El comando recibido no incluye el \n final
//-- (el modulo serialPanel lo ha quitado)
function serial_cmd(cmd)
{
  //-- Degbug
  console.log("Comand: " + cmd + " Length: " + cmd.length);

}
