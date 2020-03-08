// -- Panel serie, para acceder al puerto serie
class SerialPanel {
  //-- serial_cmd: Funcion de retrollamada de comando recibido
  constructor(msg_serialId, butSerialId, serial_cmd) {

    //-- Puerto serie
    this.port = null;

    //-- Lector del stream de entrada
    this.reader = null;

    //-- Stream de entrada codificado
    this.inputDone = null;

    //-- Stream de salida
    this.outputDone = null;

    //-- Stream de entrada
    this.inputStream = null;

    //-- Buffer con los datos recibidos del puerto serie
    this.buff = "";

    //-- Mensaje de error: Puerto serie no soportado
    this.notSupported = document.getElementById(msg_serialId);

    //-- Botón de conexion al puerto serie
    this.butSerial = document.getElementById(butSerialId);

    //-- Función de retrollamada de comando recibido
    this.serial_cmd = serial_cmd;

    //-- Comprobar si el navegador soporta puerto serie
    if ('serial' in navigator) {

      //-- Mantener oculto el mensaje de error
      this.notSupported.hidden = true

      //-- Activar el boton de conectar
      this.butSerial.disabled = false;
    }

    //-- RETROLLAMADA DEL BOTON DE CONEXION
    this.butSerial.addEventListener('click', this.clickConnect.bind(this));
  }

  //-- Retrollamada del botón de Conexión al puerto serie
  async clickConnect() {

    //-- Si ya estaba abierto el puerto serie
    //-- Lo cerramos
    if (this.port) {
      await this.disconnect();

      //-- Cambiar el estado de la interfaz
      this.butSerial.textContent = '🔌Conectar';

      return;
    }

    //-- Abrir puerto serie y conectarse
    await this.connect();

    //-- Activar la interfaz
    this.butSerial.textContent = '🔌Desconectar';
  }

  //---------------------------------------------------------
  //-- SE HA APRETADO EL BOTON DE conectar
  //----------------------------------------------------------

  async connect() {
    //-- Solicitar puerto serie al usuario
    //-- Se queda esperando hasta que el usuario ha seleccionado uno
    sp.port = await navigator.serial.requestPort();

    // - Abrir el puerto serie. Se espera hasta que este abierto
    await sp.port.open({ baudrate: 115200 });

    //-- Configurar el stream de salida
    //-- Es outputStream. Antes se pasa por un codificador de texto
    //-- y de ahí sale por el puerto serie
    const encoder = new TextEncoderStream();
    sp.outputDone = encoder.readable.pipeTo(sp.port.writable);
    sp.outputStream = encoder.writable;

    //-- Configurar el stream de entrada. Se pasa primero por un
    //-- decodificador de texto y luego se reciben los caracteres
    let decoder = new TextDecoderStream();
    sp.inputDone = sp.port.readable.pipeTo(decoder.writable);

    //-- La informacion se lee desde el lector reader
    this.reader = decoder.readable.getReader();

    //-- Bucle principal de lectura
    //-- Se procesan los caracteres recibidos
    //-- y se escriben en el estado del boton en la gui
    this.readLoop();
  }

  //-----------------------------------
  //-- Cerrar el puerto serie
  //-----------------------------------
  async disconnect() {

    // -- Cerrar el stream de entrada (lector)
      if (this.reader) {
        await this.reader.cancel();
        await this.inputDone.catch(() => {});
        this.reader = null;
        this.inputDone = null;
      }

    // -- Cerrar el stream de salida
    if (this.outputStream) {
      await this.outputStream.getWriter().close();
      await this.outputDone;
      this.outputStream = null;
      this.outputDone = null;
    }

    // -- Cerrar el puerto serie
    await this.port.close();
    this.port = null;
  }

  //------------------------------------------
  //-- Bucle principal de lectura
  //-----------------------------------------
  async readLoop() {

    //-- Se ejecuta indefinidamente
    //-- hasta que stream de entrada desaparezca
    while (true) {

      //-- Leer el valor del stream de entrada
      const { value, done } = await this.reader.read();

      //-- El stream se ha eliminado
      if (done) {
        console.log('[readLoop] DONE', done);
        this.reader.releaseLock();
        break;
      }

      //--Debug
      //console.log("Redeived: " + value);

      //--Llamar a la funcion de procesado de datos
      if (value) {
        this.serial_received(value)
      }
    }
  }

  //----------------------------------------
  //-- Escritura por el puerto serie
  //----------------------------------------
  serial_write(cmd) {

    //-- Obtener el escritor para poder enviar datos de salida
    const writer = outputStream.getWriter();

    //-- Enviar la cadena pasada como parametro
    writer.write(cmd);

    //-- Debug
    console.log('[SEND]', cmd);

    //-- Liberar el stream
    writer.releaseLock();
  }

  //-- Función de retrollamada de datos recibidos
  serial_received(data)
  {
    //-- Los datos que llegan se añaden al buffer
    this.buff += data;

    //-- Si en el buffer NO hay caracteres \n entonces
    //-- no ha llegado un comando completo. No hacer nada
    if (!this.buff.includes('\n'))
      return

    //-- Mientras haya caracteres \n en el buffer, hay comandos
    //-- pendientes de procesar
    while (this.buff.includes('\n')) {

      //----- Obtener el comando
      //--- En cmd se mete el comando
      //--- En buff se deja el resto
      //-- Detectar el caracter final del comando: \n
      let lf = this.buff.indexOf('\n');
      let cmd = this.buff.slice(0, lf);
      this.buff = this.buff.substring(lf+1);

      //-- Procesar el comando recibido

      //console.log("Buff: " + this.buff + " Lenght: " + this.buff.length)
      //-- Funcion de retrollamada de procesamiento del comando
      this.serial_cmd(cmd);

    }
  }


}