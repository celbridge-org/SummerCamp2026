let ball, paddle;
let block1, block2, block3, block4;
let BALL_SPEED = 15;
let PADDLE_SPEED = 5;

function setup() {
  new Canvas(800, 600);
  ball = new Sprite(300, 400, 20)
  ball.color = 'white';

  ball.vel.x = 0.5 * BALL_SPEED;
  ball.vel.y = BALL_SPEED;

  paddle = new Sprite(200, 550, 100, 20, STATIC);
  paddle.color = 'white';

  // blocks
  block1 = new Sprite(250, 100, 50, 20, STATIC);
  block1.color = 'yellow';
  block2 = new Sprite(350, 100, 50, 20, STATIC);
  block2.color = 'yellow';
  block3 = new Sprite(250, 150, 50, 20, STATIC);
  block3.color = 'green';
  block4 = new Sprite(350, 150, 50, 20, STATIC);
  block4.color = 'green';
  block5 = new Sprite(450, 100, 50, 20, STATIC);
  block5.color = 'yellow';
  block6 = new Sprite(550, 100, 50, 20, STATIC);
  block6.color = 'yellow';
  block7 = new Sprite(450, 150, 50, 20, STATIC);
  block7.color = 'green';
  block8 = new Sprite(550, 150, 50, 20, STATIC);
  block8.color = 'green';

}

function draw() {
  background('lightsalmon');
  bounceBall();
  movePaddle();
}

function movePaddle() {
  // reset to zero
  paddle.vel.x = 0;

  if (kb.pressing('left'))
    paddle.vel.x = -1 * PADDLE_SPEED;

  if (kb.pressing('right'))
    paddle.vel.x = PADDLE_SPEED;
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



