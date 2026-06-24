let sprite1;

function setup() {
  new Canvas(600, 400);

  sprite1 = new Sprite(200, 200, 40);
  sprite1.colour = 'pink';
  sprite1.stroke = 'red';

  world.gravity.y = 10;
}

function draw() { 
  background('grey');
}









