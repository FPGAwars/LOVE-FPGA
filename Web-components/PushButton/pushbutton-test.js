console.log("Ejecutando JS...");

const btn = new PushButton("btn", change);
const led = new Led("led");

function change(s)
{
  console.log("Toggle!!!!: " + s);
  led.set(s);
}
