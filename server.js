var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

io.on('connection', function(socket) {
  socket.on('draw', function(position) {
    socket.broadcast.emit('draw', position);
    console.log('server drawing working');
  });

  socket.on('guess', function(guess) {
    io.emit('guess', guess);
    console.log("The guess was :", guess);
  })
});

server.listen(process.env.PORT || 8080);
console.log('Running on localhost:8080...');
