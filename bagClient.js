const readline = require("readline");
var io = require('socket.io-client');
var socket = io.connect('https://luggage-please.herokuapp.com', {reconnect: true});

socket.on('connect', function (socket) {});

socket.on('message', function(msg){
	if(msg.startsWith("$app$")) {
		console.log(msg);
	}
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Type a message: ', (answer) => {
	socket.emit("message", "$bag$" + answer);
  	rl.close();
});