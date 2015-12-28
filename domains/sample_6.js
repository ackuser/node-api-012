//domain.intercept(callback)
//• callback {Function} The callback function
//• return: {Function} The intercepted function
//This method is almost identical to domain.bind(callback). However, in addition to catching thrown errors,
//it will also intercept Error objects sent as the first argument to the function.
//In this way, the common if (er) return callback(er); pattern can be replaced with a single error handler
//in a single place.
var d = require('domain').create();
var fs = require('fs');
function readSomeFile(filename, cb) {
  fs.readFile(filename, 'utf8', d.intercept(function(data) {
    // note, the first argument is never passed to the
    // callback since it is assumed to be the 'Error' argument
    // and thus intercepted by the domain.
    // if this throws, it will also be passed to the domain
    // so the error-handling logic can be moved to the 'error'
    // event on the domain instead of being repeated throughout
    // the program.
    return cb(null, JSON.parse(data));
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
        if (er) throw er;
        // proceed...
      });
    }, 100);
  });
});
