// game involving an expanding black hole
// brain generates items when clicking, when items hit the black hole
// black hole moves away until it disappears

var pos1 = 0;
var pos2 = 5;
var pos3 = 10;
var pos4 = -5;
var pos5 = 0;
var pos6 = 5;
var mult = 3;

var angle = -90;

var blackHole;
var solderIron;
var saw;
var hammer;
var wrench;
var adelle;
var time;
var sparkle;
var laugh;
var goodbye;
var sitar;
var stretch = 1;

function preload() {
  blackHole = loadImage("images/space2.png");
  solderIron = loadImage("images/Soldador.png");
  sawTool = loadImage("images/tools_saw.png");
  hammerTool = loadImage("images/tools_hammer.png");
  adelle = loadImage("images/adelleHead.png");
  sparkle = loadSound("sounds/royal-sparkle-whoosh.mp3");
  laugh = loadSound("sounds/highGiggle.mp3");
  goodbye = loadSound("sounds/goodbye.mp3");
  sitar = loadSound("sounds/Sitar.mp3");
}

function setup() {
  createCanvas(800, 800);
  noStroke();

  // create a sprite object and then add the image to it
  rectMode(CENTER);
  blackSprite = createSprite(width / 2, height / 9);
  blackSprite.addImage(blackHole);

  adelleSprite = createSprite(width / 2, height - 80);
  adelleSprite.scale = 0.4;
  //adelleSprite.rotation = 90;
  adelleSprite.addImage(adelle);

  // create group names, which can be accessed like arrays
  solderGroup = new Group();
  sawGroup = new Group();
  wrenchGroup = new Group();
  hammerGroup = new Group();
  clockGroup = new Group();

  //set volumee of soundclips
  sparkle.setVolume(0.2);
  laugh.setVolume(0.1);
  sitar.setVolume(0.05);
}

function draw() {

  //drawing the background graphic
  backgroundPattern();
  gameInstructions();

  if (frameCount < 30) {
    textSize(30);
    fill(255, 0, 127);
    textAlign(CENTER);
    text("WHY I MAKE THINGS", width / 2, 500);
  }

  // set the black hole to get larger with the framecount
  // also move the block hole down constantly by 1 unit
  blackSprite.scale = 1 + frameCount / 800;
  blackSprite.position.y += 1;
  if (blackSprite.position.y < -500) {
    blackSprite.remove();
  }

  if (keyWentDown("a")) {
    spawnSolder();
    sparkle.play();
  }

  if (keyWentDown("s")) {
    spawnSaw();
    laugh.play();
  }

  if (keyWentDown("d")) {
    spawnHammer();
    sitar.play();
  }

  // remove the sprites added to the group in the mousePressed function
  for (var i = 0; i < solderGroup.length; i++) {
    var solder = solderGroup[i];
    if (solder.position.y <= 10) {
      solder.remove();
    }

    // if the soldering iron collides with the clock, the iron gets moved  
    for (var j = 0; j < sawGroup.length; j++) {
      var saw = sawGroup[j];
      // saw.setCollider("circle", 0, 0, 30, 30);
      //saw.displace(solder);
      if (saw.position.y <= 10) {
        saw.remove();
      }

      for (var k = 0; k < hammerGroup.length; k++) {
        var hammer = hammerGroup[k];
        if (hammer.position.y <= 10) {
          hammer.remove();
        }

        // add all sprites into the allSprites group which is in built array
        // if any of the sprites overlap with the items being fired
        // the items get spread out
        for (var l = 0; l < allSprites.length; l++) {
          var mySprite = allSprites[i];
          if (mySprite.overlap(solder) || mySprite.overlap(saw) || mySprite.overlap(hammer)) {
            solder.velocity.x = random(-5, 5);
            saw.velocity.x = random(-10, 10);
            hammer.velocity.x = random(-5, 5);
          }
          if (mySprite.overlap(blackSprite)) {
            blackSprite.position.y -= 10;
            goodbye.play();
            mySprite.remove();
          }
        }
      }
    }
  }
  // create a large countdown clock in the background
  if (mouseIsPressed) {
    time = createSprite(width / 2, height / 2 + 50);
    // the animation function cycles through images with in between digits
    time.addAnimation("clock", "images/LED_digit_0.png", "images/LED_digit_9.png");
    time.depth = 0;
    time.scale = sin(random(3.14, 1)) * 2;
  }
  drawSprites();
}

function backgroundPattern() {
  push();
  fill(10, 200, 200, randomGaussian(50, 75));
  scale(random(2, 3));
  for (j = 0; j < 60; j++) {
    for (i = 0; i < 60; i++) {
      var xShift = pos3 * i;
      var yShift = pos3 * j;
      diamondDraw();
    }
  }
  for (k = 0; k < 60; k++) {
    for (l = 0; l < 60; l++) {
      var xShift = pos3 * l;
      var yShift = pos3 * k;
      fill(255, 200, 20);
      diamondDraw2();
    }
  }
  pop();

  function diamondDraw() {
    quad(pos1 + xShift, pos2 + yShift, pos2 + xShift, pos1 + yShift,
      pos3 + xShift, pos2 + yShift, pos2 + xShift, pos3 + yShift);
  }

  function diamondDraw2() {
    quad(pos4 + xShift, pos5 + yShift, pos5 + xShift, pos4 + yShift,
      pos6 + xShift, pos5 + yShift, pos5 + xShift, pos6 + yShift);
  }
}

function gameInstructions() {
  textSize(10);
  fill(255, 0, 127);
  textAlign(CENTER);
  text("Press A S D to Keep the Black Hole Away", width / 2, 600);
}

function spawnSolder() {
  // create sprite at position 300, 700 then add the image to it
  solderSprite = createSprite(300, 700);
  solderSprite.addImage(solderIron);
  //angle += 1;
  // we can set a speed and an angle (speed, angle) here angle changes
  solderSprite.scale = 0.2;
  solderSprite.setSpeed(10, angle);
  solderSprite.velocity.y = random(-10, 0);
  solderSprite.rotation = randomGaussian(-135, -45);
  // draw this on the layer above the clock
  solderSprite.depth = 1;
  solderSprite.addToGroup(solderGroup);
}

function spawnSaw() {
  sawSprite = createSprite(350, 700);
  angle += random(-3, 3);
  sawSprite.scale = 0.4;
  sawSprite.setSpeed(10, angle);
  sawSprite.addImage(sawTool);
  sawSprite.rotation = randomGaussian(-10, 10);
  sawSprite.depth = 1;
  sawSprite.addToGroup(sawGroup);
  //self destruction timer(life)
  //solderSprite.life = 30;
}

function spawnHammer() {
  hammerSprite = createSprite(400, 600);
  angle += random(-3, 3);
  hammerSprite.scale = 0.4;
  hammerSprite.setSpeed(10, angle);
  hammerSprite.addImage(hammerTool);
  hammerSprite.rotation = randomGaussian(-10, 10);
  hammerSprite.depth = 1;
  hammerSprite.addToGroup(hammerGroup);

}
