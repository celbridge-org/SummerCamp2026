

function setup() {
  createCanvas(400, 400);
}

function drawStars(){
  randomSeed(99);
  for (var count = 0; count < 50; count++) {
    var x = random(width);
    var y = random(height);
    var size = random(1, 4);
    fill(255);
    ellipse(x, y, size, size);
  }
}

function draw() { 
  background('black');
  drawStars()
}





