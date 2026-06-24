let sprite1;

function setup() {
  new Canvas(400, 400);

  sprite1 = new Sprite(200, 200, 40, 40)
  sprite1.color = 'pink';
  sprite1.stroke = 'red';

  sprite1.vel.y = 5;
}

function draw() { 
  background('grey');

  if (sprite1.y > 400)
    sprite1.vel.y = -1 * sprite1.vel.y;

  if (sprite1.y < 0)
    sprite1.vel.y = -1 * sprite1.vel.y;
}





