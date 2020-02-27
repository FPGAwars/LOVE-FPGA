const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB1', {
  baudRate:115200
});

const Readline = SerialPort.parsers.Readline
const parser = new Readline()

port.pipe(parser)
parser.on('data', console.log)
