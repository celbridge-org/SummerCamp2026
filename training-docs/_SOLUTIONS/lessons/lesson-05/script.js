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
}





