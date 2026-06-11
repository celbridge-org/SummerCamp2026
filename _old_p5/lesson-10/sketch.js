var moonImg, shipImg, earth, moon, ship;

function preload() {
  earthImg = loadImage('https://stephensheridan.github.io/assets/earth.png');
  moonImg = loadImage('https://stephensheridan.github.io/assets/moon.png');
  shipImg = loadImage('https://stephensheridan.github.io/assets/ship.png');
}

function setup() {
  new Canvas(1200, 800);
  
  earth = new Sprite(600, 400, 100);
  earth.img = earthImg;
  earth.collider = 'static'; // Stop the earth from moving
  
  moon = new Sprite(300, 300, 100);
  moon.img = moonImg;
  moon.vel.y = 6;
  moon.rotationSpeed = 1;
     
  ship = new Sprite(300,200,50);
  ship.img = shipImg;
  ship.vel.x = 2;

}

function drawStars(){
  randomSeed(99);
  for (var i = 0; i < 200; i++) {
    var x = random(width);
    var y = random(height);
    var size = random(1, 3);
    fill(255);
    ellipse(x, y, size, size);
  }
}

function resetShip(){
    ship.x = -200;
    ship.y = random(80, height-80);
    ship.vel.x = 2;
    ship.vel.y = 0;
    ship.rotation = 0;
    ship.rotationSpeed = 0;
}
function draw() { 
  background(10, 70);
  drawStars();
  moon.attractTo(earth, 50);

  if (ship.x-500 > width || ship.y-500 > height) {
    resetShip();
  }

  if (ship.x+500 < 0  || ship.y+500 < 0) {
    resetShip();
  }
  

}

