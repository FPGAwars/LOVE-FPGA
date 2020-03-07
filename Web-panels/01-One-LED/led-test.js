
const sp = new SerialPanel('msg_serial', 'butSerial', serial_received2)
const led0 = new Led("led0")

function serial_received2(data)
{
  let bit = convert_bit(data);
  led0.set(bit);
  console.log(bit);
}


function convert_bit(value)
{
  if (value == "b1\n" || value == "1") {
    return "1"
  }
  else if (value == "b0\n" || value == "0") {
    return "0"
  }
  return "0";
}
