var FIBOS = require('./initClient.js');

var config = {
  keyProvider: '5K4ADapxcnjLZ6GFtmnA22q5f5yYbsJzBmbXdWjepsMbchZzYdq', // Private key, WIF string or array of keys..
}

var fibos = FIBOS(config.keyProvider);

var ctx = fibos.contractSync("eosio.token"); // eosio.token
var result = ctx.transferSync("testid4fibos", "gulou", '1.0000 FO', 'transfer'); // eosio, eosio.prods, gulou
console.log(result);