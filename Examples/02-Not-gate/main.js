//-- Puerto serie
let port;

//-- Lector del stream de entrada
let reader;

//-- Stream de entrada codificado
let inputDone;

//-- Stream de salida
let outputDone;

//-- Stream de entrada
let inputStream;

//-- Mensaje de error: Puerto serie no soportado
const notSupported = document.getElementById('display_err_not_serial');

//-- Botón de conexion al puerto serie
const butConnect = document.getElementById('butConnect');

//-- DisplayBit
const displaybit = document.getElementById('displaybit');

//-- InputBit buttons
const bit0 = document.getElementById('bit0');
const bit1 = document.getElementById('bit1');
const inputBit = document.getElementById('inputBit');

//------------------------------------------------------
//-- PUNTO DE ENTRADA
//------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  //-- RETROLLAMADA DEL BOTON DE CONEXION
  butConnect.addEventListener('click', clickConnect);

  //-- Comprobar si el navegador soporta puerto serie
  if ('serial' in navigator) {

    //-- Mantener oculto el mensaje de error
    notSupported.hidden = true

    //-- Activar el boton de conectar
    butConnect.disabled = false;

  }
});


//---------------------------------------------------------
//-- SE HA APRETADO EL BOTON DE conectar
//----------------------------------------------------------

async function clickConnect() {

  //-- Si ya estaba abierto el puerto serie
  //-- Lo cerramos
  if (port) {
    await disconnect();

    //-- Cambiar el estado de la interfaz
    butConnect.textContent = '🔌Conectar';
    bit0.disabled = true;
    bit1.disabled = true;
    inputBit.classList.add("w3-opacity-max");
    inputBit.innerHTML = '?'
    displaybit.disabled = true;
    displaybit.classList.add("w3-opacity-max");
    displaybit.innerHTML = '?'

    return;
  }

  //-- Abrir puerto serie y conectarse
  await connect();

  //-- Activar la interfaz
  butConnect.textContent = '🔌Desconectar';
  bit0.disabled = false;
  bit1.disabled = false;
  inputBit.classList.remove("w3-opacity-max")

  displaybit.classList.remove("w3-opacity-max")

  //-- Boton de Bit a 0 pulsado
  bit0.onclick = () => {
    writeToStream('0\n');
    inputBit.innerHTML = '0';
  }

  //-- Boton de Bit a 1 pulsado
  bit1.onclick = () => {
    writeToStream('1\n');
    inputBit.innerHTML = '1';
  }

}

//--------------------------------
//-- Abrir el puerto serie
//--------------------------------
async function connect() {

  //-- Solicitar puerto serie al usuario
  //-- Se queda esperando hasta que el usuario ha seleccionado uno
  port = await navigator.serial.requestPort();

  // - Abrir el puerto serie. Se espera hasta que este abierto
  await port.open({ baudrate: 115200 });

  //-- Configurar el stream de salida
  //-- Es outputStream. Antes se pasa por un codificador de texto
  //-- y de ahí sale por el puerto serie
  const encoder = new TextEncoderStream();
  outputDone = encoder.readable.pipeTo(port.writable);
  outputStream = encoder.writable;

  //-- Configurar el stream de entrada. Se pasa primero por un
  //-- decodificador de texto y luego se reciben los caracteres
  let decoder = new TextDecoderStream();
  inputDone = port.readable.pipeTo(decoder.writable);

  //-- La informacion se lee desde el lector reader
  reader = decoder.readable.getReader();

  //-- Bucle principal de lectura
  //-- Se procesan los caracteres recibidos
  //-- y se escriben en el estado del boton en la gui
  readLoop();
}


//-----------------------------------
//-- Cerrar el puerto serie
//-----------------------------------
async function disconnect() {

  // -- Cerrar el stream de entrada (lector)
    if (reader) {
      await reader.cancel();
      await inputDone.catch(() => {});
      reader = null;
      inputDone = null;
    }

  // -- Cerrar el stream de salida
  if (outputStream) {
    await outputStream.getWriter().close();
    await outputDone;
    outputStream = null;
    outputDone = null;
  }

  // -- Cerrar el puerto serie
  await port.close();
  port = null;

}

function convert_bit(value)
{
  if (value == "1\n" || value == "1") {
    return "1"
  }
  else if (value == "0\n" || value == "0") {
    return "0"
  }
  return displaybit.innerText;
}

//------------------------------------------
//-- Bucle principal de lectura
//-----------------------------------------
async function readLoop() {

  //-- Se ejecuta indefinidamente
  //-- hasta que stream de entrada desaparezca
  while (true) {

    //-- Leer el valor del stream de entrada
    const { value, done } = await reader.read(2);

    //-- Hay un valor correcto: Mostrarlo en la gui
    if (value) {
      bit = convert_bit(value);
      displaybit.innerText = bit
      console.log(bit);
    }

    //-- El stream se ha eliminado
    if (done) {
      console.log('[readLoop] DONE', done);
      reader.releaseLock();
      break;
    }
  }
}

//----------------------------------------
//-- Escritura por el puerto serie
//----------------------------------------
function writeToStream(cmd) {

  //-- Obtener el escritor para poder enviar datos de salida
  const writer = outputStream.getWriter();

  //-- Enviar la cadena pasada como parametro
  writer.write(cmd);

  //-- Debug
  console.log('[SEND]', cmd);

  //-- Liberar el stream
  writer.releaseLock();
}
