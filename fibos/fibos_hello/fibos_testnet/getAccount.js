var FIBOS = require('./initClient.js');

var config = {
    keyProvider: '5K4ADapxcnjLZ6GFtmnA22q5f5yYbsJzBmbXdWjepsMbchZzYdq', // Private Key, WIF string or array of keys..
};

var fibos = FIBOS(config.keyProvider);

var result = fibos.getAccountSync('testid4fibos');
console.log('testid4fibos');
console.log(result);

result = fibos.getAccountSync('eosio');
console.log('eosio');
console.log(result);

result = fibos.getAccountSync('eosio.prods');
console.log('eosio.prods');
console.log(result);

result = fibos.getAccountSync('gulou');
console.log('gulou');
console.log(result);

