var path = require('path');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8080);

app.use('/static', express.static(path.join(__dirname, 'public/static')));

app.get('/', function (req, res) {
    res.sendfile((path.join(__dirname, 'public', 'index.html')));
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});