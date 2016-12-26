var http = require('http');
var express = require('express');
var socket_io = require('socket.io');

var app = express();
app.use(express.static('public'));

var server = http.Server('public');
var io = socket_io(server);

server.listen(process.env.PORT || 8080);
console.log('Running on localhost:8080...');
