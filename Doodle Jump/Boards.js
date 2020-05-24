class Board {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  drawBoard() {
    rect(this.x, this.y, 60, 10);
  }

  move()  {
    this.y += 5;
  }
}
