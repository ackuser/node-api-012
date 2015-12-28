var EventEmitter = require('events').EventEmitter;
var domain       = require('domain');

var emitter = new EventEmitter();

// Bind to domain
var d1 = domain.create();
d1.on('error', function(err) {
  console.log('Handled by domain:', err.stack);
});
d1.add(emitter);

// Attach listener
emitter.on('error', function(err) {
  console.log('Handled by listener:', err.stack);
});

emitter.emit('error', new Error('this will be handled by listener'));
emitter.removeAllListeners('error');
emitter.emit('error', new Error('this will be handled by domain'));
d1.remove(emitter);
emitter.emit('error', new Error('woops, unhandled error. This is converted to an exception. Time to crash!'));
