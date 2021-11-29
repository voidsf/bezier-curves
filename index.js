
var pointerX=-1;
var pointerY=-1;

var canvas;
var crect;
var ctx;

var factor = 0;

var mouseDown = false;
var mouseGrabbed = false;
var pointGrabbed = null;

var linesVisible = false;

let point1 = {
  //name for debugging purposes only
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
let point4 = {
  name : "point4",
  x : 250,
  y : 100,
}

let mpoint1 = lerp(point1, point2, factor);
let mpoint2 = lerp(point2, point3, factor);
let mpoint3 = lerp(point3, point4, factor);

let mm = lerp(mpoint1, mpoint2, factor);
let mm2 = lerp(mpoint2, mpoint3, factor);

let mmm1 = lerp(mm, mm2, factor);

let points = [point1, point2, point3, point4];
let midpoints = [mpoint1, mpoint2, mpoint3];
let mms = [mm, mm2];
let mmm = [mmm1];

var path;

window.onload = function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  crect = canvas.getBoundingClientRect();

  ctx.textAlign = "center";

  path = calcCurve(50);

  document.getElementById("checkbox").checked = false;

}

document.onmousemove = function(event){
  pointerX = event.pageX - crect.left;
  pointerY = event.pageY - crect.top;
}
document.onmousedown = function(event){
  mouseDown = true;

}
document.onmouseup = function(event){
  mouseDown = false;

}
function switchLines(){

  if (linesVisible){
    linesVisible = false;}
  else {    linesVisible = true;}
}

setInterval(mainLoop, 20);
function mainLoop(){



  ctx.fillStyle = '#eee';
  ctx.fillRect(0,0,400,400);

  if (linesVisible){
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#aaa";
    ctx.beginPath();
    ctx.moveTo(points[2].x, points[2].y);
    ctx.lineTo(points[3].x, points[3].y);
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();

  }

  ctx.lineWidth = 4;
  ctx.strokeStyle = "#000";

  ctx.stroke(path);



  for (var p in points){
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    if (p==0||p==3){
      if (Math.abs(pointerX-8 - points[p].x) <= 8 && Math.abs(pointerY-8 - points[p].y) <= 8){
        ctx.fillStyle = "#aaaaff";
        if (!mouseDown) {canvas.style.cursor = "pointer";}

        if (mouseDown&& canvas.style.cursor == "pointer" && pointGrabbed == null){
          pointGrabbed = points[p];
        }
      }
      else{
        ctx.fillStyle = "#000088";
      }
    }
    else {
      if (Math.abs(pointerX-8 - points[p].x) <= 8 && Math.abs(pointerY-8 - points[p].y) <= 8){
        ctx.fillStyle = "#ffaaaa";
        if (!mouseDown) {canvas.style.cursor = "pointer";}

        if (mouseDown&& canvas.style.cursor == "pointer" && pointGrabbed == null){
          pointGrabbed = points[p];
        }
      }
      else{
        ctx.fillStyle = "#880000";
      }
    }
    if (pointGrabbed != null){
      movePointToMouse(pointGrabbed);
    }
    if (!mouseDown) {
      pointGrabbed = null;
    }
    if (p==0||p==3){
    ctx.fillRect(points[p].x-8, points[p].y-8, 16,16);}
    else{
      ctx.fillRect(points[p].x-5,points[p].y-5, 10,10);
    }
  }




}

function calcCurve(depth){
  var path = new Path2D();
  path.moveTo(point1.x, point1.y);
  for (var factor = 0; factor <= 1; factor += 1/depth){
    updateLerps(midpoints, factor);
    updateLerps(mms, factor);
    updateLerps(mmm, factor);


    path.lineTo(mmm1.x, mmm1.y);
  }
  path.lineTo(point4.x, point4.y);

  return path;
}

function movePointToMouse(point){
  point.x = Math.floor(Math.max(8,Math.min(392, pointerX)));
  point.y = Math.floor(Math.max(8,Math.min(392, pointerY)));

  path = calcCurve(50);
}

function lerp(point1, point2, factor){
  var newpoint = {
    parentpoints: [point1, point2],
    x : point1.x + (point2.x-point1.x) * factor,
    y : point1.y + (point2.y-point1.y) * factor
  }
  return newpoint;
}

function updateLerps(points, factor){
  for (var p in points){
    points[p].x = points[p].parentpoints[0].x + (points[p].parentpoints[1].x - points[p].parentpoints[0].x) * factor;
    points[p].y = points[p].parentpoints[0].y + (points[p].parentpoints[1].y- points[p].parentpoints[0].y) * factor;
  }
}
