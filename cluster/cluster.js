//A single instance of Node runs in a single thread. To take advantage of multi-core systems the user will
//sometimes want to launch a cluster of Node processes to handle the load.
//The cluster module allows you to easily create child processes that all share server ports.
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length
var events = require('events');
var eventEmitter = new events.EventEmitter();

if (cluster.isMaster) {
  // Fork workers.
  console.log(numCPUs + "CPUs");
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });

  console.log('I am the Master ' + process.pid);

} else {
  console.log('I am a simple worker ' + process.pid);
  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
    setTimeout(function() { // simulating some various async stuff
      process.exit();
    }, 1000);
  }).listen(8000);
}
