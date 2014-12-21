var server = require('./server');
var io = require('./signaling');
var port = process.env.PORT || 8080;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});