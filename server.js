var http = 			require('http')
  , io = 				require('socket.io')
	, paperboy = 	require('paperboy')
	, path = 			require('path')
  , PORT = 80
	, WEBROOT = path.join(path.dirname(__filename), 'web');

var server = http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;

  paperboy
    .deliver(WEBROOT, req, res)
    .addHeader('Expires', 300)
    .addHeader('X-PaperRoute', 'Node')
    .after(function(statCode) {
      log(statCode, req.url, ip);
    })
    .error(function(statCode, msg) {
      res.writeHead(statCode, {'Content-Type': 'text/plain'});
      res.end("Error " + statCode);
      log(statCode, req.url, ip, msg);
    })
    .otherwise(function(err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end("Error 404: File not found");
      log(404, req.url, ip, err);
    });
})

server.listen(PORT);

function log(statCode, url, ip, err) {
  var logStr = statCode + ' - ' + url + ' - ' + ip;
  if (err)
    logStr += ' - ' + err;
  console.log(logStr);
}

var socket_io = io.listen(server);
  
socket_io.on('connection', function(client) {
	console.log('Client connected');
	
  client.on('message', function(message){
		console.log('Received message: ' + message)
		client.broadcast({ text: message });
  });

});