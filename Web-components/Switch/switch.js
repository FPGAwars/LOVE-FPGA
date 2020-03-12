//-- Modulo SWITCH
//-- Para activar el switch se hace que pertenezca a la clase switch_on

class Switch {
  constructor(swid, onswitch) {
    this.element = document.getElementById(swid)

    //-- Clase para activar el switch
    //-- Definida en switch.css
    this.CLASS_ON="switch_on";

    //-- Funcion de retrollamada
    this.onswitch = onswitch;

    //-- Doble click
    /*
    this.element.ondblclick = (ev) => {
      console.log("DOBLE!!!!!");

      ev.preventDefault();
      ev.stopPropagation();
    }*/

    this.element.onclick = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      this.toggle();

    }
  }

  toggle() {
    this.element.classList.toggle(this.CLASS_ON);
    this.onswitch(this.get());
  }

  on() {
    this.element.classList.add(this.CLASS_ON);
    this.onswitch(this.get());
  }

  off() {
    this.element.classList.remove(this.CLASS_ON);
    this.onswitch(this.get());
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
