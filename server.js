var http = require('http'),
    url = require('url'),
	fs = require('fs');
 
var server = http.createServer(function(req, res) {
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