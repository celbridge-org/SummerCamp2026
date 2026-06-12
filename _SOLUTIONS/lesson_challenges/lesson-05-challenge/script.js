let ship, shipImage;

function preload() {
  shipImage = loadImage('images/ship.png');
}

function setup() {
  new Canvas(400, 400);
  ship = new Sprite(shipImage, 200, 200, 72, 69);
  ship.scale = 3;
  ship.rotationSpeed = 0.5;
}

function draw() {
  background('grey');
}





