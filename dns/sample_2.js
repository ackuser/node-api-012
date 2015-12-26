/*
2) Functions that connect to an actual DNS server to perform name resolution, and that always use
the network to perform DNS queries. This category contains all functions in the dns module but
dns.lookup. These functions do not use the same set of configuration files than what dns.lookup uses.
For instance, they do not use the configuration from /etc/hosts. These functions should be used by
developers who do not want to use the underlying operating system’s facilities for name resolution, and
instead want to always perform DNS queries.
*/
var dns = require('dns');
dns.resolve4('www.google.com', function (err, addresses) {
  if (err) throw err;
  console.log('addresses: ' + JSON.stringify(addresses));
  addresses.forEach(function (a) {
    dns.reverse(a, function (err, hostnames) {
      if (err) {
        throw err;
      }
      console.log('reverse for ' + a + ': ' + JSON.stringify(hostnames));
    });
  });
});
