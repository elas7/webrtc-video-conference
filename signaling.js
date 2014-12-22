var server = require('./server');
var io = require('socket.io')(server);

var connections = {},
    partner = {},
    messagesFor = {};

io.on('connection', function (socket) {

    socket.on('create or join', function (room_key) {
        var rooms = io.sockets.adapter.rooms;

        // create a room if it doesn't exist
        if (!(room_key in rooms)) {
            socket.join(room_key);
            socket.emit('created', room_key);
            console.log('created room', room_key);
        } else {
            // join the room if it's not full
            var numClients = Object.keys(rooms[room_key]).length;
            if (numClients == 1) {
                socket.join(room_key);
                socket.emit('joined', room_key);
                console.log('joined room', room_key);
            } else { // max two clients
                console.log('room', room_key, 'is full');
            }
        }
        console.log(io.sockets.adapter.rooms);
    });

    socket.on('message', function (room, message) {
        console.log(room, message);
        socket.to(room).emit('message', message);
    });

});


module.exports = io;