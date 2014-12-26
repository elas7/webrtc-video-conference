(function () {
  'use strict';

  var server = require('./server'),
      io = require('socket.io')(server),
      connections = {};

  io.on('connection', function (socket) {

    socket.on('create or join', function (room) {
      var rooms = io.sockets.adapter.rooms;

      // create a room if it doesn't exist
      if (!(room in rooms)) {
        socket.join(room);
        socket.emit('created', room);
        console.log('created room', room);
      } else {
        // join the room if it's not full
        var numClients = Object.keys(rooms[room]).length;
        if (numClients == 1) {
          socket.join(room);

          // notify yourself and others in the room
          socket.emit('joined', room);
          socket.to(room).emit('join', room);

          console.log('joined room', room);
        } else { // max two clients
          console.log('room', room, 'is full');
        }
      }
    });

    socket.on('message', function (room, message) {
      console.log(room, message);
      socket.to(room).emit('message', message);
    });

  });

  module.exports = io;

}).call(this);
