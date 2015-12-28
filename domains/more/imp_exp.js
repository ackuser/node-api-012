var EventEmitter = require('events').EventEmitter;
var domain       = require('domain');

// Create 2 domains
var d1 = domain.create();
var d2 = domain.create();

// Enter the first domain
d1.run(function() {
  // This emitter is implicitly bound to d1
  // because it is created while process.domain === d1
  var implicitEmitter = new EventEmitter();
  implicitEmitter.on('someEvent', function() {
    console.log(process.domain === d1); // true
  });

  implicitEmitter.emit('someEvent');

  // Explicitly bind this emitter to another domain
  var explicitEmitter = new EventEmitter();
  d2.add(explicitEmitter);

  explicitEmitter.on('someEvent', function() {
    console.log(process.domain === d2); // true
  });

  explicitEmitter.emit('someEvent');
});
