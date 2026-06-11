let tails = [];
let size = 10;

function setup() {
	new Canvas(800,600);

//    makeBorderABoxCollider();
}

function update() {
    clear()
    drawCanvasBorder();

    circle(mouseX, mouseY, random(55));

    drawTail();

    if(mouse.pressing()){
        appendCircleToTail();
    }
}

function appendCircleToTail(){
    tails.push(
        {'x': mouseX, 'y': mouseY}
    )
}

function drawTail() {
    tails.forEach((tail) => {
//        circle(tail.x, tail.y, random(55));
        circle(tail.x, tail.y, size);
    });
    
}

function drawCanvasBorder() {
  background(220);

  push();
  noFill();
  stroke(0);
  strokeWeight(4);
  rect(2, 2, canvas.w - 4, canvas.h - 4);
  pop();
}
