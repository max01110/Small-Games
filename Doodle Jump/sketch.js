var frequency = 130;
var count = 0;
var platforms = [];
var GRAVITY = 0.3;
var MIDDLE = 380;
var centerY = 0;
var doodleState;
var once = false;
var score = 0;
var diff = 0
var vel = 0;
var o = true;
var endG = false;
var f = true;
//Sprites:

function setup() {
	createCanvas(550, 650);
	//bg = loadImage('sprites/background.png')
	doodle = new Doodle(height-80, 40);
	platforms.push(new Board(width/2-30, height/2));
 for (var i=0; i<40; i++) {
		 platforms.push(new Board(random(0,width), random(0, height)));
	}



}

function draw() {
	if (endG) {
		endGame();
	} else {
		background(50);
		strokeWeight(2);
		stroke(150)
		if (doodle.y < 100) {
			centerY = 4
		} else if (doodle.y < 200){
				centerY = 3
		} else {
				centerY = 2;

		}
			for (var y=0; y<platforms.length; y++) {
			platforms[y].y += centerY;

			platforms[y].drawBoard();
		}

		doodle.draw();
		doodle.jump();
		doodle.checkBottom();
		doodle.checkSides();
		doodleState = doodle.state();
		if (doodle.y < 80) {
			doodle.bounce = height;
		} else {
				if (doodleState == 'D') {
					centerY = 0;
					for (var plat=0; plat<platforms.length; plat++) {
					 if (platforms[plat].y <= 0) {
						 platforms[plat] = 0;
						 platforms[plat] = new Board(random(0,width), random(-100, 0))
					 }
				 	 if (doodle.x >= platforms[plat].x && doodle.x <= platforms[plat].x+60) {
						 if (doodle.y + 20 >= platforms[plat].y && doodle.y+20 <= platforms[plat].y+30 && doodle.y <= 600) {
							 if (height/2-platforms[plat].y >= 0 ) {
								  doodle.bounce = platforms[plat].y-20;//height/2
							 } else {
								 	diff = 0
								 	doodle.bounce = platforms[plat].y-20;
							 }
							 break;
						 } else {
							 doodle.bounce = height;
						 }
					 }
				 }
	}

}
	//If doodle touches bottom --> game over
	if (doodle.y > height - 15) {
	 	endG = true
	}


	textSize(30)
	fill(255)
	text(score, 30, 50);

	for (var j=0; j<platforms.length; j++) {
		 if (platforms[j].y > height) {
			 platforms[j] = new Board (random(0, width-60), -100)
		 }
	}

	if (keyIsDown(LEFT_ARROW)) {
		doodle.x -= 5;
	}
	if (keyIsDown(RIGHT_ARROW)) {
		doodle.x += 5;
	}



}

}
