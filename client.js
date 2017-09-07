var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

http.listen(3000, function () {
  console.log('listening on *:3000');
});

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

  socket.on('chat message', function (message) {
    console.log(message);
    io.emit('hey', message);
  });

  socket.on('get:messages', function (f) {
    f(['a', 'b', 'c']);
  })
});