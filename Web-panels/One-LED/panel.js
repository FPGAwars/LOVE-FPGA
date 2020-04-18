//-- Obtener el panel serie
//-- Se le pasa la funcion de retrollamada a la que llamar cuando
//-- se recibe un dato
const sp = new SerialPanel(serial_cmd);

//-- Obtener los botones de Reset y Sync
const butReset = document.getElementById("butReset");
const butSync = document.getElementById("butSync");

//-- Obtener todos los LEDs
const leds_el = document.getElementsByClassName("Led");

//-- Dispositivos de salida: LEDs
let outputbits = [];

//-- Añadir los LEDs
for (let item of leds_el) {
  let led = new Led(item);
  outputbits.push(led);
}

//-- Leer los identificadores de los elementos
//-- de salida y colocarlos en las etiquetas
//-- encima de ellos
for (let led of outputbits) {
  let led_label = led.element.previousElementSibling;
  led_label.innerHTML = "<b>" + led.varid + "</b>"
}

//-- Establecer la funcion de retrollamada cuando
//-- el puerto serie se ha abierto
sp.onconnect = () => {
  console.log("Debug: Panel: Conectados!!");

  //-- Activar los botones de Reset y Sync
  butReset.disabled = false;
  butSync.disabled = false;

  //-- Cambiar el estado de los elementos de entrada a enable
  for (let led of outputbits) {

    led.enable()

    //-- Al arrancar enviamos el estado 0 a todos
    led.off();
  }

  //-- Llevar el foco al boton de reset
  butReset.focus();
}

sp.ondisconnect = () => {
  console.log("Debug: Panel: Desconectar...")

  //-- Deshabilitar Los botones de Reset y Sync
  butReset.disabled = true;
  butSync.disabled = true;

  //-- Al desconectar, se ponen a cero todos los elementos
  //-- de entrada y se deshabilitan
  for (let led of outputbits) {
    led.off();
    led.disable();
  }

}

//-- Acceder al LED0 del panel
const led0 = outputbits[0];

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

  //-- Actuar sobre los LEDs
  for (let led of outputbits) {

    //-- Leer el bit de la variable binaria,
    //-- si se ha recibido el comando correcto
    let bit = bitvar(cmd, led.varid)

    //-- Actuar sobre el LED del panel si se ha recibido el bit
    if (bit) {
      console.log("Bit: " + bit)
      led.set(bit);
    }
  }



}
