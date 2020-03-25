
//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
//-- El último es la función de retrollamada de cuando se recibe un
//-- comando
const sp = new SerialPanel('msg_serial', 'butSerial', serial_cmd)

const swa = new PushButton("swa", toggle_a);
const swb = new Switch("swb", toggle_b);

//-- Acceder al LED0 del panel
const leda = new Led("leda")
//-- Acceder al LED1 del panel
const ledb = new Led("ledb")

function toggle_a(s)
{
  //console.log("Toggle a!!!!: " + s);
  sp.write("a" + s + "\n");
}

function toggle_b(s)
{
  //console.log("Toggle b!!!!: " + s);
  sp.write("b" + s + "\n");
}

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

  //-- Establecer el valor de los LEDs
  leda.set(bitvar(cmd, 'a'));
  ledb.set(bitvar(cmd, 'b'));

}
