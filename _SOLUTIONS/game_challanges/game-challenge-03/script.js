let ball, paddle;

let BALL_SPEED = 5;

function setup() {
  new Canvas(800, 600);
  ball = new Sprite(300, 200, 20)
  ball.color = 'white';

  ball.vel.x = 0.5 * BALL_SPEED;
  ball.vel.y = BALL_SPEED;

  paddle = new Sprite(200, 550, 100, 20)
  paddle.color = 'white';
}

function draw() {
  background('lightsalmon');
}




