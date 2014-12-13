var socket = io.connect('http://localhost:8080');
socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});