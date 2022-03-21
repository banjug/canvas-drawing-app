// salva il canvas nella costante
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// pulsanti
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const brushSizeElement = document.getElementById("brushSizeElement");
const colorElement = document.getElementById("colorElement");
const clearElement = document.getElementById("clearElement");
const fillElement = document.getElementById("fillElement");

// ----------------------------------------------------
// dimensione del pennello
let brushSize = 10; // default
increaseBtn.addEventListener("click", () => {
  // al click aumenta fino a 50
  brushSize += 5;
  if (brushSize > 50) {
    brushSize = 50;
  }
  updateBrushSizeElement();
});
decreaseBtn.addEventListener("click", () => {
  // al click diminuisce fino a 5
  brushSize -= 5;
  if (brushSize < 5) {
    brushSize = 5;
  }
  updateBrushSizeElement();
});
function updateBrushSizeElement() {
  // mostra il valore della dimensione del pennello in pagina
  brushSizeElement.innerText = brushSize;
}

// ----------------------------------------------------
// colore del pennello
let fillColor = "black";
colorElement.addEventListener("change", (e) => {
  // al cambio dell'imput cambia il colore
  fillColor = e.target.value;
});

// ----------------------------------------------------
// variabili di appoggio per il click del mouse
let isPressed = false;
let x = undefined;
let y = undefined;

canvas.addEventListener("pointerdown", () => {
  // se il mouse è premuto all'interno del canvas salva le coordinate
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});
canvas.addEventListener("pointerup", () => {
  // quando non è più cliccato le svuota
  isPressed = false;
  x = undefined;
  y = undefined;
});

function brush(x, y) {
  // funzione che crea il cerchio del pennello
  context.beginPath();
  context.arc(x, y, brushSize, 0, 2 * Math.PI); // coordinate del click, dimensione impostata prima, dove inizia e dove finisce il contorno del cerchio (da 0 gradi a 2*PI gradi cioé un cerchio completo
  context.fillStyle = fillColor;
  context.fill();
}
function brushStroke(x1, y1, x2, y2) {
  // funzione che crea la linea che collega i vari cerchi
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.strokeStyle = fillColor;
  context.lineWidth = brushSize * 2;
  context.stroke();
}
canvas.addEventListener("pointermove", (e) => {
  // se il mouse è cliccato e viene spostato all'interno del canvas salva le coordinate finali
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    brush(x, y); // crea il cerchio alla posizione iniziale
    brushStroke(x, y, x2, y2); // crea la linea tra la posizione iniziale e finale
    // sostituisce le coordinate iniziali con quelle finali per continuare a disegnare
    x = x2;
    y = y2;
  }
});

// ----------------------------------------------------
fillElement.addEventListener("click", () => {
  // al click riempie il canvas del colore selezionato
  context.fillStyle = fillColor;
  context.fillRect(0, 0, canvas.width, canvas.height);
});
clearElement.addEventListener("click", () => {
  // al click svuota il canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
});

// ----------------------------------------------------
function downloadImage() {
  //al click scarica l'immagine contenuta nel canvas
  image = canvas.toDataURL("image/png"); // salva l'immagine come png
  var link = document.createElement("a"); // crea un link che reinderizza al download del file e lo clicca
  link.download = "capolavoro.png";
  link.href = image;
  link.click();
}
