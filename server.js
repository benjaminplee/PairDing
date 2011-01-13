var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , io = require('socket.io')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;
    
server = http.createServer(function(req, res){
  var path = url.parse(req.url).pathname;
  switch (path){
		case '/':    
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write('<html><body><h1>Hola!</h1></body></html>');
			res.end();
			break;	
		default:
			if(path.charAt(path.length - 1) == "/") {
				path = path + "index.html";
			}

			fs.readFile(__dirname + path, function(err, data){
				if (err) {
					res.writeHead(404, {"Content-Type": "text/plain"});
					res.end();
					return;
				}

				res.writeHead(200, {'Content-Type': 'text/html'})
				res.write(data, 'utf8');
				res.end();
			});
			break;
  }
});

server.listen(8080);

// socket.io, I choose you
// simplest chat application evar
var io = io.listen(server)
  , buffer = [];
  
io.on('connection', function(client){
  client.send({ buffer: buffer });
  client.broadcast({ announcement: client.sessionId + ' connected' });
  
  client.on('message', function(message){
    var msg = { message: [client.sessionId, message] };
    buffer.push(msg);
    if (buffer.length > 15) buffer.shift();
    client.broadcast(msg);
  });

  client.on('disconnect', function(){
    client.broadcast({ announcement: client.sessionId + ' disconnected' });
  });
});