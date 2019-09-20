var http = require('http')

var handleRequest = function(request, resposne) {
	console.log('Receieved request for URL: ' + request.url);
	reponse.writeHead(200)
	response.end('Hello World!!');
};

var www = http.createServer(handleRequest);

www.listen(8080);
