// breakout clone (core mechanics)
// mouse to control the paddle, click to start

const MAX_SPEED = 9;
const WALL_THICKNESS = 30;
const BRICK_W = 40;
const BRICK_H = 20;
const BRICK_MARGIN = 4;
const ROWS = 9;
const COLUMNS = 16;
// one color per row, top to bottom
const ROW_COLORS = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'purple', 'magenta', 'pink'];

let paddle, ball, walls, bricks;

function setup() {
  new Canvas(800, 600);

  // four static walls, same geometry as the original
  walls = new Group();
  walls.collider = 'static';
  walls.visible = false; // they sit just off-canvas anyway
  new walls.Sprite(canvas.w / 2, -WALL_THICKNESS / 2, canvas.w + WALL_THICKNESS * 2, WALL_THICKNESS);
  new walls.Sprite(canvas.w / 2, canvas.h + WALL_THICKNESS / 2, canvas.w + WALL_THICKNESS * 2, WALL_THICKNESS);
  new walls.Sprite(-WALL_THICKNESS / 2, canvas.h / 2, WALL_THICKNESS, canvas.h);
  new walls.Sprite(canvas.w + WALL_THICKNESS / 2, canvas.h / 2, WALL_THICKNESS, canvas.h);

  paddle = new Sprite(canvas.w / 2, canvas.h - 50, 100, 10);
  paddle.collider = 'kinematic'; // moved by code, immovable by collisions
  paddle.color = 'white';

  bricks = new Group();
  bricks.collider = 'static';
  let offsetX = canvas.w / 2 - (COLUMNS - 1) * (BRICK_MARGIN + BRICK_W) / 2;
  let offsetY = 80;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLUMNS; c++) {
      let brick = new bricks.Sprite(offsetX + c * (BRICK_W + BRICK_MARGIN), offsetY + r * (BRICK_H + BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.color = ROW_COLORS[r];
    }
  }

  ball = new Sprite(canvas.w / 2, canvas.h - 200, 11); // single size = circle
  ball.color = 'white';
  ball.bounciness = 1;   
  ball.friction = 0;
  ball.rotationLock = true;

  // register the brick callback once; applies forever
  ball.collides(bricks, brickHit);
}

function update() {
    clear();

  // move paddle toward mouse via physics (not teleporting)
  let targetX = constrain(mouse.x, paddle.w / 2, canvas.w - paddle.w / 2);
  paddle.moveTowards(targetX, paddle.y, 1);

  // launch
  if (mouse.presses() && ball.speed == 0) {
    ball.speed = MAX_SPEED;
    ball.direction = random(80, 100); // roughly downward
  }

  // paddle english
  if (ball.collides(paddle)) {
    let swing = (ball.x - paddle.x) / 3;
    ball.direction += swing;
    ball.speed = MAX_SPEED;
  }

  // keep speed constant (Box2D can add tiny energy on bounces)
  if (ball.speed > 0) ball.speed = MAX_SPEED;
}

function draw() {
  background(247, 134, 131);
}

function brickHit(ball, brick) {
  brick.delete();
}