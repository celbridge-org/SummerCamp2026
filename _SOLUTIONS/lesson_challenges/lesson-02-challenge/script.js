let sprite1, ball;

function setup() {
  new Canvas(600, 400);

  sprite1 = new Sprite(200, 200, 40, 40)
  sprite1.color = 'pink';
  sprite1.stroke = 'red';

  ball = new Sprite(400, 300, 50);
  ball.color = 'green';
  ball.stroke = 'black';
}

function draw() {
  background('grey');
}





