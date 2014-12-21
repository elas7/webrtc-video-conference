var socket = io('http://localhost:8080');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

socket.on('loop', function (data) {
    console.log(data);
});

var chat = io('http://localhost:8080/chat');

chat.on('connect', function () {
    chat.emit('hi!', { connected_to: 'news' });
});

chat.on('a message', function(data) {
    console.log(data);
});