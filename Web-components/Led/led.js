//-- Modulo LED

class Led {
  constructor(ledid) {
    this.element = document.getElementById(ledid)
    console.log("Led creado!");
  }

  toggle() {
    this.element.classList.toggle("ledon");
    console.log("LED: Toggle!");
  }

  on() {
    this.element.classList.add("ledon");
    console.log("LED: on")
  }

  off() {
    this.element.classList.remove("ledon");
    console.log("LED: off")
  }

  set(state) {
    if (state == '1') {
      this.on();
    } else if (state == '0') {
      this.off();
    }
  }

  get() {
    if (this.element.classList.contains("ledon")) {
      return "1"
    } else {
      return "0"
    }
  }
}
