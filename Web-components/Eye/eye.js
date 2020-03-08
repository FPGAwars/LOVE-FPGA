//-- Modulo EYE
//-- El ojo por defecto está abierto (0)
//-- Para cerrarlo hay que hacer que pertenezca a la clase eyeoff

class Eye {
  constructor(id) {
    this.element = document.getElementById(id)

    //-- Clase para activar el Bit
    //-- Definida en eye.css
    this.CLASS_ON="eyeoff";
  }

  toggle() {
    this.element.classList.toggle(this.CLASS_ON);
  }

  on() {
    this.element.classList.add(this.CLASS_ON);
  }

  off() {
    this.element.classList.remove(this.CLASS_ON);
  }

  set(state) {
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
