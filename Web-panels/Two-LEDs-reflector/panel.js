//-- Identificador de la variable bit a monitorizar en el LED0
const VARBIT0 = 'a'
const VARBIT1 = 'b'

//-- Obtener el panel serie
//-- Se pasan como argumentos los identificadores HTML del mensaje de
//-- deteccion del puerto serie y del botón de conectar
//-- El último es la función de retrollamada de cuando se recibe un
//-- comando
//const sp = new SerialPanel('msg_serial', 'butSerial', serial_cmd)

//-- Acceder al LED0 del panel
const led0 = new Led("led0")
//-- Acceder al LED1 del panel
const led1 = new Led("led1")

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
//-- El comando recibido puede recibir el \n final y
//-- puede ser una secuencia de comandos separados por \n
function serial_cmd(data)
{

  let cmdList = lbus.parseASCIICmd(data);

  cmdList.forEach(function(cmd) {
      //-- Degbug
    console.log("Comand: " + cmd + " Length: " + cmd.length);

      //-- Establecer el valor de los LEDs
      led0.set(bitvar(cmd, VARBIT0));
      led1.set(bitvar(cmd, VARBIT1));
  });

}

let lbus = new BusReflector();
let bconnect = document.getElementById('butSerial');
let connected =false;
bconnect.addEventListener('click', function(){

    
    if(connected){
        lbus.disconnect();
        connected = false;
        this.textContent = '🔌Conectar';

    }else{
        let leIP = document.getElementById('reflector-ip');
        let serverIP=leIP.value.trim();
        if(serverIP.length>0){
            connected = true;
            this.textContent = '🔌Desconectar';
            lbus.connect(serverIP,9999);
            lbus.subscribe('all',serial_cmd);
        }

    }

});

