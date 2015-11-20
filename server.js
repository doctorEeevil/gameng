// http://expressjs.com/
var express = require('express');
var app = express();

// http://expressjs.com/starter/static-files.html
app.use(express.static('public')); // serves /public/index.html
app.use("/three", express.static('node_modules/three'));

var server = require('http').createServer(app);

// https://github.com/socketio/socket.io
var io = require('socket.io')(server);
var color = 0x00ff00;
var x = 1;
var y = 2;
var z = 6;
io.on('connection', function(socket){
    socket.on('newPlayer', function(nick){
	color = color + 90;
	x = x * 1.2;
	y = y * 1.2;	
	z = z * 1.2;
	
	position = [Math.round(x), Math.round(y), Math.round(z)]
	io.emit('newShip',[nick,color,position])
	console.log("new ship for ",nick, color, position);
    });
  socket.on('disconnect', function(){});
});

console.log();
console.log("  surf to http://localhost:3000/");
console.log("  press Ctrl-C to quit :)");
console.log();
console.log("  love Dad");
console.log();
server.listen(3000, "192.168.1.20");
