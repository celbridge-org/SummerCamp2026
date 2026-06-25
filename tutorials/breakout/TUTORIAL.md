# Breakout

Game-specific tutorial for **Breakout**, a working breakout clone (`index.html`,
`script.js`, `DESIGN.md`). Run it through the general playbook in `tutorials/run_tutorial.md`
— that covers tone, the edit → reload → see-it loop, the DESIGN.md-as-spec discipline, and
how to steer the session. This file carries the breakout specifics.

## The game as it stands

Skim `script.js` and `DESIGN.md` first so you can speak to the actual code:

- A fixed 800x600 canvas scaled to the window with `displayMode('maxed')`.
- A mouse-controlled kinematic `paddle`, a constant-speed physics `ball`, a grid of static
  `bricks` (one colour per row), and off-screen `walls`.
- `ball.collides(bricks, brickHit)` deletes a brick and plays a short synthesized blip.

Deliberately *missing*: lasers — the recommended first feature, and the hook.

## The quick win: laser beams

Lasers touch every part of the game loop (input, spawning, movement, collision, sound) in a
little code. Build them in small steps, pausing after each so the user sees the change:

1. **A bolt that appears.** A `lasers` group and a `fireLaser()` that spawns one bolt at the
   paddle on spacebar. No movement yet — just prove a green rectangle shows up.
2. **Make it fly.** Upward velocity; delete bolts once they leave the top edge.
3. **Make it destroy bricks.** A sensor overlap so the bolt passes through freely and deletes
   the first brick it touches, removing the bolt too.
4. **Rate-limit it.** A short cooldown (~0.3s) so holding space doesn't fire a solid beam.
5. **Sound.** A distinct "zap", different from the ball's blip.

The reference implementation below is *your* answer key — don't dump it on the user; hand out
one step at a time. **Match explanation depth to their hands-on mode:** if they're typing,
walk through each line; if they're watching (the usual first-timer path), describe what the
feature does and what to look for on screen, keeping code internals to a sentence offered on
request.

## Where to take it next

Your menu after lasers — offer one or two that fit what they've reacted to, not the whole list:

- **Score and lives** — points per brick; lose a life when the ball drops; game over / win screens.
- **Power-ups** — bricks drop a capsule: wider paddle, multi-ball, sticky paddle, rapid-fire lasers.
- **Tougher bricks** — some take multiple hits, changing colour; some indestructible.
- **Levels** — clear the grid, load a new layout; design brick patterns.
- **Juice** — particles on break, screen shake, a ball trail.

## Reference: the laser implementation (answer key — don't paste wholesale)

Restores the feature removed from the starting point; hand it out a step at a time. The
boilerplate is straightforward — generate it: the constants (`LASER_SPEED = 12`,
`LASER_COOLDOWN = 18` frames ≈ 0.3s), adding `lasers` to the sprite declarations plus a
`let laserTimer = 0`, the controls-hint text, and `playZap` (a quick sawtooth ramp from
~880Hz down to ~220Hz over 0.12s, distinct from the ball's blip). The load-bearing parts are
below.

The laser group, created in `setup()` after the ball's `collides` registration. The
non-obvious bit: the collider **must** be `dynamic`, and bricks are hit via a sensor
`overlaps`, not `collides`:

```js
// laser bolts fired from the paddle
lasers = new Group();
lasers.collider = 'dynamic'; // must be dynamic: Box2D only generates contacts when one body is dynamic
lasers.color = 'lime';
lasers.w = 4;
lasers.h = 16;
lasers.overlaps(allSprites);       // pass through everything (no physics push, no blocking)
lasers.overlaps(bricks, laserHit); // ...but destroy bricks on contact
```

In `update()` — fire on space (rate-limited) and clean up spent bolts:

```js
if (laserTimer > 0) laserTimer--;
if (kb.pressing('space') && laserTimer === 0) {
  fireLaser();
  laserTimer = LASER_COOLDOWN;
}
for (let bolt of lasers) {        // remove bolts that have flown off the top
  if (bolt.y < -bolt.h) bolt.delete();
}
```

The handler and spawn function:

```js
function laserHit(laser, brick) {
  brick.delete();
  laser.delete();
  playBlip();
}

function fireLaser() {
  let bolt = new lasers.Sprite(paddle.x, paddle.y - paddle.h);
  bolt.vel.y = -LASER_SPEED; // travel straight up
  playZap();
}
```
