
//----------------Functions----------------

//--Drawing functions--
function drawGame() { //Function that draws the grid on the canvas
	background(255);
	noStroke();
	let textSIZE = width/5;
	fill(0);
	for (let i=0; i<3;i++) { //Draws grid
	  for (let j=0;j<3;j++) {
		 let x = j*(width/ (width/290));
		 let y = i*(height/ (width/290));
		 textSize(textSIZE);
		 spot = grid[i][j];
		 text(spot, (x+width/2)-340, (y+height/2)-220);
	  	}
	}
}

function drawLines() { //Function that draws lines
	fill(0);
	stroke(5);
	strokeWeight(5);
	//Vertical Lines
	line(horizontalDiv, 0, horizontalDiv, height);
	line(horizontalDiv*2, 0, horizontalDiv*2, height);
	//Horizontal Lines
	line(0, verticalDiv, width, verticalDiv);
	line(0*2, verticalDiv*2, width*2, verticalDiv*2);
	//console.log('draw lines')
}


function invalidSpot() { //Already taken spot function
	fill(230, 230, 230, 15);
	noStroke();
	rect(width/4, height/4, 500, 200, 10);
	fill(0);
	textSize(30);
	text("This spot is invalid.", 340, 270);
	text("Please click in valid spot.", 300, 330);
	textSize(35);
	text("Click anywhere to continue", 260, 390);
}


function mainScreen() { //Waiting screen function --> waiting for other player
	var playerConnect = 0;
	background(255);
	mainScrnImg.resize(900, 900);
	image(mainScrnImg, 0, 0);
}

function winnerX() {
	winXImg.resize(900, 900);
	image(winXImg, 0, 0);
}


function winnerO() {
	winOImg.resize(900, 900);
	image(winOImg, 0, 0);
}

function tie() {
	tieImg.resize(900, 900);
	image(tieImg, 0, 0);
}


//----Internal functions----
function playX(value) { //places X or O to the grid
	if (grid[value.xCoor][value.yCoor] == 'X' || grid[value.xCoor][value.yCoor] == 'O') { //Check if spot is valid
		invalid = true;
	} else {
		grid[value.xCoor][value.yCoor] = "X"; //places X in clicked spot
		let gridDataX = {
			xCoor: value.xCoor,
			yCoor: value.yCoor,
		}
		socket.emit('playClientX', gridDataX);
	}
}
function placeX(gridDataX) { //places X to the grid
	grid[gridDataX.xCoor][gridDataX.yCoor] = "X";
	socket.emit('playedX', xTurn);
	}

function playO(value) {
	if (grid[value.xCoor][value.yCoor] == 'X' || grid[value.xCoor][value.yCoor] == 'O') {
		invalid = true;
	} else {
		grid[value.xCoor][value.yCoor] = "O"
		let gridDataO = {
			xCoor: value.xCoor,
			yCoor: value.yCoor
		}
		socket.emit('playClientO', gridDataO);
	}
}

function placeO(gridDataO) {
	grid[gridDataO.xCoor][gridDataO.yCoor] = "O";
	socket.emit('playedO', oTurn);
}

function wait() {
	drawGame();
	drawLines();
	textSize(50);
	text("Please wait. Other player is playing", 100, 800);
}


function mouseCoor() { //checks mouseX and mouseY to find out where player clicked --> returns coordinates for grid
	if (mouseX > 0 && mouseX < horizontalDiv && mouseY > 0 && mouseY < verticalDiv) {
		return {
			xCoor: 0,
			yCoor: 0
		}
	} else if (mouseX > horizontalDiv && mouseX < horizontalDiv*2 && mouseY > 0 && mouseY < verticalDiv) {
		return{
			xCoor: 0,
			yCoor: 1
		}
	} else if (mouseX > horizontalDiv*2 && mouseX < width && mouseY > 0 && mouseY < verticalDiv) {
		return{
			xCoor: 0,
			yCoor: 2
		}
	} else if (mouseX > 0 && mouseX < horizontalDiv && mouseY > verticalDiv && mouseY < verticalDiv*2) {
		return{
			xCoor: 1,
			yCoor: 0
		}
	} else if (mouseX > horizontalDiv && mouseX < horizontalDiv*2 && mouseY > verticalDiv && mouseY < verticalDiv*2) {
		return{
			xCoor: 1,
			yCoor: 1
		}
	} else if (mouseX > horizontalDiv*2 && mouseX < width && mouseY > verticalDiv && mouseY < verticalDiv*2) {
		return{
			xCoor: 1,
			yCoor: 2
		}
	} else if (mouseX > 0 && mouseX < horizontalDiv && mouseY > verticalDiv*2 && mouseY < height) {
		return{
			xCoor: 2,
			yCoor: 0
		}
	} else if (mouseX > horizontalDiv && mouseX < horizontalDiv*2 && mouseY > verticalDiv*2 && mouseY < height) {
		return{
			xCoor: 2,
			yCoor: 1
		}
	} else if (mouseX > horizontalDiv*2 && mouseX < width && mouseY > verticalDiv*2 && mouseY < height) {
		return{
			xCoor: 2,
			yCoor: 2
		}
	}
}

function connection(connectState) { //Executed by this line: socket.on('newConnection', connection);
								//Sets connectionStatus (client 1) to connectState (true when 2 clients are connected)
	connectionStatus = connectState;
	socket.emit('comfirmCo', connectionStatus); //Sends back connectionStatus to server.
	}

function replyConnection(connectionStatusComfirm) { //Server sends back a comfirmation of connection
	connectionStatus2 = connectionStatusComfirm; //connectionStatus2 is then set to true
}


function convertPlaysCount(plays) { //receives plays (which is a counter in server.js)
	counterPlays = plays;
}

function turn(playTurn) { //receives playTurn (which alternates between 1 and 2)
	playingTurn = playTurn;
}


function equals(a, b, c) {
	return (a==b && b==c && a != "");
}

function checkWinner() {
	let winner = null;
	let availableSpace = 0;

	//Check available space
	for (let q=0; q<3; q++) {
		for (let w=0; w<3; w++) {
			if (grid[q][w]=="") {
				availableSpace+=1;
			}
		}
	}
	//Horizontal:
	for (let a=0; a<3; a++) {
		if (equals(grid[a][0],grid[a][1],grid[a][2])) {
			winner = grid[a][0];
		}
	}

	//Vertical
	for (let b=0; b<3; b++) {
		if (equals(grid[0][b],grid[1][b],grid[2][b])) {
			winner = grid[0][b];
		}
	}

	//Diagonal
	if (equals(grid[0][0],grid[1][1],grid[2][2])) {
		winner = grid[0][0];
	}

	if (equals(grid[2][0],grid[1][1],grid[0][2])) {
		winner = grid[2][0];
	}

	if (winner == null && availableSpace==0) {
		return 'tie';
	} else {
		return winner;
		}
	}



