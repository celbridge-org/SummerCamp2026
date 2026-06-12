let sprite1;

function setup() {
  new Canvas(400, 400);

  sprite1 = new Sprite(200, 200, 40, 40)
  sprite1.color = 'pink';
  sprite1.stroke = 'red';

  sprite1.vel.x = 5;
}

function draw() { 
  background('grey');

  if (sprite1.x > 400)
    sprite1.vel.x = -5;

  if (sprite1.x < 0)
    sprite1.vel.x = 5;
}





