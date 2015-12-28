//domain.bind(callback)
//• callback {Function} The callback function
//• return: {Function} The bound function
//The returned function will be a wrapper around the supplied callback function. When the returned function
//is called, any errors that are thrown will be routed to the domain’s error event.
var d = require('domain').create();
var fs = require('fs');

function readSomeFile(filename, cb) {
  fs.readFile(filename, 'utf8', d.bind(function(er, data) {
    // if this throws, it will also be passed to the domain
    return cb(er, data ? JSON.parse(data) : null);
  }));
}
d.on('error', function(er) {
  console.error('Caught error!', er);
  // an error occurred somewhere.
  // if we throw it now, it will crash the program
  // with the normal line number and stack message.
});

d.run(function() {
  process.nextTick(function() {
    setTimeout(function() { // simulating some various async stuff
      readSomeFile('non-existent file', function(error, data) {
        if (error) throw error;
        // proceed...
      });
    }, 100);
  });
});
