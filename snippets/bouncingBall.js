function setup() {
  new Canvas(400, 400);

  // invisible walls around the canvas
  let border = new Sprite([
    [0, 0],
    [canvas.w, 0],
    [canvas.w, canvas.h],
    [0, canvas.h],
    [0, 0] // repeat first vertex to close the chain
  ], 'static');

  let ball = new Sprite(200, 100, 30);
  ball.vel.x = 5;
  ball.bounciness = 0.8;
}

function draw() {
  background(220);
}