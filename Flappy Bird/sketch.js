var bird;
var lost=false;
var pipes = [];
var counter = 0;
var spacing = 100;
var mainScrn;
var a = 0;
var score = 0;
var status = 0;
var timer1 =  0;
var alreadyadd=false;
var restart=false;
var timeRest=0;
var img;


function setup() {
  createCanvas(400, 500);
  bird = new Bird();
  pipes.push(new Pipe());
  img = loadImage('download.jpg');
  
  }
function draw() {
  image(img, 200, 200);
  background(0);
  textSize(20);
  fill(255, 0, 0);
  text("Score: " + str(score), 30, 40);
  
  if (lost==true) {
    lose();
  } else {
    for (var i = pipes.length-1; i>=0; i--) {
    pipes[i].show();
    pipes[i].update();
       
      if (pipes[i].offScreen()) {   
        pipes.shift(pipes[i]);  
        alreadyadd=false; 
    }

    if (pipes[i].x < 40 &&alreadyadd==false) {
      score++;
      alreadyadd=true;

    }
      
    if (restart && timeRest>200) {
      score=1;
      restart=false;
      }
      
  
    if (pipes[i].hits(bird)) {
      pipes=[];
      lost = true;
      //pipes.push(new Pipe());
      }


  }

    bird.show();
    bird.update();
  
    if (counter == spacing && !lost) {
      pipes.push(new Pipe());
      counter = 0;
  }
  
    counter ++;
    timeRest++;
    
}
      
  
}
function keyPressed() {
  if (key === ' ') {
    bird.up();
}
}
  
function mousePressed() {
  if (lost==true) { //If mouse is clicked and player is lost
    lost=false;
    score = 0;
    timeRest=0;
    pipes=[];
    restart=true; 
    
  }
  
}

