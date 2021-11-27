
var pointerX=-1;
var pointerY=-1;
var running = false;
var canvas;
var crect;
var ctx;

window.onload = function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  crect = canvas.getBoundingClientRect();

}

document.onmousemove = function(event){
  pointerX = event.pageX - crect.left;
  pointerY = event.pageY - crect.top;
}
setInterval(mainLoop, 20);
function mainLoop(){
  ctx.beginPath();
  ctx.rect(0,0,400,400);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.beginPath();
  ctx.rect(pointerX, pointerY, 10,10);
  ctx.fillStyle = 'green';
  ctx.fill();

}
