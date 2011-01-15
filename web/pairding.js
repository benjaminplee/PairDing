$(function() {
	
	var socketio = new io.Socket(null, { port: 80, rememberTransport: false });
	socketio.connect();
	
	socketio.on('message', function(message) {
		$('#draggable').css('left', message.offset.left).css('top', message.offset.top)
	});
	
	$("#draggable").draggable({
		start: function() {
			var offset = $(this).offset();
			socketio.send({ event: 'start', offset: offset })
		},
		
		drag: function() {
			var offset = $(this).offset();
			socketio.send({ event: 'drag', offset: offset })
		},
		
		stop: function() {
			var offset = $(this).offset();
			socketio.send({ event: 'stop', offset: offset })
		}
	});
	
});