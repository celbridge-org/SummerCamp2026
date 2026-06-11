// asteroids clone (core mechanics only)
// arrow keys to move + x to shoot

const MARGIN = 40;

let ship, asteroids, bullets, particles;
let shipImg, bulletImg, particleImg;
let asteroidImgs = [];

function preload() {
  shipImg = loadImage('images/asteroids_ship0001.png');
  bulletImg = loadImage('images/asteroids_bullet.png');
  particleImg = loadImage('images/asteroids_particle.png');
  for (let i = 0; i < 3; i++) {
    asteroidImgs[i] = loadImage('images/asteroid' + i + '.png');
  }
}

function setup() {
  new Canvas(800, 600);

  ship = new Sprite(canvas.w / 2, canvas.h / 2, 40); // circle collider, d=40
  ship.drag = 0.1;            // replaces v2's friction-as-space-drag
  ship.rotationLock = true;   // collisions can't spin the ship
  ship.addAni('normal', shipImg);
  ship.addAni('thrust', 'images/asteroids_ship0002.png', 7); // sequence: 0002 → 0007

  asteroids = new Group();
  bullets = new Group();
  particles = new Group();
  particles.collider = 'none'; // purely decorative
  particles.img = particleImg;
  particles.drag = 0.5;

  // relationships, registered once:
  asteroids.overlaps(bullets, asteroidHit); // bullets destroy asteroids
  asteroids.overlaps(asteroids);            // asteroids pass through each other (as in original)
  bullets.overlaps(ship);                   // bullets spawn inside the ship — don't push it
  // ship vs asteroids: default collision = the bounce from the original

  for (let i = 0; i < 8; i++) {
    let ang = random(360);
    let px = canvas.w / 2 + 1000 * cos(ang);
    let py = canvas.h / 2 + 1000 * sin(ang);
    createAsteroid(3, px, py);
  }
}

function update() {
  // screen wrap, all sprites
  for (let s of allSprites) {
    if (s.x < -MARGIN) s.x = canvas.w + MARGIN;
    if (s.x > canvas.w + MARGIN) s.x = -MARGIN;
    if (s.y < -MARGIN) s.y = canvas.h + MARGIN;
    if (s.y > canvas.h + MARGIN) s.y = -MARGIN;
  }

  if (kb.pressing('left')) ship.rotation -= 4;
  if (kb.pressing('right')) ship.rotation += 4;

  if (kb.pressing('up')) {
    // replaces addSpeed(0.2, ship.rotation)
    ship.vel.x += 0.2 * cos(ship.rotation);
    ship.vel.y += 0.2 * sin(ship.rotation);
    ship.changeAni('thrust');
  } else {
    ship.changeAni('normal');
  }
  if (ship.speed > 6) ship.speed = 6; // replaces maxSpeed

  if (kb.presses('x')) {
    let b = new bullets.Sprite(ship.x, ship.y, 8);
    b.img = bulletImg;
    b.direction = ship.rotation;
    b.speed = 10 + ship.speed;
    b.life = 30; // auto-deletes after 30 frames, same as v2
  }
}

function drawFrame() {
  background(0);
  fill(255);
  textAlign(CENTER);
  text('Controls: Arrow Keys + X', canvas.w / 2, 20);
}

function createAsteroid(type, x, y) {
  let a = new asteroids.Sprite(x, y, 100); // circle collider, d=100 (r=50 like original)
  a.img = random(asteroidImgs);
  a.direction = random(360);
  a.speed = 2.5 - type / 2;
  a.rotationSpeed = 0.5;
  a.type = type;
  if (type == 2) a.scale = 0.6;
  if (type == 1) a.scale = 0.3;
  a.mass = 2 + a.scale;
  return a;
}

function asteroidHit(asteroid, bullet) {
  let newType = asteroid.type - 1;
  if (newType > 0) {
    createAsteroid(newType, asteroid.x, asteroid.y);
    createAsteroid(newType, asteroid.x, asteroid.y);
  }
  for (let i = 0; i < 10; i++) {
    let p = new particles.Sprite(bullet.x, bullet.y, 5);
    p.direction = random(360);
    p.speed = random(3, 5);
    p.life = 15;
  }
  bullet.delete();
  asteroid.delete();
}