let sprite, floor;

function setup() {
  createCanvas(400, 400);
  sprite = new Sprite();
  sprite.x = 200;
  sprite.y = 200;
  sprite.d = 40;
  sprite.colour = 'pink';
  sprite.stroke = 'red';

  floor = new Sprite();
  floor.x = 200;
  floor.y = 350;
  floor.w = 400;
  floor.h = 20;
  floor.colour = 'green';
  floor.stroke = 'black';
  floor.collider = 'static';
  
  world.gravity.y = 10;
}

function draw() { 
  background('grey');
}









