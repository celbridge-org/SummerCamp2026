
// ---------- Tiny Peaks ----------
// Arrows / WASD to move, Space / Up / W to jump.
// Collect every coin and reach the flag!

const LEVEL_W = 2150;
const SPAWN = { x: 100, y: 300 };

const GRAVITY = 35;

const COIN_POS = [
  [320, 285], [520, 205], [700, 375], [875, 315], [1100, 255],
  [1250, 375], [1450, 305], [1580, 225], [1800, 275], [2000, 375]
];

let player, platforms, coins, flag;
let score = 0, won = false;
let framesSinceOnGround = 99; // "coyote time" counter
let framesSinceJumpKey = 99;  // jump-buffer counter
let startTime = 0, finishTime = 0; // ms, for the level timer

function setup() {
  new Canvas(800, 450);
  try { displayMode('maxed'); } catch (e) {}

  world.gravity.y = GRAVITY;
  allSprites.autoDraw = false;

  // --- platforms ---
  platforms = new Group();
  platforms.collider = 'static';
  platforms.friction = 0.1;

  function plat(x, y, w, h = 26) {
    const p = new platforms.Sprite(x, y, w, h);
    p.draw = () => {
      rectMode(CENTER);
      noStroke();
      fill('#7a5230');                       // dirt
      rect(0, 0, p.w, p.h, 5);
      fill('#6ab04c');                       // grass top
      rect(0, -p.h / 2 + 4, p.w, 8, 5);
    };
    return p;
  }

  // ground segments (with gaps to jump over)
  plat(200, 440, 400, 60);
  plat(650, 440, 300, 60);
  plat(1150, 440, 400, 60);
  plat(1900, 440, 500, 60);

  // floating platforms
  plat(320, 330, 110);
  plat(520, 250, 100);
  plat(875, 360, 90);
  plat(1100, 300, 100);
  plat(1450, 350, 100);
  plat(1580, 270, 90);
  plat(1800, 320, 100);

  // invisible wall on the left edge
  const wall = new Sprite(-20, 225, 40, 900);
  wall.collider = 'static';
  wall.visible = false;
  wall.draw = () => {};

  // --- player ---
  player = new Sprite(SPAWN.x, SPAWN.y, 34, 40);
  player.rotationLock = true;
  player.friction = 0;
  player.bounciness = 0;
  player.draw = () => {
    rectMode(CENTER);
    noStroke();
    fill('#ff6b6b');
    rect(0, 0, player.w, player.h, 8);
    // face
    const look = player.vel.x >= 0 ? 1 : -1;
    fill(255);
    ellipse(look * 6 - 3, -6, 9, 10);
    ellipse(look * 6 + 8, -6, 9, 10);
    fill('#2d3436');
    ellipse(look * 6 - 3 + look * 2, -6, 4, 5);
    ellipse(look * 6 + 8 + look * 2, -6, 4, 5);
    noFill();
    stroke('#2d3436');
    strokeWeight(2);
    arc(look * 4, 6, 12, 8, 0, PI);
  };

  // --- coins ---
  coins = new Group();
  coins.collider = 'static';
  spawnCoins();
  player.overlaps(coins, (pl, c) => {
    score++;
    c.remove();
  });

  // --- flag ---
  flag = new Sprite(2080, 365, 14, 110);
  flag.collider = 'static';
  flag.draw = () => {
    rectMode(CENTER);
    noStroke();
    fill('#dfe6e9');
    rect(0, 0, 6, flag.h, 3);                 // pole
    fill('#fdcb6e');
    triangle(3, -flag.h / 2, 3, -flag.h / 2 + 30, 40, -flag.h / 2 + 15); // banner
  };
  player.overlaps(flag, () => {
    if (!won) {
      won = true;
      finishTime = millis();
    }
  });

  startTime = millis();
}

function spawnCoins() {
  for (const [x, y] of COIN_POS) {
    const c = new coins.Sprite(x, y, 20, 20);
    c.draw = () => {
      const squish = abs(sin(frameCount * 0.08 + c.x));
      noStroke();
      fill('#fdcb6e');
      ellipse(0, sin(frameCount * 0.07 + c.x) * 3, 18 * max(squish, 0.25), 18);
      fill('#e1a93c');
      ellipse(0, sin(frameCount * 0.07 + c.x) * 3, 10 * max(squish, 0.25), 10);
    };
  }
}

