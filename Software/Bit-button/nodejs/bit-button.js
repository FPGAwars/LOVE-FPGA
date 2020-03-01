const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyUSB1', {
  baudRate:115200
});

console.log("Enter the bit value + ENTER");

// -- Send 1
port.write('1\n');

//-- When the user input something...
process.stdin.on('data', (b) => {

  //-- Convert into a string
  let sb = String(b);

  //-- Only strings "1\n" and "0\n" are valid
  if (sb == "1\n" || sb == "0\n") {
    console.log("Bit: " + sb[0]);

    //-- Transmit the bit
    port.write(b);
  }

});
