const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB1', {
  baudRate:115200
});

port.write('t\n');
