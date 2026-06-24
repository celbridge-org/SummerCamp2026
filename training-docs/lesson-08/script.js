let sprite1, floor;

function setup() {
  new Canvas(600, 400);

  sprite1 = new Sprite(200, 200, 40);
  sprite1.colour = 'pink';
  sprite1.stroke = 'red';

  floor = new Sprite(200, 350, 400, 20, 'static');
  floor.colour = 'green';
  floor.stroke = 'black';

  world.gravity.y = 10;
}

function draw() { 
  background('grey');

  // text
  text('hello', 100, 100);
}









