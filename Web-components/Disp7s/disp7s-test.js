

console.log("Hola....");

const OFF = "#f9f9f9";
const ON = "red";

const sega = document.getElementById('sega');
const segb = document.getElementById('segb');
const segc = document.getElementById('segc');
const segd = document.getElementById('segd');
const sege = document.getElementById('sege');
const segf = document.getElementById('segf');
const segg = document.getElementById('segg');

const but1 = document.getElementById("but1")
const but2 = document.getElementById("but2")
const but3 = document.getElementById("but3")
const but4 = document.getElementById("but4")
const but5 = document.getElementById("but5")
const but6 = document.getElementById("but6")
const but7 = document.getElementById("but7")
const but8 = document.getElementById("but8")
const but9 = document.getElementById("but9")
const but0 = document.getElementById("but0")

function one()
{
  sega.setAttribute("fill", OFF);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", OFF);
  sege.setAttribute("fill", OFF);
  segf.setAttribute("fill", OFF);
  segg.setAttribute("fill", OFF);
}

function zero()
{
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", ON);
  sege.setAttribute("fill", ON);
  segf.setAttribute("fill", ON);
  segg.setAttribute("fill", OFF);
}


but1.onclick = () => {
  one();
}



but2.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", OFF);
  segd.setAttribute("fill", ON);
  sege.setAttribute("fill", ON);
  segf.setAttribute("fill", OFF);
  segg.setAttribute("fill", ON);
}

but3.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", ON);
  sege.setAttribute("fill", OFF);
  segf.setAttribute("fill", OFF);
  segg.setAttribute("fill", ON);
}

but4.onclick = () => {
  sega.setAttribute("fill", OFF);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", OFF);
  sege.setAttribute("fill", OFF);
  segf.setAttribute("fill", ON);
  segg.setAttribute("fill", ON);
}

but5.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", OFF);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", ON);
  sege.setAttribute("fill", OFF);
  segf.setAttribute("fill", ON);
  segg.setAttribute("fill", ON);
}

but6.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", OFF);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", ON);
  sege.setAttribute("fill", ON);
  segf.setAttribute("fill", ON);
  segg.setAttribute("fill", ON);
}

but7.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", OFF);
  sege.setAttribute("fill", OFF);
  segf.setAttribute("fill", OFF);
  segg.setAttribute("fill", OFF);
}

but8.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", ON);
  sege.setAttribute("fill", ON);
  segf.setAttribute("fill", ON);
  segg.setAttribute("fill", ON);
}

but9.onclick = () => {
  sega.setAttribute("fill", ON);
  segb.setAttribute("fill", ON);
  segc.setAttribute("fill", ON);
  segd.setAttribute("fill", OFF);
  sege.setAttribute("fill", OFF);
  segf.setAttribute("fill", ON);
  segg.setAttribute("fill", ON);
}


but0.onclick = () => {
 zero();
}


//-- Crear el switch a partir de su identificador
//-- Esta asociado a la variable a
sw = new Switch("swa", toggle);

//-- Funcion de retrollamada del switch
function toggle(varid, bitvalue)
{
  //-- Debug
  console.log("Toggle: " + varid + " " + bitvalue);

  if (bitvalue == "1")
    one();
  else {
    zero();
  }
}

zero();
