//-- Identificador de la variable bit a monitorizar en el LED0
const VARBIT0 = 'd'
const VARBIT1 = 'c'
const VARBIT2 = 'b'
const VARBIT3 = 'a'

//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
//-- El último es la función de retrollamada de cuando se recibe un
//-- comando
const sp = new SerialPanel('msg_serial', 'butSerial', serial_cmd)

const swa = new PushButton("swa", toggle_a);
const swb = new PushButton("swb", toggle_b);
const swc = new PushButton("swc", toggle_c);
const swd = new PushButton("swd", toggle_d)

//-- Acceder al LED0 del panel
const led0 = new Led("led0")
const led1 = new Led("led1")
const led2 = new Led("led2")
const led3 = new Led("led3")

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

function toggle_c(s)
{
  //console.log("Toggle a!!!!: " + s);
  sp.write("c" + s + "\n");
}

function toggle_d(s)
{
  //console.log("Toggle b!!!!: " + s);
  sp.write("d" + s + "\n");
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
  led0.set(bitvar(cmd, VARBIT0));
  led1.set(bitvar(cmd, VARBIT1));
  led2.set(bitvar(cmd, VARBIT2));
  led3.set(bitvar(cmd, VARBIT3));


}
