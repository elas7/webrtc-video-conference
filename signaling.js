var server = require('./server');
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
    socket.on('loop', function (data) {
        console.log(data);
        socket.emit('loop', data);
    });
});

var chat = io
    .of('/chat')
    .on('connection', function (socket) {
        console.log(socket.client);
        socket.on('hi!', function (data) {
            console.log(data);
        });
        socket.emit('a message', {
            that: 'only'
            , '/chat': 'will get'
        });
        chat.emit('a message', {
            everyone: 'in'
            , '/chat': 'will get'
        });
    });

module.exports = io;