let sprite1;

function setup() {
  new Canvas(600, 400);

  let x = random(width);
  let y = random(height);

  sprite1 = new Sprite(x, y, 40, 40)
  sprite1.color = 'pink';
  sprite1.stroke = 'red';
}

function draw() {
  background('grey');
}





