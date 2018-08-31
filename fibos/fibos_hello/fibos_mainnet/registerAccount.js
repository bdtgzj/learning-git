var FIBOS = require('fibos.js');

var prikey = FIBOS.modules.ecc.randomKeySync();
var pubkey = FIBOS.modules.ecc.privateToPublic(prikey); // FO take the head

var http = require('http');
var httpClient = new http.Client();
var httpServerHost = 'http://tunnel.fibos.io/1.0/app/token/create';
// thanksgiving, independence, accidentally, professional, equalization, acceleration, affectionate, completeness
// unemployment, breakthrough, biochemistry
var account = 'affectionate';
var rep = httpClient.post(httpServerHost, {
    json: {
        account: account,
        pubkey: pubkey
    }
});
// console.log(rep);
rep = rep.json();
if (rep.account) rep.prikey = prikey;
console.log(rep);
