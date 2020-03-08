const boton = document.getElementById("boton");

eye = new Eye("eye")

boton.onclick = () => {
  eye.toggle();
}
