sw = new Switch("sw", toggle);
led = new Led("led");

function toggle(s)
{
  console.log("Toggle!!!!: " + s);
  led.set(s);
}
