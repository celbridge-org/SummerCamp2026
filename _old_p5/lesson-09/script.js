let nucleus, electron;

function setup() {
  new Canvas(400, 400);
  nucleus = new Sprite(200, 200, 45);
  electron = new Sprite(100, 100, 10);
  electron.vel.y = 5;
}

function draw() {
  background(16, 10);
  electron.attractTo(nucleus, 5);
}