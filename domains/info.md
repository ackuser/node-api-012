https://engineering.gosquared.com/error-handling-using-domains-node-js
https://www.joyent.com/developers/node/design#EventEmitter
http://www.howtojs.org/understanding-exceptions-domains-in-nodejs/
http://becausejavascript.com/node-js-process-nexttick-vs-setimmediate/

Domains
Domain is a useful module built into the core of Node that allows developers to gracefully handle unexpected errors for asynchronous events. That is to say, you can group related asynchronous IO operations together and if one of them errors in an unexpected way, that error won't necessarily disrupt other IO happening in the event queue.

One of the primary use cases for domains is the scenario where you hit an unexpected error when handling an http request, however there are still other users that have requests being processed by your application. If you are in this scenario and have deployed with cluster you should immediately close() the listener in the worker, report the error, and let the other requests finish before exiting gracefully.

Since the error you encountered was unexpected, it's not entirely clear just what might have happened to the rest of your state. You could use the error handler to roll back transactions, and try to repair as much as possible, but it's unlikely that you can guarantee that the process is in a state where it's truly safe to continue. Consider calling process.abort() instead to save a core file for later debugging, and allow the system to restart your process.
