var FIBOS = require('./initClient.js');

var config = {
    "producer-name": "testid4fibos",
    "public-key": "FO87ziTh2BFA7KNcdu57WtM2fUvZzZMXfwqJ9TVyupxVphr135ue",
    "private-key": '5K4ADapxcnjLZ6GFtmnA22q5f5yYbsJzBmbXdWjepsMbchZzYdq',
    "url": "http://testid4fibos.io"
};

var fibos = FIBOS(config["private-key"]);

var ctx = fibos.contractSync("eosio");
ctx.voteproducerSync(config["producer-name"], "", ["producer-name"]);