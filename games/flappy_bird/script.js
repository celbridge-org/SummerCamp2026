// flappy bird-like
// mouse click or x to flap

const GRAVITY = 0.3;
const FLAP = -7;
const GROUND_Y = 450;
const MIN_OPENING = 300;

let bird, ground, pipes;
let gameOver;
let score, surviveFrames;
let birdImg, pipeImg, groundImg, bgImg;

function preload() {
  // q5 defaults to drawing images at 0.5 scale (it assumes 2x retina assets);
  // p5 draws at native size, so reset to 1 before loading to match the old look
  if (typeof defaultImageScale === 'function') defaultImageScale(1);

  birdImg = loadImage('images/flappy_bird.png');
  pipeImg = loadImage('images/flappy_pipe.png');
  groundImg = loadImage('images/flappy_ground.png');
  bgImg = loadImage('images/flappy_bg.png');
}

function setup() {
  new Canvas(400, 600);

  bird = new Sprite(canvas.w / 2, canvas.h / 2, 40); // one size = circle collider, d=40
  bird.img = birdImg;
  bird.rotationLock = true; // we'll set rotation manually
  bird.vel.x = 4;

  ground = new Sprite(800 / 2, GROUND_Y + 100); // image is 800x200
  ground.img = groundImg;
  ground.collider = 'none'; // purely decorative

  pipes = new Group();
  pipes.collider = 'static';

  ground.layer = 2; // keep the ground drawn on top of the pipes

  // detect overlaps instead of physical collisions
  bird.overlaps(pipes);

  score = 0;
  surviveFrames = 0;
  bird.postDraw = drawScore; // runs after all sprites, so pipes can't cover the text

  gameOver = true;
  bird.vel.x = 0; // frozen until first click/keypress
}

function update() {
  if (gameOver && (kb.presses('x') || mouse.presses())) newGame();

  if (!gameOver) {
    // 1 point for every 5 seconds survived (60 frames per second)
    surviveFrames++;
    if (surviveFrames % 300 == 0) score++;

    if (kb.presses('x') || mouse.presses()) bird.vel.y = FLAP;

    bird.vel.y += GRAVITY;
    bird.rotation = bird.direction; // replaces rotateToDirection

    if (bird.y < 0) bird.y = 0;
    if (bird.y + bird.h / 2 > GROUND_Y) die();
    if (bird.overlapping(pipes)) die();

    // spawn pipes
    if (frameCount % 60 == 0) {
      let pipeH = random(50, 300);
      let pipe = new pipes.Sprite(bird.x + canvas.w, GROUND_Y - pipeH / 2 + 1 + 100, 80, pipeH);
      pipe.img = pipeImg;

      // top pipe
      if (pipeH < 200) {
        pipeH = canvas.h - (canvas.h - GROUND_Y) - (pipeH + MIN_OPENING);
        pipe = new pipes.Sprite(bird.x + canvas.w, pipeH / 2 - 100, 80, pipeH);
        pipe.mirror.y = true; // replaces mirrorY(-1)
        pipe.img = pipeImg;
      }
    }

    // remove passed pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
    if (pipes[i].x < bird.x - canvas.w / 2) pipes[i].delete();
    }
  }

  // camera follows bird
  camera.x = bird.x + canvas.w / 4;

  // wrap ground
  if (camera.x > ground.x - ground.w + canvas.w / 2) {
    ground.x += ground.w;
  }

}

function drawFrame() {
  background(247, 134, 131);

  // draw the background in screen coordinates
  camera.off();
  image(bgImg, 0, GROUND_Y - 190);
  camera.on();
}

function drawScore() {
  fill(255);
  stroke(0);
  strokeWeight(4);
  textSize(28);
  textAlign(LEFT, TOP);
  text('score = ' + score, 10, 10);
}

function die() {
  bird.vel.x = 0;
  bird.vel.y = 0;
  gameOver = true;
}

function newGame() {
  pipes.deleteAll();
  gameOver = false;
  score = 0;
  surviveFrames = 0;
  bird.x = canvas.w / 2;
  bird.y = canvas.h / 2;
  bird.vel.x = 4;
  bird.vel.y = 0;
  bird.rotation = 0;
  ground.x = 800 / 2;
  ground.y = GROUND_Y + 100;
}

