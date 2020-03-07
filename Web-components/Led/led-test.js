const boton = document.getElementById("boton");

led0 = new Led("led0")
led1 = new Led("led1")

led1.on();

boton.onclick = () => {
  led0.toggle();
  led1.toggle();
}
