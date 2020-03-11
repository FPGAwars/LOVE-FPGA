//-- Identificador de la variable bit a monitorizar en el LED0
const VARBIT0 = 'a'
const VARBIT1 = 'b'

//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
//-- El último es la función de retrollamada de cuando se recibe un
//-- comando
const sp = new SerialPanel('msg_serial', 'butSerial', serial_cmd)

//-- Acceder al OJO del panel
const eye0 = new Eye("eye0")
const eye1 = new Eye("eye1")

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

  //-- Asignar a los ojos el valor de la variable binario
  eye0.set(bitvar(cmd, VARBIT0))
  eye1.set(bitvar(cmd, VARBIT1))


}
