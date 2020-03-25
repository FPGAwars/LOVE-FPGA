//-- Modulo PUSHBUTTON

class PushButton {
  constructor(swid, onswitch) {
    this.element = document.getElementById(swid)

    //-- Clase para activar el switch
    //-- Definida en switch.css
    this.CLASS_ON="pushbutton_on";

    //-- Funcion de retrollamada
    this.onswitch = onswitch;

    //-- Cargar elemento de audio
    this.click = new Audio('click.mp3');

    //-- Boton apretado
    this.element.onmousedown = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.make_click();
      this.on();
    }

    //-- Botón liberado
    this.element.onmouseup = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.make_click();
      this.off();
    }


  }

  //-- Hacer que suene el click
  make_click() {
    this.click.currentTime = 0;
    this.click.play();
  }

  on() {
    this.element.classList.add(this.CLASS_ON);
    this.onswitch(this.get());
    console.log("Presss!!!!");
  }

  off() {
    this.element.classList.remove(this.CLASS_ON);
    this.onswitch(this.get());
    console.log("Release!!!");
  }

  set(state) {
    if (state == null) return;
    if (state == '1') {
      this.on();
    } else if (state == '0') {
      this.off();
    }
  }

  get() {
    if (this.element.classList.contains(this.CLASS_ON)) {
      return "1"
    } else {
      return "0"
    }
  }
}
