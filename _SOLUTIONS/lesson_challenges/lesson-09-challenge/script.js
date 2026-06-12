let sprite1, floor, beepSound;

function preload() {
  beepSound = loadSound('sounds/LowVoice.wav');
}

function setup() {
  new Canvas(600, 400);

}

function draw() { 
  background('grey');

  // text
  fill('white');
  textSize(16);
  text('click mouse for sound', 100, 100);

  if(mouse.pressing()) {
    beepSound.play();
  }
}