function resetGame() {
  score = 0;
  won = false;
  coins.removeAll();
  spawnCoins();
  respawn();
  startTime = millis();
  finishTime = 0;
}

function respawn() {
  player.x = SPAWN.x;
  player.y = SPAWN.y;
  player.vel.x = 0;
  player.vel.y = 0;
}

function draw() {
  // ----- input & logic -----
  if (!won) {
    const left  = kb.pressing('left')  || kb.pressing('a');
    const right = kb.pressing('right') || kb.pressing('d');

    if (left)       player.vel.x = -4.5;
    else if (right) player.vel.x = 4.5;
    else            player.vel.x = 0;

    const jumpPressed =
      kb.presses('up') || kb.presses('w') || kb.presses('space');

    // loose ground test: count frames since the player last touched a
    // platform, and frames since jump was last pressed. Jumping works if
    // both happened recently — so you can still jump just after stepping
    // off a ledge, and a press just before landing isn't lost.
    if (player.colliding(platforms)) framesSinceOnGround = 0;
    else framesSinceOnGround++;

    if (jumpPressed) framesSinceJumpKey = 0;
    else framesSinceJumpKey++;

    if (framesSinceOnGround < 8 && framesSinceJumpKey < 8) {
      player.vel.y = -12;
      framesSinceOnGround = 99; // so one press = one jump
      framesSinceJumpKey = 99;
    }
  } else {
    player.vel.x = 0;
  }

  if (kb.presses('r') || (won && (mouseIsPressed || touches.length))) resetGame();
  if (player.y > 700) respawn(); // fell into a pit

  // ----- camera -----
  camera.x = constrain(player.x, width / 2, LEVEL_W - width / 2);
  camera.y = height / 2;

  // ----- background (sky + parallax hills) -----
  background('#74b9ff');
  noStroke();
  // distant hills, parallax
  const off = camera.x * 0.3;
  fill('#55a3e8');
  for (let i = -1; i < 6; i++) {
    const hx = ((i * 360 - off) % 2160 + 2160) % 2160 - 180;
    ellipse(hx, 470, 520, 340);
  }
  // clouds
  fill(255, 235);
  for (let i = 0; i < 5; i++) {
    const cx = ((i * 333 - camera.x * 0.15 + frameCount * 0.15) % 1000 + 1000) % 1000 - 100;
    const cy = 60 + (i * 47) % 110;
    ellipse(cx, cy, 86, 34);
    ellipse(cx + 30, cy - 12, 60, 28);
  }

  // ----- world -----
  camera.on();
  allSprites.draw();
  camera.off();

  // ----- HUD -----
  noStroke();
  fill(0, 90);
  rect(12, 12, 168, 40, 10);
  fill('#fdcb6e');
  ellipse(36, 32, 18, 18);
  fill(255);
  textSize(20);
  textAlign(LEFT, CENTER);
  textStyle(BOLD);
  text(`${score} / ${COIN_POS.length}`, 52, 33);

  // timer, top right (frozen at the finish time once you win)
  const seconds = ((won ? finishTime : millis()) - startTime) / 1000;
  fill(0, 90);
  rect(width - 130, 12, 118, 40, 10);
  fill(255);
  textAlign(RIGHT, CENTER);
  text(`${floor(seconds)}s`, width - 26, 33);

  // controls message for the first few seconds
  if (!won && millis() - startTime < 4000) {
    fill(0, 150);
    rect(width / 2 - 280, 70, 560, 70, 12);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(22);
    text('Controls: Arrow Keys + Space Bar (or WASD)', width / 2, 105);
  }

  // win overlay
  if (won) {
    fill(0, 150);
    rect(0, 0, width, height);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(44);
    text('You made it! ', width / 2, height / 2 - 40);
    textSize(22);
    text(`Coins: ${score} / ${COIN_POS.length}`, width / 2, height / 2 + 4);
    text(`Time: ${((finishTime - startTime) / 1000).toFixed(1)} seconds`, width / 2, height / 2 + 34);
    textSize(18);
    text('Press R (or tap) to play again', width / 2, height / 2 + 70);
  }
}
