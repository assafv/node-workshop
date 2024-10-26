var http = require('http');
var fs = require('fs');

function handler (request, response) {
    
    var endpoint = request.url;

    if (endpoint === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});
    
        fs.readFile(__dirname + '/public/index.html', function(error, file) {
          if (error) {
            console.log(error);
            return;
          }
    
          response.end(file);
        });
    } else if (endpoint.includes("image")) {
        response.writeHead(200, {"Content-Type": "image/jpeg"});
        fs.readFile(__dirname + '/public/' + endpoint, function(error, file) {
            if (error) {
              console.log(error);
              return;
            }
      
            response.end(file);
          });

      } else if (endpoint.includes(".css")) {
        response.writeHead(200, {"Content-Type": "text/css"});
        fs.readFile(__dirname + '/public/' + endpoint, function(error, file) {
          if (error) {
            console.log(error);
            return;
          }
    
          response.end(file);
        });

      }
      
      else {
        response.writeHead(404, {"Content-Type": "text/html"});
        response.write("Not found");
        response.end()
      }
}

var server = http.createServer(handler);

server.listen(3000, function () {

    console.log("Server is listening on port 3000.  Ready to accept requests!");
});
