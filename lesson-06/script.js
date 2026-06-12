let monster, monsterImage;

function preload() {
  monsterImage = loadImage('images/monster.png');
}

function setup() {
  new Canvas(400, 400);
  monster = new Sprite(monsterImage, 200, 200, 72, 69);
}

function draw() { 
  background('grey');

  // reset to zero
  monster.vel.x = 0;
  monster.vel.y = 0;

  if (kb.pressing('left')) 
    monster.vel.x = -5;

  if (kb.pressing('right'))
    monster.vel.x = 5;
}





