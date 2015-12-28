var http = require('http');
 var domain = require('domain');

 http.createServer(function(req, res){
     var serverDomain = domain.create();

     serverDomain.on('error', function(err){
         console.log('Domain:', err.domain);
         res.writeHead(500);
         res.end(err.message);
     });
     //domain.add(req);
     //domain.add(res);
     serverDomain.add(req);
     serverDomain.add(res);
     serverDomain.run(function(){
         requestHandler(req, res);
     });
 }).listen(9091);
