const express = require('express'); //requires express module
const socket = require('socket.io'); //requires socket.io module
const app = express();
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT); //tells to host server on localhost:3000
var connectState = false;
const coLimit = 2;
var clientID = []
var plays= 0;


app.use(express.static('public')); //show static files in 'public' directory
console.log('Server is running');
const io = socket(server);

io.on('connection', (socket) => { //Waits for a new connection
	if (io.engine.clientsCount > coLimit) { //checks if there are more then 2 client connections
		socket.emit('err', {message: 'reach the limit of connections'})
		socket.disconnect() //if more then 3 --> disconnects
		console.log('Disconnected')
		clientID = []; //Empty clientID array
	} else {
		if (io.engine.clientsCount == 2) {
			connectState = true;
		}
		console.log('New connection: ' + socket.id);
		clientID.push(socket.id) //Adds socket ID to clientID array
		console.log('Number of connections: ' + io.engine.clientsCount);
		socket.broadcast.emit('newConnection', connectState);
		if (clientID.length > coLimit) {
			plays = 0;
			clientID.shift();
		}

}	
	//Comfirms 	 status
	socket.on('comfirmCo', (connectionStatus) => {
		let connectionStatusComfirm = connectionStatus; //sets value to another variable
		socket.broadcast.emit('startGame', connectionStatusComfirm); //sends back the cofirmation
	})

	//--In game play--

	socket.on('playClientX', (gridDataX) => { //receives gridData
		socket.broadcast.emit('playClientX', gridDataX); //sends back gridData
	})

	socket.on('playClientO', (gridDataO) => {
		socket.broadcast.emit('playClientO', gridDataO);

	})


	//Turns
	var playTurn = 1;
	io.in(clientID[0]).emit('turn', playTurn);
	playTurn = 2;
	io.in(clientID[1]).emit('turn', playTurn);

	socket.on('playedX', (xTurn) => {
		playTurn = 2;
		io.in(clientID[0]).emit('turn', playTurn);
		playTurn = 1;
		io.in(clientID[1]).emit('turn', playTurn);
		plays++;
		io.sockets.emit('playsCount', plays);

	})

	socket.on('playedO', (oTurn) => {
		playTurn = 1;
		io.in(clientID[0]).emit('turn', playTurn);
		playTurn = 2;
		io.in(clientID[1]).emit('turn', playTurn);
		plays++
		console.log(plays);
		io.sockets.emit('playsCount', plays);

	})

});

