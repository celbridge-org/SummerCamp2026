

let monster, monsterImage;

function preload() {
  monsterImage = loadImage('https://stephensheridan.github.io/assets/monster.png');
}

function setup() {
  new Canvas(400, 400);
  monster = new Sprite()
  monster.x = 200;
  monster.y = 200;
  monster.w = 72;
  monster.h = 69;
  monster.img = monsterImage;
}

function draw() { 
  background('grey');
}





