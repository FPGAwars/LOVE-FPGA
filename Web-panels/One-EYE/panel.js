//-- Identificador de la variable bit a monitorizar en el LED0
const VARBIT0 = 'b'

//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
//-- El último es la función de retrollamada de cuando se recibe un
//-- comando
const sp = new SerialPanel('msg_serial', 'butSerial', serial_cmd)

//-- Acceder al OJO del panel
const eye = new Eye("eye")

function bitvar(cmd, varname)
//-- Procesar el comando recibido y comprobar si es una
//-- varaible binaria
//-- Si es así, retorna su valor: "0", "1"
//-- En caso contrario retorna null
{
    let str1 = varname + "1"
    let str0 = varname + "0"

    if (cmd == str1) {
      return "1"
    } else if (cmd == str0) {
      return "0"
    }

    //-- Comando no reconocido
    return null;
}

//-- Funcion para procesar los comandos recibidos
//-- El comando recibido no incluye el \n final
//-- (el modulo serialPanel lo ha quitado)
function serial_cmd(cmd)
{
  //-- Degbug
  console.log("Comand: " + cmd + " Length: " + cmd.length);

  //-- Leer el bit de la variable binaria,
  //-- si se ha recibido el comando correcto
  let bit = bitvar(cmd, VARBIT0)

  //-- Actuar sobre el LED del panel si se ha recibido el bit
  if (bit) {
    console.log("Bit: " + bit)
    eye.set(bit);
  }

}
