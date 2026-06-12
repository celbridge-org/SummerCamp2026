let ball, paddle;

let BALL_SPEED = 15;

function setup() {
  new Canvas(800, 600);
  ball = new Sprite(300, 400, 20)
  ball.color = 'white';

  ball.vel.x = 0.5 * BALL_SPEED;
  ball.vel.y = BALL_SPEED;

  paddle = new Sprite(200, 550, 100, 20)
  paddle.color = 'white';
}

function draw() {
  background('lightsalmon');
  bounceBall();
}

function bounceBall() {
  if (ball.y > height)
    ball.vel.y = -1 * ball.vel.y;

  if (ball.y < 10)
    ball.vel.y = -1 * ball.vel.y;

  if (ball.x > width)
    ball.vel.x = -1 * ball.vel.x;

  if (ball.x < 10)
    ball.vel.x = -1 * ball.vel.x;
}



