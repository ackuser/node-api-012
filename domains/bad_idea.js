//Sample 1 from api
// XXX WARNING! BAD IDEA!
var d = require('domain').create();
d.on('error', function(er) {
  // The error won't crash the process, but what it does is worse!
  // Though we've prevented abrupt process restarting, we are leaking
  // resources like crazy if this ever happens.
  // This is no better than process.on('uncaughtException')!
  console.log('error, but oh well', er.message);
});
d.run(function() {
  require('http').createServer(function(req, res) {
    handleRequest(req, res);
  }).listen(PORT);
});
