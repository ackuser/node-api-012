//Event: ‘fork’
//• worker {Worker object}
//When a new worker is forked the cluster module will emit a ‘fork’ event. This can be used to log worker
//activity, and create your own timeout.
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var timeouts = [];

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

}

function msg(pid) {
  console.error("Forking the master ..." + pid);
}
cluster.on('online', function(worker) {
console.log("Yay, the worker responded after it was forked " + worker.process.pid);
});
cluster.on('listening', function(worker, address) {
  clearTimeout(timeouts[worker.id]);
});
cluster.on('exit', function(worker, code, signal) {
  clearTimeout(timeouts[worker.id]);
  errorMsg();
});
