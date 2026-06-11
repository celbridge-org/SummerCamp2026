

let monster, painting;
let message;

let hits = 0;

let smiley;

function setupSmiley() {
	let smileText = `
..yyyyyy
.yybyybyy
yyyyyyyyyy
yybyyyybyy
.yybbbbyy
..yyyyyy`;

	smiley = new Sprite();
	smiley.img = spriteArt(smileText, 32);
    smiley.physics = STATIC;
}


function setup() {
	new Canvas(800,600);
    
    setupSmiley();

    world.gravity.y = 1;

   	painting = new Sprite();
	// painting.width = 128;
	// painting.height = 128;
	painting.width = 256;
	painting.height = 256;
//	painting.image = 'https://p5play.org/learn/assets/star.webp';
    painting.image = 'https://p5play.org/learn/assets/star.webp';

	monster = new Sprite();
	monster.diameter = 70;
    monster.image = 'https://p5play.org/learn/assets/square.webp';
	monster.image.offset.y = 6;

    message = new Sprite();
    message.color = "whitesmoke";
    message.stroke = "whitesmoke";
    message.x = width / 2;
    message.y = 50;
    message.text = "no hits yet!";
    message.physics = STATIC;


}

function update() {
	clear();
    monster.x = mouse.x;
    monster.y = mouse.y;

    if(monster.overlap(painting)){
        hits++;
//        painting.text = "ouch! that's " + hits + " times you hit me !";

        message.text = "ouch! that's " + hits + " times you hit me !";

    }
}

