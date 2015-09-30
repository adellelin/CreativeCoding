// the sketch draws a diamond one by one across the screen
// filling each line progressively until the image is filled
// and then starts again from the top

var pos1 = 0;
var pos2 = 5;
var pos3 = 10;
var pos4 = -5;
var pos5 = 0;
var pos6 = 5;
var mult = 3;
var xShift = 10;
var x = 0;

function setup() {
  createCanvas(585, 585);
  noStroke();
  frameRate(40);
}

function draw() {
  //background(255);
  // shifts the entire drawing up to eliminate white space
  
  // if(mouseIsPressed == true) {
  //   x += 1;

  translate(0,-15);
  scale(mult);
  
// continuously shift x position by 10 for 20 frame counts and then start again
  var xShift = pos3 * (frameCount % 21 - 1);
  var yShift = 0;
  fill(255, random(1)*200, 255);

// drawing the even rows of diamonds, after the first 20 frames 
// shift the y coordinates down by 10, draw for 20 frames,
// break for 20 frames, then shift coordinates down by 10, draw for 20 frames
// frames are 21-40, 62-81, 103-122 etc.
// these are odd multiples of 20, therefore j = 1, 3, 5, 7, etc.
  for (j = 1; j < 40; j += 2) {
    fill(255, random(1)*200, 255);
    if (frameCount > (20 * j + (j - 1))) {
      yShift += 10; 
      diamondDraw2();
    }
  }
  
// drawing the odd rows of diamonds, same as above but during frames
// 42-61, 83-102 etc. so we use multiples of 40 for framecount
  for (i = 0; i < 20; i++) {
    fill(255, random(1)*200, 255);
    if (frameCount > 41 * i + (i - 1)) {
      var yShift = 10 * i;
      diamondDraw();
    }
  }
// }
function diamondDraw() {
   quad(pos1 + xShift, pos2 + yShift, pos2 + xShift, pos1 + yShift, pos3 + xShift,
        pos2 + yShift, pos2 + xShift, pos3 + yShift);
}

function diamondDraw2() {
  quad(pos4 + xShift, pos5 + yShift, pos5 + xShift, pos4 + yShift, pos6 + xShift,
        pos5 + yShift, pos5 + xShift, pos6 + yShift);
}
}