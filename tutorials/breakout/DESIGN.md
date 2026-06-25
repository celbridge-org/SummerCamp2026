# Breakout — Game Design Document

A breakout clone, set up as a starting point for you to build on. The suggested first
feature is a paddle that can fire laser bolts, but the direction is yours — just tell the
assistant what you'd like to build.

## Core loop

- Move the paddle left/right with the mouse.
- Click to launch the ball.
- Clear all the bricks to win; the ball bounces off the paddle and walls.

## Pieces

| Piece   | Behaviour                                                            |
|---------|---------------------------------------------------------------------|
| Paddle  | Kinematic; follows the mouse along the bottom of the screen.        |
| Ball    | Physics circle, constant speed, bounces off walls/paddle/bricks.    |
| Bricks  | Static grid, one colour per row; deleted when the ball hits them.   |
| Walls   | Static borders so the ball stays in play.                           |

## Presentation

- The game logic runs at a fixed 800x600. The canvas scales to fill the available window (q5 `displayMode('maxed')`), preserving aspect ratio so layout math is untouched.

## Status

The base game already works: the paddle, ball, bricks, and walls, scaled to fit the window.
Nothing has been built on top of it yet — that part is up to you. As you add features, list
them here so this design doc and the game stay in step.

- [ ] Your first feature — lasers are the suggested starting point, or take it wherever you like.

## Ideas to explore

- **Lasers** — fire bolts up from the paddle to destroy bricks (the suggested first feature).
- **Score and lives** — points per brick, lose a life when the ball drops past the paddle.
- **Power-ups** — bricks occasionally drop a capsule: wider paddle, multi-ball, sticky paddle.
- **Brick toughness** — some bricks take two or three hits, changing colour each time.
- **Levels** — clear the grid, load a new layout; lay bricks out in patterns.
