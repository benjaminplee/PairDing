$(function() {
	
	function processMessage(message) {
		// console.log('processing a message', message)
		
		$('#messages').append("<p>" + message.text + "</p>");
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
			sendMessage('start (' + offset.left + "," + offset.top + ")")
		},
		drag: function() {
			var offset = $(this).offset();
			sendMessage('drag (' + offset.left + "," + offset.top + ")")
		},
		stop: function() {
			var offset = $(this).offset();
			sendMessage('stop (' + offset.left + "," + offset.top + ")")
		}
	});
	
});