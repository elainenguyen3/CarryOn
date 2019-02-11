var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  socket.on('message', function(msg){
  	console.log("Server received: " + msg);
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('Listening...');
});