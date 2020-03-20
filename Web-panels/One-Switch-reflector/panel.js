let sw = false;

function toggle(s) {
  console.log("Toggle!!!!: " + s);
  lbus.send("a" + s + "\n");
}

function serial_cmd(data)
{

  let cmdList = lbus.parseASCIICmd(data);

  cmdList.forEach(function(cmd) {
      //-- Degbug
    console.log("Comand: " + cmd + " Length: " + cmd.length);

  });

}



let lbus = new BusReflector();
let bconnect = document.getElementById('butSerial');
let connected = false;
bconnect.addEventListener('click', function () {


  if (connected) {
    lbus.disconnect();
    connected = false;
    this.textContent = '🔌Conectar';

  } else {
    let leIP = document.getElementById('reflector-ip');
    let serverIP = leIP.value.trim();
    if (serverIP.length > 0) {
      connected = true;
      this.textContent = '🔌Desconectar';
      lbus.connect(serverIP, 9999);
      lbus.subscribe('all', serial_cmd);
      if (sw === false) sw = new Switch("sw", toggle);

    }

  }

});