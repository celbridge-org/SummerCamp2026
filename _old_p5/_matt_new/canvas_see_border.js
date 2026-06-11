function drawCanvasBorder() {
  background(220);

  push();
  noFill();
  stroke(0);
  strokeWeight(4);
  rect(2, 2, canvas.w - 4, canvas.h - 4);
  pop();
}