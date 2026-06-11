// pong clone
// mouse to control the right paddle; the left paddle moves randomly

const MAX_SPEED = 10;

let paddleA, paddleB, ball, wallTop, wallBottom;
let leftTargetY;
let scoreLeft, scoreRight;

function setup() {
  new Canvas(800, 400);

  paddleA = new Sprite(30, canvas.h / 2, 10, 100);
  paddleB = new Sprite(canvas.w - 28, canvas.h / 2, 10, 100);
  paddleA.collider = 'kinematic';
  paddleB.collider = 'kinematic';

  wallTop = new Sprite(canvas.w / 2, -15, canvas.w, 30);
  wallBottom = new Sprite(canvas.w / 2, canvas.h + 15, canvas.w, 30);
  wallTop.collider = 'static';
  wallBottom.collider = 'static';

  ball = new Sprite(canvas.w / 2, canvas.h / 2, 10); // circle
  ball.bounciness = 1;
  ball.friction = 0;
  ball.rotationLock = true;

  paddleA.color = paddleB.color = ball.color = 'white';
  wallTop.visible = wallBottom.visible = false;

  leftTargetY = canvas.h / 2;
  scoreLeft = 0;
  scoreRight = 0;

  // serve
  ball.speed = MAX_SPEED;
  ball.direction = 180; // toward the left
}

function update() {
  // left paddle wanders: pick a new random spot every half second
  if (frameCount % 30 == 0) {
    leftTargetY = random(paddleA.h / 2, canvas.h - paddleA.h / 2);
  }
  paddleA.moveTowards(paddleA.x, leftTargetY, 0.08);

  // right paddle tracks the mouse
  let targetY = constrain(mouse.y, paddleB.h / 2, canvas.h - paddleB.h / 2);
  paddleB.moveTowards(paddleB.x, targetY, 1);

  // paddle english
  let swing;
  if (ball.collides(paddleA)) {
    swing = (ball.y - paddleA.y) / 3;
    ball.direction += swing;
    ball.speed = MAX_SPEED;
  }
  if (ball.collides(paddleB)) {
    swing = (ball.y - paddleB.y) / 3;
    ball.direction -= swing;
    ball.speed = MAX_SPEED;
  }

  // score / reset
  if (ball.x < 0) {
    scoreRight++; // player scores when the ball hits the left side
    serve(0);     // serve to the right
  }
  if (ball.x > canvas.w) {
    scoreLeft++;  // computer scores when the ball hits the right side
    serve(180);   // serve to the left
  }

  // keep speed constant
  if (ball.speed > 0) ball.speed = MAX_SPEED;
}

function drawFrame() {
  background(0);

  fill(255);
  textSize(64);
  textAlign(LEFT, TOP);
  text(scoreLeft, 20, 10);
  textAlign(RIGHT, TOP);
  text(scoreRight, canvas.w - 20, 10);
}

function serve(dir) {
  ball.x = canvas.w / 2;
  ball.y = canvas.h / 2;
  ball.vel.x = 0;
  ball.vel.y = 0;
  ball.speed = MAX_SPEED;
  ball.direction = dir;
}