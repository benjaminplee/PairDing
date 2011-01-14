$(function() {
	
	function processMessage(message) {
		console.log('processing a message', message)
		
		$('#messages').append("<p>" + message.text + "</p>");
	}
	
	function sendMessage() {
		console.log('sending a message')
		
		socketio.send(new Date().toString());
	}
	
	var socketio = new io.Socket(null, { port: 80, rememberTransport: false });
	socketio.connect();
	
	socketio.on('message', processMessage);
	
	$('#testButton').click(sendMessage);
	
});