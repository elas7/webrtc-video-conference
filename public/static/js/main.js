//var socket = io('http://localhost:8080');
//socket.on('news', function (data) {
//    console.log(data);
//    socket.emit('my other event', { my: 'data' });
//});
//
//socket.on('loop', function (data) {
//    console.log(data);
//});
//
//var chat = io('http://localhost:8080/chat');
//
//chat.on('connect', function () {
//    chat.emit('hi!', { connected_to: 'news' });
//});
//
//chat.on('a message', function(data) {
//    console.log(data);
//});

(function ($) {

    var socket = io();
    var room;

    $('#connect').on('click', function() {
        var room_key = $('#key')[0].value;
        if (room_key !== '') {
            console.log('Joining with key:', room_key);
            socket.emit('create or join', room_key);
        }
    });

    socket.on('created', function(room_key) {
        console.log('created room', room_key);
        room = room_key;
    });

    socket.on('joined', function(room_key) {
        console.log('joined room', room_key);
        room = room_key;
        socket.emit('message', room, 'Hola');
    });

    socket.on('message', function(message) {
        console.log('message from peer:', message);
    });

}(jQuery));


