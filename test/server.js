var io = require('socket.io').listen(3002);

io.sockets.on('connection', function(socket) {

	socket.emit('response', {
		'working': true
	});

	socket.on('request', function(data) {
		console.log(data);

		socket.emit('response', {
			'working': true
		});

	});

});