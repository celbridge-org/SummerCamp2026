let sprite1;

function setup() {
  new Canvas(600, 400);

  sprite1 = new Sprite(200, 200, 40, 40);
  sprite1.color = 'pink';
  sprite1.stroke = 'red';

  sprite1.vel.x = 1;
}

function draw() { 
  background('grey');
}

