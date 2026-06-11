
mention the 'canvas'
X (horizontal) Y (vertical)


can pass parameters when creating a Sprite


new Sprite();              // center of canvas, 50x50 box, dynamic

position
new Sprite(x, y);          // 50x50 box at (x, y)

postion & size for a box
new Sprite(x, y, w, h);    // box collider, w × h

position & size for a circle
new Sprite(x, y, d);       // ONE size value = circle with diameter d



- can pass physics:

new Sprite(x, y, w, h, 'static');
new Sprite(x, y, d, 'kinematic');


Image or Animation
new Sprite(shipImg, x, y);

