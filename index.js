
var pointerX=-1;
var pointerY=-1;

var canvas;
var crect;
var ctx;

var mouseDown = false;
var mouseGrabbed = false;
var pointGrabbed = null;

let point1 = {
  name : "point1",
  x : 100,
  y : 100,

};
let point2 = {
  name : "point2",
  x : 200,
  y : 200,

};
let point3 = {
  name : "point3",
  x : 150,
  y : 50,

}

var points = [point1, point2, point3];

window.onload = function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  crect = canvas.getBoundingClientRect();

}

document.onmousemove = function(event){
  pointerX = event.pageX - crect.left;
  pointerY = event.pageY - crect.top;
}
document.onmousedown = function(event){
  mouseDown = true;
  console.log("mouse pressed");
}
document.onmouseup = function(event){
  mouseDown = false;
  console.log("mouse unpressed");
}
setInterval(mainLoop, 20);
function mainLoop(){

  if (!mouseDown){canvas.style.cursor = "auto";}
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,400,400);

  ctx.beginPath();

  for (var p in points){
    ctx.fillStyle = "#000000";
    if (Math.abs(pointerX - points[p].x) <= 8 && Math.abs(pointerY - points[p].y) <= 8){
      ctx.fillStyle = "#aaaaff";
      if (!mouseDown) {canvas.style.cursor = "pointer";}

      if (mouseDown&& canvas.style.cursor == "pointer" && pointGrabbed == null){
        console.log("button " + p + " is clickable");
        pointGrabbed = points[p];
      }
    }
    else{
      ctx.fillStyle = "#000088";
    }
    if (pointGrabbed != null){
      movePointToMouse(pointGrabbed);
    }
    if (!mouseDown) {
      pointGrabbed = null;
    }

    ctx.fillRect(points[p].x - 8, points[p].y - 8, 16,16);
    ctx.fill();
    ctx.beginPath();

  }
}

function movePointToMouse(point){
  point.x = pointerX;
  point.y = pointerY;
}
