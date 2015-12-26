/*
1) Functions that use the underlying operating system facilities to perform name resolution, and that do
not necessarily do any network communication. This category contains only one function: dns.lookup.
Developers looking to perform name resolution in the same way that other applications
on the same operating system behave should use dns.lookup.
*/
var dns = require('dns');
dns.lookup('www.google.com', function onLookup(err, addresses, family) {  
console.log('addresses:', addresses);
});
