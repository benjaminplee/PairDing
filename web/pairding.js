$(function() {
	
	function processMessage(message) {
		// console.log('processing a message', message)
		
		$('#messages').append("<p>" + message.event + "</p>");
		
		$('#draggable').css('left', message.offset.left).css('top', message.offset.top)
	}
	
	function sendMessage(message) {
		// console.log('sending a message')
		
		socketio.send(message);
	}
	
	var socketio = new io.Socket(null, { port: 80, rememberTransport: false });
	socketio.connect();
	
	socketio.on('message', processMessage);
	
	$('#testButton').click(function() {
		sendMessage(new Date().toString());
	});
	
	$("#draggable").draggable({
		start: function() {
			var offset = $(this).offset();
			sendMessage({ event: 'start', offset: offset })
		},
		drag: function() {
			var offset = $(this).offset();
			sendMessage({ event: 'drag', offset: offset })
		},
		stop: function() {
			var offset = $(this).offset();
			sendMessage({ event: 'stop', offset: offset })
		}
	});
	
});