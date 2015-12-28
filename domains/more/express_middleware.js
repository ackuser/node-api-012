var domain = require('domain');
app.use(function(req, res, next){
  var reqDomain = domain.create();
  reqDomain.add(req);
  reqDomain.add(res);
  reqDomain.on('error', next);
  reqDomain.run(next);
});
