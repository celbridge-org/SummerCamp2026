

let sprite;

function setup() {
  createCanvas(400, 400);
  sprite = new Sprite()
  sprite.x = 200;
  sprite.y = 200;
  sprite.w = 40;
  sprite.h = 40;
  sprite.color = 'pink';
  sprite.stroke = 'red';
  sprite.vel.y = 1;
}

function draw() { 
  background('grey');

  if (sprite.y > 400)
    sprite.vel.y = -1;
  
  if (sprite.y < 0)
    sprite.vel.y = 1;
}





