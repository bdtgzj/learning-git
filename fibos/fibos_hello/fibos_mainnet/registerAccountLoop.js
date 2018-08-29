var FIBOS = require('fibos.js');
var timers = require('timers');

var http = require('http');
var httpClient = new http.Client();
var httpServerHost = 'http://tunnel.fibos.io/1.0/app/token/create';
// thanksgiving, independence, accidentally, professional, equalization, acceleration, affectionate, completeness
// unemployment, breakthrough, biochemistry
var account = 'thanksgiving';
var timer = timers.setInterval(cb, 1000);
function cb() {
    var prikey = FIBOS.modules.ecc.randomKeySync();
    var pubkey = FIBOS.modules.ecc.privateToPublic(prikey);
    var rep = httpClient.post(httpServerHost, {
        json: {
            account: account,
            pubkey: pubkey
        }
    }).json();
    if (rep.account) {
      rep.prikey = prikey;
      timers.clearInterval(timer);
    }
    console.log(rep);
};
