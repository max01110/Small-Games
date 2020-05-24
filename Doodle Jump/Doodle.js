class Doodle {
  constructor(y, w) {
    this.y = y
    this.x =  width/2
    this.w = w
    this.vel = 0;
    this.bounce = MIDDLE;
  }

  draw() {
    stroke(150);
    noStroke();
    ellipse(this.x, this.y, this.w);
  }

  jump() {
    this.y += this.vel;
    this.vel += GRAVITY;
  }

  checkBottom() {
    if (this.y >= this.bounce) {
      this.y = this.bounce;
      doodle.vel = -7;
    }
  }


  state() {
    if (this.vel > 0) {
      return 'D';
    } else if (this.vel <= 0) {
      once = false;
      return 'U';
    }
  }

  checkSides() {
    if (this.x <= -this.w/2) {
      this.x = width;
    }

    if (this.x >= width + this.w/2) {
      this.x = -this.w/2;
    }
  }

}
