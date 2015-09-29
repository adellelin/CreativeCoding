var pos1 = 0;
var pos2 = 5;
var pos3 = 10;
var pos4 = -5;
var pos5 = 0;
var pos6 = 5;
var mult = 3;
var xShift = 10;

function setup() {
  createCanvas(585, 585);
  noStroke();
  frameRate(20);
}

function draw() {
  translate(0,-15);
  scale(mult);
  var xShift = pos3 * (frameCount % 21 - 1);
  var yShift = pos1;
  fill(255, random(1)*255, 255);
  quad(pos1 + xShift, pos2 + yShift, pos2 + xShift, pos1 + yShift, pos3 + xShift,
    pos2 + yShift, pos2 + xShift, pos3 + yShift);

  for (j = 1; j < 40; j += 2) {
    fill(255, random(1)*255, 255);
    if (frameCount > (20 * j + (j - 1))) {
      yShift += 10;
      quad(pos4 + xShift, pos5 + yShift, pos5 + xShift, pos4 + yShift, pos6 + xShift,
        pos5 + yShift, pos5 + xShift, pos6 + yShift);
    }
  }
  for (i = 1; i < 60; i++) {
    fill(255, random(1)*255, 255);
    if (frameCount > 41 * i + (i - 1)) {
      var yShift = pos3 * i;
      quad(pos1 + xShift, pos2 + yShift, pos2 + xShift, pos1 + yShift, pos3 + xShift,
        pos2 + yShift, pos2 + xShift, pos3 + yShift);
    }
  }

  //   fill(random(255), random(255), random(255));
  // if (frameCount > 62){
  // var yShift = pos3 * 2;
  // quad(pos4 + xShift, pos5 + yShift, pos5 + xShift, pos4 + yShift, pos6 + xShift, pos5 + yShift, pos5 + xShift, pos6 + yShift);
  // }

  // fill(random(255), random(255), random(255));
  // if (frameCount > 83){
  // var yShift = pos3 *2;
  // quad(pos1 + xShift, pos2 + yShift, pos2 + xShift, pos1 + yShift, pos3 + xShift, pos2 + yShift, pos2 + xShift, pos3 + yShift);
  // }
}