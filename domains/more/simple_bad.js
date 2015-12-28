//The above example is a very bad idea of using domains, this makes it somewhat same as
//the uncaughtException thing. So whats the correct way of using domains?
//The example given on the documentation page of the Domain provides us with a very
//nice example in the context of clusters.
var http = require('http');
var domain = require('domain').create();

domain.on('error', function(err){
    console.log(err); //What else we can do here?
});

domain.run(function(){
    http.createServer(function(req, res){
       throw new Error('Server encountered a bizzare error!');
        req.end('ok')
    }).listen(9091);
});
