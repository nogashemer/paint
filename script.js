
var isDrawing = false;
var x = 0;
var y = 0;
var check = 0;
var usePen = true;


var canvas = document.getElementById('canvas');
var colorsBar = document.getElementById('colors-bar');
var navBar = document.getElementById('nav-bar');
var penColor = "black";



// pick color

function colorMaker() {
  var someColor = document.createElement("div");
  someColor.classList.add("someColorClass");
  colorsBar.appendChild(someColor);
};


// paint

canvas.addEventListener('mousedown', e => {
  x = e.clientX;
  y = e.clientY;
  isDrawing = true;
});

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    drawLine(x, y, e.clientX, e.clientY);
    x = e.clientX;
    y = e.clientY;
  }
});

document.addEventListener('mouseup', e => {
  if (isDrawing === true) {

    isDrawing = false;
  }
});

function calcC(x1, y1, x2, y2) {
  var thex = x2 - x1;
  var they = y2 - y1;
  var c = Math.sqrt(thex * thex + they * they);
  console.log(c)
  return c;
}

function getAngle(x1, y1, x2, y2) {
  var deg = 0;

  deg = (Math.atan((y2 - y1) / (x2 - x1))) * 180 / Math.PI;
  if ((x2 - x1) == 0) {
    deg = 90;
  } else if (isNaN(deg)) {
    deg = 0;
  };
  return deg;
};

function drawLine(x1, y1, x2, y2) {
  var newPixel = document.createElement("div");
  newPixel.classList.add("pixelClass");
  canvas.appendChild(newPixel);
  newPixel.style.top = `${y2 - (Math.abs(y2 - y1) / 2)}px`;
  newPixel.style.left = `${x2 - (calcC(x1, y1, x2, y2) * 1.1) / 2}px`;
  var angle = getAngle(x1, y1, x2, y2);
  newPixel.style.transform = `rotate(${angle}deg)`;
  newPixel.style.width = calcC(x1, y1, x2, y2) * 1.1 + "px";
  newPixel.style.backgroundColor = penColor;

};

// buttons
function newCanvas() {
  var newCanvas = document.createElement("div");
  newCanvas.classList.add("btnClass");
  navBar.appendChild(newCanvas);
  newCanvas.style.backgroundImage = 'url("./x.png")';

  newCanvas.addEventListener('click', function () {
    canvas.innerHTML = "";
  }
  )
};

function canvasSize(size) {
  var Btn = document.createElement("div");
  Btn.classList.add("btnClass");

  var input = document.createElement("input");
  var px = document.createElement("span");
  px.innerText = "px";
  px.classList.add("pxClass");

  input.placeholder = `${size}`;
  Btn.appendChild(input);
  Btn.appendChild(px);
  navBar.appendChild(Btn);


  input.addEventListener("input", function () {
    input.style.color = ('black');
    canvas.innerHTML = "";
    if (size == "width") {
      canvas.style.width = (`${input.value}px`);
      if (input.value === "") {
        canvas.style.width = (``);
      } else if (isNaN(input.value)) {
        input.style.color = ('red');
      }
    } else if (size == "height") {
      canvas.style.height = (`${input.value}px`);
      if (input.value === "") {
        canvas.style.height = (``);
      } else if (isNaN(input.value)) {
        input.style.color = ('red');
      }
    }

  });

};

// generate colors bar
function addColor(hexColor) {
  var color = document.createElement("div");
  color.classList.add("btnClass");
  colorsBar.appendChild(color);
  color.style.backgroundColor = `${hexColor}`;
  color.addEventListener('click', function () {
    penColor = `${hexColor}`;
  }
  )
};

addColor("salmon");
addColor("#ff5a36");
addColor("#cecb24");
addColor("#39a78e");
addColor("#c3a278");
addColor("#8e518d");
addColor("#74647e");
addColor("#81d8d4");
addColor("#159e96");


newCanvas();
canvasSize("width");
canvasSize("height");










