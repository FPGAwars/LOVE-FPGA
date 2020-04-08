//-- Modulo SWITCH
//-- Para activar el switch se hace que pertenezca a la clase switch_on

class Switch {
  constructor(swid, onswitch, audioid) {
    this.element = document.getElementById(swid)

    //-- Clases definidas en switch.css:
    //-- Para activar el switch
    this.CLASS_ON = "switch_on";

    //-- Para desactivar el switch
    this.CLASS_DISABLED = "switch_disabled";

    //-- Funcion de retrollamada
    this.onswitch = onswitch;

    //-- Cargar elemento de audio, si se le ha pasado
    if (audioid)
      this.click = document.getElementById(audioid)

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


      //-- Comprobar si el elemento está deshabilitado
      if (this.element.classList.contains(this.CLASS_DISABLED)) {
        //console.log("Disabled!!");
        return;
      }

      //-- Accionar el switch
      this.toggle();

    }
  }

  //-- Hacer que suene el click
  make_click() {
    if (this.click) {
      this.click.currentTime = 0;
      this.click.play();
    }
  }

  toggle() {
    this.element.classList.toggle(this.CLASS_ON);
    this.make_click();
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

  //-- Activar el switch
  enable() {
    this.element.classList.remove(this.CLASS_DISABLED);
  }
}
