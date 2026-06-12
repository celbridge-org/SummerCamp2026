let ball, paddle;

function setup() {
  new Canvas(800, 600);
  ball = new Sprite(300, 400, 20)
  ball.color = 'white';

  paddle = new Sprite(200, 550, 100, 20)
  paddle.color = 'white';
}

function draw() {
  background('lightsalmon');
}
