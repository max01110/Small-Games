//-----Variables-----
let horizontalDiv = 900/3;
let verticalDiv = 900/3;
let socket;
let invalid;
let isWinX;
let isWinO;
let gameTie;
let sumX=0;
let sumO=0;
let playAgain=false;
//Switching turns variables
var xTurn = false;
var oTurn = false;
var playingTurn;
let counterPlays=0;
//Connection variables
let connectionStatus = false; //connection of client 1
let connectionStatus2 = false; //connection of client 2  -- if true --> client is connected
//Image variables
let mainScrnImg;
let winXImg;
let winOImg;
let tieImg;

let grid = [['', '', ''],
			['', '', ''],  //2D array used to represent game
			['', '', '']]

function setup() {
	createCanvas(900, 900)
	background(120);

	//--Socket.io initialization--
	socket = io.connect('https://onlinetictactoe1.herokuapp.com/');
	//--Starting up game--
 	
 	socket.on('newConnection', connection); //Listens for newConnection event
 	socket.on('startGame', replyConnection); //Listens for startGame event (after connection sent back to server)
 	
 	//--In game--
 	socket.on('playClientX', placeX); //receives grid data from server and sends it to placeX function
 	socket.on('playClientO', placeO); //receives grid data of O from server and sends it to placeO function

 	//--Switching Turns--
 	socket.on('turn', turn); //Receives variable playTurn. Uses turn() to place it in playingTurn variable.
	socket.on('playsCount', convertPlaysCount); //Receives variable plays. Uses convertPlaysCount() to place it in counterPlays.
 
 	//Loading images
	mainScrnImg = loadImage('images/mainPage.jpg');
	winXImg = loadImage('images/WinnerX.jpg');
	winOImg = loadImage('images/WinnerO.jpg');
	tieImg = loadImage('images/Tie.jpg');
 }

function draw() {
	let results = checkWinner();
 	if (results != null) { //checks is there is no winner
 		noLoop(); //if there is a winner --> stop looping
 		drawGame();
 		drawLines();
 		if (results=="O") {
 			playAgain=true;
 			winnerO();
 		} else if (results=="X") {
 			playAgain=true;
 			winnerX();
 		} else if (results=="tie") {
 			playAgain=true;
 			tie();
 		}
 	} else {
		if (connectionStatus == false && connectionStatus2 == false) { //checks if both clients are connected
	 		mainScreen(); //waiting screen
	 	} else {
			if (playingTurn==1) { //playingTurn changes between 1 and 2
				if (invalid==true) {
	 				invalidSpot(); //if player  clicks on an already taken spot in grid
	 			} else {
	 				drawGame(); //Draws game
			 		drawLines(); //Draws lines
	 				}
			} else {
				wait(); //waiting screen
		}
	}
}

}

function mousePressed() { //built in mousepressed function --> activates when mouse is clicked
	if (playAgain==true) {
		grid=[['', '', ''],
			  ['', '', ''],
			  ['', '', '']]
		loop();
		playAgain=false;
	} else {
		let results = checkWinner();
		if (results != null) {
			console.log('Sorry game over')
		} else {
			if (invalid){ //checks if invalid (true when player clicked on already occupied area.)
				invalid = false;
			} else {
				let value = mouseCoor();
				if (value === undefined) { //If mouse click is out of game boundaries
					console.log(value); 
				} else {
					if (playingTurn==1) {
						if (counterPlays%2==0) { //counterPlays increments each player plays
							playX(value);		 //Using modulo 2, allows to switch turns every number
						} else {
							playO(value);
						}

					} else {
						console.log('Not your turn.')
					}
		}
		}
}
}

}

