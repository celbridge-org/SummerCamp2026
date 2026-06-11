// Sprite creation
// Click to create a new sprite with random speed

function setup() {
  new Canvas(800, 400);
}

function draw() {
  background(255);
  fill(0);
  textAlign(CENTER);
  text('Click to create a new sprite', canvas.w / 2, canvas.h / 2);
}

function mousePressed() {
  // create a sprite at the mouse position
  let s = new Sprite(mouseX, mouseY, 30, 30);
  // sprites get a random color by default, like in the old version
  // random velocity on x and y
  s.vel.x = random(-5, 5);
  s.vel.y = random(-5, 5);
}