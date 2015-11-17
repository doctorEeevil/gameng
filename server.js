// http://expressjs.com/
var express = require('express');
var app = express();

// http://expressjs.com/starter/static-files.html
app.use(express.static('public'));
app.use("/three", express.static('node_modules/three'));

var server = require('http').createServer(app);

// https://github.com/socketio/socket.io
var io = require('socket.io')(server);

io.on('connection', function(socket){
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});
});

console.log("surf to http://localhost:3000/");
console.log("press Ctrl-C to quit :)");
console.log();
console.log("   love Dad");
server.listen(3000);
