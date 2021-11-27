
var pointerX=-1;
var pointerY=-1;
var running = false;
var canvas;
var ctx;

function pressed(){
  if (!running){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    running = true;
  }
  alert("doing something");




}

function x1change(val){
  pressed();
}

document.onmousemove = function(event){
  pointerX = event.pageX;
  pointerY = event.pageY;
}
setInterval(pointerCheck, 50);
function pointerCheck(){
  console.log("Cursor at" + pointerX +" "+ pointerY);
  if (running) {
    ctx.beginPath();
    ctx.rect(pointerX, pointerY, 10,10);
    ctx.fillStyle = 'green';
    ctx.fill();
  }
}
