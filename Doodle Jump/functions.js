function endGame() {
  if (f){
     f = false
     background(50);
     strokeWeight(2);
     stroke(150)
     doodle.y = height/2;
     doodle.x = width/2
     doodle.bounce = MIDDLE-70
     platforms.push(new Board(width/2-30, height/2))

  } else {

    background(50)
    for (var i=0; i<platforms.length; i++) {
        platforms[i].drawBoard();
     }
    doodle.draw();
    doodle.jump();
    doodle.checkBottom();
    console.log(key)
    // if (keyIsDown(R)) {
    //   doodle.x += 5;
    // }
  }
}
