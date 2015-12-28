var http = require('http');
http.createServer(function(req, res) {
  // On 50% of requests this code will run and throw an exception
  var random = Math.random()
  console.log(random)
  if (random > 0.5) {
    woops.thisWillThrow();
  }
}).listen(8000);
//curl http://localhost:8000
