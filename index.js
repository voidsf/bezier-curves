
var pointerX=-1;
var pointerY=-1;

var canvas;
var crect;
var ctx;

var factor = 0;

var mouseDown = false;
var mouseGrabbed = false;
var pointGrabbed = null;

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


window.onload = function init(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  crect = canvas.getBoundingClientRect();

  ctx.textAlign = "center";
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


setInterval(mainLoop, 20);
function mainLoop(){
  console.log(point1.x + " " + point1.y);
  console.log(mpoint1.x + " " + mpoint1.y);

  if (!mouseDown){canvas.style.cursor = "auto";}
  ctx.fillStyle = '#eee';
  ctx.fillRect(0,0,400,400);

  factor = Math.min(1, factor + 0.001);
  updateLerps(midpoints, factor);
  updateLerps(mms, factor);
  updateLerps(mmm, factor);





  for (var p in points){
    ctx.beginPath();
    ctx.fillStyle = "#000000";
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
    if (pointGrabbed != null){
      movePointToMouse(pointGrabbed);
    }
    if (!mouseDown) {
      pointGrabbed = null;
    }

    ctx.fillRect(points[p].x-8, points[p].y-8, 16,16);

    ctx.font = "10px Comic Sans MS";
    ctx.fillStyle='black';
    ctx.fillText(points[p].name, points[p].x, points[p].y - 20);

    ctx.fill();
  }
  for (var p in midpoints){
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(midpoints[p].x-4, midpoints[p].y-4, 8, 8);
  }
  for (var p in mms){
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(mms[p].x-4, mms[p].y-4, 8, 8);
  }
  ctx.fillStyle = "#00ffff";
  ctx.fillRect(mmm1.x-4, mmm1.y-4, 8,8);

}

function movePointToMouse(point){
  point.x = Math.floor(Math.max(8,Math.min(392, pointerX)));
  point.y = Math.floor(Math.max(8,Math.min(392, pointerY)));
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
