//-- Modulo LED
//-- Para activar led se hace que pertenezca a la clase ledon

class Led {
  constructor(ledid) {
    this.element = document.getElementById(ledid)

    //-- Clase para activar led
    //-- Definida en led.css
    this.CLASS_ON="ledon";
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
